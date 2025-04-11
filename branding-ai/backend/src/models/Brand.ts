import mongoose from 'mongoose';

export interface IBrand extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  brandName: string;
  mission: string;
  vision: string;
  industries: string[];
  style: string;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  industries: {
    type: [String],
    required: true,
    validate: {
      validator: function(v: string[]) {
        return v.length > 0 && v.length <= 3;
      },
      message: 'You must select between 1 and 3 industries'
    }
  },
  style: {
    type: String,
    required: true,
    enum: ['Retro', 'Futuristic', 'Minimalistic', 'Bold']
  }
}, {
  timestamps: true
});

export default mongoose.model<IBrand>('Brand', brandSchema); 