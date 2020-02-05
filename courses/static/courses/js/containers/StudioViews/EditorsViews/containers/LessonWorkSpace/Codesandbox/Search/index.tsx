import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import qs from 'qs';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import { ThemeProvider } from 'styled-components';

import MaxWidth from '../common/components/flex/MaxWidth';
import Margin from '../common/components/spacing/Margin';

// NOTE: we create overmind store in
// courses/static/courses/js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/Codesandbox/Editor/index.jsx
// so we can't use in here, rewrited with redux store instead.

// import { useOvermind } from '../app/overmind';

import theme from '../common/theme';

import { Container, Content, Main, StyledTitle } from './elements';
import Filters from './Filters';
import Results from './Results';
import Styles, { materialUIStyles } from './search';


// import {
//   ALGOLIA_API_KEY,
//   ALGOLIA_APPLICATION_ID,
//   ALGOLIA_DEFAULT_INDEX,
// } from '@codesandbox/common/lib/utils/config';

// import { Helmet } from 'react-helmet';

// AGOLIA
// import {
//   InstantSearch,
//   SearchBox,
//   PoweredBy,
//   Configure,
// } from 'react-instantsearch/dom';
// import { History, Location } from 'history';

// import { Navigation } from '../app/pages/common/Navigation';
// import 'instantsearch.css/themes/reset.css';


interface ISearchProps {
  history: History;
  location: Location;
}

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = (location, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : '';

const Search: React.FC<ISearchProps> = ({ history, location }) => {
  // const {
  //   actions: { searchMounted },
  // } = useOvermind();

  // urls search navigation, no need now
  const [searchState, setSearchState] = useState(
    // qs.parse(location.search.slice(1))
  );
  const debouncedSetState = useRef(null);

  // useEffect(() => {
  //   searchMounted();
  // }, [searchMounted]);

  // useEffect(() => {
  //   const unlisten = history.listen((loc, action) => {
  //     if (['POP', 'PUSH'].includes(action)) {
  //       setSearchState(qs.parse(loc.search.slice(1)));
  //     }
  //
  //     return unlisten;
  //   });
  // }, [history]);

  // const onSearchStateChange = useCallback(
  //   newSearchState => {
  //     clearTimeout(debouncedSetState.current);
  //
  //     debouncedSetState.current = setTimeout(() => {
  //       history.push(
  //         searchStateToUrl(location, newSearchState),
  //         newSearchState
  //       );
  //     }, updateAfter);
  //
  //     setSearchState(newSearchState);
  //   },
  //   [history, location]
  // );

  const onSearchStateChange = useCallback(
    newSearchState => {
      clearTimeout(debouncedSetState.current);

      debouncedSetState.current = setTimeout(() => {
        history.push(
          searchStateToUrl(location, newSearchState),
          newSearchState
        );
      }, updateAfter);

      setSearchState(newSearchState);
    },
    [history, location]
  );

  const useMaterialUIStyles = materialUIStyles(theme);


  return (
    <ThemeProvider theme={theme}>
    <Container>
      {/*<Helmet>*/}
        {/*<title>Search - CodeSandbox</title>*/}
      {/*</Helmet>*/}
      <Styles />

      <MaxWidth>
        {/*<Margin vertical={1.5}>*/}
          {/*<Navigation title="Search" searchNoInput />*/}

          <Content>
            {/*<InstantSearch*/}
              {/*appId={ALGOLIA_APPLICATION_ID}*/}
              {/*apiKey={ALGOLIA_API_KEY}*/}
              {/*createURL={createURL}*/}
              {/*indexName={ALGOLIA_DEFAULT_INDEX}*/}
              {/*onSearchStateChange={onSearchStateChange}*/}
              {/*searchState={searchState}*/}
            {/*>*/}
              {/*<Configure hitsPerPage={12} />*/}

              <Main alignItems="flex-start">
                <div>
                  <StyledTitle>Search Material Type</StyledTitle>
                  {/*<PoweredBy />*/}
                   <FormControl fullWidth>
                    <InputLabel
                      className={useMaterialUIStyles.inputLabel}
                      classes={{
                        focused: useMaterialUIStyles.inputLabelFocused,
                      }}
                      htmlFor="filled-search">
                      Search
                    </InputLabel>
                    <Input
                      className={useMaterialUIStyles.input}
                      id="filled-search"
                      label="Search field"
                      type="search"
                      variant="filled" />
                   </FormControl>
                  {/*<div>SearchBox</div>*/}
                  {/*<SearchBox*/}
                    {/*autoFocus*/}
                    {/*translations={{ placeholder: 'Search Sandboxes...' }}*/}
                  {/*/>*/}
                  <Results />
                </div>
                <Filters />
              </Main>
            {/*</InstantSearch>*/}
          </Content>
        {/*</Margin>*/}
      </MaxWidth>
    </Container>
    </ThemeProvider>
  );
};

// eslint-disable-next-line import/no-default-export
// export default Search;

const mapStateToProps = (state) => {
  return {
    // searchResult: state.studio.materialTypes.searchResult
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    assignmentActions: bindActionCreators(assignmentCreators, dispatch)
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Search)
