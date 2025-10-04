import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [selectedExpense, setSelectedExpense] = useState<number | null>(null);

  // Mock data
  const metrics = [
    {
      title: 'Total Expenses',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-[#174871] to-[#1E88E5]',
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
      color: 'from-[#A77693] to-[#E91E63]',
    },
    {
      title: 'Approved This Month',
      value: '156',
      change: '+8.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-[#43A047] to-[#66BB6A]',
    },
    {
      title: 'Processing Time',
      value: '2.3 days',
      change: '-15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-[#1E88E5] to-[#42A5F5]',
    },
  ];

  const lineChartData = [
    { name: 'Jan', expenses: 4000, approved: 3500 },
    { name: 'Feb', expenses: 3000, approved: 2800 },
    { name: 'Mar', expenses: 5000, approved: 4500 },
    { name: 'Apr', expenses: 4500, approved: 4200 },
    { name: 'May', expenses: 6000, approved: 5800 },
    { name: 'Jun', expenses: 5500, approved: 5300 },
  ];

  const pieChartData = [
    { name: 'Travel', value: 35, color: '#174871' },
    { name: 'Meals', value: 25, color: '#1E88E5' },
    { name: 'Office Supplies', value: 20, color: '#A77693' },
    { name: 'Software', value: 15, color: '#43A047' },
    { name: 'Other', value: 5, color: '#E53935' },
  ];

  const kanbanData = {
    draft: [
      { id: 1, title: 'Hotel Booking - NYC', amount: '$850', employee: 'Sarah Chen', date: '2024-01-15' },
      { id: 2, title: 'Software License', amount: '$299', employee: 'Mike Johnson', date: '2024-01-14' },
    ],
    pending: [
      { id: 3, title: 'Client Dinner', amount: '$127', employee: 'Alex Rodriguez', date: '2024-01-13' },
      { id: 4, title: 'Conference Ticket', amount: '$450', employee: 'Emily Davis', date: '2024-01-12' },
      { id: 5, title: 'Taxi Fare', amount: '$45', employee: 'John Smith', date: '2024-01-11' },
    ],
    approved: [
      { id: 6, title: 'Office Supplies', amount: '$180', employee: 'Lisa Wang', date: '2024-01-10' },
      { id: 7, title: 'Team Lunch', amount: '$95', employee: 'David Brown', date: '2024-01-09' },
    ],
    rejected: [
      { id: 8, title: 'Personal Item', amount: '$75', employee: 'Tom Wilson', date: '2024-01-08' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getColumnTitle = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Expense Dashboard</h1>
          <p className="text-[#6B7280] mt-1">Monitor and manage your expense workflow</p>
        </div>
        <Button className="bg-gradient-to-r from-[#174871] to-[#1E88E5] hover:from-[#1E88E5] hover:to-[#174871] text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          New Expense
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="card-3d border-0 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-[#0F2D4D]">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 mr-1 ${metric.trend === 'up' ? 'text-[#43A047]' : 'text-[#E53935]'}`} />
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-[#43A047]' : 'text-[#E53935]'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-br ${metric.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle>Expense Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(249, 250, 251, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#174871" 
                  strokeWidth={3}
                  dot={{ fill: '#174871', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  stroke="#43A047" 
                  strokeWidth={3}
                  dot={{ fill: '#43A047', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="card-3d border-0">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <Card className="card-3d border-0">
        <CardHeader>
          <CardTitle>Expense Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(kanbanData).map(([status, expenses]) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#0F2D4D]">{getColumnTitle(status)}</h3>
                  <Badge variant="secondary" className={getStatusColor(status)}>
                    {expenses.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <Card 
                      key={expense.id} 
                      className="p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-white/30 bg-white/50 backdrop-blur-sm"
                      onClick={() => setSelectedExpense(expense.id)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-[#0F2D4D]">{expense.title}</p>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-lg font-bold text-[#174871]">{expense.amount}</p>
                        <div className="space-y-1">
                          <p className="text-xs text-[#6B7280]">{expense.employee}</p>
                          <p className="text-xs text-[#6B7280]">{expense.date}</p>
                        </div>
                        {status === 'pending' && (
                          <div className="flex space-x-2 pt-2">
                            <Button size="sm" className="h-7 bg-[#43A047] hover:bg-[#388E3C] text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 border-[#E53935] text-[#E53935] hover:bg-[#E53935] hover:text-white">
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;