import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';
const path = require('path')
export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589696235680_2533';

  // add your config here
  config.middleware = [
  ];

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'aplus@2020',
      db: 0,
    }
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
  };

  // 静态资源重定向，如前端请求 http://127.0.0.1:7001/static/images/logo.png 自动重定向到public/static/images/logo.png
  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/', 
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
  };
  
  config.multipart = {
    mode: 'file',
  };

  config.cors = {
    credentials:true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.sessionRedis = {
    key: 'APLUS_ID',
    maxAge: 72 * 3600 * 1000,
    httpOnly: true,
    encrypt: false,
  };

  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };

  config.logger = {
    consoleLevel: 'DEBUG',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'aplus-db',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'QQ5451829',
    timezone: '+08:00',
  };

  return config;
};
