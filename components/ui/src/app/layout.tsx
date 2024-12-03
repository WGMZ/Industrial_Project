import '~/globals.css';

import { PropsWithChildren } from 'react';

import { Metadata } from 'next';
import { Layout } from '~/components/layout';
import { Provider } from '~/provider';

import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: 'Securities Credit Risk Monitor',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body>
        <AntdRegistry>
          <Provider>
            <Layout>{children}</Layout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
