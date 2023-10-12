'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const CihazSayfasi = () => {
  const [cihaz, setCihaz] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios.get(`/api/getDevice/${params.id} `).then((res) => {
      setCihaz(res.data);
      console.log(res.data);
    });
  }, []);
  const formattedKalibrasyonTarihi = cihaz.kalibrasyonTarihi
    ? format(new Date(cihaz.kalibrasyonTarihi), 'PPP', { locale: tr })
    : '';
  const formattedSonrakiKalibrasyonTarihi = cihaz.kalibrasyonTarihi
    ? format(new Date(cihaz.sonrakiKalibrasyonTarihi), 'PPP', { locale: tr })
    : '';
  return (
    <main>
      <div className="flex">
        <p className="pr-2">Cihaz Adı: </p>
        <p>{cihaz.cihazAdi}</p>
      </div>
      <div className="flex">
        <p className="pr-2">DemirBaş Numarası: </p>
        <p>{cihaz.demirbasNo}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Markası: </p>
        <p>{cihaz.marka}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Modeli: </p>
        <p>{cihaz.model}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Seri Numarası: </p>
        <p>{cihaz.seriNo}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Üretim Yılı: </p>
        <p>{cihaz.uretimYili}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Mülkiyet Durumu: </p>
        <p>{cihaz.mulkiyetDurumu}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Buluduğu Kat: </p>
        <p>{cihaz.kat}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Bulunduğu Bölüm: </p>
        <p>{cihaz.bolum}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Kalibrasyon Tarihi: </p>
        <p>{formattedKalibrasyonTarihi}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihazın Sonraki Kalibrasyon Tarihi: </p>
        <p>{formattedSonrakiKalibrasyonTarihi}</p>
      </div>
      <div className="flex">
        <p className="pr-2">Cihaza ait belge: </p>
        <a href={cihaz.pdfURL} target="_blank">
          Tıkayınız!
        </a>
      </div>
    </main>
  );
};

export default CihazSayfasi;
