"use client";

import React from 'react';
import MenuBar from '@/components/MenuBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Companies: React.FC = () => {
  return (
    <div className="p-6 max-w-screen-lg px-4 mx-auto">
      <MenuBar />
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Companies</h1>
        <p className="text-lg text-gray-700">Explore our list of companies.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Companies;