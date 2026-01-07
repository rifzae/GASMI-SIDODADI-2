
export interface Member {
  id: string;
  name: string;
  pob: string; // Place of Birth
  dob: string; // Date of Birth
  parentNames: string;
  joinYear: number;
  photoUrl: string;
  bio?: string;
}

export interface AdminState {
  isLoggedIn: boolean;
  username: string | null;
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST'
}
