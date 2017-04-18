import React from 'react';
import {Grid, Row, Col} from "react-bootstrap"
import {Board} from "./board"
import Roller from "./roller"

class Game extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            seed: this.props.seed ? this.props.seed : this.generateSeed()
        }
    }

    generateSeed()
    {
        let getRandomInt = function(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max + 1 - min)) + min;
        };

        return getRandomInt(0, 9) + "" + getRandomInt(0, 9) + "" + getRandomInt(0, 9) + "" + getRandomInt(0, 9)
    }

    changeSeed(e)
    {
        this.setState({seed: e.target.value})
    }

    render() {
        const seed = this.props.admin ?
            <input type="text" value={this.state.seed} onChange={this.changeSeed.bind(this)}/> :
            this.state.seed;

        return <div>
            <Grid fluid>
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
            </Grid>
        </div>;
    }
}

export {Game};