import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Apps() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Portal GeHfer</h1>
            <div className="flex items-center space-x-4">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/quality"
            className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center"
          >
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <ClipboardList className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Qualidade</h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Gestão de não conformidades e controle de qualidade
            </p>
          </Link>
          {/* Adicione mais cards de aplicativos aqui */}
        </div>
      </main>
    </div>
  );
}