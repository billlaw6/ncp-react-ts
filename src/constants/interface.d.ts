import { InputHTMLAttributes, DOMAttributes } from "react";
import { Moment } from "moment";
import { CaseRecordStateI } from "../pages/case_record/type";

// Store相关接口
// 本地变量遵循js规范使用驼峰式全名，需要与后台数据库字段对应的变量使用下划线风格。
/* ===============  根据Tower文档整理的接口相关的interface =============== */
// 性别枚举
export declare enum GenderE {
  UNKNOW = 0,
  MALE = 1,
  FEMALE = 2,
}

export interface WorkStatusI {
  code: string;
  name: string;
  cadre_flag: number;
  pinyin: string;
  py: string;
}

export interface DutyI {
  code: string;
  name: string;
  cadre_flag: number;
  pinyin: string;
  py: string;
}

export interface VasTypeI {
  code: string;
  name: string;
  cadre_flag: number;
  pinyin: string;
  py: string;
}

export interface FlowStatusI {
  code: string;
  name: string;
  cadre_flag: number;
  pinyin: string;
  py: string;
}

// 用户信息
export declare interface UserI {
  id: number;
  emp_code: string;
  name: string;
  role: RoleE;
  department: string;
  work_department?: string;
  work_department_name?: string;
  work_status?: string;
  work_status_name?: string;
  cell_phone: string;
  gender: GenderE;
  birthday?: string;
  age: number;
  address: string;
  // duty?: DutyI;  当一个User对多个Duty时适合使用NestedSerializer
  duty?: string;
  title?: string;
  unit?: string;
  groups: number[]; // 这里的问号会影响页面是groups为空的提示
  pinyin?: "";
  py?: "";
}

