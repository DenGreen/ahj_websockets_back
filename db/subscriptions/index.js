const subscriptions = {
    db: [],
    dbMesseges: [{"name":"Денис","messege":"Тест","data":"16.10.2021"}],
    
    contains(subscription) {
      return this.db.some(item => item.name == subscription.name);
    },

    add(subscription) {
      this.db.push(subscription);
      console.log(this.db);
    },

    addMesseges(subscription) {
      console.log(subscription);
      const data = new Date().toLocaleString();
      subscription.data = data;
      this.dbMesseges.push(subscription);
      return subscription;
    },

    receiveMesseges() {
      return this.dbMesseges;
    },

    receiveNicname() {
      return this.db;
    },

    remove(subscription) {
      const index = this.db.findIndex(item => item.name === subscription.name);
  
      this.db.splice(index, 1);
      console.log(this.db);
    }
  };
  
  module.exports = subscriptions;
