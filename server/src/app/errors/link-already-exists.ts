export class LinkAlreadyExistsError extends Error {
  constructor() {
    super('Link already exists')
  }
}