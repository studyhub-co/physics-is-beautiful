import React, { useCallback, useState } from 'react'
import { MdExpandLess as Up, MdExpandMore as Down } from 'react-icons/md'
// import Up from 'react-icons/lib/md/expand-less';
// import { SortBy } from 'react-instantsearch-dom'

import { Button, Container, Title } from './elements'

const Sort = ({ defaultRefinement, items, title }) => {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => {
    setOpen(isOpen => !isOpen)
  }, [])

  return (
    <Container open={open}>
      <Title>
        <span>{title}</span>

        <Button onClick={toggle}>{open ? <Up /> : <Down />}</Button>
      </Title>

      SortBy:
      {/*<SortBy defaultRefinement={defaultRefinement} items={items} />*/}
    </Container>
  )
}

export default Sort
