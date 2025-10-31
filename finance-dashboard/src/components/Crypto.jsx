import { useEffect, useState } from "react";
import axios from "axios";

function Crypto() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: { vs_currency: "usd", order: "market_cap_desc", per_page: 10 },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="section">
      <h2>₿ Crypto Market</h2>
      <div className="crypto-grid">
        {coins.map((coin) => (
          <div key={coin.id} className="crypto-card">
            <img src={coin.image} alt={coin.name} />
            <h4>{coin.name}</h4>
            <p>${coin.current_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crypto;