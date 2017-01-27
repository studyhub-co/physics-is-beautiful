import React from 'react';


class Item extends React.Component {
    render() {
        return (
            <div className="col-md-1 module-accessible-block">
                <a href="{this.props.href}">
                    <div className="thumbnail">
                        <img src="{this.props.image}"/>
                    </div>
                    <h1 className="module-accessible">
                        {this.props.name}
                        <span></span>
                    </h1>
                </a>
            </div>
        );
    }
}


class Section extends React.Component {
    render() {
        var items = [];
        this.props.items.forEach(function(el) {
            items.push(<Item key={el.uid} name={el.name} image={el.image} href={el.href}/>);
        });
        return (
            <div style={{width: "100%"}}>
                <div className="section-title"><h1>{this.props.name}</h1></div>
                <div className="row">
                    {items}
                </div>
            </div>
        );
    }
}


class Sheet extends React.Component {
    render() {
        var backLink = '';
        if (this.props.backLink) {
            backLink = <a id="backToDashboard" href="{this.props.backLink}" type="button" className="btn btn-default btn-sm">
                    <span className="glyphicon glyphicon-chevron-left" style={{color: '#888'}}></span>
                </a>
        }
        var sections = [];
        this.props.sections.forEach(function(el) {
            sections.push(<Section key={el.uid} name={el.name} items={el.items}/>);
        });
        return (
            <div className="container">
                {backLink}
                {sections}
                <div></div>
            </div>
        );
    }
}


export default class App extends React.Component {
    render() {
        var sections = [
            {
                name: "Basics",
                items: [
                    {
                        name: "Vectors (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "1",
                    },
                    {
                        name: "Vectors (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "2",
                    },
                    {
                        name: "Second (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "3",
                    },
                    {
                        name: "Stuff alot (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "4",
                    }
                ],
                uid: "1",
            },
            {
                name: "Other",
                items: [
                    {
                        name: "Vectors (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "1",
                    },
                    {
                        name: "Vectors (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "2",
                    },
                    {
                        name: "Second (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "3",
                    },
                    {
                        name: "Stuff alot (0/3)",
                        image: "/static/vectors.png",
                        href: "/curriculum/",
                        uid: "4",
                    }
                ],
                uid: "2",
            }
        ];
        return <Sheet sections={sections}/>;
    }
}
