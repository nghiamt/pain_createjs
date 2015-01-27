var canvas, stage, drawingCanvas, selected, width, height, oldPt, oldMidPt;

var color = "#fff";
var drawingTool = "stroke";
var size = 1;
var baseSize = 5;

var selectedMode = false;
var mouseDown = false;

function init() {
    canvas = document.getElementById('myCanvas');
    stage = new createjs.Stage(canvas);
    selected = new createjs.Container();
    selected.on("pressmove", function(e) {
        selected.x = e.stageX;
        selected.y = e.stageY;
    });
    stage.addChild(selected);

    drawingCanvas = new createjs.Shape();
    stage.addChild(drawingCanvas);

    stage.on("stagemousedown", function (e) {
        if (!selectedMode) {
            if (drawingTool == "stroke") {
                mouseDown = true;
                oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
                oldMidPt = oldPt;
            } else if (drawingTool == "rect") {
                var newRect = new createjs.Shape();
                newRect.graphics.beginFill(color).drawRoundRect().endFill();
                newRect.x = e.stageX;
                newRect.y = e.stageY;
            } else if (drawingTool == "circle") {
                var newCircle = CreateCircle(e.stageX, e.stageY);
                stage.addChild(newCircle);
                //Select(newCircle);
            }
        }
    });

    stage.on("stagemouseup", function (e) {
        mouseDown = false;
    });
    stage.on("stagemousemove", function (e) {
        if (mouseDown && drawingTool == "stroke") {
            var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

            drawingCanvas.graphics.setStrokeStyle(size, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

            oldPt.x = stage.mouseX;
            oldPt.y = stage.mouseY;

            oldMidPt.x = midPt.x;
            oldMidPt.y = midPt.y;
        }
    });

    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
    }
    createjs.Ticker.setFPS(60);
}

function tick(event) {
    stage.update();
}

function Select(obj){
    if (!selected.contains(obj)) {
        selected.addChildAt(obj, 0);
        var bounds = obj.getBounds();
        selected.x = obj.x;
        selected.y = obj.y;
        obj.x = 0;
        obj.y = 0;

        var selectionIndicator = new createjs.Shape();
        selectionIndicator.graphics.beginStroke("#00FF00").drawRoundRect(
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height,
            10);
        selected.addChildAt(selectionIndicator, 1);

        selectedMode = true;
    } else {
        selected.removeAllChildren();
        obj.x = selected.x;
        obj.y = selected.y;
        stage.addChild(obj);
        selectedMode = false;
    }
}

function ChangeDrawingTool() {
    drawingTool = document.getElementById("tools").options[document.getElementById("tools").selectedIndex].value;
    console.log("chose drawing tool: " + drawingTool);
}

function ChangeColor() {
    color = document.getElementById("color").value;

    if (selectedMode) {
        var child = selected.children[0];

        var x = selected.x;
        var y = selected.y;
        var newChild = CreateCircle(x, y);

        Select(child);
        stage.removeChild(child);
        Select(newChild);
    }

    console.log("chose color: " + color);
}

function ChangeSize() {
    size = document.getElementById("size").value;

    if (selectedMode) {
        var child = selected.children[0];
        child.scaleX = size;
        child.scaleY = size;
        var bounds = child.getBounds();
        child.setBounds(
            - (child.originalWidth * child.scaleX / 2),
            - (child.originalHeight * child.scaleY / 2),
            child.originalWidth * child.scaleX,
            child.originalHeight * child.scaleY
        );
        bounds = child.getBounds();

        console.log("new bounds: " + bounds);

        Select(child);
        Select(child);
    }

    console.log("chose size: " + size);
}

function ChangeText() {

}

function CreateCircle(x, y) {
    var newCircle = new createjs.Shape();
    newCircle.originalWidth = baseSize * 2;
    newCircle.originalHeight = baseSize * 2;
    newCircle.graphics.beginFill(color).drawCircle(0, 0, baseSize).endFill();
    newCircle.x = x;
    newCircle.y = y;
    newCircle.scaleX = size;
    newCircle.scaleY = size;
    newCircle.setBounds(-baseSize * size, -baseSize * size, baseSize * size * 2, baseSize * size * 2);
    newCircle.on("dblclick", function(e) {
        if (drawingTool == "select") {
            Select(this);
        }
    });
    return newCircle;
}
