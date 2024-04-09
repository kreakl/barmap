import Link from 'next/link';
import { languages } from '@front-main/shared/model/i18n/settings';

type SwitchLocaleProps = {
  language: string;
  path?: string;
};

export const SwitchLocale = ({ language, path = '' }: SwitchLocaleProps) => {
  return (
    <div>
      {languages
        .filter((l) => language !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' or '}
              <Link href={`/${l}${path}`}>{l}</Link>
            </span>
          );
        })}
    </div>
  );
};
