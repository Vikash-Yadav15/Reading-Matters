import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import blankheart from '../images/blankheart.png';
// import blackheart from '../images/blackheart.png';
// import check from '../images/check.png';
// import add from '../images/add.png';

const SearchResultPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'AIzaSyBW4pVoiDAZAHg8YwOAEXmzkF9jBmJtpZk'; 
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&key=${apiKey}`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className='mb-10 text-customblack font-semibold'>Search Results:</div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6">
          {searchResults.map((book) => (
            <Link
              key={book.id}
              to={{
                pathname: '/book-description',
                search: `?bookInfo=${encodeURIComponent(JSON.stringify(book))}`,
              }}
              className="group"
            >
              <div className="bookinfo aspect-h-1 aspect-w-1 w-full h-full overflow-hidden rounded-lg bg-white xl:aspect-h-8 xl:aspect-w-7">
                {book.volumeInfo.imageLinks && (
                  <img
                    className="object-cover"
                    src={
                      book.volumeInfo.imageLinks.thumbnail ||
                      book.volumeInfo.imageLinks.smallThumbnail
                    }
                    alt={book.volumeInfo.title}
                  />
                )}
                <div className="book-info mx-5 my-2">
                  <h1 className="font-semibold text-xl text-customblack">
                    {book.volumeInfo.title}
                  </h1>
                  <p className="mt-1 text-sm font-thin text-gray-900">
                    <b>Author: </b>
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(', ')
                      : 'Unknown'}
                  </p>
                  <p className="mt-1 text-sm font-thin text-gray-900">
                    <b>Category: </b>
                    {book.volumeInfo.categories
                      ? book.volumeInfo.categories.join(', ')
                      : 'Unknown'}
                  </p>
                  <p className="mt-1 text-sm font-thin text-gray-900">
                    <b>Published Date: </b>
                    {book.volumeInfo.publishedDate}
                  </p>
                  <div className="mt-5">
                    <Link
                      to={{
                        pathname: '/book-description',
                        search: `?bookInfo=${encodeURIComponent(
                          JSON.stringify(book)
                        )}`,
                      }}
                      className="rounded-md bg-darkblue px-2 py-1.5 button text-white shadow-sm hover:bg-lightblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      More <span>&#8594;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
