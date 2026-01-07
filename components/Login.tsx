import React, { useState } from 'react';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password sederhana: "gasmi123"
    if (password === 'gasmi123') {
      localStorage.setItem('gasmi_login', 'true');
      onLogin(true);
    } else {
      setError('Password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Admin GASMI</h1>
          <p className="text-sm text-slate-500">Masukkan password untuk akses data</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
            placeholder="Password..."
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
