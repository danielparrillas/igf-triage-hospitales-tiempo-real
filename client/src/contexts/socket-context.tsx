import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SocketContext } from '../hooks/useSocket'

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_WS_URL)
    setSocket(socketConnection)

    // Limpiar la conexión cuando el componente se desmonta
    return () => {
      socketConnection.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
