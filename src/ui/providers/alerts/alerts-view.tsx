import { motion, AnimatePresence } from 'motion/react';
import { RegisteredAlert } from './alert-provider';
import { AlertView } from './alert-view';
import './alerts-view.css';

type Props = {
  alerts: RegisteredAlert[];
}

export function AlertsView({ alerts }: Props) {
  return (
    <section className="alerts">
      <ul>
        <AnimatePresence>
          {
            alerts.map(alert => (
              <motion.li
                key={alert.number}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AlertView alert={alert.alert} startTime={alert.startTime} endTime={alert.endTime} />
              </motion.li>
            ))
          }
        </AnimatePresence>
      </ul>
    </section>
  );
}
