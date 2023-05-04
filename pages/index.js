import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";



const express = require('express')
const api = express()
const PORT = 8080

//middleware that allows you to handle url encoded data
api.use(express.urlencoded({extended:false}))
//json middleware
api.use(express.json())

api.get('/', (req, res) => {
  res.send('Welcome to this awesome API')
})

const data = { test: "test"}

api.get('/test',(req, res)=>{
  res.status(200).json(data)
})


api.post('/promptResponse',(req, res)=>{
  console.log(req.body)
  const input = req.body
  console.log(retrievePromptResponse(locationInput))
  res.status(200).send('success')
})

api.listen(PORT, () => console.log(`API running`))



async function retrievePromptResponse(locationInput){
  const response = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location: locationInput }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw data.error || new Error(`Request failed with status ${response.status}`);
  }

  return data.result;
}


export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: locationInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
