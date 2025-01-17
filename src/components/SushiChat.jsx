import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Form, Table, Collapse } from 'react-bootstrap'
import chatService from '../services/chat'

function sushiChat({ setErrorMessage, setUser }) {
  const [chats, setChats] = useState([])
  const [chatMessage, setChatMessage] = useState()
  const chatContainerRef = useRef(null)

  useEffect(() => {
    chatService
      .getChats()
      .then((response) => {
        setChats(response)
        console.log(response)
      })
      .catch(() => {
        const ErrorMessageObject = {
          message: 'Could not retrieve information from the database.',
          status: 'nok',
        }
        setErrorMessage(ErrorMessageObject)
      })
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chats])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === 'chatMessage') {
      setChatMessage(value)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      chatService
        .getChats()
        .then((response) => {
          // Only update chats if there are new messages
          if (response.length !== chats.length) {
            setChats(response)
          }
        })
        .catch((error) => console.error('Error fetching chats:', error))
    }, 3000)

    return () => clearInterval(interval) // Clean up interval on unmount
  }, [chats])

  const handleSendRequest = async () => {
    const dataToSend = {
      message: chatMessage,
    }
    chatService
      .postChat(dataToSend)
      .then((response) => {
        setChatMessage('')
        chatService
          .getChats()
          .then((respuesta) => {
            setChats(respuesta)
          })
          .catch(() => {
            const ErrorMessageObject = {
              message: 'Could not retrieve information from the database.',
              status: 'nok',
            }
            setErrorMessage(ErrorMessageObject)
          })
      })
      .catch(() => {
        const ErrorMessageObject = {
          message: 'Could not retrieve information from the database.',
          status: 'nok',
        }
        setErrorMessage(ErrorMessageObject)
      })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendRequest()
    }
  }

  return (
    <Container className="text-white border border-white p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', marginBottom: '20px', textAlign: 'center' }}>
      <Col className="d-inline-block">
        <Form.Group controlId="loginOut" className="mb-3 d-flex justify-content-between align-items-center">
          <Form.Label className="mb-0" style={{ fontSize: '2em' }}>ArmacaSushi Chatbot</Form.Label>
          <Button
            className="d-auto"
            style={{ backgroundColor: 'black', border: 'white', width: 'auto' }}
            onClick={() => {
              setUser(null)
              window.localStorage.removeItem('loggedSushiUser')
            }}
          >
            Log out
          </Button>
        </Form.Group>
        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            textAlign: 'left',
            marginBottom: '20px',
            backgroundColor: '#1f1f1f',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          {chats.map((chat) => (
            <div
              key={chat.id}
              style={{
                display: 'flex',
                justifyContent: chat.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor: chat.role === 'user' ? '#128c7e' : '#3c3c3c',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                  fontSize: '14px',
                  wordWrap: 'break-word',
                }}
              >
                {chat.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Form.Group controlId="chatMessage" className="mt-3">
          <Form.Control type="text" name="chatMessage" placeholder="Mensaje" value={chatMessage} onChange={handleInputChange} onKeyDown={handleKeyPress} style={{ backgroundColor: 'black', color: 'white' }} />
        </Form.Group>
        <Button variant="dark" onClick={handleSendRequest} className="mt-3">Enviar Chat</Button>
      </Col>
    </Container>
  )
}

export default sushiChat
