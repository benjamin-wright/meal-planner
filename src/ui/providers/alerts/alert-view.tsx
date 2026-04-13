import InfoCircle from '../../components/icons/info-circle';
import ExcalamationTriangle from '../../components/icons/exclamation-triangle';
import { Alert } from './alert-context';
import './alert-view.css';
import ExclamationOctagon from '../../components/icons/excalamation-octagon';
import { useEffect, useState } from 'react';

type Props = {
  alert: Alert;
  startTime?: number;
  endTime?: number;
}

export function AlertView({ alert, startTime, endTime }: Props) {
  const [progress, setProgress] = useState(0);

  function getIcon() {
    switch (alert.severity) {
      case 'info':
        return <InfoCircle className="info" />;
      case 'warning':
        return <ExcalamationTriangle className="warning" />;
      case 'error':
        return <ExclamationOctagon className="error" />;
      default:
        return null;
    }
  }

  useEffect(() => {
    if (!startTime || !endTime) {
      return;
    }

    const now = Date.now();
    if (now >= endTime) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const handle = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const total = endTime - startTime;
      const newProgress = Math.min(100, (elapsed / total) * 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(handle);
      }
    }, 10);

    return () => {
      clearInterval(handle);
    };
  }, [startTime, endTime]);

  return (
    <div className="alert glazing">
      {getIcon()}
      <p>{alert.message}</p>
      <div className="timer" style={{ width: `calc(${progress}% - 0.8em)` }} />
    </div>
  );
}
