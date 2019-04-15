import React from 'react'
import {Col, Container, Row, Jumbotron, Button} from 'react-bootstrap'
import { Sheet } from '../../components/Sheet'
import history from '../../history.jsx'

class AdblockView extends React.Component {
  render () {
    return (
      <Sheet>
        <Container fluid>
          <Row>
            <Col sm={12} md={12}>
              <Jumbotron style={{textAlign: 'center'}}>
                <h1>Please turn off adblock!</h1>
                <p>
                  Hi Friend of Physics, you've been redirected because we detected you're using Adblock.
                  <br/>
                  We can make the resources free only by serving some ads, is that fair?
                  <br/>
                  If so, please set your adblocker to <b>"Don't run on pages on this site."</b>
                  <br/>
                  Please let us know in the comments if you feel we have too many ads. We're trying to find the sweet spot.
                </p>
                <p>
                  <Button variant="primary" onClick={history.goBack}>I've turned adblock off, now take me back!</Button>
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Sheet>
    )
  }
}

export default AdblockView
