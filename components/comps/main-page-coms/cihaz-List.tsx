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
import Link from 'next/link';
import CihazSilmeButton from './cihaz-silme-button';
import CihazDuzenButton from './cihaz-duzen-button';
import { Input } from 'components/ui/input';

const ListPage = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get('/api/device').then((res) => {
      setList(res.data);
    });
  }, []);
  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value=""
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Table className="w-full">
        <TableCaption>Cihaz Listesi.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Cihaz Adı</TableHead>
            <TableHead>Cihaz Demirbaş No</TableHead>
            <TableHead>Cihaz Markası</TableHead>
            <TableHead>Cihaz Seri No</TableHead>
            <TableHead>Cihazın Bulunduğu Bölüm</TableHead>
            <TableHead className="w-[260px] text-center">
              Düzenle / Sil
            </TableHead>
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
                  {cihaz.cihazAdi}
                </Link>
              </TableCell>
              <TableCell>{cihaz.demirbasNo}</TableCell>
              <TableCell>{cihaz.marka}</TableCell>
              <TableCell>{cihaz.seriNo}</TableCell>
              <TableCell>{cihaz.bolum}</TableCell>
              <TableCell className="flex justify-center w-[260px] text-center ">
                <CihazDuzenButton
                  idNumber={cihaz.id}
                  cihaz={cihaz}
                  setList={setList}
                />
                <CihazSilmeButton idNumber={cihaz.id} setList={setList} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ListPage;
