import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  DollarSign,
  Calendar,
  User,
  FileText,
  Filter,
  Search,
  Download,
  Shield
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useUser } from './UserContext';

const ManagerView: React.FC = () => {
  const { user, hasPermission } = useUser();
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Check permissions
  if (!hasPermission('approve_expenses') && !hasPermission('view_all_expenses')) {
    return (
      <div className="p-6">
        <Card className="card-3d border-0">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto text-[#6B7280] mb-4" />
            <h3>Access Denied</h3>
            <p className="text-[#6B7280]">You don't have permission to access the approval dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: 'Client Dinner - Q1 Strategy Meeting',
      amount: 127.50,
      employee: { name: 'Sarah Chen', avatar: 'SC', department: 'Marketing' },
      date: '2024-01-15',
      category: 'Meals',
      status: 'pending',
      description: 'Dinner with potential client to discuss Q1 marketing strategy and partnership opportunities.',
      merchant: 'The Capital Grille',
      receiptUrl: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NTIxNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      submittedAt: '2024-01-15T10:30:00'
    },
    {
      id: 2,
      title: 'Conference Registration - TechSummit 2024',
      amount: 450.00,
      employee: { name: 'Mike Johnson', avatar: 'MJ', department: 'Engineering' },
      date: '2024-01-12',
      category: 'Travel',
      status: 'pending',
      description: 'Registration for annual technology conference including workshops on AI and cloud computing.',
      merchant: 'TechSummit Events',
      receiptUrl: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NTIxNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      submittedAt: '2024-01-12T14:15:00'
    },
    {
      id: 3,
      title: 'Taxi to Airport',
      amount: 45.20,
      employee: { name: 'Alex Rodriguez', avatar: 'AR', department: 'Sales' },
      date: '2024-01-10',
      category: 'Travel',
      status: 'pending',
      description: 'Transportation to airport for business trip to San Francisco.',
      merchant: 'Yellow Cab Co.',
      receiptUrl: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NTIxNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      submittedAt: '2024-01-10T09:45:00'
    },
    {
      id: 4,
      title: 'Software License - Adobe Creative Suite',
      amount: 299.00,
      employee: { name: 'Emily Davis', avatar: 'ED', department: 'Design' },
      date: '2024-01-08',
      category: 'Software',
      status: 'approved',
      description: 'Annual subscription for Adobe Creative Suite for design team.',
      merchant: 'Adobe Systems',
      receiptUrl: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NTIxNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      submittedAt: '2024-01-08T11:20:00'
    },
    {
      id: 5,
      title: 'Team Building Event',
      amount: 185.75,
      employee: { name: 'John Smith', avatar: 'JS', department: 'HR' },
      date: '2024-01-05',
      category: 'Office',
      status: 'rejected',
      description: 'Team building activities and catering for quarterly team event.',
      merchant: 'EventSpace Solutions',
      receiptUrl: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NTIxNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      submittedAt: '2024-01-05T16:00:00',
      rejectionReason: 'Exceeds quarterly team building budget'
    },
  ]);

  const handleApprove = async (id: number) => {
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, status: 'approved' }
        : expense
    ));
    setIsModalOpen(false);
  };

  const handleReject = async (id: number, reason: string) => {
    setExpenses(expenses.map(expense => 
      expense.id === id 
        ? { ...expense, status: 'rejected', rejectionReason: reason }
        : expense
    ));
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesStatus = filterStatus === 'all' || expense.status === filterStatus;
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = expenses.filter(e => e.status === 'pending').length;
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Approval Dashboard</h1>
          <p className="text-[#6B7280] mt-1">Review and approve team expense reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className={`${
            user?.role === 'admin' 
              ? 'bg-gradient-to-r from-[#E53935] to-[#F44336]' 
              : 'bg-gradient-to-r from-[#1E88E5] to-[#42A5F5]'
          } text-white`}>
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} • {user?.name}
          </Badge>
          <div className="text-right">
            <p className="text-sm text-[#6B7280]">Pending Approvals</p>
            <p className="text-2xl font-bold text-[#174871]">{pendingCount}</p>
          </div>
          <Button variant="outline" className="border-white/30 hover:bg-white/20">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Total Amount</p>
                <p className="text-2xl font-bold text-[#0F2D4D]">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-[#174871] to-[#1E88E5]">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-3d border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Pending Reviews</p>
                <p className="text-2xl font-bold text-[#0F2D4D]">{pendingCount}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-[#A77693] to-[#E91E63]">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-3d border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280]">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-[#0F2D4D]">2.3 days</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-[#43A047] to-[#66BB6A]">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-3d border-0">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <Input
                  placeholder="Search expenses or employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#6B7280]" />
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-[#174871]' : 'border-white/30'}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
                className={filterStatus === 'pending' ? 'bg-[#174871]' : 'border-white/30'}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('approved')}
                className={filterStatus === 'approved' ? 'bg-[#174871]' : 'border-white/30'}
              >
                Approved
              </Button>
              <Button
                variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('rejected')}
                className={filterStatus === 'rejected' ? 'bg-[#174871]' : 'border-white/30'}
              >
                Rejected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card className="card-3d border-0">
        <CardHeader>
          <CardTitle>Expense Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Expense</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-white/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-br from-[#174871] to-[#1E88E5] text-white text-xs">
                            {expense.employee.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#0F2D4D]">{expense.employee.name}</p>
                          <p className="text-sm text-[#6B7280]">{expense.employee.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#0F2D4D]">{expense.title}</p>
                        <p className="text-sm text-[#6B7280]">{expense.merchant}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-[#174871]">${expense.amount.toFixed(2)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-[#0F2D4D]">{expense.date}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-[#DED1C6] text-[#0F2D4D]">
                        {expense.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(expense.status)}>
                        {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog 
                          open={isModalOpen && selectedExpense?.id === expense.id} 
                          onOpenChange={(open) => {
                            setIsModalOpen(open);
                            if (open) setSelectedExpense(expense);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#174871]/10">
                              <Eye className="h-4 w-4 text-[#174871]" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Expense Details</DialogTitle>
                            </DialogHeader>
                            {selectedExpense && (
                              <ExpenseModal 
                                expense={selectedExpense}
                                onApprove={() => handleApprove(selectedExpense.id)}
                                onReject={(reason) => handleReject(selectedExpense.id, reason)}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                        {expense.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(expense.id)}
                              className="h-8 bg-[#43A047] hover:bg-[#388E3C] text-white"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedExpense(expense);
                                setIsModalOpen(true);
                              }}
                              className="h-8 border-[#E53935] text-[#E53935] hover:bg-[#E53935] hover:text-white"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Expense Detail Modal Component
const ExpenseModal: React.FC<{
  expense: any;
  onApprove: () => void;
  onReject: (reason: string) => void;
}> = ({ expense, onApprove, onReject }) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Expense Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Employee</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-gradient-to-br from-[#174871] to-[#1E88E5] text-white text-xs">
                {expense.employee.avatar}
              </AvatarFallback>
            </Avatar>
            <span>{expense.employee.name}</span>
          </div>
        </div>
        <div>
          <Label>Amount</Label>
          <p className="text-lg font-bold text-[#174871] mt-1">${expense.amount.toFixed(2)}</p>
        </div>
        <div>
          <Label>Date</Label>
          <p className="mt-1">{expense.date}</p>
        </div>
        <div>
          <Label>Category</Label>
          <p className="mt-1">{expense.category}</p>
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <p className="mt-1 text-[#6B7280]">{expense.description}</p>
      </div>

      {/* Receipt Preview */}
      <div>
        <Label>Receipt</Label>
        <div className="mt-2 border border-white/30 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={expense.receiptUrl}
            alt="Receipt"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Rejection Form */}
      {showRejectForm && (
        <div className="space-y-2">
          <Label htmlFor="rejection-reason">Rejection Reason</Label>
          <Textarea
            id="rejection-reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Please provide a reason for rejection..."
            className="bg-white/50 backdrop-blur-sm border-white/30"
          />
        </div>
      )}

      {/* Action Buttons */}
      {expense.status === 'pending' && (
        <div className="flex space-x-3">
          <Button
            onClick={onApprove}
            className="flex-1 bg-gradient-to-r from-[#43A047] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#43A047] text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          {!showRejectForm ? (
            <Button
              onClick={() => setShowRejectForm(true)}
              variant="outline"
              className="flex-1 border-[#E53935] text-[#E53935] hover:bg-[#E53935] hover:text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          ) : (
            <Button
              onClick={() => onReject(rejectionReason)}
              disabled={!rejectionReason.trim()}
              className="flex-1 bg-gradient-to-r from-[#E53935] to-[#F44336] hover:from-[#F44336] hover:to-[#E53935] text-white"
            >
              Confirm Rejection
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerView;