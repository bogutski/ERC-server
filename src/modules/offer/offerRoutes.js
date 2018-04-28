import { Router } from 'express';

import {
  offerImportCsv,
  offerImportJson,
  offerImportDeleteAll,
} from './offerControllers';

const router = Router();

router.post('/csv', offerImportCsv);
router.post('/json', offerImportJson);
router.delete('/all', offerImportDeleteAll);

export default router;
