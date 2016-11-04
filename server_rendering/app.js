var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-route');
var app = koa();
var jsdom = require('jsdom');
var Nuclear = require("alloynuclear")(jsdom.jsdom().defaultView);

var Todo = require('./component/todo')(Nuclear,true);



app.use(serve(__dirname + '/component'));

app.use(router.get('/todos', function *(){
    var  str = require('fs').readFileSync(__dirname + '/view/index.html', 'utf8');
    var todo = new Todo({ items: ["Nuclear2","koa",'ejs'] });
    this.body = Nuclear.Tpl.render(str, {
        todo:  todo.HTML
    }); 
    Nuclear.destroy(todo);
}));


app.listen(3000);