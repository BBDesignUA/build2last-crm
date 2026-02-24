import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Briefcase, User, MapPin, DollarSign, ListTodo, HelpCircle } from 'lucide-react';

export const CreateJobModal = ({ onClose, onAddJob, clients, onAddClient }) => {
    const [step, setStep] = useState(1);

    // Step 1: Client Selection
    const [useExistingClient, setUseExistingClient] = useState(true);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [newClientData, setNewClientData] = useState({
        name: '',
        spouseName: '',
        email: '',
        phone: '',
        address: ''
    });

    // Step 2: Job Details
    const [jobData, setJobData] = useState({
        trade: '',
        jobSize: 'Medium',
        priority: 'medium',
        totalPricing: 0,
        paidPricing: 0,
        notes: ''
    });

    // Step 3: Intake Questionnaire
    const [questionnaire, setQuestionnaire] = useState({
        hearAboutUs: '',
        currentIssue: '',
        issueDuration: '',
        insuranceClaim: 'No',
        urgency: '',
        homeAge: '',
        componentAge: '',
        roofType: '',
        previousAttempts: 'No',
        previousAttemptsDetails: '',
        callbackTime: ''
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();

        let definitiveClient;

        if (useExistingClient) {
            definitiveClient = clients.find(c => c.id === selectedClientId);
            if (!definitiveClient) {
                alert('Please select a valid client.');
                return;
            }
        } else {
            // Create a new client first
            definitiveClient = {
                id: `client-${Date.now()}`,
                ...newClientData
            };
            onAddClient(definitiveClient);
        }

        const newJob = {
            id: `job-${Date.now()}`,
            clientName: definitiveClient.name,
            spouseName: definitiveClient.spouseName || '',
            address: useExistingClient ? definitiveClient.address : jobData.jobAddress || definitiveClient.address,
            phone: definitiveClient.phone,
            email: definitiveClient.email,
            trade: jobData.trade,
            status: 'lead',
            jobSize: jobData.jobSize,
            priority: jobData.priority,
            notes: jobData.notes,
            checklist: [], // Would ideally generate from CHECKLIST_DATA based on jobSize and 'lead' status
            pricing: {
                total: parseFloat(jobData.totalPricing) || 0,
                paid: parseFloat(jobData.paidPricing) || 0,
                balance: (parseFloat(jobData.totalPricing) || 0) - (parseFloat(jobData.paidPricing) || 0)
            },
            questionnaire: questionnaire,
            communications: []
        };

        onAddJob(newJob);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
            >
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-title font-bold text-gray-900 uppercase tracking-tight flex items-center gap-3">
                            <Briefcase className="text-primary w-5 h-5" />
                            Create New Job
                        </h2>
                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                            Step {step} of 3: {step === 1 ? 'Client Information' : step === 2 ? 'Job Details' : 'Intake Questionnaire'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all bg-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1">
                    {step === 1 && (
                        <div className="space-y-8 fade-in">
                            <div className="flex bg-gray-100 p-1 rounded-2xl">
                                <button
                                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${useExistingClient ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
                                    onClick={() => setUseExistingClient(true)}
                                >
                                    Existing Client
                                </button>
                                <button
                                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${!useExistingClient ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
                                    onClick={() => setUseExistingClient(false)}
                                >
                                    New Client
                                </button>
                            </div>

                            {useExistingClient ? (
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Select Client</label>
                                    <select
                                        className="w-full h-14 px-4 rounded-2xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-gray-50"
                                        value={selectedClientId}
                                        onChange={(e) => setSelectedClientId(e.target.value)}
                                    >
                                        <option value="">-- Choose a client --</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.name} ({c.address})</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Full Name *</label>
                                            <input
                                                required
                                                value={newClientData.name}
                                                onChange={e => setNewClientData({ ...newClientData, name: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Spouse Name</label>
                                            <input
                                                value={newClientData.spouseName}
                                                onChange={e => setNewClientData({ ...newClientData, spouseName: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Email</label>
                                            <input
                                                type="email"
                                                value={newClientData.email}
                                                onChange={e => setNewClientData({ ...newClientData, email: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Phone</label>
                                            <input
                                                value={newClientData.phone}
                                                onChange={e => setNewClientData({ ...newClientData, phone: e.target.value })}
                                                className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Property Address *</label>
                                        <input
                                            required
                                            value={newClientData.address}
                                            onChange={e => setNewClientData({ ...newClientData, address: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-6 fade-in">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Trade/Division *</label>
                                    <select
                                        required
                                        value={jobData.trade}
                                        onChange={e => setJobData({ ...jobData, trade: e.target.value })}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                    >
                                        <option value="">Select Trade</option>
                                        <option value="Roofing">Roofing</option>
                                        <option value="Siding">Siding</option>
                                        <option value="Windows">Windows</option>
                                        <option value="Gutters">Gutters</option>
                                        <option value="General Construction">General Construction</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Job Size Context *</label>
                                    <select
                                        value={jobData.jobSize}
                                        onChange={e => setJobData({ ...jobData, jobSize: e.target.value })}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                    >
                                        <option value="Small">Small (Repair/Quick)</option>
                                        <option value="Medium">Medium (Standard)</option>
                                        <option value="Large">Large (Complex/Multi)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Optional divergent address if job is not at client's main address */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Job Site Address (if different from client)</label>
                                <input
                                    placeholder="Leave blank to use client address"
                                    value={jobData.jobAddress || ''}
                                    onChange={e => setJobData({ ...jobData, jobAddress: e.target.value })}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Total Estimated Price</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="number"
                                            value={jobData.totalPricing}
                                            onChange={e => setJobData({ ...jobData, totalPricing: e.target.value })}
                                            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Deposit Paid</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="number"
                                            value={jobData.paidPricing}
                                            onChange={e => setJobData({ ...jobData, paidPricing: e.target.value })}
                                            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Job Notes</label>
                                <textarea
                                    rows={3}
                                    value={jobData.notes}
                                    onChange={e => setJobData({ ...jobData, notes: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none resize-none"
                                    placeholder="Initial client requests, material colors, etc."
                                />
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-6 fade-in">
                            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 mb-6 flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                                    <HelpCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-title font-bold text-primary uppercase tracking-widest leading-none mb-1">
                                        Intake Questionnaire
                                    </h3>
                                    <p className="text-[10px] font-bold text-primary/60 uppercase tracking-wider">Required for operational handoff</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">1. How did you hear about us?</label>
                                    <input value={questionnaire.hearAboutUs} onChange={e => setQuestionnaire({ ...questionnaire, hearAboutUs: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" placeholder="e.g. Google, Referral..." />
                                </div>
                                <div className="row-span-2">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">2. What is the current issue?</label>
                                    <textarea rows={4} value={questionnaire.currentIssue} onChange={e => setQuestionnaire({ ...questionnaire, currentIssue: e.target.value })} className="w-full p-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none resize-none" placeholder="Describe the problem..." />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">3. How long has this issue been going on?</label>
                                    <input value={questionnaire.issueDuration} onChange={e => setQuestionnaire({ ...questionnaire, issueDuration: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">3.1. Filing an insurance claim?</label>
                                    <select value={questionnaire.insuranceClaim} onChange={e => setQuestionnaire({ ...questionnaire, insuranceClaim: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none">
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                        <option value="Unsure">Unsure</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">3.2. Urgency / How soon to fix?</label>
                                    <input value={questionnaire.urgency} onChange={e => setQuestionnaire({ ...questionnaire, urgency: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" placeholder="e.g. Emergency, Next week..." />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">4. Home Age</label>
                                    <input value={questionnaire.homeAge} onChange={e => setQuestionnaire({ ...questionnaire, homeAge: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">5. Roof/Siding Age</label>
                                    <input value={questionnaire.componentAge} onChange={e => setQuestionnaire({ ...questionnaire, componentAge: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">6. Roof Type</label>
                                    <select value={questionnaire.roofType} onChange={e => setQuestionnaire({ ...questionnaire, roofType: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none">
                                        <option value="">Select...</option>
                                        <option value="Shingle">Shingle</option>
                                        <option value="Slate">Slate</option>
                                        <option value="Metal">Metal</option>
                                        <option value="Other">Other</option>
                                        <option value="N/A">N/A</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">7. Previous attempts to fix?</label>
                                    <select value={questionnaire.previousAttempts} onChange={e => setQuestionnaire({ ...questionnaire, previousAttempts: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none">
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                                {questionnaire.previousAttempts === 'Yes' && (
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">7.1. Who & what did they do?</label>
                                        <input value={questionnaire.previousAttemptsDetails} onChange={e => setQuestionnaire({ ...questionnaire, previousAttemptsDetails: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" />
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 my-6"></div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">8. Best Call-back Time for Perry</label>
                                <input value={questionnaire.callbackTime} onChange={e => setQuestionnaire({ ...questionnaire, callbackTime: e.target.value })} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary bg-gray-50 outline-none" placeholder="e.g. Afternoon, 5PM, Weekends..." />
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-6 h-12 rounded-2xl bg-white border border-gray-200 text-gray-500 font-title font-bold text-xs uppercase tracking-widest hover:text-gray-900 transition-colors"
                        >
                            Back
                        </button>
                    ) : (
                        <div /> // Placeholder for flex spacing
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={step === 1 ? (useExistingClient && !selectedClientId) : !jobData.trade}
                            className="px-8 h-12 rounded-2xl bg-primary text-white font-title font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-8 h-12 rounded-2xl bg-primary text-white font-title font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                        >
                            <Briefcase size={16} />
                            Create Job
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
