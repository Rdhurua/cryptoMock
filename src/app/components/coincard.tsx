// components/CoinCard.tsx
'use client';
import Link from 'next/link';

export default function CoinCard({ coin }: { coin: any }) {
  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition">
        <div className="flex items-center space-x-4">
          <img src={coin.image} alt={coin.name} className="w-10 h-10" />
          <div>
            <h2 className="text-xl font-semibold">{coin.name}</h2>
            <p>${coin.current_price.toLocaleString()}</p>
            <p className={coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
