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

    /**
     * 重新排序 proxies 中的字段，将 type 移动到 name 后面
     * @param {Array} proxies - Clash 配置文件中的 proxies 数组
     * @returns {Array} - 重新排序后的 proxies 数组
     */
    function reorderProxies(proxies) {
        return proxies.map(proxy => {
            if (proxy.type && proxy.name) {
                const { type, name, ...rest } = proxy;
                return { name, type, ...rest };
            }
            return proxy;
        });
    }

    /**
     * 处理 Clash 配置文件，将 type 移动到 name 后面
     * @param {Object} config - Clash 配置文件对象
     * @returns {Object} - 处理后的配置文件对象
     */
    function processConfig(config) {
        if (config.proxies && Array.isArray(config.proxies)) {
            config.proxies = reorderProxies(config.proxies);
        }
        return config;
    }

    /**
     * 从 YAML 字符串解析为对象
     * @param {string} yamlStr - YAML 字符串
     * @returns {Object} - 解析后的对象
     */
    function parseYAML(yamlStr) {
        const yaml = require('js-yaml');
        return yaml.load(yamlStr);
    }

    /**
     * 将对象转换为 YAML 字符串
     * @param {Object} obj - 对象
     * @returns {string} - YAML 字符串
     */
    function stringifyYAML(obj) {
        const yaml = require('js-yaml');
        return yaml.dump(obj, { lineWidth: -1 });
    }

    // 示例用法
    const inputYAML = `...`; // 替换为你的 YAML 内容
    const config = parseYAML(inputYAML);
    const updatedConfig = processConfig(config);
    const outputYAML = stringifyYAML(updatedConfig);

    console.log(outputYAML); // 输出处理后的 YAML
})();
