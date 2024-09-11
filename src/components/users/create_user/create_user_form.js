import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import toast from "react-hot-toast";
import { FaTimes } from 'react-icons/fa';

function CreateUserForm({ getAllUsers }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [suggestions, setSuggestions] = useState([]); // For storing name suggestions

    const handleClose = () => {
        setShow(false);
        setName('');
        setGender('');
        setAddress('');
        setAmount('');
    };
    const handleShow = () => setShow(true);

    // Fetch suggestions based on the name input
    const fetchNameSuggestions = async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/user/search`, {
                params: { query }
            });
            setSuggestions(res.data.users || []); // Set suggestions from API
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    // Handle form submission to create a new user
    const createUser = async (e) => {
        e.preventDefault();
        try {
            const user = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`,
                { name, gender, address, amount }
            );

            if (user.data.success) {
                toast.success("User registered successfully");
                handleClose();
                getAllUsers();
            } else {
                handleClose();
                toast.error("User already registered");
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleNameChange = (e) => {
        const input = e.target.value;
        setName(input);
        fetchNameSuggestions(input); // Fetch suggestions after 3 characters
    };

    const handleSuggestionClick = (user) => {
        setName(user.name);
        setGender(user.gender);
        setAddress(user.address);
        setAmount(user.amount);
        setSuggestions([]); // Clear suggestions after selection
    };

    return (
        <>
            <Button className="btn btn-primary my-2" onClick={handleShow}>
                Create User
            </Button>

            <Modal show={show} onHide={handleClose} className="border-4">
                <div className="p-4 border border-4 rounded-3">
                    <form onSubmit={createUser}>
                        <div>
                            <div className="py-2 d-flex justify-content-between">
                                <h3 className="col-md-9">Create a new user</h3>
                                <button
                                    className="btn btn-light"
                                    onClick={handleClose}
                                >
                                    <FaTimes size={20} /> {/* Use the FaTimes icon */}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3 form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                value={name} required
                                onChange={handleNameChange}
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                            />
                            {/* Render suggestions */}
                            {suggestions.length > 0 && (
                                <ul className="list-group mt-2">
                                    {suggestions.map((user) => (
                                        <li
                                            key={user._id}
                                            className="list-group-item" style={{ cursor: 'pointer' }}
                                            onClick={() => handleSuggestionClick(user)}
                                        >
                                            {user.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="mb-3 form-group">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-control"
                                id="gender"
                                placeholder="Enter gender"
                                required
                            />
                        </div>

                        <div className="mb-3 form-group">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="address"
                                placeholder="Enter your address"
                                required
                            />
                        </div>

                        <div className="mb-3 form-group">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="form-control"
                                id="amount"
                                placeholder="Enter the amount"
                                required
                            />
                        </div>
                        <div className="row d-flex justify-content-center mt-4">
                            <button type="submit" className="w-50 btn btn-primary py-2">Register</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default CreateUserForm;
