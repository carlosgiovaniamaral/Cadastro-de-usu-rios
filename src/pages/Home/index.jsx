import './styles.css'
import Trash from '../../assets/lixeira.svg'
import api from '../../services/api'
import { useEffect, useState } from 'react'

function Home() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')

  async function getUsers() {
    const response = await api.get('/usuarios')
    setUsers(response.data)
  }

  async function createUser() {
    await api.post('/usuarios', { name, age, email })
    setName('')
    setAge('')
    setEmail('')
    getUsers()
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form onSubmit={(e) => {
        e.preventDefault()
        createUser()
      }}>
        <h1>Cadastro de Usuários</h1>
        <input
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
        />
        <input
          placeholder='Idade'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type='text'
        />
        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
        />
        <button type='submit'>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
