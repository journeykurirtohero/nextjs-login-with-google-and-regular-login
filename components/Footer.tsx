//components/Footer
'use client';

import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-2 px-4 bg-blue-950 text-gray-300 shadow-md text-sm">
      <div className="text-center flex items-center justify-center">
        <p>
          &copy; 2024 Your App Name. All rights reserved. Made with <FaHeart className="inline text-red-500 mx-1" />
        </p>
      </div>
    </footer>
  );
}