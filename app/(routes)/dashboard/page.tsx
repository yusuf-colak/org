import React from 'react';
import Secenekler_Main from 'components/comps/secenekler/secenekler-Main';

const Dashboard = () => {
  const secenekler = [
    { valueNameId: 'Bölüm' },
    { valueNameId: 'Kat' },
    { valueNameId: 'Cihaz Mülkiyet Durumu' },
  ];

  return (
    <>
      {secenekler.map((secenek) => (
        <div>
          <Secenekler_Main valueNameId={secenek.valueNameId} />
        </div>
      ))}
    </>
  );
};

export default Dashboard;
