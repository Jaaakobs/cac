// utils/loopsApi.js
import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY);

export const createContact = async (email, properties = {}, mailingLists = {}) => {
  try {
    const response = await loops.createContact(email, properties, mailingLists);
    console.log('Contact created:', response);
    return response;
  } catch (error) {
    console.error('Error creating contact:', error.response ? error.response.data : error.message);
  }
};

export const updateContact = async (email, properties = {}, mailingLists = {}) => {
  try {
    const response = await loops.updateContact(email, properties, mailingLists);
    console.log('Contact updated:', response);
    return response;
  } catch (error) {
    console.error('Error updating contact:', error.response ? error.response.data : error.message);
  }
};