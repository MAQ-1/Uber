import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const SocketDataContext = createContext()

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketUrl = (import.meta.env.VITE_BASE_URL || 'http://localhost:4000').replace(/\/$/, '')
    console.log('[socket] connecting to', socketUrl)

    const socket = io(socketUrl, {
      autoConnect: true,
      transports: ['websocket', 'polling']
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[socket] connected:', socket.id)
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('[socket] disconnected')
      setIsConnected(false)
    })

    socket.on('connect_error', (error) => {
      console.error('[socket] connect_error:', error?.message || error)
    })

    return () => {
      console.log('[socket] cleanup')
      socket.removeAllListeners()
      socket.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [])

  const sendMessage = useCallback((eventName, payload) => {
    if (!socketRef.current || !socketRef.current.connected) {
      console.warn('[socket] send blocked (not connected):', eventName, payload)
      return false
    }

    console.log('[socket] send:', eventName, payload)
    socketRef.current.emit(eventName, payload)
    return true
  }, [])

  const onMessage = useCallback((eventName, handler) => {
    if (!socketRef.current || typeof handler !== 'function') {
      console.warn('[socket] onMessage called but socket not ready or handler invalid')
      return () => {}
    }

    console.log('[socket] registering listener for:', eventName)
    const wrappedHandler = (payload) => {
      console.log('[socket] receive:', eventName, payload)
      handler(payload)
    }

    socketRef.current.on(eventName, wrappedHandler)

    return () => {
      console.log('[socket] unregistering listener for:', eventName)
      if (socketRef.current) {
        socketRef.current.off(eventName, wrappedHandler)
      }
    }
  }, [])

  return (
    <SocketDataContext.Provider value={{ isConnected, sendMessage, onMessage }}>
      {children}
    </SocketDataContext.Provider>
  )
}

export default SocketProvider