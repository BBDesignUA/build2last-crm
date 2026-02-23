import { X, CheckCircle2, Circle, DollarSign, Camera, MessageSquare, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const JobDashboardModal = ({ job, onClose, onUpdateJob }) => {
    const [activeSubTab, setActiveSubTab] = useState('pricing');

    if (!job) return null;

    const toggleChecklistItem = (itemId) => {
        const updatedChecklist = job.checklist.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        onUpdateJob({ ...job, checklist: updatedChecklist });
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
                className="bg-white w-full max-w-6xl h-full max-h-[850px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative"
            >
                {/* Header */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <span className="text-xl font-title font-bold text-primary uppercase leading-none tracking-wider">
                                {job.trade[0]}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-title font-bold text-gray-900 leading-none mb-1 uppercase tracking-tight">
                                {job.clientName}
                            </h2>
                            <p className="text-sm font-body text-gray-400 font-medium">#{job.id.split('-')[1]} • {job.address}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.open(`tel:${job.phone}`)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-title font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                        >
                            <Phone size={18} className="text-primary" />
                            CALL CLIENT
                        </button>
                        <button
                            onClick={onClose}
                            className="p-3 bg-gray-200/50 text-gray-500 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:rotate-90 shadow-sm"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content Split Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Dynamic Checklist */}
                    <div className="w-1/2 border-r border-gray-100 flex flex-col bg-white">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
                            <h3 className="text-lg font-title font-bold text-gray-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-primary" />
                                Job Flow Checklist
                            </h3>
                            <p className="text-xs font-body text-gray-400 font-bold uppercase tracking-tight">
                                Current Stage: <span className="text-primary italic">{job.status}</span>
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-4">
                            {job.checklist.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <ClipboardCheck size={48} className="mb-4" />
                                    <p className="font-title text-xl">No tasks defined for this stage</p>
                                </div>
                            ) : (
                                job.checklist.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleChecklistItem(item.id)}
                                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${item.completed
                                                ? 'bg-green-50 border-green-100 text-green-700'
                                                : 'bg-white border-gray-100 text-gray-700 hover:border-primary/20 hover:bg-gray-50 shadow-sm'
                                            }`}
                                    >
                                        {item.completed ? (
                                            <CheckCircle2 size={24} className="text-green-500 flex-shrink-0" />
                                        ) : (
                                            <Circle size={24} className="text-gray-300 flex-shrink-0" />
                                        )}
                                        <span className={`text-lg font-title tracking-tight font-medium ${item.completed ? 'opacity-80' : ''}`}>
                                            {item.task}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right: Tabs and Details */}
                    <div className="w-1/2 flex flex-col bg-gray-50/30">
                        {/* Tabs Header */}
                        <div className="flex border-b border-gray-100 bg-white">
                            {[
                                { id: 'pricing', label: 'Pricing', icon: DollarSign },
                                { id: 'photos', label: 'Photos', icon: Camera },
                                { id: 'comms', label: 'Communal', icon: MessageSquare },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSubTab(tab.id)}
                                    className={`flex-1 flex flex-col items-center justify-center py-5 border-b-2 transition-all gap-1 ${activeSubTab === tab.id
                                            ? 'border-primary text-primary bg-primary/5'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <tab.icon size={20} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-10">
                            {activeSubTab === 'pricing' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Total Contract</p>
                                            <p className="text-3xl font-title font-bold text-gray-900 tracking-tight">
                                                ${job.pricing.total.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Balance Due</p>
                                            <p className="text-3xl font-title font-bold text-primary tracking-tight">
                                                ${job.pricing.balance.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
                                            <h4 className="font-title font-bold text-gray-900 tracking-wider">PAYMENT LOG</h4>
                                            <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase">
                                                {Math.round((job.pricing.paid / job.pricing.total) * 100)}% Collected
                                            </span>
                                        </div>
                                        <div className="p-8 space-y-4">
                                            <div className="flex justify-between items-center text-sm font-body">
                                                <span className="text-gray-500 font-medium">Initial Deposit (30%)</span>
                                                <span className="text-gray-900 font-bold font-title tracking-tight">${(job.pricing.total * 0.3).toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-primary h-full transition-all duration-1000"
                                                    style={{ width: `${(job.pricing.paid / job.pricing.total) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSubTab === 'photos' && (
                                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="aspect-square bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center flex-col text-gray-400 p-6 text-center hover:bg-white transition-colors cursor-pointer group">
                                        <div className="w-12 h-12 rounded-full bg-gray-200/50 flex items-center justify-center mb-3 group-hover:text-primary transition-all">
                                            <Camera size={24} />
                                        </div>
                                        <p className="font-title font-bold text-sm tracking-tight">ADD SITE PHOTOS</p>
                                    </div>
                                </div>
                            )}

                            {activeSubTab === 'comms' && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 opacity-60">
                                    <MessageSquare size={40} className="mb-4" />
                                    <p className="font-title text-lg uppercase tracking-widest">No Recent Communications</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
