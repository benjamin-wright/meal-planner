import { Meta, StoryObj } from '@storybook/react-vite';
import { SlideOutControl } from './slide-out-control';
import { SlideOutGroup } from './slide-out-group';
import { useState } from 'react';

function SlideOutControlStory() {
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ];

  const [filtering, setFiltering] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'stretch'
    }}>
      <button style={{ flexShrink: 1 }} onClick={() => setFiltering(!filtering)}>Filter</button>
      <SlideOutGroup>
        {items.filter((_item, index) => !filtering || index % 2 === 0).map(item => (
          <SlideOutControl key={item} groupId={item} label={`Slide out controls for ${item}`}>
            Slide Out: {item}
          </SlideOutControl>
        ))}
      </SlideOutGroup>
    </div>
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
