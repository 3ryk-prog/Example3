import { useEffect, useState } from "react";
import axios from "axios";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/quote/AAPL,MSFT,NVDA,TSLA,AMZN?apikey=demo"
      )
      .then((res) => setStocks(res.data))
      .catch(() => console.error("Error fetching stocks"));
  }, []);

  return (
    <div className="section">
      <h2>📈 Stock Market (Demo API)</h2>
      <div className="table">
        {stocks.map((s) => (
          <div key={s.symbol} className="row">
            <span>{s.symbol}</span>
            <span>${s.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}