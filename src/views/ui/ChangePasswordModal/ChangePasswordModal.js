import React, { useState } from 'react';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ userId, onClose, onPasswordChange }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        try {
            await onPasswordChange(userId, newPassword);
            onClose();
        } catch (err) {
            setError('Failed to change password. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Change Your Password</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>आपले पहिले लॉग-इन दिसत आहे. कृपया तुमचा सिस्टम-जनरेटेड पासवर्ड बदला.</p>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handlePasswordUpdate}>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="input-icon-wrapper">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <div className="input-icon-wrapper">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;