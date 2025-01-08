import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation

function AddItem() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();  // Initialize navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/additem', { name, description });
            alert(response.data.message);  // Show success message
            setName('');  // Reset name field
            setDescription('');  // Reset description field
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Error adding item');
        }
    };

    return (
        <div>
            <h2>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>

            {/* Button to navigate to Item List page */}
            <button onClick={() => navigate('/items')}>View Item List</button>
        </div>
    );
}

export default AddItem;
