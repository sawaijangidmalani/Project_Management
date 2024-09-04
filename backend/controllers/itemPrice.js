import slugify from "slugify";
import Itemprice from "../models/itemPrice.js";
import dotenv from "dotenv";

dotenv.config();

export const createItemPrice = async (req, res) => {
  try {    
    const {item,price, qty, date} = req.fields;
    console.log(req.fields);
    
    // Validation
    if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!price || !price.trim()) return res.status(400).json({ error: 'Price is required' });
    if (!qty || !qty.trim()) return res.status(400).json({ error: 'Quantity is required' });
    if (!date || !date.trim()) return res.status(400).json({ error: 'Date is required' });

    // Create new item
    const newItemprice = new Itemprice({ ...req.fields});
    await newItemprice.save();
    res.status(201).json(newItemprice);
  } catch (err) {
    console.log('Error creating item price:', err);
    res.status(500).json({  error: 'Internal Server Error' });
  }
};

export const listItemPrice = async (req, res) => {
  try {
    const items = await Itemprice.find({})
      .populate("item")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.log('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const readItemPrice = async (req, res) => {
  try {
    const item = await Itemprice.findOne({ slug: req.params.slug })
       .populate("item");
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.log('Error fetching item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// export const removeItemPrice = async (req, res) => {
//   try {
//     const supplier = await Itemprice.findByIdAndDelete(req.params.id); // Changed to 'id'
//     if (!supplier) return res.status(404).json({ error: 'supplier not found' });
//     res.status(200).json(supplier);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

export const removeItemPrice = async (req, res) => {
  try {
    const item = await Itemprice.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully', item });
  } catch (err) {
    console.log('Error deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateItemPrice = async (req, res) => {
  try {
    const { item, price, qty, date } = req.fields;
  console.log(req.fields);
  
    // Validation
    //if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!price || !price.trim()) return res.status(400).json({ error: 'Price is required' });
    if (!qty || !qty.trim()) return res.status(400).json({ error: 'Quatity is required' });
    if (!date || !date.trim()) return res.status(400).json({ error: 'Date is required' });

    // Update item
    const updatedItem = await Itemprice.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    console.log('Error updating item price:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

