export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split('.')[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const { exp, iat } = JSON.parse(tokenInfoDecoded);
    const tokenLeftTime = exp - Math.round(+new Date() / 1000);
    const minLifeTimeForUpdate = (exp - iat) * 0.5;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (error: unknown) {
    return true;
  }
};
