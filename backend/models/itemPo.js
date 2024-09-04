import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const itemPoSchema = new mongoose.Schema({
  item: {
    type:String,
    ref: 'Item',  // Ensure this references the correct model
    required: true
  },
  avlqty: {
    type: Number,
    required: true
  },
  altqty: {
    type: Number,
    required: true
  },
  remqty: {
    type: Number,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  tax: {
    type: String,
    required: true
  },
  ivnumber: {
    type: String,
    required: true
  },
  ivdate: {
    type: Date,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model('ItemPo', itemPoSchema);
