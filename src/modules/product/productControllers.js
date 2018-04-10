import mongoose from 'mongoose';
import _ from 'lodash';
import Product from './productModel';
import message from './../messages/messages';
import cloudMultiUpload from '../file/cloudinaryFileUpload';

export const productLoadAll = (req, res) => {
  Product.find()
    .select('-__v')
    .exec()
    .then((docs) => {
      res.status(200)
        .json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
};

export async function productCreate(req, res) {
  const _id = new mongoose.Types.ObjectId();
  let images = [];

  if (!_.isEmpty(req.files)) {
    // Paths to local upload folder
    const filesArr = req.files.map(el => el.path);
    const cloudUrls = await cloudMultiUpload(filesArr);

    images = cloudUrls.map(el => ({
      pid: el.public_id,
      url: el.url,
    }));
  }

  const product = new Product({
    _id,
    name: req.body.name,
    price: req.body.price,
    catalog: req.body.catalog,
    image: images,
  });

  // Send back product id for redirect to new product after creating
  const payload = {
    productId: _id,
  };

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201)
        .json(message.success('Product created', payload));
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
}

export const productGetById = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200)
          .json(doc);
      } else {
        res.status(404)
          .json(message.error('No product for provided id'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json({ error: err });
    });
};

export const productGetByCategoryId = (req, res) => {
  const id = req.params.categoryId;
  Product.find({ catalog: id })
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200)
          .json(doc);
      } else {
        res.status(404)
          .json(message.error('No product for provided id'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json({ error: err });
    });
};

export async function productUpdateById(req, res) {
  const id = req.params.productId;

  let images = [];
  if (!_.isEmpty(req.files)) {
    // Paths to local upload folder
    const filesArr = req.files.map(el => el.path);
    const cloudUrls = await cloudMultiUpload(filesArr);

    images = cloudUrls.map(el => ({
      pid: el.public_id,
      url: el.url,
    }));
  }

  const existingImages = JSON.parse(req.body.existingImage);

  req.body.image = [...existingImages, ...images];

  Product.update({ _id: id }, { $set: req.body })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200)
          .json(message.success('Product updated'));
      } else {
        res.status(400)
          .json(message.error('Product not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
}

export const productDeleteById = (req, res) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((doc) => {
      if (doc.result.n) {
        res.status(200)
          .json(message.success('Product deleted'));
      } else {
        res.status(400)
          .json(message.error('Product not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
};
