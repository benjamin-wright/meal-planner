import { useContext, useEffect, useRef, useState } from 'react';
import './slide-out-control.css';
import Pencil from '../../icons/pencil';
import Trash from '../../icons/trash';
import { SlideOutGroupContext } from './slide-out-group-context';

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
  const [ dragDistance, setDragDistance ] = useState(0);
  const [ animatedStyles, setAnimatedStyles ] = useState<AnimatedStyles>({
    editClipPath: 'M 0 0 L 0 0 L 0 0 L 0 0 Z',
    deleteClipPath: 'M 0 0 L 0 0 L 0 0 L 0 0 Z',
    leftMargin: '0',
    rightMargin: '0',
  });
  const [ isInitialized, setIsInitialized ] = useState(false);

  useEffect(() => {
    const parentElement = parent.current as HTMLElement | null;
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
    if (selection !== null && context.selectedId != null && context.selectedId !== groupId) {
      setSelection(null);
      setDragDistance(0);
    }
  }, [ context.selectedId, selection, groupId ]);

  function handleClick(mode: "edit" | "delete" | null) {
    if (selection !== null) {
      context.setSelectedId(undefined);
      setSelection(null);
      setDragDistance(0);
    } else {
      context.setSelectedId(groupId);
      setSelection(mode);
      setDragDistance(mode === 'delete' ? -50 : 50);
    }
  }

  return (
    <div
      className="slide-out-controls-container" 
      aria-label={`Slide out controls for ${groupId ?? ''}`}
    >
      <button
        className="slide-out-button slide-out-button-edit"
        ref={editControl}
        aria-label={`Edit ${groupId ?? ''} button`}
        style={{
          clipPath: animatedStyles.editClipPath,
          opacity: isInitialized ? 1 : 0,
        }}
        onClick={() => onEdit?.()}
      >
        <Pencil />
      </button>
      <button
        className="slide-out-button slide-out-button-delete"
        ref={deleteControl}
        aria-label={`Delete ${groupId ?? ''} button`}
        style={{
          clipPath: animatedStyles.deleteClipPath,
          opacity: isInitialized ? 1 : 0,
        }}
        onClick={() => onDelete?.()}
      >
        <Trash />
      </button>
      <div
        className="slide-out-controls glazing"
        ref={parent}
        style={{
          marginLeft: animatedStyles.leftMargin,
          marginRight: animatedStyles.rightMargin,
        }}
        onClick={() => handleClick(null)}
      >
        {children}
      </div>
      {
        selection === null && <>
          <button
            className="slide-out-overlay slide-out-overlay-delete"
            aria-label="Delete area"
            onClick={() => handleClick('delete')}
          ></button>
          <button
            className="slide-out-overlay slide-out-overlay-edit"
            aria-label="Edit area"
            onClick={() => handleClick('edit')}
          ></button>
        </>
      }
    </div>
  );
}
