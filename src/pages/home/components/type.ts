import { UserI, CaseRecordSearchFormI, CaseRecordStatsT } from "../../../constants/interface";
import {
  SetCaseRecordSearchFormActionFuncI,
  GetCaseRecordListActionFuncI,
} from "../../../store/actions/report";

export interface MapStateToPropsI {
  user: UserI;
  caseRecordSearchForm: CaseRecordSearchFormI;
  caseRecordStats: CaseRecordStatsT[];
}

export interface MapDispatchToPropsI {
  // setCaseRecordSearch: SetCaseRecordSearchFormActionFuncI,
  // getCaseRecordList: GetCaseRecordListActionFuncI;
}

export type SearchFormPropsI = MapStateToPropsI & MapDispatchToPropsI;

/////////////////////
