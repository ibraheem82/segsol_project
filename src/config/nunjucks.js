import nunjucks from 'nunjucks';

export default function nunjucksEnv(app, viewsPath) {
  const isProd = process.env.NODE_ENV === 'production';

  const env = nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    noCache: !isProd,
    watch: !isProd
  });

  // Make Express aware of .njk engine
  app.set('views', viewsPath);
  app.set('view engine', 'njk');
  app.engine('njk', (filePath, options, cb) => env.render(filePath, options, cb));

  // Filters
  env.addFilter('truncate', (str, len = 140) => {
    if (!str) return '';
    return str.length <= len ? str : `${str.slice(0, len - 1)}…`;
  });
  env.addFilter('date', (v, locale = 'en-US') => new Date(v).toLocaleDateString(locale));

  // Globals
  env.addGlobal('year', new Date().getFullYear());

  return env;
}