import React from 'react';


class LockedItem extends React.Component {
    render() {
        return (
            <div className="col-md-1">
                <div className="thumbnail">
                    <img className="grayed-out-img" src={this.props.item.image}/>
                </div>
                <h1 className="module-locked">
                    {this.props.item.name}
                    <span className="glyphicon glyphicon-lock"></span>
                </h1>
            </div>
        );
    }
}


class UnlockedItem extends React.Component {
    render() {
        return (
            <a href={this.props.item.href}>
                <div className="col-md-1 module-accessible-block">
                    <div className="thumbnail">
                        <img src={this.props.item.image}/>
                    </div>
                    <h1 className="module-accessible">
                        {this.props.item.name}
                        <span></span>
                    </h1>
                </div>
            </a>
        );
    }
}


class CompleteItem extends React.Component {
    render() {
        return (
            <a href={this.props.item.href}>
                <div className="col-md-1">
                    <div className="thumbnail">
                        <img src={this.props.item.image}/>
                    </div>
                    <h1 className="module-completed">
                        {this.props.item.name}
                        <span className="glyphicon glyphicon-ok"></span>
                    </h1>
                </div>
            </a>
        );
    }
}


class Item extends React.Component {
    render() {
        if (this.props.item.locked) {
            return <LockedItem item={this.props.item}/>;
        } else if (this.props.item.complete) {
            return <CompleteItem item={this.props.item}/>;
        } else {
            return <UnlockedItem item={this.props.item}/>;
        }
    }
}


export class Section extends React.Component {
    render() {
        var items = [];
        this.props.items.forEach(function(el) {
            items.push(<Item key={el.uuid} item={el}/>);
        });
        return (
            <div>
                <div className="section-title"><h1>{this.props.name}</h1></div>
                <div className="row">
                    {items}
                </div>
            </div>
        );
    }
}
