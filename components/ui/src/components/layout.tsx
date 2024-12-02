'use client';

import { PropsWithChildren, useMemo, useState } from 'react';
import { Breadcrumb as AntdBreadcrumb, Layout as AntdLayout, Menu } from 'antd';
import { NewspaperIcon, RadarIcon, ScanEyeIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const { Sider: AntdSider, Content: AntdContent } = AntdLayout;

const ICON_SIZE = 18;
const routers = [
  { key: '/watchlist', label: 'Watchlist', icon: <ScanEyeIcon size={ICON_SIZE} /> },
  { key: '/news', label: 'News', icon: <NewspaperIcon size={ICON_SIZE} /> },
];

function Sider() {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <AntdSider
      className='border-divider border-r'
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className='flex h-16 items-center justify-center gap-2 text-xl font-semibold text-foreground'>
        <RadarIcon size={28} />
        <span className='[.ant-layout-sider-collapsed_&]:hidden'>SCRM</span>
      </div>

      <Menu mode='inline' selectedKeys={[pathname]} items={routers} onSelect={({ key }) => push(key)} />
    </AntdSider>
  );
}

function Breadcrumb() {
  const pathname = usePathname();

  const title = useMemo(() => {
    const router = routers.find((router) => pathname.startsWith(router.key));
    return router?.label;
  }, [pathname]);

  return (
    <div className='border-divider flex h-16 items-center border-b bg-background px-4'>
      <AntdBreadcrumb items={[{ title }]} />
    </div>
  );
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <AntdLayout className='!min-h-screen' hasSider>
      <Sider />

      <AntdLayout>
        <AntdContent>
          <Breadcrumb />

          <div className='p-4'>{children}</div>
        </AntdContent>
      </AntdLayout>
    </AntdLayout>
  );
}
