import { Router } from 'express';
import upload from '../file/fileLocalUpload';

import { productImport, productImportDeleteAll } from './importControllers';

const router = Router();

router.post('/', upload.single('image', 1), productImport);
router.post('/csv', productImport);
router.delete('/all', productImportDeleteAll);

export default router;
