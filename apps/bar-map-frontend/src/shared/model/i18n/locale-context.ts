'use client';

import { contextProviderFactory } from '@front-main/shared/model/context-provider-factory';

type LocaleContext = {
  lang: string;
};

export const { Provider: LocaleProvider, useContext: useLocaleContext } =
  contextProviderFactory<LocaleContext>('Locale');
