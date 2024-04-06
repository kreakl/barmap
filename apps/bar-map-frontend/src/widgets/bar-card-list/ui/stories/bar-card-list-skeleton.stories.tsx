import { BarCardListSkeleton } from '@front-main/widgets/bar-card-list/ui/bar-card-list-skeleton.ui';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BarCardListSkeleton> = {
  component: BarCardListSkeleton,
  decorators: [
    (Story) => (
      <>
        <div style={{ width: '900px', height: '1200px' }}>
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BarCardListSkeleton>;

export const Main: Story = {
  render: () => <BarCardListSkeleton />,
};
