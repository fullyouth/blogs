(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{380:function(_,v,t){"use strict";t.r(v);var a=t(25),r=Object(a.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("p",[_._v("大道至简，这真是做软件该秉持的原则，如果实现功能时感受到复杂和无序，那一定是那里错了")]),_._v(" "),t("h2",{attrs:{id:"浏览器进程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浏览器进程"}},[_._v("#")]),_._v(" 浏览器进程")]),_._v(" "),t("ul",[t("li",[t("strong",[_._v("浏览器进程")]),_._v("。主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。")]),_._v(" "),t("li",[t("strong",[_._v("渲染进程")]),_._v("。核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。")]),_._v(" "),t("li",[t("strong",[_._v("GPU 进程")]),_._v("。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。")]),_._v(" "),t("li",[t("strong",[_._v("网络进程")]),_._v("。主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。")]),_._v(" "),t("li",[t("strong",[_._v("插件进程")]),_._v("。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。")])]),_._v(" "),t("h2",{attrs:{id:"渲染流水线"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#渲染流水线"}},[_._v("#")]),_._v(" 渲染流水线")]),_._v(" "),t("ul",[t("li",[_._v("构建DOM树")]),_._v(" "),t("li",[_._v("样式计算")]),_._v(" "),t("li",[_._v("布局阶段")]),_._v(" "),t("li",[_._v("分层")]),_._v(" "),t("li",[_._v("绘制")]),_._v(" "),t("li",[_._v("分块")]),_._v(" "),t("li",[_._v("光栅化")]),_._v(" "),t("li",[_._v("合成")])]),_._v(" "),t("h3",{attrs:{id:"_1-构建dom树"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-构建dom树"}},[_._v("#")]),_._v(" 1. 构建DOM树")]),_._v(" "),t("p",[_._v("输入：html文件\n输出：dom树")]),_._v(" "),t("h3",{attrs:{id:"_2-样式计算"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-样式计算"}},[_._v("#")]),_._v(" 2. 样式计算")]),_._v(" "),t("p",[_._v("输入：css文件\n输出：节点具体样式")]),_._v(" "),t("p",[_._v("过程")]),_._v(" "),t("ol",[t("li",[_._v("CSS转换成浏览器可理解的结构styleSheets "),t("code",[_._v("document.styleSheets")])]),_._v(" "),t("li",[_._v("转换样式表中的属性值，使其标准化 rem => px ...")]),_._v(" "),t("li",[_._v("计算出dom树中每个节点的具体样式 css继承规则和层叠规则 ComputedStyle")])]),_._v(" "),t("h3",{attrs:{id:"_3-布局阶段"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-布局阶段"}},[_._v("#")]),_._v(" 3. 布局阶段")]),_._v(" "),t("p",[_._v("dom树 + style => 布局树Layout")]),_._v(" "),t("p",[_._v("创建布局树和布局计算")]),_._v(" "),t("h3",{attrs:{id:"_4-分层"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-分层"}},[_._v("#")]),_._v(" 4. 分层")]),_._v(" "),t("p",[_._v("布局树 => 图层树")]),_._v(" "),t("ul",[t("li",[_._v("拥有层叠上下文属性的元素会被提升为单独的一层")]),_._v(" "),t("li",[_._v("需要剪裁（clip）的地方也会被创建为图层")])]),_._v(" "),t("h3",{attrs:{id:"_5-绘制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-绘制"}},[_._v("#")]),_._v(" 5. 绘制")]),_._v(" "),t("p",[_._v("图层树 => 每一层的绘制指令\n在完成图层树的构建之后，渲染引擎会对图层树中的每个图层进行绘制")]),_._v(" "),t("p",[_._v("方法： 渲染引擎把一个图层的绘制拆分成很多小的绘制指令，然后再把这些指令按照顺序组成一个待绘制列表")]),_._v(" "),t("h3",{attrs:{id:"_6-栅格化raster操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-栅格化raster操作"}},[_._v("#")]),_._v(" 6. 栅格化raster操作")]),_._v(" "),t("p",[_._v("绘制操作是由渲染引擎(进程)中的合成线程来完成的\n当图层的绘制列表准备好之后，主线程会把该绘制列表提交（commit）给合成线程")]),_._v(" "),t("p",[_._v("合成线程会将图层划分为图块（tile） 256x256 或者 512x512")]),_._v(" "),t("p",[_._v("合成线程会按照视口附近的图块来优先生成位图，实际生成位图的操作是由栅格化来执行的。所谓栅格化，是指将图块转换为位图")]),_._v(" "),t("p",[_._v("图块是栅格化执行的最小单位。渲染进程维护了一个栅格化的线程池，所有的图块栅格化都是在线程池内执行的")]),_._v(" "),t("p",[_._v("栅格化过程都会使用 GPU 来加速生成，使用 GPU 生成位图的过程叫快速栅格化，或者 GPU 栅格化，生成的位图被保存在 GPU 内存中")]),_._v(" "),t("h3",{attrs:{id:"_7-合成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-合成"}},[_._v("#")]),_._v(" 7. 合成")]),_._v(" "),t("p",[_._v("一旦所有图块都被光栅化，合成线程就会生成一个绘制图块的命令——“DrawQuad”")]),_._v(" "),t("h2",{attrs:{id:"重排-重绘-和-合成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#重排-重绘-和-合成"}},[_._v("#")]),_._v(" “重排”“重绘”和“合成”")])])}),[],!1,null,null,null);v.default=r.exports}}]);