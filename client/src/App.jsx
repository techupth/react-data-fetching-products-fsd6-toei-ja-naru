import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setPosts(result.data.data);
    console.log(result.data.data);
  };

  const deletePost = async (id) => {
    await axios.delete(`	http://localhost:4001/products/${id}`);
    getPost();
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {posts.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt={item.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>{item.name}</h1>
                <h2>Price: {item.price.toLocaleString()} Baht</h2>
                <p>{item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deletePost(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
