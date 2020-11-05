import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'You must provide an organisation name.',
  },
  token: String,
  accounts: [mongoose.Schema.ObjectId],
  adminAccounts: [mongoose.Schema.ObjectId],
}, { timestamps: true });

export default mongoose.model('Organisation', organisationSchema);