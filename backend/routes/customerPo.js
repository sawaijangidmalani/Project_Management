import express from 'express';
// import formidable from 'formidable';
import ExpressFormidable from 'express-formidable';
import { createCustomerPo, listCustomerPo, readCustomerPo, removeCustomerPo, updateCustomerPo } from '../controllers/customerPo.js';

const router = express.Router();

// Use formidable middleware for parsing form data
router.post('/customerpo', ExpressFormidable(), createCustomerPo);
router.get('/customerpos', listCustomerPo);
router.get('/customerpos/:slug', readCustomerPo);
router.put('/customerpos/:id',ExpressFormidable(), updateCustomerPo);
router.delete('/customerpos/:id', removeCustomerPo);

export default router;
