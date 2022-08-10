const subscriptions = {
    db: [],
    dbMesseges: [
      {"name":"Денис","messege":"Тест","data":"16.10.2021"}
    ],
    
    contains(subscription) {
      return this.db.some(item => item.name == subscription.name);
    },

    add(subscription, ip) {
      subscription.ip = ip;
      this.db.push(subscription);
    },

    
    addMesseges(subscription) {
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

    remove(ip) {
      const index = this.db.findIndex(item => item.ip === ip);
      if(index > -1) this.db.splice(index, 1);
      return this.db
    },

    deleteMessege() {
      if(this.db.length === 0) this.dbMesseges = [];
    }
  };
  
  module.exports = subscriptions;
