import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommened = () => {
    const { data: books = [] } = useFetchAllBooksQuery();
    const [trendingBooksToShow, setTrendingBooksToShow] = useState([]);
    const [historyBooks, setHistoryBooks] = useState([]);
    
    // Function to get random trending books
    useEffect(() => {
        if (books.length > 0) {
            // Filter trending books
            const allTrendingBooks = books.filter(book => book.trending === true);
            
            // Get 4 random trending books or fewer if not enough trending books
            const getRandomTrendingBooks = () => {
                let shuffled = [...allTrendingBooks].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, Math.min(4, allTrendingBooks.length));
            };
            
            setTrendingBooksToShow(getRandomTrendingBooks());
            
            // Load user history from localStorage
            const loadHistory = () => {
                const visited = JSON.parse(localStorage.getItem('visitedBooks')) || [];
                // Find books from history that exist in our current books data
                const historyBooksData = visited
                    .map(id => books.find(book => book.id === id))
                    .filter(book => book); // Remove any undefined entries
                    
                setHistoryBooks(historyBooksData);
            };
            
            loadHistory();
        }
    }, [books]);
    
    // Function to record book visit in history
    const recordVisit = (bookId) => {
        // Get current history
        const visited = JSON.parse(localStorage.getItem('visitedBooks')) || [];
        
        // Add to history if not already there
        if (!visited.includes(bookId)) {
            const newVisited = [bookId, ...visited.slice(0, 19)]; // Keep only 20 most recent 
            localStorage.setItem('visitedBooks', JSON.stringify(newVisited));
        }
    };

    return (
        <div className='py-16'>
            {/* Trending Books Section */}
            <h2 className='text-3xl font-semibold mb-6 text-white'>Trending Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
                {
                    trendingBooksToShow.length > 0 ? trendingBooksToShow.map((book, index) => (
                        <div 
                            key={index} 
                            className="h-full border border-gray-200 overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-center"
                            onClick={() => recordVisit(book.id)}
                        >
                            <BookCard book={book} />
                        </div>
                    )) : books.slice(0, 4).map((book, index) => (
                        <div 
                            key={index} 
                            className="h-full border border-gray-200 overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-center"
                            onClick={() => recordVisit(book.id)}
                        >
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>

            {/* Recently Viewed Books Section */}
            {historyBooks.length > 0 && (
                <>
                    <h2 className='text-3xl font-semibold mb-6 text-white'>Recently Viewed</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {historyBooks.map((book, index) => (
                            <div 
                                key={index} 
                                className="h-full border border-gray-200 overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-center"
                                onClick={() => recordVisit(book.id)}
                            >
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Recommened
