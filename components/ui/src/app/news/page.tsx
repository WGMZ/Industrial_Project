'use client';

import { List } from 'antd';

export default function News() {
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-medium'>News</p>

      <List itemLayout='vertical' size='large' dataSource={[]} renderItem={(news) => <div>1</div>} />
    </div>
  );
}
