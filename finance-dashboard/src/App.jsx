import React, { useState } from "react";
import "./App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function App() {
  const [section, setSection] = useState("currency");
  const [range, setRange] = useState("7d");

  const generateData = (base, volatility, days) => {
    let data = [];
    let value = base;
    for (let i = 0; i < days; i++) {
      value += (Math.random() - 0.5) * volatility;
      data.push({ name: `Day ${i + 1}`, value: parseFloat(value.toFixed(2)) });
    }
    return data;
  };

  const getDays = () => (range === "7d" ? 7 : range === "30d" ? 30 : 365);

  const dataMap = {
    currency: {
      EUR: generateData(4.2, 0.05, getDays()),
      USD: generateData(3.9, 0.05, getDays()),
      GBP: generateData(5.1, 0.05, getDays()),
    },
    crypto: {
      BTC: generateData(65000, 800, getDays()),
      ETH: generateData(3200, 80, getDays()),
      SOL: generateData(160, 10, getDays()),
    },
    stocks: {
      AAPL: generateData(185, 3, getDays()),
      TSLA: generateData(255, 10, getDays()),
      NVDA: generateData(460, 8, getDays()),
    },
  };

  const colors = {
    currency: ["#4ade80", "#60a5fa", "#facc15"],
    crypto: ["#f59e0b", "#22d3ee", "#a855f7"],
    stocks: ["#f87171", "#4ade80", "#60a5fa"],
  };

  const CombinedChart = ({ title, dataSet, colorSet }) => {
    const allData = Object.keys(dataSet).map((key) => ({
      name: key,
      data: dataSet[key],
    }));

    return (
      <div className="chart-box full">
        <div className="chart-header">
          <h3>{title}</h3>
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #4ade80",
              }}
            />
            <Legend />
            {allData.map((entry, i) => (
              <Line
                key={i}
                type="monotone"
                data={entry.data}
                dataKey="value"
                stroke={colorSet[i]}
                name={entry.name}
                strokeWidth={3}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>FinancePro</h2>
        <ul>
          <li
            className={section === "currency" ? "active" : ""}
            onClick={() => setSection("currency")}
          >
            💱 Currency Rates
          </li>
          <li
            className={section === "crypto" ? "active" : ""}
            onClick={() => setSection("crypto")}
          >
            ₿ Crypto Prices
          </li>
          <li
            className={section === "stocks" ? "active" : ""}
            onClick={() => setSection("stocks")}
          >
            📈 Stock Market
          </li>
        </ul>

        <div className="range-selector">
          <h4>Range</h4>
          {["7d", "30d", "1y"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={range === r ? "active" : ""}
            >
              {r}
            </button>
          ))}
        </div>
      </aside>

      <main className="content wide">
        <div className="top-bar">
          <h2>
            {section === "currency"
              ? "Currency Rates"
              : section === "crypto"
              ? "Crypto Prices"
              : "Stock Market"}
          </h2>
          <button className="refresh-btn" onClick={() => window.location.reload()}>
            🔄 Refresh
          </button>
        </div>

        <CombinedChart
          title={
            section === "currency"
              ? "Currency Comparison"
              : section === "crypto"
              ? "Crypto Performance"
              : "Stock Trends"
          }
          dataSet={dataMap[section]}
          colorSet={colors[section]}
        />
      </main>
    </div>
  );
}

export default App;