import moment from "moment";
import {
  CaseRecordI,
  CaseRecordSearchFormI,
  CaseRecordStatsT,
} from "../../constants/interface";
import * as types from "../action-types";
import {
  setCaseRecordAction,
  setCaseRecordListAction,
  setCaseRecordSearchAction,
  setCaseRecordStatsAction,
} from "../actions/report";

const defaultCaseRecord: CaseRecordI = {
  id: "",
  name: "",
  patient_no: "",
  check_in_date: new Date(),
  check_out_date: new Date(),
  operate_date: new Date(),
  radio_date: new Date(),
  CABG_syntax_score: undefined,
  ////
  LM_lesion_length: undefined,
  LM_min_area: undefined,
  LM_diameter_ratio: undefined,
  LM_area_ratio: undefined,
  LM_qfr: undefined,
  ////
  LAD_lesion_length: undefined,
  LAD_min_area: undefined,
  LAD_diameter_ratio: undefined,
  LAD_area_ratio: undefined,
  LAD_qfr: undefined,
  ////
  DIA1_lesion_length: undefined,
  DIA1_min_area: undefined,
  DIA1_diameter_ratio: undefined,
  DIA1_area_ratio: undefined,
  DIA1_qfr: undefined,
  ////
  DIA2_lesion_length: undefined,
  DIA2_min_area: undefined,
  DIA2_diameter_ratio: undefined,
  DIA2_area_ratio: undefined,
  DIA2_qfr: undefined,
  ////
  DIA3_lesion_length: undefined,
  DIA3_min_area: undefined,
  DIA3_diameter_ratio: undefined,
  DIA3_area_ratio: undefined,
  DIA3_qfr: undefined,
  ////
  LCX_lesion_length: undefined,
  LCX_min_area: undefined,
  LCX_diameter_ratio: undefined,
  LCX_area_ratio: undefined,
  LCX_qfr: undefined,
  ////
  OM1_lesion_length: undefined,
  OM1_min_area: undefined,
  OM1_diameter_ratio: undefined,
  OM1_area_ratio: undefined,
  OM1_qfr: undefined,
  ////
  OM2_lesion_length: undefined,
  OM2_min_area: undefined,
  OM2_diameter_ratio: undefined,
  OM2_area_ratio: undefined,
  OM2_qfr: undefined,
  ////
  RAMUS_lesion_length: undefined,
  RAMUS_min_area: undefined,
  RAMUS_diameter_ratio: undefined,
  RAMUS_area_ratio: undefined,
  RAMUS_qfr: undefined,
  ////
  RCA_lesion_length: undefined,
  RCA_min_area: undefined,
  RCA_diameter_ratio: undefined,
  RCA_area_ratio: undefined,
  RCA_qfr: undefined,
  ////
  PLA_lesion_length: undefined,
  PLA_min_area: undefined,
  PLA_diameter_ratio: undefined,
  PLA_area_ratio: undefined,
  PLA_qfr: undefined,
  ////
  PDA_lesion_length: undefined,
  PDA_min_area: undefined,
  PDA_diameter_ratio: undefined,
  PDA_area_ratio: undefined,
  PDA_qfr: undefined,
  ////
  B_LAD_vas_type: "1",
  B_LAD_target_vas_narrow_ratio_before: undefined,
  B_LAD_target_vas_qfr_before: undefined,
  B_LAD_bridge_flux: undefined,
  B_LAD_flow_status: "A",
  B_LAD_bridge_qfr: undefined,
  B_LAD_target_vas_narrow_ratio_after: undefined,
  B_LAD_target_vas_qfr_after: undefined,
  ////
  B_DIA1_vas_type: "1",
  B_DIA1_target_vas_narrow_ratio_before: undefined,
  B_DIA1_target_vas_qfr_before: undefined,
  B_DIA1_bridge_flux: undefined,
  B_DIA1_flow_status: "A",
  B_DIA1_bridge_qfr: undefined,
  B_DIA1_target_vas_narrow_ratio_after: undefined,
  B_DIA1_target_vas_qfr_after: undefined,
  ////
  B_DIA2_vas_type: "1",
  B_DIA2_target_vas_narrow_ratio_before: undefined,
  B_DIA2_target_vas_qfr_before: undefined,
  B_DIA2_bridge_flux: undefined,
  B_DIA2_flow_status: "A",
  B_DIA2_bridge_qfr: undefined,
  B_DIA2_target_vas_narrow_ratio_after: undefined,
  B_DIA2_target_vas_qfr_after: undefined,
  ////
  B_OM1_vas_type: "1",
  B_OM1_target_vas_narrow_ratio_before: undefined,
  B_OM1_target_vas_qfr_before: undefined,
  B_OM1_bridge_flux: undefined,
  B_OM1_flow_status: "A",
  B_OM1_bridge_qfr: undefined,
  B_OM1_target_vas_narrow_ratio_after: undefined,
  B_OM1_target_vas_qfr_after: undefined,
  ////
  B_OM2_vas_type: "1",
  B_OM2_target_vas_narrow_ratio_before: undefined,
  B_OM2_target_vas_qfr_before: undefined,
  B_OM2_bridge_flux: undefined,
  B_OM2_flow_status: "A",
  B_OM2_bridge_qfr: undefined,
  B_OM2_target_vas_narrow_ratio_after: undefined,
  B_OM2_target_vas_qfr_after: undefined,
  ////
  B_OM3_vas_type: "1",
  B_OM3_target_vas_narrow_ratio_before: undefined,
  B_OM3_target_vas_qfr_before: undefined,
  B_OM3_bridge_flux: undefined,
  B_OM3_flow_status: "A",
  B_OM3_bridge_qfr: undefined,
  B_OM3_target_vas_narrow_ratio_after: undefined,
  B_OM3_target_vas_qfr_after: undefined,
  ////
  B_RAMUS_vas_type: "1",
  B_RAMUS_target_vas_narrow_ratio_before: undefined,
  B_RAMUS_target_vas_qfr_before: undefined,
  B_RAMUS_bridge_flux: undefined,
  B_RAMUS_flow_status: "A",
  B_RAMUS_bridge_qfr: undefined,
  B_RAMUS_target_vas_narrow_ratio_after: undefined,
  B_RAMUS_target_vas_qfr_after: undefined,
  ////
  B_RCA_vas_type: "1",
  B_RCA_target_vas_narrow_ratio_before: undefined,
  B_RCA_target_vas_qfr_before: undefined,
  B_RCA_bridge_flux: undefined,
  B_RCA_flow_status: "A",
  B_RCA_bridge_qfr: undefined,
  B_RCA_target_vas_narrow_ratio_after: undefined,
  B_RCA_target_vas_qfr_after: undefined,
  ////
  B_PLA_vas_type: "1",
  B_PLA_target_vas_narrow_ratio_before: undefined,
  B_PLA_target_vas_qfr_before: undefined,
  B_PLA_bridge_flux: undefined,
  B_PLA_flow_status: "A",
  B_PLA_bridge_qfr: undefined,
  B_PLA_target_vas_narrow_ratio_after: undefined,
  B_PLA_target_vas_qfr_after: undefined,
  ////
  B_PDA_vas_type: "1",
  B_PDA_target_vas_narrow_ratio_before: undefined,
  B_PDA_target_vas_qfr_before: undefined,
  B_PDA_bridge_flux: undefined,
  B_PDA_flow_status: "A",
  B_PDA_bridge_qfr: undefined,
  B_PDA_target_vas_narrow_ratio_after: undefined,
  B_PDA_target_vas_qfr_after: undefined,
  ////
  B_Other_vas_type: "1",
  B_Other_target_vas_narrow_ratio_before: undefined,
  B_Other_target_vas_qfr_before: undefined,
  B_Other_bridge_flux: undefined,
  B_Other_flow_status: "A",
  B_Other_bridge_qfr: undefined,
  B_Other_target_vas_narrow_ratio_after: undefined,
  B_Other_target_vas_qfr_after: undefined,
  ////
  comments: "",
};

