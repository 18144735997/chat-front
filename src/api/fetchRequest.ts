import { baseUrl, timeout } from "@/config/api";
import Cookies from "js-cookie";
import { handleChangeRequestHeader } from "./tool";

type Interceptor<V> = (value: V) => V | Promise<V>;

interface IFetchInterceptor<T, D> {
  request?: Interceptor<T>;
  response?: Interceptor<D>;
}

class FetchRequest {
  interceptors: IFetchInterceptor<RequestInit, Response>;

  constructor() {
    this.interceptors = {};
  }

  async Get<T>(url: string, param?: any): Promise<[any, T | undefined]> {
    url += param ? `?${new URLSearchParams(param).toString()}` : "";
    let config: RequestInit = {};
    if (this.interceptors.request) {
      config = await this.interceptors.request(config);
    }
    try {
      let res = await fetch(baseUrl + url, {
        ...config,
        method: "get",
      });
      if (this.interceptors.response) {
        res = await this.interceptors.response(res);
      }
      return Promise.resolve([null, res as T]);
    } catch (err) {
      return Promise.resolve([err, undefined]);
    }
  }

  async Post<T>(
    url: string,
    data: any,
    param?: any
  ): Promise<[any, T | undefined]> {
    url += param ? `?${new URLSearchParams(param).toString()}` : "";
    let config: RequestInit = {};
    if (this.interceptors.request) {
      config = await this.interceptors.request(config);
    }
    try {
      let res = await fetch(baseUrl + url, {
        ...config,
        method: "post",
        body: JSON.stringify(data),
      });
      if (this.interceptors.response) {
        res = await this.interceptors.response(res);
      }
      return Promise.resolve([null, res as T]);
    } catch (err) {
      return Promise.resolve([err, undefined]);
    }
  }
}

const fetchRequest = new FetchRequest();

fetchRequest.interceptors.request = (config: RequestInit) => {
  config = handleChangeRequestHeader(config, {
    "Content-Type": "application/json",
    Authorization: Cookies.get("token") || "",
    "x-csrf-token": "3AadlboYcFakh5aNWA3tCvlV",
  });
  return config;
};

fetchRequest.interceptors.response = (res: Response) => {
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res.json();
};

export default fetchRequest;
