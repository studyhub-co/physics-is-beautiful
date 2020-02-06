// TODO replace with https://github.com/mui-org/material-ui/pull/19049
import React from 'react'
import PropTypes from 'prop-types'

import { Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'
import { FaPlus, FaMinus } from 'react-icons/fa'

// renderPagination (page, pages) {
export function Pagination ({
  page, pages, handlePrevious, handleNext, handleChangePageNumber
}) {
  let previousButton = <Button onClick={() => { handlePrevious() }} className={'common-button'}>Previous</Button>
  if (page === 1) {
    previousButton = <Button disabled className={'common-button disabled-button'}>Previous</Button>
  }
  let nextButton = <Button onClick={() => { handleNext() }} className={'common-button'}>Next</Button>
  if (page === pages) {
    nextButton = <Button disabled className={'common-button disabled-button'}>Next</Button>
  }

  let handleChangePageNumberInputKeyUp = () => {
    handleChangePageNumber()
  }

  return (
    <div>
      <Form inline className={'justify-content-center'}>
        <FormGroup style={{marginBottom: 0}}>
          {previousButton}&nbsp;
          <InputGroup style={{maxWidth: 80}}>
            <FormControl
              type='text'
              value={page}
              onChange={handleChangePageNumber}
              onKeyUp={handleChangePageNumberInputKeyUp}
            />
            <InputGroup.Text>
                 / {pages}
            </InputGroup.Text>
          </InputGroup>
            &nbsp;{nextButton}
        </FormGroup>
      </Form>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  handlePrevious: PropTypes.func,
  handleNext: PropTypes.func,
  handleChangePageNumber: PropTypes.func
}
