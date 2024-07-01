// app/api/updateContact/route.js
export async function PUT(req) {
  const { email, properties, mailingLists } = await req.json();
  const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

  // Update contact in Loops
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
    return new Response(JSON.stringify({ message: data.message }), { status: response.status });
  }

  // Send event to Loops
  const eventResponse = await fetch('https://app.loops.so/api/v1/events/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      eventName: 'UpdatedContact',
      eventsProperties: {
        Email: email,
      },
    }),
  });

  const eventData = await eventResponse.json();
  if (!eventResponse.ok) {
    return new Response(JSON.stringify({ message: eventData.message }), { status: eventResponse.status });
  }

  return new Response(JSON.stringify({ ...data, event: eventData }), { status: 200 });
}