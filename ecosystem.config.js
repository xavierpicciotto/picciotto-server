module.exports = {
  apps : [{
    name   : "picciotto-xm",
    script : "./server.js",
  }],

  deploy : {
    production: {
      user: 'supervisor',
      host: '151.106.109.41',
      ref: 'start-server',
      repo: 'git@github.com:xavierpicciotto/picciotto-server.git',
      path: '/home/supervisor/test',
      'pre-deploy-local':'',
      'post-deploy':'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup':''
    }
  }
}
