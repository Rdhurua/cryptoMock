'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCoinHistory } from '@/app/lib/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import TradePanel from '@/app/components/TradePanel';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// ✅ Proper type for CoinGecko response
type CoinHistory = {
  prices: [number, number][];
};

export default function CoinDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [history, setHistory] = useState<CoinHistory | null>(null);

  useEffect(() => {
    if (id) {
      fetchCoinHistory(id).then(setHistory);
    }
  }, [id]);

  const chartData = history
    ? {
        labels: history.prices
          .filter((_, i) => i % 4 === 0)
          .map(([timestamp]) =>
            new Date(timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          ),
        datasets: [
          {
            label: `${id} price (USD)`,
            data: history.prices
              .filter((_, i) => i % 4 === 0)
              .map(([, price]) => price),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
      },
      y: {
        ticks: { color: '#ccc' },
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 capitalize text-center text-white">{id}</h1>

      {chartData ? (
        <div className="bg-gray-800 p-6 rounded-xl mb-6 shadow">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="text-white text-center">Loading chart...</p>
      )}

      <TradePanel coinId={id} />
    </div>
  );
}
