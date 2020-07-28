```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.value = undefined;
    self.reason = undefined;
   
    
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];
   
    function resolve(value) {
        if (value instanceof Promise) {
   
       return value.then()
   
        } 
   
    }
}
```