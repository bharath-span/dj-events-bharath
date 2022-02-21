import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';

function Notfound() {
  return (
    <Layout title='Page Not Found'>
        <div className={styles.error}>
            <h1>404</h1>
            <h4>Sorry, there is nothing here</h4>
            <Link href='/'>Back to Home</Link>
        </div>
    </Layout>
  )
}

export default Notfound