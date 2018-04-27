import express from 'express';
import apiRoutes from './api';
import viewRoutes from './views';

const router = express.Router();

router.use('/api', apiRoutes);
// router.use('/', viewRoutes);

module.exports = router;