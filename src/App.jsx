import { useState, useEffect } from 'react'
import './App.css'
import { ChatMessage } from './components/ChatMessage'
import image from './assets/chatbot.svg'

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([{type: 'stock'}]);
  const [stockChoice, setStockChoice] = useState({})
  const [topStockChoice, setTopStockChoice] = useState({})

  //dynamic importing is used in order to treat the cases where the json file has no content.
  //with static importing the app would break before reaching runtime
  useEffect(() => {
    fetch("/StockData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError("Error loading data.");
      });
  }, []);

  // function to set the stock choice
  const chooseTopStock = (value) => {
    setStockChoice(value)
    setMessages([...messages, {type: 'userMessage', content: value.stockExchange}, {type: 'topStock'}]);
  }

  // function to set the topStock choice
  const choosePrice = (value) => {
    setTopStockChoice(value)
    setMessages([...messages, {type: 'userMessage', content: value.stockName}, {type: 'price'}]);
  }

  if (error) {
    return (
      <div>An error has occured when trying to load the data. Please contact a server administrator for the following error: {error}</div>
    )
  }

  return (
    <div className='container'>
      <div className='chatbot-title'>
        <img src={image} />
        <div>LSEG Chatbot</div>
      </div>
      <div className="chat-message">Hello! Welcome to LSEG. I'm here to help you</div>
      {messages && messages.map((message, index) => {
        return (
          <div>
            {message.type === 'stock' && 
              <ChatMessage
                message={'Please Select a Stock Exchange:'} 
                data={data}
                field={'stockExchange'}
                isActive={index + 1  === messages.length}
                selectNext={(data) => chooseTopStock(data)}
              />}
            {(message.type === 'topStock' && stockChoice.topStocks) && 
              <ChatMessage 
                message={'Please Select a Stock:'} 
                data={stockChoice.topStocks} 
                field={'stockName'}
                isActive={index + 1 === messages.length}
                selectNext={(data) => {choosePrice(data)}}
                //only goBack is necessary, as reset would have the same functionality.
                // Alternatively, it can be replaced with reset if the 'Main Menu' option is preferred
                goBack={() => {setMessages([...messages, {type: 'stock'}])}} 
              />}
            {(message.type === 'price' && topStockChoice.price) && 
              <ChatMessage 
                message={`Stock price of ${topStockChoice.stockName} is ${topStockChoice.price}. Please select an option:`}
                isActive={index + 1 === messages.length}
                //goBack and reset add a new message with the desired type
                goBack={() => {setMessages([...messages, {type: 'topStock'}])}} 
                reset={() => {setMessages([...messages, {type: 'stock'}])}}
              />}
            {(message.type === 'userMessage') && 
              // messages[index].content is used instead of a state variable, as that would replace all the previous 'messages' when selecting a new stock or topStock
              <div className='user-message'>{messages[index].content}</div>}
          </div>
          
        )
      })}
    </div>
  )
}

export default App
