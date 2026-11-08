const API_BASE_URL = 'http://localhost:8888';

export interface Nation {
  id: string;
  name: string;
  color: [number, number, number];
  money: number;
  politicalPower: number;
  stability: number;
  warSupport: number;
}

export interface Province {
  id: number;
  name: string;
  owner: string;
  terrain: string;
  infrastructure: number;
}

export interface Division {
  id: string;
  name: string;
  templateId: string;
  strength: number;
  organization: number;
  provinceId: number;
}

export const gameApi = {
  async getNations(): Promise<Nation[]> {
    const response = await fetch(`${API_BASE_URL}/api/nations`);
    const data = await response.json();
    return data;
  },

  async getProvinces(): Promise<Province[]> {
    const response = await fetch(`${API_BASE_URL}/api/provinces`);
    const data = await response.json();
    return data;
  },

  async getDivisions(): Promise<Division[]> {
    const response = await fetch(`${API_BASE_URL}/api/divisions`);
    const data = await response.json();
    return data;
  },

  async advanceDay(): Promise<void> {
    await fetch(`${API_BASE_URL}/api/advance-day`, { method: 'POST' });
  },
};
