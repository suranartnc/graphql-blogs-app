import React, {PropTypes} from 'react'
import Helmet from 'react-helmet'

import s from './ErrorPage.scss'

function ErrorPage ({status, message}) {
  return (
    <div className={s.pageWrapper}>
      <div>
        <Helmet
          title="Grid"
          meta={[
            {
              name: 'Error',
              content: 'Somethings wrong!'
            }
          ]}
        />
        <div className={s.messageBox}>
          <h1>{status}</h1>
          <p>{message}</p>
        </div>
        <div className={s.credit}>
          <span>&copy; <a href="https://maptia.com/camilleseaman">Camille Seaman</a> · Greenland</span>
        </div>
      </div>
    </div>
  )
}

ErrorPage.defaultProps = {
  status: '404',
  message: 'Not Found'
}

ErrorPage.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string
}

export default ErrorPage
