// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { fetchTopCoins } from '@/app/lib/api';
import CoinCard from './components/coincard';
import Portfolio from './components/portfolio';


export default function HomePage() {
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    fetchTopCoins().then(setCoins);
  }, []);

  return (
  <main className="min-h-screen bg-gray-900 text-white p-4 lg:p-8">
  <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">🚀 Top Crypto Coins</h1>

  <div className="lg:flex lg:space-x-8">
    {/* Coins List */}
    <div className="lg:w-2/3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {coins.map((coin, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-md hover:shadow-2xl transition duration-300 h-full border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="text-xl font-semibold capitalize">{coin.name}</h2>
                <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
              </div>
            </div>

            <div className="mt-6 text-lg font-medium">
              💰 ${coin.current_price.toLocaleString()}
            </div>
            <div
              className={`mt-1 text-base font-bold ${
                coin.price_change_percentage_24h >= 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Portfolio Section */}
    <div className="lg:w-1/3 mt-10 lg:mt-0">
      <Portfolio />
    </div>
  </div>
</main>


  );
}
