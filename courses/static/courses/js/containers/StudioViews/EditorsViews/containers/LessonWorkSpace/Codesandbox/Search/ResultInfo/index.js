import React from 'react'
// import { Stats, ClearRefinements } from 'react-instantsearch/dom'

import { ClearAllContainer } from './elements'

const ResultInfo = props => (
  <div style={{ marginBottom: '1rem', fontSize: '.875rem' }}>
    {/*<Stats*/}
    {/*translations={{*/}
    {/*stats: nbHits => `${nbHits.toLocaleString()} results found`*/}
    {/*}}*/}
    {/*/>*/}
    {props.count} results found
    <ClearAllContainer onClick={props.clearFilters}>
      Clear all filters
      {/*<ClearRefnements />*/}
    </ClearAllContainer>
  </div>
)

export default ResultInfo