// export type CaseRecordI = any;
export declare interface CaseRecordI {
  id: string;
  reporter?: string;
  name: string;
  patient_no: string;
  check_in_date: Date;
  check_out_date: Date;
  operate_date: Date;
  radio_date: Date;
  CABG_syntax_score: number | undefined;
  ////
  LM_lesion_length: number | undefined;
  LM_min_area: number | undefined;
  LM_diameter_ratio: number | undefined;
  LM_area_ratio: number | undefined;
  LM_qfr: number | undefined;
  ////
  LAD_lesion_length: number | undefined;
  LAD_min_area: number | undefined;
  LAD_diameter_ratio: number | undefined;
  LAD_area_ratio: number | undefined;
  LAD_qfr: number | undefined;
  ////
  DIA1_lesion_length: number | undefined;
  DIA1_min_area: number | undefined;
  DIA1_diameter_ratio: number | undefined;
  DIA1_area_ratio: number | undefined;
  DIA1_qfr: number | undefined;
  ////
  DIA2_lesion_length: number | undefined;
  DIA2_min_area: number | undefined;
  DIA2_diameter_ratio: number | undefined;
  DIA2_area_ratio: number | undefined;
  DIA2_qfr: number | undefined;
  ////
  DIA3_lesion_length: number | undefined;
  DIA3_min_area: number | undefined;
  DIA3_diameter_ratio: number | undefined;
  DIA3_area_ratio: number | undefined;
  DIA3_qfr: number | undefined;
  ////
  LCX_lesion_length: number | undefined;
  LCX_min_area: number | undefined;
  LCX_diameter_ratio: number | undefined;
  LCX_area_ratio: number | undefined;
  LCX_qfr: number | undefined;
  ////
  OM1_lesion_length: number | undefined;
  OM1_min_area: number | undefined;
  OM1_diameter_ratio: number | undefined;
  OM1_area_ratio: number | undefined;
  OM1_qfr: number | undefined;
  ////
  OM2_lesion_length: number | undefined;
  OM2_min_area: number | undefined;
  OM2_diameter_ratio: number | undefined;
  OM2_area_ratio: number | undefined;
  OM2_qfr: number | undefined;
  ////
  RAMUS_lesion_length: number | undefined;
  RAMUS_min_area: number | undefined;
  RAMUS_diameter_ratio: number | undefined;
  RAMUS_area_ratio: number | undefined;
  RAMUS_qfr: number | undefined;
  ////
  RCA_lesion_length: number | undefined;
  RCA_min_area: number | undefined;
  RCA_diameter_ratio: number | undefined;
  RCA_area_ratio: number | undefined;
  RCA_qfr: number | undefined;
  ////
  PLA_lesion_length: number | undefined;
  PLA_min_area: number | undefined;
  PLA_diameter_ratio: number | undefined;
  PLA_area_ratio: number | undefined;
  PLA_qfr: number | undefined;
  ////
  PDA_lesion_length: number | undefined;
  PDA_min_area: number | undefined;
  PDA_diameter_ratio: number | undefined;
  PDA_area_ratio: number | undefined;
  PDA_qfr: number | undefined;
  ////
  B_LAD_vas_type: string;
  B_LAD_target_vas_narrow_ratio_before: number | undefined;
  B_LAD_target_vas_qfr_before: number | undefined;
  B_LAD_bridge_flux: number | undefined;
  B_LAD_flow_status: string;
  B_LAD_bridge_qfr: number | undefined;
  B_LAD_target_vas_narrow_ratio_after: number | undefined;
  B_LAD_target_vas_qfr_after: number | undefined;
  ////
  B_DIA1_vas_type: string;
  B_DIA1_target_vas_narrow_ratio_before: number | undefined;
  B_DIA1_target_vas_qfr_before: number | undefined;
  B_DIA1_bridge_flux: number | undefined;
  B_DIA1_flow_status: string;
  B_DIA1_bridge_qfr: number | undefined;
  B_DIA1_target_vas_narrow_ratio_after: number | undefined;
  B_DIA1_target_vas_qfr_after: number | undefined;
  ////
  B_DIA2_vas_type: string;
  B_DIA2_target_vas_narrow_ratio_before: number | undefined;
  B_DIA2_target_vas_qfr_before: number | undefined;
  B_DIA2_bridge_flux: number | undefined;
  B_DIA2_flow_status: string;
  B_DIA2_bridge_qfr: number | undefined;
  B_DIA2_target_vas_narrow_ratio_after: number | undefined;
  B_DIA2_target_vas_qfr_after: number | undefined;
  ////
  B_OM1_vas_type: string;
  B_OM1_target_vas_narrow_ratio_before: number | undefined;
  B_OM1_target_vas_qfr_before: number | undefined;
  B_OM1_bridge_flux: number | undefined;
  B_OM1_flow_status: string;
  B_OM1_bridge_qfr: number | undefined;
  B_OM1_target_vas_narrow_ratio_after: number | undefined;
  B_OM1_target_vas_qfr_after: number | undefined;
  ////
  B_OM2_vas_type: string;
  B_OM2_target_vas_narrow_ratio_before: number | undefined;
  B_OM2_target_vas_qfr_before: number | undefined;
  B_OM2_bridge_flux: number | undefined;
  B_OM2_flow_status: string;
  B_OM2_bridge_qfr: number | undefined;
  B_OM2_target_vas_narrow_ratio_after: number | undefined;
  B_OM2_target_vas_qfr_after: number | undefined;
  ////
  B_OM3_vas_type: string;
  B_OM3_target_vas_narrow_ratio_before: number | undefined;
  B_OM3_target_vas_qfr_before: number | undefined;
  B_OM3_bridge_flux: number | undefined;
  B_OM3_flow_status: string;
  B_OM3_bridge_qfr: number | undefined;
  B_OM3_target_vas_narrow_ratio_after: number | undefined;
  B_OM3_target_vas_qfr_after: number | undefined;
  ////
  B_RAMUS_vas_type: string;
  B_RAMUS_target_vas_narrow_ratio_before: number | undefined;
  B_RAMUS_target_vas_qfr_before: number | undefined;
  B_RAMUS_bridge_flux: number | undefined;
  B_RAMUS_flow_status: string;
  B_RAMUS_bridge_qfr: number | undefined;
  B_RAMUS_target_vas_narrow_ratio_after: number | undefined;
  B_RAMUS_target_vas_qfr_after: number | undefined;
  ////
  B_RCA_vas_type: string;
  B_RCA_target_vas_narrow_ratio_before: number | undefined;
  B_RCA_target_vas_qfr_before: number | undefined;
  B_RCA_bridge_flux: number | undefined;
  B_RCA_flow_status: string;
  B_RCA_bridge_qfr: number | undefined;
  B_RCA_target_vas_narrow_ratio_after: number | undefined;
  B_RCA_target_vas_qfr_after: number | undefined;
  ////
  B_PLA_vas_type: string;
  B_PLA_target_vas_narrow_ratio_before: number | undefined;
  B_PLA_target_vas_qfr_before: number | undefined;
  B_PLA_bridge_flux: number | undefined;
  B_PLA_flow_status: string;
  B_PLA_bridge_qfr: number | undefined;
  B_PLA_target_vas_narrow_ratio_after: number | undefined;
  B_PLA_target_vas_qfr_after: number | undefined;
  ////
  B_PDA_vas_type: string;
  B_PDA_target_vas_narrow_ratio_before: number | undefined;
  B_PDA_target_vas_qfr_before: number | undefined;
  B_PDA_bridge_flux: number | undefined;
  B_PDA_flow_status: string;
  B_PDA_bridge_qfr: number | undefined;
  B_PDA_target_vas_narrow_ratio_after: number | undefined;
  B_PDA_target_vas_qfr_after: number | undefined;
  ////
  B_Other_vas_type: string;
  B_Other_target_vas_narrow_ratio_before: number | undefined;
  B_Other_target_vas_qfr_before: number | undefined;
  B_Other_bridge_flux: number | undefined;
  B_Other_flow_status: string;
  B_Other_bridge_qfr: number | undefined;
  B_Other_target_vas_narrow_ratio_after: number | undefined;
  B_Other_target_vas_qfr_after: number | undefined;
  ////
  comments?: string;
  check_flag?: number | undefined;
  check_operator?: string;
  chekced_at?: Date;
  created_at?: Date;
}

