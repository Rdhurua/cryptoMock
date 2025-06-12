// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { fetchTopCoins } from '@/app/lib/api';
import CoinCard from './components/coincard';
import Portfolio from './components/portfolio';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}


export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    fetchTopCoins().then(setCoins);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Crypto Coins</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
      <Portfolio/>
    </main>
  );
}
