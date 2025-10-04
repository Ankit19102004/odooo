// Mock UI Components
const Card = ({ children, className, ...props }: any) => (
  <div className={`card-3d border-0 ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }: any) => (
  <div className={`p-6 ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }: any) => (
  <div className={`flex flex-row items-center justify-between p-6 pb-0 ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }: any) => (
  <h3 className={`text-lg font-semibold ${className || ''}`} {...props}>
    {children}
  </h3>
);

const Button = ({ children, className, onClick, variant, size, ...props }: any) => (
  <button 
    className={`px-4 py-2 rounded-md font-medium transition-colors ${className || ''}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }: any) => (
  <input 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className, ...props }: any) => (
  <label 
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className || ''}`}
    {...props}
  >
    {children}
  </label>
);

const Badge = ({ children, className, variant, ...props }: any) => (
  <span 
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className || ''}`}
    {...props}
  >
    {children}
  </span>
);

const Select = ({ children, value, onValueChange, ...props }: any) => (
  <select 
    value={value}
    onChange={(e) => onValueChange?.(e.target.value)}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  >
    {children}
  </select>
);

const SelectContent = ({ children }: any) => <>{children}</>;
const SelectItem = ({ children, value, ...props }: any) => (
  <option value={value} {...props}>{children}</option>
);
const SelectTrigger = ({ children, className, ...props }: any) => (
  <div className={className} {...props}>{children}</div>
);
const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>;

const Table = ({ children }: any) => (
  <table className="w-full border-collapse">
    {children}
  </table>
);

const TableHeader = ({ children }: any) => (
  <thead className="bg-gray-50">
    {children}
  </thead>
);

const TableBody = ({ children }: any) => (
  <tbody>
    {children}
  </tbody>
);

const TableRow = ({ children, className, ...props }: any) => (
  <tr className={`border-b ${className || ''}`} {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, className, ...props }: any) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ''}`} {...props}>
    {children}
  </th>
);

const TableCell = ({ children, className, ...props }: any) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className || ''}`} {...props}>
    {children}
  </td>
);

const Dialog = ({ children, open, onOpenChange }: any) => (
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  ) : null
);

const DialogContent = ({ children, className, ...props }: any) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ children }: any) => (
  <div className="mb-4">
    {children}
  </div>
);

const DialogTitle = ({ children }: any) => (
  <h2 className="text-lg font-semibold">
    {children}
  </h2>
);

const DialogTrigger = ({ children, asChild, onClick }: any) => (
  <div onClick={onClick}>
    {children}
  </div>
);

// Mock Lucide React icons
const Users = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const Edit = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Trash2 = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Shield = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UserPlus = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Settings = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Plus = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Save = ({ className, ...props }: any) => (
  <svg className={className} {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

// Mock React hooks
const useState = (initial: any) => {
  let state = initial;
  const setState = (newState: any) => {
    state = typeof newState === 'function' ? newState(state) : newState;
  };
  return [state, setState];
};

const createContext = (defaultValue: any) => ({
  Provider: ({ children, value }: any) => children,
  Consumer: ({ children }: any) => children(defaultValue)
});

const useContext = (context: any) => defaultValue;

// Mock JSX
const createElement = (type: any, props: any, ...children: any[]) => {
  if (typeof type === 'string') {
    const element = document.createElement(type);
    if (props) {
      Object.keys(props).forEach(key => {
        if (key === 'className') {
          element.className = props[key];
        } else if (key.startsWith('on')) {
          element.addEventListener(key.slice(2).toLowerCase(), props[key]);
        } else {
          element.setAttribute(key, props[key]);
        }
      });
    }
    children.forEach(child => {
      if (typeof child === 'string') {
        element.textContent = child;
      } else if (child) {
        element.appendChild(child);
      }
    });
    return element;
  }
  return type(props, ...children);
};

// Global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Mock React
const React = {
  createElement,
  useState,
  createContext,
  useContext,
  FC: (fn: any) => fn
};

export default React;

// Export all components
export {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Users,
  Edit,
  Trash2,
  Shield,
  UserPlus,
  Settings,
  Plus,
  Save,
  useState,
  createContext,
  useContext,
  createElement
};
