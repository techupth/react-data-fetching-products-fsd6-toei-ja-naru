import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const result = await axios.get("http://localhost:4001/products");
    // console.log(result);
    setProducts(result.data.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.delete(`http://localhost:4001/products/${id}`);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {products.map((item) => {
        return (
          <div className="product-list">
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name} </h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
