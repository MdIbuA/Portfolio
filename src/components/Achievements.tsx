import { motion } from 'framer-motion';
import { FaDatabase, FaGoogle, FaSnowflake, FaRobot } from 'react-icons/fa';

const Achievements = () => {
    return (
        <section className="section-long" id="achievements">
            <div className="container relative-z">
                <h2 className="section-heading">Achievements <span className="accent-dot">.</span></h2>

                <div className="cyber-stream-wrapper">
                    {/* Vertical Line */}
                    <div className="cyber-line"></div>

                    {/* Stream Item 1 - HackerRank */}
                    <motion.div
                        className="data-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">ISSUED_Feb_2026</div>
                        <div className="card-grid">
                            <div className="card-icon misc"><FaDatabase /></div>
                            <div className="card-content">
                                <h4>Software Engineer Intern</h4>
                                <p className="code-line">&gt; HackerRank Certificate</p>
                                <div className="card-meta">
                                    <span className="status-badge">INTERN</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stream Item 2 - Postman */}
                    <motion.div
                        className="data-card right-align"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Jan_2026</div>
                        <div className="card-grid">
                            <div className="card-content">
                                <h4>Postman API Fundamentals</h4>
                                <p className="code-line">&gt; Student Expert</p>
                                <div className="card-meta">
                                    <span className="status-badge">EXPERT</span>
                                    <span>ID: 6958b3a8</span>
                                </div>
                            </div>
                            <div className="card-icon misc"><FaRobot /></div>
                        </div>
                    </motion.div>

                    {/* Stream Item 3 - Kaggle */}
                    <motion.div
                        className="data-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Dec_2025</div>
                        <div className="card-grid">
                            <div className="card-icon google"><FaGoogle /></div>
                            <div className="card-content">
                                <h4>5-Day AI Agents Intensive</h4>
                                <p className="code-line">&gt; Google & Kaggle</p>
                                <div className="card-meta">
                                    <span className="status-badge">AI AGENTS</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stream Item 4 - Google Cloud */}
                    <motion.div
                        className="data-card right-align"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Sep_2025</div>
                        <div className="card-grid">
                            <div className="card-content">
                                <h4>Google Cloud Study Jams</h4>
                                <p className="code-line">&gt; Top Performer 2025</p>
                                <div className="card-meta">
                                    <span className="status-badge">ELITE</span>
                                    <span>ID: ab9bcd21</span>
                                </div>
                            </div>
                            <div className="card-icon google"><FaGoogle /></div>
                        </div>
                    </motion.div>

                    {/* Stream Item 5 - Oracle APEX */}
                    <motion.div
                        className="data-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Oct_2025</div>
                        <div className="card-grid">
                            <div className="card-icon oracle"><FaDatabase /></div>
                            <div className="card-content">
                                <h4>Oracle APEX Developer</h4>
                                <p className="code-line">&gt; Cloud Professional</p>
                                <div className="card-meta">
                                    <span>ID: 322178663</span>
                                    <span className="status-badge">PRO</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stream Item 6 - Snowflake */}
                    <motion.div
                        className="data-card right-align"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Nov_2025</div>
                        <div className="card-grid">
                            <div className="card-content">
                                <h4>SnowPro Associate</h4>
                                <p className="code-line">&gt; Platform Certification</p>
                                <div className="card-meta">
                                    <span className="status-badge">CERTIFIED</span>
                                    <span>ID: 165697706</span>
                                </div>
                            </div>
                            <div className="card-icon snow"><FaSnowflake /></div>
                        </div>
                    </motion.div>

                    {/* Stream Item 7 - Oracle AI */}
                    <motion.div
                        className="data-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Oct_2025</div>
                        <div className="card-grid">
                            <div className="card-icon oracle"><FaRobot /></div>
                            <div className="card-content">
                                <h4>OCI 2025 Certified AI</h4>
                                <p className="code-line">&gt; Foundations Associate</p>
                                <div className="card-meta">
                                    <span className="status-badge">AI FOUNDATIONS</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stream Item 8 - Celonis */}
                    <motion.div
                        className="data-card right-align"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Sep_2025</div>
                        <div className="card-grid">
                            <div className="card-content">
                                <h4>Rising Star - Technical</h4>
                                <p className="code-line">&gt; Celonis Process Mining</p>
                                <div className="card-meta">
                                    <span className="status-badge">STAR</span>
                                </div>
                            </div>
                            <div className="card-icon misc"><FaDatabase /></div>
                        </div>
                    </motion.div>

                    {/* Stream Item 9 - MongoDB */}
                    <motion.div
                        className="data-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Jun_2025</div>
                        <div className="card-grid">
                            <div className="card-icon misc"><FaDatabase /></div>
                            <div className="card-content">
                                <h4>MongoDB Basic & CRUD</h4>
                                <p className="code-line">&gt; Database Operations</p>
                                <div className="card-meta">
                                    <span>ID: MDBtfhpl</span>
                                    <span className="status-badge">DATABASE</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stream Item 10 - Infosys */}
                    <motion.div
                        className="data-card right-align"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="card-status">Issued_Jun_2025</div>
                        <div className="card-grid">
                            <div className="card-content">
                                <h4>Generative AI Primer</h4>
                                <p className="code-line">&gt; Infosys Springboard</p>
                                <div className="card-meta">
                                    <span className="status-badge">GEN AI</span>
                                </div>
                            </div>
                            <div className="card-icon misc"><FaRobot /></div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Achievements;
