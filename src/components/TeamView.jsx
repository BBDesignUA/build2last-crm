import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, UserPlus, X, Search, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const TeamView = () => {
    const { usersList, addManager, user } = useAuth();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Ensure only admins can see this view
    if (user?.role !== 'admin') {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12">
                <Shield size={64} className="mb-6 opacity-20 text-red-500" />
                <h2 className="text-2xl font-title font-bold uppercase tracking-widest text-red-500">Access Denied</h2>
                <p className="font-body text-sm mt-2">You do not have permission to view team management.</p>
            </div>
        );
    }

    const filteredUsers = usersList.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-8 pb-8 fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-title font-bold tracking-tight uppercase text-gray-900 leading-none flex items-center gap-3">
                        <Users className="text-primary w-10 h-10" />
                        Team Directory
                    </h1>
                    <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">Manage Access and Roles</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search team..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 w-64 pl-12 pr-4 rounded-2xl bg-white border border-gray-200 font-body text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-xs uppercase tracking-widest text-white hover:opacity-90 flex items-center gap-2 transition-transform active:scale-95"
                    >
                        <UserPlus size={18} />
                        ADD MANAGER
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 uppercase tracking-wider text-[10px] font-title font-bold text-gray-400">
                                <th className="p-6 font-bold">Team Member</th>
                                <th className="p-6 font-bold">Role Access</th>
                                <th className="p-6 font-bold">Contact Info</th>
                                <th className="p-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-400 font-body">
                                        No team members found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(teamMember => (
                                    <tr key={teamMember.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-title font-bold text-gray-500 uppercase">
                                                    {teamMember.name.charAt(0)}
                                                </div>
                                                <span className="font-title font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                                                    {teamMember.name}
                                                    {teamMember.id === user?.id && " (You)"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${teamMember.role === 'admin'
                                                    ? 'bg-red-50 text-red-600 border-red-100'
                                                    : 'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {teamMember.role}
                                            </span>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-2">
                                                <Mail size={14} className="text-gray-400" />
                                                <span className="font-body text-sm text-gray-500">{teamMember.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle text-right">
                                            <button
                                                className="px-4 py-2 text-xs font-title font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
                                                disabled={teamMember.id === user?.id || teamMember.role === 'admin'}
                                            >
                                                Revoke
                                            </button>
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
                    <AddManagerModal
                        onClose={() => setIsAddModalOpen(false)}
                        onAdd={(newManager) => {
                            addManager(newManager);
                            setIsAddModalOpen(false);
                            // In a real app we'd dispatch an email to the new manager here
                            alert(`Manager account created!\nEmail: ${newManager.email}\nTemporary Password: ${newManager.password}`);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const AddManagerModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const generateTempPassword = () => {
        return Math.random().toString(36).slice(-8); // simple 8-char alphanumeric
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            password: generateTempPassword() // Generate auto password for demonstration
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
                className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10"
            >
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h2 className="text-xl font-title font-bold text-gray-900 uppercase tracking-tight flex items-center gap-3">
                            <Shield className="text-primary w-5 h-5" />
                            Provision Access
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all bg-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Manager Full Name *</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Company Email *</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                        <Lock className="text-blue-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-xs font-body text-blue-800 leading-relaxed">
                            A temporary password will be automatically generated and provided upon creation. The manager will be prompted to change it on their first login.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-6 h-12 rounded-2xl bg-gray-50 text-gray-500 font-title font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            CANCEL
                        </button>
                        <button type="submit" className="px-6 h-12 rounded-2xl bg-primary text-white font-title font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2">
                            <UserPlus size={16} />
                            CREATE
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
