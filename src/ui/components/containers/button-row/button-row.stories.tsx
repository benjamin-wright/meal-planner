import { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonRow } from './button-row'
import { Button } from '../../inputs/button/button';
import { IconButton } from '../../inputs/icon-button/icon-button';
import Pencil from '../../icons/pencil';
import Trash from '../../icons/trash';

const meta: Meta<typeof ButtonRow> = {
  component: ButtonRow,
};

export default meta;

type Story = StoryObj<typeof ButtonRow>;

export const Default: Story = {
  args: {
    children: [
      <Button id="button1" content="Button 1" kind="success" onClick={() => console.log('Button 1 clicked')} />,
      <Button id="button2" content="Button 2" kind="error" onClick={() => console.log('Button 2 clicked')} />,
    ]
  },
};

export const Spaced: Story = {
  args: {
    children: [
      <IconButton id="icon-button1" icon={<Pencil />} onClick={() => console.log('Icon Button 1 clicked')} />,
      <IconButton id="icon-button2" icon={<Trash />} kind="error" onClick={() => console.log('Icon Button 2 clicked')} />
    ],
    kind: 'spaced'
  },
};
