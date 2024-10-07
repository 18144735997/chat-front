import axiosRequest from "@/api/axiosRequest";

enum MessageApiUrl {
    Get = `/chat/get`
}

export default {
    GetMessage: (data: any) => {
        return axiosRequest.Post<Boolean>(MessageApiUrl.Get, data);
    },
}