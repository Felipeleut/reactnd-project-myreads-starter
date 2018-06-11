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

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf)
  }

  componentDidUpdate() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBooks}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks /> 
        )} />
      </div>
    )
  }
}

export default BooksApp
