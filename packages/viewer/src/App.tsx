import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductList from './containers/ProductList';
import ProductInsert from './containers/ProductInsert';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <header>
          <p>ASIN Demo</p>
          <nav>
            <ul>
              <li>
                <Link to="/product/list">List ProductList</Link>
              </li>
              <li>
                <Link to="/product/insert">Insert Products</Link>
              </li>
            </ul>
          </nav>
        </header>
        <section>
          <Route path="/" exact component={ProductList} />
          <Route path="/product/list" component={ProductList} />
          <Route path="/product/insert" component={ProductInsert} />
        </section>
      </Router>
    </div>
  );
}

export default App;
