import Omi from '../../src/index.js';
import store from './store.js';

class List extends Omi.Component {
    constructor(data) {
        super(data)
        this.useStore(store)
    }

    storeToData(){
        this.data.items = this.$$store.data.items
    }

    render () {
        return ` <ul> {{#items}} <li>{{.}}</li> {{/items}}</ul>`
    }
}

export default List;
