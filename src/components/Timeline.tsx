import { motion } from 'framer-motion';

const Timeline = () => {
    return (
        <section className="section-long" id="timeline">
            <div className="container">
                <h2 className="section-heading">Journey <span className="accent-dot">.</span></h2>

                <div className="timeline-container">
                    {/* Item 1 */}
                    <motion.div
                        className="timeline-item right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="timeline-content glass-card">
                            <div className="timeline-header">
                                <div className="company-logo">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" />
                                </div>
                                <div className="timeline-header-text">
                                    <span className="date-badge">Nov 2025 – Present</span>
                                    <h3 className="timeline-title">AI Intern</h3>
                                    <h4 className="timeline-org">Infosys Springboard (Virtual)</h4>
                                </div>
                            </div>
                            <ul className="timeline-list">
                                <li>Built end-to-end ML workflows: data preprocessing, feature engineering, model training & deployment</li>
                                <li>Delivered production-grade AI solutions using industry best practices & Agile methodologies</li>
                            </ul>
                            <div className="tech-mini-tags">
                                <span>AI/ML</span><span>Preprocessing</span><span>SDLC</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div
                        className="timeline-item left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="timeline-content glass-card">
                            <div className="timeline-header">
                                <div className="company-logo">
                                    <div className="college-logo-placeholder">EDUNET</div>
                                </div>
                                <div className="timeline-header-text">
                                    <span className="date-badge">Feb 2025 – Apr 2025</span>
                                    <h3 className="timeline-title">MERN Stack Developer Intern</h3>
                                    <h4 className="timeline-org">Edunet Foundation</h4>
                                </div>
                            </div>
                            <ul className="timeline-list">
                                <li>Architected full-stack web apps with secure authentication, RESTful APIs & optimized database queries</li>
                                <li>Delivered responsive, mobile-first UI components using modern JavaScript (ES6+) and React</li>
                            </ul>
                            <div className="tech-mini-tags">
                                <span>MongoDB</span><span>Express</span><span>React</span><span>Node.js</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Item 3 - Google Cloud Arcade */}
                    <motion.div
                        className="timeline-item right"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="timeline-content glass-card">
                            <div className="timeline-header">
                                <div className="company-logo">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" />
                                </div>
                                <div className="timeline-header-text">
                                    <span className="date-badge">Jun 2025 – Dec 2025</span>
                                    <h3 className="timeline-title">Google Cloud Arcade Participant</h3>
                                    <h4 className="timeline-org">Google Cloud Skills Boost</h4>
                                </div>
                            </div>
                            <ul className="timeline-list">
                                <li>Completed hands-on labs across cloud computing, DevOps, and AI/ML tracks, gaining practical cloud experience</li>
                                <li>Strengthened real-world cloud workflows & infrastructure skills through Google Cloud Platform services</li>
                            </ul>
                            <div className="tech-mini-tags">
                                <span>GCP</span><span>DevOps</span><span>AI/ML</span><span>Cloud Computing</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Item 4 - Education */}
                    <motion.div
                        className="timeline-item left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="timeline-content glass-card center-text">
                            <div className="timeline-header">
                                <div className="company-logo">
                                    <div className="college-logo-placeholder">SREC</div>
                                </div>
                                <div className="timeline-header-text">
                                    <span className="date-badge">2023 - Present</span>
                                    <h3 className="timeline-title">B.Tech Information Technology</h3>
                                    <h4 className="timeline-org">Sri Ramakrishna Engineering College</h4>
                                </div>
                            </div>
                            <p style={{ textAlign: 'center' }}>Consistent academic performance with a focus on Data Structures, System Design, and AI.
                                <br />(CGPA: 7.86)</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
