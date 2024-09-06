const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const uri = process.env.MONGODB_URI;

async function createAdmin() {
  if (!uri) {
    console.error('MONGODB_URI tidak ditemukan dalam file .env.local');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Terhubung ke MongoDB');

    const database = client.db('test'); // Sesuaikan dengan nama database Anda
    const usersCollection = database.collection('users');

    const username = 'admin123';
    const password = 'admin123'; // Ganti dengan password yang lebih aman

    // Cek apakah User sudah ada
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      console.log('User sudah ada.');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      username,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('User berhasil ditambahkan:', result.insertedId);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

createAdmin().catch(console.error);