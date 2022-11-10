import React from "react";

class Searchbar extends React.Component {
    state = {
        searchValue: '',
    }

    handleInputChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { searchValue } = this.state;

        if (searchValue.trim() !== '') {
            this.props.onSubmit(searchValue);
        }
    }

    render() {
        return (
            <header className="Searchbar" onSubmit={this.handleSubmit}>
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
                        value={this.state.searchValue}
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>
        );
    };
};

export default Searchbar;