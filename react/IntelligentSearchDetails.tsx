import React from 'react'
import { useCategoriesData } from './hooks/useCategoriesData'

import styles from '../react/styles.css'

export const IntelligentSearchDetails = (props: any) => {
  const { category } = useCategoriesData(props)
  console.log(category)
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
                  <div>
                    <h4>{item.name}</h4>
                    {item.children.map((children: any) => (
                      <p>{children.name}</p>
                    ))}
                  </div>
                )}
              </>
            ))}
          </>
        ))}
      </div>
    </>
  )
}
