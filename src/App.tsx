import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import { config } from "./config/wagmi";
import { ProposalList } from "./components/ProposalList";
import { ProposalForm } from "./components/ProposalForm";
import { ProposalDetail } from "./components/ProposalDetail";
import { WalletConnect } from "./components/WalletConnect";
import { motion } from "framer-motion";

function App() {
  return (
    <WagmiConfig config={config}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <motion.h1
                  className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to="/">AI-DAO Governance</Link>
                </motion.h1>
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Link
                      to="/create"
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Create Proposal
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <WalletConnect />
                  </motion.div>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<ProposalList />} />
              <Route path="/create" element={<ProposalForm />} />
              <Route path="/proposals/:id" element={<ProposalDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WagmiConfig>
  );
}

export default App;
