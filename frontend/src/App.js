import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AppDownloadSection from "./components/AppDownloadSection";
import FeaturesSection from "./components/FeaturesSection";
import HowToUseSection from "./components/HowToUseSection";
import UseCasesSection from "./components/UseCasesSection";
import DownloadResult from "./components/DownloadResult";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [downloadResult, setDownloadResult] = useState(null);

  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  const handleDownload = (url) => {
    setDownloadResult(url);
    // Scroll to result
    setTimeout(() => {
      const resultElement = document.getElementById('download-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseResult = () => {
    setDownloadResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection onDownload={handleDownload} />
        
        {downloadResult && (
          <div id="download-result" className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <DownloadResult url={downloadResult} onClose={handleCloseResult} />
          </div>
        )}
        
        <AppDownloadSection />
        <FeaturesSection />
        <HowToUseSection />
        <UseCasesSection />
        <FaqSection />
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
