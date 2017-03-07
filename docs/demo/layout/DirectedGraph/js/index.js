'use strict';

define('joint-graph', ['graphlib', 'dagre'], function(graphlib, dagre) {
    window.graphlib = graphlib;
    window.dagre = dagre;
});

require([
    'joint',
    'js/aaa/Orgate',
    'js/aaa/Andgate',
    'js/aaa/Finalelement',
    'js/aaa/FailureMode',
    'js/aaa/Hypothesis',
    'joint-graph'], function(joint, o) {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper'),
        width: 900,
        height: 900,
        gridSize: 5,
        model: graph
    });

    $('#btn-layout').on('click', layout);

    function layout() {

        joint.layout.DirectedGraph.layout(graph, {
            nodeSep: 120,
            edgeSep: 100,
            rankSep: 110,
            rankDir: "R"
        });
    }


    var app = {
        joint: joint
    }

    var orCell = new (OrGateFn(app))({
        position: { x: 10, y: 10 },
        size: { width: 100, y: 100 }
    });

    var andCell = new (AndGateFn(app))({
        position: { x: 100, y: 100 },
        size: { width: 100, y: 100 }
    });

    var hypoCell = new (HypothesisFn(app))({
        position: { x: 100, y: 200 },
        size: { width: 100, y: 100 }
    });

    var finalCell = new (finalElement(app))({
        position: { x: 100, y: 400 },
        size: { width: 100, y: 100 }
    });
    var failureCell = new (FailuremodeFn(app))({
        position: { x: 200, y: 400 },
        size: { width: 100, y: 100 }
    });

    graph.addCell(orCell);
    graph.addCell(andCell);
    graph.addCell(hypoCell);
    graph.addCell(finalCell);
    graph.addCell(failureCell);

    new joint.dia.Link({source: orCell, target: andCell}).addTo(graph);
    new joint.dia.Link({source: orCell, target: hypoCell}).addTo(graph);
    new joint.dia.Link({source: hypoCell, target: finalCell}).addTo(graph);
    new joint.dia.Link({source: hypoCell, target: failureCell}).addTo(graph);

})();
