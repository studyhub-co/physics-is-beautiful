import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'
import { Dispatch, bindActionCreators, compose } from 'redux'
// import {Dispatch} from '../../../../../../../ts/types/redux'
import qs from 'qs';
import { useActions } from './hooks'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import { ThemeProvider } from 'styled-components';

import MaxWidth from '../common/src/components/flex/MaxWidth';
import Margin from '../common/src/components/spacing/Margin';

import * as problemTypeActionsCreators from '../../../../../../../actions/problemType'
import * as studioActionsCreators from '../../../../../../../actions/studio'

// NOTE: we create overmind store in
// courses/static/courses/js/containers/StudioViews/EditorsViews/containers/LessonWorkSpace/Codesandbox/Editor/index.jsx
// so we can't use in here, rewrited with redux store instead.

// import { useOvermind } from '../app/overmind';

import theme from '../common/src/theme';

import { Container, Content, Main, StyledTitle } from './elements';
import Filters from './Filters';
import Results from './Results';
import Styles, { materialUIStyles } from './search';
import PropTypes from 'prop-types'
import { Pagination } from '../../../../../../../components/react-bootstrap/pagination'


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

const Search: React.FC<ISearchProps> = ({
      // history,
      // location,
      //actions
      // problemTypeActions,
      // studioActions,
      //state
      // problemTypesPaginatedListObject,
      // currentMaterial
}) => {
  // const {
  //   actions: { searchMounted },
  // } = useOvermind();

  // redux store
  const problemTypesPaginatedListObject =
     useSelector(state => state.problemType.problemTypesPaginatedListObject)
  const currentMaterial =
     useSelector(state => state.studio.currentMaterial)

  const problemTypeActions = useActions(problemTypeActionsCreators)
  const studioActions = useActions(studioActionsCreators)

  // urls search navigation, no need now
  const [searchState, setSearchState] = useState(
    // qs.parse(location.search.slice(1))
  );

  const debouncedSetState = useRef(null);

  // useEffect(() => {
  //   searchMounted();
  // }, [searchMounted]);

  useEffect(() => {
    problemTypeActions.fetchProblemTypes();
  }, []);

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
        // history.push(
        //   searchStateToUrl(location, newSearchState),
        //   newSearchState
        // );
      }, updateAfter);

      setSearchState(newSearchState);
    },
    [history, location]
  );

  const selectMaterialType = (materialType) => {
    // set materialType to current material
    studioActions.setMaterialProblemType(currentMaterial, materialType)
  }

  const useMaterialUIStyles = materialUIStyles(theme);
  const fetchNextPage = (nextHref: string) => {
    problemTypeActions.fetchProblemTypes(nextHref);
  }

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
                      // label="Search field"
                      type="search"
                      // variant="filled"
                    />
                   </FormControl>
                  {/*<div>SearchBox</div>*/}
                  {/*<SearchBox*/}
                    {/*autoFocus*/}
                    {/*translations={{ placeholder: 'Search Sandboxes...' }}*/}
                  {/*/>*/}
                  <Results
                    selectMaterialType={selectMaterialType}
                    resultsObj={problemTypesPaginatedListObject}
                    resetResultsObj={problemTypeActions.resetProblemTypes}
                    fetchNextPage={fetchNextPage}
                  />
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

// const mapStateToProps = (state: any) => {
//   return {
//     problemTypesPaginatedListObject: state.problemType.problemTypesPaginatedListObject,
//     currentMaterial: state.studio.currentMaterial
//   }
// }

// TODO
//interface StateProps {
//   propFromReduxStore: string
// }
//
// interface DispatchProps {
//   onSomeEvent: () => void
// }
//
// type Props = StateProps & DispatchProps & OwnProps
// function mapDispatchToProps(dispatch: Redux.Dispatch<any>, ownProps: OwnProps): DispatchProps {
// export function mapDispatchToProps(dispatch: Dispatch<any>) {
//   return {
//     problemTypeActions: bindActionCreators(problemTypeActionsCreators, dispatch),
//     studioActions: bindActionCreators(studioActionsCreators, dispatch)
//   }
// }
//
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )
//
// export default compose(
//   withConnect,
//   memo, // no need with useSelector
// )(Search)

export default Search