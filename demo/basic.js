"use strict";
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 650,
    height: 1200,
    gridSize: 10,
    model: graph,
    markAvailable: true,
    linkConnectionPoint: joint.util.shapePerimeterConnectionPoint
});

var x = new joint.shapes.devs.Model()
    .position(100, 200)
    .size(100, 100)
    .addTo(graph)
    .set('inPorts', ['x1', 'x2', 'x3', 'x4']);


var y = new joint.shapes.devs.Model()
    .position(200, 400)
    .size(100, 100)
    .addTo(graph)
    .set('outPorts', ['y1', 'y2', 'y3', 'y4']);

var yy = new joint.shapes.devs.Model()
    .position(200, 50)
    .size(100, 100)
    .addTo(graph)
    .set('outPorts', ['yy1', 'yy2', 'yy3', 'yy4']);

var topx = new joint.shapes.devs.Model({
    ports: {
        groups: {
            'in': {
                position: { name: 'bottom' },
                label: { position: 'top' }
            }
        }
    }
})
    .position(100, 600)
    .size(100, 100)
    .addTo(graph)
    .set('inPorts', ['11', '12', '13', '14'])
    .set('outPorts', ['11a', '12a', '13a', '14a']);

var bottom = new joint.shapes.devs.Model({
    attrs: {
        text: { text: '' }
    },
    ports: {
        groups: {
            'in': {
                position: { name: 'top', args: { start: { x: 20, y: 0}, end: { x: 230, y: 0 } } },
                label: { position: 'bottom' }
            }
        }
    }
})
    .position(400, 800)
    .size(250, 100)
    .addTo(graph)
    .set('inPorts', ['1', '2', '3', '4', '5', '6', '7', '8']);


function portUtil(element, port) {

    return Object.create({
        element: element,
        port: port,
        // minimum link offset from the element (should be higher than paper grid size)
        PADDING: 12,
        // space between parallel links
        LINK_OFFSET: 20,
        getPosition: function() {
            var group = port.group;
            return this.element.prop('ports/groups/' + group + '/position/name');
        },

        getOrderedPortPostions: function(model, groupName) {
            return model.getPortsPositions(groupName);
        },

        sss: function(refModel) {
            var model = this.element;
            var groupName = port.group;
            var position = this.getPosition();
            var elBBox = model.position();
            var refBBox = refModel.position();
            var refIsBelow = refBBox.y < elBBox.y;
            var refIsRight = refBBox.x > elBBox.x;

            var portPositions = this.getOrderedPortPostions(model, groupName);
            var portPosition = portPositions[port.id];
            var vertexPosition = null;
            var portsTotal = Object.keys(portPositions).length - 1;

            var offset;
            if (position === 'left') {
                if (refIsBelow) {
                    offset = (portPosition.index) * this.LINK_OFFSET + this.PADDING
                } else {
                    offset = (portsTotal - portPosition.index) * this.LINK_OFFSET + this.PADDING;
                }
                vertexPosition = { x: elBBox.x + portPosition.x - offset, y: elBBox.y + portPosition.y };
            }

            if (position === 'right') {
                if (refIsBelow) {
                    offset = (portPosition.index) * this.LINK_OFFSET + this.PADDING;
                } else {
                    offset = (portsTotal - portPosition.index) * this.LINK_OFFSET + this.PADDING
                }

                vertexPosition = { x: elBBox.x + portPosition.x + offset, y: elBBox.y + portPosition.y };
            }

            if (position === 'top') {
                if (refIsRight) {
                    offset = (portsTotal - portPosition.index) * this.LINK_OFFSET + this.PADDING;
                } else {
                    offset = portPosition.index * this.LINK_OFFSET + this.PADDING
                }
                vertexPosition = { x: elBBox.x + portPosition.x, y: elBBox.y - offset + portPosition.y };
            }

            if (position === 'bottom') {
                if (refIsRight) {
                    offset = (portsTotal - portPosition.index) * this.LINK_OFFSET + this.PADDING;
                } else {
                    offset = portPosition.index * this.LINK_OFFSET + this.PADDING
                }
                vertexPosition = { x: elBBox.x + portPosition.x, y: elBBox.y + offset + portPosition.y };
            }

            return vertexPosition;
        }
    });
}

paper.on('link:connect', function(cellView) {

    var cell = cellView.model;
    if (cell.isLink()) {
        var view = cell.findView(paper);

        var source = cell.getSourceElement();
        var target = cell.getTargetElement();

        var sourcePort = cell.get('source').port;
        var vertexPosition;

        if (sourcePort) {
            var sourcePorts = portUtil(source, source.getPort(sourcePort));
            vertexPosition = sourcePorts.sss(target);
            if (vertexPosition) {
                view.addVertex(vertexPosition.x, vertexPosition.y);
            }

        }

        var targetPort = cell.get('target').port;
        if (targetPort) {

            var t = portUtil(target, target.getPort(targetPort));
            vertexPosition = t.sss(source);
            if (vertexPosition) {
                view.addVertex(vertexPosition.x, vertexPosition.y);
            }
        }

        cell.set('router', {
            name: 'manhattan', args: {
                paddingBox: { x: 0, y: 0, width: 0, height: 0 },
                startDirections: [sourcePorts.getPosition()], endDirections: [t.getPosition()]
            }
        })
    }
});
