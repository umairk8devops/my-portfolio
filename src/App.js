import React from 'react';
import './App.css';
import RunningBanner from './components/RunningBanner';
import Header from './components/Header';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <RunningBanner />
      <Header />
      <Hero />
      <Certifications />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
