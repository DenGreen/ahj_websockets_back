const subscriptions = {
    db: [],
<<<<<<< HEAD
    dbMesseges: [
      {"name":"Денис","messege":"Тест","data":"16.10.2021"}
    ],
=======
    dbMesseges: [{"name":"Денис","messege":"Тест","data":"16.10.2021"}],
>>>>>>> a6b420848b7ddf657d4817e9dc2be2dab277e046
    
    contains(subscription) {
      return this.db.some(item => item.name == subscription.name);
    },

    add(subscription, ip) {
      subscription.ip = ip;
      this.db.push(subscription);
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

    remove(ip) {
      const index = this.db.findIndex(item => item.ip === ip);
      this.db.splice(index, 1);
      return this.db
    }
  };
  
  module.exports = subscriptions;
