import dotenv from "dotenv";
import PurchaseOrder from "../models/purchaseOrder.js"


dotenv.config();

export const createPurchase = async (req, res) => {
  try {    
      
      const { customer, customerpo,date,purchase, status } = req.fields;
      console.log(req.fields);
      
      // Validation
      if (!customer || !customer.trim()) return res.status(400).json({ error: 'Customer is required' });
      if (!customerpo || !customerpo.trim()) return res.status(400).json({ error: 'CustomerPO is required' });
      if (!purchase || !purchase.trim()) return res.status(400).json({ error: 'CustomerPO is required' });
      if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });
      if (!date || !date.trim()) return res.status(400).json({ error: 'Date is required' });

    // Create new item
    const po = new PurchaseOrder({ ...req.fields});
    await po.save();
    res.status(201).json(po);
  } catch (err) {
    console.log('Error creating createCustomerPo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listPurchase = async (req, res) => {
  try {
    const items = await PurchaseOrder.find({})
      .populate("customer")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.log('Error fetching items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const readPurchase = async (req, res) => {
  try {
    const item = await PurchaseOrder.findOne({ slug: req.params.slug })
      .populate("customer");
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.log('Error fetching item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removePurchase = async (req, res) => {
  try {
    const item = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'CPO deleted successfully', item });
  } catch (err) {
    console.log('Error deleting item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePurchase = async (req, res) => {
  try {
    const { customer, customerpo,date, status,purchase} = req.fields;

    // Validation
    if (!customer || !customer.trim()) return res.status(400).json({ error: 'Customer is required' });
    if (!customerpo || !customerpo.trim()) return res.status(400).json({ error: 'CustomerPO is required' });
    if (!purchase || !purchase.trim()) return res.status(400).json({ error: 'CustomerPO is required' });
    if (!status || !status.trim()) return res.status(400).json({ error: 'Status is required' });
    if (!date || !date.trim()) return res.status(400).json({ error: 'Date is required' });

    // Update item
    const updatedCPO = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,      
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

