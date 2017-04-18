import React from 'react';
import {Grid, Row, Col, Label} from "react-bootstrap"
import {Game} from "./game"

class App extends React.Component {

    constructor()
    {
        super();

        this.state = {admin: false}
    }

    componentWillMount()
    {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    componentWillUnmount()
    {
        document.removeEventListener("keydown", this.onKeyDown.bind(this));
    }

    render() {

        const label = this.state.admin ? <Label>Admin</Label> : "";
        return <div>
            <Grid>
                <Row>
                    <Col md={12}><h1>Flapperbingo <small>LSD CSVVG Lariks {label}</small></h1></Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <p>
                            Welkom bij de allereerste Flapperbingo van CSVVG Lariks! Via de intercom zullen de getallen
                            omgeroepen worden. Als het getal op je kaart staat, klik dan één keer op het getal. Op het
                            moment dat je hele kaart ingekleurd is, moet je zo snel mogelijk <strong>met de code</strong>
                            &nbsp; naar de servicebalie rennen. De bingokaart hoef je niet mee te nemen, die hebben we
                            hier ook liggen. Veel plezier!

                        </p>
                    </Col>
                </Row>

                <Row>
                    <Game width={5} height={5} admin={this.state.admin}/>
                </Row>

            </Grid>
        </div>;
    }

    onKeyDown(event)
    {
        if(event.ctrlKey && event.key == 'm')
        {
            this.setState({admin: !this.state.admin})
        }
    }
}

export {App};