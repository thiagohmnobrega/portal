import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Gestão da Qualidade</h1>
            <div className="flex items-center space-x-4">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}