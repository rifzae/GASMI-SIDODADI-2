
import React, { useState, useEffect } from 'react';
import { Member } from '../types';
import { X, Camera, Upload } from 'lucide-react';

interface MemberFormProps {
  member?: Member | null;
  onSave: (member: Member) => void;
  onClose: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ member, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    name: '',
    pob: '',
    dob: '',
    parentNames: '',
    joinYear: new Date().getFullYear(),
    photoUrl: 'https://picsum.photos/400/400',
    bio: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        pob: member.pob,
        dob: member.dob,
        parentNames: member.parentNames,
        joinYear: member.joinYear,
        photoUrl: member.photoUrl,
        bio: member.bio || ''
      });
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: member?.id || Date.now().toString()
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
          <h2 className="text-2xl font-bold text-slate-800">{member ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
              <div className="w-40 h-40 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative">
                <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={32} />
                  <span className="text-xs font-medium mt-1">Ganti Foto</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-xs text-slate-500 text-center">Format: JPG, PNG, WEBP (Max 2MB)</p>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tempat Lahir</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.pob}
                    onChange={e => setFormData(prev => ({ ...prev, pob: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.dob}
                    onChange={e => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Orang Tua</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ayah & Ibu"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.parentNames}
                  onChange={e => setFormData(prev => ({ ...prev, parentNames: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tahun Pengesahan</label>
                <input 
                  type="number" 
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.joinYear}
                  onChange={e => setFormData(prev => ({ ...prev, joinYear: parseInt(e.target.value) }))}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Batal
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberForm;
