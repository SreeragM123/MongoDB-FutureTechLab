import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditItem() {
    const { id } = useParams();  // Get the item's ID from the URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Fetch the item data when the component mounts
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/item/${id}`);
                setName(response.data.name);
                setDescription(response.data.description);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchItem();
    }, [id]);

    // Handle form submission (update item)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/item/${id}`, { name, description });
            alert(response.data.message);
            navigate('/items');  // Redirect back to the item list
        } catch (error) {
            console.error('Error updating item:', error);
            alert('Error updating item');
        }
    };

    return (
        <div>
            <h2>Edit Item</h2>
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
                <button type="submit">Update Item</button>
            </form>
        </div>
    );
}

export default EditItem;
