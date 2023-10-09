'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { FileEdit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const ListPage = () => {
  const router = useRouter();

  const { toast } = useToast();
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get('/api/device').then((res) => {
      setList(res.data);
    });
  }, []);
  const handleDelete = async ({ idNumber }) => {
    await axios.delete(`/api/deleteDevice/${idNumber}`).then((res) => {
      setList(res.data);
      if (res.status == 200) {
        toast({
          title: 'Cihaz Başarıyla Silindi',
        });
      }
    });
  };
  const handleDuzenle = ({ idNumber }) => {
    router.push(`/cihazDuzenle/${idNumber}`);
  };
  return (
    <>
      <Table className="w-full">
        <TableCaption>Cihaz Listesi.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Cihaz Adı</TableHead>
            <TableHead>Cihaz Demirbaş No</TableHead>
            <TableHead>Cihaz Markası</TableHead>
            <TableHead>Cihaz Seri No</TableHead>
            <TableHead>Cihazın Bulunduğu Bölüm</TableHead>
            <TableHead className="w-[260px] text-center">Sil/Düzenle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((cihaz) => (
            <TableRow key={cihaz.id}>
              <TableCell className="font-medium">
                <Link
                  className="hover:text-red-600 hover:underline hover:decoration-solid	"
                  href={`/cihaz/${cihaz.id}`}
                >
                  {' '}
                  {cihaz.cihazAdi}
                </Link>
              </TableCell>
              <TableCell>{cihaz.demirbasNo}</TableCell>
              <TableCell>{cihaz.marka}</TableCell>
              <TableCell>{cihaz.seriNo}</TableCell>
              <TableCell>{cihaz.bolum}</TableCell>
              <TableCell className="w-[260px] text-center">
                <Button
                  onClick={() => {
                    handleDelete({ idNumber: cihaz.id });
                  }}
                >
                  <Trash2 />
                </Button>
                <Button
                  onClick={() => {
                    handleDuzenle({ idNumber: cihaz.id });
                  }}
                >
                  <FileEdit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ListPage;
