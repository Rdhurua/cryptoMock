// lib/api.ts
import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchTopCoins = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/markets`,
    {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
      },
    }
  );
  return data;
};

export const fetchCoinHistory = async (id: string, days = 7) => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: 'usd',
        days,
      },
    }
  );
  return data;
};
