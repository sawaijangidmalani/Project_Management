import Customer from "../models/customers.js";
import dotenv from "dotenv";
import slugify from 'slugify';

dotenv.config();

export const createCustomer = async (req, res) => {
  try {
    //console.log('Request Object:', req);

    // Ensure req.fields is defined
    // if (!req.fields) {
    //   return res.status(400).json({ error: 'Form data not found' });
    // }

    const { name, email,phone, area, address, city, status, gstn } = req.fields;
    console.log("Request Fields: ", req.fields);

    // Validation
    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!email || !email.trim()) return res.status(400).json({ error: 'Email is required' });
    if (!area || !area.trim()) return res.status(400).json({ error: 'Area is required' });
    if (!phone || !phone.trim()) return res.status(400).json({ error: 'Number is required' });
    if (!address || !address.trim()) return res.status(400).json({ error: 'Address is required' });
    if (!city || !city.trim()) return res.status(400).json({ error: 'City is required' });
    if (!gstn || !gstn.trim()) return res.status(400).json({ error: 'GSTN is required' });
    if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });

    // Create new customer
    const customer = new Customer({ ...req.fields, slug: slugify(name) });
    await customer.save();
    res.status(200).json(customer); // 201 Created status code
  } catch (err) {
    console.log('Error creating customer:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const listCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers); // 200 OK status code
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const readCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ slug: req.params.slug });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
      //console.log("request :",req);

    if (!req.fields) {
      return res.status(400).json({ error: 'Form data not found' });
    }
    const { name, email,phone, area, address, city, status, gstn } = req.fields;
    console.log("object :", req.fields);
    // Validation
    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!email || !email.trim()) return res.status(400).json({ error: 'Email is required' });
    if (!area || !area.trim()) return res.status(400).json({ error: 'Area is required' });
    if (!phone || !phone.trim()) return res.status(400).json({ error: 'Number is required' });
    if (!address || !address.trim()) return res.status(400).json({ error: 'Address is required' });
    if (!city || !city.trim()) return res.status(400).json({ error: 'City is required' });
    if (!gstn || !gstn.trim()) return res.status(400).json({ error: 'GSTN is required' });
    if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });

    const customer = await Customer.findByIdAndUpdate(
      req.params.id, // Changed to 'id'
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const removeCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id); // Changed to 'id'
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
