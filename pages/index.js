import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRutterLink } from 'react-rutter-link'
import axios from 'axios';
import React from 'react';

export default function Home() {
  const [dataFetched, setDataFetched] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const config = {
    publicKey: "YOUR_RUTTER_PUBLIC_KEY",
    onSuccess: (publicToken) => {
      // We call our NextJS backend API in pages/api/rutter.js
      // It exchanges the publicToken for an access_token and makes an API call to /orders/get
      setLoading(true);
      axios.post('/api/rutter', {
        publicToken
      }).then(response => {
        setDataFetched(response.data)
      }).catch(e => {
        console.error(e);
      }).finally(() => {
        setLoading(false)
      })
    }
  }
  const { open, ready, error } = useRutterLink(config);

  if (loading) {
    return (
      <div><div>Loading...</div></div>
    )
  }

  if (dataFetched) {
    return (
      <div className={styles.main}>
        <h1 className={styles.title}>
          Response from /orders/get
        </h1>
        <textarea style={{marginTop: 20}} name="" id="" cols="80" rows="40" value={JSON.stringify(dataFetched, null, 4)}></textarea>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://rutterapi.com">Rutter!</a>
        </h1>

        <div style={{ display: "flex", alignItems: "center"}} className={styles.description}>
          <div>
            Test out Rutter Link & API:
            {" "}
          </div>
          <div style={{ marginLeft: 8}}>
            <button style={{ margin: 'auto auto'}} onClick={() => {
              open()
            }}>Click here</button>
          </div>
        </div>
      </main>
    </div>
  )
}
