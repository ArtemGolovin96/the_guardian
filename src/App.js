import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Main from './Main'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="news">Новости с The Guardian</h1>
        </header>
        <Main />
      </div>
    )
  }
}

export default App;
