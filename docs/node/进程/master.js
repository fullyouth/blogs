const fork = require('child_process').fork;
const cpus = require('os').cpus();
console.log(cpus)
for(let i = 0; i < cpus.length * 2; i++) {
  fork('./worker.js')
}