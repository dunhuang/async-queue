export default class Queue {
  constructor(options) {
    this.timeout = options && options.timeout;
    this.queue = [];
    this.started = false;
  }
  push(...args) {
    args.forEach(func => {
      if (typeof func === 'function') {
        this.queue.push(func);
      }
    });
    if(!this.started) {
      this.start();
    }
  }
  async start() {
    this.started = true;
    while(this.queue.length!==0){
      await this.runFunc();  
      this.queue.shift();
    }
    this.started = false;
  }
  runFunc() {
    if(this.timeout){
      let pTimeout = new Promise((resolve, reject) => {
        setTimeout(() => resolve('queue timeout'), this.timeout);
      });
      return Promise.race([
        this.queue[0](),
        pTimeout
      ]);
    }
    else{
      return this.queue[0]();
    }
  }
}

