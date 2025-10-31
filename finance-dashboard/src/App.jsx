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

  const dataMap = {
    currency: {
      EUR: generateData(4.2, 0.05, range === "7d" ? 7 : range === "30d" ? 30 : 365),
      USD: generateData(3.9, 0.05, range === "7d" ? 7 : range === "30d" ? 30 : 365),
      GBP: generateData(5.1, 0.05, range === "7d" ? 7 : range === "30d" ? 30 : 365),
    },
    crypto: {
      BTC: generateData(65000, 800, range === "7d" ? 7 : range === "30d" ? 30 : 365),
      ETH: generateData(3200, 80, range === "7d" ? 7 : range === "30d" ? 30 : 365),
      SOL: generateData(160, 10, range === "7d" ? 7 : range === "30d" ? 30 : 365),
    },
    stocks: {
      AAPL: generateData(185, 3, range === "7d" ? 7 : range === "30d" ? 30 : 365),
      TSLA: generateData(255, 10, range === "7d" ? 7 : range === "30d" ? 30 : 365),
      NVDA: generateData(460, 8, range === "7d" ? 7 : range === "30d" ? 30 : 365),
    },
  };

  const ChartBox = ({ title, data, color }) => {
    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const diff = ((values[values.length - 1] - values[0]) / values[0]) * 100;

    return (
      <div className="chart-box wide">
        <div className="chart-header">
          <h3>{title}</h3>
          <div className="stats">
            <p>📈 High: {max.toFixed(2)}</p>
            <p>📉 Low: {min.toFixed(2)}</p>
            <p className={diff >= 0 ? "positive" : "negative"}>
              {diff >= 0 ? "▲" : "▼"} {diff.toFixed(2)}%
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #4ade80",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCharts = () => {
    const colors = {
      currency: "#4ade80",
      crypto: "#60a5fa",
      stocks: "#facc15",
    };
    return Object.keys(dataMap[section]).map((key, i) => (
      <ChartBox key={i} title={key} data={dataMap[section][key]} color={colors[section]} />
    ));
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

      <main className="content">
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

        <div className="charts-container">{renderCharts()}</div>
      </main>
    </div>
  );
}

export default App;