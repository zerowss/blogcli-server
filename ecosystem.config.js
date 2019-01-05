module.exports = {
  apps : [{
    name: 'app',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    autorestart: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    watch:true
  }],
  deploy : {
    production : {
      user : 'root',
      host : '47.104.165.117',
      ref  : 'origin/master',
      repo : 'git@github.com:zerowss/blogcli-server.git',
      path : '/workspace/blgcli-server',
      'post-deploy' : 'rm -rf ./node_modules && npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
