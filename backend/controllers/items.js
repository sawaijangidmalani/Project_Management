import mongoose from 'mongoose';
import slugify from "slugify";
import Item from "../models/items.js";
import Supplier from "../models/suppliers.js";
import dotenv from "dotenv";

dotenv.config();

export const createItem = async (req, res) => {
  try {
    const { item, supplier: supplierName, description, category, brand, stock, unit, status } = req.fields;

    // Validation
    if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!supplierName || !supplierName.trim()) return res.status(400).json({ error: 'Supplier is required' });
    if (!description || !description.trim()) return res.status(400).json({ error: 'Description is required' });
    if (!category || !category.trim()) return res.status(400).json({ error: 'Category is required' });
    if (!brand || !brand.trim()) return res.status(400).json({ error: 'Brand is required' });
    if (!stock || !stock.trim()) return res.status(400).json({ error: 'Stock is required' });
    if (!unit || !unit.trim()) return res.status(400).json({ error: 'Unit is required' });
    if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });

    // Find the supplier by name to get its ObjectId
    const supplier = await Supplier.findOne({ name: supplierName });
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

    // Create new item with the supplier's ObjectId
    const newItem = new Item({
      ...req.fields,
      supplier: supplier._id, // Use the supplier's ObjectId
      slug: slugify(item),
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.log('Error creating item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { item, supplier: supplierName, description, category, brand, stock, unit, status } = req.fields;

    // Validation
    if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!supplierName || !supplierName.trim()) return res.status(400).json({ error: 'Supplier is required' });
    if (!description || !description.trim()) return res.status(400).json({ error: 'Description is required' });
    if (!category || !category.trim()) return res.status(400).json({ error: 'Category is required' });
    if (!brand || !brand.trim()) return res.status(400).json({ error: 'Brand is required' });
    if (!stock || !stock.trim()) return res.status(400).json({ error: 'Stock is required' });
    if (!unit || !unit.trim()) return res.status(400).json({ error: 'Unit is required' });
    if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });

    // Find the supplier by name to get its ObjectId
    const supplier = await Supplier.findOne({ name: supplierName });
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

    // Update item with the supplier's ObjectId
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        supplier: supplier._id, // Use the supplier's ObjectId
        slug: slugify(item),
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    console.log('Error updating item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const listItem = async (req, res) => {
  try {
    const items = await Item.find({})
      .populate("supplier")
      //.populate("itemprice")
    res.json(items);
  } catch (err) {
    console.log('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const readItem = async (req, res) => {
  try {
    const item = await Item.findOne({ slug: req.params.slug })
      .populate("Supplier")
      .populate("Itemprice")
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.log('Error fetching item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully', item });
  } catch (err) {
    console.log('Error deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

