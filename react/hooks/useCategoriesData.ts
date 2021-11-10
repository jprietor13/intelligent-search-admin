import { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { getCategoriesTree } from '../queries/getCategoriesTree.gql'
import { getFacets } from '../queries/getFacets.gql'
import { getSelectedFilters } from '../queries/getSelectedFilters.gql'
import { pathOr } from 'ramda'
import {
  categoriesTreeSerializer,
  facetsSerializer,
  documentsSerializer,
} from '../utils/serializer'

export const useCategoriesData = (props: any) => {
  const [categoriesData, setCategoriesData] = useState([])
  const [category, setCategory] = useState([])
  const [facetsData, setFacetsData] = useState([])
  const [facetsToSelect, setFacetsToSelect]: any[] = useState([])
  const [selectedFacets, setSelectedFacets]: any = useState({})
  const [filters, setFilters]: any[] = useState([])
  const [loadingActionBar, setLoadingActionBar] = useState(false)

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

  const { data: selectedFilters } = useQuery(getSelectedFilters, {
    variables: {
      acronym: 'FI',
      fields: ['category', 'selectedFilters'],
    },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    setCategoriesData(
      categoriesTreeSerializer(pathOr([], ['categories'], categories))
    )
    setFacetsData(facetsSerializer(pathOr([], ['facets'], facets)))
    setFilters(documentsSerializer(pathOr([], ['documents'], selectedFilters)))
    const filterCategoriesData = categoriesData.filter((item: any) => {
      return item.href.includes(props.department)
    })
    setCategory(filterCategoriesData)
    console.log(filters)
  }, [categories, facets, facetsData, selectedFilters])

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

  return {
    category,
    facetsToSelect,
    selectedFacets,
    setSelectedFacets,
    loadingActionBar,
    setLoadingActionBar,
  }
}
