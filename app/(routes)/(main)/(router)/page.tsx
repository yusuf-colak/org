'use client';
import { Button } from 'components/ui/button';
import ListPage from 'components/cihaz-List';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/cihazEkle`);
  };
  return (
    <>
      <Button onClick={() => handleClick()}>
        <Plus /> Yeni Cihaz Ekle
      </Button>
      <ListPage />
    </>
  );
}
