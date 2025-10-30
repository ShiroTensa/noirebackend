import Product from '../models/Product.js';

export const listProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if(!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

export const createProduct = async (req, res) => {
  const p = await Product.create(req.body);
  res.json(p);
};

export const updateProduct = async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(p);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
