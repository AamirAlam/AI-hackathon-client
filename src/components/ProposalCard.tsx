import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Proposal } from '../types/proposal';
import { motion } from 'framer-motion';
import { ChartBarIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

interface ProposalCardProps {
  proposal: Proposal;
  index: number;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, index }) => {
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/proposals/${proposal.id}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:border-primary-200">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                {proposal.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                proposal.status === 'active' ? 'bg-green-100 text-green-800' :
                proposal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </span>
            </div>

            <p className="text-gray-600 line-clamp-2 text-sm">{proposal.description}</p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <UserIcon className="h-4 w-4" />
              <span>{proposal.creator.slice(0, 6)}...{proposal.creator.slice(-4)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ChartBarIcon className="h-4 w-4" />
                  Votes: {totalVotes}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {format(proposal.endDate, 'MMM d, yyyy')}
                </span>
              </div>

              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                  style={{ width: `${forPercentage}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                <div>For: {proposal.votesFor}</div>
                <div className="text-center">Against: {proposal.votesAgainst}</div>
                <div className="text-right">Abstain: {proposal.votesAbstain}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};