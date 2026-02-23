import { useState } from 'react';
import { Sidebar, Header } from './components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ListTodo } from 'lucide-react';

import { MOCK_STAGES, MOCK_JOBS } from './data/mockData';
import { PipelineView } from './components/PipelineView';
import { WorkflowView } from './components/WorkflowView';
import { NotificationsView } from './components/NotificationsView';
import { JobDashboardModal } from './components/JobDashboard';

function App() {
    const [activeTab, setActiveTab] = useState('pipeline');
    const [viewMode, setViewMode] = useState('board'); // 'board' or 'workflow'
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState(MOCK_JOBS);
    const [selectedJob, setSelectedJob] = useState(null);
    const [focusedWorkflowJob, setFocusedWorkflowJob] = useState(MOCK_JOBS[0]);

    const filteredJobs = jobs.filter(job =>
        job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.trade.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdateJob = (updatedJob) => {
        setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
        if (selectedJob?.id === updatedJob.id) setSelectedJob(updatedJob);
        if (focusedWorkflowJob?.id === updatedJob.id) setFocusedWorkflowJob(updatedJob);
    };

    const handleJobSelect = (job) => {
        if (viewMode === 'workflow') {
            setFocusedWorkflowJob(job);
        } else {
            setSelectedJob(job);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex text-gray-900">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 ml-20 md:ml-24 flex flex-col min-h-screen">
                <Header onSearch={setSearchQuery} />

                <div className="flex-1 p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeTab}-${viewMode}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full flex flex-col"
                        >
                            {activeTab === 'pipeline' && (
                                <>
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none">Job Pipeline</h1>
                                            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Building Quality that Lasts</p>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            {/* View Switcher */}
                                            <div className="bg-white p-1 rounded-2xl border border-gray-200 flex shadow-sm">
                                                <button
                                                    onClick={() => setViewMode('board')}
                                                    className={`px-5 py-2.5 rounded-xl font-title font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 transition-all ${viewMode === 'board' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    <LayoutGrid size={14} />
                                                    BOARD
                                                </button>
                                                <button
                                                    onClick={() => setViewMode('workflow')}
                                                    className={`px-5 py-2.5 rounded-xl font-title font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 transition-all ${viewMode === 'workflow' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                                                        }`}
                                                >
                                                    <ListTodo size={14} />
                                                    WORKFLOW
                                                </button>
                                            </div>

                                            <div className="bg-white p-1 rounded-2xl border border-gray-200 flex gap-1 shadow-sm h-[48px]">
                                                <div className="px-5 flex flex-col justify-center border-r border-gray-100">
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Leads</p>
                                                    <p className="text-lg font-title font-extrabold text-primary leading-none">{jobs.length}</p>
                                                </div>
                                                <div className="px-5 flex flex-col justify-center">
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Revenue</p>
                                                    <p className="text-lg font-title font-extrabold text-gray-900 leading-none">
                                                        ${jobs.reduce((acc, job) => acc + job.pricing.total, 0).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {viewMode === 'board' ? (
                                        <PipelineView
                                            stages={MOCK_STAGES}
                                            jobs={filteredJobs}
                                            onJobClick={handleJobSelect}
                                        />
                                    ) : (
                                        <div className="flex-1 flex gap-8 min-h-0">
                                            {/* Mini Sidebar for Job Selection in Workflow View */}
                                            <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2">
                                                {filteredJobs.map(j => (
                                                    <button
                                                        key={j.id}
                                                        onClick={() => setFocusedWorkflowJob(j)}
                                                        className={`p-6 rounded-[2rem] border text-left transition-all active:scale-[0.98] ${focusedWorkflowJob?.id === j.id
                                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                            : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                                                            }`}
                                                    >
                                                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${focusedWorkflowJob?.id === j.id ? 'text-white/70' : 'text-gray-400'
                                                            }`}>
                                                            {j.trade}
                                                        </p>
                                                        <p className="font-title font-bold text-lg leading-tight mb-2 uppercase tracking-tight">
                                                            {j.clientName}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${focusedWorkflowJob?.id === j.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                                                }`}>
                                                                {j.status.replace('-', ' ')}
                                                            </span>
                                                            <span className="text-xs font-title font-bold">${j.pricing.total.toLocaleString()}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex-1 min-h-0">
                                                <WorkflowView
                                                    job={focusedWorkflowJob}
                                                    stages={MOCK_STAGES}
                                                    onUpdateJob={handleUpdateJob}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === 'notifications' && (
                                <NotificationsView />
                            )}

                            {activeTab !== 'pipeline' && activeTab !== 'notifications' && (
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
