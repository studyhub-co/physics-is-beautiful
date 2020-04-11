import React, { useState, useEffect } from 'react'
// import { Hits, Pagination } from 'react-instantsearch/dom'

import Centered from '@codesandbox/common/lib/components/flex/Centered'
import SandboxCard from '@codesandbox/common/lib/components/SandboxCard'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name'
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator'
// import { Pagination } from '../../../../../../../../components/react-bootstrap/pagination'

import ResultInfo from '../ResultInfo'
import { Container } from './elements'
import InfiniteScroll from 'react-infinite-scroller'

// const selectSandbox = ({ alias, git, objectID }) =>
//   window.open(sandboxUrl({ alias, id: objectID, git }))

const Results = ({
  resultsObj, fetchNextPage, selectMaterialType, resetResultsObj
}) => {
  // console.log(resultsObj)
  const [nextHref, setNextHref] = useState(null)
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (resultsObj && resultsObj.results) {
      let itemsToAppend = []

      resultsObj.results.map((materialType, index) => (
        itemsToAppend.push(materialType)))

      if (resultsObj.next) {
        setHasMoreItems(true)
        setNextHref(resultsObj.next)
        // set next page items
        setItems([...items, ...itemsToAppend])
      } else {
        // set first page items
        setItems(itemsToAppend)
      }
    }
  }, [resultsObj])

  useEffect(() => {
    // on ummount
    return () => {
      // reset redux store
      resetResultsObj()
      // reset state
      setItems([])
      setHasMoreItems(false)
      setNextHref(null)
    }
  }, [])

  return (
    <Container>
      <ResultInfo />
      <Margin bottom={2}>
        <div className={'ais-Hits'}>
          <InfiniteScroll
            className={'ais-Hits-list'}
            pageStart={0}
            loadMore={pageNumber => { setHasMoreItems(false); fetchNextPage(nextHref) }}
            hasMore={hasMoreItems}
            loader={<div key={nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
          >
            {
              items.map(
                (materialType) => (<div className={'ais-Hits-item'} key={materialType.uuid}>
                  <SandboxCard
                    noHeight
                    selectMaterialType={ () => { selectMaterialType(materialType) } }
                    sandbox={{
                      title: materialType.name,
                      id: materialType.uuid
                    }}
                  />
                </div>)
              )
            }
          </InfiniteScroll>
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
        {/* <Pagination /> */}
      </Centered>
    </Container>
  )
}

export default Results
