import { useContext, useEffect, useRef, useState } from 'react';
import './slide-out-control.css';
import Pencil from '../../icons/pencil';
import Trash from '../../icons/trash';
import { SlideOutGroupContext } from './slide-out-group';

type Selection = 'edit' | 'delete' | null;

type AnimatedStyles = {
  editClipPath: string;
  deleteClipPath: string;
  leftMargin: string;
  rightMargin: string;
}

type Props = {
  children: React.ReactNode;
  groupId?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function SlideOutControl({ children, groupId, onEdit, onDelete }: Props) {
  const parent = useRef<HTMLDivElement>(null);
  const context = useContext(SlideOutGroupContext);
  const editControl = useRef<HTMLButtonElement>(null);
  const deleteControl = useRef<HTMLButtonElement>(null);
  const [ selection, setSelection ] = useState<Selection>(null);
  const [ dragStart, setDragStart ] = useState<number | null>(null);
  const [ dragDistance, setDragDistance ] = useState(0);
  const [ pointerDownTime, setPointerDownTime ] = useState<number | null>(null);
  const [ animatedStyles, setAnimatedStyles ] = useState<AnimatedStyles>({
    editClipPath: 'M 0 0 L 0 0 L 0 0 L 0 0 Z',
    deleteClipPath: 'M 0 0 L 0 0 L 0 0 L 0 0 Z',
    leftMargin: '0',
    rightMargin: '0',
  });
  const [ isInitialized, setIsInitialized ] = useState(false);

  useEffect(() => {
    const parentElement = parent.current?.firstChild as HTMLElement | null;
    const element = editControl.current as HTMLDivElement | null;
    const computedStyle = getComputedStyle(element ?? document.documentElement);
    const radius = parseFloat(getComputedStyle(parentElement ?? document.documentElement).borderRadius);
    const height = parseFloat(computedStyle.height);
    const width = parseFloat(computedStyle.width);
    const editOffset = Math.max(0, dragDistance);
    const deleteOffset = Math.min(width, width + dragDistance);

    setAnimatedStyles({
      editClipPath: `path('M 0 0 L ${editOffset + radius} 0 A ${radius} ${radius} 0 0 0 ${editOffset} ${radius} L ${editOffset} ${height - radius} A ${radius} ${radius} 0 0 0 ${editOffset + radius} ${height} L 0 ${height} Z')`,
      deleteClipPath: `path('M ${width} 0 L ${width} ${height} L ${deleteOffset - radius} ${height} A ${radius} ${radius} 0 0 0 ${deleteOffset} ${height - radius} L ${deleteOffset} ${radius} A ${radius} ${radius} 0 0 0 ${deleteOffset - radius} 0 Z')`,
      leftMargin: `${Math.max(dragDistance, 0)}px`,
      rightMargin: `${Math.abs(Math.min(dragDistance, 0))}px`,
    });
    setIsInitialized(true);
  }, [parent, editControl, deleteControl, dragDistance]);

  useEffect(() => {
    if (!parent.current) return;
    if (!editControl.current) return;
    if (!deleteControl.current) return;

    const childElement = parent.current.firstChild as HTMLElement | null;
    if (!childElement) return;

    const style = getComputedStyle(childElement);

    editControl.current.style.borderTopLeftRadius = style.borderTopLeftRadius;
    editControl.current.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
    deleteControl.current.style.borderTopRightRadius = style.borderTopRightRadius;
    deleteControl.current.style.borderBottomRightRadius = style.borderBottomRightRadius;
  }, [parent, editControl, deleteControl]);

  useEffect(() => {
    if (selection !== null && context.selectedId != null && context.selectedId !== groupId) {
      setSelection(null);
      setDragDistance(0);
    }
  }, [ context.selectedId, selection ]);

  function handleTouchStart(x: number) {
    setDragStart(x);
    setPointerDownTime(Date.now());
  }

  function handleTouchMove(x: number) {
    if (dragStart === null) return;

    let distance = (x - dragStart) / 2;
    switch (selection) {
      case 'edit':
        distance += 50;
        break;
      case 'delete':
        distance -= 50;
        break;
    }

    if (distance > 45) {
      setDragDistance(50);
    }

    if ( 15 > distance && distance > -15) {
      setDragDistance(0);
    }

    if (-45 > distance) {
      setDragDistance(-50);
    }
  }

  function handleTouchEnd() {
    setDragStart(null);

    if (dragDistance > 45) {
      context.setSelectedId(groupId);
      setSelection('edit');
      setDragDistance(50);
    } else if (dragDistance < -45) {
      context.setSelectedId(groupId);
      setSelection('delete');
      setDragDistance(-50);
    } else {
      context.setSelectedId(undefined);
      setSelection(null);
      setDragDistance(0);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (pointerDownTime !== null && (Date.now() - pointerDownTime) > 200) {
      event.preventDefault();
      return;
    }

    if (selection !== null) {
      context.setSelectedId(undefined);
      setSelection(null);
      setDragDistance(0);
    }
  }

  return (
    <div className="slide-out-controls-container">
      <button
        className="slide-out-button slide-out-controls-edit"
        ref={editControl}
        style={{
          clipPath: animatedStyles.editClipPath,
          opacity: isInitialized ? 1 : 0,
        }}
        onClick={() => onEdit?.()}
      >
        <Pencil />
      </button>
      <button
        className="slide-out-button slide-out-controls-delete"
        ref={deleteControl}
        style={{
          clipPath: animatedStyles.deleteClipPath,
          opacity: isInitialized ? 1 : 0,
        }}
        onClick={() => onDelete?.()}
      >
        <Trash />
      </button>
      <div
        className="slide-out-controls"
        ref={parent}
        style={{
          marginLeft: animatedStyles.leftMargin,
          marginRight: animatedStyles.rightMargin,
        }}
        onTouchStart={e => handleTouchStart(e.touches[0].clientX)}
        onTouchMove={e => handleTouchMove(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onPointerDown={e => handleTouchStart(e.clientX)}
        onPointerMove={e => {
          if (dragDistance === null) return;

          if (e.buttons !== 1) {
            handleTouchEnd();
            return;
          }

          handleTouchMove(e.clientX);
        }}
        onPointerUp={handleTouchEnd}
        onPointerCancel={handleTouchEnd}
        onPointerLeave={handleTouchEnd}
        onPointerOut={handleTouchEnd}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
}
