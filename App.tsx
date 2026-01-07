import React, { useState, useEffect } from 'react';
import { Member } from './types';
import MemberCard from './components/MemberCard';
import MemberForm from './components/MemberForm';
import Login from './components/Login'; // Import Login

// Data dummy awal jika kosong
const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Ahmad Santoso', age: 25, address: 'Jl. Mawar No. 10', joinDate: '2023-01-15', status: 'Aktif', category: 'Dewasa' },
  { id: '2', name: 'Budi Raharjo', age: 17, address: 'Jl. Melati No. 5', joinDate: '2023-05-20', status: 'Aktif', category: 'Remaja' },
];

function App() {
  // --- STATE LOGIN ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('gasmi_login') === 'true';
  });

  // --- STATE ANGGOTA ---
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('gasmi_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    localStorage.setItem('gasmi_members', JSON.stringify(members));
  }, [members]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('gasmi_login');
    setIsAuthenticated(false);
  };

  // CRUD Functions
  const handleAddMember = (member: Member) => {
    setMembers([member, ...members]);
    setIsFormOpen(false);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers(members.map(m => m.id === updatedMember.id ? updatedMember : m));
    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Yakin ingin menghapus anggota ini?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  // --- RENDER ---

  // 1. Jika belum login, tampilkan halaman Login
  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  // 2. Jika sudah login, tampilkan Dashboard GASMI
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white text-red-700 p-2 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              G
            </div>
            <h1 className="text-xl font-bold tracking-wide">GASMI SIDODADI</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm bg-red-800 hover:bg-red-900 px-4 py-2 rounded-lg transition"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Data Anggota</h2>
            <p className="text-slate-500">Total: {members.length} Anggota</p>
          </div>
          <button 
            onClick={() => { setEditingMember(null); setIsFormOpen(true); }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <i className="fa-solid fa-plus"></i> Tambah Anggota
          </button>
        </div>

        {/* List Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map(member => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onEdit={handleEditClick}
              onDelete={handleDeleteMember}
            />
          ))}
          {members.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              Belum ada data anggota.
            </div>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {isFormOpen && (
        <MemberForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={editingMember ? handleUpdateMember : handleAddMember}
          initialData={editingMember || undefined}
        />
      )}
    </div>
  );
}

export default App;
