import slugify from "slugify";
import Itemprice from "../models/itemPrice.js";
import dotenv from "dotenv";
import ItemPPo from "../models/itemPPO.js";

dotenv.config();

export const createItemPPo = async (req, res) => {
  try {    
      const { item, avlqty,remqty,cost,pprice, altqty,ivnumber, ivdate} = req.fields;
    
    // Validation
    if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!avlqty || !avlqty.trim()) return res.status(400).json({ error: 'Available QTY is required' });
    if (!cost || !cost.trim()) return res.status(400).json({ error: 'Cost is required' });
    if (!pprice || !pprice.trim()) return res.status(400).json({ error: 'price is required' });
    if (!altqty || !altqty.trim()) return res.status(400).json({ error: 'ALT QTY is required' });
    if (!remqty || !remqty.trim()) return res.status(400).json({ error: 'Rem QTY is required' });
    if (!ivnumber || !ivnumber.trim()) return res.status(400).json({ error: 'Invoice number is required' });
    if (!ivdate || !ivdate.trim()) return res.status(400).json({ error: 'Date is required' });

    // Create new item
    const cpo = new ItemPPo({ ...req.fields, slug: slugify(item) });
    await cpo.save();
    res.status(201).json(cpo);
  } catch (err) {
    console.log('Error creating createCustomerPo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listItemPPo = async (req, res) => {
  try {
    const items = await ItemPPo.find({})
      .populate("Item")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.log('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const readItemPPo = async (req, res) => {
  try {
    const item = await ItemPPo.findOne({ slug: req.params.slug })
      .populate("Item");
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.log('Error fetching item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeItemPPo = async (req, res) => {
  try {
    const item = await ItemPPo.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'IPO deleted successfully', item });
  } catch (err) {
    console.log('Error deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateItemPPo = async (req, res) => {
  try {
    const { item, avlqty,remqty,cost,pprice, altqty,ivnumber, ivdate} = req.fields;

    // Validation
    if (!item || !item.trim()) return res.status(400).json({ error: 'Item is required' });
    if (!avlqty || !avlqty.trim()) return res.status(400).json({ error: 'Available QTY is required' });
    if (!cost || !cost.trim()) return res.status(400).json({ error: 'Cost is required' });
    if (!pprice || !pprice.trim()) return res.status(400).json({ error: 'Tax is required' });
    if (!altqty || !altqty.trim()) return res.status(400).json({ error: 'ALT QTY is required' });
    if (!remqty || !remqty.trim()) return res.status(400).json({ error: 'Rem QTY is required' });
    if (!ivnumber || !ivnumber.trim()) return res.status(400).json({ error: 'Invoice number is required' });
    if (!ivdate || !ivdate.trim()) return res.status(400).json({ error: 'Date is required' });

    // Update item
    const updatedIPO = await ItemPPo.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
      },
      { new: true }
    );
    if (!updatedIPO) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedIPO);
  } catch (err) {
    console.log('Error updating CustomerPO:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

