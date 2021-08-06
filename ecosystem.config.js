module.exports = {
  apps : [{
    name   : "picciotto-xm",
    script : "server.js",
  }],

  deploy : {
    production: {
      key: "Users/xav/.ssh/",
      user: "supervisor",
      host: ["151.106.109.41"],
      //ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/start-server",
      repo: "git@github.com:xavierpicciotto/picciotto-server.git",
      path: "/home/supervisor",
      'pre-setup': "apt-get install git; ls -la",
      'post-setup': "ls -la",
      'pre-deploy-local': "echo'command local'",
      'post-deploy':"npm install && pm2 reload ecosystem.config.js --env production",
    }
  }
}
