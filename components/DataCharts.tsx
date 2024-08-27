'use client';

import { useGetSummary } from '@/features/summary/api/useGetSummary';
import { Chart } from '@/components/Chart';

export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
    </div>
  );
};
