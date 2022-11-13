import { useState } from "react";
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = event => {
        setSearchValue(event.currentTarget.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (searchValue.trim() !== '') {
            onSubmit(searchValue);
        }
    }

    return (
        <header className="Searchbar" onSubmit={handleSubmit}>
            <form className="SearchForm">
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="searchValue"
                    value={searchValue}
                    onChange={handleInputChange}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};