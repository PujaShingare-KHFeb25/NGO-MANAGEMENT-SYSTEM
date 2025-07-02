import express from 'express';
import { createDonation, getAllDonations, getDonationById, updateDonation, deleteDonation,recentDonation } from '../controllers/donationController.js';

const router = express.Router();

router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/:id', getDonationById);
router.put('/:id', updateDonation);
router.delete('/:id', deleteDonation);
router.post('/recent-donation',recentDonation);

export default router;