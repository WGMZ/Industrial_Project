import { Card, List } from 'antd';
import { ActivityIcon, AtSignIcon, FrownIcon, TrendingDownIcon } from 'lucide-react';

function Summaries() {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <SummaryItem title='Top 5 Volatile' icon={<ActivityIcon size={16} />} />
      <SummaryItem title='Top 5 Decliners' icon={<TrendingDownIcon size={16} />} />
      <SummaryItem title='Top 5 Negative News' icon={<FrownIcon size={16} />} />
      <SummaryItem title='Top 5 Mentions' icon={<AtSignIcon size={16} />} />
    </div>
  );
}

function SummaryItem({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <Card
      classNames={{ body: '!p-4' }}
      title={
        <div className='flex items-center gap-2'>
          <div className='bg-content2 rounded-md p-2'>{icon}</div>
          <span>{title}</span>
        </div>
      }
    >
      <List></List>
    </Card>
  );
}

function Securities() {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-medium'>All Securities</p>
    </div>
  );
}

export default function Index() {
  return (
    <div className='flex flex-col gap-4'>
      <Summaries />
      <Securities />
    </div>
  );
}
