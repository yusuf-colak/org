import React from 'react';
import Bolum_Dashboard_Page from 'components/comps/secenekler/secenekler-page';

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
import { XCircle } from 'lucide-react';
import { Button } from 'components/ui/button';
const Secenekler_Main = ({ valueNameId }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>{valueNameId} Düzenle</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="fixed right-0 border-0 hover:cursor-pointer">
          <XCircle color="red" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Bolum_Dashboard_Page valueNameId={valueNameId} />
          </AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Secenekler_Main;
