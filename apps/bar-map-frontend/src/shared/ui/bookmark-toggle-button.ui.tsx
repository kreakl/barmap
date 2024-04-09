'use client';

import React, { ReactNode } from 'react';
import {
  BsBookmarkPlus as BookmarkToggle,
  BsBookmarkCheck as BookmarkUntoggle,
} from 'react-icons/bs';
import { tv, VariantProps } from 'tailwind-variants';
import { useControllableState } from '@front-main/shared/lib/use-controllable-state.hook';

type BookMarkToggleButtonProps = {
  value?: boolean;
  defaultValue?: boolean;
  bookmarkIcon?: ReactNode;
  undoBookmarkIcon?: ReactNode;
  onChange?: (value: boolean) => void;
  variants?: ButtonVariants;
};

export const bookmarkButtonStyles = tv({
  base: 'text-zinc-400 outline outline-2 outline-gray-200',
  variants: {
    size: {
      md: 'p-2',
    },
    shape: {
      rounded: 'rounded-full',
    },
    color: {
      green: 'hover:bg-green-500 hover:text-white hover:outline-none',
    },
  },
  defaultVariants: {
    color: 'green',
    size: 'md',
    shape: 'rounded',
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
      {isToggled
        ? bookmarkIcon || <BookmarkUntoggle className="h-4 w-4 stroke-1" />
        : undoBookmarkIcon || <BookmarkToggle className="h-4 w-4 stroke-1" />}
    </button>
  );
}

export {
  BsBookmarkPlus as BookmarkPlus,
  BsBookmarkCheck as BookmarkCheck,
} from 'react-icons/bs';
