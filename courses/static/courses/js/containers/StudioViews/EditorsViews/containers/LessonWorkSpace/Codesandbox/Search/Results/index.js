import React from 'react'
// import { Hits, Pagination } from 'react-instantsearch/dom'

import Centered from '../../common/components/flex/Centered'
import SandboxCard from '../../common/components/SandboxCard'
import Margin from '../../common/components/spacing/Margin'
import { getSandboxName } from '../../common/utils/get-sandbox-name'
import { sandboxUrl } from '../../common/utils/url-generator'
import { Pagination } from '../../../../../../../../components/react-bootstrap/pagination'

import ResultInfo from '../ResultInfo'
import { Container } from './elements'

// const selectSandbox = ({ alias, git, objectID }) =>
//   window.open(sandboxUrl({ alias, id: objectID, git }))

// TODO replace with InfiniteScroll ??
//  editor/static/editor/js/containers/browseCurricula/search/lessons.jsx

const Results = ({resultsObj}) => {
  // console.log(resultsObj)

  return (
    <Container>
      <ResultInfo />
      <Margin bottom={2}>
        <div className={'ais-Hits'}>
          <div className={'ais-Hits-list'}>
            { resultsObj && resultsObj.results
              ? resultsObj.results.map((materialType, index) => (
                <div className={'ais-Hits-item'} key={materialType.uuid}>
                  <SandboxCard
                    noHeight
                    sandbox={{
                      title: materialType.name,
                      id: materialType.uuid
                    }}
                  />
                </div>)) : null }
          </div>
        </div>
        {/* <Hits */}
        {/* hitComponent={({ hit }) => ( */}
        {/* <SandboxCard */}
        {/* selectSandbox={() => selectSandbox(hit)} */}
        {/* noHeight */}
        {/* sandbox={{ */}
        {/* ...hit, */}
        {/* title: getSandboxName({ */}
        {/* id: hit.objectID, */}
        {/* alias: hit.alias, */}
        {/* git: hit.git, */}
        {/* title: hit.title */}
        {/* }), */}
        {/* id: hit.objectID */}
        {/* }} */}
        {/* /> */}
        {/* )} */}
        {/* /> */}
      </Margin>

      <Centered horizontal>
        <Pagination />
        {/* <Pagination /> */}
      </Centered>
    </Container>
  )
}

export default Results