const caseRecordReducer = (
  state = defaultCaseRecord,
  action: ReturnType<typeof setCaseRecordAction>,
): CaseRecordI => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD:
      return {
        ...defaultCaseRecord,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

const defaultCaseRecordList: CaseRecordI[] = [];
const caseRecordListReducer = (
  state = defaultCaseRecordList,
  action: ReturnType<typeof setCaseRecordListAction>,
): CaseRecordI[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};

// 默认取当天的数据
const dateFormat = "YYYY-MM-DD HH:mm:ss";
const defaultCaseRecordSearchForm: CaseRecordSearchFormI = {
  start: moment()
    .startOf("day")
    .locale("zh-cn")
    .format(dateFormat),
  end: moment()
    .endOf("day")
    .locale("zh-cn")
    .format(dateFormat),
  keyword: "",
};
const caseRecordSearchFormReducer = (
  state = defaultCaseRecordSearchForm,
  action: ReturnType<typeof setCaseRecordSearchAction>,
): CaseRecordSearchFormI => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD_SEARCH_FORM:
      return {
        ...defaultCaseRecordSearchForm,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

const defaultCaseRecordStats: CaseRecordStatsT[] = [["", "", "", "", 0, 0]];
const caseRecordStatsReducer = (
  state = defaultCaseRecordStats,
  action: ReturnType<typeof setCaseRecordStatsAction>,
): CaseRecordStatsT[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD_STATS:
      return action.payload;
    default: {
      return state;
    }
  }
};

export {
  caseRecordReducer,
  caseRecordListReducer,
  caseRecordSearchFormReducer,
  caseRecordStatsReducer,
};