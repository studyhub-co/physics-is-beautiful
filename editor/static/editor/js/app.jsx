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
import {QuestionThumbnailContainer} from './containers/question_thumbnail'

import {editor} from './reducers'
import {addCurriculum, loadCurricula, loadCurriculumIfNeeded, loadModuleIfNeeded, loadLessonIfNeeded, loadQuestionIfNeeded, goToQuestion, addQuestion, moveQuestion} from './actions'

import {DockableDropTarget, DragItemTypes} from './dnd';


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
    this.state = {prototypeChoice : null}
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
    for (var i in this.props.allCurricula) {
      prototypeChoices.push(
        <option key={this.props.allCurricula[i].uuid} value={this.props.allCurricula[i].uuid}>{this.props.allCurricula[i].name + ' by ' + this.props.allCurricula[i].author}</option>
      )
    }

    return (
      <Sheet>
        <h1>My curricula</h1>
        <a onClick={this.handleAddClick} className="btn btn-primary">Create curriculum</a>
        <span> based on </span>
        <select onChange={this.handlePrototypeChoiceChange} >
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
      allCurricula : state.allCurricula,
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
    this.handleQuestionDroppedBefore = this.handleQuestionDroppedBefore.bind(this)
    
  }
  componentDidMount() {
    this.props.dispatch(loadLessonIfNeeded(this.props.match.params.uuid));
  }

  handleQuestionDroppedBefore(beforeQuestionUuid, question) {
    this.props.dispatch(moveQuestion(question.uuid, beforeQuestionUuid))
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
    var questions = [];
    for (var i in this.props.questions) {
      questions.push(
        <DockableDropTarget key={this.props.questions[i]} onDrop={this.handleQuestionDroppedBefore.bind(null, this.props.questions[i])}
                            itemType={DragItemTypes.QUESTION} selfUuid={this.props.questions[i]}>
          <QuestionThumbnailContainer key={this.props.questions[i]} uuid={this.props.questions[i]} selected={this.props.currentQuestion==this.props.questions[i]}/>
        </DockableDropTarget>
      )
    }

    return (
      <div className="lesson-editor">
        <Sheet type="problem">
          <LessonContainer uuid={this.props.match.params.uuid}/>
            {this.props.lesson_type==0 &&
              <div className="lesson-questions">
                  <a onClick={this.handlePreviousClick} className={'btn btn-default btn-arrow' + (this.props.previousQuestion?'': ' disabled')}><span className="glyphicon glyphicon-backward"/></a>
                  {questions}
                  <DockableDropTarget onDrop={this.handleQuestionDroppedBefore.bind(null, null)}
                                        itemType={DragItemTypes.QUESTION}>
                      <a onClick={this.handleAddQuestionClick} className="btn btn-default btn-add"><span className="glyphicon glyphicon-plus-sign"/><br/>Add question</a>
                   </DockableDropTarget>
                    <a onClick={this.handleNextClick} className={'btn btn-default btn-arrow' + (this.props.nextQuestion?'': ' disabled')}><span className="glyphicon glyphicon-forward"/></a>
              </div>}
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
    var questions = []
    if (state.currentQuestion && currentLesson) {      
      var idx = currentLesson.questions.indexOf(state.currentQuestion);
      if (idx > 0)
        previousQuestion = currentLesson.questions[idx - 1];
      if (idx < currentLesson.questions.length - 1)
        nextQuestion = currentLesson.questions[idx + 1];
      questions = currentLesson.questions
    }
    return {
      questions : questions,
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

const store = createStore(editor, applyMiddleware(thunkMiddleware, routerMiddleware(history))) // add  loggerMiddleware for logging



ReactDOM.render(<Provider store={store}><EditorRouter/></Provider>, document.getElementById('react-app'));

