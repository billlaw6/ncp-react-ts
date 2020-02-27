import {
  UserI,
  VasTypeI,
  FlowStatusI,
  CaseRecordSearchFormI,
  CaseRecordI,
} from "../../constants/interface";
import { SetCaseRecordActionFuncI, SetCaseRecordListActionFuncI } from "../../store/actions/report";
import { RouteComponentProps } from "react-router";

export interface MapStateToPropsI {
  user: UserI;
  caseRecord: CaseRecordI;
  caseRecordSearchForm: CaseRecordSearchFormI;
}

export interface MapDispatchToPropsI {
  setCaseRecordAction: SetCaseRecordActionFuncI;
  setCaseRecordListAction: SetCaseRecordListActionFuncI;
}

export type CaseRecordPropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;

export interface CaseRecordStateI {
  vasTypeList: VasTypeI[];
  flowStatusList: FlowStatusI[];
  isEditable: boolean;
}
