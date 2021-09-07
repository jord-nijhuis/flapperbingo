import React from 'react';
import {Container, Row, Col, Badge} from "react-bootstrap"
import {Game} from "./game"

class App extends React.Component {

    constructor()
    {
        super();

        this.state = {admin: false}
    }

    componentDidMount()
    {
        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    componentWillUnmount()
    {
        document.removeEventListener("keydown", this.onKeyDown.bind(this));
    }

    render() {

        const label = this.state.admin ? <Badge bg="primary">Admin</Badge> : "";
        return <div>
            <Container>
                <Row>
                    <Col md={12}><h1>Flapperbingo <small>LSD CSVVG Lariks {label}</small></h1></Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <p className="lead" style={{textAlign: 'justify'}}>
                            Welkom bij de allereerste Flapperbingo&trade; van CSVVG Lariks! Via de intercom zullen
                            de getallen&trade; omgeroepen worden. Als een van deze getallen op je kaart staat, klik dan
                            één keer op het getal om hem in te kleuren. Op het moment dat je een ingekleurde rij hebt
                            (horizontaal of verticaal), moet je zo snel mogelijk <strong>met de code</strong> naar de
                            servicebalie&trade; rennen. De eerste vier deelnemers winnen te gekke authentieke
                            handgemaakte Flapper-accessories&trade;! Moge de beste Flapper&trade; winnen!
                        </p>

                        <p>
                            <strong>PS:</strong> Mocht gij met een
                            valsche kaart aankomen, dal zullen wij u bestraffen doormiddel van duivelsch gezang.
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Game width={5} height={5} admin={this.state.admin}/>
                </Row>

            </Container>
        </div>;
    }

    /**
     * When the user presses CTL + M, activate the admin mode
     * @param event
     */
    onKeyDown(event)
    {
        if(event.ctrlKey && event.key === 'm')
        {
            this.setState({admin: !this.state.admin})
        }
    }
}

export {App};
