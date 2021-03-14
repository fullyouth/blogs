# React
## ReactDom
### `ReactDOM.render(element, container[, callback])`

在提供的 container 里渲染一个 React 元素，并返回对该组件的引用（或者针对无状态组件返回 null）。

如果 React 元素之前已经在 container 里渲染过，这将会对其执行更新操作，并仅会在必要时改变 DOM 以映射最新的 React 元素。

如果提供了可选的回调函数，该回调将在组件被渲染或更新之后被执行。

- ReactDOM.render() 会控制你传入容器节点里的内容。当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。


### `hydrate()`
server render

### `unmountComponentAtNode`

## `findDOMNode()`

## `createPortal()`