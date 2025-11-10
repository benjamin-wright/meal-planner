import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SettingsView } from './settings-view';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: SettingsView,
} satisfies Meta<typeof SettingsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    version: '1.0.0',
    onBackup: fn(),
    onRestore: fn(),
    onReset: fn(),
  },
  render: (args) => <MemoryRouter>
    <SettingsView {...args} />
  </MemoryRouter>,
};

export const Busy: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    ...Primary.args,
    busy: true,
  },
  render: (args) => <MemoryRouter>
    <SettingsView {...args} />
  </MemoryRouter>,
};
