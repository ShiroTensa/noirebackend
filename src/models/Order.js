import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ productId: String, name: String, price: Number, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  tracking: [{ status: String, date: Date, note: String }]
},{ timestamps: true });

export default mongoose.model('Order', orderSchema);
