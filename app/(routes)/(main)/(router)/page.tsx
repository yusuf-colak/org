'use client';
import NavMenu from 'components/comps/NavMenu/nav';
import CihazlarTablosu from 'components/comps/cihazlarTablo/cihazlarTablosu';
import ListPage from 'components/comps/iptal-edildi/cihaz-List';
import CihazEkleButton from 'components/comps/iptal-edildi/cihaz-ekle-button';

export default function Home() {
  return (
    <>
      {/* <CihazEkleButton />*/}

      <CihazlarTablosu />
      {/* <ListPage />*/}
    </>
  );
}
