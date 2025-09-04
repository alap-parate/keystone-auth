export const requireSecret = (val: string | undefined, context: string): string => {
    if (!val && process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required secret: ${context} in production environment`);
    }
    return val ?? '';
  };
  