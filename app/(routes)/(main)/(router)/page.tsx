'use client';
import ListPage from 'components/comps/main-page-coms/cihaz-List';
import CihazEkleButton from 'components/comps/main-page-coms/cihaz-ekle-button';

export default function Home() {
  return (
    <>
      <CihazEkleButton />
      <hr className="mb-3" />
      <ListPage />
    </>
  );
}
