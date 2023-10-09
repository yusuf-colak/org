'use client';
import { FormPage } from 'components/form-page';
import { Button } from 'components/ui/button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

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
        <div className="flex pb-4">
          <p className="flex items-center text-xl mr-4 font-normal text-[#0b0b0b]">
            Yönlendirme:
          </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={!yonlendir}
              onChange={handleToggleOnOff}
            />
            <div className="slider">
              <span>Açık</span>
              <span>Kapalı</span>
            </div>
          </label>
        </div>
      </div>
      <hr className="mb-3" />

      <FormPage yonlendir={yonlendir} />
    </main>
  );
};

export default AddDevicePage;
