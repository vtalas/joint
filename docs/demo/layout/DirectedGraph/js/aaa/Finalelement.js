function finalElement(self) {

    var finalElement = self.joint.shapes.devs.Model.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g>' +
        '<image class="icon"/><title /><text class="label"/></g>',

        defaults: self.joint.util.deepSupplement({
            type: 'devs.FinalElement',
            attrs: {
                rect: { stroke: '#ccc' },
                '.body': { stroke: '#FFFFFF', fill: 'transparent' },
                '.label': {
                    // text: self.eventDetail.eventLabel,
                    text: 'final',
                    'ref-x': 45, 'ref-y': 45,
                    'x-alignment': 'middle', ref: '.body',
                    style: {
                        'font-size': 12,
                        'font-weight': 'Semi-Bold', fill: '#666666'
                    },
                },
                image: { 'height': 40, 'width': 40 },
                title: { text: 'FINAL'},
                '.icon': {
                    'xlink:href': 'images/icons-separate/event.png', 'ref-width': 1, 'ref-height': 1, ref: '.body'
                }
            },
            inPorts: [],
            outPorts: ['out'],
            ports: {
                groups: {
                    'out': {
                        attrs: {
                            '.port-body': {
                                r: 5,
                                stroke: 'grey',
                                magnet: 'passive',
                                transform: "matrix(1 0 0 1 -20 20)",
                                'x-alignment': 'middle',
                                fill: '#262626'
                            },
                            '.port-label': { visibility: 'hidden' }
                        }
                    }
                }
            }
        }, self.joint.shapes.devs.Model.prototype.defaults),

        getPortAttrs: function(portName, index, total, selector, type) {
            var attrs = {};
            var portClass = 'port' + index;
            var portSelector = selector + '>.' + portClass;
            var portLabelSelector = portSelector + '>.port-label';
            var portBodySelector = portSelector + '>.port-body';

            attrs[portLabelSelector] = { text: portName };
            attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type), type: type } };
            attrs[portSelector] = { ref: '.body', 'ref-x': (index + 0.5) * (1 / total) };

            if (selector === '.outPorts') {
                attrs[portSelector]['ref-dy'] = 0;
            }

            return attrs;
        }
    });

    return finalElement;
}
