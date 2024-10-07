import axiosRequest from "@/api/axiosRequest";
import type {IUser} from "@/types/user";

enum LogInApiUrl {
    Log = `/user/login`,
    Register = `/user/register`,
    Count = `/user/count`,
    FindAll = `/user/find/all`
}

export default {
    // 登录
    Log: (data: any) => {
        return axiosRequest.Post<IUser>(LogInApiUrl.Log, data);
    },
    // 注册
    Register: (data: any) => {
        return axiosRequest.Post<boolean>(LogInApiUrl.Register, data);
    },

    Count: (data: any) => {
        return axiosRequest.Post<boolean>(LogInApiUrl.Count, data);
    },

    FindAll: (data: any) => {
        return axiosRequest.Post<boolean>(LogInApiUrl.FindAll, data);
    }
};
