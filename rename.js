// ==UserScript==
// @name         Replace Type and Name Order
// @namespace    https://github.com/your-namespace
// @version      1.0
// @description  自动将 "type":"(.*?)","name":"(.*?)" 替换为 "name":"$2","type":"$1"
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 定义正则表达式
    const regex = /"type":"(.*?)","name":"(.*?)"/g;

    // 获取页面内容
    let content = document.body.innerText;

    // 替换内容
    const replacedContent = content.replace(regex, '"name":"$2","type":"$1"');

    // 如果内容有变化，则更新页面内容
    if (content !== replacedContent) {
        document.body.innerText = replacedContent;
        console.log('内容已替换完成');
    } else {
        console.log('未发现需要替换的内容');
    }
})();
