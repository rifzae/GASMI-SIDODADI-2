import React, { useState, useEffect } from 'react';
import { Member } from './types';
import MemberCard from './components/MemberCard';
import MemberForm from './components/MemberForm';
import Login from './components/Login';

const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Ahmad Santoso', age: 25, address: 'Jl. Mawar No. 10', joinDate: '2023-01-15', status: 'Aktif', category: 'Dewasa' },
  { id: '2', name: 'Budi Raharjo', age: 17, address: 'Jl. Melati No. 5', joinDate: '2023-05-20', status: 'Aktif', category: 'Remaja' },
];

function App() {
  // Status Login (Admin / Guest)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('gasmi_login') === 'true';
  });

  // State untuk Modal Login
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Data Anggota
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('gasmi_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    localStorage.setItem('gasmi_members', JSON.stringify(members));
  }, [members]);

  const handleLogout = () => {
    localStorage.removeItem('gasmi_login');
    setIsAdmin(false);
  };

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white text-red-700 p-2 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-md">
              G
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">GASMI SIDODADI</h1>
              <p className="text-xs text-red-100 opacity-90">Data Anggota Resmi</p>
            </div>
          </div>
          
          {/* Tombol Login / Logout */}
          {isAdmin ? (
            <button 
              onClick={handleLogout}
              className="text-sm bg-red-800 hover:bg-red-900 px-4 py-2 rounded-lg transition border border-red-600"
            >
              <i className="fa-solid fa-right-from-bracket mr-2"></i>Keluar
            </button>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-sm bg-white text-red-700 hover:bg-slate-100 px-4 py-2 rounded-lg transition font-semibold"
            >
              <i className="fa-solid fa-lock mr-2"></i>Login Admin
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Daftar Anggota</h2>
            <p className="text-slate-500">Total: {members.length} Anggota</p>
          </div>
          
          {/* Tombol Tambah HANYA jika Admin */}
          {isAdmin && (
            <button 
              onClick={() => { setEditingMember(null); setIsFormOpen(true); }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition animate-fadeIn"
            >
              <i className="fa-solid fa-plus"></i> Tambah Anggota
            </button>
          )}
        </div>

        {/* List Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map(member => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onEdit={handleEditClick}
              onDelete={handleDeleteMember}
              isAdmin={isAdmin} // Pass status admin ke Card
            />
          ))}
          
          {members.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              <i className="fa-solid fa-folder-open text-4xl mb-3 opacity-50"></i>
              <p>Belum ada data anggota.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form Tambah/Edit (Hanya muncul jika dipanggil) */}
      {isFormOpen && (
        <MemberForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={editingMember ? handleUpdateMember : handleAddMember}
          initialData={editingMember || undefined}
        />
      )}

      {/* Modal Login (Overlay) */}
      {isLoginOpen && (
        <Login 
          onLogin={(status) => { setIsAdmin(status); setIsLoginOpen(false); }}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
