import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Get the base URL from the first item in the queryKey
    const baseUrl = queryKey[0] as string;
    
    // Check if we have additional parameters
    if (queryKey.length > 1) {
      const params = new URLSearchParams();
      
      // Extract parameters from queryKey and add them to URLSearchParams
      // We're assuming queryKey is in format [url, ...params]
      // For /api/forecast, queryKey will be ['/api/forecast', latitude, longitude, name]
      if (baseUrl === '/api/forecast' && queryKey.length >= 4) {
        params.append('latitude', queryKey[1] as string);
        params.append('longitude', queryKey[2] as string);
        // If name is provided, add it
        if (queryKey[3]) {
          params.append('name', queryKey[3] as string);
        }
      } else if (baseUrl === '/api/locations' && queryKey.length >= 2) {
        params.append('query', queryKey[1] as string);
      }
      
      // Make the request with the parameters
      const url = `${baseUrl}?${params.toString()}`;
      console.log('Making request to:', url);
      
      const res = await fetch(url, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    }
    
    // If no additional parameters, just make the request with the base URL
    const res = await fetch(baseUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
