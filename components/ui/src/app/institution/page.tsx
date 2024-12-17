'use client';

import { CompanyProfile, FundamentalData, SymbolInfo, TechnicalAnalysis } from 'react-ts-tradingview-widgets';
import { Card } from 'antd';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { COPYRIGHT_STYLES } from '~/utils';

const AdvancedRealTimeChart = dynamic(() => import('react-ts-tradingview-widgets').then((w) => w.AdvancedRealTimeChart), {
  ssr: false,
});
const SymbolOverview = dynamic(() => import('react-ts-tradingview-widgets').then((w) => w.SymbolOverview), {
  ssr: false,
});

export default function Institution() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get('tvwidgetsymbol');

  if (!symbol) return null;

  return (
    <div className='flex flex-col gap-4'>
      <SymbolInfo symbol={symbol} autosize copyrightStyles={COPYRIGHT_STYLES} />
      <div className='grid grid-cols-2 gap-4'>
        <Card classNames={{ body: '!p-0 h-96' }} size='small' title='Real-Time Chart'>
          <AdvancedRealTimeChart symbol={symbol} autosize copyrightStyles={COPYRIGHT_STYLES} />
        </Card>
        <Card classNames={{ body: '!p-0 h-96' }} size='small' title='Overview'>
          <SymbolOverview
            symbols={[[symbol]]}
            dateFormat='yyyy-MM-dd'
            widgetFontColor='black'
            showVolume
            autosize
            isTransparent
            copyrightStyles={COPYRIGHT_STYLES}
          />
        </Card>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <Card classNames={{ body: '!p-0 h-96' }} size='small' title='Analysis'>
          <TechnicalAnalysis symbol={symbol} autosize isTransparent copyrightStyles={COPYRIGHT_STYLES} />
        </Card>
        <Card classNames={{ body: '!p-0 h-96' }} size='small' title='Fundamental'>
          <FundamentalData symbol={symbol} autosize isTransparent copyrightStyles={COPYRIGHT_STYLES} />
        </Card>
        <Card classNames={{ body: '!p-0 h-96' }} size='small' title='Profile'>
          <CompanyProfile symbol={symbol} autosize isTransparent copyrightStyles={COPYRIGHT_STYLES} />
        </Card>
      </div>
    </div>
  );
}
