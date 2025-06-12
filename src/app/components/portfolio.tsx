'use client';

import { useEffect, useState } from 'react';

type Trade = {
  type: 'buy' | 'sell';
  coinId: string;
  quantity: number;
  price: number;
  timestamp: number;
};

type CoinData = {
  [coinId: string]: {
    quantity: number;
    totalCost: number;
  };
};

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<CoinData>({});
const [currentPrices, setCurrentPrices] = useState<{ [coinId: string]: { usd: number } }>({});


  useEffect(() => {
    const stored = localStorage.getItem('mockTrades');
    if (stored) {
      const trades: Trade[] = JSON.parse(stored);
      const data: CoinData = {};

      trades.forEach((trade) => {
        if (!data[trade.coinId]) {
          data[trade.coinId] = { quantity: 0, totalCost: 0 };
        }

        if (trade.type === 'buy') {
          data[trade.coinId].quantity += trade.quantity;
          data[trade.coinId].totalCost += trade.quantity * trade.price;
        } else if (trade.type === 'sell') {
          data[trade.coinId].quantity -= trade.quantity;
          data[trade.coinId].totalCost -= trade.quantity * trade.price; // simple approximation
        }
      });

      setPortfolio(data);

      // fetch live prices for all coins in portfolio
      const coinIds = Object.keys(data).join(',');
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`)
        .then((res) => res.json())
        .then((prices) => setCurrentPrices(prices));
    }
  }, []);

  const getPL = (coinId: string) => {
    const coin = portfolio[coinId];
  const priceObj = currentPrices[coinId];

  if (!coin || !priceObj || typeof priceObj.usd !== 'number') return null;

  const currentPrice = priceObj.usd;
  const avgPrice = coin.totalCost / coin.quantity;
  const pnl = (currentPrice - avgPrice) * coin.quantity;

    if (coin.quantity === 0) {
    return {
      currentPrice,
      avgPrice: 0,
      pnl: 0,
    };
  }

  return {
    currentPrice,
    avgPrice,
    pnl,
  };
  };

  return (
   <div className=" p-4 rounded-lg text-white mt-8">
  <h2 className="text-xl font-bold mb-4 text-center">📊 Portfolio Overview</h2>
  {Object.keys(portfolio).length === 0 ? (
    <p>No trades yet.</p>
  ) : (
    <div className="overflow-x-auto bg-gray-800 rounded-md p-1 md:p-4">
      <table className="min-w-full text-sm mt-4">
        <thead>
          <tr className="text-left border-b border-gray-700 uppercase text-gray-400 text-xs">
            <th className="py-2 px-2">Coin</th>
            <th className="px-2">Qty</th>
            <th className="px-2">Avg Buy</th>
            <th className="px-2">Current</th>
            <th className="px-2">P/L</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(portfolio).map((coinId) => {
            const stats = getPL(coinId);
            if (!stats) return null;

            return (
              <tr
                key={coinId}
                className="border-b border-gray-800 hover:bg-gray-700 transition"
              >
                <td className="py-2 px-2 capitalize font-semibold">{coinId}</td>
                <td className="px-2">{portfolio[coinId].quantity.toFixed(4)}</td>
                <td className="px-2">${stats.avgPrice.toFixed(2)}</td>
                <td className="px-2">${stats.currentPrice.toFixed(2)}</td>
                <td
                  className={`px-2 ${
                    stats.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stats.pnl.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}
