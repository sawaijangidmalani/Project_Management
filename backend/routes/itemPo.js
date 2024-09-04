import express from 'express';
import ExpressFormidable from 'express-formidable';
import { createItemPo, listItemPo, readItemPo, removeItemPo, updateItemPo } from '../controllers/itemPo.js';

const router = express.Router();

// Use formidable middleware for parsing form data
router.post('/itempo', ExpressFormidable(), createItemPo);
router.get('/itempos', listItemPo);
router.get('/itempos/:slug', readItemPo);
router.put('/itempos/:id',ExpressFormidable(), updateItemPo);
router.delete('/itempos/:id', removeItemPo);

export default router;
