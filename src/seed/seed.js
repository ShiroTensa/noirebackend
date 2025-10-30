import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/noire';

async function seed(){
  await mongoose.connect(MONGO_URI);
  const adminPass = await bcrypt.hash('123456', 10);
  const clientPass = await bcrypt.hash('123456', 10);

  await User.updateOne({ email: 'admin@noire.com' }, { $setOnInsert: { name: 'Admin', email: 'admin@noire.com', password: adminPass, role: 'admin' } }, { upsert: true });
  await User.updateOne({ email: 'client@noire.com' }, { $setOnInsert: { name: 'Client', email: 'client@noire.com', password: clientPass, role: 'client' } }, { upsert: true });

  const pCount = await Product.countDocuments();
  if(pCount === 0){
    await Product.create([{ name: 'Vanilla Grace', fragrance: 'Vanilla & Amber', description: 'Soft vanilla scent.', price: 19.99, imageURL: '' },
    { name: 'Rose Silk', fragrance: 'Rose & Peony', description: 'Delicate rose fragrance.', price: 24.5, imageURL: '' }]);
  }

  console.log('Seed complete');
  process.exit(0);
}

seed();
