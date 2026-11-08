// Shared types and constants

export interface Nation {
  id: string;
  name: string;
  color: [number, number, number];
  ideology: Ideology;
  politicalPower: number;
  stability: number;
  warSupport: number;
  money: number;
  resources: Record<string, number>;
}

export interface Province {
  id: number;
  name: string;
  owner: string;
  terrain: TerrainType;
  infrastructure: number;
  resources: Record<string, number>;
}

export interface Division {
  id: string;
  name: string;
  templateId: string;
  strength: number;
  organization: number;
  provinceId: number;
}

export enum Ideology {
  Democratic = 'democratic',
  Fascist = 'fascist',
  Communist = 'communist',
  NonAligned = 'non_aligned',
}

export enum TerrainType {
  Plains = 'plains',
  Forest = 'forest',
  Mountains = 'mountains',
  Desert = 'desert',
  Jungle = 'jungle',
  Urban = 'urban',
  Ocean = 'ocean',
}

export const COLORS = {
  axis: { primary: '#808080', secondary: '#9c9c9c' },
  allies: { primary: '#1e4b8a', secondary: '#3b6fd9' },
  komintern: { primary: '#b91c1c', secondary: '#dc2626' },
  neutral: { primary: '#4b5563', secondary: '#6b7280' },
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
};

export const TERRAIN_COLORS = {
  plains: '#8b7355',
  forest: '#2d5a27',
  mountains: '#6b7280',
  desert: '#c2b280',
  jungle: '#1a4d1a',
  urban: '#78716c',
  ocean: '#1e3a5f',
};
