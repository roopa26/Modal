import React, { useState, useEffect, useRef } from 'react';
import "./UserDetailModal.css";

function XModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
                const isInsideForm = modalRef.current.querySelector('form').contains(event.target);
                const isOpenFormButtonClicked = event.target.tagName === 'BUTTON' && event.target.textContent === 'Open Form';
                if (!isInsideForm && !isOpenFormButtonClicked) {
                    closeModal();
                }
            }
        };
    
        document.body.addEventListener('click', handleClickOutside);
    
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);    
    

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setUsername('');
        setEmail('');
        setDob('');
        setPhone('');
        setErrorMsg('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phone)) {
            alert('Invalid phone number. Please enter a 10-digit phone number.');
        } else if (dob === "" || new Date(dob) > new Date()) {
            alert('Invalid date of birth. Date of birth cannot be in the future.');
        } else {
            setErrorMsg('');
            closeModal();
        }
    };

    return (
        <div className={isOpen ? 'modalBck maindiv' : 'maindiv'}>
            <h1>User Details Modal</h1>
            <button onClick={openModal}>Open Form</button>
            {isOpen && (
                <div className='modal'>
                    <div className='modal-content' ref={modalRef}>
                    <h1>Fill Details</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='divSec'>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                            <div className='divSec'>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className='divSec'>
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className='divSec'>
                                <label htmlFor="dob">Date of Birth:</label>
                                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/>
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                    {errorMsg && <p>{errorMsg}</p>}
                </div>
                </div>
            )}
        </div>
    );
}

export default XModal;
