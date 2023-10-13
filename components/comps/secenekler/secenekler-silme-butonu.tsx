import React from 'react';
import axios from 'axios';
import { useToast } from 'components/ui/use-toast';
import { Button } from 'components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'components/ui/alert-dialog';
const SeceneklerSilmeButton = ({ idNumber, setList, value ,valueNameId }) => {
  const { toast } = useToast();

  const handleDelete = async ({ idNumber }) => {
    await axios
      .delete(`/api/secenekler/deleteSecenekler/${idNumber}`)
      .then((res) => {
        setList(res.data);
        if (res.status == 200) {
          toast({
            title: `${valueNameId} Başarıyla Silindi`,
            description: `${valueNameId} :  ${value}`,
          });
        }
        if (res.status !== 200) {
          toast({
            title:`${valueNameId} Silinemedi!`,
            description: `${valueNameId} : ${value}`,
          });
        }
      });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="border-1 border rounded-full border-gray-800 p-1 hover:bg-gray-300">
          <Trash2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Silme işlemini onaylıyor musunuz ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete({ idNumber });
              }}
            >
              Evet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SeceneklerSilmeButton;
