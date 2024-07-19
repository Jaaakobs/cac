import * as React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text, Button } from '@react-email/components';

interface Job {
  id: string;
  title: string;
  agency_name: string;
  location: string;
  employment_type: string;
  seniority_level: string;
  posted_at: string;
  job_function: string;
}

interface JobUpdateProps {
  name: string;
  jobs: Job[];
}

const getPostedAtText = (postedAt: string) => {
  const postedDate = new Date(postedAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return "Today";
  } else if (diffDays === 2) {
    return "Yesterday";
  } else if (diffDays <= 14) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  } else if (diffDays <= 60) {
    return "1 month ago";
  } else {
    return `${Math.ceil(diffDays / 30)} months ago`;
  }
};

const JobUpdate: React.FC<JobUpdateProps> = ({ name, jobs }) => (
  <Html>
    <Head />
    <Preview>Your Job Updates</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Hello {name},</Heading>
        <Text style={paragraph}>Here are the latest job updates for you:</Text>
        {jobs.map((job) => (
          <div key={job.id} style={jobCard}>
            <div style={jobHeader}>
              <h2 style={jobTitle}>{job.title}</h2>
              <p style={jobAgency}>{job.agency_name}</p>
            </div>
            <div style={jobDetails}>
              <p style={jobLocation}><strong>Location:</strong> {job.location}</p>
              <p style={jobPostedAt}><strong>Posted:</strong> {getPostedAtText(job.posted_at)}</p>
            </div>
            <div style={jobAttributes}>
              <p style={jobAttribute}><strong>Type:</strong> {job.employment_type}</p>
              <p style={jobAttribute}><strong>Level:</strong> {job.seniority_level}</p>
              <p style={jobAttribute}><strong>Function:</strong> {job.job_function}</p>
            </div>
            <Button style={button} href={`https://www.creativeagencycareers.com/jobs/${job.id}`}>View Job</Button>
          </div>
        ))}
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '20px',
};

const heading = {
  color: '#333333',
  fontSize: '24px',
  marginBottom: '20px',
};

const paragraph = {
  color: '#666666',
  fontSize: '16px',
  marginBottom: '20px',
};

const jobCard = {
  borderBottom: '1px solid #dddddd',
  marginBottom: '20px',
  paddingBottom: '20px',
};

const jobHeader = {
  borderBottom: '1px solid #dddddd',
  marginBottom: '10px',
  paddingBottom: '10px',
};

const jobTitle = {
  color: '#333333',
  fontSize: '18px',
  margin: '0 0 5px 0',
};

const jobAgency = {
  color: '#666666',
  fontSize: '14px',
  margin: '0',
};

const jobDetails = {
  color: '#666666',
  fontSize: '14px',
  marginBottom: '10px',
};

const jobLocation = {
  marginBottom: '5px',
};

const jobPostedAt = {
  marginBottom: '5px',
};

const jobAttributes = {
  display: 'flex',
  flexWrap: 'wrap' as 'wrap',
  gap: '10px',
  marginBottom: '10px',
};

const jobAttribute = {
  backgroundColor: '#f4f4f4',
  borderRadius: '4px',
  padding: '5px 10px',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#ffffff',
  padding: '10px 20px',
  textDecoration: 'none',
  display: 'inline-block',
};

export default JobUpdate;