class EEmitter {
    subscriptions = new Map();

    subscribe(eName, callback){
        if(!this.subscriptions.has(eName))
            this.subscriptions.set(eName, new Set());

        this.subscriptions.get(eName).add(callback);

        return{
            release(){
                let callBacks = this.subscriptions.get(eName);
                callBacks.delete(callback);
                if(callBacks.size === 0) //no subs -> delete event
                    this.subscriptions.delete(eName);
            }
        }
        
    }
    emit = (eName, ...args) => {
        if(!this.subscriptions.get(eName)) return; //empty
        for(let callback of this.subscriptions.get(eName))
            callback(...args);
    }
}
 
export default EEmitter;