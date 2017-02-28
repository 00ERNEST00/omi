﻿import Omi from '../../src/index.js';

class Hello extends Omi.Component {
    constructor(data) {
        super(data);
    }
    style () {
        return  `
      h1{
      	cursor:pointer;
      }
      `;
    }
    handleClick(target, evt){
        alert(target.innerHTML);
        this.data.onXX();
    }
    render() {
        return  `
      <div>
        {{{img}}}
        <h1 onclick={function(e){
          console.log(this)
          console.log(e)
          console.log('test \\' test "double quote"')
          console.log("test \\"")
        }}>Hello, {{name}}!</h1>
      </div>
  		`;

    }
}


export default Hello;
