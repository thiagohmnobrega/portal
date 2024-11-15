import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RNC } from '../types/rnc';

const mockRNCs: RNC[] = [
  {
    id: '1',
    type: 'client',
    status: 'new',
    title: 'Problema de Qualidade - Lote A123',
    description: 'Cliente reportou defeitos no último envio',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    priority: 'high',
    assignedTo: 'João Silva',
    contactName: 'Maria Santos',
    contactPhone: '11999887766'
  }
];

const statusLabels = {
  new: 'Novo',
  analyzing: 'Em Análise',
  resolved: 'Resolvido'
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
};

export default function RNCList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Registro de Não Conformidade</h1>
        <Link 
          to="/quality/rnc/new" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova RNC
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar RNCs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockRNCs.map((rnc) => (
              <tr key={rnc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{rnc.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Link to={`/quality/rnc/${rnc.id}`} className="hover:text-blue-600">
                    {rnc.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {rnc.type === 'client' ? 'Cliente' : 'Fornecedor'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${rnc.status === 'new' ? 'bg-yellow-100 text-yellow-800' : 
                      rnc.status === 'analyzing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {statusLabels[rnc.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${rnc.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      rnc.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {priorityLabels[rnc.priority]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rnc.assignedTo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rnc.contactName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Link 
                    to={`/quality/rnc/${rnc.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}