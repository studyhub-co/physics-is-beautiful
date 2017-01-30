import React from 'react';


class Item extends React.Component {
    render() {
        return (
            <div className="col-md-1 module-accessible-block">
                <a href={this.props.href}>
                    <div className="thumbnail">
                        <img src={this.props.image}/>
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
            items.push(<Item key={el.uuid} name={el.name} image={el.image} href={el.href}/>);
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


class Question extends React.Component {
    componentDidMount() {
        drawVector();
    }

    render() {
        return (
            <div className="question" id="ajaxDiv">
                <div className="col-md-6 text-center">
                    <div className="bounding-box">
                        <h1 id="ajaxDiv">{this.props.question.text}</h1>
                        <div className="thumbnail"></div>
                    </div>
                </div>
                <div className="col-md-6 text-center">
                    <div className="bounding-box">
                        <div className="canvas-container" style={{width: "300px", height: "300px", position: "relative", userSelect: "none"}}>
                            <canvas id="c" width="300" height="300"
                                style={{
                                    border: "1px solid: rgb(204, 204, 204)",
                                    position: "absolute",
                                    width: "300px",
                                    height: "300px",
                                    left: "0px",
                                    top: "0px",
                                    userSelect: "none"
                                }} className="lower-canvas"></canvas>
                            <canvas className="upper-canvas " width="300" height="300"
                                style={{
                                    border: "1px solid: rgb(204, 204, 204)",
                                    position: "absolute",
                                    width: "300px",
                                    height: "300px",
                                    left: "0px",
                                    top: "0px",
                                    userSelect: "none",
                                    cursor: "default"
                                }}></canvas>
                        </div>
                        <div className="button-group" id="vectorButton">
                            <a className="btn btn-primary" id="button">Check</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class Footer extends React.Component {
    render () {
        return (
            <div id="footer"></div>
        );
    }
}


class Sheet extends React.Component {
    render() {
        var backLink = '';
        if (this.props.backLink) {
            backLink = <a id="backToDashboard" href={this.props.backLink} type="button" className="btn btn-default btn-sm">
                    <span className="glyphicon glyphicon-chevron-left" style={{color: '#888'}}></span>
                </a>
        }
        var sections = [];
        if (this.props.sections) {
            this.props.sections.forEach(function(el) {
                sections.push(<Section key={el.uuid} name={el.name} items={el.items}/>);
            });
        }
        var question = '';
        if (this.props.question) {
            question = <div>
                <Question question={this.props.question}/>
                <Footer/>
            </div>
        }
        return (
            <div className="container">
                {backLink}
                {sections}
                {question}
                <div></div>
            </div>
        );
    }
}


export default class CurriculumApp extends React.Component {

    constructor() {
        super();
        var urlPath = window.location.pathname.split('/');
        this.state = {
            currentView: urlPath[2] || urlPath[1],
            currentId: urlPath[3] || 'default',
            sections: [],
        };
        this.fetchState();

        this.curriculum = null;
        this.module = null;
    }

    loadCurriculum() {
        if (!this.curriculum) {
            return;
        }
        var sections = [];
        for(var unitIndex = 0; unitIndex < this.curriculum.units.length; unitIndex++) {
            var unit = this.curriculum.units[unitIndex];
            var items = [];
            for(var moduleIndex = 0; moduleIndex < unit.modules.length; moduleIndex++) {
                var module = unit.modules[moduleIndex];
                items.push({
                    name: module.name + ' (' + 0 + '/' + module.lesson_count + ')',
                    image: module.image,
                    href: '/curriculum/modules/' + module.uuid,
                    uuid: module.uuid,
                });
            }
            sections.push({
                name: unit.name,
                items: items,
                uuid: unit.uuid,
            });
        }
        this.setState({sections: sections, backLink: null, question: null});
    }

    loadModule() {
        if (!this.module) {
            return;
        }
        var items = [];
        for(var lessonIndex = 0; lessonIndex < this.module.lessons.length; lessonIndex++) {
            var lesson = this.module.lessons[lessonIndex];
            items.push({
                name: lesson.name,
                image: lesson.image,
                href: '/curriculum/lessons/' + lesson.uuid,
                uuid: lesson.uuid,
            });
        }
        var sections = [{
            name: this.module.name,
            items: items,
            uuid: this.module.uuid,
        }];
        this.setState({sections: sections, backLink: '/curriculum/', question:null});
    }

    loadQuestion() {
        if (!this.question) {
            return;
        }
        this.setState({sections: null, backLink: null, question: this.question});
    }

    fetchCurriculum(lookupId) {
        $.ajax({
            url: '/api/v1/curricula/curricula/' + lookupId,
            data: {'expand': 'units.modules'},
            context: this,
            success: function(data, status, jqXHR) {
                this.curriculum = data;
                this.loadCurriculum();
            }
        });
    }

    fetchModule(lookupId) {
        $.ajax({
            url: '/api/v1/curricula/modules/' + lookupId,
            data: {'expand': 'lessons'},
            context: this,
            success: function(data, status, jqXHR) {
                this.module = data;
                this.loadModule();
            }
        });
    }

    fetchProblem(lookupId) {
        $.ajax({
            url: '/api/v1/curricula/lessons/' + lookupId + '/next-question',
            context: this,
            success: function(data, status, jqXHR) {
                this.question = data;
                this.loadQuestion();
            }
        });
    }

    fetchState() {
        switch(this.state.currentView) {
            case 'curriculum':
                this.fetchCurriculum(this.state.currentId);
                break;
            case 'modules':
                this.fetchModule(this.state.currentId);
                break;
            case 'lessons':
                this.fetchProblem(this.state.currentId);
                break;
        }
    }

    render() {
        return <Sheet backLink={this.state.backLink} sections={this.state.sections} question={this.state.question}/>;
    }
}
