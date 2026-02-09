import { motion } from 'framer-motion';
import { MdPlayCircle } from 'react-icons/md';

const DetailedProjects = () => {
    return (
        <section className="section-long" id="projects">
            <div className="container">
                <h2 className="section-heading">Selected Works <span className="accent-dot">.</span></h2>

                <motion.div
                    className="big-project-card glass-panel"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="big-project-content">
                        <div className="project-number">01</div>
                        <h3>Crisis Response Coordinator</h3>
                        <p className="subtitle">AI-Powered Emergency Triage System</p>
                        <p className="desc">AI-powered backend system using RAG (Retrieval-Augmented Generation) to fetch safety protocols instantly. <strong>Reduced operator decision time by 40%</strong> through real-time emergency data processing.</p>
                        <ul className="feature-list">
                            <li>Real-time Data Streams</li>
                            <li>Automated Resource Allocation</li>
                            <li>High-Availability Architecture</li>
                        </ul>
                        <div className="tech-row">
                            <span>Python</span><span>LangChain</span><span>FastAPI</span><span>Docker</span>
                        </div>
                        <a href="https://youtu.be/Vp-1W_Ry3mM" target="_blank" className="demo-btn">
                            <MdPlayCircle /> Watch Demo
                        </a>
                    </div>
                    <div className="big-project-visual">
                        <img src="/crisis-project.png" alt="Crisis Response UI" className="project-img" />
                    </div>
                </motion.div>

                <motion.div
                    className="big-project-card glass-panel reverse-layout"
                    style={{ marginTop: '80px' }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="big-project-content">
                        <div className="project-number">02</div>
                        <h3>Crypto Forecasting Engine</h3>
                        <p className="subtitle">Time-Series Financial Prediction</p>
                        <p className="desc">LSTM-based deep learning model for cryptocurrency market prediction. Automated ETL pipelines ingest multi-source data for <strong>continuous model retraining</strong> and improved accuracy.</p>
                        <ul className="feature-list">
                            <li>LSTM Neural Networks</li>
                            <li>Automated ETL Pipelines</li>
                            <li>Live Market Data Feeds</li>
                        </ul>
                        <div className="tech-row">
                            <span>TensorFlow</span><span>Airflow</span><span>Python</span><span>AWS S3</span>
                        </div>
                        <a href="https://github.com/MdIbuA/CryptoPulse" target="_blank" className="demo-btn">
                            <MdPlayCircle /> View Source
                        </a>
                    </div>
                    <div className="big-project-visual">
                        <img src="/crypto-project.png" alt="Crypto Pulse Dashboard" className="project-img" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DetailedProjects;
