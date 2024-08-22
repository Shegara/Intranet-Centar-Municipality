import React from 'react';
import Navbar from './components/navbar';
import Main from './components/main';
import Footer from './components/footer';
import './globals.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/opcina_background.webp')",
        }}
      >
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
