import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ItemList() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();  // Initialize navigate function

    // Fetch items when component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/item');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Delete an item
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/item/${id}`);
            alert(response.data.message);
            setItems(items.filter(item => item._id !== id)); // Remove the deleted item from state
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
        }
    };

    // Navigate to edit page
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);  // Route to the edit page with the item's ID
    };

    return (
        <div>
            <h2>Item List</h2>
            <ul>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item._id}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => handleEdit(item._id)}>Edit</button>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </ul>
        </div>
    );
}

export default ItemList;
