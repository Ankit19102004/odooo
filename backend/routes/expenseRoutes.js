import express from 'express';
import {
  createExpense,
  getUserExpenses,
  getAllExpenses,
  updateExpenseStatus,
  getExpenseById
} from '../controllers/expenseController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Expense routes
router.post('/', createExpense);
router.get('/my-expenses', getUserExpenses);
router.get('/all', getAllExpenses);
router.get('/:id', getExpenseById);
router.put('/:id/status', updateExpenseStatus);

export default router;