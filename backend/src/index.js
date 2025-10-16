import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected ho gya');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//schema
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails are stored
    lowercase: true, // Converts email to lowercase before saving
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model('Email', emailSchema); // 'Email' will become a 'emails' collection in MongoDB

// 6. Create an API Route to handle incoming emails
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Create a new document using the Email model
    const newEmail = new Email({ email: email });

    await newEmail.save();

    res.status(201).json({ message: 'Thank you for subscribing!', email: newEmail });

  } catch (error) {
    if (error.code === 11000) { // 11000 is the MongoDB duplicate key error code
      return res.status(409).json({ message: 'This email is already subscribed.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
