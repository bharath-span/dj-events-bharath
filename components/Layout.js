import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import {useRouter} from 'next/router';
import styles from '../styles/Layout.module.css';

function Layout({title, description, keywords, children}) {
  const router = useRouter();

  return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header />

            {/* display only in Home */}
            {router.pathname === '/' && <Showcase />}

            <div className={styles.container}>
              {children}
            </div>
            <Footer />
        </div>
  )
}

export default Layout

Layout.defaultProps = {
  title: 'DJ Events',
  description: 'Find the latest DJ',
  keywords: 'music, dj, events'
}