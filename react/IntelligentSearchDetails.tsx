import React from 'react'
import { useCategoriesData } from './hooks/useCategoriesData'
import { EXPERIMENTAL_Select, FloatingActionBar } from 'vtex.styleguide'

import styles from '../react/styles.css'

export const IntelligentSearchDetails = (props: any) => {
  const {
    category,
    facetsToSelect,
    selectedFacets,
    setSelectedFacets,
    loadingActionBar,
    setLoadingActionBar,
  } = useCategoriesData(props)

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
        <FloatingActionBar
          save={{
            label: 'Guardar',
            isLoading: loadingActionBar,
            onClick: () => {
              setLoadingActionBar(true)
              setTimeout(() => {
                alert('This was invoked because save was pressed')
                setLoadingActionBar(false)
              }, 2000)
            },
          }}
        />
      </div>
    </>
  )
}
