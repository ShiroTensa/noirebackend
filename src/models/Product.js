import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  fragrance: String,
  description: String,
  price: Number,
  imageURL: String
},{ timestamps: true });

export default mongoose.model('Product', productSchema);
