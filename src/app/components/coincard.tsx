'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CoinCard({ coin }: { coin: Coin }) {
  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-200 h-full">
        <div className="flex items-center space-x-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={64}
            height={64}
            className="w-16 h-16 object-contain rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold capitalize">{coin.name}</h2>
            <p className="text-gray-400 text-sm uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div className="mt-4 text-lg font-medium">
          💰 ${coin.current_price.toLocaleString()}
        </div>
        <div
          className={`mt-1 text-sm font-semibold ${
            coin.price_change_percentage_24h >= 0
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    </Link>
  );
}
