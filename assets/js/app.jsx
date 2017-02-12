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


var GRID = 50;


class CanvasArrow {
    constructor(canvas, pointer, color) {
        this.canvas = canvas;
        color = color || 'red';
        var points = [
            Math.round(pointer.x / GRID) * GRID,
            Math.round(pointer.y / GRID) * GRID,
            pointer.x,
            pointer.y
        ];
        this.onCanvas = false;
        this.line = new fabric.Line(points, {
            strokeWidth: 5,
            fill: color,
            stroke: color,
            originX: 'center',
            originY: 'center'
        });

        var centerX = (this.line.x1 + this.line.x2) / 2;
        var centerY = (this.line.y1 + this.line.y2) / 2;
        this.deltaX = this.line.left - centerX;
        this.deltaY = this.line.top - centerY;

        this.triangle = new fabric.Triangle({
            left: this.line.get('x1') + this.deltaX,
            top: this.line.get('y1') + this.deltaY,
            originX: 'center',
            originY: 'center',
            hasBorders: false,
            hasControls: false,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            pointType: 'arrow_start',
            angle: 0,
            width: 20,
            height: 20,
            fill: color
        });
        this.canvas.add(this.line, this.triangle);
        this.drawing = true;
    }

    calcArrowAngle(x1, y1, x2, y2) {
        var angle = 0;
        var x = (x2 - x1);
        var y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }
        return (angle * 180 / Math.PI + 90);
    }

    draw(pointer) {
        if (this.drawing) {
            this.line.set({x2: pointer.x, y2: pointer.y});
            this.triangle.set({
                'left': pointer.x + this.deltaX,
                'top': pointer.y + this.deltaY,
                'angle': this.calcArrowAngle(this.line.x1, this.line.y1, this.line.x2, this.line.y2)
            });
            this.canvas.renderAll();
        }
    }

    complete(pointer) {
        this.drawing = false;
        var snappedxCoordinate = Math.round(pointer.x / GRID) * GRID;
        var snappedyCoordinate = Math.round(pointer.y / GRID) * GRID;
        var snappedxCoordinateArrowhead = Math.round((pointer.x + this.deltaX) / GRID) * GRID;
        var snappedyCoordinateArrowhead = Math.round((pointer.y + this.deltaY) / GRID) * GRID;

        this.line.set({
            x2: snappedxCoordinate - 4 * Math.sin(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate) * Math.PI / 180),
            y2: snappedyCoordinate + 4 * Math.cos(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate) * Math.PI / 180)
        });
        this.triangle.set({
            'left': snappedxCoordinateArrowhead - 9 * Math.sin(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate) * Math.PI / 180),
            'top': snappedyCoordinateArrowhead + 9 * Math.cos(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate) * Math.PI / 180),
            'angle': this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate)
        });
        if (this.getVectorMagnitude() == 0) {
            this.canvas.remove(this.line);
            this.triangle.set({
                'left': snappedxCoordinateArrowhead,
                'top': snappedyCoordinateArrowhead,
                'angle': 0
            });
        }
        this.canvas.renderAll();
    }

    getVectorMagnitude() {
        return Math.sqrt(
            Math.pow(
                Math.round((this.line.x2 - this.line.x1) / GRID) * GRID,
                2
            ) + Math.pow(
                Math.round((this.line.y2 - this.line.y1) / GRID) * GRID,
                2
            )
        ) / GRID;
    }

    getVectorAngle() {
        var angle = this.calcArrowAngle(this.line.x1, this.line.y1, this.line.x2, this.line.y2);
        if (angle >= 360) {
            angle -= 360;
        }
        return angle;
    }

    getXComponent() {
        return Math.round((this.line.x2 - this.line.x1) / GRID);
    }

    getYComponent() {
        return Math.round((this.line.y1 - this.line.y2) / GRID);
    }

    delete() {
        this.canvas.remove(this.line, this.triangle);
    }
}


