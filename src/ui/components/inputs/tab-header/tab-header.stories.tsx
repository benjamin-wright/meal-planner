import type { Meta, StoryObj } from '@storybook/react';
import { TabHeader } from './tab-header';
import { useArgs } from 'storybook/internal/preview-api';


const meta = {
  component: TabHeader,
} satisfies Meta<typeof TabHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 'primary',
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    selected: 'Tab 1',
    onTabChange: () => {},
  },
  render: (args) => {
    const [{}, updateArgs] = useArgs();

    function onTabChange(tab: string) {
      updateArgs({ selected: tab });
    }

    return <TabHeader {...args} onTabChange={onTabChange} />
  }
};