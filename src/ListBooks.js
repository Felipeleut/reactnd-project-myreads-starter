import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'


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


class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {

        const { books, onUpdateBook } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book) => book.shelf === 'currentlyReading' && (
                                        <li key={book.id} >
                                            <div className='book'>
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select
                                                            defaultValue={'move'}
                                                            onChange={(event) => {
                                                                if (event.target.value !== 'none')
                                                                    onUpdateBook(book, event.target.value)
                                                            }}
                                                        >
                                                            <option value="move" disabled>Move to...</option>
                                                            {shelfs.map((shelf) => (shelf.value !== book.shelf) && (
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book) => book.shelf === 'wantToRead' && (
                                        <li key={book.id} >
                                            <div className='book'>
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select
                                                            defaultValue={'move'}
                                                            onChange={(event) => {
                                                                if (event.target.value !== 'none')
                                                                    onUpdateBook(book, event.target.value)
                                                            }}
                                                        >
                                                            <option value="move" disabled>Move to...</option>
                                                            {shelfs.map((shelf) => (shelf.value !== book.shelf) && (
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book) => book.shelf === 'read' && (
                                        <li key={book.id} >
                                            <div className='book'>
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select
                                                            defaultValue={'move'}
                                                            onChange={(event) => {
                                                                if (event.target.value !== 'none')
                                                                    onUpdateBook(book, event.target.value)
                                                            }}
                                                        >
                                                            <option value="move"  disabled>Move to...</option>
                                                            {shelfs.map((shelf) => (shelf.value !== book.shelf) && (
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
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default ListBooks