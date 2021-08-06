module.exports = {
  apps : [{
    name   : "picciotto-xm",
    script : "server.js",
  }],

  deploy : {
    production: {
      key: "../../.ssh/id_rsa",
      user: "supervisor",
      host: ["151.106.109.41"],
      ref: "start-server",
      repo: "https://github.com/xavierpicciotto/picciotto-server.git",
      path: "/home/supervisor",
      'pre-setup': "apt-get install git; ls -la",
      'post-setup': "ls -la",
      'pre-deploy-local': "echo'command local'",
      'post-deploy':"npm install && pm2 reload ecosystem.config.js --env production",
    }
  }
}
