"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const TaskListPage = () => {
  const router = useRouter();

  const { toast } = useToast();
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    axios.get("/api/task").then((res) => {
      setTaskList(res.data);
    });
  }, []);
  const handleDelete = ({ idNumber }) => {
    axios
      .delete(`/api/deleteTask`, {
        data: {
          id: idNumber,
        },
      })
      .then((res) => {
        setTaskList(res.data);
        if (res.status == 200) {
          toast({
            title: "Cihaz Başarıyla Silindi",
          });
        }
      });
  };
  const handleDuzenle = ({ idNumber }) => {
    router.push(`/editTask/${idNumber}`);
  };
  return (
    <>
      <Table className="w-full">
        <TableCaption>Cihaz Listesi.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[230px]">Cihaz Adı</TableHead>
            <TableHead>Cihaz İçerik</TableHead>
            <TableHead className="w-[260px] text-center">Sil</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskList.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.cihazAdi}</TableCell>
              <TableCell>{task.cihazicerik}</TableCell>
              <TableCell className="w-[260px] text-center">
                <Button
                  className="mr-2"
                  onClick={() => {
                    handleDelete({ idNumber: task.id });
                  }}
                >
                  Görevi Sil
                </Button>
                <Button
                  onClick={() => {
                    handleDuzenle({ idNumber: task.id });
                  }}
                >
                  Düzenle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TaskListPage;
