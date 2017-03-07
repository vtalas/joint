function AndGateFn(self) {
    var andGate = self.joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><path class="body"/><title /></g>' +
        '<image class="icon"/><text class="label"/><circle class="port inPort"/><rect class="port outPort button"/></g>',
        defaults: self.joint.util.deepSupplement({
            type: 'devs.Andgate',
            attrs: {
                '.body': {
                    d: 'M 50 0 C 70 0 100 15 100 25 L 100 100 L 0 100 L 0 25 C 0 15 30 0 50 0 z',
                    stroke: 'green',
                    fill: 'lightgreen',
                    'stroke-width': '2',
                    meridiumtype: 'devs.Andgate'
                },
                title: { text: 'AND Gate' },
                '.icon': {
                    'xlink:href': 'images/icons-separate/gate_and.png',
                    'ref-width': 1, 'ref-height': 1, ref: '.body'
                },
                '.label': {
                    text: '',
                    'ref-x': 0.5,
                    'ref-y': 48,
                    'x-alignment': 'middle',
                    'y-alignment': 'middle'
                },
                '.inPort': {
                    r: 5,
                    stroke: 'gray',
                    fill: 'lightgray',
                    magnet: 'passive',
                    ref: '.body',
                    'ref-x': 0.5
                },
                '.button': {
                    width: 5,
                    height: 7,
                    fill: 'orange',
                    stroke: 'red',
                    ref: '.body',
                    'ref-x': 0.5,
                    'ref-dy': -4,
                    'x-alignment': 'middle'
                }
            }
        }, self.joint.dia.Element.prototype.defaults),
    });

    return andGate;
}