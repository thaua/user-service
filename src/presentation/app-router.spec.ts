import { appRouter } from '@presentation/app-router';

describe('Express App Routes', () => {
  const routes = [
    { path: '/register', method: 'post' },
    { path: '/authenticate', method: 'post' },
    { path: '/session', method: 'get' },
    // { path: '/password', method: 'post' },
    // { path: '/recover', method: 'post' },
    // { path: '/recover', method: 'get' },
    // { path: '/logout', method: 'post' },
  ];

  it.each(routes)('Route `$method $path` exists', (route) => {
    expect(
      appRouter.stack.some((s) => s.route.path === route.path && s.route.methods[route.method]),
    ).toBeTruthy();
  });
});
