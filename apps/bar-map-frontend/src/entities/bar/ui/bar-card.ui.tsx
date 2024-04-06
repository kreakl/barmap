import Image, { ImageProps } from 'next/image';
import {
  PiMapPinThin as BarAddressIcon,
  PiWine as BarCategoryIcon,
} from 'react-icons/pi';
import { MdCurrencyRuble as BarBillIcon } from 'react-icons/md';

import {
  barCardSlots,
  BarCardVariants,
} from '@front-main/entities/bar/ui/bar-card-slots.ui';
import { ReactNode } from 'react';

export type BarCardProps = {
  title: string;
  headerActionSlot?: ReactNode;
  description: string;
  children: ReactNode;
  imageUrl?: ImageProps['src'];
  variant?: BarCardVariants;
};

export function BarCard({
  title,
  description,
  imageUrl,
  variant,
  headerActionSlot,
  children,
}: BarCardProps) {
  const { _base, _content, _title, _image, _description, _header } =
    barCardSlots(variant);

  return (
    <div className={_base()}>
      <div className={_content()}>
        {imageUrl && (
          <Image src={imageUrl} alt="Bar picture" className={_image()} />
        )}
        <div className={_header()}>
          <div className={_title()}>{title}</div>
          {headerActionSlot && <div>{headerActionSlot}</div>}
        </div>
        <div className={_description()}>{description}</div>
        {children}
      </div>
    </div>
  );
}

export type BarCardInfoProps = {
  address?: string;
  categoryList?: string[];
  billSum?: string | number;
  variant?: BarCardVariants;
};

export function BarCardInfo({
  address,
  categoryList,
  billSum,
  variant,
}: BarCardInfoProps) {
  const { _info, _infoText, _infoContainer } = barCardSlots(variant);

  return (
    <div className={_infoContainer()}>
      {address && (
        <div className={_info()}>
          <BarAddressIcon />
          <div className={_infoText()}>{address}</div>
        </div>
      )}
      {categoryList && (
        <div className={_info()}>
          <BarCategoryIcon />
          <div className={_infoText()}>{categoryList.join(', ')}</div>
        </div>
      )}
      {billSum && (
        <div className={_info()}>
          <BarBillIcon />
          <div className={_infoText()}>{billSum}</div>
        </div>
      )}
    </div>
  );
}

export {
  PiMapPinThin as BarAddressIcon,
  PiWine as BarFoodIcon,
} from 'react-icons/pi';
export { MdCurrencyRuble as BarCheckIcon } from 'react-icons/md';
