import { LayoutGrid, Users, ClipboardCheck, Settings, Search, Bell, LogOut, Shield, ChevronRight, ChevronLeft, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab, isExpanded, setIsExpanded }) => {
    const { user, logout } = useAuth();

    const menuItems = [
        { id: 'pipeline', icon: LayoutGrid, label: 'Pipeline' },
        { id: 'clients', icon: Users, label: 'Clients' },
        { id: 'checklists', icon: ClipboardCheck, label: 'Checklists' },
        { id: 'pricing', icon: DollarSign, label: 'Pricing' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        // Only show team management to admins
        ...(user?.role === 'admin' ? [{ id: 'team', icon: Shield, label: 'Team access' }] : []),
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-full bg-sidebar flex flex-col py-8 z-20 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20 md:w-24 items-center'}`}>
            <div className={`mb-10 px-4 flex items-center ${isExpanded ? 'justify-between' : 'justify-center w-full'}`}>
                <div className="flex items-center gap-3">
                    <img src="/built-2-last-logo-189w.png" alt="Logo" className={`${isExpanded ? 'w-10' : 'w-12'} h-auto transition-all shrink-0`} />
                    {isExpanded && (
                        <div className="flex flex-col">
                            <span className="text-white font-title font-bold text-lg leading-tight uppercase tracking-widest">Build 2</span>
                            <span className="text-primary font-title font-bold text-xs leading-none uppercase tracking-[0.2em]">Last</span>
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-4 px-4 w-full">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`p-3 rounded-xl transition-all duration-200 flex items-center gap-4 ${activeTab === item.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            } ${!isExpanded && 'justify-center'}`}
                    >
                        <item.icon size={isExpanded ? 24 : 28} className="shrink-0" />
                        {isExpanded && <span className="font-title font-bold text-[11px] uppercase tracking-widest whitespace-nowrap">{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-6 px-4 w-full">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-4 ${!isExpanded && 'justify-center'}`}
                >
                    {isExpanded ? <ChevronLeft size={isExpanded ? 24 : 28} className="shrink-0" /> : <ChevronRight size={isExpanded ? 24 : 28} className="shrink-0" />}
                    {isExpanded && <span className="font-title font-bold text-[11px] uppercase tracking-widest whitespace-nowrap">Collapse Menu</span>}
                </button>
                <button
                    onClick={logout}
                    className={`p-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-white/5 transition-colors flex items-center gap-4 ${!isExpanded && 'justify-center'}`}
                >
                    <LogOut size={isExpanded ? 24 : 28} className="shrink-0" />
                    {isExpanded && <span className="font-title font-bold text-[11px] uppercase tracking-widest whitespace-nowrap">Secure Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export const Header = ({ onSearch }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex-1 max-w-2xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search clients, jobs, or addresses..."
                        className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 h-12 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-body outline-none"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 ml-8">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-title font-bold text-gray-900 leading-tight uppercase">{user?.name || 'Unknown User'}</p>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">{user?.role || 'Guest'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-primary font-title font-bold uppercase">
                    {user?.name ? user.name.charAt(0) : '?'}
                </div>
            </div>
        </header>
    );
};
