'use client';

import { PropsWithChildren } from 'react';

import { ConfigProvider } from 'antd';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Provider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider theme={{ hashed: false, components: { Layout: {} } }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConfigProvider>
  );
}
