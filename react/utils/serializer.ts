export const categoriesTreeSerializer = (categories: any) => {
  if (categories) {
    return categories.filter((item: any) => {
      return (
        item.id === 34185084 || //tecnologia exito
        item.id === 34185087 || //electrodomesticos exito
        item.id === 27185095 || //tecnologia carulla
        item.id === 27185093 //electrodomescitos carulla
      )
    })
  }
  return null
}

export const facetsSerializer = (facets: any) => {
  if (facets) {
    return facets.facets
  }
  return null
}

export const documentsSerializer = (documents: any) => {
  if (documents) {
    return documents.map((item: any) => {
      return item.fields
    })
  }
  return null
}
