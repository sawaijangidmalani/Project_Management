import express from 'express';
import ExpressFormidable from 'express-formidable';
import { createItem, listItem, readItem, removeItem, updateItem} from '../controllers/items.js';

const router = express.Router();

// Use formidable middleware for parsing form data
router.post('/item', ExpressFormidable(), createItem);
router.get('/items', listItem);
router.get('/items/:slug', readItem);
router.put('/items/:id',ExpressFormidable(),updateItem);
router.delete('/items/:id', removeItem);

export default router;