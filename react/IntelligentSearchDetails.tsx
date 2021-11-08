import React from 'react'
import { useCategoriesData } from './hooks/useCategoriesData'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'

import styles from '../react/styles.css'

export const IntelligentSearchDetails = (props: any) => {
  const { category, facetsData } = useCategoriesData(props)
  console.log(facetsData)
  const options = [
    {
      value: { id: 0, name: 'first-option' },
      label: 'First Option',
    },
    {
      value: { id: 1, name: 'second-option' },
      label: 'Second Option',
    },
  ]
  return (
    <>
      <h3>Categorias de {props.department}</h3>
      <hr />
      <div className={styles.containerCategories}>
        {category.map((item: any) => (
          <>
            {item.children.map((item: any) => (
              <>
                {item.hasChildren && (
                  <>
                    <h4>{item.name}</h4>
                    <div className={styles.containerSubCategories}>
                      {item.children.map((children: any) => (
                        <div className={styles.categoryCard}>
                          <EXPERIMENTAL_Select
                            defaultValue={options[0]}
                            size="small"
                            multi={true}
                            label={children.name}
                            options={facetsData}
                            onChange={(values: any) => {
                              console.log(
                                `[Select] Selected: ${JSON.stringify(
                                  values,
                                  null,
                                  2
                                )}`
                              )
                            }}
                            onSearchInputChange={(value: any) => {
                              console.log(
                                '[Select] onSeachInputChange: ' + value
                              )
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ))}
          </>
        ))}
      </div>
    </>
  )
}
