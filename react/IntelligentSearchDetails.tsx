import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { getFacets } from './queries/getFacets.gql'
import { pathOr } from 'ramda'
import { facetsSerializer } from './utils/serializer'

export const IntelligentSearchDetails = (props: any) => {
  const [facetsData, setFacetsData] = useState([])
  const { data: facets } = useQuery(getFacets, {
    variables: {
      query: `${props.department}`,
      value: `${props.department}`,
    },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    setFacetsData(facetsSerializer(pathOr([], ['facets'], facets)))
  }, [facets, facetsData])

  console.log(facetsData)

  return <div>Hola mundo {props.department}</div>
}
