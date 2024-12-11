import { Proposal } from './types/proposal';

export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Implement Community Rewards Program',
    description: 'Create a rewards program to incentivize active participation in the DAO governance process.',
    creator: '0x1234567890123456789012345678901234567890',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-01-01'),
    status: 'active',
    votesFor: 150,
    votesAgainst: 50,
    votesAbstain: 20,
    requiredFunding: 50000,
    quorum: 200
  },
  {
    id: '2',
    title: 'Treasury Diversification Proposal',
    description: 'Diversify the DAO treasury by allocating 20% to stable assets for long-term sustainability.',
    creator: '0x2345678901234567890123456789012345678901',
    startDate: new Date('2023-11-15'),
    endDate: new Date('2023-12-15'),
    status: 'completed',
    votesFor: 300,
    votesAgainst: 100,
    votesAbstain: 50,
    requiredFunding: 100000,
    quorum: 400
  },
  {
    id: '3',
    title: 'Governance Framework Update',
    description: 'Update the voting mechanism to include quadratic voting for more democratic decision-making.',
    creator: '0x3456789012345678901234567890123456789012',
    startDate: new Date('2023-12-10'),
    endDate: new Date('2024-01-10'),
    status: 'active',
    votesFor: 80,
    votesAgainst: 120,
    votesAbstain: 30,
    quorum: 300
  }
];