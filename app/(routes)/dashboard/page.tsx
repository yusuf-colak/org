'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from 'components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';

import { Input } from 'components/ui/input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from 'components/ui/use-toast';
import BolumSilmeButton from 'components/comps/bolum/bolum-silme-butonu';
import BolumGuncellemeSayfasi from 'components/comps/bolum/bolum-guncelleme-butonu';

const formSchema = z.object({
  bolumValue: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
});

const Dashboard = () => {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bolumValue: '',
    },
  });

  useEffect(() => {
    axios.get('/api/bolum/getBolum').then((res) => {
      setList(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    axios
      .post('/api/bolum/addBolum', {
        bolumAdi: data.bolumValue,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast({
            title: 'Bölün Başarıyla Eklendi',
          });
          form.reset();
          setList(res.data);
        }
        if (res.status === 500) {
          toast({
            variant: 'destructive',
            title: 'Bölün Eklenirken Bir Hata Oluştu',
          });
        }
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex w-[80%] items-center flex-col"
        >
          <div className="flex w-full flex-wrap justify-around">
            <FormField
              control={form.control}
              name="bolumValue"
              render={({ field }) => (
                <FormItem className="m-2 md:w-1/4 w-full min-w-[300px]">
                  <FormLabel>Bölüm Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Bölüm Adı" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Bölüm ekle</Button>
        </form>
      </Form>

      <hr className="m-3 w-full" />

      <div>
        <Table className="w-full">
          <TableCaption>Bölün Listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[230px]">Bölün Adı</TableHead>
              <TableHead className="text-center">Sil / Düzenle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((bolum) => (
              <TableRow key={bolum.id}>
                <TableCell>{bolum.bolumAdi}</TableCell>
                <TableCell className="flex justify-center text-center">
                  <BolumSilmeButton
                    idNumber={bolum.id}
                    setList={setList}
                    bolumAdi={bolum.bolumAdi}
                  />

                  <BolumGuncellemeSayfasi
                    setList={setList}
                    bolumAdi={bolum.bolumAdi}
                    bolumId={bolum.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
