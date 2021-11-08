import React, { useState } from 'react'
import { Layout, Card, Dropdown } from 'vtex.styleguide'
import { IntelligentSearchDetails } from './IntelligentSearchDetails'

import './styles.global.css'

const IntelligentSearch = () => {
  const [initialValue, setInitialValue] = useState({
    department: '',
  })
  const [department, setDeparment] = useState('')

  const handleInputChange = (e: any) => {
    setInitialValue({
      ...initialValue,
      [e.target.name]: e.target.value,
    })
    setDeparment(e.target.value)
  }

  return (
    <Layout fullWidth={true}>
      <div style={{ padding: '20px', color: '#585959', background: '#fafafa' }}>
        <Card>
          <Dropdown
            label="Departamento"
            placeholder="Seleccione el departamento"
            name="department"
            options={[
              {
                value: 'tecnologia',
                label: 'Tecnología',
              },
              {
                value: 'electrodomesticos',
                label: 'Electrodomésticos',
              },
            ]}
            value={department}
            onChange={handleInputChange}
          />
        </Card>
      </div>
      <div style={{ padding: '20px', color: '#585959', background: '#fafafa' }}>
        <Card>
          <IntelligentSearchDetails department={department} />
        </Card>
      </div>
    </Layout>
  )
}

export default IntelligentSearch
