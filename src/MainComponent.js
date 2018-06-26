import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelfList from './BookShelfList'
import './App.css'


class MainComponent extends React.Component {  
  render() {
    return (  
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelfList type='Currently Reading' books= {this.props.books.filter((book) => (book.shelf === 'currentlyReading'))}/>
            <BookShelfList type='Want to Read' books={this.props.books.filter((book) => (book.shelf === 'wantToRead'))}/>
            <BookShelfList type='Read' books={this.props.books.filter((book) => (book.shelf === 'read'))}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>       
    )
  }
}
export default MainComponent
