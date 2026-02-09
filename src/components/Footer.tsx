import { FaGithub, FaLinkedin, FaKaggle, FaDiscord } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container center-text">
                <div className="footer-socials">
                    <a href="https://github.com/MdIbuA" target="_blank" className="footer-link"><FaGithub /> GitHub</a>
                    <span className="divider">/</span>
                    <a href="https://linkedin.com/in/mohamedibrahimbinabdullah" target="_blank" className="footer-link"><FaLinkedin /> LinkedIn</a>
                    <span className="divider">/</span>
                    <a href="https://www.kaggle.com/ibrahimofcl" target="_blank" className="footer-link"><FaKaggle /> Kaggle</a>
                    <span className="divider">/</span>
                    <a href="https://discord.com/users/ibrahim_ibn_abdullah" target="_blank" className="footer-link"><FaDiscord /> Discord</a>
                    <span className="divider">/</span>
                    <a href="mailto:2005mohamedibrahim@gmail.com" className="footer-link"><SiGmail /> Gmail</a>
                </div>
                <p className="copyright">&copy; 2026 Mohamed Ibrahim. Engineered with precision.</p>
            </div>
        </footer>
    );
};
export default Footer;
