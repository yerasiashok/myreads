import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchComponent extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksFromShelf: PropTypes.array.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({query})
  }

  compareArray = (fromSearch, fromShelf) => {
    for (var j = fromSearch.length - 1; j >= 0; j--)
    {
      for (var i = fromShelf.length - 1; i >= 0; i--) {
        if (fromShelf[i].id === fromSearch[j].id) {
          fromSearch[j] = fromShelf[i]
          break
        }
      }
    }
    return fromSearch
  }

  render() {
    const { books} = this.state
    const { query } = this.state
    let isNotEmptyQuery = true
    if (query) {
      BooksAPI.search(query).then((searchList) => {
        this.setState((state) => ({
          books: (searchList.error) ? []: this.compareArray(searchList, this.props.booksFromShelf)
       }))
      })
    } else {
      isNotEmptyQuery = false
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {isNotEmptyQuery && books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks && (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    )}
                    <div className="book-shelf-changer">
                      <select value={book.shelf ? book.shelf : "none"} onChange={(e) => this.props.onChangeShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchComponent