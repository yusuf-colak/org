import { Toaster } from 'components/ui/toaster';
import './globals.css';
import NavMenu from 'components/comps/NavMenu/nav';

export const metadata = {
  title: 'Welcome to org',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex justify-center">
      <body className="w-[95%] pt-3">
        <main>
          <>
            <NavMenu />
            <hr className="mb-3" />
            {children}
          </>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
