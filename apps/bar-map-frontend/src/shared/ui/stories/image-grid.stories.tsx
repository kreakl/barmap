import { ImageGrid } from '@front-main/shared/ui/image-grid';
import { type Meta, type StoryObj } from '@storybook/react';
import img1 from '@front-main/public/storybook/bar-img.png';
import img2 from '@front-main/public/storybook/bar-img2.png';
import img3 from '@front-main/public/storybook/bar-img3.png';
import img4 from '@front-main/public/storybook/bar-img4.png';

const meta: Meta<typeof ImageGrid> = {
  component: ImageGrid,
  decorators: [
    (Story) => (
      <>
        <div style={{ width: '300px', height: '300px' }}>
          <Story />
        </div>
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImageGrid>;

export const Main: Story = {
  args: {
    imageUrls: [img1],
  },
  render: (props) => <ImageGrid {...props} />,
};

export const TwoImages: Story = {
  args: {
    imageUrls: [img1, img2],
  },
  render: (props) => <ImageGrid {...props} />,
};

export const ThreeImages: Story = {
  args: {
    imageUrls: [img1, img2, img3],
  },
  render: (props) => <ImageGrid {...props} />,
};

export const FourImages: Story = {
  args: {
    imageUrls: [img1, img2, img3, img4],
  },
  render: (props) => <ImageGrid {...props} />,
};

export const Rounded: Story = {
  args: {
    imageUrls: [img1, img2, img3, img4],
    variant: 'rounded',
  },
  render: (props) => <ImageGrid {...props} />,
};
