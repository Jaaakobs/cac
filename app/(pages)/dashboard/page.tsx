'use client';

import { useState } from 'react';
import UpdateJobsButton from '@/components/dashboard/UpdateJobsButton';
import ScrapeJobsButton from '@/components/dashboard/ScrapeJobsButton';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const dashboardPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD;

  const handleLogin = () => {
    if (password === dashboardPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Enter Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Update Jobs</h2>
            <UpdateJobsButton />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Scrape Jobs</h2>
            <ScrapeJobsButton />
          </div>
        </div>
      </div>
    </div>
  );
}