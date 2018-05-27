import React from 'react';
import { connect } from 'react-redux'

import { history } from '../history';

import {ModuleThumbnail} from '../components/module_thumbnail';

const mapStateToProps = (state, ownProps) => {
  var mod = state.modules[ownProps.uuid];
  return {
    name : mod.name,
    image : mod.image,
    onClick : () => { history.push('/modules/'+ownProps.uuid+'/') }
  }
}

 
export const ModuleThumbnailContainer = connect(mapStateToProps)(ModuleThumbnail);
