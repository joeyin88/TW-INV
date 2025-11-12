export interface AppConfig {
  port: number;
  environment: 'development' | 'test' | 'production';
}

const parseNumber = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return parsed;
};

export const loadConfig = (): AppConfig => ({
  port: parseNumber(process.env.PORT, 3000),
  environment: (process.env.NODE_ENV as AppConfig['environment']) ?? 'development'
});
