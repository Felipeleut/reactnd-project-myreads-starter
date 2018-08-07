import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

const shelfs = [
    {
        'id': 1,
        'value': 'currentlyReading',
        'text': 'Currently Reading'
    },
    {
        'id': 2,
        'value': 'wantToRead',
        'text': 'Want to Read'
    },
    {
        'id': 3,
        'value': 'read',
        'text': 'Read'
    }
]

function defineImage(imageLinks) {
    if (imageLinks)
        return imageLinks.thumbnail
    else
        return '#'
}

class SearchBooks extends Component {

    static propTypes = {
        shelfsBooks: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        getBooks: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    searchBooks(query) {
        if (query === '') {
            var searchState = {
                books: []
            }
            this.setState(searchState)
        } else {
            BooksAPI.search(query).then((books) => {
                if (books.error) {
                    var searchState = {
                        books: []
                    }
                    this.setState(searchState)
                } else {
                    this.setState({ books })
                }
            })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    findShelf = (id) =>{
        var shelf;        
        if(this.props.shelfsBooks.find(shelfbook => shelfbook.id === id)){
            shelf = this.props.shelfsBooks.find(shelfbook => shelfbook.id === id).shelf;
        }
        return shelf;
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.searchBooks(query)
    }


    render() {

        const { books, query } = this.state
        const { onUpdateBook, getBooks } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/' onClick={(event) => {
                        getBooks()
                    }}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className='book'>
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${defineImage(book.imageLinks)})` }}></div>
                                        <div className="book-shelf-changer">
                                        
                                            <select
                                                value={this.findShelf(book.id) || 'none'}
                                                onChange={(event) => {
                                                    onUpdateBook(book, event.target.value)
                                                    this.updateQuery('')
                                                }}
                                            >
                                                <option disabled>Move to...</option>
                                                {shelfs.map(shelf => (
                                                    <option key={shelf.id} value={shelf.value}>{shelf.text}</option>
                                                ))}
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

export default SearchBooks