import { Router } from 'express';
import upload from '../file/fileLocalUpload';

import { productImport } from './importControllers';

const router = Router();

router.post('/', upload.single('image', 1), productImport);
router.post('/csv', productImport);

export default router;
