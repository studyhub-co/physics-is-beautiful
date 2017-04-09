import React from 'react';
import {Section} from './navigation';
import {Question, Footer} from './questions';
import {playAudio} from './audio';


class LessonComplete extends React.Component {

    componentDidMount() {
        window.onbeforeunload = null;
        playAudio('complete');
    }

    render () {
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


class LessonCompleteSheet extends React.Component {

    render() {
        return (
            <div className="container problem-sheet">
                <LessonComplete lesson={this.props.question.lesson}/>
                <div></div>
            </div>
        );
    }

}


class QuestionSheet extends React.Component {

    render() {
        return (
            <div className="container problem-sheet">
                <Question question={this.props.question} answer={this.props.answer} hintClick={this.props.hintClick} />
                <Footer
                    progress={this.props.progress}
                    correct={this.props.question.is_correct}
                    continueAction={this.props.continueAction}
                />
                <div></div>
            </div>
        );
    }

}


class SectionSheet extends React.Component {

    render() {
        var backLink = '';
        if (this.props.backLink) {
            backLink = (
                <a id="backToDashboard" href={this.props.backLink} type="button" className="btn btn-default btn-sm">
                    <span className="glyphicon glyphicon-chevron-left" style={{color: '#888'}}></span>
                </a>
            );
        }
        var sections = [];
        this.props.sections.forEach(function(el) {
            sections.push(<Section key={el.uuid} name={el.name} items={el.items}/>);
        });
        return (
            <div className="container problem-sheet">
                {backLink}
                {sections}
            </div>
        );
    }

}


export default class Sheet extends React.Component {

    render() {
        var Component;
        if (this.props.sections) {
            Component = SectionSheet;
        } else if (this.props.question) {
            if (this.props.progress >= 100) {
                Component = LessonCompleteSheet;
            } else {
                Component = QuestionSheet;
            }
        }
        return (
            <Component {...this.props} />
        );
    }

}
