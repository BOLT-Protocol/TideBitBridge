module.exports = {
  apps: [
    {
      name: "API",
      script: "bin/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-3-34-43-9.ap-northeast-2.compute.amazonaws.com",
      ref: "origin/feature/develop", //-- change to productions
      repo: "https://github.com/BOLT-Protocol/TideBitBridge.git",
      path: "/etc/TideBitBridge",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
    },
    staging: {
      user: "ubuntu",
      host: "ec2-3-34-43-9.ap-northeast-2.compute.amazonaws.com",
      ref: "origin/feature/pannel-control", //-- change to development
      repo: "https://github.com/BOLT-Protocol/TideBitBridge.git",
      path: "/etc/TideBitBridge",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env development",
    },
  },
};
