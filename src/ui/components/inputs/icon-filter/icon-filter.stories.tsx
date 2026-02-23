import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconFilter } from './icon-filter';
import Egg from '../../icons/egg';
import Cog from '../../icons/cog';
import { useState } from 'react';

function IconFilterStories() {
  const [ search, setSearch ] = useState("")
  const [ filter, setFilter ] = useState({
    "egg": false
  })

  const icons = {
    "egg": <Egg />,
    "gear": <Cog />
  }
  
  return (
    <>
      <IconFilter icons={icons} search={search} filter={filter} onFilter={setFilter} onSearch={setSearch} />
      <br />
      <IconFilter search={search} onSearch={setSearch} />
    </>
  )
}

const meta = {
  component: IconFilterStories,
  args: {},
} satisfies Meta<typeof IconFilterStories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  }
};
