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
import { Input } from 'components/ui/input';
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from 'components/ui/use-toast';
import { useParams } from 'next/navigation';
import UploadPDF from 'components/upload-pdf';

const formSchema = z.object({
  cihazAdi: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  demirbasNo: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  marka: z.string(),
  model: z.string(),
  seriNo: z.string(),
  uretimYili: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  mulkiyetDurumu: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  kat: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  bolum: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  kalibrasyonTarihi: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
  sonrakiKalibrasyonTarihi: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
});
const EditPage = () => {
  const { toast } = useToast();
  const params = useParams();
  const [file, setFile] = useState([]);
  const [fileUpdated, setFileUpdated] = useState(false);
  const [pdfURL, setPdfURL] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cihazAdi: '',
      demirbasNo: '',
      marka: '',
      model: '',
      seriNo: '',
      uretimYili: '',
      mulkiyetDurumu: '',
      kat: '',
      bolum: '',
      kalibrasyonTarihi: '',
      sonrakiKalibrasyonTarihi: '',
    },
  });

  useEffect(() => {
    axios.post(`/api/getTask`, { id: params.idNumber }).then((res) => {
      console.log(res.data);
      form.setValue('cihazAdi', res.data.cihazAdi);
      form.setValue('demirbasNo', res.data.demirbasNo);
      form.setValue('marka', res.data.marka);
      form.setValue('model', res.data.model);
      form.setValue('seriNo', res.data.seriNo);
      form.setValue('uretimYili', res.data.uretimYili);
      form.setValue('mulkiyetDurumu', res.data.mulkiyetDurumu);
      form.setValue('kat', res.data.kat);
      form.setValue('bolum', res.data.bolum);
      form.setValue('kalibrasyonTarihi', res.data.kalibrasyonTarihi);
      form.setValue(
        'sonrakiKalibrasyonTarihi',
        res.data.sonrakiKalibrasyonTarihi
      );
      setPdfURL(res.data.pdfURL);
    });
  }, []);

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .put('/api/updateTask', {
        id: params.idNumber,
        cihazAdi: data.cihazAdi,
        demirbasNo: data.demirbasNo,
        marka: data.marka,
        model: data.model,
        seriNo: data.seriNo,
        uretimYili: data.uretimYili,
        mulkiyetDurumu: data.mulkiyetDurumu,
        kat: data.kat,
        bolum: data.bolum,
        kalibrasyonTarihi: data.kalibrasyonTarihi,
        sonrakiKalibrasyonTarihi: data.sonrakiKalibrasyonTarihi,
        pdfURL: file[0]?.url,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          form.reset();
          toast({
            title: 'Veriler Başarıyla Güncellendi',
          });
        }
        if (res.status === 500) {
          toast({
            variant: 'destructive',
            title: 'Veriler Güncellenirken Bir Hata Oluştu',
          });
        }
      });

    console.log(data);
  }
  return (
    <>
      <div className=" flex justify-center items-center flex-col pb-4  ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex w-[80%] items-center flex-col"
          >
            <div className="flex w-full flex-wrap justify-around">
              <FormField
                control={form.control}
                name="cihazAdi"
                render={({ field }) => (
                  <FormItem className="m-2 md:w-1/4 w-full min-w-[300px] ">
                    <FormLabel>Cihaz Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihaz Adı" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="demirbasNo"
                render={({ field }) => (
                  <FormItem className="m-2 md:w-1/4 w-full min-w-[300px] ">
                    <FormLabel>Cihaz Demirbaş No</FormLabel>
                    <FormControl>
                      <Input placeholder="Demirbaş No" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marka"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihaz markası</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihaz markası" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="model"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihaz modeli</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihaz modeli" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="seriNo"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihaz Seri No</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihaz Seri No" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="uretimYili"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihaz Üretim Yılı</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihaz Üretim Yılı" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="mulkiyetDurumu"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihaz Mülkiyet Durumu</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihaz Mülkiyet Durumu" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kat"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihazın Bulunduğu Kat</FormLabel>
                    <FormControl>
                      <Input placeholder="Cihazın Bulunduğu Kat" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="bolum"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihazın Bulunduğu Bölüm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cihazın Bulunduğu Bölüm<"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="kalibrasyonTarihi"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>
                      Cihazın kalibrasyonunun yapıldığı tarih
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cihazın kalibrasyonunun yapıldığı tarih"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="sonrakiKalibrasyonTarihi"
                render={({ field }) => (
                  <FormItem className=" m-2 md:w-1/4 w-full min-w-[300px]">
                    <FormLabel>Cihazın Sonraki kalibrasyon tarihi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cihazın Sonraki kalibrasyon tarihi"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <UploadPDF setFile={setFile} setFileUpdated={setFileUpdated} />
            <a
              href={pdfURL == '' ? file[0]?.url : pdfURL}
              target="_blank"
              className="underline decoration-solid text-orange-600"
            >
              {file[0]?.fileName || pdfURL}
            </a>
            <Button disabled={fileUpdated} type="submit">
              Kaydet
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditPage;
