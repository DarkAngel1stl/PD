import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>
      <Footer />
    </>
  );
};
