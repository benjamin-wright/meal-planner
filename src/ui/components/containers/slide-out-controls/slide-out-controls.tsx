import { use, useEffect, useRef } from 'react';
import './slide-out-controls.css';
import { motion, useMotionValue, useTransform } from 'framer-motion';

type Props = {
  children: React.ReactNode;
}

export function SlideOutControls({ children }: Props) {
  const x = useMotionValue(0);
  const parent = useRef<HTMLDivElement>(null);
  const editControl = useRef<HTMLDivElement>(null);
  const deleteControl = useRef<HTMLDivElement>(null);

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

  return (
    <div className="slide-out-controls-container">
      <motion.div
        className="slide-out-controls-edit"
        ref={editControl}
        style={{
          clipPath: useTransform(x, (value) => {
            const parentElement = parent.current?.firstChild as HTMLElement | null;
            const element = editControl.current as HTMLDivElement | null;
            const computedStyle = getComputedStyle(element ?? document.documentElement);
            const offset = Math.max(0, value);
            const radius = parseFloat(getComputedStyle(parentElement ?? document.documentElement).borderRadius);
            const height = parseFloat(computedStyle.height);

            return `path('M 0 0 L ${offset + radius} 0 Q ${offset} 0 ${offset} ${radius} L ${offset} ${height - radius} Q ${offset} ${height} ${offset + radius} ${height} L 0 ${height} Z')`;
          }),
        }}
      >
        <p>Edit</p>
      </motion.div>
      <motion.div
        className="slide-out-controls-delete"
        ref={deleteControl}
        style={{
          clipPath: useTransform(x, (value) => {
            const parentElement = parent.current?.firstChild as HTMLElement | null;
            const element = deleteControl.current as HTMLDivElement | null;
            const computedStyle = getComputedStyle(element ?? document.documentElement);
            const height = parseFloat(computedStyle.height);
            const radius = parseFloat(getComputedStyle(parentElement ?? document.documentElement).borderRadius);
            const width = parseFloat(computedStyle.width);
            const offset = width + Math.min(0, value);

            return `path('M ${width} 0 L ${width} ${height} L ${offset - radius} ${height} Q ${offset} ${height} ${offset} ${height - radius} L ${offset} ${radius} Q ${offset} 0 ${offset - radius} 0 Z')`;
          }),
        }}
      >
        <p>Delete</p>
      </motion.div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        className="slide-out-controls"
        style={{ x }}
        ref={parent}
      >
        {children}
      </motion.div>
    </div>
  );
}
