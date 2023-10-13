'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToast } from 'components/ui/use-toast';
import UploadPDF from 'components/upload-pdf';
import { ScrollArea } from 'components/ui/scroll-area';
import { format, set } from 'date-fns';
import { tr } from 'date-fns/locale';
import { FileEdit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'components/ui/alert-dialog';
import { ComboboxForm } from '../comcobox';
import { DatePickerForm } from '../data-picker';
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
});

const CihazDuzenButton = ({ idNumber, cihaz, setList }) => {
  const { toast } = useToast();
  const [file, setFile] = useState([]);
  const [fileUpdated, setFileUpdated] = useState(false);
  const [pdfURL, setPdfURL] = useState('');
  const [kalibrasyonDate, setKalibrasyonDate] = useState<Date | undefined>();
  const [sonrakiKalibrasyonDate, setSonrakiKalibrasyonDate] = useState<
    Date | undefined
  >();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('cihazAdi', cihaz.cihazAdi);
    form.setValue('demirbasNo', cihaz.demirbasNo);
    form.setValue('marka', cihaz.marka);
    form.setValue('model', cihaz.model);
    form.setValue('seriNo', cihaz.seriNo);
    form.setValue('uretimYili', cihaz.uretimYili);
    form.setValue('mulkiyetDurumu', cihaz.mulkiyetDurumu);
    form.setValue('kat', cihaz.kat);
    form.setValue('bolum', cihaz.bolum);
    setKalibrasyonDate(cihaz.kalibrasyonTarihi);
    setSonrakiKalibrasyonDate(cihaz.sonrakiKalibrasyonTarihi);
    setPdfURL(cihaz.pdfURL);
  }, [cihaz]);
  console.log(cihaz.cihazAdi, 'kalibrasyonDate', kalibrasyonDate);
  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .put('/api/updateDevice', {
        id: idNumber,
        cihazAdi: data.cihazAdi,
        demirbasNo: data.demirbasNo,
        marka: data.marka,
        model: data.model,
        seriNo: data.seriNo,
        uretimYili: data.uretimYili,
        mulkiyetDurumu: data.mulkiyetDurumu,
        kat: data.kat,
        bolum: data.bolum,
        kalibrasyonTarihi: kalibrasyonDate,
        sonrakiKalibrasyonTarihi: sonrakiKalibrasyonDate,
        pdfURL: file[0]?.url,
      })
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setList(res.data);
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
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className=" mr-1 border-1 border rounded-full border-gray-800 p-1 hover:bg-gray-300">
          <FileEdit />
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[1300px] px-0">
          <ScrollArea className="lg:h-full h-screen py-4 ">
            <AlertDialogHeader>
              <AlertDialogTitle>Cihaz Bilgilerini Güncelle</AlertDialogTitle>
              <AlertDialogDescription>
                <div className=" flex justify-center items-center flex-col pb-1 px-1  ">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex w-[99%] items-center flex-col"
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
                                <Input
                                  placeholder="Cihaz Üretim Yılı"
                                  {...field}
                                />
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
                                <Input
                                  placeholder="Cihaz Mülkiyet Durumu"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <ComboboxForm
                          form={form}
                          name={'kat'}
                          valueNameId={'Kat'}
                        />
                        <ComboboxForm
                          form={form}
                          name={'bolum'}
                          valueNameId={'Bölüm'}
                        />
                        <DatePickerForm
                          kalibrasyonDate={kalibrasyonDate}
                          setKalibrasyonDate={setKalibrasyonDate}
                          name={'kalibrasyonTarihi'}
                          formLabel={'Cihazın kalibrasyonunun yapıldığı tarih'}
                        />
                        <DatePickerForm
                          sonrakiKalibrasyonDate={sonrakiKalibrasyonDate}
                          setSonrakiKalibrasyonDate={setSonrakiKalibrasyonDate}
                          name={'sonrakiKalibrasyonTarihi'}
                          formLabel={'Cihazın Sonraki kalibrasyon tarihi'}
                        />
                      </div>

                      <UploadPDF
                        setFile={setFile}
                        setFileUpdated={setFileUpdated}
                      />
                      <a
                        href={pdfURL == '' ? file[0]?.url : file[0]?.url}
                        target="_blank"
                        className="underline decoration-solid text-orange-600"
                      >
                        {file[0]?.fileName || pdfURL}
                      </a>
                      <div>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          className="ml-3"
                          type="submit"
                          disabled={fileUpdated}
                        >
                          Kaydet
                        </AlertDialogAction>
                      </div>
                    </form>
                  </Form>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CihazDuzenButton;
