import slugify from "slugify";
import dotenv from "dotenv";
import ItemPo from "../models/itemPo.js";
import mongoose from "mongoose";

dotenv.config();

export const createItemPo = async (req, res) => {
  try {    
      const { item, avlqty,remqty,cost,tax, altqty,ivnumber, ivdate} = req.fields;
    
    // Validation
    if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!avlqty || !avlqty.trim()) return res.status(400).json({ error: 'Available QTY is required' });
    if (!cost || !cost.trim()) return res.status(400).json({ error: 'Cost is required' });
    if (!tax || !tax.trim()) return res.status(400).json({ error: 'Tax is required' });
    if (!altqty || !altqty.trim()) return res.status(400).json({ error: 'ALT QTY is required' });
    if (!remqty || !remqty.trim()) return res.status(400).json({ error: 'Rem QTY is required' });
    if (!ivnumber || !ivnumber.trim()) return res.status(400).json({ error: 'Invoice number is required' });
    if (!ivdate || !ivdate.trim()) return res.status(400).json({ error: 'Date is required' });

    // Create new item
    const cpo = new ItemPo({ ...req.fields, slug: slugify(item) });
    await cpo.save();
    res.status(201).json(cpo);
  } catch (err) {
    console.log('Error creating createCustomerPo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listItemPo = async (req, res) => {
  try {
    const items = await ItemPo.find({})
      .populate("item")
      // .limit(12)
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.log('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const readItemPo = async (req, res) => {
  try {
    const item = await ItemPo.findOne({ slug: req.params.slug })
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

export const removeItemPo = async (req, res) => {
  try {
    const item = await ItemPo.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'IPO deleted successfully', item });
  } catch (err) {
    console.log('Error deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// export const createItemPo = async (req, res) => {
//   try {
//     const { item: itemId, avlqty, remqty, cost, tax, altqty, ivnumber, ivdate } = req.body; // Note the change here
    
//     // Validation
//     if (!mongoose.Types.ObjectId.isValid(itemId)) {
//       return res.status(400).json({ error: 'Invalid item ID' });
//     }

//     if (!avlqty || !cost || !tax || !altqty || !remqty || !ivnumber || !ivdate) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Create new item
//     const cpo = new ItemPo({
//       item: itemId, // Use the ObjectId here
//       avlqty,
//       altqty,
//       remqty,
//       cost,
//       tax,
//       ivnumber,
//       ivdate,
//       slug: slugify(itemId) // Assuming slugify here is for item ID
//     });
    
//     await cpo.save();
//     res.status(201).json(cpo);
//   } catch (err) {
//     console.log('Error creating createItemPo:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const updateItemPo = async (req, res) => {
  try {
    const { item: itemId, avlqty, remqty, cost, tax, altqty, ivnumber, ivdate } = req.body; // Note the change here
    
    // Validation
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    // Update item
    const updatedIPO = await ItemPo.findByIdAndUpdate(
      req.params.id,
      {
        item: itemId, // Use the ObjectId here
        avlqty,
        altqty,
        remqty,
        cost,
        tax,
        ivnumber,
        ivdate
      },
      { new: true }
    );

    if (!updatedIPO) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedIPO);
  } catch (err) {
    console.log('Error updating ItemPo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
