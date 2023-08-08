import styles from './index.module.css'
import sqlLogo from './assets/sql-logo.png'


import { useState } from 'react'


function App() {

  const [queryDescription, setQueryDescription] = useState('')
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const generatedQuery = await generateQuery();
    setSqlQuery(generatedQuery)
    
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription}),
    });

    const data = await response.json()
    return data.response.trim();
  } 


  return (
    <main className= {styles.main}>
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>


      <form onSubmit={onSubmit} className={styles["form-container"]}>
        <input 
          type='text'
          name='query-description'
          placeholder='Describe Your Query'
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input 
          type='submit'
          value='Generate Query' 
        />

        <div className={styles["result-container"]}>
          <pre>{sqlQuery}</pre>
        </div>
      </form>


    </main>
  )
}

export default App
