'use client';

import GaugeComponent from 'react-gauge-component';
import { MiniChart, SingleTicker, TickerTape } from 'react-ts-tradingview-widgets';
import { useQuery } from '@tanstack/react-query';
import { Card, List, ListProps, Statistic } from 'antd';
import { sampleSize } from 'lodash-es';
import { ActivityIcon, AtSignIcon, FrownIcon, TrendingDownIcon } from 'lucide-react';

import { api, API_URL, COPYRIGHT_STYLES, LARGE_CHART_URL } from '~/utils';

interface Institutional {
  id: string;
  name: string;
  symbol: string;
}

function Summaries() {
  const { data: summaries } = useQuery({
    queryKey: ['summaries'],
    queryFn: ({ signal }) => api.get('/summary', { signal }),
  });

  if (!summaries || !summaries.data) return null;

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <SummaryItem<Institutional>
        title='Top 5 Volatiles'
        icon={<ActivityIcon size={16} />}
        data={sampleSize(summaries.data.volatiles, 5)}
        render={(item) => (
          <List.Item>
            <div className='flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg'>
              <img src={`${API_URL}/static/icons/${item.id}.svg`} alt={item.name} />
            </div>
            <List.Item.Meta className='ml-2' title={item.name} description={item.symbol} />
            <div>{(Math.random() * 0.8 * 50).toFixed(2)}%</div>
          </List.Item>
        )}
      />
      <SummaryItem<Institutional>
        title='Top 5 Decliners'
        icon={<TrendingDownIcon size={16} />}
        data={sampleSize(summaries.data.decliners, 5)}
        render={(item) => (
          <List.Item>
            <div className='flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg'>
              <img src={`${API_URL}/static/icons/${item.id}.svg`} alt={item.name} />
            </div>
            <List.Item.Meta className='ml-2' title={item.name} description={item.symbol} />
            <div>-{(Math.random() * 0.8 * 50).toFixed(2)}%</div>
          </List.Item>
        )}
      />
      <SummaryItem<Institutional>
        title='Top 5 Negative News'
        icon={<FrownIcon size={16} />}
        data={sampleSize(summaries.data.negativeNews, 5)}
        render={(item) => (
          <List.Item>
            <div className='flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg'>
              <img src={`${API_URL}/static/icons/${item.id}.svg`} alt={item.name} />
            </div>
            <List.Item.Meta className='ml-2' title={item.name} description={item.symbol} />
            <div>{(Math.random() * 0.8 * 10).toFixed(0)}</div>
          </List.Item>
        )}
      />
      <SummaryItem<Institutional>
        title='Top 5 Mentions'
        icon={<AtSignIcon size={16} />}
        data={sampleSize(summaries.data.mentions, 5)}
        render={(item) => (
          <List.Item>
            <div className='flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg'>
              <img src={`${API_URL}/static/icons/${item.id}.svg`} alt={item.name} />
            </div>
            <List.Item.Meta className='ml-2' title={item.name} description={item.symbol} />
            <div>{(Math.random() * 0.8 * 50).toFixed(0)}</div>
          </List.Item>
        )}
      />
    </div>
  );
}

function SummaryItem<T = unknown>({
  title,
  icon,
  data,
  render,
}: {
  title: string;
  icon: React.ReactNode;
  data: T[];
  render: ListProps<T>['renderItem'];
}) {
  return (
    <Card
      classNames={{ body: '!px-2 !py-0' }}
      title={
        <div className='flex items-center gap-2'>
          <div className='rounded-md bg-content2 p-2'>{icon}</div>
          <span>{title}</span>
        </div>
      }
    >
      <List itemLayout='horizontal' dataSource={data} renderItem={render} />
    </Card>
  );
}

function Securities() {
  const { data: institutions } = useQuery({
    queryKey: ['institutions'],
    queryFn: ({ signal }) => api.get('/institution', { signal }),
  });

  if (!institutions || !institutions.data) return null;

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-medium'>All Securities</p>

      <TickerTape
        symbols={institutions?.data.map((item: any) => ({ proName: item.symbol }))}
        displayMode='compact'
        isTransparent
        largeChartUrl={LARGE_CHART_URL}
        copyrightStyles={COPYRIGHT_STYLES}
      />

      <List
        itemLayout='vertical'
        size='large'
        itemLayout='horizontal'
        dataSource={institutions?.data}
        renderItem={(item: any) => (
          <List.Item key={item.id} className='my-2 !p-0'>
            {/* <List.Item.Meta
              avatar={
                <div className='flex aspect-square w-16 overflow-hidden rounded-lg bg-background'>
                  <img src={`${API_URL}/static/icons/${item.id}.svg`} />
                </div>
              }
            /> */}
            <div className='grid w-full grid-cols-2 gap-2 overflow-hidden rounded-md bg-background py-1 md:grid-cols-6 xl:grid-cols-12 [&>*]:h-32'>
              <div className='col-span-2 md:col-span-6 xl:col-span-5'>
                <SingleTicker
                  symbol={item.symbol}
                  autosize
                  isTransparent
                  largeChartUrl={LARGE_CHART_URL}
                  copyrightStyles={COPYRIGHT_STYLES}
                />
              </div>

              <div className='col-span-1 flex flex-col items-center'>
                <span className='text-zinc-400'>Volatility</span>
                <Statistic value={1} precision={2} suffix='%' />
              </div>
              <div className='col-span-1 flex flex-col items-center'>
                <span className='text-zinc-400'>News</span>
                <Statistic value={1} />
              </div>
              <div className='col-span-1 flex flex-col items-center'>
                <span className='text-zinc-400'>Negative News</span>
                <Statistic value={1} />
              </div>
              <div className='col-span-2 flex aspect-video flex-col items-center'>
                <MiniChart
                  symbol={item.symbol}
                  dateRange='1D'
                  autosize
                  isTransparent
                  chartOnly
                  largeChartUrl={LARGE_CHART_URL}
                  copyrightStyles={COPYRIGHT_STYLES}
                />
              </div>
              <div className='col-span-2 flex flex-col items-center'>
                <span className='text-zinc-400'>Leverage Ratio</span>
                <GaugeComponent
                  className='[&>svg]:w-48'
                  value={Math.random() * 0.8 * 100}
                  arc={{
                    subArcs: [
                      { limit: 40, color: 'var(--tw-green-500)', showTick: true },
                      { limit: 70, color: 'var(--tw-yellow-500)', showTick: true },
                      { limit: 100, color: 'var(--tw-red-500)', showTick: true },
                    ],
                    emptyColor: 'var(--tw-content2)',
                  }}
                  labels={{ valueLabel: { matchColorWithArc: true, style: { fontSize: 28, textShadow: 'none' } } }}
                />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default function Watchlist() {
  return (
    <div className='flex flex-col gap-4'>
      <Summaries />
      <Securities />
    </div>
  );
}
