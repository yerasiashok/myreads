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

  changeShelf = (modifiedbook, newShelf) => {
    BooksAPI.update(modifiedbook, newShelf).then((res) => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== modifiedbook.id).concat([ modifiedbook ])

      }))
    })
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">

        <Route path='/search' render={() => (
          <SearchComponent
            onChangeShelf={this.changeShelf}   
          />
        )}/>

        <Route exact path='/' render={() => (
          <MainComponent
            onChangeShelf={this.changeShelf}
            books={this.state.books}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
