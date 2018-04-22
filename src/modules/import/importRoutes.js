import { Router } from 'express';
import upload from '../file/fileLocalUpload';

import {
  productCsvImport,
  productJsonImport,
  productImportDeleteAll,
} from './importControllers';

const router = Router();

router.post('/csv', productCsvImport);
router.post('/json', productJsonImport);
router.delete('/all', productImportDeleteAll);

export default router;
