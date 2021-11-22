import React, { useState } from 'react'
import { useCategoriesData } from './hooks/useCategoriesData'
import {
  EXPERIMENTAL_Select,
  FloatingActionBar,
  Modal,
  Button,
} from 'vtex.styleguide'

import styles from '../react/styles.css'

export const IntelligentSearchDetails = (props: any) => {
  const {
    category,
    facetsToSelect,
    selectedFacets,
    setSelectedFacets,
    loadingActionBar,
    setLoadingActionBar,
    handleSaveAttributes,
  } = useCategoriesData(props)
  const [isOpen, setIsOpen] = useState(false)

  const handleModalToggle = () => {
    setIsOpen(!isOpen)
  }

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
                            value={selectedFacets[children.id]}
                            onChange={(values: any) => {
                              setSelectedFacets({
                                ...selectedFacets,
                                [children.id]: values,
                              })
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
              handleSaveAttributes()
              setTimeout(() => {
                handleModalToggle()
                setLoadingActionBar(false)
              }, 2000)
            },
          }}
        />
        <Modal centered isOpen={isOpen} onClose={handleModalToggle}>
          <div className="dark-gray">
            <p>
              La información ha sido guardada con exito. Los cambios se
              visualizaran en unos minutos.
            </p>
            <Button
              variation="primary"
              size="small"
              onClick={handleModalToggle}
            >
              Aceptar
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}
