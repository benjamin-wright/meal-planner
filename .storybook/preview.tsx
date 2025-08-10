import '../public/styles/variables.css';
import '../public/styles/global.css';

import type { Preview } from '@storybook/react-vite'
import { Backdrop } from '../src/ui/components/presentation/backdrop/backdrop';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#222831' },
        light: { name: 'Light', value: '#ffffff' },
      }
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: { value: 'dark' },
  },
  decorators: [
    (Story) => (
      <>
        <Backdrop />
        <div style={{ position: 'relative', padding: 0, margin: 0 }}>
          <Story />
        </div>
      </>
    )
  ]
};

export default preview;