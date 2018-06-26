import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchComponent from './SearchComponent'
import MainComponent from './MainComponent'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchComponent
            //onDeleteContact={this.removeContact}
            books={this.state.books}
          />
        )}/>
        <Route exact path='/' render={() => (
          <MainComponent
            //onDeleteContact={this.removeContact}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
