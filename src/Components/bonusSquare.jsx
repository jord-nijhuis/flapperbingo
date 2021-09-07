import React from 'react';

import image from "./../Images/flapper.jpg"

/**
 * The bonus square is the square in the middle. This square is automatically filled and has a beautiful picture of
 * Flapper.
 */
class BonusSquare extends React.Component {

    render() {

        return <td className="board_col" >
            <img src={image} alt="bonus" style={{width: '100%', height: '100%'}} />
        </td>;
    }


}

export {BonusSquare};