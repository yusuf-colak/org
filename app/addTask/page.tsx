"use client";
import { FormPage } from "components/form-page";
import { Button } from "components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const AddTaskPage = () => {
  const router = useRouter();
  return (
    <main>
      <Button
        onClick={() => {
          router.push("/");
        }}
      >
         Anasayfa
      </Button>
      <FormPage />
    </main>
  );
};

export default AddTaskPage;
