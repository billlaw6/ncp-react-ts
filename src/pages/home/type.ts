import { CaseRecordI, UserI, CaseRecordSearchFormI, CaseRecordStatsT } from "../../constants/interface";
import {
  setCaseRecordSearchAction,
  checkCaseRecordListAction,
  getCaseRecordListAction,
  setCaseRecordStatsAction,
} from "../../store/actions/report";
import { RouteComponentProps } from "react-router";

export interface MapStateToPropsI {
  user: UserI;
  token: string;
  caseRecordList: CaseRecordI[];
  caseRecordSearchForm: CaseRecordSearchFormI;
  caseRecordStats: CaseRecordStatsT[];
}
export interface MapDispatchToPropsI {
  getCaseRecordListAction: typeof getCaseRecordListAction;
  setCaseRecordSearchAction: typeof setCaseRecordSearchAction;
  checkCaseRecordListAction: typeof checkCaseRecordListAction;
  setCaseRecordStatsAction: typeof setCaseRecordStatsAction;
}

export type HomePropsI = MapStateToPropsI & MapDispatchToPropsI & RouteComponentProps;

export interface HomeStateI {
  selectedRowKeys: []; //当前已选择的id 集
  loading: false;
  redirectReport: boolean; // 是否重定向到report页
  isDeptReporter: boolean;
  statsCaseRecord: {
    branch_stats: any[];
    dept_stats: any[];
  };
}

export interface TableDataI {
  id: string;
  name: string;
  created_at: Date;
  filters: any;
}
