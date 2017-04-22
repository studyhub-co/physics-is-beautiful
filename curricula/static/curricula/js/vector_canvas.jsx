import React from 'react';


var GRID = 50;


class CanvasVector {

    constructor(canvas, pointer, color) {
        this.canvas = canvas;
        color = color || 'red';
        var points = [
            Math.round(pointer.x / GRID) * GRID,
            Math.round(pointer.y / GRID) * GRID,
            pointer.x,
            pointer.y
        ];
        this.startPointer = {
            x: pointer.x,
            y: pointer.y,
        };
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
                'angle': this.calcArrowAngle(
                    this.line.x1,
                    this.line.y1,
                    this.line.x2,
                    this.line.y2
                )
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

        this.endPointer = {
            x: snappedxCoordinate,
            y: snappedyCoordinate,
        };

        this.line.set({
            x2: snappedxCoordinate - 4 * Math.sin(
                this.calcArrowAngle(
                    this.line.x1,
                    this.line.y1,
                    snappedxCoordinate,
                    snappedyCoordinate
                ) * Math.PI / 180
            ),
            y2: snappedyCoordinate + 4 * Math.cos(
                this.calcArrowAngle(
                    this.line.x1,
                    this.line.y1,
                    snappedxCoordinate,
                    snappedyCoordinate
                ) * Math.PI / 180
            )
        });
        this.triangle.set({
            'left': snappedxCoordinateArrowhead - 9 * Math.sin(
                this.calcArrowAngle(this.line.x1,
                    this.line.y1,
                    snappedxCoordinate,
                    snappedyCoordinate
                ) * Math.PI / 180
            ),
            'top': snappedyCoordinateArrowhead + 9 * Math.cos(
                this.calcArrowAngle(
                    this.line.x1,
                    this.line.y1,
                    snappedxCoordinate,
                    snappedyCoordinate
                ) * Math.PI / 180
            ),
            'angle': this.calcArrowAngle(
                this.line.x1,
                this.line.y1,
                snappedxCoordinate,
                snappedyCoordinate
            )
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
        var angle = this.calcArrowAngle(
            this.line.x1,
            this.line.y1,
            this.line.x2,
            this.line.y2
        );
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

    isOutOfBounds() {
        if (this.endPointer && (this.endPointer.x > 300 || this.endPointer.x < 0 || this.endPointer.y > 300 || this.endPointer.y < 0)) {
            return true;
        }
        return false;
    }

}


class NullVector {

    getXComponent() {
        return null;
    }

    getYComponent() {
        return null;
    }

    delete() {
    }
}


class NullCheckbox extends React.Component {

    onChange(event) {
        this.props.onChange(event);
    }

    render() {
        var divStyle = {};
        var labelStyle = {};
        var checked = this.props.checked;
        if (this.props.isAnswer) {
            divStyle["pointerEvents"] = "none";
            labelStyle["backgroundColor"] = "rgb(127, 250, 127)";
            checked = true;
        } else if (!this.props.allowInput) {
            divStyle["pointerEvents"] = "none";
        }
        return (
            <div id="nullVector" className="checkbox" style={divStyle}>
                <label id="highlightGreen" style={labelStyle}>
                    <input
                        id="nullVectorCheckbox"
                        type="checkbox"
                        checked={checked}
                        onChange={this.onChange.bind(this)}
                    />
                    Null vector
                </label>
            </div>
        );
    }

}


export class Canvas extends React.Component {

    constructor() {
        super();
        this.arrow;
        this.answerArrow;
        this.answerText;
        this.canvas = null;
        this.nullChecked = false;
        this.state = {
            checked: false,
        }
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
            if (this.arrow instanceof NullVector) {
                this.setState({checked: false});
            }
            this.arrow.delete();
        }
        this.arrow = new CanvasVector(this.canvas, this.canvas.getPointer(o.e));
    }

    mouseMove(o) {
        if (this.arrow && this.arrow instanceof CanvasVector) {
            this.arrow.draw(this.canvas.getPointer(o.e));
        }
    }

    mouseUp(o) {
        this.arrow.complete(this.canvas.getPointer(o.e));
        if (this.arrow.getYComponent() === 0 && this.arrow.getXComponent() === 0) {
            this.arrow.delete();
            this.arrow = new NullVector();
            this.nullBoxCheck();
        }
    }

    nullBoxCheck(event) {
        var newState = !this.state.checked;
        if (newState) {
            if (this.arrow) {
                this.arrow.delete();
            }
            this.arrow = new NullVector();
        } else {
            if (this.arrow) {
                this.arrow.delete();
            }
            this.arrow = null;
        }
        this.setState({checked: newState});
    }

    checkAnswer(o) {
        if (this.arrow && this.props.question.submitAnswer) {
            this.props.question.submitAnswer(
                this.props.question.uuid,
                {
                    vector: {
                        x_component: this.arrow.getXComponent(),
                        y_component: this.arrow.getYComponent(),
                    }
                }
            );
            this.setState({checked: false});
        }
    }

    calcAnswerXStart(value) {
        if (value > 2) {
            return 2 * GRID;
        } else if (value < -2) {
            return 5 * GRID;
        } else {
            return 3 * GRID;
        }
    }

    calcAnswerYStart(value) {
        if (value > 2) {
            return 4 * GRID;
        } else if (value < -2) {
            return 1 * GRID;
        } else {
            return 3 * GRID;
        }
    }
    renderAnswer() {
        var answer = this.props.answer;
        var pointer = {
            x: this.calcAnswerXStart(answer.xComponent),
            y: this.calcAnswerYStart(answer.yComponent),
        }
        var endPointer = {
            x: pointer['x'] + answer.xComponent * GRID,
            y: pointer['y'] - answer.yComponent * GRID,
        }
        this.answerArrow = new CanvasVector(this.canvas, pointer, 'green');
        this.answerArrow.complete(endPointer);

        this.answerText = new fabric.Text('correct\nsolution', {
            left: endPointer.x - .65 * GRID + answer.xComponent,
            top: endPointer.y - answer.yComponent - GRID,
            fontSize: 20,
            textAlign: 'center',
            lineHeight: .7,
            fontFamily: 'Helvetica',
            fill: 'green',
        });
        this.canvas.add(this.answerText);
    }

    render() {
        var nullIsAnswer = false;
        if (this.props.question.is_correct === false && this.props.answer && !this.answerArrow) {
            var newArrow = new CanvasVector(this.canvas, this.arrow.startPointer, "#ffcccc");
            newArrow.complete(this.arrow.endPointer);
            this.arrow.delete();
            this.arrow = newArrow;

            if ((this.props.answer.xComponent === null || this.props.answer.yComponent === null) ||
                (this.props.answer.xComponent === 0 && this.props.answer.yComponent === 0)){
                nullIsAnswer = true;
            } else {
                this.renderAnswer();
            }
        } else if (this.props.question.is_correct === undefined && this.answerArrow) {
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
            if (this.arrow && this.arrow instanceof CanvasVector) {
                this.arrow.delete();
                this.arrow = null;
            }
            $('.upper-canvas').css('pointer-events', '');
        }
        if (this.props.question.answer_type == 'NULLABLE_VECTOR') {
            nullBox = <NullCheckbox checked={this.state.checked} isAnswer={nullIsAnswer} onChange={this.nullBoxCheck.bind(this)} />;
        }
        return (
            <div className="bounding-box">
                <canvas id="c" width="300" height="300" className="lower-canvas" style={canvasStyle}></canvas>
                {nullBox}
                <div className="button-group" id="vectorButton">
                    <a className={buttonClass} id="checkAnswer">Check</a>
                </div>
            </div>
        );
    }
}


export class VectorCanvas extends React.Component {

    constructor() {
        super();
        this.state = {
            checked: false,
        }
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
        // $('#checkAnswer').click(this.checkAnswer.bind(this));
    }

    componentDidUpdate() {
        if (this.props.clear && this.state.checked) {
            this.setState({checked: false});
        }
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
            if (this.arrow instanceof NullVector) {
                this.setState({checked: false});
            }
            this.arrow.delete();
        }
        this.arrow = new CanvasVector(this.canvas, this.canvas.getPointer(o.e));
    }

    mouseMove(o) {
        if (this.arrow && this.arrow instanceof CanvasVector) {
            this.arrow.draw(this.canvas.getPointer(o.e));
        }
    }

    mouseUp(o) {
        this.arrow.complete(this.canvas.getPointer(o.e));
        if (this.arrow.isOutOfBounds()) {
            this.arrow.delete()
            this.arrow = null;
        } else if (this.arrow.getYComponent() === 0 && this.arrow.getXComponent() === 0) {
            this.arrow.delete();
            this.arrow = new NullVector();
            this.nullBoxCheck();
        } else if (this.props.onComplete) {
            this.props.onComplete(this.arrow);
        }
    }

    nullBoxCheck(event) {
        var newState = !this.state.checked;
        if (newState) {
            if (this.arrow) {
                this.arrow.delete();
            }
            this.arrow = new NullVector();

            if (this.props.onComplete) {
                this.props.onComplete(this.arrow);
            }
        } else {
            if (this.arrow) {
                this.arrow.delete();
            }
            this.arrow = null;
        }
        this.setState({checked: newState});
    }

    render() {
        if (this.props.clear) {
            if (this.arrow) {
                this.arrow.delete();
            }
            this.arrow = null;
        }
        var canvasStyle = {
            border: "1px solid #ccc",
        }
        if (!this.props.allowInput) {
            canvasStyle['pointerEvents'] = 'none';
            $('.upper-canvas').css('pointer-events', 'none');
        } else {
            $('.upper-canvas').css('pointer-events', '');
        }
        var nullBox = '';
        if (this.props.allowNull) {
            nullBox = (
                <NullCheckbox
                    allowInput={this.props.allowInput}
                    checked={this.state.checked}
                    onChange={this.nullBoxCheck.bind(this)}
                />
            );
        }
        return (
            <div>
                <canvas id="c" width="300" height="300" className="lower-canvas" style={canvasStyle}></canvas>
                {nullBox}
            </div>
        );
    }

}
