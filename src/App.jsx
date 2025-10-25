import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveHackathons from './components/LiveHackathons';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <main className="relative z-10">
        <LiveHackathons />
      </main>
      <Footer />
    </div>
  );
}

export default App;
