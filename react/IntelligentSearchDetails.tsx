import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { getCategoriesTree } from './queries/getCategoriesTree.gql'
import { getFacets } from './queries/getFacets.gql'
import { pathOr } from 'ramda'
import { categoriesTreeSerializer, facetsSerializer } from './utils/serializer'

export const IntelligentSearchDetails = (props: any) => {
  const [categoriesData, setCategoriesData] = useState([])
  const [category, setCategory] = useState([])
  const [facetsData, setFacetsData] = useState([])

  const { data: categories } = useQuery(getCategoriesTree, {
    fetchPolicy: 'no-cache',
  })

  const { data: facets } = useQuery(getFacets, {
    variables: {
      query: `${props.department}`,
      value: `${props.department}`,
    },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    setCategoriesData(
      categoriesTreeSerializer(pathOr([], ['categories'], categories))
    )
    setFacetsData(facetsSerializer(pathOr([], ['facets'], facets)))
    const filterCategoriesData = categoriesData.filter((item: any) => {
      return item.href.includes(props.department)
    })
    setCategory(filterCategoriesData)
  }, [categories, facets, facetsData])

  console.log('Category', category)
  return <div>Hola mundo {props.department}</div>
}
