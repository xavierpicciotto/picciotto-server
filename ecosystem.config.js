module.exports = {
  apps : [{
    name   : "picciotto-xm",
    script : "./server.js",
    ignore_watch: ['./node_modules']
  }],

  deploy : {
    production: {
      user: 'supervisor',
      host: '151.106.109.41',
      ref: 'origin/master',
      repo: 'git@github.com:xavierpicciotto/picciotto-server.git',
      path: '/home/supervisor/',
      'pre-deploy-local':'',
      'post-deploy':'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup':''
    }
  }
}
