const subscriptions = {
    db: [
      { name: "Денис" },
      { name: "DanGreen" },
      { name: "Hammer" },
    ],
    dbMesseges: [
      { name: "Денис", data: "09.10.2021", messege: "Привет ребята!" },
      { name: "Reiter", data: "09.10.2021", messege: "Супер" },
      { name: "DanGreen", data: "09.10.2021", messege: "Как дела!" },
      { name: "Hammer", data: "09.10.2021", messege: "хорошо!" },
      { name: "Reiter", data: "09.10.2021", messege: "Супер" },
      { name: "Денис", data: "09.10.2021", messege: "У вас как?" },
      { name: "Reiter", data: "09.10.2021", messege: "Супер" },
      { name: "Reiter", data: "09.10.2021", messege: "Супер" },
      { name: "Reiter", data: "09.10.2021", messege: "Супер" },
      { name: "Reiter", data: "09.10.2021", messege: "Супер" },
    ],
    
    contains(subscription) {
      return this.db.some(item => item.name == subscription.name);
    },

    add(subscription) {
      console.log(this.db)
      this.db.push(subscription);
      return this.dbMesseges;
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