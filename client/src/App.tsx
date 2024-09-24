import { useState, useEffect } from 'react'
import { connect } from 'socket.io-client'

const socket = connect('http://localhost:4000')

function App() {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  console.log(import.meta.env.VITE_API_URL)

  // Unirse a una sala
  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  // Enviar mensaje
  const sendMessage = () => {
    if (message !== '') {
      const messageData = {
        room,
        message
      }

      socket.emit('send_message', messageData)
      //? setMessages([...messages, message]);
      setMessage('') // Limpiar el campo del mensaje
    }
  }

  // Escuchar los mensajes de la sala
  useEffect(() => {
    const handleMessage = (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data])
    }

    socket.on('message', handleMessage)

    // Limpiar el efecto cuando el componente se desmonte o cambie de estado
    return () => {
      socket.off('message', handleMessage)
    }
  }, [])

  return (
    <div className="p-10">
      <h1>Chat en Tiempo Real</h1>
      <div>
        <input
          type="text"
          placeholder="ID de la sala..."
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Unirse a la sala</button>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar Mensaje</button>
      </div>

      <div>
        <h3>Mensajes:</h3>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  )
}

export default App
