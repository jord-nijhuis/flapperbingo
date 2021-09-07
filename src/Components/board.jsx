import React from 'react';
import Square from "./square"
import {BonusSquare} from "./bonusSquare"

import * as RandomSeed from "random-seed"

/**
 * The board contains all the squares and all the logic related to generating those squares
 */
class Board extends React.Component {

    constructor(props){

        super(props);
    }

    /**
     * Generate an unique number.
     *
     * A number is considered unique when it has not been generated before.
     *
     * @param {int} start The lowest possible number: this is inclusive
     * @param {int} end The highest possible number: this is inclusive
     * @param {int[]} usedNumbers A list with all the numbers that have already been generated
     *
     * @returns {int} Returns a unique number
     */
    generateUniqueNumber(start, end, usedNumbers) {

        const number = this.generator.intBetween(start, end);

        if(usedNumbers.includes(number))
        {
            return this.generateUniqueNumber(start, end, usedNumbers)
        }

        usedNumbers.push(number);

        return number
    }

    /**
     * This method fills the whole board with all the numbers
     */
    generateBoard() {

        this.board = [];

        let usedNumbers = [];
        const sizePerRow = this.props.width * 3;

        for (let y = 0; y < this.props.height; y++) {

            this.board[y] = [];

            for (let x = 0; x < this.props.width; x++) {

                this.board[y][x] = this.generateUniqueNumber(
                    (x * sizePerRow + 1),
                    ((x + 1) * sizePerRow),
                    usedNumbers
                );
            }
        }
    }

    render() {

        this.board = [];
        this.generator = new RandomSeed(this.props.seed);

        this.generateBoard();

        let middleX = (this.props.width - 1) / 2;
        let middleY = (this.props.height - 1) / 2;

        return <div>

            <table className="board table-bordered">
                <tbody>
                    {this.board.map(function(row, x){
                        return <tr className="board_row" key={x}>
                            {row.map(function(col, y) {

                                if(middleX === x && middleY === y)
                                {
                                    return <BonusSquare key={y}/>
                                }
                                return <Square admin={this.props.admin} number={col} key={y} />
                            }.bind(this))}
                        </tr>
                    }.bind(this))}
                </tbody>
            </table>
        </div>;
    }
}

export {Board};
