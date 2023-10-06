"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "components/ui/use-toast";
import { useParams } from "next/navigation";

const formSchema = z.object({
  cihazAdi: z
    .string()
    .min(1, {
      message: "Boş bırakılamaz",
    })
    .max(25, {
      message: "25 karakterden fazla olamaz",
    }),
  cihazicerik: z.string().min(1, {
    message: "Boş bırakılamaz.",
  }),
});
const EditPage = () => {
  const { toast } = useToast();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cihazAdi: "",
      cihazicerik: "",
    },
  });
  useEffect(() => {
    axios.post(`/api/getTask`, { id: params.idNumber }).then((res) => {
      console.log(res.data);
      form.setValue("cihazAdi", res.data.cihazAdi);
      form.setValue("cihazicerik", res.data.cihazicerik);
    });
  }, []);

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .put("/api/updateTask", {
        id: params.idNumber,
        cihazAdi: data.cihazAdi,
        cihazicerik: data.cihazicerik,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          form.reset();
          toast({
            title: "Veriler Başarıyla Güncellendi",
          });
        }
        if (res.status === 500) {
          toast({
            variant: "destructive",
            title: "Veriler Güncellenirken Bir Hata Oluştu",
          });
        }
      });

    console.log(data);
  }
  return (
    <>
      <div className=" flex justify-center items-center flex-col ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex items-center flex-col w-full "
          >
            <div className="flex w-full">
              <FormField
                control={form.control}
                name="cihazAdi"
                render={({ field }) => (
                  <FormItem className="w-1/3 m-2">
                    <FormLabel>Cihaz Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Görev Adı" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cihazicerik"
                render={({ field }) => (
                  <FormItem className="w-2/3 m-2">
                    <FormLabel>Cihaz içeriği</FormLabel>
                    <FormControl>
                      <Input placeholder="Görev detay" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <Button type="submit">Kaydet</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditPage;
