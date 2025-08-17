import '../public/styles/variables.css';
import '../public/styles/global.css';
import './styles.css';

import type { Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { Backdrop } from '../src/ui/components/layout/backdrop/backdrop';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  initialGlobals: {
    viewport: { value: 'iphone14promax', isRotated: false },
  },
  decorators: [
    (Story) => (
      <>
        <Backdrop />
        <div style={{ position: 'relative', padding: 0, margin: 0, height: "100%" }}>
          <Story />
        </div>
      </>
    )
  ]
};

export default preview;