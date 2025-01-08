import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddItem from './AddItem';
import ItemList from './ItemList';
import EditItem from './EditItem';  // Import the new EditItem component
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Item Management</h1>
        <Routes>
          {/* Default route - Add Item */}
          <Route path="/" element={<AddItem />} />
          {/* Item List route */}
          <Route path="/items" element={<ItemList />} />
          {/* Edit Item route */}
          <Route path="/edit/:id" element={<EditItem />} />  {/* Dynamic route for editing an item */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
