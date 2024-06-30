// app/api/updateContact.js
export default async function handler(req, res) {
    if (req.method !== 'PUT') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { email, properties, mailingLists } = req.body;
    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
  
    const response = await fetch('https://app.loops.so/api/v1/contacts/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        ...properties,
        mailingLists,
      }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ message: data.message });
    }
  
    return res.status(200).json(data);
  }