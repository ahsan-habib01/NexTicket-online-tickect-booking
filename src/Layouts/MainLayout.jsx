import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="">
        <Navbar></Navbar>
      </header>
      <main className="max-w-screen mx-auto w-full flex-1">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;