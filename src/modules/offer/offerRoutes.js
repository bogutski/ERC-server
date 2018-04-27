import { Router } from 'express';

import {
  offerCsvImport,
  offerJsonImport,
  offerImportDeleteAll,
} from './offerControllers';

const router = Router();

router.post('/csv', offerCsvImport);
router.post('/json', offerJsonImport);
router.delete('/all', offerImportDeleteAll);

export default router;
