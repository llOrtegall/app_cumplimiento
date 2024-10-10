import {  Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Toaster } from "sonner";

function Root() {
  return (
    <section className='flex'>
      <nav className='border-r px-2 py-4 flex flex-col items-center gap-6'>
        <NavBar />
      </nav>
      <main className='w-full'>
        <Outlet />
      </main>
      <Toaster position="top-right" duration={5000} visibleToasts={4} />
    </section>
  )
}

export default Root;