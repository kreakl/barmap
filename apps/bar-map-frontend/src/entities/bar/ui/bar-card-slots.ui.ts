import { tv, VariantProps } from 'tailwind-variants';

export const barCardSlots = tv({
  slots: {
    _base: '*:flex-1 flex flex-col',
    _content: 'flex flex-col p-2',
    _header: 'flex gap-2',
    _title:
      'overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-zinc-800',
    _description: 'font-medium leading-3 text-zinc-800',
    _infoContainer: '*:flex-1 flex w-3/4 flex-wrap gap-y-2',
    _info: 'flex gap-2 align-middle text-zinc-400',
    _infoText: 'overflow-ellipsis text-sm font-medium',
    _image: 'object-fill',
  },
  variants: {
    rounded: {
      true: {
        _base: 'rounded-md',
        _image: 'rounded-t-md',
      },
    },
    shadow: {
      true: {
        _base: 'shadow-[0px_8px_20px_4px_zinc-300] shadow-zinc-500',
      },
    },
    size: {
      sm: {
        _infoContainer: 'gap-x-3',
        _base: 'w-80',
        _title: 'text-base',
        _content: 'gap-2 p-3',
        _description: 'text-sm',
      },
      md: {
        _infoContainer: 'gap-x-6',
        _title: 'text-lg',
        _content: 'gap-4 p-5',
        _description: 'text-base',
      },
    },
  },
});

export type BarCardVariants = VariantProps<typeof barCardSlots>;
