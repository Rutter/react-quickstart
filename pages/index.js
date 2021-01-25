import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRutterLink } from "react-rutter-link";
import axios from "axios";
import React from "react";
import { Button, Spinner, Table, Form } from "react-bootstrap";

const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_RUTTER_PUBLIC_KEY || "RUTTER_PUBLIC_KEY";

async function fetchOrders(accessToken) {
  const result = await axios.post("/api/rutter-get-orders", {
    accessToken,
  });
  return result;
}

async function fetchProducts(accessToken) {
  const result = await axios.post("/api/rutter-get-products", {
    accessToken,
  });
  return result;
}

async function fetchCustomers(accessToken) {
  const result = await axios.post("/api/rutter-get-customers", {
    accessToken,
  });
  return result;
}

export default function Home() {
  const [dataFetched, setDataFetched] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState("");
  const [rutterConnected, setRutterConnected] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const config = {
    publicKey: PUBLIC_KEY,
    onSuccess: (publicToken) => {
      // We call our NextJS backend API in pages/api/rutter.js
      // It exchanges the publicToken for an access_token and makes an API call to /orders/get
      setLoading(true);
      axios
        // Calls handler method in pages/api/rutter.js
        .post("/api/rutter-exchange", {
          publicToken,
        })
        .then((response) => {
          const { data } = response;
          console.log(data);
          setAccessToken(data.accessToken);
          setRutterConnected(true);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
  const { open, ready, error } = useRutterLink(config);

  // Handler functions for API
  const handleGetOrders = async () => {
    setDataFetched(null);
    setLoading(true);
    try {
      const orders = await fetchOrders(accessToken);
      setDataFetched(orders);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGetProducts = async () => {
    setDataFetched(null);
    setLoading(true);
    try {
      const products = await fetchProducts(accessToken);
      setDataFetched(products);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGetCustomers = async () => {
    setDataFetched(null);
    setLoading(true);
    try {
      const customers = await fetchCustomers(accessToken);
      setDataFetched(customers);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !rutterConnected) {
    return (
      <div>
        <Spinner animation="border"></Spinner>
      </div>
    );
  }

  if (rutterConnected) {
    // Show Endpoints and actions
    return (
      <div className={styles.main}>
        <div>Success! You have created a Rutter Connection.</div>
        <div>access_token: {accessToken}</div>
        <Table style={{ marginTop: 8 }} striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Endpoint</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td>/orders</td>
              <td>
                <Button onClick={handleGetOrders}>Send request</Button>
              </td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/products</td>
              <td>
                <Button onClick={handleGetProducts}>Send request</Button>
              </td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/customers</td>
              <td>
                <Button onClick={handleGetCustomers}>Send request</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        {loading && (
          <div>
            <Spinner animation="border"></Spinner>
          </div>
        )}
        {dataFetched != null && (
          <div style={{ marginTop: 4 }}>
            <Form.Control
              as="textarea"
              rows={40}
              cols={80}
              value={JSON.stringify(dataFetched, undefined, 4)}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rutter React Quickstart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://rutterapi.com">Rutter!</a>
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className={styles.description}
        >
          <div>Test out Rutter Link & API: </div>
          <Button style={{ marginTop: 4 }} onClick={() => open()}>
            Connect with Rutter
          </Button>
        </div>
      </main>
    </div>
  );
}
