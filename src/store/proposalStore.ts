import { create } from 'zustand';
import { Proposal, Vote, Comment } from '../types/proposal';
import { mockProposals } from '../mockData';

interface ProposalStore {
  proposals: Proposal[];
  votes: Vote[];
  comments: Comment[];
  addProposal: (proposal: Proposal) => void;
  addVote: (vote: Vote) => void;
  addComment: (comment: Comment) => void;
  getProposalById: (id: string) => Proposal | undefined;
  getProposalVotes: (proposalId: string) => Vote[];
  getProposalComments: (proposalId: string) => Comment[];
}

export const useProposalStore = create<ProposalStore>((set, get) => ({
  proposals: mockProposals,
  votes: [],
  comments: [],
  
  addProposal: (proposal) => 
    set((state) => ({ proposals: [...state.proposals, proposal] })),
  
  addVote: (vote) =>
    set((state) => ({ votes: [...state.votes, vote] })),
  
  addComment: (comment) =>
    set((state) => ({ comments: [...state.comments, comment] })),
  
  getProposalById: (id) => 
    get().proposals.find((p) => p.id === id),
  
  getProposalVotes: (proposalId) =>
    get().votes.filter((v) => v.proposalId === proposalId),
  
  getProposalComments: (proposalId) =>
    get().comments.filter((c) => c.proposalId === proposalId),
}));