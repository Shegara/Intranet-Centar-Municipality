import React, { Suspense, lazy } from "react";

const Navbar = lazy(() => import('@/app/components/navbar'));
const Search = lazy(() => import('@/app/components/search'));
const Footer = lazy(() => import('@/app/components/footer'));

const Imenik = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <div
        className="relative h-screen bg-custom-gradient"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full md:w-5/6 lg:w-3/4 xl:w-2/3">
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Imenik;
