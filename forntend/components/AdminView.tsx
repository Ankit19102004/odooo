// Simple AdminView component without external dependencies
const AdminView = () => {
  // Mock user context
  const user = { name: 'Admin User', role: 'admin' };
  const hasPermission = (permission: string) => permission === 'manage_users';

  // Mock state
  let users = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      role: 'manager',
      department: 'Marketing',
      status: 'Active',
      avatar: 'SC',
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'employee',
      department: 'Engineering',
      status: 'Active',
      avatar: 'MJ',
    },
    {
      id: 3,
      name: 'Alex Rodriguez',
      email: 'alex@company.com',
      role: 'employee',
      department: 'Sales',
      status: 'Active',
      avatar: 'AR',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@company.com',
      role: 'manager',
      department: 'HR',
      status: 'Inactive',
      avatar: 'ED',
    },
    {
      id: 5,
      name: 'John Smith',
      email: 'john@company.com',
      role: 'employee',
      department: 'Finance',
      status: 'Active',
      avatar: 'JS',
    },
  ];

  let isUserDialogOpen = false;
  let newUser = {
    name: '',
    email: '',
    role: 'employee',
    department: '',
  };

  // Check permissions
  if (!hasPermission('manage_users')) {
    return `
      <div class="p-6">
        <div class="card-3d border-0">
          <div class="p-8 text-center">
            <div class="w-12 h-12 mx-auto text-gray-500 mb-4">🛡️</div>
            <h3>Access Denied</h3>
            <p class="text-gray-500">You don't have permission to access the admin panel.</p>
          </div>
        </div>
      </div>
    `;
  }

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role && newUser.department) {
      const userToAdd = {
        id: users.length + 1,
        ...newUser,
        status: 'Active',
        avatar: newUser.name.split(' ').map((n: string) => n[0]).join(''),
      };
      users.push(userToAdd);
      newUser = { name: '', email: '', role: 'employee', department: '' };
      isUserDialogOpen = false;
    }
  };

  const handleDeleteUser = (id: number) => {
    users = users.filter(user => user.id !== id);
  };

  const toggleUserStatus = (id: number) => {
    users = users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    );
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'manager':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'employee':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return `
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p class="text-gray-600 mt-1">Manage users and configure approval workflows</p>
        </div>
        <span class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm">
          Admin Access • ${user?.name}
        </span>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- User Management -->
        <div class="card-3d border-0 bg-white rounded-lg shadow-lg">
          <div class="flex flex-row items-center justify-between p-6 pb-0">
            <div>
              <h3 class="text-lg font-semibold flex items-center">
                <span class="w-5 h-5 mr-2 text-blue-600">👥</span>
                User Management
              </h3>
              <p class="text-sm text-gray-600 mt-1">Manage team members and permissions</p>
            </div>
            <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
              <span class="w-4 h-4 mr-2">➕</span>
              Add User
            </button>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${users.map((userItem) => `
                    <tr class="border-b hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center space-x-3">
                          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-sm font-medium">
                            ${userItem.avatar}
                          </div>
                          <div>
                            <p class="font-medium text-gray-900">${userItem.name}</p>
                            <p class="text-sm text-gray-600">${userItem.email}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(userItem.role)}">
                          ${userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">${userItem.department}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${userItem.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                          ${userItem.status}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center space-x-2">
                          <button class="h-8 w-8 p-0 hover:bg-blue-100 rounded-md flex items-center justify-center">
                            <span class="h-4 w-4 text-blue-600">🛡️</span>
                          </button>
                          <button class="h-8 w-8 p-0 hover:bg-purple-100 rounded-md flex items-center justify-center">
                            <span class="h-4 w-4 text-purple-600">✏️</span>
                          </button>
                          <button class="h-8 w-8 p-0 hover:bg-red-100 rounded-md flex items-center justify-center">
                            <span class="h-4 w-4 text-red-600">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Approval Rules Configuration -->
        <div class="card-3d border-0 bg-white rounded-lg shadow-lg">
          <div class="flex flex-row items-center justify-between p-6 pb-0">
            <div>
              <h3 class="text-lg font-semibold flex items-center">
                <span class="w-5 h-5 mr-2 text-blue-600">⚙️</span>
                Approval Rules Configuration
              </h3>
              <p class="text-sm text-gray-600 mt-1">Configure expense approval workflows</p>
            </div>
            <button class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
              <span class="w-4 h-4 mr-2">➕</span>
              Add Rule
            </button>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Standard Approval</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Percentage
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">60% / $1000</td>
                    <td class="px-6 py-4 whitespace-nowrap">1</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center space-x-2">
                        <button class="h-8 w-8 p-0 hover:bg-blue-100 rounded-md flex items-center justify-center">
                          <span class="h-4 w-4 text-blue-600">⚙️</span>
                        </button>
                        <button class="h-8 w-8 p-0 hover:bg-purple-100 rounded-md flex items-center justify-center">
                          <span class="h-4 w-4 text-purple-600">✏️</span>
                        </button>
                        <button class="h-8 w-8 p-0 hover:bg-red-100 rounded-md flex items-center justify-center">
                          <span class="h-4 w-4 text-red-600">🗑️</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default AdminView;