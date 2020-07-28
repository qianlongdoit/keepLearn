/**
 * Created by doit on 2020/7/19.
 */

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

console.log(numCPUs);