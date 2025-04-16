import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Stationary", "Special Feature Items", "Class 1-5", "Class 6-10", "11 & 12", "UG/PG", "Competitive", "Business", "Technology", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    const {data: books = []} = useFetchAllBooksQuery();
  
    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

    return (
        <div className='top-sellers-container overflow-hidden px-4'>
            <h2 className='top-sellers-heading'>Top Sellers</h2>
            {/* category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" 
                    id="category" 
                    className='category-select'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {
                    filteredBooks.length > 0 && filteredBooks.slice(0, 10).map((book, index) => (
                        <div key={index} className="border border-gray-200">
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopSellers