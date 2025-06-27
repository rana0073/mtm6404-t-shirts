const { useState } = React;

function App() {
  const [items, setItems] = useState(tshirts.map(t => ({ ...t })));

  const handleBuy = (index) => {
    const updated = [...items];
    if (updated[index].stock >= updated[index].quantity) {
      updated[index].stock -= updated[index].quantity;
      updated[index].quantity = 1;
      setItems(updated);
    }
  };

  const handleChange = (index, value) => {
    const updated = [...items];
    updated[index].quantity = parseInt(value);
    setItems(updated);
  };

  return (
    <div>
      {items.map((tshirt, index) => (
        <div className="tshirt" key={index}>
          <h3>{tshirt.title}</h3>
          <img src={tshirt.image} alt={tshirt.title} />
          <p>Price: ${tshirt.price.toFixed(2)}</p>
          <p>
            {tshirt.stock > 0 ? `Stock: ${tshirt.stock}` : <strong>Out of Stock</strong>}
          </p>
          {tshirt.stock > 0 && (
            <>
              <select
                value={tshirt.quantity}
                onChange={(e) => handleChange(index, e.target.value)}
              >
                {Array.from({ length: tshirt.stock }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <button onClick={() => handleBuy(index)}>Buy</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
