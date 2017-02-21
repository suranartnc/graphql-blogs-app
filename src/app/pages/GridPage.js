import React, {Component} from 'react'
import Helmet from 'react-helmet'

import { Container, Row, Col } from 'components/core'

import styles from 'styles/pages/Grid.scss'

class GridPage extends Component {
  render () {
    return (
      <div>
        <Helmet
          title="Grid"
          meta={[
            {
              name: 'description',
              content: 'This is Grid page.'
            }
          ]}
        />
        <Container className={styles.container}>
          <Row>
            <Col xs={12}>.col</Col>
          </Row>
          <Row>
            <Col>.col</Col>
            <Col>.col</Col>
            <Col>.col</Col>
            <Col>.col</Col>
          </Row>
          <Row>
            <Col xs="3">.col-3</Col>
            <Col xs="auto">.col-auto - variable width content</Col>
            <Col xs="3">.col-3</Col>
          </Row>
          <Row>
            <Col xs="6">.col-6</Col>
            <Col xs="6">.col-6</Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col sm="4">.col .col-sm-4</Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>.col .col-sm-6 .col-sm-push-2 .col-sm-pull-2 .col-sm-offset-2</Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>.col .col-sm-12 .col-md-6 .col-md-offset-3</Col>
          </Row>
          <Row>
            <Col sm={{ size: 'auto', offset: 1 }}>.col .col-sm .col-sm-offset-1</Col>
            <Col sm={{ size: 'auto', offset: 1 }}>.col .col-sm .col-sm-offset-1</Col>
          </Row>
        </Container>

      </div>
    )
  }
}

export default GridPage
