import {
  UserI,
  DutyI,
  RoleI,
} from "../../constants/interface";
import { UpdateUserActionFuncI } from "../../store/actions/user";
import { RouteComponentProps } from "react-router";

export interface MapStateToPropsI {
  user: UserI;
}

export interface MapDispatchToPropsI {
  updateUserAction: UpdateUserActionFuncI;
}

export type ProfilePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;

export interface ProfileStateI {
  roleList: RoleI[];
  dutyList: DutyI[];
  isEditable: boolean;
  isFever: boolean;
  foreignFlag: boolean;
  selectedRole: string;
}
