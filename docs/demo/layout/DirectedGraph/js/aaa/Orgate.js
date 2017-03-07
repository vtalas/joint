function OrGateFn(self) {

    var orGate = self.joint.dia.Element.extend({
        markup: '<g class="rotatable"><g class="scalable"><path class="body"/><title /></g><image class="icon"/>' +
        '<text class="label"/><circle class="port inPort"/><rect class="port outPort button"/></g>',
        defaults: self.joint.util.deepSupplement({
            type: 'devs.Orgate',
            attrs: {
                '.body': {
                    d: 'M 50 0 C 50 0 100 15 100 45 L 100 100 C 90 90 10 90 0 100 L 0 45 C 0 15 50 0 50 0 z',
                    stroke: 'black',
                    fill: 'yellow',
                    'stroke-width': '2',
                    meridiumtype: 'devs.Orgate'
                },
                title: { text: 'OR Gate' },
                '.icon': {
                    'xlink:href': 'images/icons-separate/gate_or.png',
                    'ref-width': 1, 'ref-height': 1, ref: '.body'
                },
                '.label': {
                    text: '',
                    ref: '.body',
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
                    'ref-dy': -5,
                    'x-alignment': 'middle'
                }
            }
        }, self.joint.dia.Element.prototype.defaults),
    });

    return orGate;
}