class VectorCanvas extends React.Component {
    constructor() {
        super();
        this.arrow;
        this.answerArrow;
        this.answerText;
        this.canvas = null;
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c', {
            selection: false,
            hasControls: false
        });
        this.drawGrid();
        this.canvas.on('mouse:down', this.mouseDown.bind(this));
        this.canvas.on('mouse:move', this.mouseMove.bind(this));
        this.canvas.on('mouse:up', this.mouseUp.bind(this));
        $('#checkAnswer').click(this.checkAnswer.bind(this));
    }

    drawGrid() {
        for (var i = 1; i < (600 / GRID); i++) {
            this.canvas.add(new fabric.Line([i * GRID, 0, i * GRID, 600], {
                stroke: '#ccc',
                hasControls: false,
                hasBorders: false,
                selectable: false
            }));
            this.canvas.add(new fabric.Line([0, i * GRID, 600, i * GRID], {
                stroke: '#ccc',
                hasControls: false,
                hasBorders: false,
                selectable: false
            }))
        }
    }

    mouseDown(o) {
        if (this.arrow) {
            this.arrow.delete();
        }
        this.arrow = new CanvasArrow(this.canvas, this.canvas.getPointer(o.e));
    }

    mouseMove(o) {
        if (this.arrow) {
            this.arrow.draw(this.canvas.getPointer(o.e));
        }
    }

    mouseUp(o) {
        this.arrow.complete(this.canvas.getPointer(o.e));
    }

    checkAnswer(o) {
        if (this.arrow && this.props.question.submitAnswer) {
            this.props.question.submitAnswer(
                this.props.question.uuid,
                {
                    vector: {
                        // magnitude: this.arrow.getVectorMagnitude(),
                        // angle: this.arrow.getVectorAngle(),
                        x_component: this.arrow.getXComponent(),
                        y_component: this.arrow.getYComponent(),
                    }
                }
            );
        }
    }

    calcAnswerComponent(value) {
        if (value > 2 * GRID) {
            return GRID;
        }else if (value < -2 * GRID) {
            return 5 * GRID;
        } else {
            return 3 * GRID;
        }
    }

    renderAnswer() {
        var answer = this.props.answer;
        var pointer = {
            x: this.calcAnswerComponent(answer.xComponent),
            y: this.calcAnswerComponent(answer.yComponent),
        }
        var end_pointer = {
            x: pointer['x'] + answer.xComponent * GRID,
            y: pointer['y'] - answer.yComponent * GRID,
        }
        this.answerArrow = new CanvasArrow(this.canvas, pointer, 'green');
        this.answerArrow.complete(end_pointer);

        this.answerText = new fabric.Text('correct\nsolution', {
            left: end_pointer.x - .65 * GRID + answer.xComponent,
            top: end_pointer.y - answer.yComponent - GRID,
            fontSize: 20,
            textAlign: 'center',
            lineHeight: .7,
            fontFamily: 'Helvetica',
            fill: 'green',
        });
        this.canvas.add(this.answerText);
    }

    render() {
        if (this.props.question.is_correct === false && this.props.answer && !this.answerArrow) {
            this.renderAnswer();
        } else if (this.answerArrow) {
            this.answerArrow.delete();
            this.answerArrow = null;
            this.canvas.remove(this.answerText);
        }
        var nullBox = '';
        var buttonClass = 'btn btn-primary';
        var canvasStyle = {
            border: "1px solid #ccc",
        }
        if (this.props.question.is_correct !== undefined) {
            buttonClass += ' disabled';
            canvasStyle['pointerEvents'] = 'none';
            $('.upper-canvas').css('pointer-events', 'none');
        } else {
            if (this.arrow) {
                this.arrow.delete();
                this.arrow = null;
            }
            $('.upper-canvas').css('pointer-events', '');
        }
        if (this.props.question.answer && this.props.question.answer.allow_null) {
            nullBox = (
                <div id="nullVector" className="checkbox">
                    <label id="highlightGreen">
                        <input id="nullVectorCheckbox" type="checkbox" value=""/>
                            Null vector
                    </label>
                </div>
            );
        }
        return (
            <div className="col-md-6 text-center">
                <div className="bounding-box">
                    <canvas id="c" width="300" height="300" className="lower-canvas" style={canvasStyle}></canvas>
                    <div className="button-group" id="vectorButton">
                        <a className={buttonClass} id="checkAnswer">Check</a>
                    </div>
                </div>
            </div>
        );
    }
}


class MultipleChoice extends React.Component {

    checkAnswer(o) {
        this.props.question.submitAnswer(
            this.props.question.uuid,
            {
                answer: {
                    uuid: o.target.id,
                }
            }
        );
    }

    render() {
        var choices = [];
        var hasAnswer = this.props.answer !== null;
        var disabled = '';
        if (hasAnswer) {
            disabled = ' disabled';
        }
        for (var i = 0; i < this.props.question.choices.length; i++) {
            var choice = this.props.question.choices[i];
            var style = {};
            if (hasAnswer) {
                if (this.props.answer.uuid == choice.uuid) {
                    style["backgroundColor"] = "rgb(79, 212, 24)";
                    style["borderColor"] = "rgb(79, 212, 24)";
                } else if (this.props.question.response.answer.uuid == choice.uuid) {
                    style["backgroundColor"] = "rgb(255, 0, 0)";
                    style["borderColor"] = "rgb(255, 0, 0)";
                }
            }
            // For now we assume multiple choice to be text answers.
            choices.push(
                <a key={choice.uuid} className={"btn btn-primary btn-lg" + disabled} id={choice.uuid} style={style} onClick={this.checkAnswer.bind(this)}>{choice.content.text}</a>
            );
        }
        return (
            <div className="col-md-6 text-center">
                <div className="bounding-box">
                    <h1>Select answer below:</h1>
                    {choices}
                </div>
            </div>
        );
    }
}


class Question extends React.Component {

