import express from 'express';
import { getCustomers, addCustomer, updateCustomerStatus, deleteCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', addCustomer);
router.put('/:id/status', updateCustomerStatus);
router.delete('/:id', deleteCustomer);

export default router;
