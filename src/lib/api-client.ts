import axios from "axios";
import { useAuthStore } from "./store/use-auth-store";

type AxiosInstanceOptions = { authenticated: boolean };

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiInstances: Record<string, ReturnType<typeof createApiInstance>> = {};

function createApiInstance(options?: AxiosInstanceOptions) {
  const token = useAuthStore.getState()?.token;
  const controller = new AbortController();

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    signal: controller.signal,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (options?.authenticated) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  });

  return { axiosInstance, controller };
}

export function getAxiosInstance(options?: AxiosInstanceOptions) {
  const pathname = window.location.pathname;

  if (
    apiInstances[pathname] &&
    !apiInstances[pathname]?.controller.signal.aborted
  ) {
    return apiInstances[pathname].axiosInstance;
  }

  const apiInstance = createApiInstance(options);
  apiInstances[pathname] = apiInstance;
  return apiInstance.axiosInstance;
}

export function abortAxiosInstance(pathname: string) {
  apiInstances[pathname]?.controller.abort();
  delete apiInstances[pathname];
}
