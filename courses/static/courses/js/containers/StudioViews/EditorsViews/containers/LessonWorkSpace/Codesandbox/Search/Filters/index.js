import React from 'react'

import getTemplate from '../../common/src/templates'
// import { ALGOLIA_DEFAULT_INDEX } from '../../common/src/utils/config'

import { Container } from './elements'
import Filter from './Filter'
import Sort from './Filter/Sort'

const Filters = () => (
  <Container>
    <Sort
      // defaultRefinement={ALGOLIA_DEFAULT_INDEX}
      // items={[
      //   { value: ALGOLIA_DEFAULT_INDEX, label: 'Views' },
      //   { value: `${ALGOLIA_DEFAULT_INDEX}_date`, label: 'Date' }
      // ]}
      title='Sort By'
    />

    <Filter
      attributeName='template'
      operator='or'
      title='Enviroment'
      transformItems={items =>
        items.map(({ label, ...item }) => {
          const { name, niceName } = getTemplate(label)

          return {
            ...item,
            label: name === label ? niceName : label
          }
        })
      }
    />

    <Filter
      attributeName='npm_dependencies.dependency'
      operator='and'
      title='Dependencies'
    />

    <Filter attributeName='tags' operator='or' title='Tags' />
  </Container>
)

export default Filters
