// Simple ApprovalRulesConfig component without external dependencies
const ApprovalRulesConfig = () => {
  // Mock user context
  const hasPermission = (permission: string) => permission === 'configure_approval_rules';
  
  // Mock approval rules
  const approvalRules = [
    {
      id: '1',
      name: 'Standard Approval',
      type: 'percentage',
      percentageThreshold: 60,
      amountThreshold: 1000,
      isActive: true,
      priority: 1,
    },
    {
      id: '2',
      name: 'CFO Override',
      type: 'specific',
      specificApprovers: ['cfo@company.com'],
      amountThreshold: 5000,
      isActive: true,
      priority: 2,
    },
    {
      id: '3',
      name: 'High Value Hybrid',
      type: 'hybrid',
      percentageThreshold: 75,
      specificApprovers: ['cfo@company.com', 'ceo@company.com'],
      amountThreshold: 10000,
      isActive: true,
      priority: 3,
    },
  ];

  if (!hasPermission('configure_approval_rules')) {
    return `
      <div class="card-3d border-0 bg-white rounded-lg shadow-lg">
        <div class="p-8 text-center">
          <div class="w-12 h-12 mx-auto text-gray-500 mb-4">⚙️</div>
          <h3>Access Denied</h3>
          <p class="text-gray-500">You don't have permission to configure approval rules.</p>
        </div>
      </div>
    `;
  }

  const getRuleTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'specific':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'hybrid':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return `
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
              ${approvalRules.map((rule) => `
                <tr class="border-b hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    ${rule.name}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRuleTypeBadgeColor(rule.type)}">
                      ${rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    ${rule.type === 'percentage' && rule.percentageThreshold && (
                      `${rule.percentageThreshold}% / $${rule.amountThreshold}`
                    )}
                    ${rule.type === 'specific' && (
                      `$${rule.amountThreshold}`
                    )}
                    ${rule.type === 'hybrid' && (
                      `${rule.percentageThreshold}% / $${rule.amountThreshold}`
                    )}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">${rule.priority}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                      ${rule.isActive ? 'Active' : 'Inactive'}
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
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};

export default ApprovalRulesConfig;