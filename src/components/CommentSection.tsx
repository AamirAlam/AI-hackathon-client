import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { format } from 'date-fns';
import { useProposalStore } from '../store/proposalStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface CommentSectionProps {
  proposalId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ proposalId }) => {
  const { address, isConnected } = useAccount();
  const [comment, setComment] = useState('');
  
  const comments = useProposalStore((state) => state.getProposalComments(proposalId));
  const addComment = useProposalStore((state) => state.addComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet to comment');
      return;
    }

    if (!comment.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      proposalId,
      author: address,
      content: comment.trim(),
      timestamp: new Date(),
    };

    addComment(newComment);
    setComment('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <ChatBubbleLeftIcon className="h-6 w-6 text-primary-600" />
        Comments
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={isConnected ? "Share your thoughts..." : "Please connect your wallet to comment"}
            disabled={!isConnected}
            className="w-full h-24 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {isConnected && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!comment.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Post Comment
              </button>
            </div>
          )}
        </div>
      </form>

      <AnimatePresence>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.author.slice(0, 6)}...{comment.author.slice(-4)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(comment.timestamp, 'MMM d, yyyy HH:mm')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};