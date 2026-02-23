import { useState } from 'react';
import { Sidebar, Header } from './components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

import { MOCK_STAGES, MOCK_JOBS } from './data/mockData';
import { PipelineView } from './components/PipelineView';

import { JobDashboardModal } from './components/JobDashboard';

function App() {
    const [activeTab, setActiveTab] = useState('pipeline');
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [selectedJob, setSelectedJob] = useState(null);

    const filteredJobs = jobs.filter(job =>
        job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.trade.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdateJob = (updatedJob) => {
        setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
        setSelectedJob(updatedJob);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex text-gray-900">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 ml-20 md:ml-24 flex flex-col min-h-screen">
                <Header onSearch={setSearchQuery} />

                <div className="flex-1 p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {activeTab === 'pipeline' && (
                                <div className="h-full flex flex-col">
                                    <h1 className="text-3xl font-title font-bold mb-6 tracking-tight uppercase">CRM Pipeline</h1>
                                    <PipelineView
                                        stages={MOCK_STAGES}
                                        jobs={filteredJobs}
                                        onJobClick={setSelectedJob}
                                    />
                                </div>
                            )}

                            {activeTab !== 'pipeline' && (
                                <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-400">
                                    <h2 className="text-3xl font-title font-bold mb-2 tracking-widest uppercase">{activeTab} View</h2>
                                    <p className="font-body opacity-60">This module is part of the future development roadmap.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {selectedJob && (
                        <JobDashboardModal
                            job={selectedJob}
                            onClose={() => setSelectedJob(null)}
                            onUpdateJob={handleUpdateJob}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
