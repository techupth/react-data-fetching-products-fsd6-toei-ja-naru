import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [productProfile, setProductProfile] = useState();

  async function getProductProfile() {
    const result = await axios.get("http://localhost:4001/products");
    // console.log(result);
    setProductProfile(result.data.data); //[object]
  }

  const handleOnClickDelete = async (id) => {
    const newResult = await axios.delete(
      `http://localhost:4001/products/${id}`
    );
    getProductProfile();
  };
  useEffect(() => {
    getProductProfile();
  }, []);

  const insertProduct = (value, index) => {
    return (
      <div className="product">
        <div className="product-preview">
          <img
            // src="https://via.placeholder.com/350/350"
            src={value.image}
            alt="some product"
            width="350"
            height="350"
          />
        </div>
        <div className="product-detail" key={value.id}>
          <h1>
            Product name: {value.name} #{value.id}
          </h1>
          <h2>Product price: {value.price} Baht</h2>
          <p>Product description: {value.description}</p>
        </div>
        <button
          className="delete-button"
          onClick={() => {
            handleOnClickDelete(value.id);
          }}
        >
          x
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {productProfile ? productProfile.map(insertProduct) : "Loading . . . ."}
      </div>
    </div>
  );
}

export default App;
