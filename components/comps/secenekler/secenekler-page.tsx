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
import BolumSilmeButton from 'components/comps/secenekler/secenekler-silme-butonu';
import BolumGuncellemeSayfasi from 'components/comps/secenekler/secenekler-guncelleme-butonu';

const formSchema = z.object({
  bolumValue: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
});

const Secenekler_Dashboard_Page = ({ valueNameId }) => {
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
    axios.get(`/api/secenekler/getSecenekler/${valueNameId}`).then((res) => {
      setList(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    axios
      .post('/api/secenekler/addSecenekler', {
        value: data.bolumValue,
        valueName: valueNameId,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast({
            title: 'Bölün Başarıyla Eklendi',
            description: `Eklenen ${valueNameId}: ${data.bolumValue}`,
          });
          form.reset();
          setList(res.data);
        }
        if (res.status != 200 ) {
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
                  <FormLabel>
                    {valueNameId == 'Bölüm' && 'Bölüm Adı'}
                    {valueNameId == 'Kat' && 'Kat'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        (valueNameId == 'Bölüm' && 'Bölüm Adı') ||
                        (valueNameId == 'Kat' && 'Kat Giriniz')
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">{valueNameId} Ekle</Button>
        </form>
      </Form>

      <hr className="m-3 w-full" />

      <div>
        <Table className="w-full h-[350px] ">
          <TableCaption>{valueNameId} Listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[230px]">{valueNameId}</TableHead>
              <TableHead className="text-center">Sil / Düzenle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-[300px]">
            {list.map((secenekler) => (
              <TableRow key={secenekler.id}>
                <TableCell>{secenekler.value}</TableCell>
                <TableCell className="flex justify-center text-center">
                  <BolumSilmeButton
                    valueNameId={valueNameId}
                    idNumber={secenekler.id}
                    setList={setList}
                    value={secenekler.value}
                  />

                  <BolumGuncellemeSayfasi
                    valueNameId={valueNameId}
                    setList={setList}
                    value={secenekler.value}
                    bolumId={secenekler.id}
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

export default Secenekler_Dashboard_Page;
