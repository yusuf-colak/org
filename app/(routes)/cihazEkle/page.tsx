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
      <div className="flex text-xl items-center justify-end">
        <p className="mr-2">Yönlendirme: </p>
        <Switch checked={yonlendir} onCheckedChange={handleToggleOnOff} />
      </div>
      <FormPage yonlendir={yonlendir} />
    </main>
  );
};

export default AddDevicePage;
