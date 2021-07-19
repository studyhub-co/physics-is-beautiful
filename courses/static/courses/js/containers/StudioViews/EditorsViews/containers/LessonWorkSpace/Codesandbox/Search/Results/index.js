import React, { useState, useEffect } from 'react'
// import { Hits, Pagination } from 'react-instantsearch/dom'

import Centered from '@codesandbox/common/lib/components/flex/Centered'
import SandboxCard from '@codesandbox/common/lib/components/SandboxCard'
import Margin from '@codesandbox/common/lib/components/spacing/Margin'
// import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name'
// import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator'
// import { Pagination } from '../../../../../../../../components/react-bootstrap/pagination'

import ResultInfo from '../ResultInfo'
import { Container } from './elements'
import InfiniteScroll from 'react-infinite-scroller'

// const selectSandbox = ({ alias, git, objectID }) =>
//   window.open(sandboxUrl({ alias, id: objectID, git }))

const Results = ({
  resultsObj,
  fetchNextPage,
  selectMaterialType,
  resetResultsObj,
  searchString,
  clearSearchString,
}) => {
  // console.log(resultsObj)
  const [nextHref, setNextHref] = useState(null)
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState(null)

  useEffect(() => {
    if (resultsObj && resultsObj.results) {
      if (nextHref && resultsObj.next === nextHref) {
        return
      }

      let itemsToAppend = []

      resultsObj.results.map((materialType, index) =>
        itemsToAppend.push(materialType),
      )

      if (resultsObj.previous) {
        setItems([...items, ...itemsToAppend])
        // set next page items
      } else {
        // set first page items
        setItems(itemsToAppend)
      }

      setNextHref(resultsObj.next)

      if (resultsObj.next) {
        setHasMoreItems(true)
      } else {
        setHasMoreItems(false)
      }
    }
  }, [resultsObj])

  useEffect(() => {
    if (searchString) {
      const filtered = items.filter(
        item =>
          item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1,
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems(false)
    }
  }, [searchString])

  useEffect(() => {
    // on unmount
    return () => {
      // reset redux store
      resetResultsObj()
      // reset state
      setItems([])
      setHasMoreItems(false)
      setNextHref(null)
    }
  }, [])

  const items2Show = filteredItems ? filteredItems : items

  return (
    <Container>
      <ResultInfo
        count={items2Show.length}
        clearFilters={() => {
          setFilteredItems(null)
          clearSearchString()
        }}
      />
      <Margin bottom={2}>
        <div className={'ais-Hits'}>
          <InfiniteScroll
            className={'ais-Hits-list'}
            pageStart={0}
            loadMore={() => {
              if (hasMoreItems) {
                fetchNextPage(nextHref)
              }
            }}
            hasMore={hasMoreItems}
            loader={<div key={nextHref} style={{ clear: 'both' }} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
          >
            {items2Show.map(materialType => (
              <div className={'ais-Hits-item'} key={materialType.uuid}>
                <SandboxCard
                  noHeight
                  selectMaterialType={() => {
                    selectMaterialType(materialType)
                  }}
                  sandbox={{
                    title: materialType.name,
                    id: materialType.uuid,
                  }}
                />
              </div>
            ))}
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
