
import React, { useState, useEffect, useMemo } from 'react';
import { Member, AdminState } from './types';
import { INITIAL_MEMBERS, ADMIN_CREDENTIALS } from './constants';
import MemberCard from './components/MemberCard';
import MemberForm from './components/MemberForm';
import { 
  Users, 
  Search, 
  Plus, 
  LogIn, 
  LogOut, 
  Database, 
  LayoutGrid, 
  List, 
  ShieldCheck,
  Info,
  TrendingUp
} from 'lucide-react';

const App: React.FC = () => {
  // State
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [admin, setAdmin] = useState<AdminState>({ isLoggedIn: false, username: null });
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  // Initialization
  useEffect(() => {
    const savedMembers = localStorage.getItem('members');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers(INITIAL_MEMBERS);
    }

    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  // Save to storage
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('admin', JSON.stringify(admin));
  }, [admin]);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === ADMIN_CREDENTIALS.username && loginData.password === ADMIN_CREDENTIALS.password) {
      setAdmin({ isLoggedIn: true, username: loginData.username });
      setShowLogin(false);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setAdmin({ isLoggedIn: false, username: null });
  };

  const handleSaveMember = (member: Member) => {
    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === member.id ? member : m));
    } else {
      setMembers(prev => [...prev, member]);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const filteredMembers = useMemo(() => {
    return members.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.pob.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.joinYear.toString().includes(searchQuery)
    );
  }, [members, searchQuery]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2.5 rounded-2xl shadow-lg shadow-green-100">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Anggota Gasmi Sidodadi</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pusat Data Terpadu</p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari nama, kota, atau tahun..."
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-green-500 rounded-2xl outline-none transition-all text-sm border focus:ring-4 focus:ring-green-50"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {admin.isLoggedIn ? (
                <>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95 text-sm"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Tambah</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                    title="Keluar"
                  >
                    <LogOut size={22} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 text-green-700 bg-green-50 hover:bg-green-100 px-5 py-2.5 rounded-2xl font-bold transition-all active:scale-95 text-sm"
                >
                  <LogIn size={18} />
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama, kota, atau tahun..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-50 transition-all text-sm"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Overview Section */}
        <section className="mb-10">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={18} className="text-green-600" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Statistik Keanggotaan</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2 leading-tight">Ringkasan Organisasi</h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  Selamat datang di portal database resmi <span className="font-bold text-slate-800">Gasmi Sidodadi</span>. 
                  Saat ini terdapat total <span className="font-bold text-green-600">{members.length} anggota</span> yang terdaftar dalam sistem.
                </p>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="text-center px-4">
                  <div className="text-2xl font-black text-slate-800">{members.length}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Total</div>
                </div>
                <div className="w-[1px] h-8 bg-slate-200"></div>
                <div className="text-center px-4">
                  <div className="text-2xl font-black text-slate-800">
                    {members.filter(m => m.joinYear === new Date().getFullYear()).length}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Tahun Ini</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* List Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-800">Daftar Anggota</h3>
            <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">{filteredMembers.length}</span>
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button className="p-2 bg-green-50 text-green-600 rounded-lg"><LayoutGrid size={18}/></button>
            <button className="p-2 text-slate-400 hover:text-slate-600"><List size={18}/></button>
          </div>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map(member => (
              <MemberCard 
                key={member.id}
                member={member}
                isAdmin={admin.isLoggedIn}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
                onGenerateBio={() => {}} // No-op as AI is removed
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <Database size={40} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-1">Tidak Ada Data</h4>
            <p className="text-slate-500 max-w-xs">Kami tidak dapat menemukan data anggota dengan kriteria pencarian tersebut.</p>
          </div>
        )}
      </main>

      {/* Modals */}
      {showForm && (
        <MemberForm 
          member={editingMember}
          onSave={handleSaveMember}
          onClose={() => { setShowForm(false); setEditingMember(null); }}
        />
      )}

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-4 bg-green-50 text-green-600 rounded-2xl mb-2">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Admin Login</h2>
              <p className="text-sm text-slate-500">Gunakan kredensial pengelola untuk mengakses mode edit.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all"
                  value={loginData.username}
                  onChange={e => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-50 focus:border-green-500 outline-none transition-all"
                  value={loginData.password}
                  onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-xl shadow-green-100 transition-all active:scale-95"
                >
                  Masuk Sekarang
                </button>
              </div>
            </form>
            
            <button 
              onClick={() => setShowLogin(false)}
              className="w-full text-center text-sm font-medium text-slate-400 hover:text-slate-600"
            >
              Kembali ke Beranda
            </button>

            <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3">
              <Info className="text-slate-400 shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
                Hint: admin / password123
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="mt-auto py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium">© 2024 Gasmi Sidodadi Database System. Dikembangkan untuk organisasi.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
