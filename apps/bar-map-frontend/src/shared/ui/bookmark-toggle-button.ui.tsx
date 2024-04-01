'use client';

import {
  BsBookmarkPlus as BookmarkToggle,
  BsBookmarkCheck as BookmarkUntoggle,
} from 'react-icons/bs';
import { useControllableState } from '@front-main/shared/lib';
import { tv, VariantProps } from 'tailwind-variants';
import { IconType } from 'react-icons';

type BookMarkToggleButtonProps = {
  value?: boolean;
  defaultValue?: boolean;
  bookmarkIcon?: IconType;
  undoBookmarkIcon?: IconType;
  onChange?: (value: boolean) => void;
  variants?: ButtonVariants;
};

export const bookmarkButtonStyles = tv({
  base: 'text-white',
  variants: {
    size: {
      md: 'p-3',
    },
    shape: {
      rounded: {
        base: 'rounded-full',
      },
    },
    color: {
      green: {
        base: 'accent-green-300',
      },
    },
  },
  defaultVariants: {
    color: 'green',
    size: 'md',
  },
});

type ButtonVariants = VariantProps<typeof bookmarkButtonStyles>;

export function BookmarkToggleButton({
  variants,
  bookmarkIcon,
  undoBookmarkIcon,
  ...props
}: BookMarkToggleButtonProps) {
  const [isToggled, setIsToggled] = useControllableState(props);
  const onClick = () => setIsToggled(!isToggled);

  return (
    <button onClick={onClick} className={bookmarkButtonStyles(variants)}>
      isToggled ? (bookmarkIcon || <BookmarkUntoggle />) : (undoBookmarkIcon ||{' '}
      <BookmarkToggle />)
    </button>
  );
}

export {
  BsBookmarkPlus as BookmarkPlus,
  BsBookmarkCheck as BookmarkCheck,
} from 'react-icons/bs';
