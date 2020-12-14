import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRutterLink } from 'react-rutter-link'

export default function Home() {
  const config = {
    publicKey: "YOUR_RUTTER_PUBLIC_KEY",
    onSuccess: () => {
      console.log("SUCCESS")
    }
  }
  const { open, ready, error } = useRutterLink(config);
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
            Test out Rutter Link & our endpoints:
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
