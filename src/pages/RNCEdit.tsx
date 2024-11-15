import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, AlertTriangle, MessageSquare } from 'lucide-react';
import type { RNC, RNCStatus, RNCType } from '../types/rnc';
import { createTimelineEvent } from '../utils/timeline';

const statusOptions: { value: RNCStatus; label: string; }[] = [
  { value: 'new', label: 'Novo' },
  { value: 'analyzing', label: 'Em Análise' },
  { value: 'resolved', label: 'Resolvido' }
];

const typeOptions: { value: RNCType; label: string; }[] = [
  { value: 'client', label: 'Cliente' },
  { value: 'supplier', label: 'Fornecedor' }
];

const priorityOptions = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' }
];

// Mock data para simular dados existentes
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
  timeline: []
};

export default function RNCEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<RNC>>(
    id === 'new' ? {
      title: '',
      description: '',
      type: 'client',
      status: 'new',
      priority: 'medium',
      assignedTo: '',
      collectionDate: undefined,
      contactName: '',
      contactPhone: '',
      timeline: []
    } : mockRNC
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const timelineEvent = createTimelineEvent(
      id === 'new' ? 'creation' : 'edit',
      id === 'new' ? 'RNC criada' : 'RNC atualizada',
      'João Silva',
      { formData }
    );

    const updatedRNC = {
      ...formData,
      updatedAt: new Date(),
      timeline: [timelineEvent, ...(formData.timeline || [])]
    };

    // Aqui você enviaria para a API
    console.log('RNC atualizada:', updatedRNC);
    
    navigate(`/quality/rnc/${id}`);
  };

  const handleCancel = () => {
    navigate(`/quality/rnc/${id}`);
  };

  const handleWhatsApp = () => {
    if (formData.contactPhone) {
      const formattedPhone = formData.contactPhone.replace(/\D/g, '');
      window.open(`https://wa.me/55${formattedPhone}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {id === 'new' ? 'Nova RNC' : `Editar RNC #${id}`}
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Informações Básicas</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as RNCType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Informações de Contato</h2>
            {formData.contactPhone && (
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Iniciar Conversa
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Contato
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone/WhatsApp
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="(11) 99999-9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Status e Atribuição</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as RNCStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsável
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um responsável</option>
                <option value="João Silva">João Silva</option>
                <option value="Maria Santos">Maria Santos</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}