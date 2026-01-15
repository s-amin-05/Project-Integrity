import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    name: {
      type: String,
      required: true
    },
    coords: {
      type: [Number],
      required: true
    }
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  risk: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'dismissed'],
    default: 'pending'
  },
  reportImages: [String],
  resolveImages: [String]
}, { timestamps: true });

// Create a geospatial index for location coordinates
reportSchema.index({ 'location.coords': '2dsphere' });

export default mongoose.model('Report', reportSchema);
