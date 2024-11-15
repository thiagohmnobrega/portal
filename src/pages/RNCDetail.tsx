import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Clock, 
  User, 
  AlertTriangle, 
  Edit, 
  MessageSquare,
  PlusCircle,
  RefreshCw,
  Users
} from 'lucide-react';
import type { RNC, RNCStatus, TimelineEvent } from '../types/rnc';

const statusOptions: { value: RNCStatus; label: string; color: string }[] = [
  { value: 'new', label: 'Novo', color: 'yellow' },
  { value: 'analyzing', label: 'Em Análise', color: 'blue' },
  { value: 'resolved', label: 'Resolvido', color: 'green' }
];

// Mock data - em produção, isso viria de uma API
const mockRNC: RNC = {
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
  contactPhone: '11999887766',
  timeline: [
    {
      id: '1',
      type: 'creation',
      description: 'RNC criada',
      createdAt: new Date('2024-03-10'),
      createdBy: 'João Silva'
    }
  ]
};

const getTimelineIcon = (type: string) => {
  switch (type) {
    case 'creation':
      return <PlusCircle className="w-4 h-4" />;
    case 'status_change':
      return <RefreshCw className="w-4 h-4" />;
    case 'edit':
      return <Edit className="w-4 h-4" />;
    case 'assignment':
      return <Users className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export default function RNCDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rnc, setRnc] = useState<RNC>(mockRNC);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/quality/rnc/${id}/edit`);
  };

  const handleStatusChange = (newStatus: RNCStatus) => {
    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'status_change' as const,
      description: `Status alterado para ${statusOptions.find(s => s.value === newStatus)?.label}`,
      createdAt: new Date(),
      createdBy: 'João Silva',
      metadata: {
        oldStatus: rnc.status,
        newStatus
      }
    };

    setRnc(prev => ({
      ...prev,
      status: newStatus,
      updatedAt: new Date(),
      timeline: [newEvent, ...prev.timeline]
    }));
    setIsStatusModalOpen(false);
  };

  const handleWhatsApp = () => {
    if (rnc.contactPhone) {
      const formattedPhone = rnc.contactPhone.replace(/\D/g, '');
      window.open(`https://wa.me/55${formattedPhone}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">RNC #{id}</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </button>
          <button
            onClick={() => setIsStatusModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Atualizar Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Detalhes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <p className="mt-1 text-gray-900">{rnc.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <p className="mt-1 text-gray-900">{rnc.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo</label>
                  <p className="mt-1 text-gray-900 capitalize">
                    {rnc.type === 'client' ? 'Cliente' : 'Fornecedor'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                  <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    rnc.priority === 'high' ? 'bg-red-100 text-red-800' :
                    rnc.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {rnc.priority === 'high' ? 'Alta' :
                     rnc.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Linha do Tempo</h2>
            <div className="space-y-6">
              {rnc.timeline.map((event) => (
                <div key={event.id} className="relative pl-8 pb-6 border-l-2 border-gray-200">
                  <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full flex items-center justify-center ${
                    event.type === 'status_change' ? 'bg-blue-500' :
                    event.type === 'edit' ? 'bg-yellow-500' :
                    event.type === 'creation' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}>
                    {getTimelineIcon(event.type)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    {new Date(event.createdAt).toLocaleString('pt-BR')}
                  </div>
                  <p className="text-gray-900">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-1">por {event.createdBy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Status Atual</span>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  rnc.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                  rnc.status === 'analyzing' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {statusOptions.find(s => s.value === rnc.status)?.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Responsável</span>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-900">{rnc.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contato</h2>
              {rnc.contactPhone && (
                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  WhatsApp
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <p className="mt-1 text-gray-900">{rnc.contactName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefone</label>
                <p className="mt-1 text-gray-900">{rnc.contactPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Atualização de Status */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Atualizar Status</h3>
            <div className="space-y-3">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border ${
                    rnc.status === option.value
                      ? `bg-${option.color}-50 border-${option.color}-200`
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}