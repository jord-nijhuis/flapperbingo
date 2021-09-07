import React from 'react';
import {Container, Row, Col} from "react-bootstrap"
import {Board} from "./board"
import Roller from "./roller"

/**
 * The game contains the main logic: It houses both the board and the seed, as well as the admin mode.
 */
class Game extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            seed: this.props.seed ? this.props.seed : this.generateSeed()
        }
    }

    /**
     * Generates a random seed of four digits.
     * @returns {string}
     */
    generateSeed()
    {
        let getRandomInt = function(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max + 1 - min)) + min;
        };

        return getRandomInt(0, 9) + "" + getRandomInt(0, 9) + "" + getRandomInt(0, 9) + "" + getRandomInt(0, 9)
    }

    /**
     * Changes the seed in the state to the seed in the event
     * @param e
     */
    changeSeed(e)
    {
        this.setState({seed: e.target.value})
    }

    render() {
        const seed = this.props.admin ?
            <input type="text" value={this.state.seed} onChange={this.changeSeed.bind(this)}/> :
            this.state.seed;

        return <div>
            <Container fluid>
                <Row>
                    <Col md={12}><h2>Jouw code: {seed}</h2></Col>
                </Row>

                { this.props.admin &&
                    <Row>
                        <Col md={12}><Roller min={1} max={this.props.width * this.props.width * 3 }/></Col>
                    </Row>
                }

                <Row>
                    <Col md={12}>
                        <Board admin={this.props.admin}
                               width={this.props.width}
                               height={this.props.height}
                               seed={this.state.seed}
                        />
                    </Col>
                </Row>
            </Container>
        </div>;
    }
}

export {Game};
