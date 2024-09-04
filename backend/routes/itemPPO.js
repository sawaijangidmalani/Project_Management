import express from 'express';
import ExpressFormidable from 'express-formidable';
import { createItemPPo, listItemPPo, readItemPPo, removeItemPPo, updateItemPPo } from '../controllers/itemPPO.js';
//import { createItemPo, listItemPo, readItemPo, removeItemPo, updateItemPo } from '../controllers/itemPo.js';

const router = express.Router();

// Use formidable middleware for parsing form data
router.post('/itemppo', ExpressFormidable(), createItemPPo);
router.get('/itemppos', listItemPPo);
router.get('/itemppos/:slug', readItemPPo);
router.put('/itemppos/:id',ExpressFormidable(), updateItemPPo);
router.delete('/itemppos/:id', removeItemPPo);

export default router;
