import React from 'react';


var GRID = 50;


export class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}


export class CanvasVector {

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
        if (this.canvas) {
            this.canvas.add(this.line, this.triangle);
            this.drawing = true;
        }
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
            if (this.canvas) {
                this.canvas.renderAll();
            }
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
        if (this.canvas) {
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

    addToCanvas(canvas) {
        this.canvas = canvas;
        if (this.startPointer && this.endPointer) {
            this.canvas.add(this.line, this.triangle);
            this.canvas.bringToFront(this.line, this.triangle);
        }
    }

    delete() {
        if (this.canvas) {
            this.canvas.remove(this.line, this.triangle);
        }
    }

    isOutOfBounds() {
        if (this.endPointer && (this.endPointer.x > 300 || this.endPointer.x < 0 || this.endPointer.y > 300 || this.endPointer.y < 0)) {
            return true;
        }
        return false;
    }

}


const canvasTextDefaults = {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: .7,
    fontFamily: 'Helvetica',
    fill: 'green',
}


export class CanvasText {

    constructor(canvas, point, text, renderInfo) {
        renderInfo = renderInfo || {};
        var data = Object.assign({}, canvasTextDefaults, point, renderInfo);
        this.canvas = canvas;
        this.answerText = new fabric.Text(text, data);
        if (this.canvas) {
            this.canvas.add(this.answerText);
        }
    }

    addToCanvas(canvas) {
        this.canvas = canvas;
        this.canvas.add(this.answerText);
    }

    delete() {
        if (this.canvas) {
            this.canvas.remove(this.answerText);
        }
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
        } else if (this.props.isNotAnswer) {
            divStyle["pointerEvents"] = "none";
            labelStyle["backgroundColor"] = "red";
            checked = true;
        } else if (!this.props.allowInput || this.props.submitted) {
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


export class VectorCanvas extends React.Component {
    // NOTE It might be better to store the arrow in state
    constructor() {
        super();
        this.objects = [];
        this.state = {
            checked: false, // TODO rename to isNullVector
            submitted: false,
        }
        this.drawColor = "red";
        this.fadedColor = "#ffcccc";
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c', {
            selection: false,
            hasControls: false
        });
        this.drawObjects();
        this.drawGrid();
        this.canvas.on('mouse:down', this.mouseDown.bind(this));
        this.canvas.on('mouse:move', this.mouseMove.bind(this));
        this.canvas.on('mouse:up', this.mouseUp.bind(this));
        // this.setState({checked: false});
        // $('#checkAnswer').click(this.checkAnswer.bind(this));
    }

  componentDidUpdate () {
    var newState = {};
    if (this.props.clear && this.state.checked) {
      newState.checked = false;
    }
    if (this.state.submitted && this.props.clear) {
      newState.submitted = false;
    }
    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }

  refreshAnswer () {
    // populate answer in external component
    if (!this.props.question){ return }
    if (this.arrow) {
      this.props.updateAnswer([
        this.props.question.uuid,
        {
          vector: {
            x_component: this.arrow.getXComponent(),
            y_component: this.arrow.getYComponent()
          }
        }
      ])
    }
  }

    drawGrid() {
        for (var i = 1; i < (600 / GRID); i++) {
            var line = new fabric.Line([i * GRID, 0, i * GRID, 600], {
                stroke: '#ccc',
                hasControls: false,
                hasBorders: false,
                selectable: false
            });
            this.canvas.add(line);
            this.canvas.sendToBack(line);
            line = new fabric.Line([0, i * GRID, 600, i * GRID], {
                stroke: '#ccc',
                hasControls: false,
                hasBorders: false,
                selectable: false
            });
            this.canvas.add(line);
            this.canvas.sendToBack(line);
        }
    }

    mouseDown(o) {
        if (this.arrow) {
            if (this.arrow instanceof NullVector) {
                this.setState({checked: false});
            }
            this.arrow.delete();
        }
        this.arrow = new CanvasVector(this.canvas, this.canvas.getPointer(o.e), this.getColor());
//        this.refreshAnswer()
    }

    mouseMove(o) {
        if (this.arrow && this.arrow instanceof CanvasVector) {
            this.arrow.draw(this.canvas.getPointer(o.e));
        }
//        this.refreshAnswer()
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
        this.refreshAnswer()
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
        this.refreshAnswer()
    }

    static calcVectorXStart(value) {
        if (value > 2) {
            return 2 * GRID;
        } else if (value < -2) {
            return 5 * GRID;
        } else {
            return 3 * GRID;
        }
    }

    static calcVectorYStart(value) {
        if (value > 2) {
            return 4 * GRID;
        } else if (value < -2) {
            return 1 * GRID;
        } else {
            return 3 * GRID;
        }
    }

    static calcCanvasMagnitude(value) {
        return value * GRID;
    }

    getColor() {
        if (this.props.fade) {
            return this.fadedColor;
        } else {
            return this.drawColor;
        }
    }

    drawObjects() {
        if (this.canvas && this.props.objects && this.props.objects.length) {
            var oldVectors = this.objects || [];
            this.objects = [];
            for (var i = 0; i < this.props.objects.length; i++) {
                this.props.objects[i].addToCanvas(this.canvas);
                this.objects.push(this.props.objects[i]);
            }
            for (var i = 0; i <  oldVectors.length; i++) {
                oldVectors[i].delete();
            }
        }
    }

    render() {
        if (this.props.clear) {
            if (this.arrow) {
                this.arrow.delete();
            }
            this.arrow = null;
            for (var i = 0; i <  this.objects.length; i++) {
                this.objects[i].delete();
            }
            this.objects = [];
        }
        if (this.arrow && this.arrow instanceof CanvasVector) {
            var newArrow = new CanvasVector(this.canvas, this.arrow.startPointer, this.getColor());
            newArrow.complete(this.arrow.endPointer);
            this.arrow.delete();
            this.arrow = newArrow;
        }
        this.drawObjects();
        var canvasStyle = {
            border: "1px solid #ccc",
        }
        if (!this.props.allowInput || this.state.submitted) {
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
                    submitted={this.state.submitted}
                    isAnswer={this.props.isNullAnswer}
                    isNotAnswer={this.props.isNotNullAnswer}
                    checked={this.state.checked}
                    onChange={this.nullBoxCheck.bind(this)}
                />
            );
        }
        // var checkButton = '';
        // if (this.props.manualCheck) {
        //     var buttonClass = 'btn btn-primary';
        //     if (!this.props.allowInput || this.state.submitted) {
        //         buttonClass += ' disabled';
        //     }
        //     checkButton = (
        //         <div className={'button-group' + (this.props.answer === null ? '' : ' hidden')} id='vectorButton'>
        //             <a className={buttonClass} onClick={this.checkAnswer.bind(this)}>Check</a>
        //         </div>
        //     );
        // }
        return (
            <div>
                <canvas id="c" width="300" height="300" className="lower-canvas" style={canvasStyle}></canvas>
                <div>{nullBox}</div>
                {/*<div>{checkButton}</div>*/}
                {/*{typeof this.props.continueBtn !== 'undefined' ? this.props.continueBtn : ''}*/}
            </div>
        );
    }

}
