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
import {QuestionContainer} from './containers/question'
import {CurriculumContainer} from './containers/curriculum'
import {CurriculumThumbnail} from './components/curriculum_thumbnail'
import {LessonContainer} from './containers/lesson'
import {BackButton} from './components/back_button'

import {editor} from './reducers'
import {addCurriculum, loadCurricula, loadCurriculumIfNeeded, loadModuleIfNeeded, loadLessonIfNeeded, loadQuestionIfNeeded, goToQuestion, addQuestion} from './actions'


function Sheet(props) {
  var className = 'container ' + (props.type || 'section') + '-sheet';
  return (<div className={className}>
          {props.children}
          </div>
         );
}



class Curricula extends React.Component {
  constructor(props) {
    super(props)
    this.state = {prototypeChoice : 0}
    this.handlePrototypeChoiceChange = this.handlePrototypeChoiceChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }    
  
  componentDidMount() {
    this.props.onMounted()
  }

  handlePrototypeChoiceChange(e){
    this.setState({prototypeChoice : e.target.value})
  }

  handleAddClick(){
    this.props.onAddClick(this.state.prototypeChoice)
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
    const prototypeChoices = [];
    for (var i in this.props.othersCurricula) {
      prototypeChoices.push(
        <option value={this.props.othersCurricula[i].uuid}>{this.props.othersCurricula[i].name + ' by ' + this.props.othersCurricula[i].author}</option>
      )
    }

    return (
      <Sheet>
        <h1>My curricula</h1>
        <a onClick={this.handleAddClick} className="btn btn-primary">Create curriculum</a>
        <span> based on </span>
        <select onChange={this.handlePrototypeChoiceChange} value={this.state.prototypeChoice}>
          <option value={null}>None - start from scratch</option>
          {prototypeChoices}
        </select>
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
      curricula : state.curricula,
      othersCurricula : state.othersCurricula,
    }
  },
  dispatch => {
    return {
      onAddClick : prototype => dispatch(addCurriculum(prototype)),
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


class QuestionApp extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadQuestionIfNeeded(this.props.match.params.uuid));
  }

  render() {
    return (
      <Sheet type="problem">
        <QuestionContainer uuid={this.props.match.params.uuid}/>
      </Sheet>)
  }
  
}

QuestionApp = connect()(QuestionApp)

class LessonApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleAddQuestionClick = this.handleAddQuestionClick.bind(this);
    
  }
  componentDidMount() {
    this.props.dispatch(loadLessonIfNeeded(this.props.match.params.uuid));
  }

  handlePreviousClick(){
    this.props.dispatch(goToQuestion(this.props.previousQuestion));
  }
  handleNextClick(){
    this.props.dispatch(goToQuestion(this.props.nextQuestion));
  }
  handleAddQuestionClick(){
     this.props.dispatch(addQuestion(this.props.match.params.uuid));
  }
  
  render() {
    return (
      <div>
        <Sheet type="problem">
          <LessonContainer uuid={this.props.match.params.uuid}/>
          <div className="row">
            {this.props.previousQuestion &&
              <a onClick={this.handlePreviousClick} className="btn btn-default">Previous question</a>
              }
              {this.props.nextQuestion &&
                <a onClick={this.handleNextClick} className="btn btn-default">Next question</a>
                }
                {this.props.lesson_type == 0 &&
                  <a onClick={this.handleAddQuestionClick} className="btn btn-default">Add question</a>
                  }
          </div>
          { this.props.lesson_type == 0 && this.props.currentQuestion &&
            <div>
                <hr/>
                  <QuestionContainer uuid={this.props.currentQuestion}/>
              </div>
            }
        </Sheet>
      </div>)
  }

}

LessonApp = connect(
  (state, ownProps) => {
    var previousQuestion, nextQuestion;
    var currentLesson = state.lessons[ownProps.match.params.uuid];
    if (state.currentQuestion && state.lessons[ownProps.match.params.uuid]) {      
      var idx = currentLesson.questions.indexOf(state.currentQuestion);
      if (idx > 0)
        previousQuestion = currentLesson.questions[idx - 1];
      if (idx < currentLesson.questions.length - 1)
        nextQuestion = currentLesson.questions[idx + 1];
      
    }
    return {
      currentQuestion : state.currentQuestion,
      previousQuestion  : previousQuestion,
      nextQuestion : nextQuestion,
      lesson_type : currentLesson && currentLesson.lesson_type,
    }
  })(LessonApp)



class EditorRouter extends React.Component {

  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path='/curricula/:uuid' component={CurriculumApp} />
          <Route path='/modules/:uuid' component={ModuleApp} />
          <Route path='/lessons/:uuid' component={LessonApp} />
          <Route path='/questions/:uuid' component={QuestionApp} />
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

