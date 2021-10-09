const subscriptions = {
    db: [],
    dbMesseges: [],
    
    contains(subscription) {
      return this.db.some(item => item.name == subscription.name);
    },

    add(subscription) {
      this.db.push(subscription);
    },

    addMesseges(subscription) {
      const data = new Date().toLocaleString();
      subscription.data = data;
      this.dbMesseges.push(subscription);
      return subscription;
    },

    remove(subscription) {
      const index = this.db.findIndex(item => item.name === subscription.name);
  
      this.db.splice(index, 1);
  
      this.handlers.forEach(handler => {
        handler(this.db, {});
      });
    }
  };
  
  module.exports = subscriptions;