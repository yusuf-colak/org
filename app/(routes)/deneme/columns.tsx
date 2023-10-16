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
    accessorKey: 'demirbasNo',
    header: 'demirbasNo',
  },
  {
    accessorKey: 'marka',
    header: 'marka',
  },
  {
    accessorKey: 'model',
    header: 'model',
  },
  {
    accessorKey: 'seriNo',
    header: 'seriNo',
  },
  {
    accessorKey: 'uretimYili',
    header: 'uretimYili',
  },
  {
    accessorKey: 'mulkiyetDurumu',
    header: 'mulkiyetDurumu',
  },
  {
    accessorKey: 'kat',
    header: 'kat',
  },

  {
    accessorKey: 'bolum',
    header: 'bolum',
  },
  {
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
    accessorKey: 'pdfURL',
    header: 'pdfURL',
  },
  {
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
