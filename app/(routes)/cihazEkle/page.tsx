'use client';
import { FormPage } from 'components/form-page';
import { Button } from 'components/ui/button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Switch } from 'components/ui/switch';

const AddDevicePage = () => {
  const router = useRouter();
  const [yonlendir, setYonlendir] = useState(true);

  const handleToggleOnOff = () => {
    setYonlendir((prevOnOff) => !prevOnOff);
  };
  return (
    <main className="w-full">
      <div className="flex justify-between">
        <Button
          onClick={() => {
            router.push('/');
          }}
        >
          Anasayfa
        </Button>
        <div className="flex text-xl items-center">
          <p className="mr-2">Yönlendirme: </p>
          <Switch checked={yonlendir} onCheckedChange={handleToggleOnOff} />
        </div>
      </div>
      <hr className="mt-3" />

      <FormPage yonlendir={yonlendir} />
    </main>
  );
};

export default AddDevicePage;
