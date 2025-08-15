import express from 'express';
import multer from 'multer';
import { registerAdmin, getAllData, updateAdmin } from '../controllers/adminRegistrationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Multer setup for optional file upload (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// POST /admin/registration
router.post('/registration', upload.single('profilePhoto'), registerAdmin);

// GET /getalldata (no auth required) - mounted at root level in server.js
// router.get('/getalldata', getAllData);

// PUT /admin/update/:id (requires JWT)
router.put('/update/:id', upload.single('profilePhoto'), updateAdmin);

export default router;


