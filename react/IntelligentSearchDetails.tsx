import React, { useState, useEffect } from 'react'
import { useCategoriesData } from './hooks/useCategoriesData'
import { EXPERIMENTAL_Select } from 'vtex.styleguide'

import styles from '../react/styles.css'

export const IntelligentSearchDetails = (props: any) => {
  const { category, facetsData } = useCategoriesData(props)
  const [facetsToSelect, setFacetsToSelect]: any[] = useState([])
  const [selectedFacets, setSelectedFacets]: any = useState({})
  console.log(facetsData)

  useEffect(() => {
    if (facetsData) {
      const mapFacets = facetsData.map((item: any, index: number) => {
        return {
          value: { id: index, name: item.name },
          label: item.name,
        }
      })
      setFacetsToSelect(mapFacets ?? [])
    }
  }, [facetsData])

  useEffect(() => {
    console.log('selectedFacets', selectedFacets)
  }, [selectedFacets])

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
                            placeholder="Seleccione los atributos..."
                            label={children.name}
                            options={facetsToSelect}
                            value={selectedFacets[children.name]}
                            onChange={(values: any) => {
                              setSelectedFacets({
                                ...selectedFacets,
                                [children.name]: values,
                              })
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
