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
      res.status(500)
        .json(message.error(err));
    });
}

export async function productCsvImport(req, res) {
  function afterParse(output) {
    Import.insertMany(output, (error, docs) => {
      res.status(200).json(message.success('Import CSV', { error, docs }));
    });
  }

  const csv = fs.readFileSync('uploads/imports/imp.csv', 'utf8');

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

export async function productJsonImport(req, res) {
  function afterParse(output) {
    Import.insertMany(output, (error, docs) => {
      res.status(200).json(message.success('Import JSON', { error, docs }));
    });
  }

  const json = fs.readFileSync('uploads/imports/imp.json', 'utf8');

  afterParse(JSON.parse(json));
}
