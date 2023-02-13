import _ from 'lodash';
import './style.css';
import Icon from './logo.png';
import Data from './data.xml';
import Notes from './data.csv';

import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
  
    // 이 라인이 동작하려면 현재 스크립트를 통해 포함된 Lodash가 필요합니다.
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // 원래 있던 div 에 이미지를 추가합니다.
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  
    element.appendChild(btn);

    console.log(Data);
    console.log(Notes);
  
    return element;
  }
  
  document.body.appendChild(component());