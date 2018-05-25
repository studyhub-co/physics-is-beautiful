import React from 'react';
import {CurriculumDetails, Unit, ModuleDetails, Lesson} from './components';

function  patch(prop, val){
  this.setState(state => {
    var upd = {};
    upd[prop] = val;
      $.ajax({url:state.url,
              type:'PATCH',
              data:upd}); //TODO: update on response
      
      return upd;
    });
  }

function patchImage(prop, val) {
  var formData = new FormData();
  formData.append(prop, val);
  $.ajax({url:this.state.url,
          type:'PATCH',
          processData: false,
          contentType: false,
          data:formData,
          context:this,
          success : function(data){
            this.setState(data);
          }
         });
}


export class CurriculumDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = patch.bind(this, 'name');
    this.handleImageChange = patchImage.bind(this, 'image');
    this.handleAddUnitClick = this.handleAddUnitClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteUnitClick = this.handleDeleteUnitClick.bind(this);
    
  }
  componentDidMount(){
    this.fetchState();
  }
  
  fetchState() {
    $.ajax({
      async: true,
      url: '/editor/api/curricula/'+this.props.uuid +'/',
      context: this,
      success: function(data, status, jqXHR) {
        this.setState(data);
      }
    });
  }

  handleAddUnitClick(e) {
    $.ajax({
      async: true,
      url: '/editor/api/units/',
      method : 'POST',
      context: this,
      data : {name : 'New unit', curriculum:this.state.uuid},
      success: function(data, status, jqXHR) {
        this.setState(state => {
          var updated = $.extend(true, {}, state);
          updated.units.push(data);
          return updated;
        });        
      }
    });   
    
    e.preventDefault();
    return false;
  }
  
  handleDeleteClick() {
    if (confirm('This will permanently delete curricilum "'+this.state.name+'" with all its materials. Are you sure?')){
      $.ajax({
        async : true,
        url : this.state.url,
        method : 'DELETE',
        context : this,
        success : function(data, status, jqXHR) {
          this.props.history.push('/');
        }
      });
    }
  }

  handleDeleteUnitClick(unit) {
    if (confirm('This will permanently delete unit "'+unit.name+'" with all its contents. Are you sure?')){
      $.ajax({
        async : true,
        url : unit.url,
        method : 'DELETE',
        context : this,
        success : function(data, status, jqXHR) {
          this.setState(state => {
            var newUnits = [];
            for (var i=0; i<this.state.units.length; i++) {
              if (this.state.units[i].uuid != unit.uuid) {
                newUnits.push(this.state.units[i]);
              }
            }
            return {units : newUnits};
          });
        }
      });
    }
  }

  
  render() {
    if (this.state) {
      return <CurriculumDetails {...this.state}
      history={this.props.history}
      onNameChange={this.handleNameChange}
      onUnitNameChange={this.handleUnitNameChange}
      onDeleteUnitClick={this.handleDeleteUnitClick}
      onAddUnitClick={this.handleAddUnitClick}
      onDeleteClick={this.handleDeleteClick}
      onImageChange={this.handleImageChange}
        />
        
    } else{
      return <div>loading...</div>
    }
  }    
}


export class UnitContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.unit
    this.handleNameChange = patch.bind(this, 'name');
    this.handleImageChange = patchImage.bind(this, 'image');   
    this.handleAddModuleClick = this.handleAddModuleClick.bind(this);
    this.handleModuleInsert = this.handleModuleInsert.bind(this);
  }

  handleAddModuleClick() {
    $.ajax({
      async: true,
      url: '/editor/api/modules/',
      method : 'POST',
      context: this,
      data : {name : 'New module',
              unit : this.state.uuid},
      success: function(data, status, jqXHR) {
        this.props.history.push('/modules/'+data.uuid+'/');
      }
    });    
  }

  fetchState() {
    $.ajax({
      async: true,
      url: '/editor/api/units/'+this.props.unit.uuid +'/',
      context: this,
      success: function(data, status, jqXHR) {
        this.setState(data);
      }
    });
    
  }

  handleModuleInsert(beforeModule, module){
    var newPosition;
    if (beforeModule)
      newPosition = beforeModule.position;
    else {
      if (this.state.modules.length > 0)
        newPosition = this.state.modules[this.state.modules.length-1].position + 1;
      else
        newPosition = 1;
    }
    $.ajax({
      async: true,
      url: '/editor/api/modules/'+module.uuid+'/',
      method : 'PATCH',
      context: this,
      data : {position : newPosition,
              unit : this.state.uuid}, //TODO:??
      success: function(data, status, jqXHR) {
        this.fetchState();
      }
    });    

  }
  
  render() {
    return <Unit {...this.state}
    onNameChange={this.handleNameChange}
    onImageChange={this.handleImageChange}
    onAddModuleClick={this.handleAddModuleClick}
    onModuleDroppedBefore={this.handleModuleInsert}
    onDeleteClick={() => this.props.onDeleteClick(this.state)}
    history={this.props.history}/>
  }
  
}

export class ModuleDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = patch.bind(this, 'name');
    this.handleImageChange = patchImage.bind(this, 'image');
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  componentDidMount(){
    this.fetchState();
  }
  
  fetchState() {
    $.ajax({
      async: true,
      url: '/editor/api/modules/'+this.props.uuid +'/',
      context: this,
      success: function(data, status, jqXHR) {
        this.setState(data);
      }
    });
  }

  handleDeleteClick() {
    if (confirm('This will permanently delete module "'+this.state.name+'" with all its lessons. Are you sure?')){
      $.ajax({
        async : true,
        url : this.state.url,
        method : 'DELETE',
        context : this,
        success : function(data, status, jqXHR) {
          this.props.history.push('/curricula/'+this.state.curriculum);
        }
      });
    }
  }
  
  render() {
    if (this.state) {
      return <ModuleDetails {...this.state} onNameChange={this.handleNameChange} onImageChange={this.handleImageChange} onDeleteClick={this.handleDeleteClick}/>
    } else {
      return <div>Loading...</div>
    }
  }
}


export class LessonContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = props.lesson;
    this.handleNameChange = patch.bind(this, 'name');
    this.handleImageChange = patchImage.bind(this, 'image');
  }

  
  render() {
    return <Lesson {...this.state} onNameChange={this.handleNameChange} onImageChange={this.handleImageChange}/>
  }
}
