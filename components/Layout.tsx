//components/Layout
'use client';

import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;