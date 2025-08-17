import InfoCircle from '../../components/icons/info-circle';
import ExcalamationTriangle from '../../components/icons/exclamation-triangle';
import { Alert } from './alert-context';
import './alert-view.css';
import ExclamationOctagon from '../../components/icons/excalamation-octagon';

type Props = {
  alert: Alert;
}

export function AlertView({ alert }: Props) {
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

  return (
    <div className="alert glazing">
      {getIcon()}
      <p>{alert.message}</p>
    </div>
  );
}