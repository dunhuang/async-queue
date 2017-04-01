# async-queue
An queue class written via async/await way in ES7+(ES8).  


# Introduction 简介
An queue, run one process after another automatically. 
Each one process includes series of async functions and returns a promise.
一个依次、自动执行的队列。队列中每个流程都是一些异步的async函数，返回promise。

# Usage 使用

### init 初始化
```
let queue = new Queue();
```
### push 启动一个process
use Queue.prototype.push(func) to run a process. It's param should be a function, which returns a promise.
用push方法来启动一个process，参数必须是个function，且返回一个promise。
```
queue.push(f1);
```

### timeout 设置timeout
You can set a timeout limit for the queue's process to avoid the next process never startting.
可以给队列里的每个process设置超时时限，以免因为某个process一直在处理中导致下一个process永远不能开始。
```
let queue = new Queue({timeout: 5000});
```

### example 举例
```
let queue = new Queue();
let func = (time, name)=>new Promise((resolve, reject) => {
  setTimeout(() => resolve('finished: '+name), time);
});
let process=async function(){
  console.log('started to run process', Date.now())
  let result1 = await func(1000, 'after 1000');
  console.log(result1);
  let result2 = await func(2000, 'after 2000');
  console.log(result2);
  console.log('process completed', Date.now());
};
queue.push(process);
queue.push(process);


```
