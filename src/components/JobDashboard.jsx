import { X, CheckCircle2, Circle, DollarSign, Camera, MessageSquare, Phone, ClipboardCheck, Info, Tag, Trash2, Edit, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CHECKLIST_DATA } from '../data/mockData';

export const JobDashboardModal = ({ job, onClose, onUpdateJob, onDeleteJob }) => {
    const [activeSubTab, setActiveSubTab] = useState('pricing');

    // Load template based on size and status if checklist is empty
    useEffect(() => {
        if (job && (!job.checklist || job.checklist.length === 0)) {
            const sizeData = CHECKLIST_DATA[job.jobSize || 'Large'];
            const stageTasks = sizeData?.[job.status] || [];
            if (stageTasks.length > 0) {
                onUpdateJob({ ...job, checklist: stageTasks });
            }
        }
    }, [job, onUpdateJob]);

    if (!job) return null;

    const toggleChecklistItem = (itemId) => {
        const updatedChecklist = job.checklist.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        onUpdateJob({ ...job, checklist: updatedChecklist });
    };

    const updateJobSize = (size) => {
        const sizeData = CHECKLIST_DATA[size];
        const stageTasks = sizeData?.[job.status] || [];
        onUpdateJob({ ...job, jobSize: size, checklist: stageTasks });
    };

    const assigneeColors = {
        Perry: 'bg-primary/10 text-primary border-primary/20',
        John: 'bg-blue-50 text-blue-600 border-blue-100',
        Assistant: 'bg-purple-50 text-purple-600 border-purple-100',
        Sales: 'bg-orange-50 text-orange-600 border-orange-100',
        General: 'bg-gray-100 text-gray-600 border-gray-200',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-sidebar/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-7xl h-full max-h-[900px] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative"
            >
                {/* Header - Expanded per JFC plan */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-4 rounded-2xl shadow-sm border border-primary/5">
                                <span className="text-2xl font-title font-bold text-primary uppercase leading-none tracking-widest">
                                    {job.trade[0]}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-title font-bold text-gray-900 leading-none mb-1 uppercase tracking-tight">
                                    {job.clientName}
                                </h2>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-body text-gray-400 font-medium">#{job.id.split('-')[1]} • {job.address}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{job.status.replace('-', ' ')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex bg-gray-200/50 p-1.5 rounded-2xl border border-gray-200/30 shadow-inner mr-4">
                                {['Small', 'Medium', 'Large'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => updateJobSize(size)}
                                        className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${job.jobSize === size
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => window.open(`tel:${job.phone}`)}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl font-title font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
                            >
                                <Phone size={18} className="text-primary" />
                                CALL
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete ${job.clientName}'s job permanently?`)) {
                                        onDeleteJob(job.id);
                                    }
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-100 rounded-2xl font-title font-bold text-red-600 hover:bg-red-100 transition-all active:scale-95 shadow-sm"
                            >
                                <Trash2 size={18} />
                                DELETE JOB
                            </button>
                            <button
                                onClick={onClose}
                                className="p-3 bg-white text-gray-400 border border-gray-200 rounded-2xl hover:text-primary transition-all active:rotate-90 hover:shadow-md ml-2"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Sub Header Information */}
                    <div className="grid grid-cols-4 gap-6 bg-white p-6 rounded-[2rem] border border-gray-200/50 shadow-sm">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Spouse Name</p>
                            <p className="font-title font-bold text-gray-900">{job.spouseName || '---'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Email Address</p>
                            <p className="font-body text-sm font-medium text-gray-900">{job.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Job Trade</p>
                            <p className="font-title font-bold text-primary">{job.trade}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Job Size</p>
                            <div className="flex items-center gap-1.5">
                                <Tag size={12} className="text-primary" />
                                <p className="font-title font-bold text-gray-900 uppercase">{job.jobSize}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Split Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Dynamic Checklist */}
                    <div className="w-1/2 border-r border-gray-100 flex flex-col bg-white">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-title font-bold text-gray-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <ClipboardCheck size={24} className="text-primary" />
                                    Job Flow Checklist
                                </h3>
                                <p className="text-xs font-body text-gray-400 font-bold uppercase tracking-tight">
                                    Optimized for <span className="text-primary">{job.jobSize} Workflow</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Completed</p>
                                <p className="text-xl font-title font-bold text-primary">
                                    {job.checklist?.filter(t => t.completed).length || 0}/{job.checklist?.length || 0}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-gray-50/5">
                            {!job.checklist || job.checklist.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 p-12">
                                    <Info size={64} className="mb-4" />
                                    <p className="font-title text-2xl uppercase tracking-widest">No tasks defined for this stage</p>
                                </div>
                            ) : (
                                job.checklist.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleChecklistItem(item.id)}
                                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left shadow-sm active:scale-[0.99] ${item.completed
                                            ? 'bg-green-50 border-green-100 text-green-700'
                                            : 'bg-white border-gray-100 text-gray-700 hover:border-primary/20 hover:shadow-md'
                                            }`}
                                    >
                                        {item.completed ? (
                                            <CheckCircle2 size={26} className="text-green-500 flex-shrink-0" />
                                        ) : (
                                            <Circle size={26} className="text-gray-200 flex-shrink-0 group-hover:text-primary transition-colors" />
                                        )}
                                        <div className="flex-1">
                                            <span className={`text-[15px] font-body tracking-normal ${item.completed ? 'opacity-60 line-through' : 'font-medium text-gray-900'}`}>
                                                {item.task}
                                            </span>
                                        </div>
                                        {item.assignee && (
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest leading-none ${assigneeColors[item.assignee] || assigneeColors.General}`}>
                                                {item.assignee}
                                            </span>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right: Tabs and Details */}
                    <div className="w-1/2 flex flex-col bg-gray-50/10">
                        {/* Tabs Header */}
                        <div className="flex border-b border-gray-100 bg-white shadow-sm z-10">
                            {[
                                { id: 'pricing', label: 'Pricing', icon: DollarSign },
                                { id: 'intake', label: 'Intake Form', icon: HelpCircle },
                                { id: 'photos', label: 'Photos', icon: Camera },
                                { id: 'activity', label: 'Activity Feed', icon: MessageSquare },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSubTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center justify-center py-6 border-b-4 transition-all gap-1.5 ${activeSubTab === tab.id
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <tab.icon size={22} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest font-title">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-10">
                            {activeSubTab === 'pricing' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest leading-none">Contract Total</p>
                                            <p className="text-4xl font-title font-bold text-gray-900 tracking-tight">
                                                ${job.pricing.total.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest leading-none">Final Balance</p>
                                            <p className="text-4xl font-title font-bold text-primary tracking-tight">
                                                ${job.pricing.balance.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-primary rounded-[2.5rem] p-10 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                                        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
                                        <div className="relative z-10 flex justify-between items-end">
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Collection Progress</p>
                                                <p className="text-5xl font-title font-bold tracking-tighter">
                                                    {Math.round((job.pricing.paid / job.pricing.total) * 100)}%
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Collected</p>
                                                <p className="text-2xl font-title font-bold tracking-tight">${job.pricing.paid.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="mt-8 relative z-10">
                                            <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 shadow-inner">
                                                <div
                                                    className="bg-white h-full transition-all duration-1000 shadow-lg"
                                                    style={{ width: `${(job.pricing.paid / job.pricing.total) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                        <p className="mt-6 text-[11px] font-bold uppercase tracking-widest opacity-70 text-center">
                                            Target: Final Payment of ${(job.pricing.balance).toLocaleString()} Required On Completion
                                        </p>
                                    </div>

                                    {/* Notes Section - New per plan */}
                                    <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                                        <h4 className="font-title font-bold text-gray-900 tracking-wider uppercase mb-4 flex items-center gap-2">
                                            <Info size={18} className="text-primary" />
                                            Job Notes
                                        </h4>
                                        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 italic text-gray-600 font-body text-sm leading-relaxed">
                                            {job.notes || 'No specific notes recorded for this job yet.'}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSubTab === 'intake' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    {(!job.questionnaire) ? (
                                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center text-gray-400 opacity-60 p-12">
                                            <HelpCircle size={48} className="mb-6" />
                                            <p className="font-title text-xl uppercase tracking-widest">No Intake Form Available</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
                                                <h4 className="font-title font-bold text-primary tracking-wider uppercase mb-6 flex items-center gap-2">
                                                    General Questions
                                                </h4>

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">1. How did you hear about us?</p>
                                                        <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.hearAboutUs || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">2. What is the current issue?</p>
                                                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 font-body text-sm text-gray-700 whitespace-pre-wrap">
                                                            {job.questionnaire.currentIssue || 'N/A'}
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">3. How long has this issue been going on?</p>
                                                            <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.issueDuration || 'N/A'}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">3.1 Filing an insurance claim?</p>
                                                            <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.insuranceClaim || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">3.2 Required Urgency</p>
                                                        <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.urgency || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
                                                <h4 className="font-title font-bold text-primary tracking-wider uppercase mb-6 flex items-center gap-2">
                                                    Property & Additional Details
                                                </h4>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">4. Home Age</p>
                                                        <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.homeAge || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">5. Roof/Siding Age</p>
                                                        <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.componentAge || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">6. Roof Type</p>
                                                        <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.roofType || 'N/A'}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">7. Previous attempts to fix?</p>
                                                        <p className="font-body text-sm font-medium text-gray-900">{job.questionnaire.previousAttempts || 'N/A'}</p>
                                                    </div>
                                                    {job.questionnaire.previousAttempts === 'Yes' && (
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">7.1 Who & what did they do?</p>
                                                            <p className="font-body text-sm font-medium text-gray-900 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">{job.questionnaire.previousAttemptsDetails || 'N/A'}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10">
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-2">8. Best Call-back Time for Perry</p>
                                                <p className="font-title text-xl font-bold text-primary">{job.questionnaire.callbackTime || 'Not specified'}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {activeSubTab === 'activity' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    {(!job.communications || job.communications.length === 0) ? (
                                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center text-gray-400 opacity-60 p-12">
                                            <MessageSquare size={48} className="mb-6" />
                                            <p className="font-title text-xl uppercase tracking-widest">No Activity Logged</p>
                                        </div>
                                    ) : (
                                        job.communications.map(msg => (
                                            <div key={msg.id} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex gap-5 hover:shadow-md transition-shadow">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border ${msg.type === 'call' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-purple-50 text-purple-500 border-purple-100'
                                                    }`}>
                                                    {msg.type === 'call' ? <Phone size={20} /> : <MessageSquare size={20} />}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1.5">{msg.date} • {msg.type.toUpperCase()}</p>
                                                    <p className="font-body text-gray-700 font-bold leading-snug">{msg.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {activeSubTab === 'photos' && (
                                <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="aspect-square bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center flex-col text-gray-400 p-8 text-center hover:bg-white hover:border-primary/40 transition-all cursor-pointer group shadow-sm active:scale-95">
                                        <div className="w-16 h-16 rounded-full bg-gray-200/50 flex items-center justify-center mb-4 group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-inner">
                                            <Camera size={32} />
                                        </div>
                                        <p className="font-title font-bold text-sm tracking-widest uppercase">Tap to Upload</p>
                                    </div>
                                    {/* Mock gallery items */}
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="aspect-square bg-gray-100 rounded-[2rem] overflow-hidden group relative shadow-sm border border-gray-100">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                                <span className="text-white font-title font-bold text-[10px] uppercase tracking-widest mb-1 items-center flex gap-2">
                                                    <Tag size={12} />
                                                    Site Survey-{i}
                                                </span>
                                                <p className="text-white/60 text-[8px] font-bold font-body uppercase">Feb 24, 2024</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
