import React from 'react';
import RMathJax from 'react-mathjax';
import ReactHover from 'react-hover';
import {Vector, VectorCanvas, CanvasVector, CanvasText} from './vector_canvas';
import {Text, Expression} from './app.jsx'


// Note that Canvas is deprecated and should ultimately be replaced by
// VectorCanvas


var DEFAULT_MATHJAX_OPTIONS = {
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
};


class TextChoice extends React.Component {

    render() {
        var style = {};
        var disabled = '';
        if (this.props.hasAnswer) {
            disabled = ' disabled';
            if (this.props.isAnswer) {
                style["backgroundColor"] = "rgb(79, 212, 24)";
                style["borderColor"] = "rgb(79, 212, 24)";
            } else if (this.props.wasResponse) {
                style["backgroundColor"] = "rgb(255, 0, 0)";
                style["borderColor"] = "rgb(255, 0, 0)";
            }
        }
        return (
            <a
                className={"btn btn-primary btn-lg" + disabled}
                id={this.props.choice.uuid}
                style={style}
                onClick={this.props.checkAnswer}
            >
                {this.props.choice.content.text}
            </a>
        );
    }

}


class ImageChoice extends React.Component {

    render() {
        var style = {};
        if (this.props.hasAnswer) {
            style["pointerEvents"] = "none";
            if (this.props.isAnswer) {
                style["boxShadow"] = "green 0px 0px 15px";
                style["border"] = "2px solid rgb(79, 212, 24)";
            } else if (this.props.wasResponse) {
                style["boxShadow"] = "rgb(255, 0, 0) 0px 0px 10px";
            }
        }
        return (
            <img
                className="inline-picture"
                id={this.props.choice.uuid}
                style={style}
                src={this.props.choice.content.image}
                onClick={this.props.checkAnswer}
            />
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
        var Component;
        switch (this.props.question.answer_type) {
            case 'TEXT':
                Component = TextChoice;
                break;
            case 'IMAGE':
                Component = ImageChoice;
                break;
            default:
                return (
                    <div className="col-md-6 text-center">
                        <div className="bounding-box">
                            <h1>Unrecognized answer type: {this.props.question.answer_type}.</h1>
                        </div>
                    </div>
                );
        }
        for (var i = 0; i < this.props.question.choices.length; i++) {
            var choice = this.props.question.choices[i];
            var isAnswer = false;
            var wasResponse = false;
            if (hasAnswer) {
                if (this.props.answer.uuid == choice.uuid) {
                    isAnswer = true;
                } else if (this.props.question.response.answer.uuid == choice.uuid) {
                    wasResponse = true;
                }
            }
            choices.push(
                <Component
                    key={choice.uuid}
                    choice={choice}
                    checkAnswer={this.checkAnswer.bind(this)}
                    hasAnswer={hasAnswer}
                    isAnswer={isAnswer}
                    wasResponse={wasResponse}
                />
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


class SingleVectorAnswer extends React.Component {

    constructor() {
        super();
        this.state = {clear: false};
        this.unanswered = true;
    }

    componentDidUpdate() {
        if (this.props.answer || this.props.question.is_correct) {
            this.unanswered = false;
        } else if (!this.unanswered) {
            this.unanswered = true;
            this.setState({clear: true});
        }
        if (this.state.clear) {
            this.setState({clear: false});
        }
    }

    render() {
        // Right now we only support Vector problems for single answer.
        var allowInput = true;
        var objects = [];
        if (this.props.answer) {
            allowInput = false;
            var pointer = {
                x: VectorCanvas.calcVectorXStart(this.props.answer.x),
                y: VectorCanvas.calcVectorYStart(this.props.answer.y),
            }
            var endPointer = {
                x: pointer['x'] + VectorCanvas.calcCanvasMagnitude(this.props.answer.x),
                y: pointer['y'] - VectorCanvas.calcCanvasMagnitude(this.props.answer.y),
            }
            var vector = new CanvasVector(null, pointer, 'green');
            vector.complete(endPointer);
            var textPoint = {
                left: endPointer.x - VectorCanvas.calcCanvasMagnitude(.65) + this.props.answer.x,
                top: endPointer.y - this.props.answer.y - VectorCanvas.calcCanvasMagnitude(1),
            }
            var text = new CanvasText(null, textPoint, "correct\nsolution");
            objects.push(vector);
            objects.push(text);
        }
        var allowNull = false;
        if (this.props.question.answer_type == 'NULLABLE_VECTOR') {
            allowNull = true;
        }
        return (
            <div className="bounding-box">
                <VectorCanvas {...this.props}
                              allowInput={allowInput}
                              manualCheck={true}
                              objects={objects}
                              allowNull={allowNull}
                              clear={this.state.clear}
                />
            </div>
        );
    }

}


class SingleMathematicalExpressionAnswer extends React.Component {

    constructor() {
        super();
        this.questionId = null;
        this.stoppedProcessing = false;
        this.state = {
            processing: false
        }
    }

    componentDidMount() {
        var MQ = MathQuill.getInterface(2);
        this.answer = MQ.MathField($('#math-field-answer')[0], {
            handlers: {
                spaceBehavesLikeTab: true,
                edit: () => {
                    this.data = this.answer.latex();
                }
            }
        });
    }

    componentDidUpdate() {
        if (this.stoppedProcessing) {
            this.stoppedProcessing = false;
            this.setState({processing: false});
        }
    }

    checkAnswer() {
        if (this.data) {
            this.setState({processing: true});
            this.props.question.submitAnswer(
                this.props.question.uuid,
                {
                    mathematical_expression: {representation: this.data},
                },
            );
        }
    }

    insertXHat() {
        this.answer.focus();
        this.answer.write('\\hat{x}');
    }

    insertYHat() {
        this.answer.focus();
        this.answer.write('\\hat{y}');
    }

    reset() {
        this.answer.latex('');
        this.stoppedProcessing = true;
    }

    render() {
        var disabled = '';
        if (this.props.answer) {
            disabled = ' disabled';
        }
        if (this.state.processing) {
            disabled = ' disabled';
        }
        if (this.questionId && this.props.question.uuid && this.props.question.uuid != this.questionId) {
            this.reset();
        }
        this.questionId = this.props.question.uuid;
        var x, y;
        var hoverStyle = {
            height: "30px",
            overflowY: 'auto',
            outline: '1px solid black',
            width: '60px',
            background: '#ffffff',
            position: 'absolute',
            color: "black"
        }
        if (this.props.xHat) {
            x = (
                <a
                    className={"btn btn-primary btn-lg mathClickEntryButton"}
                    style={{minHeight: "40px"}}
                    onClick={this.insertXHat.bind(this)}
                >
                    <ReactHover options={{shiftX: 200, shiftY: 200}}>
                        <ReactHover.Trigger>
                            <RMathJax.Node inline>{"\\hat{x}"}</RMathJax.Node>
                        </ReactHover.Trigger>
                        <ReactHover.Hover>
                            <span style={hoverStyle}>\hat x</span>
                        </ReactHover.Hover>
                    </ReactHover>
                </a>
            );
        }
        if (this.props.yHat) {
            y = (
                <a
                    className={"btn btn-primary btn-lg mathClickEntryButton"}
                    style={{minHeight: "40px"}}
                    onClick={this.insertYHat.bind(this)}
                >
                    <ReactHover options={{shiftX: 200, shiftY: 200}}>
                        <ReactHover.Trigger>
                            <RMathJax.Node inline>{'\\hat{y}'}</RMathJax.Node>
                        </ReactHover.Trigger>
                        <ReactHover.Hover>
                            <span style={hoverStyle}>\hat y</span>
                        </ReactHover.Hover>
                    </ReactHover>
                </a>
            );
        }
        var mathFieldStyle = {
            width:200,
            fontSize:30
        }
        return (
            <div className="bounding-box">
                <p style={{marginBottom:5}}><span id="math-field-answer" style={mathFieldStyle}></span></p>
                <RMathJax.Context {...DEFAULT_MATHJAX_OPTIONS}>
                    <div style={{marginBottom:10}}>
                        {x}{y}
                    </div>
                </RMathJax.Context>
                <div className="button-group" id="vectorButton">
                    <a className={"btn btn-primary" + disabled } id="checkAnswer" onClick={this.checkAnswer.bind(this)}>Check</a>
                </div>
            </div>
        );
    }

}


class SingleAnswer extends React.Component {

    render() {
        var Component;
        var options = {};
        switch (this.props.question.answer_type) {
            case 'VECTOR':
            case 'NULLABLE_VECTOR':
                Component = SingleVectorAnswer;
                break;
            case 'VECTOR_COMPONENTS':
                options['xHat'] = true;
                options['yHat'] = true;
            case 'MATHEMATICAL_EXPRESSION':
                Component = SingleMathematicalExpressionAnswer;
                break;
            default:
                return (
                    <div className="col-md-6 text-center">
                        <div className="bounding-box">
                            <h1>Unrecognized answer type: {this.props.question.answer_type}.</h1>
                        </div>
                    </div>
                );
        }

        return (
            <div className="col-md-6 text-center">
                <Component {...this.props} {...options}/>
            </div>
        );
    }

}


class Hint extends React.Component {

    constructor() {
        super();
        this.state = {
            collapsed: true,
        };
    }

    onChange(event) {
        this.setState({collapsed: !this.state.collapsed});
    }

    render() {
        var style = {};
        if (this.props.hintCollapsed) {
            style["display"] = "none";
        }
        return (
            <div className = "hintDiv">
                <div className="hintButton">
                    <a onClick={this.props.onClick}>hint</a>
                </div>
                <div id="demo" style={style}>
                    {this.props.hint}
                </div>
            </div>
        );
    }

}


var VECTOR_COLORS  = [
    'red',
    'blue',
    'green',
    'yellow',
]


export class Question extends React.Component {

    componentDidMount() {
        MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        window.onbeforeunload = function() {
            return 'Changes you made may not be saved.';
        };
    }

    componentDidUpdate() {
        MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    render() {
        var image = '';
        if (this.props.question.image) {
            image = (
                <div className="thumbnail question-thumbnail">
                    <img src={this.props.question.image}/>
                </div>
            );
        }
        var vector = '';
        if (this.props.question.vectors.length) {
            var vectors = [];
            for (var i = 0; i < this.props.question.vectors.length; i++) {
                var iVector = this.props.question.vectors[i];
                var point = {
                    x: VectorCanvas.calcVectorXStart(iVector.x_component),
                    y: VectorCanvas.calcVectorYStart(iVector.y_component),
                };
                var endPoint = {
                    x: point.x + VectorCanvas.calcCanvasMagnitude(iVector.x_component),
                    y: point.y - VectorCanvas.calcCanvasMagnitude(iVector.y_component),
                }
                var cVector = new CanvasVector(null, point, VECTOR_COLORS[i]);
                cVector.complete(endPoint);
                vectors.push(cVector);
            }
            vector = (
                <VectorCanvas objects={vectors}/>
            );
        }
        var hint = '';
        if (this.props.question.hint) {
            hint = <Hint hint={this.props.question.hint} hintCollapsed={this.props.question.hintCollapsed} onClick={this.props.hintClick} />;
            {/*<div className = "hintDiv">*/}
            {/*<div className="hintButton">*/}
            {/*<a href="#demo" data-toggle="collapse">hint</a>*/}
            {/*</div>*/}
            {/*<div id="demo" className="collapse">*/}
            {/*{this.props.question.hint}*/}
            {/*</div>*/}
            {/*</div>;*/}
        }
        var answerField = '';
        if (this.props.question.question_type == "SINGLE_ANSWER") {
            answerField = <SingleAnswer question={this.props.question} answer={this.props.answer}/>;
        } else if (this.props.question.question_type == "MULTIPLE_CHOICE") {
            answerField = <MultipleChoice question={this.props.question} answer={this.props.answer}/>;
        }
        function createMarkup(text) {
            return {__html: text};
        }
        return (
            <div className="question" id="ajaxDiv">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <div className="bounding-box">
                            <h1 id="ajaxDiv" dangerouslySetInnerHTML={createMarkup(this.props.question.text)} />
                            {hint}
                            {image}
                            {vector}
                        </div>
                    </div>
                    {answerField}
                </div>
            </div>
        );
    }
}


class VectorAnswer extends React.Component {

    render() {
        var x, y, xComponent, yComponent = '';
        if (this.props.answer.y) {
            y = <RMathJax.Node inline>{'\\hat{y}'}</RMathJax.Node>;
            yComponent = this.props.answer.y;
            if (this.props.answer.x && this.props.answer.y > 0) {
                yComponent = '+' + yComponent;
            }
        }
        if (this.props.answer.x) {
            xComponent = this.props.answer.x;
            x = <RMathJax.Node inline>{'\\hat{x}'}</RMathJax.Node>;
        }
        return (
            <div>
                <RMathJax.Context>
                    <div>
                        <span>{xComponent}</span>
                        {x}
                        <span>{yComponent}</span>
                        {y}
                    </div>
                </RMathJax.Context>
            </div>
        );
    }

}


class TextAnswer extends React.Component {

    render () {
        return <span>{this.props.answer.text}</span>
    }

}


class MathematicaExpressionAnswer extends React.Component {

    render () {
        return <span>{this.props.answer.expression}</span>
    }

}


class DefaultAnswer extends React.Component {

    render () {
        return <div>{this.props.answer.text}</div>;
    }

}


class Answer extends React.Component {
    render () {
        var Component;
        switch (this.props.answer.constructor) {
            case Vector:
                Component = VectorAnswer;
                break;
            case Text:
                Component = TextAnswer;
                break;
            case Expression:
                Component = MathematicaExpressionAnswer;
                break;
            default:
                Component = DefaultAnswer;
                break;
        }
        return <Component {...this.props} />;
    }
}


export class Footer extends React.Component {

    componentDidMount() {
        MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    componentDidUpdate() {
        MathJax.Hub.Config(DEFAULT_MATHJAX_OPTIONS);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    render () {
        var checkMarks = '';
        var correctMessage = '';
        var continueButton = '';
        if (this.props.correct === true) {
            checkMarks = (<span id="correct" className="glyphicon glyphicon-ok-sign pull-right"></span>);
            correctMessage = 'Correct';
        } else if (this.props.correct === false) {
            checkMarks = (<span id="incorrect" className="glyphicon glyphicon-remove-sign pull-right"></span>);
            correctMessage = <div><span>Incorrect, the correct answer is: <br/></span><Answer answer={this.props.answer} /></div>;
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
