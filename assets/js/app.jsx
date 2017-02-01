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
    constructor(canvas, pointer) {
        this.canvas = canvas;
        var points = [
            Math.round(pointer.x / GRID) * GRID,
            Math.round(pointer.y / GRID) * GRID,
            pointer.x,
            pointer.y
        ];
        this.onCanvas = false;
        this.line = new fabric.Line(points, {
            strokeWidth: 5,
            fill: 'red',
            stroke: 'red',
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
            fill: 'red'
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
        if (this.arrow && this.props.submitAnswer) {
            this.props.submitAnswer(
                this.arrow.getVectorMagnitude(),
                this.arrow.getVectorAngle(),
                this.arrow.getXComponent(),
                this.arrow.getYComponent(),
            );
        }
        return;
        answerJSON = $.parseJSON(answer);
        if("magnitude" in answerJSON){ answerMagnitude=answerJSON.magnitude} else{answerMagnitude = userMagnitude}
        if("deltax" in answerJSON){ answerDeltaX=answerJSON.deltax} else{answerDeltaX = userDeltaX}
        if("deltay" in answerJSON){ answerDeltaY=answerJSON.deltay} else{answerDeltaY = userDeltaY}
        if("angle" in answerJSON){ answerAngle=answerJSON.angle} else{answerAngle = userAngle}
        $("#button").unbind("click");
        $("#button").click(function() {
            $(".upper-canvas").css("pointer-events","none");
            userAnswer = new Object();
            userAnswer.magnitude = userMagnitude;
            userAnswer.deltax = userDeltaX;
            userAnswer.deltay = userDeltaY;
            userAnswer.angle = userAngle;
            userAnswer = JSON.stringify(userAnswer);
            if( userMagnitude == answerMagnitude && userAngle == answerAngle && userDeltaX == answerDeltaX && userDeltaY == answerDeltaY){
                correct();
            } else {
                this.triangle.set({'fill': '#ffd4cc'});
                this.line.set({'stroke': '#ffd4cc'});
                this.canvas.renderAll();
                $("#button").toggleClass('disabled');
                if("magnitude" in answerJSON){
                    answerTriangle = new fabric.Triangle({
                        left: 3*GRID,
                        top: 3*grid-answerJSON.magnitude*GRID+10,
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
                        fill: 'green'
                    });

                    answerLine = new fabric.Line([3*GRID, 3*GRID, 3*GRID, 3*grid-answerJSON.magnitude*GRID+4], {
                        strokeWidth: 5,
                        fill: 'green',
                        stroke: 'green',
                        originX: 'center',
                        originY: 'center'
                    });
                    text = new fabric.Text('correct\nsolution', {
                        left: 2.35*GRID,
                        top: 2*grid-answerJSON.magnitude*GRID,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    this.canvas.add(answerTriangle,answerLine,text);
                }


                if("deltax" in answerJSON || "deltay" in answerJSON){
                    if("deltax" in answerJSON){dx=answerJSON.deltax*GRID;}else{dx=0;}
                    if("deltay" in answerJSON){dy=answerJSON.deltay*GRID;}else{dy=0;}
                    if(dx>2*GRID){xorigin=GRID;}else if(dx<-2*GRID){xorigin=5*GRID;} else{xorigin=3*GRID;}
                    if(dy>2*GRID){yorigin=5*GRID;}else if(dy<-2*GRID){yorigin=GRID;} else{yorigin=3*GRID;}

                    answerTriangle = new fabric.Triangle({
                        left: xorigin+dx,
                        top: yorigin-dy,
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
                        fill: 'green'
                    });

                    answerLine = new fabric.Line([xorigin, yorigin, xorigin+dx, yorigin-dy], {
                        strokeWidth: 5,
                        fill: 'green',
                        stroke: 'green',
                        originX: 'center',
                        originY: 'center'
                    });

                    answerTriangle.set({
                        'angle': this.calcArrowAngle(answerLine.x1, answerLine.y1, answerLine.x2, answerLine.y2)
                    });

                    text = new fabric.Text('correct\nsolution', {
                        left: xorigin-.65*GRID+dx,
                        top: yorigin-dy-grid,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    this.canvas.add(answerTriangle,answerLine,text);
                }

                if("angle" in answerJSON){
                    xorigin=3*GRID;
                    yorigin=3*GRID;
                    if(answerJSON.angle==0){dx=0;dy=GRID;}
                    else if(answerJSON.angle==45){dx=GRID;dy=GRID;}
                    else if(answerJSON.angle==90){dx=GRID;dy=0;}
                    else if(answerJSON.angle==135){dx=GRID;dy=-GRID;}
                    else if(answerJSON.angle==180){dx=0;dy=-GRID;}
                    else if(answerJSON.angle==225){dx=-GRID;dy=-GRID;}
                    else if(answerJSON.angle==270){dx=-GRID;dy=0;}
                    else if(answerJSON.angle==315){dx=-GRID;dy=GRID;}
                    answerTriangle = new fabric.Triangle({
                        left: xorigin+dx,
                        top: yorigin-dy,
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
                        fill: 'green'
                    });
                    answerLine = new fabric.Line([xorigin, yorigin, xorigin+dx, yorigin-dy], {
                        strokeWidth: 5,
                        fill: 'green',
                        stroke: 'green',
                        originX: 'center',
                        originY: 'center'
                    });

                    answerTriangle.set({
                        'angle': this.calcArrowAngle(answerLine.x1, answerLine.y1, answerLine.x2, answerLine.y2)
                    });

                    text = new fabric.Text('correct\nsolution', {
                        left: xorigin-.65*GRID+dx,
                        top: yorigin-dy-grid,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    this.canvas.add(answerTriangle,answerLine,text);
                }

                incorrect();
            }
        });
    }

    render() {
        return (
            <div className="col-md-6 text-center">
                <div className="bounding-box">
                    <canvas id="c" width="300" height="300" className="lower-canvas"></canvas>
                    <div className="button-group" id="vectorButton">
                        <a className="btn btn-primary" id="checkAnswer">Check</a>
                    </div>
                </div>
            </div>
        );
    }
}


class Question extends React.Component {
    render() {
        return (
            <div className="question" id="ajaxDiv">
                <div className="col-md-6 text-center">
                    <div className="bounding-box">
                        <h1 id="ajaxDiv">{this.props.question.text}</h1>
                        <div className="thumbnail"></div>
                    </div>
                </div>
                <VectorCanvas submitAnswer={this.props.question.submitAnswer}/>
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
                data.submitAnswer = this.submitAnswer;
                this.question = data;
                this.loadQuestion();
            }
        });
    }

    submitAnswer(magnitude, angle, xComponent, yComponent) {
        alert('mag: ' + magnitude + ', angle: ' + angle + ', X: ' + xComponent + ', Y: ' + yComponent);
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
