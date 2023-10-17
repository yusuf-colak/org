'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
export type Payment = {
  id: string;
  cihazAdi: string;
  demirbasNo: string;
  marka: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    yazılısı: 'Cihaz Adı',
    accessorKey: 'cihazAdi',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cihaz Adı <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    yazılısı: 'Demirbaş No',
    accessorKey: 'demirbasNo',
    header: 'demirbasNo',
  },
  {
    yazılısı: 'Marka',
    accessorKey: 'marka',
    header: 'marka',
  },
  {
    yazılısı: 'Model',
    accessorKey: 'model',
    header: 'model',
  },
  {
    yazılısı: 'Seri No',
    accessorKey: 'seriNo',
    header: 'seriNo',
  },
  {
    yazılısı: 'Üretim Yılı',
    accessorKey: 'uretimYili',
    header: 'uretimYili',
  },
  {
    yazılısı: 'Mülkiyet Durumu',
    accessorKey: 'mulkiyetDurumu',
    header: 'mulkiyetDurumu',
  },
  {
    yazılısı: 'Kategori',
    accessorKey: 'kat',
    header: 'kat',
  },

  {
    yazılısı: 'Bölüm',
    accessorKey: 'bolum',
    header: 'bolum',
  },
  {
    yazılısı: 'Kalibrasyon Tarihi',
    accessorKey: 'kalibrasyonTarihi',
    header: () => <div>kalibrasyonTarihi</div>,
    cell: ({ row }) => {
      const kalibrasyonTarihi = row.getValue('kalibrasyonTarihi');

      const formattedKalibrasyonTarihi = kalibrasyonTarihi
        ? format(new Date(kalibrasyonTarihi), 'PPP', { locale: tr })
        : '';
      return <div>{formattedKalibrasyonTarihi}</div>;
    },
  },
  {
    yazılısı: 'Sonraki Kalibrasyon Tarihi',
    accessorKey: 'sonrakiKalibrasyonTarihi',
    header: () => <div>sonrakiKalibrasyonTarihi</div>,
    cell: ({ row }) => {
      const sonrakiKalibrasyonTarihi = row.getValue('sonrakiKalibrasyonTarihi');

      const formattedKalibrasyonTarihiSonraki = sonrakiKalibrasyonTarihi
        ? format(new Date(sonrakiKalibrasyonTarihi), 'PPP', { locale: tr })
        : '';
      return <div>{formattedKalibrasyonTarihiSonraki}</div>;
    },
  },
  {
    yazılısı: 'PDF URL',
    accessorKey: 'pdfURL',
    header: 'pdfURL',
  },
  {
    yazılısı: 'Son Güncelleme Tarihi',
    accessorKey: 'sonGuncellemeTarihi',
    header: () => <div>sonGuncellemeTarihi</div>,
    cell: ({ row }) => {
      const sonGuncellemeTarihi = row.getValue('sonGuncellemeTarihi');

      const formattedKalibrasyonTarihiSon = sonGuncellemeTarihi
        ? format(new Date(sonGuncellemeTarihi), 'PPP', { locale: tr })
        : '';
      return <div>{formattedKalibrasyonTarihiSon}</div>;
    },
  },
];
