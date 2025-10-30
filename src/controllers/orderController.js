import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const order = await Order.create({ userId: req.user._id, products, totalAmount, status: 'Pending' });
  res.json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const cancelOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.status !== 'Pending') return res.status(400).json({ message: 'Cannot cancel' });
  order.status = 'Canceled';
  order.tracking.push({ status: 'Canceled', date: new Date(), note: 'Canceled by user' });
  await order.save();
  res.json(order);
};

// Admin functions
export const listAllOrders = async (req, res) => {
  const orders = await Order.find().populate('userId', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status, note } = req.body;
  const order = await Order.findById(req.params.id);
  if(!order) return res.status(404).json({ message: 'Order not found' });
  order.status = status;
  order.tracking.push({ status, date: new Date(), note: note || '' });
  await order.save();
  res.json(order);
};
