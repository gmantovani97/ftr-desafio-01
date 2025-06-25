export function getUserSessionId() {
  const userSessionId = localStorage.getItem('userSessionId');

  if (!userSessionId) {
    const newUserSessionId = crypto.randomUUID();
    localStorage.setItem('userSessionId', newUserSessionId);
    return newUserSessionId;
  }

  return userSessionId;
}

export function createUserSessionId() {
  const newUserSessionId = crypto.randomUUID();
  localStorage.setItem('userSessionId', newUserSessionId);
  return newUserSessionId;
}
