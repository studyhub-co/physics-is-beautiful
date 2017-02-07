function drawVector() {
    var canvas = new fabric.Canvas('c', {
        selection: false,
        hasControls: false
    });
    var grid = 50;
    for (var i = 1; i < (600 / grid); i++) {
        canvas.add(new fabric.Line([i * grid, 0, i * grid, 600], {
            stroke: '#ccc',
            hasControls: false,
            hasBorders: false,
            selectable: false
        }));
        canvas.add(new fabric.Line([0, i * grid, 600, i * grid], {
            stroke: '#ccc',
            hasControls: false,
            hasBorders: false,
            selectable: false
        }))
    }

    var line, triangle, isDown;

    function calcArrowAngle(x1, y1, x2, y2) {
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

    canvas.on('mouse:down', function(o) {
        canvas.remove(line, triangle);
        isDown = true;
        var pointer = canvas.getPointer(o.e);
        var points = [Math.round(pointer.x / grid) * grid, Math.round(pointer.y / grid) * grid, pointer.x, pointer.y];
        line = new fabric.Line(points, {
            strokeWidth: 5,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center'
        });

        centerX = (line.x1 + line.x2) / 2;
        centerY = (line.y1 + line.y2) / 2;
        deltaX = line.left - centerX;
        deltaY = line.top - centerY;

        triangle = new fabric.Triangle({
            left: line.get('x1') + deltaX,
            top: line.get('y1') + deltaY,
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

        canvas.add(line, triangle);

    });

    canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);
        line.set({
            x2: pointer.x,
            y2: pointer.y
        });
        triangle.set({
            'left': pointer.x + deltaX,
            'top': pointer.y + deltaY,
            'angle': calcArrowAngle(line.x1, line.y1, line.x2, line.y2)
        });
        canvas.renderAll();
    });

    canvas.on('mouse:up', function(o) {
        var pointer = canvas.getPointer(o.e);
        isDown = false;
        snappedxCoordinate = Math.round(pointer.x / grid) * grid;
        snappedyCoordinate = Math.round(pointer.y / grid) * grid;
        snappedxCoordinateArrowhead = Math.round((pointer.x + deltaX) / grid) * grid;
        snappedyCoordinateArrowhead = Math.round((pointer.y + deltaY) / grid) * grid;

        line.set({
            x2: snappedxCoordinate-4*Math.sin(calcArrowAngle(line.x1, line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180),
            y2: snappedyCoordinate+4*Math.cos(calcArrowAngle(line.x1, line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180)
        });
        triangle.set({
            'left': snappedxCoordinateArrowhead-9*Math.sin(calcArrowAngle(line.x1, line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180),
            'top': snappedyCoordinateArrowhead+9*Math.cos(calcArrowAngle(line.x1, line.y1, snappedxCoordinate, snappedyCoordinate)*Math.PI/180),
            'angle': calcArrowAngle(line.x1, line.y1, snappedxCoordinate, snappedyCoordinate)
        });
        userMagnitude = Math.sqrt(Math.pow(Math.round((line.x2-line.x1)/grid)*grid,2)+Math.pow(Math.round((line.y2-line.y1)/grid)*grid,2))/grid;
        if(userMagnitude==0){canvas.remove(line);triangle.set({'left':snappedxCoordinateArrowhead ,'top':snappedyCoordinateArrowhead,'angle':0});}
        canvas.renderAll();
        userDeltaX = Math.round((line.x2-line.x1)/grid);
        userDeltaY = Math.round((line.y1-line.y2)/grid);
        if(calcArrowAngle(line.x1, line.y1, line.x2, line.y2)<360){userAngle=calcArrowAngle(line.x1, line.y1, line.x2, line.y2);}
        else{userAngle=calcArrowAngle(line.x1, line.y1, line.x2, line.y2)-360;}
        magnitude=drawvectorDjango.magnitude;
        deltax= drawvectorDjango.xComponent;
        deltay= drawvectorDjango.yComponent;
        angle= drawvectorDjango.angle;
        if(magnitude){ answerMagnitude=magnitude} else{answerMagnitude = userMagnitude}
        if(deltax){ answerDeltaX=deltax} else{answerDeltaX = userDeltaX}
        if(deltay){ answerDeltaY=deltay} else{answerDeltaY = userDeltaY}
        if(angle){ answerAngle=angle} else{answerAngle = userAngle}
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
                triangle.set({'fill': '#ffd4cc'});
                line.set({'stroke': '#ffd4cc'});
                canvas.renderAll();
                $("#button").toggleClass('disabled');
                if("magnitude" in answerJSON){
                    answerTriangle = new fabric.Triangle({
                        left: 3*grid,
                        top: 3*grid-answerJSON.magnitude*grid+10,
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

                    answerLine = new fabric.Line([3*grid, 3*grid, 3*grid, 3*grid-answerJSON.magnitude*grid+4], {
                        strokeWidth: 5,
                        fill: 'green',
                        stroke: 'green',
                        originX: 'center',
                        originY: 'center'
                    });
                    text = new fabric.Text('correct\nsolution', {
                        left: 2.35*grid,
                        top: 2*grid-answerJSON.magnitude*grid,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    canvas.add(answerTriangle,answerLine,text);
                }


                if("deltax" in answerJSON || "deltay" in answerJSON){
                    if("deltax" in answerJSON){dx=answerJSON.deltax*grid;}else{dx=0;}
                    if("deltay" in answerJSON){dy=answerJSON.deltay*grid;}else{dy=0;}
                    if(dx>2*grid){xorigin=grid;}else if(dx<-2*grid){xorigin=5*grid;} else{xorigin=3*grid;}
                    if(dy>2*grid){yorigin=5*grid;}else if(dy<-2*grid){yorigin=grid;} else{yorigin=3*grid;}

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
                        'angle': calcArrowAngle(answerLine.x1, answerLine.y1, answerLine.x2, answerLine.y2)
                    });

                    text = new fabric.Text('correct\nsolution', {
                        left: xorigin-.65*grid+dx,
                        top: yorigin-dy-grid,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    canvas.add(answerTriangle,answerLine,text);
                }

                if("angle" in answerJSON){
                    xorigin=3*grid;
                    yorigin=3*grid;
                    if(answerJSON.angle==0){dx=0;dy=grid;}
                    else if(answerJSON.angle==45){dx=grid;dy=grid;}
                    else if(answerJSON.angle==90){dx=grid;dy=0;}
                    else if(answerJSON.angle==135){dx=grid;dy=-grid;}
                    else if(answerJSON.angle==180){dx=0;dy=-grid;}
                    else if(answerJSON.angle==225){dx=-grid;dy=-grid;}
                    else if(answerJSON.angle==270){dx=-grid;dy=0;}
                    else if(answerJSON.angle==315){dx=-grid;dy=grid;}
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
                        'angle': calcArrowAngle(answerLine.x1, answerLine.y1, answerLine.x2, answerLine.y2)
                    });

                    text = new fabric.Text('correct\nsolution', {
                        left: xorigin-.65*grid+dx,
                        top: yorigin-dy-grid,
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: .7,
                        fontFamily: 'Helvetica',
                        fill: 'green',
                    });
                    canvas.add(answerTriangle,answerLine,text);
                }


                incorrect();}
        });
    });
}
drawVector();