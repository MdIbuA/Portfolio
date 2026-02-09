import Navbar from './components/Navbar.tsx';
import BentoGrid from './components/BentoGrid.tsx';
import Timeline from './components/Timeline.tsx';
import DetailedProjects from './components/DetailedProjects.tsx';
import Achievements from './components/Achievements.tsx';
import Footer from './components/Footer.tsx';
import IbuChat from './components/IbuChat.tsx';

function App() {
  return (
    <>
      {/* Abstract Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <Navbar />

      <main id="bento-grid" className="bento-container">
        <BentoGrid />
      </main>

      <Timeline />
      <DetailedProjects />
      <Achievements />
      <Footer />

      {/* Ibu AI Assistant - Floating Chat */}
      <IbuChat />
    </>
  )
}

export default App;
