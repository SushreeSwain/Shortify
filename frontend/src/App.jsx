import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URLForm from "./components/URLForm";
import Stats from "./components/Stats";
import Analytics from "./components/Analytics"; 
import Documentation from "./components/Documentation";

function HomePage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
      <URLForm />
      <Stats />

      {/* Features Section */}
      <section id="features" className="py-20 w-full max-w-3xl text-justify">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <p className="text-gray-600 text-xl leading-12">
          🔗 Simple and fast URL Generation<br />
          📅 Add expiration dates for your short URL<br />
          ✏️ Customize your URL<br />
          🔲 Generate QR Code<br />
          ✏️ No log in or sign up required <br />
          📊 Track visits and clicks
        </p>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 w-full max-w-3xl text-justify">
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="text-gray-600 text-xl leading-12">
          Shortify is a lightweight URL shortener and QR Code generator built with Node.js, Express, MongoDB, React, Axios and TailwindCSS.
          It’s designed for simplicity, speed, and ease of use, ideal for developers and casual users alike. 
          Shortify is built as a personal project by Sushree S Swain, a software engineer based in India. 
          The documentation of this project is available on this site which can be used as a reference by students and devs who are just starting their Full Stack Development journey.
        </p>
      </section>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/*  Header stays across all pages */}
        <Header />

        {/*  All routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics" element={<Analytics />} />         
          <Route path="/analytics/:shortId" element={<Analytics />} />
          <Route path="/documentation" element={<Documentation />} />  {/* ✅ FIXED */}
          <Route path="/stats" element={<Stats />} />         {/* ✅ NEW */}
        </Routes>

        {/*  Footer stays across all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
