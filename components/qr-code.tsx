import React from 'react';
import { useQRCode } from 'next-qrcode';

const QRCodePage = () => {
  const { Image } = useQRCode();

  return (
    <Image
      text="https://github.com/Bunlong/next-qrcode"
      options={{
        errorCorrectionLevel: 'L',
        margin: 2,
        scale: 5,
        width: 150,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
};

export default QRCodePage;
