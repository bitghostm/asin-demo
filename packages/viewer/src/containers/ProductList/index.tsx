import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/product/list');
      setProducts(result.data.data);
    }
    fetchData();
  }, [])
  return (
    <>
      <h1>All Products</h1>
      <table>
        <thead>
          <tr>
            <th>ASIN</th>
            <th>Category</th>
            <th>Rank</th>
            <th>Dimensions</th>
          </tr>
        </thead>
        <tbody>
          {(!products || !products.length) && <p>Loading Products...</p>}
          {products && products.map(({ asin, category, rank, dimensions }) => (
            <tr>
              <td>{asin}</td>
              <td>{category}</td>
              <td>{rank}</td>
              <td>{dimensions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductList;