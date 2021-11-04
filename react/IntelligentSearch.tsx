import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageHeader } from 'vtex.styleguide'

import './styles.global.css'

const IntelligentSearch: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
     <div>
       <h1>Hola mundo</h1>
     </div>
    </Layout>
  )
}

export default IntelligentSearch
