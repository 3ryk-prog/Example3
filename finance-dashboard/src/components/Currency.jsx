import { useEffect, useState } from "react";
import axios from "axios";

function Currency() {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState("USD");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
        setRates(res.data.rates);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRates();
  }, [base]);

  return (
    <div className="section">
      <h2>💵 Currency Exchange Rates</h2>
      <select value={base} onChange={(e) => setBase(e.target.value)}>
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
        <option>PLN</option>
      </select>

      <div className="currency-grid">
        {Object.entries(rates).slice(0, 20).map(([code, rate]) => (
          <div key={code} className="currency-card">
            <h4>{code}</h4>
            <p>{rate.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Currency;