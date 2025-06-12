
'use client';
import Image from 'next/image';
import Link from 'next/link';

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
     <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1">
  <div className="flex items-center gap-6">
   <Image
  src={coin.image}
  alt={coin.name}
  width={56}
  height={56}
  className="rounded-full border border-gray-600 p-1 bg-gray-900 object-contain"
/>
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
      <div className="text-gray-300 text-sm">
        <p className="mb-1">Current Price:</p>
        <p className="text-lg font-medium">${coin.current_price.toLocaleString()}</p>
        <p
          className={`text-sm font-semibold ${
            coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  </div>
</div>

    </Link>
  );
}
