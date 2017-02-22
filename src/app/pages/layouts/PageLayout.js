import React, {PropTypes} from 'react'
import Header from 'components/Header'
import { Container, Row, Col } from 'core/app/components'

const PageLayout = props => {
  return (
    <div>
      <Header />
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
