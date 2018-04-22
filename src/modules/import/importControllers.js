// import mongoose from 'mongoose';
// import _ from 'lodash';
import parse from 'csv-parse';
import * as fs from 'fs';
import Import from './importModel';
import message from './../messages/messages';

export async function productImportDeleteAll(req, res) {
  Import.remove({})
    .exec()
    .then((doc) => {
      if (doc.result.n) {
        res.status(200)
          .json(message.success('All imports deleted'));
      } else {
        res.status(400)
          .json(message.error('Imports not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
}

export async function productImport(req, res) {
  function afterParse(output) {
    Import.insertMany(output, (error, docs) => {
      res.status(200).json(message.success('Import CSV', { error, docs }));
    });
  }

  const csv = fs.readFileSync('uploads/imp.csv', 'utf8');

  parse(csv, {
    comment: '#',
    delimiter: ';',
    skip_empty_lines: true,
    columns: true,
  }, (err, output) => {
    if (err) res.status(400).json(message.error('Import CSV error', err));
    afterParse(output);
  });

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

  //
  // const product = new Import({
  //   iid: images,
  // });

  // Send back product id for redirect to new product after creating
  // const payload = {
  //   productId: _id,
  // };
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

