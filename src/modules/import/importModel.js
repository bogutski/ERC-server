import mongoose from 'mongoose';

const importSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  catalog: { type: String, required: false },
  price: { type: Number, required: true },
  image: { type: Array, required: false },
});

export default mongoose.model('Import', importSchema);
