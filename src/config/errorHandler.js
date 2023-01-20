import axios from "./axios";
import users from "../constants/api/users";
import setAuthorizationHeader from "./setAuthorizationHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async (error) => {
    if (error) {
        let message;
        if (error.response) {
            const originalRequest = error.config;
            if (error.response.status === 500)
                message = "Something went terribly wrong";
            else if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const session = await AsyncStorage.getItem("@user_session")
                const sessionJSON = JSON.parse(session)
                // const session = JSON.parse(sessionStorage.getItem("userLogin"));
                return users
                    .refresh({
                        refreshToken: sessionJSON.refreshToken,
                        email: sessionJSON.email,
                    })
                    .then(async (res) => {
                        if (res.data) {
                            setAuthorizationHeader(res.data.token);

                            sessionJSON.token = res.data.token;
                            sessionJSON.refreshToken = res.data.refreshToken;
                            // sessionStorage.setItem("userLogin", JSON.stringify(session));
                            await AsyncStorage.setItem("@user_session", JSON.stringify(sessionJSON))

                            originalRequest.headers.authorization = res.data.token;

                            return axios(originalRequest);

                        } else {
                            console.log("go login")
                        }
                    });
            } else message = error.response.data.message;

            if (typeof message === "string") console.error("message", message);

            return Promise.reject(error);
        }
    }
}