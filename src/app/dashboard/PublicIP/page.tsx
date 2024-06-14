'use client'
import React, { useState } from 'react';
import axios from 'axios';

const ShodanSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const apiKey = 'D928TTNMY0vbEbvOceby3vlT46PzK9jN';

    const getShodanResult = async () => {
        try {
            console.log("hello there")
            const response = await axios.get(`https://api.shodan.io/shodan/host/search?key=${apiKey}&query=${encodeURIComponent(searchQuery)}`);
            console.log(response.data);
            setSearchResults(response.data.matches);
        } catch (error) {
            console.error('Error searching with Shodan:', error);
            setSearchResults([]);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Shodan Search</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your search query"
                style={{ width: '400px', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
            />
            <br />
            <button
                onClick={getShodanResult}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
                Search
            </button>
            <br />
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                {searchResults.length > 0 ? (
                    <div>
                        <h2>Search Results:</h2>
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>
                                    <pre>{JSON.stringify(result, null, 2)}</pre>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ShodanSearch;
