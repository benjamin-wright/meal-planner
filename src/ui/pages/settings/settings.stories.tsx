import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SettingsView } from './settings-view';
import { UnitType } from '../../../models/units';

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
    settings: {
      preferredVolumeUnit: 1,
      preferredWeightUnit: 2
    },
    volumeUnits: [
      { id: 1, name: 'litre', type: UnitType.Volume, collectives: [], magnitudes: [] },
    ],
    weightUnits: [
      { id: 2, name: 'grams', type: UnitType.Weight, collectives: [], magnitudes: [] },
    ],
    onNav: fn(),
    onSettingsUpdate: fn(),
    onBackup: fn(),
  },
};

export const Busy: Story = {
  parameters: {
    layout: "fullscreen"
  },
  args: {
    ...Primary.args,
    busy: true,
  },
};