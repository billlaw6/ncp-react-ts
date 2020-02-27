import { UserI } from "../../constants/interface";
import { SetUserActionFuncI, SetTokenActionFuncI } from "../../store/actions/user";

export interface MapStateToPropsI {
  user: UserI;
}
export interface MapDispatchToPropsI {
  setTokenAction: SetTokenActionFuncI;
  setUserAction: SetUserActionFuncI;
}

export type LoginPropsI = MapStateToPropsI & MapDispatchToPropsI;


// 本页面独有的数据类型，防止因表单增加太多全局变量
export interface LoginErrorsI {
  username: string[];
  password: string[];
  non_field_errors: string[];
}

export interface LoginStateI {
  loginErrors: LoginErrorsI,
}
