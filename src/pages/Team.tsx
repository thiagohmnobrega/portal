import React from 'react';
import { Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Quality Manager',
    email: 'john.doe@company.com',
    phone: '+1 234 567 890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  // Add more team members as needed
];

export default function Team() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quality Team</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 rounded-full"
                  src={member.avatar}
                  alt={member.name}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
              <div className="flex space-x-4">
                <button className="flex-1 text-sm text-gray-700 hover:text-gray-900">
                  View Profile
                </button>
                <button className="flex-1 text-sm text-gray-700 hover:text-gray-900">
                  Assigned RNCs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}