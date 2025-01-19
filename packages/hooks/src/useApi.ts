import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@dscl-ttg/frontend-utils";
import {
  apiEndPoints,
  routeMethod,
  routeMethods,
  routeMethodsArray,
  RoutesType,
} from "@dscl-ttg/constants";

// @ts-ignore
const API_URL = import.meta.env.VITE_APP_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const response = await axios.post(
          API_URL + "refreshtoken",
          {},
          { withCredentials: true },
        );
        return api(originalRequest); // Retry the original request
      } catch (err) {
        console.error("Token refresh failed:", err);
        if (typeof window !== "undefined") {
          window.location.href = "/login"; // Redirect to login
        } else {
          // Handle redirection in a server-side environment if necessary
          console.error(
            "Cannot redirect to login in a server-side environment.",
          );
        }
      }
    }

    return Promise.reject(error);
  },
);

// Error handler function
export const onErrorHandler = (error: any) => {
  if (error?.response?.data?.message === "EMPTY!") return;
  console.log(error);
  toast(error?.response?.data?.message || "Something went wrong!", "error");
};

// Success handler function
export const onSuccessHandler = (data: any) => {
  data.message && toast(data.message, "success");
};

// Create Data (POST)
export const useCreateData = <TVariables, TResponse>(
  endpoint: string,
  options?: UseMutationOptions<TResponse, any, TVariables>,
  onSuccess?: Function,
  onError?: Function,
  defaultHandlers: boolean = true,
) => {
  return useMutation<TResponse, any, TVariables>({
    mutationFn: async (payload: TVariables) => {
      const { data } = await api.post(endpoint, { formData: payload });
      return data;
    },
    onSuccess: (response) => {
      if (defaultHandlers) onSuccessHandler(response);
      onSuccess?.(response);
    },
    onError: (error) => {
      if (defaultHandlers) onErrorHandler(error);
      onError?.(error);
    },
    ...options,
  });
};

// Update Data (PUT)
export const useUpdateData = <TVariables, TResponse>(
  endpoint: string,
  options?: UseMutationOptions<TResponse, any, TVariables>,
  onSuccess?: Function,
  onError?: Function,
  defaultHandlers: boolean = true,
) => {
  return useMutation<TResponse, any, TVariables>({
    mutationFn: async (payload: TVariables) => {
      const { data } = await api.put(endpoint, { formData: payload });
      return data;
    },
    onSuccess: (response) => {
      if (defaultHandlers) onSuccessHandler(response);
      onSuccess?.(response);
    },
    onError: (error) => {
      console.log(error);
      if (defaultHandlers) onErrorHandler(error);
      onError?.(error);
    },
    ...options,
  });
};

// Read Data (GET)
export const useGetData = <TResponse>(
  endpoint: string,
  params?: any,
  options: UseQueryOptions<TResponse, any> = {
    queryKey: [endpoint, JSON.stringify(params)],
  },
  onSuccess?: Function,
  onError?: Function,
  defaultHandlers: boolean = true,
): UseQueryResult<TResponse, any> => {
  const queryFn = async () => {
    try {
      const { data } = await api.get(endpoint, { params });
      if (defaultHandlers) onSuccessHandler(data);
      onSuccess?.(data, Number(params?.page) || 0);
      return data;
    } catch (error) {
      if (defaultHandlers) onErrorHandler(error);
      onError?.(error);
      throw error;
    }
  };
  return useQuery<TResponse, any>({
    queryFn,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
    queryKey: options.queryKey
      ? options.queryKey
      : [endpoint, JSON.stringify(params)],
  });
};

// Delete Data (DELETE)
export const useDeleteData = <TVariables, TResponse>(
  endpoint: string,
  options?: UseMutationOptions<TResponse, any, TVariables>,
  onSuccess?: Function,
  onError?: Function,
  defaultHandlers: boolean = true,
) => {
  return useMutation<TResponse, any, TVariables>({
    mutationFn: async (id: TVariables) => {
      const { data } = await api.delete(`${endpoint}/${id}`);
      return data;
    },
    onSuccess: (response) => {
      if (defaultHandlers) onSuccessHandler(response);
      onSuccess?.(response);
    },
    onError: (error) => {
      if (defaultHandlers) onErrorHandler(error);
      onError?.(error);
    },
    ...options,
  });
};

const getRouteHandler = (method: routeMethod, endpoint: string) => {
  switch (method) {
    case routeMethods.Create:
      return (
        options?: any,
        onSuccess?: Function,
        onError?: Function,
        defautHanders?: boolean,
      ) => {
        return useCreateData(
          endpoint,
          options,
          onSuccess,
          onError,
          defautHanders,
        );
      };

    case routeMethods.Update:
      return (
        options?: any,
        onSuccess?: Function,
        onError?: Function,
        defautHanders?: boolean,
      ) => {
        return useUpdateData(
          endpoint,
          options,
          onSuccess,
          onError,
          defautHanders,
        );
      };

    case routeMethods.Delete:
      return (
        options?: any,
        onSuccess?: Function,
        onError?: Function,
        defautHanders?: boolean,
      ) => {
        return useDeleteData(
          endpoint,
          options,
          onSuccess,
          onError,
          defautHanders,
        );
      };

    case routeMethods.Get:
      return (
        id: string,
        params?: any,
        options?: any,
        onSuccess?: Function,
        onError?: Function,
        defaultHanders?: boolean,
      ) => {
        return useGetData(
          `${endpoint}/${id}`,
          params,
          options,
          onSuccess,
          onError,
          defaultHanders,
        );
      };

    case routeMethods.GetList:
      return (
        params?: any,
        options?: any,
        onSuccess?: Function,
        onError?: Function,
        defaultHanders?: boolean,
      ) => {
        return useGetData(
          endpoint,
          params,
          options,
          onSuccess,
          onError,
          defaultHanders,
        );
      };
  }
};

const addHook = (
  hooks: Record<string, any>,
  routeName: string,
  route: string,
  method: string,
) => {
  const hookName = `use${method}`;
  if (hooks[routeName]) {
    hooks[routeName][hookName] = getRouteHandler(method as routeMethod, route);
  } else {
    hooks[routeName] = {
      [hookName]: getRouteHandler(method as routeMethod, route),
    };
  }
};

// Dynamically generate hooks for all endpoints
const generateApiHooks = (routesConfig: RoutesType) => {
  const hooks: Record<string, any> = {};

  for (const module of Object.keys(apiEndPoints)) {
    for (const [routeName, { route }] of Object.entries(apiEndPoints[module])) {
      if (typeof route === "string") {
        for (const method of routeMethodsArray) {
          addHook(hooks, routeName, route, method);
        }
      } else {
        for (const [method, curentRoute] of Object.entries(route)) {
          addHook(hooks, routeName, curentRoute, method);
        }
      }
    }
  }

  return hooks;
};

export const apiHooks = generateApiHooks(apiEndPoints);
