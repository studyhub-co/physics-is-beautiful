import React from 'react';

import { history } from '../history';

export class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    history.push(this.props.link);    
  }
  render() {
    return <a href={history.createHref({pathname:this.props.link})} onClick={this.handleClick} className="btn"><span className="glyphicon glyphicon-chevron-left"/></a>
  }
}
