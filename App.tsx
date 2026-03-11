import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Payments from './components/Payments';
import Investments from './components/Investments';
import AccountDetails from './components/AccountDetails';
import SupportChat from './components/SupportChat';
import { ViewState } from './types';
import { MOCK_USER, MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            accounts={MOCK_ACCOUNTS} 
            recentTransactions={MOCK_TRANSACTIONS} 
            onQuickAction={(action) => setCurrentView(action as ViewState)}
          />
        );
      case 'transactions':
        return <Transactions transactions={MOCK_TRANSACTIONS} />;
      case 'payments':
        return <Payments />;
      case 'investments':
        return <Investments />;
      case 'account':
        return <AccountDetails account={MOCK_ACCOUNTS[0]} />;
      default:
        return <Dashboard 
          accounts={MOCK_ACCOUNTS} 
          recentTransactions={MOCK_TRANSACTIONS}
          onQuickAction={(action) => setCurrentView(action as ViewState)}
        />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      onLogout={handleLogout}
      userName={MOCK_USER.name}
    >
      {renderView()}
      <SupportChat />
    </Layout>
  );
};

export default App;