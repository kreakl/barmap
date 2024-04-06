import {
  BarCard,
  BarCardInfo,
  BarCardInfoProps,
  BarCardProps,
} from '../bar-card.ui';
import { type Meta, type StoryObj } from '@storybook/react';
import barImage from '@front-main/public/storybook/bar-img.png';

const meta: Meta<typeof BarCard> = {
  component: BarCard,
  decorators: [
    (Story) => (
      <>
        <div style={{ width: '500px', height: '500px' }}>
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BarCard>;

const infoFixture = {
  address: '6-я линия В.О.',
  categoryList: ['Паб', 'Пивной бар'],
  checkSum: 1300,
};

function Template({
  variant,
  title,
  imageUrl,
  description,
  ...barInfoProps
}: Omit<BarCardProps, 'children'> & BarCardInfoProps) {
  return (
    <BarCard
      title={title}
      description={description}
      variant={variant}
      imageUrl={imageUrl}
    >
      <BarCardInfo variant={variant} {...barInfoProps} />
    </BarCard>
  );
}

export const Small: Story = {
  args: {
    variant: { size: 'sm', shadow: true },
    title: 'Beer House',
    description: 'Сетевой пивной ресторан на Васильевском острове.',
  },
  render: (props) => <Template {...props} {...infoFixture} />,
};

export const SmallWithImage: Story = {
  args: {
    imageUrl: barImage,
    ...Small.args,
  },
  render: (props) => <Template {...props} {...infoFixture} />,
};

export const SmallWithImageRounded: Story = {
  args: {
    ...SmallWithImage.args,
    variant: { size: 'sm', shadow: true, rounded: true },
  },
  render: (props) => <Template {...props} {...infoFixture} />,
};

export const SmallLongText: Story = {
  args: {
    ...SmallWithImageRounded.args,
    title: `Beer House Beer House Beer House Beer House
      Beer House Beer House Beer House Beer House Beer House Beer House`,
    description: `Сетевой пивной ресторан на Васильевском острове.
      Сетевой пивнойресторан на Васильевском острове.
      Сетевой пивной ресторан наВасильевском острове.
      Сетевой пивной ресторан на Васильевскомострове. Сетевой пивной ресторан на Васильевском острове.`,
  },
  render: (props) => <Template {...props} {...infoFixture} />,
};

export const Medium: Story = {
  args: {
    ...Small.args,
    variant: { size: 'md', shadow: true, rounded: true },
  },
  render: (props) => <Template {...props} {...infoFixture} />,
};
