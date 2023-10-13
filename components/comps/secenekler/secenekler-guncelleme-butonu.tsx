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
  value: z.string().min(1, {
    message: 'Boş bırakılamaz',
  }),
});

const SeceneklerGuncellemeSayfasi = ({
  setList,
  bolumId,
  value,
  valueNameId,
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: value, // Set the default value to bolumAdi
    },
  });
  const handleDuzenle = () => {
    return (data) => {
      axios
        .put('/api/secenekler/updateSecenekler', {
          value: data.value,
          id: bolumId,
          valueName: valueNameId,
        })
        .then((res) => {
          form.reset();
          if (res.status === 200) {
            toast({
              title: `${valueNameId} Başarıyla Güncellendi`,
            });
            setList(res.data);
          }
          if (res.status === 500) {
            form.reset();
            toast({
              variant: 'destructive',
              title: `${valueNameId} Güncellenirken Bir Hata Oluştu`,
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
                    name="value"
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

export default SeceneklerGuncellemeSayfasi;
