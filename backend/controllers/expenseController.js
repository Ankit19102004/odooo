const Expense = require('../models/Expense');
const User = require('../models/User');

// Create expense
const createExpense = async (req, res) => {
  try {
    const { amount, description, category, date, receipt, notes } = req.body;
    
    const expense = await Expense.create({
      employeeId: req.user.id,
      amount,
      description,
      category,
      date,
      receipt,
      notes
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's expenses
const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { employeeId: req.user.id },
      include: [
        { model: User, as: 'Employee', attributes: ['name', 'email'] },
        { model: User, as: 'ApprovedBy', attributes: ['name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(expenses);
  } catch (error) {
    console.error('Get user expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all expenses (for managers/admins)
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        { model: User, as: 'Employee', attributes: ['name', 'email', 'department'] },
        { model: User, as: 'ApprovedBy', attributes: ['name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(expenses);
  } catch (error) {
    console.error('Get all expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update expense status (approve/reject)
const updateExpenseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check if user has permission to approve/reject
    if (req.user.role === 'employee') {
      return res.status(403).json({ message: 'Not authorized to update expense status' });
    }

    await expense.update({
      status,
      approvedById: req.user.id,
      approvedAt: new Date(),
      rejectionReason: status === 'rejected' && rejectionReason ? rejectionReason : null
    });

    res.json(expense);
  } catch (error) {
    console.error('Update expense status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id, {
      include: [
        { model: User, as: 'Employee', attributes: ['name', 'email', 'department'] },
        { model: User, as: 'ApprovedBy', attributes: ['name', 'email'] }
      ]
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check if user can view this expense
    if (req.user.role === 'employee' && expense.employeeId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this expense' });
    }

    res.json(expense);
  } catch (error) {
    console.error('Get expense by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createExpense,
  getUserExpenses,
  getAllExpenses,
  updateExpenseStatus,
  getExpenseById
};
