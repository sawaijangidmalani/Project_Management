import slugify from "slugify";
import Itemprice from "../models/itemPrice.js";
import dotenv from "dotenv";
import CustomerPO from "../models/customerPO.js";
import Customer from "../models/customers.js";

dotenv.config();

export const createCustomerPo = async (req, res) => {
  try {    
      
      const { customern, customerpo,date, status } = req.fields;
      console.log(req.fields);
      
      // Validation
      if (!customern || !customern.trim()) return res.status(400).json({ error: 'Customer is required' });
      if (!customerpo || !customerpo.trim()) return res.status(400).json({ error: 'CustomerPO is required' });
      if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });
      if (!date || !date.trim()) return res.status(400).json({ error: 'Date is required' });

    // Create new item
    // In createCustomerPo
const customer = await Customer.findOne({ name: customern });
if (!customer) return res.status(404).json({ error: 'Customer not found' });
const cpo = new CustomerPO({ ...req.fields, customern: customer._id, slug: slugify(customerpo) });

    await cpo.save();
    res.status(201).json(cpo);
  } catch (err) {
    console.log('Error creating createCustomerPo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listCustomerPo = async (req, res) => {
  try {
    const items = await CustomerPO.find({})
      .populate("customern")  // Populating customer data
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.log('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const readCustomerPo = async (req, res) => {
  try {
    const item = await CustomerPO.findOne({ slug: req.params.slug })
      .populate("customern");
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.log('Error fetching item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeCustomerPo = async (req, res) => {
  try {
    const item = await CustomerPO.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'CPO deleted successfully', item });
  } catch (err) {
    console.log('Error deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateCustomerPo = async (req, res) => {
  try {
    const { customern, customerpo, date, status } = req.fields;

    // Validation
    if (!customern || !customern.trim()) return res.status(400).json({ error: 'Customer is required' });
    if (!customerpo || !customerpo.trim()) return res.status(400).json({ error: 'CustomerPO is required' });
    if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });
    if (!date || !date.trim()) return res.status(400).json({ error: 'Date is required' });

    // Find customer by name
    const customer = await Customer.findOne({ name: customern });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    // Update item
    const updatedCPO = await CustomerPO.findByIdAndUpdate(
      req.params.id,
      {
        customern: customer._id,
        customerpo,
        date,
        status,
      },
      { new: true }
    );
    if (!updatedCPO) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedCPO);
  } catch (err) {
    console.log('Error updating CustomerPO:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
