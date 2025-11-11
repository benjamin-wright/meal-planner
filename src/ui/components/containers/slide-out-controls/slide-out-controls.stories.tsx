import { Meta, StoryObj } from '@storybook/react-vite';
import { SlideOutControl } from './slide-out-control';
import { SlideOutGroup } from './slide-out-group';

function SlideOutControlStory() {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]

  return (
    <SlideOutGroup>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
        }}
      >
        {items.map(item => (
          <SlideOutControl key={item} groupId={item}>
            Slide Out: {item}
          </SlideOutControl>
        ))}
      </div>
    </SlideOutGroup>
  );
}

const meta: Meta<typeof SlideOutControlStory> = {
  component: SlideOutControlStory,
};

export default meta;

type Story = StoryObj<typeof SlideOutControlStory>;

export const Default: Story = {
  render: () => (
    <SlideOutControlStory />
  )
};