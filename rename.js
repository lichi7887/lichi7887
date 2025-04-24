// ==UserScript==
// @name         Clash Substore Type Reorder
// @namespace    https://github.com/your-namespace
// @version      1.0
// @description  将 Clash 配置文件中的 type 字段移动到 name 字段之后
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 处理 proxies 数组，将 type 移动到 name 后面
    function reorderProxies(proxies) {
        return proxies.map(proxy => {
            if (proxy.type && proxy.name) {
                const { type, name, ...rest } = proxy;
                return { name, type, ...rest };
            }
            return proxy;
        });
    }

    // 处理整个配置文件
    function processConfig(config) {
        if (config.proxies && Array.isArray(config.proxies)) {
            config.proxies = reorderProxies(config.proxies);
        }
        return config;
    }

    // 读取配置文件
    const rawConfig = $argument; // Substore 会将配置文件内容传递到 $argument
    let config;

    try {
        config = JSON.parse(rawConfig); // 解析 JSON 格式的配置文件
    } catch (e) {
        console.error('解析配置文件失败:', e);
        return;
    }

    // 处理配置文件
    const updatedConfig = processConfig(config);

    // 输出处理后的配置文件
    console.log(JSON.stringify(updatedConfig, null, 2)); // 打印结果到控制台
})();
