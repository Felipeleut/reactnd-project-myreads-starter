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

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).catch(function(error){
      console.log(error)
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooks()
    }).catch(function(error){
      console.log(error)
    })
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
            shelfsBooks={this.state.books}
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
