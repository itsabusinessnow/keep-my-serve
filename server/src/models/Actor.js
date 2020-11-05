import mongoose from 'mongoose';
import validator from 'validator';
mongoose.Promise = global.Promise;

const validGender = ['M', 'F', 'O', 'N', 'U'];

const actorSchema = new mongoose.Schema({
  organisation: {
    type: mongoose.Schema.ObjectId,
    required: 'The organisation id is required.',
  },
  account: {
    type: mongoose.Schema.ObjectId,
    required: 'The account id is required.',
  },
  public: {
    type: Boolean,
    default: false,
  },
  birthDate: Date,
  deathDate: Date,
  firstName: {
    type: String,
    required: 'A first name is required.',
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    validate: {
      validator: (v) => {
        return validGender.includes(v);
      },
      message: 'Please provide a valid value for Gender',
    }
  },
  nationality: String,
  website: {
    type: String,
    trim: true,
    validate: [validator.isURL, 'Please provide a valid URL.']
  },
}, { timestamps: true });

export default mongoose.model('Actor', actorSchema);