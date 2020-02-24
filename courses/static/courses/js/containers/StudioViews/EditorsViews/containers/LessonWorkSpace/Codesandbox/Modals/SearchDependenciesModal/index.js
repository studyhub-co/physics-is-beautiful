import React from 'react'
import { useOvermind } from '../../app/overmind'
import SearchDependencies from '../../SearchDependencies'

function SearchDependenciesModal () {
  const {
    actions: {
      editor: { addNpmDependency }
    }
  } = useOvermind()
  return (
    <SearchDependencies
      onConfirm={(name, version) => addNpmDependency({ name, version })}
    />
  )
}

export default SearchDependenciesModal
