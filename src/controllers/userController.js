import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if(!user) return res.status(404).json({ message: 'User not found' });
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  await user.save();
  res.json({ message: 'Updated', user });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(oldPassword, user.password);
  if(!match) return res.status(400).json({ message: 'Invalid old password' });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password changed' });
};
