import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { useProposalStore } from '../store/proposalStore';
import { useNavigate } from 'react-router-dom';

export const ProposalForm: React.FC = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const addProposal = useProposalStore((state) => state.addProposal);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    requiredFunding: '',
    quorum: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    const proposal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      creator: address,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      status: 'active' as const,
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      requiredFunding: formData.requiredFunding ? Number(formData.requiredFunding) : undefined,
      quorum: Number(formData.quorum)
    };

    addProposal(proposal);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to submit a proposal</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="datetime-local"
            name="startDate"
            id="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="datetime-local"
            name="endDate"
            id="endDate"
            required
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="requiredFunding" className="block text-sm font-medium text-gray-700">
            Required Funding (optional)
          </label>
          <input
            type="number"
            name="requiredFunding"
            id="requiredFunding"
            value={formData.requiredFunding}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="quorum" className="block text-sm font-medium text-gray-700">
            Required Quorum
          </label>
          <input
            type="number"
            name="quorum"
            id="quorum"
            required
            value={formData.quorum}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Proposal
        </button>
      </div>
    </form>
  );
};