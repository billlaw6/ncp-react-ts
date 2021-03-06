import axios from "./api";
import { CaseRecordSearchFormI } from "../constants/interface";

export const submitTempReport = async (params: any) => {
  const res = await axios.post(`/report/temp/`, params);
  return res;
};

export const getTempReportList = async (params: any) => {
  const res = await axios.get(`/report/temp/`, { params: params });
  return res;
};

export const checkTempReport = async (params: string[]) => {
  const res = await axios.post(`/report/temp/check/`, { params: params });
  return res;
};

export const downloadTempReportList = async (params: any) => {
  const res = await axios.post(`/report/temp/download/`, params);
  return res;
};

export const getTempReportDetail = async (params: any) => {
  const res = await axios.get(`/report/temp/${params.id}`, { params: params });
  return res;
};

export const searchTempReport = async (params: any) => {
  const res = await axios.get(`/report/temp/`, { params: params });
  return res;
};

////////////// ////////////// ////////////// //////////////
export const submitCadreReport = async (params: any) => {
  const res = await axios.post(`/report/cadre/`, params);
  return res;
};

export const getCadreReportList = async (params: any) => {
  const res = await axios.get(`/report/cadre/`, { params: params });
  return res;
};

export const checkCadreReport = async (params: string[]) => {
  const res = await axios.post(`/report/cadre/check/`, { params: params });
  return res;
};

export const downloadCadreReportList = async (params: any) => {
  const res = await axios.post(`/report/cadre/download/`, params);
  return res;
};

export const getCadreReportDetail = async (params: any) => {
  const res = await axios.get(`/report/cadre/${params.id}`, { params: params });
  return res;
};

export const searchCadreReport = async (params: any) => {
  const res = await axios.get(`/report/cadre/`, { params: params });
  return res;
};

////////////// ////////////// ////////////// //////////////
export const submitCaseRecord = async (params: any) => {
  const res = await axios.post(`/report/case/`, params);
  return res;
};

export const getCaseRecordList = async (params: CaseRecordSearchFormI) => {
  // console.log(params);
  const res = await axios.get(`/report/case/`, { params: params });
  return res;
};

export const checkCaseRecord = async (params: string[]) => {
  const res = await axios.post(`/report/case/check/`, { params: params });
  return res;
};

export const downloadCaseRecordList = async (params: any) => {
  const res = await axios.post(`/report/case/download/`, params);
  return res;
};

export const getCaseRecordDetail = async (params: any) => {
  const res = await axios.get(`/report/case/${params.id}`, { params: params });
  return res;
};

export const searchCaseRecord = async (params: any) => {
  const res = await axios.get(`/report/case/`, { params: params });
  return res;
};

export const statsCaseRecordList = async (params: any) => {
  const res = await axios.get(`/report/case/stats/`, { params: params });
  return res;
};

export const getVasTypeList = async () => {
  // console.log(params);
  const res = await axios.get(`/report/vas-types/`);
  return res;
};

export const getFlowStatusList = async () => {
  // console.log(params);
  const res = await axios.get(`/report/flow-status/`);
  return res;
};