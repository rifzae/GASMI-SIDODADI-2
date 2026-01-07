import React from 'react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean; // <-- TAMBAHAN BARU
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 border border-slate-100 flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
        <div className="mt-2 space-y-1 text-sm text-slate-600">
          <p><i className="fa-solid fa-users w-6"></i> {member.category}</p>
          <p><i className="fa-solid fa-calendar w-6"></i> {member.age} Tahun</p>
          <p><i className="fa-solid fa-map-pin w-6"></i> {member.address}</p>
          <p><span className={`px-2 py-0.5 rounded text-xs font-semibold ${member.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{member.status}</span></p>
        </div>
      </div>
      
      {/* HANYA TAMPILKAN TOMBOL JIKA ADMIN */}
      {isAdmin && (
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(member)} 
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button 
            onClick={() => onDelete(member.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Hapus"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
