import { Router } from 'express';
import upload from '../file/fileLocalUpload';

import { productImport } from './importControllers';

const router = Router();

router.post('/', upload.array('image', 1), productImport);

export default router;
