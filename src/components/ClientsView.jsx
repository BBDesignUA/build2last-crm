import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, X, Search, MapPin, Phone, Mail, FileText, User, Briefcase, Edit2, Trash2 } from 'lucide-react';

export const ClientsView = ({ clients, jobs, onAddClient, onUpdateClient, onDeleteClient, onJobClick }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-8 pb-8 fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none flex items-center gap-3">
                        <Users className="text-primary w-10 h-10" />
                        Client Directory
                    </h1>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Manage your customer relationships</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 w-64 pl-12 pr-4 rounded-2xl bg-white border border-gray-200 font-body text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => { setEditingClient(null); setIsAddModalOpen(true); }}
                        className="px-6 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-xs uppercase tracking-widest text-white hover:opacity-90 flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <Plus size={18} />
                        ADD CLIENT
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-wider text-[10px] font-title font-bold text-gray-400">
                                <th className="p-6 font-bold">Client Name</th>
                                <th className="p-6 font-bold">Contact Info</th>
                                <th className="p-6 font-bold">Address & Notes</th>
                                <th className="p-6 font-bold">Associated Jobs</th>
                                <th className="p-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-400 font-body">
                                        No clients found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map(client => (
                                    <tr key={client.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6 align-top">
                                            <div className="flex flex-col">
                                                <span className="font-title font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{client.name}</span>
                                                {client.spouseName && (
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                                                        <User size={10} /> {client.spouseName}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 align-top">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Phone size={14} className="text-gray-400" />
                                                    <span className="font-body text-sm font-medium text-gray-700">{client.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail size={14} className="text-gray-400" />
                                                    <span className="font-body text-sm text-gray-500">{client.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top max-w-xs">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-start gap-2">
                                                    <MapPin size={16} className="text-gray-400 mt-0.5" />
                                                    <span className="font-body text-sm text-gray-700">{client.address}</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <FileText size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <span className="font-body text-sm text-gray-500 italic line-clamp-2">{client.notes || 'No notes.'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-top">
                                            <div className="flex flex-col gap-2">
                                                {jobs.filter(j => j.clientName === client.name || j.email === client.email).length === 0 ? (
                                                    <span className="text-xs text-gray-400 italic font-body">No active jobs</span>
                                                ) : (
                                                    jobs.filter(j => j.clientName === client.name || j.email === client.email).map(job => (
                                                        <button
                                                            key={job.id}
                                                            onClick={() => onJobClick(job)}
                                                            className="flex items-center justify-between p-2 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 transition-all text-left group/job"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Briefcase size={14} className="text-primary" />
                                                                <span className="font-title font-bold text-xs text-gray-700 group-hover/job:text-primary transition-colors">{job.trade}</span>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{job.status.replace('-', ' ')}</span>
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 align-top">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => { setEditingClient(client); setIsAddModalOpen(true); }}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this client?')) {
                                                            onDeleteClient(client.id);
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {isAddModalOpen && (
                    <AddClientModal
                        client={editingClient}
                        onClose={() => { setIsAddModalOpen(false); setEditingClient(null); }}
                        onAdd={(newClient) => {
                            if (editingClient) {
                                onUpdateClient(newClient);
                            } else {
                                onAddClient(newClient);
                            }
                            setIsAddModalOpen(false);
                            setEditingClient(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const AddClientModal = ({ client, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: client?.name || '',
        spouseName: client?.spouseName || '',
        address: client?.address || '',
        phone: client?.phone || '',
        email: client?.email || '',
        notes: client?.notes || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            id: client?.id || `client-${Date.now()}`
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
            >
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-title font-bold text-gray-900 uppercase tracking-tight flex items-center gap-3">
                            <User className="text-primary" />
                            {client ? 'Edit Client Profile' : 'New Client Profile'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all bg-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Primary Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Customer Name *</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Spouse Name</label>
                                <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number *</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="col-span-2">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Property Address *</label>
                            <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                        </div>

                        {/* Notes */}
                        <div className="col-span-2">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Other Customer Notes</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full p-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-6 h-12 rounded-2xl bg-gray-50 text-gray-500 font-title font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            CANCEL
                        </button>
                        <button type="submit" className="px-6 h-12 rounded-2xl bg-primary text-white font-title font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                            {client ? 'SAVE CHANGES' : 'SAVE CLIENT'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
