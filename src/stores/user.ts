import {defineStore} from "pinia";
import Cookies from "js-cookie";
import type {IUser} from "@/types/user";

const userInfo = Cookies.get("userInfo");
let user: IUser = userInfo && JSON.parse(userInfo);

export const useUserStore = defineStore("user", {
    state: (): IUser => {
        return {
            id: user?.id ?? "",
            account: user?.account ?? "",
            password: "",
            nick: user?.name ?? "",
            type: user?.type ?? "0",
        };
    },
    actions: {
        saveUserInfo(user: IUser) {
            this.id = user.id;
            this.account = user.account;
            this.type = user.type
            this.nick = user.nick;
        },
        logout() {
            Cookies.remove("userInfo");
            this.id = "";
            this.nick = "";
            this.account = "";
            this.password = "";
            this.type = "0"
        },
    },
    persist: true,
});
