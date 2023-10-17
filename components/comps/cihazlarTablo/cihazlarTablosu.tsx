'use client';
import { Payment, columns } from './columns';
import { DataTable } from './data-table';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

async function fetchData() {
  const { data } = await axios.get('http://localhost:4200/api/device');
  return data;
}

export default function CihazlarTablosu() {
  const [data, setData] = useState<Payment[]>([]);

  const getData = async () => {
    const result = await fetchData();
    setData(result);
  };

  useEffect(() => {
    getData(); 
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} getData={getData} />
    </div>
  );
}