    componentDidMount() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    componentDidUpdate() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    render() {
        var image = '';
        if (this.props.question.image) {
            image = <img src={'/' + this.props.question.image}/>;
        }
        var answerField = '';
        if (this.props.question.question_type == "SINGLE_ANSWER") {
            answerField = <VectorCanvas question={this.props.question} answer={this.props.answer}/>;
        } else if (this.props.question.question_type == "MULTIPLE_CHOICE") {
            answerField = <MultipleChoice question={this.props.question} answer={this.props.answer}/>;
        }
        return (
            <div className="question" id="ajaxDiv">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <div className="bounding-box">
                            <h1 id="ajaxDiv">{this.props.question.text}</h1>
                            <div className="thumbnail">
                                {image}
                            </div>
                        </div>
                    </div>
                    {answerField}
                </div>
            </div>
        );
    }
}


class Footer extends React.Component {
    render () {
        var checkMarks = '';
        var correctMessage = '';
        var continueButton = '';
        if (this.props.correct === true) {
            checkMarks = (<span id="correct" className="glyphicon glyphicon-ok-sign pull-right"></span>);
            correctMessage = 'Correct';
        } else if (this.props.correct === false) {
            checkMarks = (<span id="incorrect" className="glyphicon glyphicon-remove-sign pull-right"></span>);
            correctMessage = 'Incorrect';
            continueButton = (
                <button id="checkButton" type="button" onClick={this.props.continueAction}>
                    Continue
                </button>
            );
        }
        return (
            <div id="footer">
                <div id="checkMarks">{checkMarks}</div>
                <div id="checkContainer">
                    {continueButton}
                </div>
                <div id="blockRight">
                    <div id="correctMessage">{correctMessage}</div>
                </div>
                <div className="progress-bottom-container">
                    <h4>Progress</h4>
                    <div className="progress">
                        <div className="progress-bar progress-bar-info progress-bar-striped" id="progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: this.props.progress + "%"}}>
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class LessonComplete extends React.Component {
    render () {
        // <link rel="stylesheet" href="/lib/animate-css/animate.min.css">
        return (
            <div className="question" id="ajaxDiv">
		<div style={{height: "15px"}}></div>
		<div className="jumbotron">
                    <h2 className="animated rubberBand" style={{color: "#33A", textAlign: "center"}}>
                        You rock! Lesson complete!
                    </h2>
                </div>
                <a className="btn btn-primary btn-lg btn-block" href={"/curriculum/modules/" + this.props.lesson.module}>
                    Proceed to next level
                </a>
            </div>
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
        var footer = '';
        if (this.props.question) {
            question = <Question question={this.props.question} answer={this.props.answer}/>;
            footer = <Footer progress={this.props.progress} correct={this.props.question.is_correct} continueAction={this.props.continueAction}/>;
        }

        if (this.props.progress >= 100) {
            question = <LessonComplete lesson={this.props.question.lesson}/>;
        }
        return (
            <div className="container problem-sheet">
                {backLink}
                {sections}
                {question}
                {footer}
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
            question: null,
            backLink: null,
            progress: 0,
        };
        this.fetchState();

        this.curriculum = null;
        this.module = null;
        this.question = null;
        this.progress = 0;
        this.answer = null;
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
        this.setState({
            sections: sections,
            backLink: null,
            question: null,
            progress: 0,
            answer: null,
        });
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
        this.setState({
            sections: sections,
            backLink: '/curriculum/',
            question:null,
            progress: 0,
            answer: null,
        });
    }

    loadQuestion() {
        if (!this.question) {
            return;
        }
        this.setState({
            sections: null,
            backLink: null,
            question: this.question,
            progress: this.progress,
            answer: this.answer,
        });
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
                this.progress = data['score'] / data['required_score'] * 100;
                data.submitAnswer = this.submitAnswer.bind(this);
                this.question = data;
                this.answer = null;
                this.loadQuestion();
            }
        });
    }

    submitAnswer(questionId, obj) {
        $.ajax({
            type: 'POST',
            url: '/api/v1/curricula/questions/' + questionId + '/response',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            context: this,
            success: function(data, status, jqXHR) {
                this.question.response = obj;
                this.progress = data['score'] / data['required_score'] * 100;
                if (data.was_correct) {
                    this.question.is_correct = true;
                } else {
                    this.question.is_correct = false;
                    if (data.correct_answer.type == 'vector') {
                        this.answer = {
                            type: 'vector',
                            xComponent: data.correct_answer.content.x_component,
                            yComponent: data.correct_answer.content.y_component,
                        };
                    } else {
                        this.answer = data.correct_answer;
                    }
                }
                this.loadQuestion();
                if (data.was_correct) {
                    setTimeout(
                        function() {
                            this.fetchProblem(this.state.currentId);
                        }.bind(this),
                        1000
                    );
                }
            }
        });
    }

    continueAction() {
        this.fetchProblem(this.state.currentId);
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
        var continueAction = this.continueAction.bind(this);
        return <Sheet backLink={this.state.backLink} sections={this.state.sections} question={this.state.question} answer={this.state.answer} progress={this.state.progress} continueAction={continueAction}/>;
    }
}
