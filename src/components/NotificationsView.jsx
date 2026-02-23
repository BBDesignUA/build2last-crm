import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Bell,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Settings,
    Eye,
    Send,
    Calendar,
    Zap
} from 'lucide-react';

export const NotificationsView = () => {
    const [automatedEvents, setAutomatedEvents] = useState([
        { id: 'new-lead', title: 'New Lead Auto-Response', enabled: true, template: 'lead-welcome', icon: Zap },
        { id: 'estimate-booked', title: 'Estimate Confirmation', enabled: true, template: 'estimate-details', icon: Calendar },
        { id: 'job-started', title: 'Job Commenced Notification', enabled: false, template: 'production-start', icon: CheckCircle2 },
        { id: 'payment-due', title: 'Payment Reminder (Automated)', enabled: true, template: 'invoice-reminder', icon: AlertCircle },
        { id: 'completion-survey', title: 'Job Completion Survey', enabled: true, template: 'feedback-request', icon: CheckCircle2 },
    ]);

    const recentEmails = [
        { id: 1, to: 'John Doe', subject: 'Estimate Confirmation', status: 'delivered', time: '10 mins ago' },
        { id: 2, to: 'Sarah Wilson', subject: 'Welcome to Build2Last', status: 'delivered', time: '2 hours ago' },
        { id: 3, to: 'Mike Ross', subject: 'Invoice #8829', status: 'opened', time: '5 hours ago' },
        { id: 4, to: 'Anna Smith', subject: 'Job Scheduled', status: 'failed', time: 'Yesterday' },
    ];

    const toggleEvent = (id) => {
        setAutomatedEvents(prev => prev.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e));
    };

    return (
        <div className="h-full flex flex-col gap-8 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none">Email System</h1>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Automated Client Communications</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 h-12 rounded-2xl bg-white border border-gray-200 font-title font-bold text-xs uppercase tracking-widest text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-all">
                        <Settings size={16} />
                        SMTP SERVER
                    </button>
                    <button className="px-6 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-xs uppercase tracking-widest text-white hover:opacity-90 flex items-center gap-2 transition-all">
                        <Send size={16} />
                        COMPOSE MANUAL
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
                {/* Automated Triggers */}
                <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
                    <h3 className="text-lg font-title font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3">
                        <Zap size={20} className="text-primary" />
                        Event Triggers
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {automatedEvents.map((event) => (
                            <div key={event.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-2xl ${event.enabled ? 'bg-primary/5 text-primary' : 'bg-gray-50 text-gray-400'}`}>
                                        <event.icon size={24} />
                                    </div>
                                    <button
                                        onClick={() => toggleEvent(event.id)}
                                        className={`w-14 h-7 rounded-full transition-all relative ${event.enabled ? 'bg-primary' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-all ${event.enabled ? 'translate-x-7' : ''}`} />
                                    </button>
                                </div>
                                <h4 className="font-title font-bold text-gray-900 uppercase tracking-tight text-lg leading-tight mb-2">
                                    {event.title}
                                </h4>
                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-[10px] font-body font-bold text-gray-400 uppercase tracking-widest">
                                        Template: {event.template}
                                    </span>
                                    <button className="text-primary hover:text-primary/70 font-title font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                                        PREVIEW <ChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Log / Recent Activity */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col min-h-0">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-lg font-title font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3">
                            <Mail size={20} className="text-primary" />
                            Recent Activity
                        </h3>
                        <Eye size={18} className="text-gray-300" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {recentEmails.map((email) => (
                            <div key={email.id} className="p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="font-title font-bold text-gray-900 uppercase tracking-tight">{email.to}</p>
                                    <span className="text-[9px] font-body font-bold text-gray-400 uppercase">{email.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 font-body mb-2 line-clamp-1">{email.subject}</p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${email.status === 'delivered' ? 'bg-green-400' :
                                            email.status === 'opened' ? 'bg-blue-400' : 'bg-red-400'
                                        }`} />
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                                        {email.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-6">
                        <button className="w-full py-4 rounded-2xl border border-gray-100 font-title font-bold text-[10px] text-gray-400 uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                            VIEW ALL RECORDS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
