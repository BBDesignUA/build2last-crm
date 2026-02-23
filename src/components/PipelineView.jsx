import { Phone, MoreVertical, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export const PipelineView = ({ stages, jobs, onJobClick }) => {
    return (
        <div className="flex gap-6 h-full overflow-x-auto pb-4 scrollbar-hide">
            {stages.map((stage) => (
                <KanbanColumn
                    key={stage.id}
                    stage={stage}
                    jobs={jobs.filter((j) => j.status === stage.id)}
                    onJobClick={onJobClick}
                />
            ))}
        </div>
    );
};

const KanbanColumn = ({ stage, jobs, onJobClick }) => {
    return (
        <div className="flex-shrink-0 w-80 md:w-96 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-title font-bold text-gray-900 tracking-tight">{stage.title}</h2>
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {jobs.length}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="flex-1 bg-gray-100/50 rounded-2xl p-4 overflow-y-auto space-y-4 shadow-inner border border-gray-200/50">
                {jobs.length === 0 ? (
                    <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl px-4 text-center">
                        <p className="text-sm font-body text-gray-400 italic">No jobs in this stage</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
                    ))
                )}
            </div>
        </div>
    );
};

const JobCard = ({ job, onClick }) => {
    const priorityColors = {
        high: 'bg-red-500',
        medium: 'bg-orange-500',
        low: 'bg-green-500',
    };

    return (
        <motion.div
            layoutId={job.id}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group relative overflow-hidden active:bg-gray-50"
        >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${priorityColors[job.priority] || 'bg-gray-300'}`} />

            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                    {job.trade}
                </span>
                <button
                    onClick={(e) => { e.stopPropagation(); window.open(`tel:${job.phone}`); }}
                    className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all outline-none"
                >
                    <Phone size={14} />
                </button>
            </div>

            <h3 className="text-lg font-title font-bold text-gray-900 leading-tight mb-1 group-hover:text-primary transition-colors">
                {job.clientName}
            </h3>

            <div className="space-y-2 mt-3">
                <div className="flex items-start gap-2 text-gray-500">
                    <MapPin size={12} className="mt-1 flex-shrink-0" />
                    <p className="text-xs font-body line-clamp-1 leading-relaxed italic">{job.address}</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                <div className="flex -space-x-1">
                    {[1, 2].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                    ))}
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Balance</p>
                    <p className="text-sm font-title font-bold text-gray-900">${job.pricing.balance.toLocaleString()}</p>
                </div>
            </div>
        </motion.div>
    );
};
