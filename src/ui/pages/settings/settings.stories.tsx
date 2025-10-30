import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SettingsView } from './settings-view';
import { UnitType } from '../../../models/units';
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
