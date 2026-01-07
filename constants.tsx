
import { Member } from './types';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Ahmad Subarjo',
    pob: 'Jakarta',
    dob: '1990-05-15',
    parentNames: 'Budi & Siti',
    joinYear: 2015,
    photoUrl: 'https://picsum.photos/seed/ahmad/400/400',
    bio: 'Anggota senior aktif sejak 2015.'
  },
  {
    id: '2',
    name: 'Lestari Putri',
    pob: 'Bandung',
    dob: '1995-08-22',
    parentNames: 'Agus & Linda',
    joinYear: 2018,
    photoUrl: 'https://picsum.photos/seed/lestari/400/400',
    bio: 'Koordinator wilayah Jawa Barat.'
  }
];

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};
