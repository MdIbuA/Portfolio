import { useState, useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaGoogle, FaAws, FaPython, FaJava, FaDocker, FaReact, FaGithub, FaLinkedin, FaKaggle, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';
import { MdLayers, MdSmartToy, MdSend, MdLocationOn, MdEmail, MdFileDownload } from 'react-icons/md';

const BentoGrid = () => {
    const roles = ['Full-Stack Developer', 'AI Enthusiast'];
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    // Name Typing Effect Logic
    const [nameText, setNameText] = useState('');
    useEffect(() => {
        const targetName = "Mohamed Ibrahim A";
        if (nameText.length < targetName.length) {
            const timeout = setTimeout(() => {
                setNameText(targetName.slice(0, nameText.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [nameText]);

    useEffect(() => {
        const currentWord = roles[currentRole];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = 2000;

        const timer = setTimeout(() => {
            if (!isDeleting && charIndex < currentWord.length) {
                setDisplayText(currentWord.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setDisplayText(currentWord.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setCurrentRole((currentRole + 1) % roles.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, currentRole, roles]);

    return (
        <>
            {/* Hero Tile */}
            <div className="bento-item hero-tile">
                <div className="bento-content">
                    <h1 className="hero-title">
                        {displayText}
                        <span className="typing-cursor">|</span>
                        <span className="gradient-text">.</span>
                    </h1>
                    <p className="hero-subtitle">Passionate about building real-world solutions and impact-driven software.</p>
                    <div className="status-badge">
                        <span className="status-dot"></span> Available for Full-Time Roles
                    </div>
                </div>
            </div>

            {/* Profile Card (Replaces Avatar Tile) */}
            <div className="bento-item profile-tile">
                <div className="profile-content">
                    <div className="profile-header">
                        <div className="avatar-circle-sm">
                            <img src="/profile-pic.png" alt="Mohamed Ibrahim A" />
                        </div>
                        <div className="profile-main-info">
                            <h2>
                                {nameText}
                                <span className="typing-cursor">|</span>
                            </h2>
                            <div className="location-tag">
                                <MdLocationOn className="icon-sm" /> Coimbatore, India
                            </div>
                        </div>
                    </div>

                    <div className="profile-bio">
                        <p>Hi, I’m <strong>Ibrahim</strong>  a pre-final year IT student and a tech polyglot working across <strong>AI, Quantum, Cloud, and Edge Computing</strong>.</p>
                        <p>I love building real-world solutions and turning ideas into systems that actually work. For me, coding is something I genuinely enjoy  experimenting, breaking things, and learning by building.</p>
                        <p>Certified by the <strong>Linux Foundation, Infosys Springboard, and Oracle</strong>. Currently looking for <strong>FSD opportunities</strong> to build meaningful software while keeping engineering fun.</p>
                    </div>
                </div>
            </div>

            {/* Stack Tile */}
            <div id="core-stack" className="bento-item stack-tile">
                <div className="bento-header">
                    <MdLayers />
                    <h3>Core Stack</h3>
                </div>
                <div className="stack-grid">
                    <div className="stack-icon" title="HTML5"><FaHtml5 color="#E34F26" /></div>
                    <div className="stack-icon" title="CSS3"><FaCss3Alt color="#1572B6" /></div>
                    <div className="stack-icon" title="JavaScript"><FaJs color="#F7DF1E" /></div>
                    <div className="stack-icon ts-icon" title="TypeScript">TS</div>

                    <div className="stack-icon" title="React"><FaReact color="#61DAFB" /></div>
                    <div className="stack-icon" title="Node.js"><FaNodeJs color="#68A063" /></div>
                    <div className="stack-icon" title="MongoDB"><SiMongodb color="#47A248" /></div>
                    <div className="stack-icon" title="Express.js"><SiExpress color="#000000" /></div>

                    <div className="stack-icon" title="Python"><FaPython color="#3776AB" /></div>
                    <div className="stack-icon" title="Java"><FaJava color="#007396" /></div>
                    <div className="stack-icon" title="Docker"><FaDocker color="#2496ED" /></div>
                    <div className="stack-icon" title="GitHub"><FaGithub color="#FFFFFF" /></div>

                    <div className="stack-icon" title="Google Cloud"><FaGoogle color="#4285F4" /></div>
                    <div className="stack-icon" title="AWS"><FaAws color="#FF9900" /></div>
                </div>
            </div>



            {/* Social Connect Hub */}
            <div className="bento-item social-tile">
                <div className="bento-header">
                    <MdSend /> <h3>Let's Connect</h3>
                </div>
                <div className="social-grid-premium">
                    <a href="https://github.com/MdIbuA" target="_blank" className="social-card github" title="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/mohamedibrahima" target="_blank" className="social-card linkedin" title="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:mohamedibrahim.text@gmail.com" className="social-card gmail" title="Email">
                        <MdEmail />
                    </a>
                    <a href="https://kaggle.com" target="_blank" className="social-card kaggle" title="Kaggle">
                        <FaKaggle />
                    </a>
                </div>
            </div>

            {/* Resume & Soft Skills CTA */}
            <div className="bento-item cta-tile">
                <div className="cta-content">
                    <h3>Ready to Collaborate?</h3>
                    <p className="soft-skills-ticker"> </p>
                    <a href="https://drive.google.com/file/d/1s5DHE4g38krf4K1Bkvuv2fwtbdKPATfm/view?usp=sharing" target="_blank" className="resume-btn">
                        <MdFileDownload /> Download Resume
                    </a>
                </div>
            </div>
        </>
    );
};

export default BentoGrid;
