
require.config({
    paths: {
        'jquery': 'lib/jquery.min',
        'lodash': 'lib/lodash.min',
        'backbone': 'lib/backbone.min',
        'dagre': 'lib/dagre',
        'graphlib': 'lib/graphlib.min',
        'joint': 'lib/joint'
    },
    map: {
        '*': {
            // Backbone requires underscore. This forces RequireJS to load lodash instead.
            'underscore': 'lodash'
        }
    }
});