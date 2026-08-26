import { request } from "./request";

export const apiTest = (data) => {
  return request({
    url: "/iclub-api/api/product/list",
    // url:'/mbti-api/xxxx/info',
    method: "GET",
    data,
  });
};
