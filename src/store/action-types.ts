// 只有全局变量才写在reducer里，需要修改全局变量的用API请求才通过saga发出，其它的直接在页面中
//
export const SET_USER = "set_user";
export const REGISTER_USER = "register_user";
export const LOGIN_USER = "login_user";
export const UPDATE_USER = "update_user";
export const LOGOUT_USER = "logout_user";
export const SET_TOKEN = "set_token";
export const SET_LOGIN_ERROR = "set_login_error";
//
export const GET_CASE_RECORD_LIST = "get_case_record_list";
export const SET_CASE_RECORD_LIST = "set_case_record_list";
export const CHECK_CASE_RECORD_LIST = "check_case_record_list";

export const GET_CASE_RECORD = "get_case_record";
export const SET_CASE_RECORD = "set_case_record";
export const SET_CASE_RECORD_SEARCH_FORM = "set_case_record_search_form";
export const SET_CASE_RECORD_STATS = "set_case_record_stats";
