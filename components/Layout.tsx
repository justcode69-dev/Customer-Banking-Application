import React, { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowRightLeft, 
  TrendingUp, 
  User, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  userName: string;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-6 py-3.5 mb-1 transition-colors duration-200 ${
      active 
        ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-500 font-medium' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} className={`mr-3 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
    <span>{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, onLogout, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems: { view: ViewState; label: string; icon: any }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'transactions', label: 'Transactions', icon: ArrowRightLeft },
    { view: 'payments', label: 'Payments & Transfers', icon: CreditCard },
    { view: 'investments', label: 'Investments & Loans', icon: TrendingUp },
    { view: 'account', label: 'Account Services', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-10">
        <div className="p-6 border-b border-slate-100 flex items-center">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-lg font-bold text-slate-800">Customer Banking Application</span>
        </div>
        
        <nav className="flex-1 py-6">
          {navItems.map((item) => (
            <NavItem
              key={item.view}
              icon={item.icon}
              label={item.label}
              active={currentView === item.view}
              onClick={() => onNavigate(item.view)}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center p-3 mb-3 bg-slate-50 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mr-3">
              {userName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{userName}</p>
              <p className="text-xs text-slate-500">Premium Member</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-white z-20 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
         <div className="flex items-center">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-lg font-bold text-slate-800">Customer Banking</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-white pt-20">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.view}
                icon={item.icon}
                label={item.label}
                active={currentView === item.view}
                onClick={() => {
                  onNavigate(item.view);
                  setIsMobileMenuOpen(false);
                }}
              />
            ))}
             <button 
              onClick={onLogout}
              className="flex items-center w-full px-6 py-4 text-red-600 hover:bg-red-50 font-medium"
            >
              <LogOut size={20} className="mr-3" />
              Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {currentView.replace('-', ' ')}
            </h1>
            <p className="text-slate-500">Welcome back, {userName}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;