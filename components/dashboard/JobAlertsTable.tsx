import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { useJobAlerts } from "@/utils/supabase/hooks/useJobAlerts"
  
  export default function JobAlertsTable() {
    const { jobAlerts, loading } = useJobAlerts()
  
    if (loading) {
      return <div>Loading...</div>
    }
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Job Function</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Seniority</TableHead>
            <TableHead>Employment Type</TableHead>
            <TableHead>DOI</TableHead>
            <TableHead>Matching Job IDs</TableHead>
            <TableHead>Subscribed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobAlerts.map((alert) => (
            <TableRow key={alert.id.toString()}>
              <TableCell>{alert.id.toString()}</TableCell>
              <TableCell>{new Date(alert.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{alert.email}</TableCell>
              <TableCell>{alert.name}</TableCell>
              <TableCell>{alert.location}</TableCell>
              <TableCell>{alert.job_function}</TableCell>
              <TableCell>{alert.industry}</TableCell>
              <TableCell>{alert.seniority}</TableCell>
              <TableCell>{alert.employment_type}</TableCell>
              <TableCell>{alert.doi ? 'Yes' : 'No'}</TableCell>
              <TableCell>{alert.matching_job_ids}</TableCell>
              <TableCell>
                <Badge variant={alert.subscribed ? 'secondary' : 'outline'}>
                  {alert.subscribed ? 'Subscribed' : 'Unsubscribed'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }