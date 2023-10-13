import React from 'react';
import Secenekler_Main from 'components/comps/secenekler/secenekler-Main';
import { Button } from 'components/ui/button';

const Dashboard = () => {
  const secenekler = [{ valueNameId: 'Bölüm' }, { valueNameId: 'Kat' }];

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
