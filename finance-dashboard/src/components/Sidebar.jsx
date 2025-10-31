function Sidebar({ setActiveSection, activeSection }) {
  return (
    <div className="sidebar">
      <h2>💰 Finance</h2>
      <ul>
        <li
          className={activeSection === "currency" ? "active" : ""}
          onClick={() => setActiveSection("currency")}
        >
          💵 Currency
        </li>
        <li
          className={activeSection === "stocks" ? "active" : ""}
          onClick={() => setActiveSection("stocks")}
        >
          📈 Stocks
        </li>
        <li
          className={activeSection === "crypto" ? "active" : ""}
          onClick={() => setActiveSection("crypto")}
        >
          ₿ Crypto
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;