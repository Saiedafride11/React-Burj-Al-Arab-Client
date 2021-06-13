import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h4>You Have {bookings.length} Bookings</h4>
            {
                // bookings.map(book => <li>Name: {book.name} Form: {book.checkIn} To: {book.checkOut}</li>)
                bookings.map(book => <li key={book._id}>Name: {book.name} Form: {new Date(book.checkIn).toDateString('dd/MM/yyyy')} To: {new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;