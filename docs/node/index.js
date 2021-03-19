console.log(module.paths);
console.log(process.binding);

// var args = [this.exports, require, this, filename, dirname];
var result = compiledWrapper.apply(this, [1,2,3]);
console.log(result)
/**
 *
  [ '/Users/zhanghaoqi/vuepress-FE/docs/node/node_modules',
  '/Users/zhanghaoqi/vuepress-FE/docs/node_modules',
  '/Users/zhanghaoqi/vuepress-FE/node_modules',
  '/Users/zhanghaoqi/node_modules',
  '/Users/node_modules',
  '/node_modules' ]
 */
