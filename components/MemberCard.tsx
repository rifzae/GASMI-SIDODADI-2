
import React from 'react';
import { Member } from '../types';
import { MapPin, Users, Award, Edit, Trash2 } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  isAdmin: boolean;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  onGenerateBio: (member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 bg-slate-100">
        <img 
          src={member.photoUrl} 
          alt={member.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {member.joinYear}
        </div>
        {isAdmin && (
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(member)}
              className="p-2 bg-white/90 backdrop-blur text-green-600 rounded-lg hover:bg-white shadow-sm"
              title="Edit Data"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDelete(member.id)}
              className="p-2 bg-white/90 backdrop-blur text-red-600 rounded-lg hover:bg-white shadow-sm"
              title="Hapus Data"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
        <p className="text-sm text-green-600 font-medium mb-4 flex items-center gap-1">
          <Award size={14} /> Anggota Terdaftar
        </p>
        
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <MapPin size={16} />
            </div>
            <span>{member.pob}, {new Date(member.dob).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <Users size={16} />
            </div>
            <span><span className="font-medium">Ortu:</span> {member.parentNames}</span>
          </div>
        </div>

        {member.bio && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs italic text-slate-500 line-clamp-3">"{member.bio}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
