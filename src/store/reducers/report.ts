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
  ////
  LM_lesion_length: 0,
  LM_min_area: 0,
  LM_diameter_ratio: 0,
  LM_area_ratio: 0,
  LM_qfr: 0,
  ////
  LAD_lesion_length: 0,
  LAD_min_area: 0,
  LAD_diameter_ratio: 0,
  LAD_area_ratio: 0,
  LAD_qfr: 0,
  ////
  DIA1_lesion_length: 0,
  DIA1_min_area: 0,
  DIA1_diameter_ratio: 0,
  DIA1_area_ratio: 0,
  DIA1_qfr: 0,
  ////
  DIA2_lesion_length: 0,
  DIA2_min_area: 0,
  DIA2_diameter_ratio: 0,
  DIA2_area_ratio: 0,
  DIA2_qfr: 0,
  ////
  DIA3_lesion_length: 0,
  DIA3_min_area: 0,
  DIA3_diameter_ratio: 0,
  DIA3_area_ratio: 0,
  DIA3_qfr: 0,
  ////
  LCX_lesion_length: 0,
  LCX_min_area: 0,
  LCX_diameter_ratio: 0,
  LCX_area_ratio: 0,
  LCX_qfr: 0,
  ////
  OM1_lesion_length: 0,
  OM1_min_area: 0,
  OM1_diameter_ratio: 0,
  OM1_area_ratio: 0,
  OM1_qfr: 0,
  ////
  OM2_lesion_length: 0,
  OM2_min_area: 0,
  OM2_diameter_ratio: 0,
  OM2_area_ratio: 0,
  OM2_qfr: 0,
  ////
  RAMUS_lesion_length: 0,
  RAMUS_min_area: 0,
  RAMUS_diameter_ratio: 0,
  RAMUS_area_ratio: 0,
  RAMUS_qfr: 0,
  ////
  RCA_lesion_length: 0,
  RCA_min_area: 0,
  RCA_diameter_ratio: 0,
  RCA_area_ratio: 0,
  RCA_qfr: 0,
  ////
  PLA_lesion_length: 0,
  PLA_min_area: 0,
  PLA_diameter_ratio: 0,
  PLA_area_ratio: 0,
  PLA_qfr: 0,
  ////
  PDA_lesion_length: 0,
  PDA_min_area: 0,
  PDA_diameter_ratio: 0,
  PDA_area_ratio: 0,
  PDA_qfr: 0,
  ////
  B_LAD_vas_type: "1",
  B_LAD_target_vas_narrow_ratio_before: 0,
  B_LAD_target_vas_qfr_before: 0,
  B_LAD_bridge_flux: 0,
  B_LAD_flow_status: "A",
  B_LAD_bridge_qfr: 0,
  B_LAD_target_vas_narrow_ratio_after: 0,
  B_LAD_target_vas_qfr_after: 0,
  ////
  B_DIA1_vas_type: "1",
  B_DIA1_target_vas_narrow_ratio_before: 0,
  B_DIA1_target_vas_qfr_before: 0,
  B_DIA1_bridge_flux: 0,
  B_DIA1_flow_status: "A",
  B_DIA1_bridge_qfr: 0,
  B_DIA1_target_vas_narrow_ratio_after: 0,
  B_DIA1_target_vas_qfr_after: 0,
  ////
  B_DIA2_vas_type: "1",
  B_DIA2_target_vas_narrow_ratio_before: 0,
  B_DIA2_target_vas_qfr_before: 0,
  B_DIA2_bridge_flux: 0,
  B_DIA2_flow_status: "A",
  B_DIA2_bridge_qfr: 0,
  B_DIA2_target_vas_narrow_ratio_after: 0,
  B_DIA2_target_vas_qfr_after: 0,
  ////
  B_OM1_vas_type: "1",
  B_OM1_target_vas_narrow_ratio_before: 0,
  B_OM1_target_vas_qfr_before: 0,
  B_OM1_bridge_flux: 0,
  B_OM1_flow_status: "A",
  B_OM1_bridge_qfr: 0,
  B_OM1_target_vas_narrow_ratio_after: 0,
  B_OM1_target_vas_qfr_after: 0,
  ////
  B_OM2_vas_type: "1",
  B_OM2_target_vas_narrow_ratio_before: 0,
  B_OM2_target_vas_qfr_before: 0,
  B_OM2_bridge_flux: 0,
  B_OM2_flow_status: "A",
  B_OM2_bridge_qfr: 0,
  B_OM2_target_vas_narrow_ratio_after: 0,
  B_OM2_target_vas_qfr_after: 0,
  ////
  B_OM3_vas_type: "1",
  B_OM3_target_vas_narrow_ratio_before: 0,
  B_OM3_target_vas_qfr_before: 0,
  B_OM3_bridge_flux: 0,
  B_OM3_flow_status: "A",
  B_OM3_bridge_qfr: 0,
  B_OM3_target_vas_narrow_ratio_after: 0,
  B_OM3_target_vas_qfr_after: 0,
  ////
  B_RAMUS_vas_type: "1",
  B_RAMUS_target_vas_narrow_ratio_before: 0,
  B_RAMUS_target_vas_qfr_before: 0,
  B_RAMUS_bridge_flux: 0,
  B_RAMUS_flow_status: "A",
  B_RAMUS_bridge_qfr: 0,
  B_RAMUS_target_vas_narrow_ratio_after: 0,
  B_RAMUS_target_vas_qfr_after: 0,
  ////
  B_RCA_vas_type: "1",
  B_RCA_target_vas_narrow_ratio_before: 0,
  B_RCA_target_vas_qfr_before: 0,
  B_RCA_bridge_flux: 0,
  B_RCA_flow_status: "A",
  B_RCA_bridge_qfr: 0,
  B_RCA_target_vas_narrow_ratio_after: 0,
  B_RCA_target_vas_qfr_after: 0,
  ////
  B_PLA_vas_type: "1",
  B_PLA_target_vas_narrow_ratio_before: 0,
  B_PLA_target_vas_qfr_before: 0,
  B_PLA_bridge_flux: 0,
  B_PLA_flow_status: "A",
  B_PLA_bridge_qfr: 0,
  B_PLA_target_vas_narrow_ratio_after: 0,
  B_PLA_target_vas_qfr_after: 0,
  ////
  B_PDA_vas_type: "1",
  B_PDA_target_vas_narrow_ratio_before: 0,
  B_PDA_target_vas_qfr_before: 0,
  B_PDA_bridge_flux: 0,
  B_PDA_flow_status: "A",
  B_PDA_bridge_qfr: 0,
  B_PDA_target_vas_narrow_ratio_after: 0,
  B_PDA_target_vas_qfr_after: 0,
  ////
  B_Other_vas_type: "1",
  B_Other_target_vas_narrow_ratio_before: 0,
  B_Other_target_vas_qfr_before: 0,
  B_Other_bridge_flux: 0,
  B_Other_flow_status: "A",
  B_Other_bridge_qfr: 0,
  B_Other_target_vas_narrow_ratio_after: 0,
  B_Other_target_vas_qfr_after: 0,
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