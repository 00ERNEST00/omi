function todo(Nuclear,server) {
    var Todo = Nuclear.create({
        add: function (evt) {
            evt.preventDefault();
            this.option.items.push(this.textBox.value);
        },
        render: function () {
            return `<style>input{width:400px;}</style><div>
                      <h3>TODO</h3>
                      <ul> {{#items}} <li>{{.}}</li> {{/items}}</ul>
                      <form onsubmit="add(event)" >
                          <input nc-id="textBox" type="text"  value="" />
                          <button>Add #{{items.length}}</button>
                      </form>
                    </div>`;
        },
        style: function () {
            return `h3 { color:red; }
                   button{ color:green;}`;
        }
    },{
    server:server
});
    return Todo;
}

if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports =  todo ;
} else {
    this.todo = todo;
}