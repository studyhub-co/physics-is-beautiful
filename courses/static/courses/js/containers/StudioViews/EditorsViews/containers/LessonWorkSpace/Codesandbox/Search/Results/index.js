import React from 'react'
// import { Hits, Pagination } from 'react-instantsearch/dom'

import Centered from '../../common/components/flex/Centered'
import SandboxCard from '../../common/components/SandboxCard'
import Margin from '../../common/components/spacing/Margin'
import { getSandboxName } from '../../common/utils/get-sandbox-name'
import { sandboxUrl } from '../../common/utils/url-generator'

import ResultInfo from '../ResultInfo'
import { Container } from './elements'

// const selectSandbox = ({ alias, git, objectID }) =>
//   window.open(sandboxUrl({ alias, id: objectID, git }))

const Results = () => (
  <Container>
    <ResultInfo />
    <Margin bottom={2}>
      <div className={'ais-Hits'}>
        <div className={'ais-Hits-list'}>
          <div className={'ais-Hits-item'}>
            <SandboxCard
              noHeight
              sandbox={{
                title: 'Test',
                id: 'uuid'
              }}
            />
          </div>
          <div className={'ais-Hits-item'}>
            <SandboxCard
              noHeight
              sandbox={{
                title: 'Test',
                id: 'uuid'
              }}
            />
          </div>
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
      {/* <Pagination /> */}
    </Centered>
  </Container>
)

export default Results
