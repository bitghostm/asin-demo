import React, { useState } from 'react';
import axios from 'axios';

const ProductInsert: React.FC = () => {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);

  const insertProduct = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`http://localhost:3001/product/insert/${asin}`);
      alert(`${result.data.data.asin} ${result.data.status}`)
      setLoading(false);
    } catch (error) {
      alert(`${error}`)
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    insertProduct();
  }

  return (
      <>
        <h1>Insert Product</h1>
        <section>
          <form onSubmit={handleSubmit}>
            <label>
              ASIN:
              <input type='text' onChange={(e) => setAsin(e.target.value)}/>
            </label>
            <button type='submit' disabled={loading}>{ loading ? 'Inserting...' : 'Insert'}</button>
          </form>
        </section>
      </>
  );
}

export default ProductInsert;