import ReactDOM from 'react-dom';
import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { ConnectedRouter,  routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { history } from './history';

import {ModuleContainer} from './containers/module'
import {CurriculumContainer} from './containers/curriculum'
import {CurriculumThumbnail} from './components/curriculum_thumbnail'
import {BackButton} from './components/back_button'

import {editor} from './reducers'
import {addCurriculum, loadCurricula, loadCurriculumIfNeeded, loadModuleIfNeeded} from './actions'


function Sheet(props) {
  return (<div className="container section-sheet">
          {props.children}
          </div>
         );
}



class Curricula extends React.Component {
  componentDidMount() {
    this.props.onMounted()
  }
  render() {
    const curricula = [];
    for (var uuid in this.props.curricula){
      
      curricula.push(
        <CurriculumThumbnail key={uuid}
                             {...this.props.curricula[uuid]}
                             onClick={this.props.onCurriculumClick.bind(null, uuid)}/>
      );
    }
    return (
      <Sheet>
        <h1>My curricula</h1>
        <a onClick={this.props.onAddClick} className="btn btn-primary">Add curriculum</a>
        <hr/>
        <div className="row">
          {curricula}
        </div>
      </Sheet>
    );
  }

}

let CurriculaApp = connect(
  state => {
    return {
      curricula : state.curricula
    }
  },
  dispatch => {
    return {
      onAddClick : () => dispatch(addCurriculum()),
      onMounted : () => dispatch(loadCurricula()),
      onCurriculumClick : (uuid) => {history.push('/curricula/'+uuid+'/');}
    }
  })(Curricula);


class CurriculumApp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(loadCurriculumIfNeeded(this.props.match.params.uuid));
  }
  render() {
    return (<Sheet>
            <BackButton link="/"/>
            <CurriculumContainer uuid={this.props.match.params.uuid}/> 
            </Sheet>)
  }
}

CurriculumApp = connect()(CurriculumApp)

class ModuleApp extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadModuleIfNeeded(this.props.match.params.uuid));
  }

  render() {
    return (<Sheet>
            <ModuleContainer uuid={this.props.match.params.uuid}/>
            </Sheet>)
  }
  
}
ModuleApp = connect()(ModuleApp)


class EditorRouter extends React.Component {

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/curricula/:uuid' component={CurriculumApp} />
          <Route path='/modules/:uuid' component={ModuleApp} />
          <Route path='/' component={CurriculaApp} />
        
        </Switch>

      </ConnectedRouter>
    );
  }

}
EditorRouter = DragDropContext(HTML5Backend)(EditorRouter);

const loggerMiddleware = createLogger()

const store = createStore(editor, applyMiddleware(thunkMiddleware, routerMiddleware(history), loggerMiddleware));



ReactDOM.render(<Provider store={store}><EditorRouter/></Provider>, document.getElementById('react-app'));

