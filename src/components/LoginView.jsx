import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginView = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error);
            setIsLoading(false);
        }
        // If successful, the AuthContext triggers a re-render showing the main app
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex justify-center mb-10">
                            <img src="/built-2-last-logo-189w.png" alt="Build 2 Last" className="w-24 h-auto drop-shadow-lg" />
                        </div>

                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-title font-bold text-gray-900 tracking-tight uppercase mb-2">Build 2 Last</h1>
                            <p className="font-body text-sm text-gray-500 font-bold tracking-widest uppercase">Contractor Portal</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-body font-medium flex items-center gap-2 border border-red-100"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all focus:bg-white"
                                        placeholder="admin@gmail.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 font-body text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all focus:bg-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-1 text-center">
                                <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Demo Credentials</p>
                                <p className="text-sm font-body text-gray-700"><strong>Login:</strong> admin@gmail.com</p>
                                <p className="text-sm font-body text-gray-700"><strong>Password:</strong> admin</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 mt-4 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-title font-bold text-sm uppercase tracking-widest text-white hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center mt-8 text-xs font-body font-bold text-gray-400 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Build 2 Last
                </p>
            </motion.div>
        </div>
    );
};
