"use client";

// Import the JobAlertsTable component
import JobAlertsTable from '@/components/dashboard/JobAlertsTable';

// Your existing imports
import { useState } from 'react';
import UpdateJobsButton from '@/components/dashboard/UpdateJobsButton';
import ScrapeJobsButton from '@/components/dashboard/ScrapeJobsButton';
import JobUpdatesButton from '@/components/dashboard/JobUpdatesButton';

import { useAgencies } from '@/utils/supabase/hooks/useAgencies';
import { useJobs } from '@/utils/supabase/hooks/useJobs';

// Your existing imports
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA34DD', '#DD4B4B', '#4B8EDD'];

type ChartData = {
  name: string;
  value: number;
};

type TimelineData = {
  date: string;
  jobs: number;
};

type SeniorityData = {
  level: string;
  jobs: number;
};

type EmploymentTypeData = {
  type: string;
  jobs: number;
};

type JobCategoryData = {
  category: string;
  jobs: number;
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const dashboardPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD;
  const { agencies, loading: loadingAgencies } = useAgencies();
  const { jobs, loading: loadingJobs } = useJobs();

  const handleLogin = () => {
    if (password === dashboardPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Enter Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4"
        />
        <button onClick={handleLogin} className="bg-primary text-white p-2 rounded">
          Login
        </button>
      </div>
    );
  }

  if (loadingAgencies || loadingJobs) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const agencyCount = agencies.length;

  const industryData: { [key: string]: number } = agencies.reduce((acc: { [key: string]: number }, agency) => {
    const industry = agency.industry || 'Unknown';
    if (!acc[industry]) {
      acc[industry] = 0;
    }
    acc[industry]++;
    return acc;
  }, {});

  const industryChartData: ChartData[] = Object.keys(industryData).map(industry => ({
    name: industry,
    value: industryData[industry],
  }));

  const timelineChartData: { [key: string]: number } = jobs.reduce((acc: { [key: string]: number }, job) => {
    const date = new Date(job.posted_at).toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - 5);

  const filteredTimelineChartData = Object.keys(timelineChartData)
    .filter(date => new Date(date) >= cutoffDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const timelineChartArray: TimelineData[] = filteredTimelineChartData.map(date => ({
    date,
    jobs: timelineChartData[date],
  }));

  const seniorityData: { [key: string]: number } = jobs.reduce((acc: { [key: string]: number }, job) => {
    const level = job.seniority_level || 'Unknown';
    if (!acc[level]) {
      acc[level] = 0;
    }
    acc[level]++;
    return acc;
  }, {});

  const seniorityChartData: SeniorityData[] = Object.keys(seniorityData).map(level => ({
    level,
    jobs: seniorityData[level],
  }));

  const employmentTypeData: { [key: string]: number } = jobs.reduce((acc: { [key: string]: number }, job) => {
    const type = job.employment_type || 'Unknown';
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type]++;
    return acc;
  }, {});

  const employmentTypeChartData: EmploymentTypeData[] = Object.keys(employmentTypeData).map(type => ({
    type,
    jobs: employmentTypeData[type],
  }));

  const jobCategoryData: { [key: string]: number } = jobs.reduce((acc: { [key: string]: number }, job) => {
    const categories = job.job_category ? job.job_category.split(', ') : ['Unknown'];
    categories.forEach(category => {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
    });
    return acc;
  }, {});

  const jobCategoryChartData: JobCategoryData[] = Object.keys(jobCategoryData).map(category => ({
    category,
    jobs: jobCategoryData[category],
  }));

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-7xl p-4 bg-white rounded-lg shadow-lg">

      <h1 className="text-3xl font-bold mb-6">CAC Operating Dashboard ❤️‍🔥</h1>
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Active Jobs</h2>
            <p className="text-2xl">{activeJobs}</p>
          </div>
          <div className="p-4 rounded-lg ">
            <h2 className="text-lg font-bold mb-4">Total Agencies</h2>
            <p className="text-2xl">{agencyCount}</p>
          </div>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Scrape Jobs</h2>
              <ScrapeJobsButton />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Update Jobs</h2>
              <UpdateJobsButton />
            </div>
        </div>
        <div className="p-4 mt-6 mb-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Job Posting Timeline</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timelineChartArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Seniority Levels</CardTitle>
              <CardDescription>Current Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={seniorityChartData} dataKey="jobs" nameKey="level" cx="50%" cy="50%" outerRadius={150} label>
                    {seniorityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Employment Types</CardTitle>
              <CardDescription>Current Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={employmentTypeChartData} dataKey="jobs" nameKey="type" cx="50%" cy="50%" outerRadius={150} label>
                    {employmentTypeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Job Categories</CardTitle>
              <CardDescription>Current Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={jobCategoryChartData} dataKey="jobs" nameKey="category" cx="50%" cy="50%" outerRadius={150} label>
                    {jobCategoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Agency Industries</CardTitle>
              <CardDescription>Current Distribution</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-6">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={industryChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} label>
                  {industryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <h1 className="text-3xl font-bold mb-6 mt-12">Email Subscriber 📧</h1>
        
        <div className="p-4 mb-6  rounded-lg s">
        
          <h2 className="text-lg font-bold mb-4">Job Alerts</h2>
          <JobAlertsTable />
        </div>
  
        <div className="p-4 mb-6 rounded-lg ">
          <div className="flex justify-between mb-4">
            
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Send JobUpdate Emails</h2>
              <JobUpdatesButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}