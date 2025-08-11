import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './accordion';
import { Drawer } from './drawer';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Drawer title="Section 1">
          <div>Content for section 1</div>
        </Drawer>
        <Drawer title="Section 2">
          <div>Content for section 2</div>
        </Drawer>
        <Drawer title="Section 3">
          <div>Content for section 3</div>
        </Drawer>
      </>
    ),
  },
};