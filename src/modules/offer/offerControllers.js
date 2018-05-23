// offer mongoose from 'mongoose';
// offer _ from 'lodash';
import Offer from './offerModel';
import message from './../messages/messages';

export async function offerCreate(req, res) {
  Offer
    .findOrCreate({
      where: {
        title: req.body.title,
        price: req.body.price,
      },
      defaults: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: JSON.stringify(req.body.image),
      },
    })
    .spread((user, created) => {
      const o = user.get({
        plain: true,
      });
      res.status(201)
        .json(message.success('Offer created', { o, created }));
    });
}

export async function offerGetAll(req, res) {
  Offer
    .findAll().then((docs) => {
      res.status(201)
        .json(docs);
    });
}

// const product = new Product({
//   _id,
//   name: req.body.name,
//   price: req.body.price,
//   catalog: req.body.catalog,
//   image: images,
// });

// Send back product id for redirect to new product after creating
// const payload = {
//   productId: _id,
// };
//
// Offer
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
// User.create({ username: 'fnord', job: 'omnomnom' })
//   .then(() => User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}}))
//   .spread((user, created) => {
//     console.log(user.get({
//       plain: true
//     }))
//     console.log(created)
//
//     /*
//     In this example, findOrCreate returns an array like this:
//     [ {
//         username: 'fnord',
//         job: 'omnomnom',
//         id: 2,
//         createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//         updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//       },
//       false
//     ]
//     The array returned by findOrCreate gets spread into its 2 parts by the "spread" on line 69, and the parts will be passed as 2 arguments to the callback function beginning on line 69, which will then treat them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "false".)
//     */
//   })

// export const offerGetAll = (req, res) => {
//   Import.find()
//     .select('-__v')
//     .exec()
//     .then((docs) => {
//       res.status(200)
//         .json(docs);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500)
//         .json(message.error(err));
//     });
// };

/*
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


*/
