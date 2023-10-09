'use client';
import ListPage from 'components/cihaz-List';
import CihazEkleButton from 'components/cihaz-ekle-button';

export default function Home() {
  return (
    <>
      <CihazEkleButton />
      <hr className="mb-3" />
      <ListPage />
    </>
  );
}
