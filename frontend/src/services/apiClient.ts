import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type ApiErrorResponse = {
  detail?: string;
  message?: string;
  [key: string]: unknown;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL
});

apiClient.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete (config.headers as Record<string, unknown>)['Content-Type'];
    }

    return config;
  }

  if (!config.headers) {
    config.headers = {};
  }

  if (!('Content-Type' in config.headers)) {
    (config.headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error) && error.config) {
      const method = error.config.method?.toUpperCase() || 'REQUEST';
      const url = error.config.url || 'unknown URL';

      console.error(`[API] ${method} ${url} failed`, error);
    }

    return Promise.reject(error);
  }
);

export const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const responseData = (error.response?.data || {}) as ApiErrorResponse;
    const detail = responseData.detail || responseData.message;

    if (detail) {
      return `${fallbackMessage}: ${detail}`;
    }

    if (error.message) {
      return `${fallbackMessage}: ${error.message}`;
    }
  }

  return fallbackMessage;
};

export const isApiError = (error: unknown): error is AxiosError => axios.isAxiosError(error);

export default apiClient;
