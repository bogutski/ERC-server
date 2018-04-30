// offer mongoose from 'mongoose';
// offer _ from 'lodash';
import parse from 'csv-parse';
import * as fs from 'fs';
import Import from './offerModel';
import message from './../messages/messages';

export const offerGetAll = (req, res) => {
  Import.find()
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

export async function offerImportDeleteAll(req, res) {
  Import.remove({})
    .exec()
    .then((doc) => {
      if (doc.result.n) {
        res.status(200)
          .json(message.success('All offers deleted'));
      } else {
        res.status(400)
          .json(message.error('Imports not found'));
      }
    })
    .catch((err) => {
      res.status(500)
        .json(message.error(err));
    });
}

export async function offerImportCsv(req, res) {
  function afterParse(output) {
    Import.insertMany(output, (error, docs) => {
      res.status(200).json(message.success('Import CSV', { error, docs }));
    });
  }

  const csv = fs.readFileSync('uploads/offers/offer_import.csv', 'utf8');

  parse(csv, {
    comment: '#',
    delimiter: ';',
    skip_empty_lines: true,
    columns: true,
  }, (err, output) => {
    if (err) res.status(400).json(message.error('Import CSV error', err));
    afterParse(output);
  });
}

export async function offerImportJson(req, res) {
  function afterParse(output) {
    Import.insertMany(output, (error, docs) => {
      res.status(200).json(message.success('Import JSON', { error, docs }));
    });
  }

  const json = fs.readFileSync('uploads/offers/offer_import.json', 'utf8');

  afterParse(JSON.parse(json));
}
