// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  namaRekening: { type: String, default: 'N/A' },
  nomorRekening: { type: String, default: 'N/A' },
  namaBank: { type: String, default: 'N/A' },// Tambahkan ini
  nohp: { type: String, default: 'N/A' },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  profileCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema, 'users');