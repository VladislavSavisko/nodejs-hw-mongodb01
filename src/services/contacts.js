import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find({}, '-__v -createdAt -updatedAt');
};

export const getContactById = async (id) => {
  return await Contact.findById(id, '-__v -createdAt -updatedAt');
};
