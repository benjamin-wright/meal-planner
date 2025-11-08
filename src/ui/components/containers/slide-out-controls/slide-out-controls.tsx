import { useRef } from 'react';
import './slide-out-controls.css';
import { motion, useMotionValue, useTransform } from 'framer-motion';

type Props = {
  children: React.ReactNode;
}

export function SlideOutControls({ children }: Props) {
  const x = useMotionValue(0);
  const controls = useRef<HTMLDivElement>(null);

  return (
    <div className="slide-out-controls-container">
      <motion.div
        className="slide-out-controls-edit"
        style={{
          clipPath: useTransform(x, (value) => {
            const childElement = controls.current?.firstChild as HTMLElement | null;
            const computedStyle = getComputedStyle(childElement ?? document.documentElement);
            const offset = Math.max(0, value);
            const radius = parseFloat(computedStyle.borderRadius);
            const height = parseFloat(computedStyle.height);
            const length = offset;
            
            return `path('M 0 0 L ${length + radius} 0 Q ${length} 0 ${length} ${radius} L ${length} ${height - radius} Q ${length} ${height} ${length + radius} ${height} L 0 ${height} Z')`;
          }),
        }}
      >
        <p>Edit</p>
      </motion.div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        className="slide-out-controls"
        style={{ x }}
        ref={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}
