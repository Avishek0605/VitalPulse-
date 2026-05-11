export const DEMO_AUTH_KEY = 'vitalpulse_demo_logged_in';

export const setDemoLoggedIn = (value: boolean) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DEMO_AUTH_KEY, value ? 'true' : 'false');
};

export const isDemoLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(DEMO_AUTH_KEY) === 'true';
};
