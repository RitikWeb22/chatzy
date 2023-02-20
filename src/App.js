import './App.css'
import './normal.css'
import user from './team.png'
import robot from './ai.png'
import logo from './chat.png'
import { useState, useEffect } from 'react'

function App() {
  useEffect(() => {
    getEngines()
  }, [])
  const [input, setInput] = useState('')
  const [models, setModels] = useState([])
  const [chatLog, setChatLog] = useState([
    {
      user: 'gpt',
      message: 'Hello There what can i help you',
    },
  ])

  //clear chats
  function clearChat() {
    setChatLog([])
  }

  function getEngines() {
    fetch('https://chatzy-ai.netlify.app/models')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.models)
        setModels(data.models)
      })
      .then((data) => {
        console.log(data)
      })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const updatedChatLog = [...chatLog, { user: 'me', message: input }]
    setChatLog(updatedChatLog)
    setInput('')

    const serverUrl = 'http://localhost:3080/'
    const message = updatedChatLog.map((message) => message.message).join('\n')

    try {
      const response = await fetch(https://chatzy-ai.netlify.app/, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setChatLog([
        ...updatedChatLog,
        {
          user: 'gpt',
          message: `${data.message}`,
        },
      ])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className='App'>
      <aside className='sidemenu'>
        {/* logo icon */}
        <div className='side-menu-button logo'>
          <span>
            <img src={logo} alt='logo' />
          </span>
          Chatzy
        </div>
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className='models'>
          <select>
            {models &&
              models.map((model, index) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input
              className='chat-input-textaera'
              rows='1'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter your message here'
            ></input>
          </form>
        </div>
      </section>
    </div>
  )
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === 'gpt' && 'chatgpt'}`}>
      <div className='chat-message-center'>
        <div className={`avatar  ${message.user === 'gpt' && 'chatgpt'}`}>
          {message.user === 'gpt' && <img src={robot} alt='User' />}
        </div>
        <div className='message'>{message.message}</div>
      </div>
    </div>
  )
}

export default App
