import React from 'react';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CihazEkleButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/cihazEkle`);
  };
  return (
    <div className="w-full flex justify-end">
      <Button className="mb-1" onClick={() => handleClick()}>
        <Plus /> Yeni Cihaz Ekle
      </Button>
    </div>
  );
};

export default CihazEkleButton;
