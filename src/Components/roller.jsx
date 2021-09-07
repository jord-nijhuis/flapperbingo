import React from 'react';
import {Button} from "react-bootstrap"
import {connect} from "react-redux";
import {addNumber} from './../Actions/index'

class Roller extends React.Component {

    /**
     * Generates a unique number
     *
     * A number is considered unique when it has not been rolled before.
     * If no unique number can be found, this method returns undefined
     *
     * @returns {int|undefined}
     */
    generateUniqueNumber()
    {
        if(this.props.numbers.length > this.props.max - this.props.min)
        {
            return;
        }

        const number = Math.floor(Math.random() * (this.props.max + 1 - this.props.min)) + this.props.min;

        if(this.props.numbers.includes(number))
        {
            return this.generateUniqueNumber();
        }

        return number;
    }

    /**
     * When the button has been clicked, retrieve a new number
     */
    onClick()
    {
        const number = this.generateUniqueNumber();

        //No unique number has been found, just quit
        if(number === undefined)
        {
            return
        }

        this.props.onRoll(number);
    }

    render() {

        return <div>
            <Button onClick={this.onClick.bind(this)}>
                Doe maar draaien
                (Al {this.props.numbers.length}x gedraaid)
            </Button>

            <div>
                {this.props.numbers.map(function(number){
                    return number + ', '
                })}
            </div>
        </div>
    }


}

const mapStateToProps = function(store) {
    return {
        numbers: store.numbers
    };
};

const mapDispatchToProps = function(dispatch){

    return {
        onRoll: (number) => {
            dispatch(addNumber(number));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Roller);
