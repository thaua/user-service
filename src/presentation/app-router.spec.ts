import { appRouter } from '@presentation/app-router';

describe('Express App Routes', () => {
  const routes = [{ path: '/users', method: 'post' }];

  it.each(routes)('Route `$method $path` exists', (route) => {
    expect(
      appRouter.stack.some((s) => s.route.path === route.path && s.route.methods[route.method]),
    ).toBeTruthy();
  });
});
