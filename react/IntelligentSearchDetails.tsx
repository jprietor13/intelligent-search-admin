import React, { useState, useEffect } from 'react'
import { useCategoriesData } from './hooks/useCategoriesData'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'

import styles from '../react/styles.css'

export const IntelligentSearchDetails = (props: any) => {
  const { category, facetsData } = useCategoriesData(props)
  const [facetsToSelect, setFacetsToSelect] = useState({})
  console.log(facetsData)

  useEffect(() => {
    if (facetsData) {
      let newArray = []
      let mapFacets = facetsData.map((item: any, index: number) => {
        return {
          value: { id: index, name: item.name },
          label: item.name,
        }
      })
      newArray.push(mapFacets)
      setFacetsToSelect(newArray[0])
    }
  }, [facetsData])

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
                            size="small"
                            multi={true}
                            label={children.name}
                            options={facetsToSelect}
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
