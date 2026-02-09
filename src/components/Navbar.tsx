import { useState } from 'react';
import { FaHome, FaUser, FaBriefcase, FaCode, FaTrophy, FaEnvelope } from 'react-icons/fa';
import { MdMenu, MdClose } from 'react-icons/md';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'About', href: '#bento-grid', icon: FaUser },
        { name: 'Skills', href: '#core-stack', icon: FaCode },
        { name: 'Experience', href: '#timeline', icon: FaBriefcase },
        { name: 'Projects', href: '#projects', icon: FaHome },
        { name: 'Achievements', href: '#achievements', icon: FaTrophy },
        { name: 'Contact', href: '#contact', icon: FaEnvelope },
    ];

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <a href="#home" className="logo">
                    ibrahim<span className="accent-dot">.</span>dev
                </a>

                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="nav-link"
                            onClick={handleNavClick}
                        >
                            <item.icon className="nav-icon" />
                            <span>{item.name}</span>
                        </a>
                    ))}
                </div>

                <button
                    className="menu-toggle"
                    aria-label="Toggle Navigation"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <MdClose /> : <MdMenu />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
