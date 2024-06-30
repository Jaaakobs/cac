import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, properties, mailingLists } = req.body;

  try {
    const response = await loops.createContact(email, properties, mailingLists);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}