// import mongoose from 'mongoose';

// const offerSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   title: { type: String, required: true },
//   catalog: { type: String, required: false },
//   price: { type: Number, required: true },
//   image: { type: Array, required: false },
// });
//
// export default mongoose.model('Offer', offerSchema);

import Sequelize from 'sequelize';
import sequelize from './../../sql';

const Offer = sequelize.define('offer', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Offer;

// // force: true will drop the table if it already exists
// Product.sync({ force: false }).then(() =>
//   // Table created
//   Product.create({
//     firstName: 'John 2',
//     lastName: 'Hancock 2',
//   }));
//
// Product.findAll().then((users) => {
//   console.log(users);
// });

