import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBook'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf).then().then(() => {
      this.getBooks()
    })
  }

  searchBooks(query) {
    if (query == '') {
      var state = {
        books: []
      }
      this.setState(state)
    } else {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          var state = {
            books: []
          }
          this.setState(state)
        } else {
          console.log(books)
          this.setState({ books })
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={(book, shelf) => {
              this.updateBooks(book, shelf)
            }}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            onSearchBooks={(query) => {
              this.searchBooks(query)
            }}
            onUpdateBook={(book, shelf) => {
              this.updateBooks(book, shelf)
            }}
            getBooks={() => {
              this.getBooks()
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
