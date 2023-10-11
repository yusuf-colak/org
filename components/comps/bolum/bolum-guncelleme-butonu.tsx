import React from 'react';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from 'components/ui/form';
import { FileEdit } from 'lucide-react';
import { Input } from 'components/ui/input';
import { useToast } from 'components/ui/use-toast';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  bolumValue: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
});

const BolumGuncellemeSayfasi = ({ setList, bolumId, bolumAdi }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bolumValue: bolumAdi, // Set the default value to bolumAdi
    },
  });
  const handleDuzenle = () => {
    return (data) => {
      axios
        .put('/api/bolum/updateBolum', {
          bolumAdi: data.bolumValue,
          id: bolumId,
        })
        .then((res) => {
          form.reset();
          if (res.status === 200) {
            toast({
              title: 'Bölün Başarıyla Güncellendi',
            });
            setList(res.data);
          }
          if (res.status === 500) {
            form.reset();
            toast({
              variant: 'destructive',
              title: 'Bölün Güncellenirken Bir Hata Oluştu',
            });
          }
        });
    };
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="ml-1 border-1 border rounded-full border-gray-800 p-1 hover:bg-gray-300">
        <FileEdit />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bölüm adı değişikliği</AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleDuzenle())}>
                <div>
                  <FormField
                    control={form.control}
                    name="bolumValue"
                    render={({ field }) => (
                      <FormItem className="w-full min-w-[300px]">
                        <FormControl>
                          <Input placeholder="Bölüm Adı" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <AlertDialogAction type="submit">Güncelle</AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BolumGuncellemeSayfasi;
