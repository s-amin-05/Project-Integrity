import express from 'express';
import { 
  createReport, 
  getAllReports, 
  getReportById, 
  getReportsByLocation 
} from '../controllers/reportController.js';
import firebaseAuth from '../middleware/firebaseAuth.js';

const router = express.Router();

// All routes require authentication
router.use(firebaseAuth);

router.post('/', createReport);
router.get('/', getAllReports);
router.get('/nearby', getReportsByLocation);
router.get('/:id', getReportById);

export default router;
