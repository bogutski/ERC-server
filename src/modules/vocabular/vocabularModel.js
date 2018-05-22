import mongoose from 'mongoose';

const vocabularSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  terms: [
    {
      autopath: { type: Boolean, required: false },
      path: { type: String, required: false },
      name: { type: String, required: true },
      id: { type: String, required: true },
      expanded: { type: Boolean, required: false },
      children: [],
      // files: [
      //   {
      //     pid: 'io188ctdkjphjex92eop',
      //     url: 'http://res.cloudinary.com/bogutskii/image/upload/v1522739195/io188ctdkjphjex92eop.jpg',
      //   },
      // ],
    },
  ],
});

export default mongoose.model('Vocabular', vocabularSchema);
