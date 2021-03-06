const Router = require('koa-router'); 
const subscriptions = require('../../db/subscriptions');

const router = new Router();


router.post('/subscriptions/add', async (ctx) => {

  const subscription = { ...ctx.request.body };

  if (subscriptions.contains(subscription)) {
    ctx.response.status = 400;
    ctx.response.body = { status: 'Псевдоним уже занят' };

    return;
  }

  ctx.response.body = { status: 'ok' };
});

router.get('/massedge/receive', async (ctx) => {

  const response = subscriptions.receiveMesseges();

  ctx.response.body = response;
});


module.exports = router;