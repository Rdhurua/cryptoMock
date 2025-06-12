'use client';

import { useState, useEffect } from 'react';

type Trade = {
  type: 'buy' | 'sell';
  coinId: string;
  quantity: number;
  price: number;
  timestamp: number;
};

export default function TradePanel({ coinId }: { coinId: string }) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState<number | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`)
      .then((res) => res.json())
      .then((data) => setPrice(data[coinId]?.usd || 0));

    const stored = localStorage.getItem('mockTrades');
    if (stored) {
      setTrades(JSON.parse(stored));
    }
  }, [coinId]);

  const handleTrade = (type: 'buy' | 'sell') => {
    if (!price || quantity <= 0) return;

    const newTrade: Trade = {
      type,
      coinId,
      quantity,
      price,
      timestamp: Date.now(),
    };

    const updated = [...trades, newTrade];
    setTrades(updated);
    localStorage.setItem('mockTrades', JSON.stringify(updated));
    setQuantity(0);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Mock Trade</h2>
      <p>Current Price: ${price ?? 'Loading...'}</p>
      <div className="flex items-center gap-2 mt-2">
       <input
  type="number"
  value={quantity}
  onChange={(e) => setQuantity(Number(e.target.value))}
  placeholder="Quantity"
  className="bg-gray-700 px-4 py-2 rounded-md text-white w-28 border border-gray-600"
/>
<button
  onClick={() => handleTrade('buy')}
  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium"
>
  Buy
</button>
<button
  onClick={() => handleTrade('sell')}
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium"
>
  Sell
</button>

      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-1">Trade History</h3>
        {trades
          .filter((t) => t.coinId === coinId)
          .map((t, idx) => (
            <div key={idx} className="text-sm">
              [{new Date(t.timestamp).toLocaleTimeString()}] {t.type.toUpperCase()} {t.quantity} @ ${t.price}
            </div>
          ))}
      </div>
    </div>
  );
}