export interface CaseRecordSearchFormI {
  // dtRange: [Moment, Moment]; // Moment的在页面间传输时会被转成String，可能和persist-redux有关系。
  start: string; // YYYY-mm-dd HH:MM:SS
  end: string; // YYYY-mm-dd HH:MM:SS
  keyword: string;
}

export type CaseRecordStatsT = [string, string, string, string, number, number]

export interface RoleI {
  code: string;
  name: string;
  pinyin?: string;
  py?: string;
}

export declare interface DepartmentI {
  code: string;
  name: string;
  pinyin: string;
  py: string;
  is_active: boolean;
  created_at: Date;
  staff: UserI[];
}

/* ===============  根据Tower文档整理的接口相关的interface END =============== */

export declare interface RouteI {
  path: string;
  name: string;
  exact: boolean;
  component: React.Component;
  routes?: RouteI[];
  permission?: string[];
}

// 创建store时要遵循的rootState接口，不能使用rootReducers的类型
// 作为组件创建时props类型！！！必须用store.d里定义的！三天的教训！
// 全局共享变量设置
export declare interface StoreStateI {
  router: { location: Location };
  token: string;
  user: UserI;
  caseRecordSearchForm: CaseRecordSearchFormI;
  caseRecord: CaseRecordI;
  caseRecordList: CaseRecordI[];
  caseRecordStats: CaseRecordStatsT[];
}

export declare interface CustomHTMLDivElement extends HTMLDivElement {
  webkitRequestFullscreen: () => void;
  msRequestFullscreen: () => void;
  mozRequestFullScreen: () => void;
}

interface Document {
  exitFullscreen: any;
  webkitExitFullscreen: any;
  mozCancelFullScreen: any;
  msExitFullscreen: any;
}

export declare interface Document {
  exitFullscreen: () => void;
  webkitExitFullscreen: () => void;
  mozCancelFullScreen: () => void;
  msExitFullscreen: () => void;
}

export declare interface ActionI<T, K> {
  type: T;
  payload: K;
}
