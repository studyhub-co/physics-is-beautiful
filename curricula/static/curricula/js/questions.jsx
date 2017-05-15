import React from 'react';
import RMathJax from 'react-mathjax';
import {Canvas, VectorCanvas, CanvasVector} from './vector_canvas';


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

    render() {
        // Right now we only support Vector problems for single answer.
        return <Canvas {...this.props} />;
    }

}


class SingleMathematicalExpressionAnswer extends React.Component {

    constructor() {
        super();
        this.questionId = null;
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

    checkAnswer() {
        this.props.question.submitAnswer(
            this.props.question.uuid,
            {
                mathematical_expression: {representation: this.data},
            },
        );
    }

    insertXHat() {
        this.answer.latex(this.answer.latex() + '\\hat{x}');
    }

    insertYHat() {
        this.answer.latex(this.answer.latex() + '\\hat{y}');
    }

    render() {
        if (this.questionId && this.props.question.uuid != this.questionId) {
            this.answer.latex('');
        } else {
            this.questionId = this.props.question.uuid;
        }
        return (
            <div className="bounding-box">
                <RMathJax.Context {...DEFAULT_MATHJAX_OPTIONS}>
                    <div>
                        <a
                            className={"btn btn-primary btn-lg"}
                            style={{minHeight: "40px"}}
                            onClick={this.insertXHat.bind(this)}
                        >
                            <RMathJax.Node inline>{'\\hat{x}'}</RMathJax.Node>
                        </a>
                        <a
                            className={"btn btn-primary btn-lg"}
                            style={{minHeight: "40px"}}
                            onClick={this.insertYHat.bind(this)}
                        >
                            <RMathJax.Node inline>{'\\hat{y}'}</RMathJax.Node>
                        </a>
                    </div>
                </RMathJax.Context>
                <p><span id="math-field-answer" style={{width: "140px"}}></span></p>
                <div className="button-group" id="vectorButton">
                    <a className="btn btn-primary" id="checkAnswer" onClick={this.checkAnswer.bind(this)}>Check</a>
                </div>
            </div>
        );
    }

}


class SingleAnswer extends React.Component {

    render() {
        var Component;
        switch (this.props.question.answer_type) {
            case 'VECTOR':
            case 'NULLABLE_VECTOR':
                Component = SingleVectorAnswer;
                break;
            case 'MATHEMATICAL_EXPRESSION':
            case 'VECTOR_COMPONENTS':
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
                <Component {...this.props} />
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
        if (this.props.question.vector) {
            var point = {
                x: VectorCanvas.calcVectorXStart(this.props.question.vector.x_component),
                y: VectorCanvas.calcVectorXStart(this.props.question.vector.y_component),
            };
            var endPoint = {
                x: point.x + VectorCanvas.calcCanvasMagnitude(this.props.question.vector.x_component),
                y: point.y - VectorCanvas.calcCanvasMagnitude(this.props.question.vector.y_component),
            }
            var cVector = new CanvasVector(null, point);
            cVector.complete(endPoint);
            vector = (
                <VectorCanvas objects={[cVector]}/>
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


export class Footer extends React.Component {

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
