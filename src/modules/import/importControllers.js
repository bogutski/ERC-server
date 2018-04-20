import mongoose from 'mongoose';
import _ from 'lodash';
import Product from '../product/productModel';
import message from './../messages/messages';
import cloudMultiUpload from '../file/cloudinaryFileUpload';
import * as fs from 'fs';

import csv from 'csv';

export async function productImport(req, res) {
  console.log('Here');

  let c =  fs.readFileSync('uploads/imp.csv', 'utf8');

  console.log(c);

  // const _id = new mongoose.Types.ObjectId();
  // const images = [];

  // if (!_.isEmpty(req.files)) {
  //   // Paths to local upload folder
  //   const filesArr = req.files.map(el => el.path);
  //   const cloudUrls = await cloudMultiUpload(filesArr);
  //
  //   images = cloudUrls.map(el => ({
  //     pid: el.public_id,
  //     url: el.url,
  //   }));
  // }

  // const product = new Product({
  //   image: images,
  // });

  // Send back product id for redirect to new product after creating
  // const payload = {
  //   productId: _id,
  // };
  res.status(200).json(message.success('Import CSV'));
  // product
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.status(201)
  //       .json(message.success('Product created', payload));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500)
  //       .json(message.error(err));
  //   });
}

