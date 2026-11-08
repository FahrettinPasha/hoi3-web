import React, { useEffect, useState } from 'react';
import { gameApi, Nation } from './api/gameApi';
import Map from './components/Map';

function App() {
  const [nations, setNations] = useState<Nation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNation, setSelectedNation] = useState<string | null>(null);

  useEffect(() => {
    gameApi.getNations().then(data => {
      setNations(data);
      setLoading(false);
    });
  }, []);

  const handleAdvanceDay = async () => {
    await gameApi.advanceDay();
    const updated = await gameApi.getNations();
    setNations(updated);
  };

  const handleNationSelect = (nationId: string) => {
    setSelectedNation(nationId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const selectedNationData = nations.find(n => n.id === selectedNation);

  return (
    <div className="app" style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '10px 20px', backgroundColor: '#1e293b', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Operation Europa</h1>
        <div>
          <button onClick={handleAdvanceDay} style={{ padding: '8px 16px', cursor: 'pointer', marginRight: '10px' }}>
            Advance Day
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1 }}>
          <Map selectedNation={selectedNation} onNationSelect={handleNationSelect} />
        </div>
        
        <div style={{ width: '300px', padding: '20px', backgroundColor: '#1e293b', color: 'white', overflowY: 'auto' }}>
          <h2>Nations</h2>
          {nations.map(nation => (
            <div 
              key={nation.id} 
              onClick={() => handleNationSelect(nation.id)}
              style={{ 
                padding: '10px', 
                margin: '5px 0', 
                border: '1px solid #475569',
                cursor: 'pointer',
                backgroundColor: selectedNation === nation.id ? '#334155' : 'transparent'
              }}
            >
              <h3 style={{ margin: '0 0 5px 0' }}>{nation.name}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Money: ${nation.money.toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Political Power: {nation.politicalPower}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Stability: {nation.stability}%</p>
              <p style={{ margin: '0', fontSize: '14px' }}>War Support: {nation.warSupport}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
