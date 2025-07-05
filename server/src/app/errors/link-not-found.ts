export class LinkNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LinkNotFoundError';
  }
}