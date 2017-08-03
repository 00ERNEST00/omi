import Omi from './core/omi.js'
import Store from './core/store.js'
import Component from './core/component.js'

import Mustache from './lib/mustache.js'

Omi.template = Mustache.render
Omi.Store = Store
Omi.Component = Component

if (window.Omi) {
    module.exports = window.Omi
} else {
    window.Omi = Omi
    module.exports = Omi
}
