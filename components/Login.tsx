import React, { useState } from 'react';

interface LoginProps {
  onLogin: (status: boolean) => void;
  onClose: () => void; // <-- TAMBAHAN BARU
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'gasmi123') {
      localStorage.setItem('gasmi_login', 'true');
      onLogin(true);
      onClose(); // Tutup modal setelah login sukses
    } else {
      setError('Password salah!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm relative animate-fadeIn">
        {/* Tombol Close (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Login Admin</h1>
          <p className="text-sm text-slate-500">Masuk untuk mengelola data</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
            placeholder="Password..."
            autoFocus
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
