import React from 'react';

const Header = ({ handleToggleDarkMode }) => {
    return (
        <div className='header'>
            <h1>MyNotes</h1>
            <button
                onClick={() =>
                    handleToggleDarkMode(
                        (previousDarkMode) => !previousDarkMode
                    )
                }
                className='save'
            >
                Change theme
            </button>
        </div>
    )
}

export default Header;