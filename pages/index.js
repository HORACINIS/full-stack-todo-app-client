import Head from "next/head";
import { useEffect, useState } from "react";
import Todos from "../components/Todos";
// import Image from "next/image";

export default function Home() {
  const TODOS_URL = 'api/v1/todos';
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTodos = async () => {
    try {
      const response = await fetch(TODOS_URL);
      const data = await response.json();
      setTodos(data.data.todos)
      setLoading(false);
      console.log(data.data.todos)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div>
        <h1>My todos</h1>
        {!loading && <Todos todos={todos} /> || <h3>Loading...</h3>}
      </div>
    </div>
  );
}
