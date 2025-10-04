import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Upload,
  FileText,
  DollarSign,
  Calendar,
  Receipt,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Scan,
  Plus,
  Shield
} from 'lucide-react';
import { useUser } from './UserContext';

const EmployeeView: React.FC = () => {
  const { user, hasPermission } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    description: '',
    merchant: '',
  });

  // Check permissions
  if (!hasPermission('submit_expenses') && !hasPermission('view_all_expenses')) {
    return (
      <div className="p-6">
        <Card className="card-3d border-0">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto text-[#6B7280] mb-4" />
            <h3>Access Denied</h3>
            <p className="text-[#6B7280]">You don't have permission to access expense management.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [expenses] = useState([
    { 
      id: 1, 
      title: 'Client Lunch', 
      amount: '$127.50', 
      category: 'Meals', 
      date: '2024-01-15', 
      status: 'pending',
      progress: 50
    },
    { 
      id: 2, 
      title: 'Software License', 
      amount: '$299.00', 
      category: 'Software', 
      date: '2024-01-12', 
      status: 'approved',
      progress: 100
    },
    { 
      id: 3, 
      title: 'Conference Ticket', 
      amount: '$450.00', 
      category: 'Travel', 
      date: '2024-01-10', 
      status: 'pending',
      progress: 25
    },
    { 
      id: 4, 
      title: 'Office Supplies', 
      amount: '$85.75', 
      category: 'Office', 
      date: '2024-01-08', 
      status: 'rejected',
      progress: 100
    },
    { 
      id: 5, 
      title: 'Taxi Fare', 
      amount: '$45.20', 
      category: 'Travel', 
      date: '2024-01-05', 
      status: 'approved',
      progress: 100
    },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate OCR scanning
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        // Simulate OCR results
        setFormData({
          ...formData,
          merchant: 'Restaurant ABC',
          amount: '127.50',
          date: '2024-01-15',
        });
      }, 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
        merchant: '',
      });
      setSelectedFile(null);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-gradient-to-r from-green-400 to-green-600';
      case 'rejected': return 'bg-gradient-to-r from-red-400 to-red-600';
      default: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>{hasPermission('view_all_expenses') ? 'All Expenses' : 'My Expenses'}</h1>
          <p className="text-[#6B7280] mt-1">
            {hasPermission('view_all_expenses') 
              ? 'View and manage all company expenses' 
              : 'Submit and track your expense reports'
            }
          </p>
        </div>
        <Badge className={`${
          user?.role === 'admin' 
            ? 'bg-gradient-to-r from-[#E53935] to-[#F44336]' 
            : user?.role === 'manager'
            ? 'bg-gradient-to-r from-[#1E88E5] to-[#42A5F5]'
            : 'bg-gradient-to-r from-[#43A047] to-[#66BB6A]'
        } text-white`}>
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} • {user?.name}
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Expense Submission Form */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-[#174871]" />
              New Expense Report
            </CardTitle>
            <p className="text-sm text-[#6B7280] mt-1">Submit a new expense for approval</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Receipt Upload */}
              <div className="space-y-2">
                <Label>Receipt Upload (OCR)</Label>
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-[#174871] transition-colors">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <Receipt className="w-12 h-12 mx-auto text-[#43A047]" />
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      {isScanning && (
                        <div className="space-y-2">
                          <div className="animate-shimmer h-1 bg-gradient-to-r from-[#174871] to-[#1E88E5] rounded"></div>
                          <p className="text-xs text-[#6B7280] flex items-center justify-center">
                            <Scan className="w-4 h-4 mr-1 animate-pulse" />
                            Scanning receipt...
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 mx-auto text-[#6B7280]" />
                      <p className="text-sm">Click to upload or drag and drop</p>
                      <p className="text-xs text-[#6B7280]">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Expense Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Brief description"
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="meals">Meals & Entertainment</SelectItem>
                      <SelectItem value="office">Office Supplies</SelectItem>
                      <SelectItem value="software">Software & Tools</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant/Vendor</Label>
                <Input
                  id="merchant"
                  value={formData.merchant}
                  onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                  placeholder="Where was this expense incurred?"
                  className="bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this expense..."
                  className="bg-white/50 backdrop-blur-sm border-white/30 min-h-[80px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#174871] to-[#1E88E5] hover:from-[#1E88E5] hover:to-[#174871] text-white shadow-lg glow-effect"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Submit for Approval
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/30 hover:bg-white/20"
                >
                  Save Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Expense History */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#174871]" />
              Expense History
            </CardTitle>
            <p className="text-sm text-[#6B7280] mt-1">Track the status of your submitted expenses</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <Card key={expense.id} className="p-4 border border-white/30 bg-white/30 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(expense.status)}
                        <div>
                          <p className="font-medium text-[#0F2D4D]">{expense.title}</p>
                          <p className="text-sm text-[#6B7280]">{expense.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#174871]">{expense.amount}</p>
                        <Badge className={getStatusColor(expense.status)}>
                          {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6B7280]">
                          {expense.status === 'pending' ? 'Processing' : 
                           expense.status === 'approved' ? 'Completed' : 'Closed'}
                        </span>
                        <span className="text-[#6B7280]">{expense.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(expense.status)}`}
                          style={{ width: `${expense.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Steps */}
                    <div className="flex items-center justify-between text-xs text-[#6B7280]">
                      <span className={expense.progress >= 25 ? 'text-[#174871] font-medium' : ''}>
                        Submitted
                      </span>
                      <span className={expense.progress >= 50 ? 'text-[#174871] font-medium' : ''}>
                        Under Review
                      </span>
                      <span className={expense.progress >= 75 ? 'text-[#174871] font-medium' : ''}>
                        Manager Review
                      </span>
                      <span className={expense.progress >= 100 ? 'text-[#174871] font-medium' : ''}>
                        {expense.status === 'approved' ? 'Approved' : expense.status === 'rejected' ? 'Rejected' : 'Final'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-[#6B7280]">{expense.category}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-[#174871] hover:bg-[#174871]/10">
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeView;