import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminHeader = () => {
  const [logout, setLogout] = useState(false); // Controls logout menu visibility
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/login');
  };


  return (
    <header className="relative py-[25px] px-[5%] bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <Link href="/admin/blogs">
          <Image src="/assets/images/gtflogo-vector.svg" alt="Logo" width={150} height={60} />
        </Link>
        <div className='flex gap-2'>
          <Link href="/admin/categories" className='ml-1'>
            Categories
          </Link>
          <Link href="/admin/blogs" className='ml-1'>
            Blogs
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <h4 className='font-montserrat text-[var(--text-primary)] font-[600]'>Admin</h4>
          <div onClick={() => setLogout(!logout)} className="cursor-pointer">
            <Image src="/assets/icons/profile.webp" alt="Profile icon" width={25} height={25} />
          </div>
        </div>
        <div
          className={`${logout ? 'block' : 'hidden'
            } absolute z-[2] right-[10px] top-[100%] bg-white shadow-md w-[200px]  border-t-[2px] border-[var(--text-primary)]`}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 w-full hover:bg-[var(--background-primary)] font-montserrat"
            aria-label="Logout"
          >
            <Image src="/assets/icons/logout.webp" alt="Logout icon" width={18} height={25} />
            Logout
          </button>
        </div>
      </div>
    </header >
  );
};

export default AdminHeader;