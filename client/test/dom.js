/* eslint-disable max-len */
/* eslint-disable prefer-reflect */
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const resourceLoader = new jsdom.ResourceLoader({
    proxy: "http://localhost:6030/",
    strictSSL: false,
    userAgent: "Mozilla/5.0 (win32) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/14.0.0"
});

// Used virtualConsole for debugging purposes. switch omitJSDOMErrors: false/true to check if testing errors come from JSDOM
const virtualConsole = new jsdom.VirtualConsole()
    .on("error", (err) => {
        console.error(err);
    })
    .on("warn", (warn) => {
        console.warn(warn);
    })
    .on("info", (info) => {
        console.info(info);
    })
    .on("dir", (dir) => {
        console.dir(dir);
    })
    .sendTo(console, { omitJSDOMErrors: false });


// jsdom has not implemented navigation, below is my workaround/hack solution:
// pass a pathname into the command line to test different url paths
// eg: npm test admin
// const path = (process.argv[3] !== "--require") ? process.argv[3] : "";
// const url = "http://localhost:3000/" + path;

const { window } = new JSDOM('<!doctype html><html><body></body></html>',
    { virtualConsole,
        pretendToBeVisual: true,
        url: "http://localhost:3000/",
        resources: resourceLoader
    }
);

function copyProps (src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop)
        }), {});
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js'
};

copyProps(window, global);
