import React, {PropTypes} from 'react'
import Nav from 'components/Nav'
import { Container, Row, Col } from 'core/app/components'

const PageLayout = props => {
  return (
    <div>
      <Nav />
      <Container>
        <Row>
          <Col>
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageLayout
