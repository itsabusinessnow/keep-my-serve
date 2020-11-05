import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

// Currently only supports Google Login
// TODO: Support additional login types

const accountSchema = new mongoose.Schema({
  googleUserId: {
    type: String,
    required: 'You must provide a Google User Id.',
  },
  name: {
    type: String,
    required: `The account requires the user's name.`,
  },
  organisations: [mongoose.Schema.ObjectId], // Organisations that this account is part of
}, { timestamps: true });

export default mongoose.model('Account', accountSchema);