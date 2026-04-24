import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { LogOut, Moon, Sun, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="navbar-brand">
                    <CheckSquare className="brand-icon" />
                    <h1>SmartTask</h1>
                </div>
                
                <div className="navbar-actions">
                    <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    
                    {user && (
                        <div className="user-menu">
                            <span className="user-name">Hi, {user.name}</span>
                            <button className="btn btn-outline btn-sm" onClick={logout}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
