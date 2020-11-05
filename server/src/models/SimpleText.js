import mongoose from 'mongoose';
import validator from 'validator';
mongoose.Promise = global.Promise;

const simpleTextSchema = new mongoose.Schema({
  organisation: mongoose.Schema.ObjectId,
  account: mongoose.Schema.ObjectId,
  public: Boolean,
  text: {
    type: String,
    trim: true,
  },
  abstract: {
    type: String,
    trim: true,
  },
  authorActor: mongoose.Schema.ObjectId,
  recipientActors: [mongoose.Schema.ObjectId],
  date: Date,
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!',
    }],
    address: {
      type: String,
      required: 'You must supply an address!',
    },
  },
  sourceUrl: {
    type: String,
    trim: true,
    validate: [validator.isURL, 'Please provide a valid URL.']
  }
}, { timestamps: true });

export default mongoose.model('SimpleText', simpleTextSchema);