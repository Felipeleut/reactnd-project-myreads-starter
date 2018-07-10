import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
    if(imageLinks)
        return imageLinks.thumbnail
    else
        return '#'
}

class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        onSearchBooks: PropTypes.func.isRequired,
        getBooks: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.props.onSearchBooks(query)
            
    }

    render() {

        const { query } = this.state
        const { books, onUpdateBook, getBooks} = this.props
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/' onClick={(event)=>{
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
                                                defaultValue={'move'}
                                                onChange={(event) => {
                                                    //if (event.target.value !== 'none')
                                                    onUpdateBook(book, event.target.value)
                                                }}
                                            >
                                                {/* <option value="move" disabled>Move to...</option> */}

                                                {shelfs.map((shelf) => (shelf.value === book.shelf) && (
                                                    <option key={shelf.id} value={shelf.value}>{shelf.text}</option>
                                                ))}
                                                <option value="none">None</option>
                                                {shelfs.map((shelf) => (shelf.value !== book.shelf) && (
                                                    <option key={shelf.id} value={shelf.value}>{shelf.text}</option>
                                                ))}

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