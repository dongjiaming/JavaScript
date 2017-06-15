# Inferno
inferno - Inferno is an isomorphic library for building user interfaces with high performance (crucial when targeting mobile devices). Unlike typical virtual DOM libraries like React, Mithril, Cycle and Om, Inferno does not rely on diffing DOM virtual elements, but instead it differentiates static content from dynamic content and only diffs the values that change within a given fragment of virtual DOM elements (we call them virtual fragments).

In addition to this, we've painstakingly optimized the code to ensure there is as little overhead as possible. We believe that Inferno is currently the fastest virtual DOM implementation on out there - as shown by some of our benchmarks. Inferno is all about performance, whilst keeping a robust API that replicates the best features from libraries such as React.

In principle, Inferno is compatible with the standard React API, allowing for painless transition from React to Inferno in most use cases. Furthermore Inferno has a Babel plugin allowing JSX syntax to transpile to optimised Inferno templates.

Inferno是一个同构的库，用于构建具有高性能的用户界面（针对移动设备时至关重要）。与典型的虚拟DOM的图书馆一样的反应，秘银，周期和OM，Inferno不依赖于定义DOM的虚拟元素，而是将静态内容动态内容和差别，只在一个特定的虚拟的DOM元素片段变化值（我们称之为虚拟片段）。
除此之外，我们还精心优化了代码，以确保尽可能少的开销。我们相信，Inferno是目前最快的虚拟DOM实现在那里-如我们的一些基准所示。Inferno是所有的性能，同时保持一个强大的API，复制库的最佳功能，如反应。
原则上，Inferno与标准反应API兼容，允许在大多数情况下无痛苦地过渡到Inferno的反应。此外，Inferno有通天的插件让JSX语法transpile模板优化。


## Key Features

one of the fastest front-end frameworks for rendering UI in the DOM
components have a similar API to React ES2015 components with inferno-component
stateless components are fully supported and have more usability thanks to Inferno's hooks system
isomorphic/universal for easy server-side rendering with inferno-server

在DOM中渲染UI最快的前端框架之一  
组件有一个类似的API es2015组件与Inferno成分反应  
由于Inferno的钩子系统，无状态组件被完全支持并且有更多的可用性。  
同构/通用的服务器端渲染容易与Inferno服务器

## Benchmarks

Virtual DOM Benchmark  
dbmonster  
Angular Test Table

## Install
Very much like React, Inferno requires the inferno and the inferno-dom packages for consumption in the browser's DOM. Inferno also has the inferno-server package for server-side rendering of fragments to HTML strings (differing from React's route of using react-dom/server for server-side rendering). Furthermore, rather than include the ES2015 component with class syntax in core (like React), it's in a separate package inferno-component to allow for better modularity.

NPM:  
Core package:  
npm install --save inferno  
ES2015 stateful components (with lifecycle events) package:  
npm install --save inferno-component  
Browser DOM rendering package:  
npm install --save inferno-dom  
Server-side rendering package:  
npm install --save inferno-server  
Pre-bundled files for browser consumption:  
http://infernojs.org/releases/0.5.21/inferno.min.js  
http://infernojs.org/releases/0.5.21/inferno-component.min.js
http://infernojs.org/releases/0.5.21/inferno-dom.min.js
http://infernojs.org/releases/0.5.21/inferno-server.min.js

非常类似的反应，inferno需要inferno和infernoDOM包在浏览器的DOM中消费。inferno还有服务器服务器包，用于服务器端对HTML字符串的片段渲染（与使用服务器端呈现的反应DOM /服务器的反应不同）。此外，而不是包括在核心类的语法成分（如es2015反应），它是在一个单独的包inferno组件允许更好的模块化。

## Overview
Let's start with some code. As you can see, Inferno intentionally keeps the same good (in our opinion) design ideas regarding components, one-way data passing and separation of concerns. In these examples, JSX is used via the Inferno JSX Babel Plugin to provide a very easy way to express virtual fragments.

`import Inferno from 'inferno';import InfernoDOM from 'inferno-dom';
const message = "Hello world";
InfernoDOM.render(
  <MyComponent message={ message } />,
  document.getElementById("app"))  `

Furthermore, Inferno also uses ES6 components like React:  
`import { Component } from inferno-component;
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: { this.state.counter }</span>
      </div>
    )
  }
}
InfernoDOM.render(<MyComponent />, document.body);`  
The real difference between React and Inferno is the performance offered at run-time. Inferno can handle large, complex DOM models without breaking a sweat. This is essential for low-power devices such as tablets and phones, where users of those devices are quickly demanding desktop like performance on their slower hardware.

让我们从一些代码开始。正如你所看到的，inferno意识在我们关于组件、单向数据传递和关注点分离的设计思想上保持着同样的优势。在这些例子中，JSX通过inferno JSX巴贝尔插件来表达虚拟片段提供了一个非常简单的方法。

## Inferno Top-Level API
###  Inferno.createTemplate
`const template = Inferno.createTemplate(() => ({
  tag: 'div',
  attrs: { className: 'test'},
  children: [
    'This', ' is ', 'a test!'
  ]
}));
InfernoDOM.render(template(), document.body);`
### Inferno.TemplateFactory
`import { Component } from 'inferno-component';
const { createElement } = Inferno.TemplateFactory;
class BasicComponent extends Component {
    render() {
        const template = Inferno.createTemplate((name, title) =>
            createElement('div', {
                    className: 'basic'
                },
                createElement('span', {
                    className: name
                }, 'The title is ', title)
            )
        );
        return template(this.props.name, this.props.title);
    }
}
const template = Inferno.createTemplate((Component, title) =>
    createElement('div', null,
        createElement(Component, {
            title: title,
            name: 'basic-render'
        })
    )
);
InfernoDOM.render(template(BasicComponent, 'abc'), container);`

## Hooks
Please note: hooks are provided by inferno-dom;
Inferno supports many of the basic events upon DOM nodes, such as onClick, onMouseOver and onTouchStart. Furthermore, Inferno allows you to attach common hooks directly onto components and DOM nodes. Below is the table of all possible hooks available in inferno-dom.

inferno支持许多基本事件对DOM节点，如onclick，onmouseover和ontouchstart。此外，inferno允许你将普通钩子直接连接到组件和DOM节点上。下面是所有可能的钩子的表格。

## Performance
Inferno tries to address two problems with creating UI components:  
Writing large applications in large teams is slow in terms of   development and expensive in costs – it shouldn't be.  
Writing complex applications generally gives poor performance on   mobile/tablet/older machines – it shouldn't.  
Writing intensive modern UIs that require many updates/animations   falls apart and becomings overly complicated - it shouldn't be.  
Writing code should be fun. Browsers are getting more advanced and the technologies being supported are growing by the week. It's about time a framework offered more fun without compromising performance.

inferno试图解决两个问题创建UI组件：  
在大型团队中编写大型应用程序在开发速度和成本上都很慢——不应该如此。  
编写复杂的应用程序通常会给移动/平板电脑/旧机器带来糟糕的性能。  
写作强化现代UI需要很多更新/动画分崩离析，变得过于复杂的-它不应该是。  编写代码应该是有趣的。浏览器越来越先进，所支持的技术也日益增长。该是一个框架提供更多乐趣而不影响性能的时候了。