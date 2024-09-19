import { ConfirmationMiddleware } from './confirmation.middleware';

describe('ConfirmationMiddleware', () => {
  it('should be defined', () => {
    expect(new ConfirmationMiddleware()).toBeDefined();
  });
});
