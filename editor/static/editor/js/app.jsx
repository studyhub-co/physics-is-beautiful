import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {CurriculumDetailsContainer, ModuleDetailsContainer} from './containers'
import {Curriculum} from './components'

function Sheet(props) {
  return (<div className="container section-sheet">
          {props.children}
          </div>
         );
}


class CurriculaApp extends React.Component {

  constructor(props){
    super(props);
    this.state = {curricula : []};
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount(){
    this.fetchState();
  }
  
  fetchState() {
    $.ajax({
      async: true,
      url: '/editor/api/curricula/',
      context: this,
      success: function(data, status, jqXHR) {
        this.setState({curricula : data});
      }
    });
  }

  handleAddClick() {
    $.ajax({
      async: true,
      url: '/editor/api/curricula/',
      method : 'POST',
      context: this,
      data : {name : 'New curriculum'},
      success: function(data, status, jqXHR) {
        this.props.history.push('/curricula/'+data.uuid+'/');
      }
    });
    
  }

  handleCurriculumClick(curriculum) {
    this.props.history.push('/curricula/'+curriculum.uuid+'/');
  }
  
  render() {
    const curricula = [];
    for (var i = 0; i < this.state.curricula.length; i++){
      
      curricula.push(
        <Curriculum key={this.state.curricula[i].uuid} {...this.state.curricula[i]} onClick={this.handleCurriculumClick.bind(this, this.state.curricula[i])}/>
      );
    }
    return (
      <Sheet>
        <h1>My curricula</h1>
        <a onClick={this.handleAddClick} className="btn btn-primary">Add curriculum</a>
        <hr/>
        <div className="row">
          {curricula}
        </div>
      </Sheet>
    );
  }
}


class CurriculumApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Sheet>
            <CurriculumDetailsContainer uuid={this.props.match.params.uuid} history={this.props.history}/>
            </Sheet>)
  }
}


class ModuleApp extends React.Component {
  render() {
    return (<Sheet>
            <ModuleDetailsContainer uuid={this.props.match.params.uuid} history={this.props.history}/>
            </Sheet>)
  }
  
}


class EditorRouter extends React.Component {

  render() {
    return (
      <BrowserRouter basename="/editor">
        <Switch>
          <Route path='/curricula/:uuid' component={CurriculumApp} />
          <Route path='/modules/:uuid' component={ModuleApp} />
          <Route path='/' component={CurriculaApp} />
        
        </Switch>

      </BrowserRouter>
    );
  }

}


ReactDOM.render(<EditorRouter/>, document.getElementById('react-app'));

