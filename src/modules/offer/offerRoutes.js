import { Router } from 'express';

import {
  offerImportCsv,
  offerImportJson,
  offerImportDeleteAll,
  offerGetAll,
} from './offerControllers';

const router = Router();

router.get('/all', offerGetAll);
router.delete('/all', offerImportDeleteAll);
router.post('/import/json', offerImportJson);
router.post('/import/csv', offerImportCsv);

export default router;
