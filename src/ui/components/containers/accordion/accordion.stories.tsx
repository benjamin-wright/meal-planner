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
        <Drawer id="1" title="Section 1">
          <div>Content for section 1</div>
        </Drawer>
        <Drawer id="2" title="Section 2">
          <div>Content for section 2</div>
        </Drawer>
        <Drawer id="3" title="Section 3">
          <div>Content for section 3</div>
        </Drawer>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    children: (
      <>
        <Drawer id="1" title="Section 1" size="small">
          <div>Content for section 1</div>
        </Drawer>
        <Drawer id="2" title="Section 2" size="small">
          <div>Content for section 2</div>
        </Drawer>
        <Drawer id="3" title="Section 3" size="small">
          <div>Content for section 3</div>
        </Drawer>
      </>
    ),
  }
}
