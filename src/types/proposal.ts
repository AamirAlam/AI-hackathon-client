export interface Proposal {
  id: string;
  title: string;
  description: string;
  creator: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  requiredFunding?: number;
  attachments?: string[];
  quorum: number;
}

export interface Vote {
  proposalId: string;
  voter: string;
  voteType: 'for' | 'against' | 'abstain';
  timestamp: Date;
}

export interface Comment {
  id: string;
  proposalId: string;
  author: string;
  content: string;
  timestamp: Date;
}