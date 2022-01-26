export const mockRepositoryConfig = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
