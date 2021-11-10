import { useState, useEffect } from 'react'
import compose from 'recompose/compose'
import { useQuery, useMutation, graphql } from 'react-apollo'
import { getCategoriesTree } from '../queries/getCategoriesTree.gql'
import { getFacets } from '../queries/getFacets.gql'
import { getSelectedFilters } from '../queries/getSelectedFilters.gql'
import { pathOr } from 'ramda'
import {
  categoriesTreeSerializer,
  facetsSerializer,
  documentsSerializer,
} from '../utils/serializer'
import MODIFY_ATTRIBUTES from '../queries/modifyAttributes.gql'

export const useCategoriesData = (props: any) => {
  const [categoriesData, setCategoriesData] = useState([])
  const [category, setCategory] = useState([])
  const [facetsData, setFacetsData] = useState([])
  const [facetsToSelect, setFacetsToSelect]: any[] = useState([])
  const [selectedFacets, setSelectedFacets]: any = useState({})
  const [filters, setFilters]: any[] = useState([])
  const [findCategory, setFindCategory]: any[] = useState([])
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

  const [dataModifyAttributes, { data: dataModify }] = useMutation(
    MODIFY_ATTRIBUTES,
    {
      fetchPolicy: 'no-cache',
    }
  )

  useEffect(() => {
    setCategoriesData(
      categoriesTreeSerializer(pathOr([], ['categories'], categories))
    )
    setFacetsData(facetsSerializer(pathOr([], ['facets'], facets)))
    setFilters(documentsSerializer(pathOr([], ['documents'], selectedFilters)))
    const filterCategoriesData = categoriesData.filter((item: any) => {
      return item.href.includes(props.department)
    })
    const findIdCategory = categoriesData.find((item: any) => {
      return item.href.includes(props.department)
    })
    setCategory(filterCategoriesData)
    setFindCategory(findIdCategory)
    console.log('filters', filters)
    console.log('categorias', categoriesData)
    console.log('id', findCategory)
    console.log('department', props.department)
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

  useEffect(() => {}, [dataModify])

  const handleSaveAttributes = () => {
    dataModifyAttributes({
      variables: {
        acronym: 'FI',
        documentInput: {
          fields: [
            {
              key: 'category',
              value: props.department,
            },
            {
              key: 'selectedFilters',
              value: JSON.stringify(selectedFacets),
            },
            {
              key: 'id',
              value: findCategory.id,
            },
          ],
        },
      },
    })
  }

  return {
    category,
    facetsToSelect,
    selectedFacets,
    setSelectedFacets,
    loadingActionBar,
    setLoadingActionBar,
    handleSaveAttributes,
  }
}

export default compose(
  graphql(MODIFY_ATTRIBUTES, { name: 'dataModifyAttributes' })
)
