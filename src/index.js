import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import sequelize from './sql';
import userRouter from './modules/user/userRoutes';
import productRouter from './modules/product/productRoutes';
import vocabularRouter from './modules/vocabular/vocabularRoutes';
import backupRouter from './modules/backup/backupRoutes';
import fileRouter from './modules/file/fileRoutes';
import offertRouter from './modules/offer/offerRoutes';

import message from './modules/messages/messages';

const PORT = +process.env.PORT || 5000;
const app = express();

// ===== SQL =======
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// ===== DISABLE EXPRESS SIGNATURE ======
app.disable('x-powered-by');

// ===== DATABASE ======
mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PWD}@${process.env.MONGO_ATLAS_HOST}/${process.env.MONGO_ATLAS_DB_NAME}`);

mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// ===== LOGGER =====
app.use(morgan('dev'));

// ===== PARSE RESPONSE =====
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

// ===== CORS =====
app.use((req, res, next) => { // eslint-disable-line consistent-return
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// ===== IGNORE FAVICON =====
app.get('/favicon.ico', (req, res) => res.status(204));

// ===== ROUTING =====
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/vocabular', vocabularRouter);
app.use('/file', fileRouter);
app.use('/backup', backupRouter);
app.use('/offer', offertRouter);

// ===== ERROR HANDLING =====
app.use((req, res, next) => res.status(404).json(message.error('API not found'))); // eslint-disable-line no-unused-vars

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(error.status || 500);
  res.json(message.error(error.message));
});

// ===== PORT =====
app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
