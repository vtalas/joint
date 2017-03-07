function FailuremodeFn(self) {
    var failuremode = self.joint.shapes.devs.Model.extend({
        markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g>' +
        '<image class="icon"/><title /><text class="label"/></g>',

        defaults: self.joint.util.deepSupplement({
            type: 'devs.Failuremode',
            attrs: {
                '.body': { stroke: '#FFFFFF', fill: 'transparent' },
                '.label': {
                    text: '', 'ref-x': 45, 'ref-y': 45, 'x-alignment': 'middle', ref: '.body',
                    style: { 'font-size': 12, 'font-weight': 'Semi-Bold', fill: '#666666' },
                },
                title: { text: 'FAILURE_MODE_STATUS' },
                '.icon': {
                    'xlink:href': 'images/icons-separate/failure_mode.png',
                    'ref-width': 1,
                    'ref-height': 1,
                    ref: '.body'
                }
            },
            inPorts: ['in'],
            outPorts: ['out'],
            ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                stroke: 'grey',
                                r: '5',
                                magnet: 'passive',
                                fill: '#262626',
                                transform: "matrix(1 0 0 1 13 -15)"
                            },
                            '.port-label': { visibility: 'hidden' }
                        }
                    }, 'out': {
                        attrs: {
                            '.port-body': {
                                stroke: 'grey',
                                r: '5',
                                magnet: 'passive',
                                fill: '#262626',
                                transform: "matrix(1 0 0 1 -12 15)"
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

    return failuremode;
}