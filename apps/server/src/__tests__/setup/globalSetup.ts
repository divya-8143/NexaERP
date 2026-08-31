export default async function globalSetup() {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret-key-123456';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-123456';
}