const express = require('express');
const {
  createExpense,
  getUserExpenses,
  getAllExpenses,
  updateExpenseStatus,
  getExpenseById
} = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Expense routes
router.post('/', createExpense);
router.get('/my-expenses', getUserExpenses);
router.get('/all', getAllExpenses);
router.get('/:id', getExpenseById);
router.put('/:id/status', updateExpenseStatus);

module.exports = router;
