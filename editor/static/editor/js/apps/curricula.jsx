import React from 'react'
import { connect } from 'react-redux'
import { Sheet } from './sheet'
import { BackButton } from './../components/back_button'
import { CurriculumThumbnail } from './../components/curriculum_thumbnail'
import { AddCurriculumButton } from './../components/add_curriculum_button'
import { addCurriculum, loadCurricula, loadCurriculumIfNeeded } from './../actions'
import { Grid, Row } from 'react-bootstrap'
import { history } from './../history'

class Curricula extends React.Component {
  constructor (props) {
    super(props)
    this.state = {prototypeChoice : null}
    this.handlePrototypeChoiceChange = this.handlePrototypeChoiceChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  componentDidMount () {
    this.props.onMounted()
  }

  handlePrototypeChoiceChange (e) {
    this.setState({prototypeChoice: e.target.value})
  }

  handleAddClick () {
    this.props.onAddClick(this.state.prototypeChoice)
  }

  render () {
    const curricula = []
    for (var uuid in this.props.curricula) {
      curricula.push(
        <CurriculumThumbnail
          key={uuid}
          {...this.props.curricula[uuid]}
          onEditCurriculumProfileClick={this.props.onEditCurriculumProfileClick.bind(null, uuid)}
          onDeleteCurriculumClick={this.props.onDeleteCurriculumClick.bind(null, uuid)}
          onClick={this.props.onCurriculumClick.bind(null, uuid)} />
      )
    }

    const prototypeChoices = []
    for (var i in this.props.allCurricula) {
      prototypeChoices.push(
        <option
          key={this.props.allCurricula[i].uuid}
          value={this.props.allCurricula[i].uuid}>
          {this.props.allCurricula[i].name + ' by ' + this.props.allCurricula[i].author}
        </option>
      )
    }

    return (
      <div>
        {/*<a onClick={this.handleAddClick} className="btn btn-primary">Create curriculum</a>*/}
        {/*<span> based on </span>*/}
        {/*<select onChange={this.handlePrototypeChoiceChange} >*/}
          {/*<option value={null}>None - start from scratch</option>*/}
          {/*{prototypeChoices}*/}
        {/*</select>*/}
        {/*<hr/>*/}
        <div className='row'>
          <Grid fluid>
            <Row>
              {curricula}
              <AddCurriculumButton onClick={this.handleAddClick} />
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

let CurriculaApp = connect(
  state => {
    return {
      curriculum: state.curriculum,
      curricula: state.curricula,
      allCurricula: state.allCurricula
    }
  },
  dispatch => {
    return {
      onAddClick: prototype => dispatch(addCurriculum(prototype)),
      onMounted: () => dispatch(loadCurricula()),
      onCurriculumClick: (uuid) => { history.push('/editor/curricula/' + uuid + '/') }}
    // onCurriculumClick: (uuid) => dispatch(loadCurriculumIfNeeded(uuid))}
  }
)(Curricula)

CurriculaApp = connect()(CurriculaApp)
export {CurriculaApp}
