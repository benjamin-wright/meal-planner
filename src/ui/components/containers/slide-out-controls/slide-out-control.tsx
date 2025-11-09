import { useContext, useEffect, useRef, useState } from 'react';
import './slide-out-control.css';
import Pencil from '../../icons/pencil';
import Trash from '../../icons/trash';
import { SlideOutGroupContext } from './slide-out-group';

type Selection = 'edit' | 'delete' | null;

type AnimatedStyles = {
  editClipPath: string;
  deleteClipPath: string;
  parentTransform: string;
}

type Props = {
  children: React.ReactNode;
  groupId?: string;
}

export function SlideOutControl({ children, groupId }: Props) {
  const parent = useRef<HTMLDivElement>(null);
  const context = useContext(SlideOutGroupContext);
  const editControl = useRef<HTMLButtonElement>(null);
  const deleteControl = useRef<HTMLButtonElement>(null);
  const [ selection, setSelection ] = useState<Selection>(null);
  const [ dragStart, setDragStart ] = useState<number | null>(null);
  const [ dragDistance, setDragDistance ] = useState(0);
  const [ animatedStyles, setAnimatedStyles ] = useState<AnimatedStyles>({
    editClipPath: '',
    deleteClipPath: '',
    parentTransform: '',
  });

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
      parentTransform: `translateX(${dragDistance}px)`,
    });
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

  return (
    <div className="slide-out-controls-container">
      <button
        className="slide-out-button slide-out-controls-edit"
        ref={editControl}
        style={{
          clipPath: animatedStyles.editClipPath,
        }}
      >
        <Pencil />
      </button>
      <button
        className="slide-out-button slide-out-controls-delete"
        ref={deleteControl}
        style={{
          clipPath: animatedStyles.deleteClipPath,
        }}
      >
        <Trash />
      </button>
      <div
        className="slide-out-controls"
        ref={parent}
        style={{
          transform: animatedStyles.parentTransform,
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
      >
        {children}
      </div>
    </div>
  );
}
