import styles from './index.module.css'
import sqlLogo from './assets/sql-logo.png'


import { useState } from 'react'


function App() {

  const [queryDescription, setQueryDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted successfully: ",queryDescription)
  }


  return (
    <main className= {styles.main}>
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>


      <form onSubmit={onSubmit}>
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
      </form>


    </main>
  )
}

export default App
