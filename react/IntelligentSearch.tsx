import React, { useState } from 'react'
import { Layout, Card, Dropdown } from 'vtex.styleguide'

import './styles.global.css'

const IntelligentSearch = () => {
  const [initialValue, setInitialValue] = useState({
    department: ''
  })
  const [department, setDeparment] = useState('');

  const handleInputChange = (e:any) => {
    setInitialValue({
      ...initialValue,
      [e.target.name] : e.target.value
    });
    setDeparment(e.target.value);
  }

  return (
    <Layout>
     <div style={{ padding: '80px', color: '#585959', background: '#fafafa' }}>
       <Card>
       <Dropdown
          label="Departamento"
          placeholder="Seleccione el departamento"
          name="department"
          options={[
            {
              value: 'tecnologia',
              label: 'Tecnologia',
            },
            {
              value: 'electrodomesticos',
              label: 'Electrodomesticos',
            },
          ]}
          value={department}
          onChange={handleInputChange}
        />
        </Card>
     </div>
    </Layout>
  )
}

export default IntelligentSearch
