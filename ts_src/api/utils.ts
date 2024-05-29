import { API_URL } from "./consts";

type HeadersInit = [string, string][] | Record<string, string> | Headers;

interface fetchProps extends RequestInit {
  method?: "POST" | "GET" | "PUT" | "DELETE";
  headers?: HeadersInit;
  path: string;
  params?: Record<string, string>;
  error?: boolean;
  json?: boolean;
}

export const makeReq = async <T>({
  path,
  json = true,
  ...props
}: fetchProps): Promise<T | undefined> => {
  const url = `${API_URL}${path}`;
  const params = props.params
    ? Object.entries(props.params)
        .map((k) => `${k[0]}=${k[1]}`)
        .join("&")
    : "";
  const res = await fetch(
    `${url.toString()}${params.length > 0 ? "?" : ""}${params ?? ""}`,
    { ...props }
  );

  if (!json) return (await res.text()) as T;

  return (await res.json()) as T;
};
