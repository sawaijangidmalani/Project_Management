import express from 'express';
import ExpressFormidable from 'express-formidable';
import { createPurchase, listPurchase, readPurchase, removePurchase, updatePurchase } from '../controllers/purchaseOrder.js';

const router = express.Router();

// Use formidable middleware for parsing form data
router.post('/purchase', ExpressFormidable(), createPurchase);
router.get('/purchases', listPurchase);
router.get('/purchases/:slug', readPurchase);
router.put('/purchases/:id',ExpressFormidable(), updatePurchase);
router.delete('/purchases/:id', removePurchase);

export default router;
