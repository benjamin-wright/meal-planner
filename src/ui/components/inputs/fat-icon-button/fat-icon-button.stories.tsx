import type { Meta, StoryObj } from '@storybook/react';
import { FatIconButton } from './fat-icon-button';
import House from '../../icons/house';
import { fn } from 'storybook/test';

const meta = {
  component: FatIconButton,
  args: {},
} satisfies Meta<typeof FatIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "primary",
    content: "Primary",
    icon: <House />,
    onClick: fn(),
  }
};