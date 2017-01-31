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




class VectorCanvas extends React.Component {
    constructor() {
        super();
        this.line;
        this.triangle;
        this.deltaX;
        this.deltaY;
        this.isDown = false;
        this.grid = 50;
        this.canvas = null;
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c', {
            selection: false,
            hasControls: false
        });
        for (var i = 1; i < (600 / this.grid); i++) {
            this.canvas.add(new fabric.Line([i * this.grid, 0, i * this.grid, 600], {
                stroke: '#ccc',
                hasControls: false,
                hasBorders: false,
                selectable: false
            }));
            this.canvas.add(new fabric.Line([0, i * this.grid, 600, i * this.grid], {
                stroke: '#ccc',
                hasControls: false,
                hasBorders: false,
                selectable: false
            }))
        }
        this.canvas.on('mouse:down', this.mouseDown.bind(this));
        this.canvas.on('mouse:move', this.mouseMove.bind(this));
        this.canvas.on('mouse:up', this.mouseUp.bind(this));
    }

    calcArrowAngle(x1, y1, x2, y2) {
        var angle = 0,
        x, y;
        x = (x2 - x1);
        y = (y2 - y1);
        if (x === 0) {
            angle = (y === 0) ? 0 : (y > 0) ? Math.PI / 2 : Math.PI * 3 / 2;
        } else if (y === 0) {
            angle = (x > 0) ? 0 : Math.PI;
        } else {
            angle = (x < 0) ? Math.atan(y / x) + Math.PI : (y < 0) ? Math.atan(y / x) + (2 * Math.PI) : Math.atan(y / x);
        }

        return (angle * 180 / Math.PI + 90);
    }

    mouseDown(o) {
        this.canvas.remove(this.line, this.triangle);
        this.isDown = true;
        var pointer = this.canvas.getPointer(o.e);
        var points = [Math.round(pointer.x / this.grid) * this.grid, Math.round(pointer.y / this.grid) * this.grid, pointer.x, pointer.y];
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
    }

    mouseMove(o) {
        if (!this.isDown) return;
        var pointer = this.canvas.getPointer(o.e);
        this.line.set({
            x2: pointer.x,
            y2: pointer.y
        });
        this.triangle.set({
            'left': pointer.x + this.deltaX,
            'top': pointer.y + this.deltaY,
            'angle': this.calcArrowAngle(this.line.x1, this.line.y1, this.line.x2, this.line.y2)
        });
        this.canvas.renderAll();
    }

    mouseUp(o) {
        var pointer = this.canvas.getPointer(o.e);
        this.isDown = false;
        var snappedxCoordinate = Math.round(pointer.x / this.grid) * this.grid;
        var snappedyCoordinate = Math.round(pointer.y / this.grid) * this.grid;
        var snappedxCoordinateArrowhead = Math.round((pointer.x + this.deltaX) / this.grid) * this.grid;
        var snappedyCoordinateArrowhead = Math.round((pointer.y + this.deltaY) / this.grid) * this.grid;

        this.line.set({
            x2: snappedxCoordinate-4*Math.sin(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180),
            y2: snappedyCoordinate+4*Math.cos(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180)
        });
        this.triangle.set({
            'left': snappedxCoordinateArrowhead-9*Math.sin(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180),
            'top': snappedyCoordinateArrowhead+9*Math.cos(this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180),
            'angle': this.calcArrowAngle(this.line.x1, this.line.y1, snappedxCoordinate, snappedyCoordinate)
        });
        var userMagnitude = Math.sqrt(Math.pow(Math.round((this.line.x2-this.line.x1)/this.grid)*this.grid,2)+Math.pow(Math.round((this.line.y2-this.line.y1)/this.grid)*this.grid,2))/this.grid;
        if(userMagnitude==0){this.canvas.remove(this.line);this.triangle.set({'left':snappedxCoordinateArrowhead ,'top':snappedyCoordinateArrowhead,'angle':0});}
        this.canvas.renderAll();
        var userDeltaX = Math.round((this.line.x2-this.line.x1)/this.grid);
        var userDeltaY = Math.round((this.line.y1-this.line.y2)/this.grid);
        if(this.calcArrowAngle(this.line.x1, this.line.y1, this.line.x2, this.line.y2)<360){var userAngle=this.calcArrowAngle(this.line.x1, this.line.y1, this.line.x2, this.line.y2);}
        else{var userAngle=this.calcArrowAngle(this.line.x1, this.line.y1, this.line.x2, this.line.y2)-360;}
    }

    checkAnswer() {
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
                        left: 3*this.grid,
                        top: 3*grid-answerJSON.magnitude*this.grid+10,
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

                    answerLine = new fabric.Line([3*this.grid, 3*this.grid, 3*this.grid, 3*grid-answerJSON.magnitude*this.grid+4], {
                        strokeWidth: 5,
                        fill: 'green',
                        stroke: 'green',
                        originX: 'center',
                        originY: 'center'
                    });
                    text = new fabric.Text('correct\nsolution', {
                        left: 2.35*this.grid,
                        top: 2*grid-answerJSON.magnitude*this.grid,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    this.canvas.add(answerTriangle,answerLine,text);
                }


                if("deltax" in answerJSON || "deltay" in answerJSON){
                    if("deltax" in answerJSON){dx=answerJSON.deltax*this.grid;}else{dx=0;}
                    if("deltay" in answerJSON){dy=answerJSON.deltay*this.grid;}else{dy=0;}
                    if(dx>2*this.grid){xorigin=this.grid;}else if(dx<-2*this.grid){xorigin=5*this.grid;} else{xorigin=3*this.grid;}
                    if(dy>2*this.grid){yorigin=5*this.grid;}else if(dy<-2*this.grid){yorigin=this.grid;} else{yorigin=3*this.grid;}

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
                        left: xorigin-.65*this.grid+dx,
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
                    xorigin=3*this.grid;
                    yorigin=3*this.grid;
                    if(answerJSON.angle==0){dx=0;dy=this.grid;}
                    else if(answerJSON.angle==45){dx=this.grid;dy=this.grid;}
                    else if(answerJSON.angle==90){dx=this.grid;dy=0;}
                    else if(answerJSON.angle==135){dx=this.grid;dy=-this.grid;}
                    else if(answerJSON.angle==180){dx=0;dy=-this.grid;}
                    else if(answerJSON.angle==225){dx=-this.grid;dy=-this.grid;}
                    else if(answerJSON.angle==270){dx=-this.grid;dy=0;}
                    else if(answerJSON.angle==315){dx=-this.grid;dy=this.grid;}
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
                        left: xorigin-.65*this.grid+dx,
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
                        <a className="btn btn-primary" id="button">Check</a>
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
                <VectorCanvas/>
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
