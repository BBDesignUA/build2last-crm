import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    Circle,
    Clock,
    ChevronRight,
    Info,
    DollarSign,
    User,
    MapPin,
    Briefcase
} from 'lucide-react';
import { CHECKLIST_DATA } from '../data/mockData';

export const WorkflowView = ({ job, stages, onUpdateJob }) => {
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const toggleExpand = (e, taskId) => {
        e.stopPropagation();
        setExpandedTaskId(prev => prev === taskId ? null : taskId);
    };

    if (!job) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12">
                <Briefcase size={64} className="mb-6 opacity-20" />
                <h2 className="text-2xl font-title font-bold uppercase tracking-widest">No Job Selected</h2>
                <p className="font-body text-sm mt-2">Select a job from the pipeline to view its detailed workflow.</p>
            </div>
        );
    }

    // Get current stage index for the timeline
    const currentStageIndex = useMemo(() =>
        stages.findIndex(s => s.id === job.status),
        [stages, job.status]
    );

    // Generate the full master checklist for this job size
    const masterChecklist = useMemo(() => {
        const sizeData = CHECKLIST_DATA[job.jobSize || 'Large'];
        return stages.map(stage => ({
            stageId: stage.id,
            stageTitle: stage.title,
            tasks: sizeData?.[stage.id] || []
        }));
    }, [stages, job.jobSize]);

    const toggleTask = (taskId, stageId) => {
        // Note: In a real app, we'd update the specific job or the master state
        // For this prototype, we'll just simulate the toggle if the task exists in the current job's active checklist
        const updatedChecklist = job.checklist?.map(item =>
            item.id === taskId ? { ...item, completed: !item.completed } : item
        ) || [];
        onUpdateJob({ ...job, checklist: updatedChecklist });
    };

    const assigneeColors = {
        Perry: 'bg-primary/10 text-primary border-primary/20',
        John: 'bg-blue-50 text-blue-600 border-blue-100',
        Assistant: 'bg-purple-50 text-purple-600 border-purple-100',
        Sales: 'bg-orange-50 text-orange-600 border-orange-100',
        General: 'bg-gray-100 text-gray-600 border-gray-200',
    };

    return (
        <div className="h-full flex flex-col space-y-6">
            {/* Job Context Header */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Job</span>
                        <h2 className="text-3xl font-title font-bold text-gray-900 uppercase tracking-tight">{job.clientName}</h2>
                    </div>
                    <div className="flex flex-col border-l border-gray-100 pl-8">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Collection</span>
                        <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-primary" />
                            <span className="text-xl font-title font-bold text-gray-900">${job.pricing.paid.toLocaleString()}</span>
                            <span className="text-xs text-gray-400 font-bold">/ ${job.pricing.total.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex flex-col border-l border-gray-100 pl-8">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Property</span>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary" />
                            <span className="text-sm font-body font-bold text-gray-700">{job.address}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-xl border font-title font-bold uppercase tracking-widest text-xs ${job.priority === 'high' ? 'bg-primary/5 text-primary border-primary/10' : 'bg-gray-50 text-gray-500 border-gray-100'
                        }`}>
                        {job.priority} Priority
                    </div>
                </div>
            </div>

            {/* Horizontal Progress Timeline (based on download.png) */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="relative flex items-center justify-between">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                            className="h-full bg-primary"
                        />
                    </div>

                    {stages.map((stage, idx) => {
                        const isCompleted = idx < currentStageIndex;
                        const isActive = idx === currentStageIndex;
                        const isPending = idx > currentStageIndex;

                        return (
                            <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-sm ${isActive ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30' :
                                    isCompleted ? 'bg-white border-primary text-primary' :
                                        'bg-white border-gray-100 text-gray-300'
                                    }`}>
                                    {isCompleted ? <CheckCircle2 size={24} /> :
                                        isActive ? <Clock size={24} className="animate-spin-slow" /> :
                                            <Circle size={24} />}
                                </div>
                                <div className="absolute top-16 whitespace-nowrap text-center">
                                    <p className={`text-[10px] font-title font-bold uppercase tracking-widest ${isActive ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-300'
                                        }`}>
                                        {stage.title}
                                    </p>
                                    {isCompleted && <p className="text-[8px] font-body text-gray-400 font-bold mt-1 uppercase">02/23/24</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="h-16" /> {/* Spacer for labels */}
            </div>

            {/* Master Checklist Flow */}
            <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                    <h3 className="text-xl font-title font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3">
                        <Info size={24} className="text-primary" />
                        Master Workflow Checklist
                    </h3>
                    <div className="flex gap-4 items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Job Size:</span>
                        <span className="px-4 py-1.5 bg-gray-100 rounded-full font-title font-bold text-gray-700 uppercase tracking-widest text-xs">
                            {job.jobSize}
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-12">
                    {masterChecklist.map((section, sIdx) => {
                        const isCurrentStage = section.stageId === job.status;
                        const isPastStage = stages.findIndex(s => s.id === section.stageId) < currentStageIndex;

                        return (
                            <div key={section.stageId} className={`space-y-4 ${!isCurrentStage && !isPastStage ? 'opacity-40 grayscale-[0.5]' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-title font-bold text-sm ${isCurrentStage ? 'bg-primary text-white' : isPastStage ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {sIdx + 1}
                                    </div>
                                    <h4 className={`font-title font-bold text-lg uppercase tracking-wider ${isCurrentStage ? 'text-primary' : 'text-gray-900'
                                        }`}>
                                        {section.stageTitle}
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-12">
                                    {section.tasks.length === 0 ? (
                                        <p className="text-xs italic text-gray-400 font-body">No standardized tasks for this stage.</p>
                                    ) : (
                                        section.tasks.map((task) => {
                                            // Cross-reference with current job checklist if it's the current stage
                                            const jobTaskMatch = job.checklist?.find(t => t.id === task.id);
                                            const isDone = isPastStage || (jobTaskMatch?.completed);

                                            const isExpanded = expandedTaskId === task.id;

                                            return (
                                                <div
                                                    key={task.id}
                                                    className={`rounded-2xl border overflow-hidden transition-all ${isDone
                                                        ? 'bg-green-50/50 border-green-100 opacity-60'
                                                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                                        }`}
                                                >
                                                    <div
                                                        className="p-4 flex items-center gap-4 cursor-pointer"
                                                        onClick={() => !isDone && toggleTask(task.id, section.stageId)}
                                                    >
                                                        {isDone ? (
                                                            <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                                                        ) : (
                                                            <Circle size={20} className="text-gray-200 flex-shrink-0" />
                                                        )}
                                                        <div className="flex-1">
                                                            <p className={`text-sm font-body tracking-normal ${isDone ? 'text-green-900 line-through opacity-80' : 'text-gray-900 font-medium'}`}>
                                                                {task.task}
                                                            </p>
                                                        </div>
                                                        {task.assignee && (
                                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold border uppercase tracking-widest leading-none ${assigneeColors[task.assignee] || assigneeColors.General}`}>
                                                                {task.assignee}
                                                            </span>
                                                        )}
                                                        <button
                                                            onClick={(e) => toggleExpand(e, task.id)}
                                                            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                                                        >
                                                            <ChevronRight size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                                                        </button>
                                                    </div>
                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="px-4 pb-4 border-t border-gray-50 bg-gray-50/30"
                                                            >
                                                                <div className="pt-3 text-sm font-body text-gray-600 space-y-2 leading-relaxed">
                                                                    <p><strong>Description:</strong> Please review and complete all necessary sub-tasks associated with this action item. Consult the project manual if specific guidelines are unclear.</p>
                                                                    <p className="flex items-center gap-2">
                                                                        <Info size={14} className="text-primary" />
                                                                        <span>Requires sign-off from {task.assignee || 'supervisor'} upon completion.</span>
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
