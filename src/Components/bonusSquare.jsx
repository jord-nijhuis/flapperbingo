import React from 'react';

import image from "./../Images/flapper.jpg"

class BonusSquare extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <td className="board_col" >
            <img src={image} alt="bonus" style={{width: '100%', height: '100%'}} />
        </td>;
    }


}

export {BonusSquare};