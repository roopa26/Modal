import React, { useState } from 'react';
import styles from "./UserDetailModal.module.css"

function XModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

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
        } else if (dob == "" || new Date(dob) > new Date()) {
            alert('Invalid date of birth. Date of birth cannot be in the future.');
        } else {
            setErrorMsg('');
            closeModal();
        }
    };

    return (
        <div className={isOpen ? `${styles.modalBck} ${styles.modal}` : styles.modal}>
            <h1>User Details Modal</h1>
            <button onClick={openModal}>Open Form</button>
            {isOpen && (
                <div className={styles.modalcontent}>
                    <h1>Fill Details</h1>
                    <form onSubmit={handleSubmit} className="modal-content">
                        <div className="modal-content">
                            <div className={styles.divSec}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                            </div>
                            <div className={styles.divSec}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className={styles.divSec}>
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className={styles.divSec}>
                                <label htmlFor="dob">Date of Birth:</label>
                                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)}/>
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                    {errorMsg && <p>{errorMsg}</p>}
                </div>
            )}
        </div>
    );
}

export default XModal;