import React, { useState } from 'react';
import { ProposalCard } from './ProposalCard';
import { useProposalStore } from '../store/proposalStore';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const ProposalList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const proposals = useProposalStore((state) => state.proposals);
  
  const filteredProposals = proposals.filter((proposal) => {
    const matchesFilter = filter === 'all' || proposal.status === filter;
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterButtons = ['all', 'active', 'completed', 'rejected'] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row gap-6 justify-between">
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === status
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white/80 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search proposals..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProposals.map((proposal, index) => (
          <ProposalCard key={proposal.id} proposal={proposal} index={index} />
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No proposals found matching your criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};