import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { format } from 'date-fns';
import { useProposalStore } from '../store/proposalStore';
import { CommentSection } from './CommentSection';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  UserIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline';

export const ProposalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  
  const [selectedVote, setSelectedVote] = useState<'for' | 'against' | 'abstain' | null>(null);
  
  const proposal = useProposalStore((state) => state.getProposalById(id!));
  const addVote = useProposalStore((state) => state.addVote);
  
  if (!proposal) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Proposal not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Return to proposals
        </button>
      </div>
    );
  }

  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
  const abstainPercentage = totalVotes > 0 ? (proposal.votesAbstain / totalVotes) * 100 : 0;

  const handleVote = (voteType: 'for' | 'against' | 'abstain') => {
    if (!isConnected || !address) {
      alert('Please connect your wallet to vote');
      return;
    }

    const vote = {
      proposalId: proposal.id,
      voter: address,
      voteType,
      timestamp: new Date(),
    };

    addVote(vote);
    setSelectedVote(voteType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{proposal.title}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              proposal.status === 'active' ? 'bg-green-100 text-green-800' :
              proposal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </span>
          </div>

          <div className="prose prose-blue max-w-none">
            <p>{proposal.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <UserIcon className="h-5 w-5" />
              <span>Created by: {proposal.creator.slice(0, 6)}...{proposal.creator.slice(-4)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="h-5 w-5" />
              <span>Start: {format(proposal.startDate, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="h-5 w-5" />
              <span>End: {format(proposal.endDate, 'MMM d, yyyy')}</span>
            </div>
            {proposal.requiredFunding && (
              <div className="flex items-center gap-2 text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span>Required Funding: {proposal.requiredFunding}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ChartBarIcon className="h-6 w-6 text-primary-600" />
              Voting Results
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-24">For</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${forPercentage}%` }}
                  />
                </div>
                <div className="w-20 text-right">{proposal.votesFor} votes</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-24">Against</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${againstPercentage}%` }}
                  />
                </div>
                <div className="w-20 text-right">{proposal.votesAgainst} votes</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-24">Abstain</div>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-500"
                    style={{ width: `${abstainPercentage}%` }}
                  />
                </div>
                <div className="w-20 text-right">{proposal.votesAbstain} votes</div>
              </div>
            </div>

            {proposal.status === 'active' && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleVote('for')}
                  disabled={selectedVote !== null}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                    selectedVote === 'for'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white hover:bg-green-50 text-gray-900 hover:text-green-700'
                  } border border-gray-200 transition-colors duration-200`}
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Vote For
                </button>
                
                <button
                  onClick={() => handleVote('against')}
                  disabled={selectedVote !== null}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                    selectedVote === 'against'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-white hover:bg-red-50 text-gray-900 hover:text-red-700'
                  } border border-gray-200 transition-colors duration-200`}
                >
                  <XCircleIcon className="h-5 w-5" />
                  Vote Against
                </button>
                
                <button
                  onClick={() => handleVote('abstain')}
                  disabled={selectedVote !== null}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                    selectedVote === 'abstain'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-white hover:bg-gray-100 text-gray-900'
                  } border border-gray-200 transition-colors duration-200`}
                >
                  <MinusCircleIcon className="h-5 w-5" />
                  Abstain
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CommentSection proposalId={proposal.id} />
    </motion.div>
  );
};