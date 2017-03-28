﻿import Omi from 'omi';
import OmiRouter from '../../index.js';

import Home from './home.js';
import About from './about.js';
import User from './user.js';

class App extends Omi.Component {

    install(){
        OmiRouter.init({
            routes : [
                { path: '/', component: Home },
                { path: '/about', component: About },
                { path: '/user/:name', component: User }
            ],
            renderTo:"#view"
        });

        Omi.render(new Home(),"#view");
    }

    style(){
       return `
        ul{
            border-bottom: 1px solid #ccc;
            padding-bottom:5px;
        }
        li{
            display:inline-block;
        }
        `
    }

    render() {
        return  `
        <ul>
            <li><a omi-router to="/" >Home</a></li>
            <li><a omi-router to="/about" >About</a></li>
            <li><a omi-router to="/user/dntzhang" >User</a></li>
        </ul>
        `;
    }
}


Omi.render(new App(),"#links");