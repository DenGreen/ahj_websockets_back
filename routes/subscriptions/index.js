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

  subscriptions.add(subscription);

  ctx.response.body = { status: 'ok' };
});

router.post('/massedge/add', async (ctx) => {

  const subscription = { ...ctx.request.body };
  const response = subscriptions.addMesseges(subscription);

  ctx.response.body = response;
});

router.delete('/subscriptions/delete/:name', async (ctx) => {
  const subscription = { ...ctx.params };

  if (!subscriptions.contains(subscription)) {
    ctx.response.status = 400;
    ctx.response.body = { status: 'error' };

    return;
  }

  subscriptions.remove(subscription);

  ctx.response.body = { status: 'ok' };
});

module.exports = router;