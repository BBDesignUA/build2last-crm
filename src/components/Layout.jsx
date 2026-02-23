import { LayoutGrid, Users, ClipboardCheck, Settings, Search, Bell, LogOut } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'pipeline', icon: LayoutGrid, label: 'Pipeline' },
        { id: 'clients', icon: Users, label: 'Clients' },
        { id: 'checklist', icon: ClipboardCheck, label: 'JFC' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-20 md:w-24 bg-sidebar flex flex-col items-center py-8 z-20">
            <div className="mb-10 px-2">
                <img src="/built-2-last-logo-189w.png" alt="Logo" className="w-12 h-auto" />
            </div>

            <nav className="flex-1 flex flex-col gap-6">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`p-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon size={28} />
                        <span className="sr-only">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-6 border-t border-white/10 pt-6">
                <button className="text-gray-400 hover:text-primary transition-colors">
                    <LogOut size={24} />
                </button>
            </div>
        </aside>
    );
};

export const Header = ({ onSearch }) => {
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
                    <p className="text-sm font-title font-bold text-gray-900 leading-tight">BOHDAN B.</p>
                    <p className="text-xs text-gray-500 font-medium tracking-wide">ADMINISTRATOR</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-primary font-title font-bold">
                    BB
                </div>
            </div>
        </header>
    );
};
