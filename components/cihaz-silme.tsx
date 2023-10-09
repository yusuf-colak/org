import React from 'react';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
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
const CihazSilmeButton = ({ idNumber, setList }) => {
  const { toast } = useToast();

  const handleDelete = async ({ idNumber }) => {
    await axios.delete(`/api/deleteDevice/${idNumber}`).then((res) => {
      setList(res.data);
      if (res.status == 200) {
        toast({
          title: 'Cihaz Başarıyla Silindi',
        });
      }
    });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>
            <Trash2 />
          </Button>
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

export default CihazSilmeButton;
