import { Meta, StoryObj } from '@storybook/react';
import { Expander } from './expander';
import { useState } from 'react';

function ExpanderViewer() {
  const [opened, setOpened] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
      <button onClick={() => setOpened(!opened)}>
        {opened ? "Collapse" : "Expand"}
      </button>
      <span style={{flexGrow: 1}} />
      <Expander opened={opened}>
        <p>Content for the expander</p>
      </Expander>
    </div>
  );
}

const meta: Meta<typeof ExpanderViewer> = {
  component: ExpanderViewer,
};

export default meta;

type Story = StoryObj<typeof ExpanderViewer>;

export const Default: Story = {};