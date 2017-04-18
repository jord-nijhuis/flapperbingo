import React from 'react';
import {Button} from "react-bootstrap"
import {connect} from "react-redux";
import {addNumber} from './../Actions/index'

class Roller extends React.Component {

    generateUniqueNumber()
    {
        const number = Math.floor(Math.random() * (this.props.max + 1 - this.props.min)) + this.props.min;

        if(this.props.numbers.includes(number))
        {
            return this.generateUniqueNumber();
        }

        return number;
    }

    onClick()
    {
        const number = this.generateUniqueNumber();

        this.props.onRoll(number);
    }

    render() {

        return <div>
            <Button onClick={this.onClick.bind(this)}>Doe maar draaien (Al {this.props.numbers.length}x gedraaid)</Button>
            <div>
                {this.props.numbers.map(function(number, i){
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