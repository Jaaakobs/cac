type JobDescriptionProps = {
    job: {
      description_html: string;
      updated_at: string;
      id: number;
    };
  };
  
  const JobDescription: React.FC<JobDescriptionProps> = ({ job }) => {
    const formattedDate = new Date(job.updated_at).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  
    return (
      <div className="bg-background mb-6">
        <h3 className="text-lg font-medium mb-2">Job Description</h3>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: job.description_html }}
        />
        <div className="flex justify-between items-center text-gray-500 mt-4 pt-4 border-t border-gray-300">
          <span>Updated: {formattedDate}</span>
          <span>Job offer identifier (ID) {job.id}</span>
        </div>
      </div>
    );
  };
  
  export default JobDescription;