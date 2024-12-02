'use client';

import { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';

export function Provider({ children }: PropsWithChildren) {
  return <ConfigProvider theme={{ hashed: false, components: { Layout: {} } }}>{children}</ConfigProvider>;
}
