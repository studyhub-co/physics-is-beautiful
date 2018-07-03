import React from 'react'
import { connect } from 'react-redux'
import { changeSelectedTab } from './../actions'
import {Tabs, TabLink, TabContent} from 'react-tabs-redux';

function Sheet(props) {
  var className = 'container ' + (props.type || 'section') + '-sheet';
  return (<div className={className}>
          <h1 style={{'color': '#08d1ff'}}>Curricula</h1>
          {props.children}

          </div>
         );
}

class CurriculaDashboard extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {prototypeChoice : null}
  //   this.handlePrototypeChoiceChange = this.handlePrototypeChoiceChange.bind(this)
  //   this.handleAddClick = this.handleAddClick.bind(this)
  // }

  // componentDidMount() {
  //   this.props.onMounted()
  // }

  // handlePrototypeChoiceChange(e){
  //   this.setState({prototypeChoice : e.target.value})
  // }
  //
  // handleAddClick(){
  //   this.props.onAddClick(this.state.prototypeChoice)
  // }

  render() {
    // const curricula = [];
    // for (var uuid in this.props.curricula){
    //   curricula.push(
    //     <CurriculumThumbnail key={uuid}
    //                          {...this.props.curricula[uuid]}
    //                          onClick={this.props.onCurriculumClick.bind(null, uuid)}/>
    //   );
    // }
    // const prototypeChoices = [];
    // for (var i in this.props.allCurricula) {
    //   prototypeChoices.push(
    //     <option key={this.props.allCurricula[i].uuid} value={this.props.allCurricula[i].uuid}>{this.props.allCurricula[i].name + ' by ' + this.props.allCurricula[i].author}</option>
    //   )
    // }

    return (<Sheet>
       <Tabs
            name="tabs"
            className="tabs"
            handleSelect={this.props.changeSelectedTab}
            selectedTab={this.props.tabs}
        >
          <div className="tab-links">
                <TabLink to="my">My Curricula</TabLink>
                <TabLink to="studio">Curriculum studio</TabLink>
                <TabLink to="browse">Browse curricula</TabLink>
            </div>

            <div className="content">
                <TabContent for="my">
                    <h2>Tab1 content</h2>
                    <p>
                        Lorem ipsum dolor sit amet, in vel malorum adipiscing. Duis deleniti ei cum, amet graece nec an.
                        Eu vix sumo atqui apeirian, nullam integre accusamus his at, animal feugiat in sed.
                    </p>
                    <p>
                        Pro vitae percipit no. Per ignota audire no. Ex hinc mutat delicata sit, sit eu erant tempor vivendo. Ad modus nusquam recusabo sit. Per ne deserunt periculis, ad sea saepe perfecto expetendis, est nonumy contentiones voluptatibus cu.
                    </p>
                </TabContent>
                <TabContent for="studio">
                    <h2>Tab2 content</h2>
                    <div>¯\_(ツ)_/¯</div>
                </TabContent>
                <TabContent for="browse">
                    <h2>Tab3 content</h2>
                    <div>(╯°□°）╯︵ ┻━┻)</div>
                </TabContent>
            </div>
        </Tabs>
    </Sheet>
    );
  }
}

export let CurriculaDashboardApp = connect(
  state => {
    return {
      // curricula : state.curricula,
      // allCurricula : state.allCurricula,
    }
  },
  dispatch => {
    return {
      // onAddClick : prototype => dispatch(addCurriculum(prototype)),
      //onMounted : () => dispatch(loadCurricula()),
      // onCurriculumClick : (uuid) => {history.push('/curricula/'+uuid+'/');}
      onTabChanged: (selectedTab, tabNamespace) => dispatch(changeSelectedTab(selectedTab, tabNamespace))
    }
  })(CurriculaDashboard);


 // //<Sheet>
 //      {/*<div>*/}
 //        {/*<a onClick={this.handleAddClick} className="btn btn-primary">Create curriculum</a>*/}
 //        {/*<span> based on </span>*/}
 //        {/*<select onChange={this.handlePrototypeChoiceChange} >*/}
 //          {/*<option value={null}>None - start from scratch</option>*/}
 //          {/*{prototypeChoices}*/}
 //        {/*</select>*/}
 //        {/*<hr/>*/}
 //        {/*<div className="row">*/}
 //          {/*{curricula}*/}
 //        {/*</div>*/}
 //      {/*</div>*/}
 //      //</Sheet>