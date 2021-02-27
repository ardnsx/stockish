import React, {useState, useEffect } from 'react';
import Stock from './Stock';
import Axios from 'axios';
import emailjs from 'emailjs-com';
import './App.css';

function App() {
  const [watchList, setWatchList] = useState([]);
    
  useEffect(() => {
      Axios.get('http://localhost:3001/watchlist/get').then((response)=>{
        setWatchList(response.data);
    });
  }, []);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_edqn11s', 'watchlist', e.target, 'user_B7ScbhaVY6DVcKUyuN44q')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
}


  return (
    <div className="App">
      <Stock></Stock>
      
      <h1>WatchList</h1>

        {watchList.map((val) => {
          return (
            <div className="List">
              <p>Ticker: {val.ticker}</p>
            </div>
          );
        })}
      
      <div>
            <div>
                <form onSubmit={sendEmail}>
                    <div>
                        <div>
                            <input type="text" placeholder="Name" name="name"/>
                        </div>
                        <div>
                            <input type="email" placeholder="Email Address" name="email"/>
                        </div>
                        <div>
                            <input type="text" placeholder="Subject" name="subject"/>
                        </div>
                        <div>
                            <textarea type="text" placeholder="Message" name="message"></textarea>
                        </div>
                        <div>
                            <input type="submit" value="Send Message"></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;
