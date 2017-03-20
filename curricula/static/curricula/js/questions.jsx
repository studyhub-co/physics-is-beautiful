import React from 'react';
import {Canvas} from './vector_canvas';


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


class SingleAnswer extends React.Component {

    render() {
        // Right now we only support Vector problems for single answer.
        return (
            <div className="col-md-6 text-center">
                <Canvas {...this.props} />
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
        if (this.state.collapsed) {
            style["display"] = "none";
        }
        return (
            <div className = "hintDiv">
                <div className="hintButton">
                    <a onClick={this.onChange.bind(this)}>hint</a>
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
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        window.onbeforeunload = function() {
            return 'Changes you made may not be saved.';
        };
    }

    componentDidUpdate() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    render() {
        var image = '';
        if (this.props.question.image) {
            image = <img src={this.props.question.image}/>;
        }
        var hint = '';
        if (this.props.question.hint) {
            hint = <Hint hint={this.props.question.hint} />;
        }
        var answerField = '';
        if (this.props.question.question_type == "SINGLE_ANSWER") {
            answerField = <SingleAnswer question={this.props.question} answer={this.props.answer}/>;
        } else if (this.props.question.question_type == "MULTIPLE_CHOICE") {
            answerField = <MultipleChoice question={this.props.question} answer={this.props.answer}/>;
        }
        return (
            <div className="question" id="ajaxDiv">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <div className="bounding-box">
                            <h1 id="ajaxDiv">{this.props.question.text}</h1>
                            {hint}
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
