module.exports = {
  apps : [{
    name   : "picciotto-xm",
    script : "./server.js",
    watch: '.'
  }],

  deploy : {
    production: {
      user: 'supervisor',
      host: '151.106.109.41',
      ref: 'origin/start-server',
      repo: 'git@github.com:xavierpicciotto/picciotto-server.git',
      path: '/home/supervisor/',
      'pre-deploy-local':'',
      'post-deploy':'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup':''
    }
  }
}
