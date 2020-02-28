import React, { FormEvent } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  DatePicker,
  notification,
} from "antd";
import { FormComponentProps } from "antd/es/form";
import moment, { Moment } from "moment";

import { VasTypeI, FlowStatusI, CaseRecordI } from "../../../constants/interface";
import { CaseRecordStateI } from "../type";
import { submitCaseRecord } from "../../../services/report";
// import { history } from "../../store/configureStore";

import "./CaseRecordForm.less";

const { Item } = Form;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm:ss";
// const dateFormat = "YYYY-MM-DD";

interface CaseRecordFormProps extends FormComponentProps {
  vasTypeList: VasTypeI[];
  flowStatusList: FlowStatusI[];
  caseRecord: CaseRecordI;
  handleChange: Function;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

class CaseRecordForm extends React.Component<CaseRecordFormProps, CaseRecordStateI> {
  componentDidMount() {
    this.props.form.validateFields();
  }

  onCheckInDateChange(date: Moment | null, dateString: string){
    console.log(dateString);
  }
  onCheckOutDateChange(date: Moment | null, dateString: string){
    console.log(dateString);
  }
  onOperateDateChange(date: Moment | null, dateString: string){
    console.log(dateString);
  }
  onRadioDateChange(date: Moment | null, dateString: string){
    console.log(dateString);
  }
  // 提交修改
  handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values);
        values['check_in_date'] = values['check_in_date'].format(dateFormat)
        values['check_out_date'] = values['check_out_date'].format(dateFormat)
        values['operate_date'] = values['operate_date'].format(dateFormat)
        values['radio_date'] = values['radio_date'].format(dateFormat)
        submitCaseRecord(values).then((res) => {
          // console.log(res);
          notification.open({
            message: "病案保存结果",
            description: "病案保存成功",
            duration: 1.5,
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { vasTypeList, flowStatusList, caseRecord } = this.props;

    return (
      <div className="case-record">
        <div className="case-record-content">
          <div className="case-record-header">病案录入</div>
          <Form className="case-record-form" name="case-record" onSubmit={this.handleSubmit}>
            <Item label="姓名" colon={false}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入姓名" }],
                initialValue: caseRecord.name,
              })(<Input type="text" name="name" />)}
            </Item>
            <Item label="病案号" colon={false}>
              {getFieldDecorator("patient_no", {
                rules: [{ required: true, message: "请录入病案号" }],
                initialValue: caseRecord.patient_no,
              })(<Input type="text" name="patient_no"></Input>)}
            </Item>
            <Item label="入院日期" colon={false}>
              {getFieldDecorator("check_in_date", {
                rules: [{ required: true, message: "请录入入院日期" }],
                initialValue: moment(caseRecord.check_in_date),
              })(<DatePicker format={dateFormat} onChange={this.onCheckInDateChange}></DatePicker>)}
            </Item>
            <Item label="入院日期" colon={false}>
              {getFieldDecorator("check_out_date", {
                rules: [{ required: true, message: "请录入出院日期" }],
                initialValue: moment(caseRecord.check_out_date),
              })(<DatePicker format={dateFormat} onChange={this.onCheckOutDateChange}></DatePicker>)}
            </Item>
            <Item label="手术日期" colon={false}>
              {getFieldDecorator("operate_date", {
                rules: [{ required: true, message: "请录入手术日期" }],
                initialValue: moment(caseRecord.operate_date),
              })(<DatePicker format={dateFormat} onChange={this.onOperateDateChange}></DatePicker>)}
            </Item>
            <Item label="造影日期" colon={false}>
              {getFieldDecorator("radio_date", {
                rules: [{ required: true, message: "请录入手术日期" }],
                initialValue: moment(caseRecord.radio_date),
              })(<DatePicker format={dateFormat} onChange={this.onRadioDateChange}></DatePicker>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="LM_病变长度mm" colon={false}>
              {getFieldDecorator("LM_lesion_length", {
                rules: [{ required: true, message: "请录入LM_病变长度mm" }],
                initialValue: caseRecord.LM_lesion_length,
              })(<InputNumber precision={2} name="LM_lesion_length"></InputNumber>)}
            </Item>
            <Item label="LM_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("LM_min_area", {
                rules: [{ required: true, message: "请录入LM_最小管腔面积mm2" }],
                initialValue: caseRecord.LM_min_area,
              })(<InputNumber precision={2} name="LM_min_area"></InputNumber>)}
            </Item>
            <Item label="LM_直径狭窄DS%" colon={false}>
              {getFieldDecorator("LM_diameter_ratio", {
                rules: [{ required: true, message: "请录入LM_直径狭窄DS%" }],
                initialValue: caseRecord.LM_diameter_ratio,
              })(<InputNumber precision={2} name="LM_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="LM_面积狭窄DS%" colon={false}>
              {getFieldDecorator("LM_area_ratio", {
                rules: [{ required: true, message: "请录入LM_面积狭窄DS%" }],
                initialValue: caseRecord.LM_area_ratio,
              })(<InputNumber precision={2} name="LM_area_ratio"></InputNumber>)}
            </Item>
            <Item label="LM_QFR值" colon={false}>
              {getFieldDecorator("LM_qfr", {
                rules: [{ required: true, message: "请录入LM_QFR" }],
                initialValue: caseRecord.LM_qfr,
              })(<InputNumber precision={2} name="LM_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="LAD_病变长度mm" colon={false}>
              {getFieldDecorator("LAD_lesion_length", {
                rules: [{ required: true, message: "请录入LAD_病变长度mm" }],
                initialValue: caseRecord.LAD_lesion_length,
              })(<InputNumber precision={2} name="LAD_lesion_length"></InputNumber>)}
            </Item>
            <Item label="LAD_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("LAD_min_area", {
                rules: [{ required: true, message: "请录入LAD_最小管腔面积mm2" }],
                initialValue: caseRecord.LAD_min_area,
              })(<InputNumber precision={2} name="LAD_min_area"></InputNumber>)}
            </Item>
            <Item label="LAD_直径狭窄DS%" colon={false}>
              {getFieldDecorator("LAD_diameter_ratio", {
                rules: [{ required: true, message: "请录入LAD_直径狭窄DS%" }],
                initialValue: caseRecord.LAD_diameter_ratio,
              })(<InputNumber precision={2} name="LAD_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="LAD_面积狭窄DS%" colon={false}>
              {getFieldDecorator("LAD_area_ratio", {
                rules: [{ required: true, message: "请录入LAD_面积狭窄DS%" }],
                initialValue: caseRecord.LAD_area_ratio,
              })(<InputNumber precision={2} name="LAD_area_ratio"></InputNumber>)}
            </Item>
            <Item label="LAD_QFR值" colon={false}>
              {getFieldDecorator("LAD_qfr", {
                rules: [{ required: true, message: "请录入LAD_QFR" }],
                initialValue: caseRecord.LAD_qfr,
              })(<InputNumber precision={2} type="number" name="LAD_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="DIA1_病变长度mm" colon={false}>
              {getFieldDecorator("DIA1_lesion_length", {
                rules: [{ required: true, message: "请录入DIA1_病变长度mm" }],
                initialValue: caseRecord.DIA1_lesion_length,
              })(<InputNumber precision={2} name="DIA1_lesion_length"></InputNumber>)}
            </Item>
            <Item label="DIA1_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("DIA1_min_area", {
                rules: [{ required: true, message: "请录入DIA1_最小管腔面积mm2" }],
                initialValue: caseRecord.DIA1_min_area,
              })(<InputNumber precision={2} name="DIA1_min-area"></InputNumber>)}
            </Item>
            <Item label="DIA1_直径狭窄DS%" colon={false}>
              {getFieldDecorator("DIA1_diameter_ratio", {
                rules: [{ required: true, message: "请录入DIA1_直径狭窄DS%" }],
                initialValue: caseRecord.DIA1_diameter_ratio,
              })(<InputNumber precision={2} name="DIA1_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="DIA1_面积狭窄DS%" colon={false}>
              {getFieldDecorator("DIA1_area_ratio", {
                rules: [{ required: true, message: "请录入DIA1_面积狭窄DS%" }],
                initialValue: caseRecord.DIA1_area_ratio,
              })(<InputNumber precision={2} name="DIA1_area_ratio"></InputNumber>)}
            </Item>
            <Item label="DIA1_QFR值" colon={false}>
              {getFieldDecorator("DIA1_qfr", {
                rules: [{ required: true, message: "请录入DIA1_QFR" }],
                initialValue: caseRecord.DIA1_qfr,
              })(<InputNumber precision={2} type="number" name="DIA1_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="DIA2_病变长度mm" colon={false}>
              {getFieldDecorator("DIA2_lesion_length", {
                rules: [{ required: true, message: "请录入DIA2_病变长度mm" }],
                initialValue: caseRecord.DIA2_lesion_length,
              })(<InputNumber precision={2} name="DIA2_lesion_length"></InputNumber>)}
            </Item>
            <Item label="DIA2_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("DIA2_min_area", {
                rules: [{ required: true, message: "请录入DIA2_最小管腔面积mm2" }],
                initialValue: caseRecord.DIA2_min_area,
              })(<InputNumber precision={2} name="DIA2_min-area"></InputNumber>)}
            </Item>
            <Item label="DIA2_直径狭窄DS%" colon={false}>
              {getFieldDecorator("DIA2_diameter_ratio", {
                rules: [{ required: true, message: "请录入DIA2_直径狭窄DS%" }],
                initialValue: caseRecord.DIA2_diameter_ratio,
              })(<InputNumber precision={2} name="DIA2_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="DIA2_面积狭窄DS%" colon={false}>
              {getFieldDecorator("DIA2_area_ratio", {
                rules: [{ required: true, message: "请录入DIA2_面积狭窄DS%" }],
                initialValue: caseRecord.DIA2_area_ratio,
              })(<InputNumber precision={2} name="DIA2_area_ratio"></InputNumber>)}
            </Item>
            <Item label="DIA2_QFR值" colon={false}>
              {getFieldDecorator("DIA2_qfr", {
                rules: [{ required: true, message: "请录入DIA2_QFR" }],
                initialValue: caseRecord.DIA2_qfr,
              })(<InputNumber precision={2} type="number" name="DIA2_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="DIA3_病变长度mm" colon={false}>
              {getFieldDecorator("DIA3_lesion_length", {
                rules: [{ required: true, message: "请录入DIA3_病变长度mm" }],
                initialValue: caseRecord.DIA3_lesion_length,
              })(<InputNumber precision={2} name="DIA3_lesion_length"></InputNumber>)}
            </Item>
            <Item label="DIA3_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("DIA3_min_area", {
                rules: [{ required: true, message: "请录入DIA3_最小管腔面积mm2" }],
                initialValue: caseRecord.DIA3_min_area,
              })(<InputNumber precision={2} name="DIA3_min-area"></InputNumber>)}
            </Item>
            <Item label="DIA3_直径狭窄DS%" colon={false}>
              {getFieldDecorator("DIA3_diameter_ratio", {
                rules: [{ required: true, message: "请录入DIA3_直径狭窄DS%" }],
                initialValue: caseRecord.DIA3_diameter_ratio,
              })(<InputNumber precision={2} name="DIA3_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="DIA3_面积狭窄DS%" colon={false}>
              {getFieldDecorator("DIA3_area_ratio", {
                rules: [{ required: true, message: "请录入DIA3_面积狭窄DS%" }],
                initialValue: caseRecord.DIA3_area_ratio,
              })(<InputNumber precision={2} name="DIA3_area_ratio"></InputNumber>)}
            </Item>
            <Item label="DIA3_QFR值" colon={false}>
              {getFieldDecorator("DIA3_qfr", {
                rules: [{ required: true, message: "请录入DIA3_QFR" }],
                initialValue: caseRecord.DIA3_qfr,
              })(<InputNumber precision={2} type="number" name="DIA3_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="LCX_病变长度mm" colon={false}>
              {getFieldDecorator("LCX_lesion_length", {
                rules: [{ required: true, message: "请录入LCX_病变长度mm" }],
                initialValue: caseRecord.LCX_lesion_length,
              })(<InputNumber precision={2} name="LCX_lesion_length"></InputNumber>)}
            </Item>
            <Item label="LCX_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("LCX_min_area", {
                rules: [{ required: true, message: "请录入LCX_最小管腔面积mm2" }],
                initialValue: caseRecord.LCX_min_area,
              })(<InputNumber precision={2} name="LCX_min-area"></InputNumber>)}
            </Item>
            <Item label="LCX_直径狭窄DS%" colon={false}>
              {getFieldDecorator("LCX_diameter_ratio", {
                rules: [{ required: true, message: "请录入LCX_直径狭窄DS%" }],
                initialValue: caseRecord.LCX_diameter_ratio,
              })(<InputNumber precision={2} name="LCX_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="LCX_面积狭窄DS%" colon={false}>
              {getFieldDecorator("LCX_area_ratio", {
                rules: [{ required: true, message: "请录入LCX_面积狭窄DS%" }],
                initialValue: caseRecord.LCX_area_ratio,
              })(<InputNumber precision={2} name="LCX_area_ratio"></InputNumber>)}
            </Item>
            <Item label="LCX_QFR值" colon={false}>
              {getFieldDecorator("LCX_qfr", {
                rules: [{ required: true, message: "请录入LCX_QFR" }],
                initialValue: caseRecord.LCX_qfr,
              })(<InputNumber precision={2} type="number" name="LCX_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="OM1_病变长度mm" colon={false}>
              {getFieldDecorator("OM1_lesion_length", {
                rules: [{ required: true, message: "请录入OM1_病变长度mm" }],
                initialValue: caseRecord.OM1_lesion_length,
              })(<InputNumber precision={2} name="OM1_lesion_length"></InputNumber>)}
            </Item>
            <Item label="OM1_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("OM1_min_area", {
                rules: [{ required: true, message: "请录入OM1_最小管腔面积mm2" }],
                initialValue: caseRecord.OM1_min_area,
              })(<InputNumber precision={2} name="OM1_min-area"></InputNumber>)}
            </Item>
            <Item label="OM1_直径狭窄DS%" colon={false}>
              {getFieldDecorator("OM1_diameter_ratio", {
                rules: [{ required: true, message: "请录入OM1_直径狭窄DS%" }],
                initialValue: caseRecord.OM1_diameter_ratio,
              })(<InputNumber precision={2} name="OM1_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="OM1_面积狭窄DS%" colon={false}>
              {getFieldDecorator("OM1_area_ratio", {
                rules: [{ required: true, message: "请录入OM1_面积狭窄DS%" }],
                initialValue: caseRecord.OM1_area_ratio,
              })(<InputNumber precision={2} name="OM1_area_ratio"></InputNumber>)}
            </Item>
            <Item label="OM1_QFR值" colon={false}>
              {getFieldDecorator("OM1_qfr", {
                rules: [{ required: true, message: "请录入OM1_QFR" }],
                initialValue: caseRecord.OM1_qfr,
              })(<InputNumber precision={2} type="number" name="OM1_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="OM2_病变长度mm" colon={false}>
              {getFieldDecorator("OM2_lesion_length", {
                rules: [{ required: true, message: "请录入OM2_病变长度mm" }],
                initialValue: caseRecord.OM2_lesion_length,
              })(<InputNumber precision={2} name="OM2_lesion_length"></InputNumber>)}
            </Item>
            <Item label="OM2_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("OM2_min_area", {
                rules: [{ required: true, message: "请录入OM2_最小管腔面积mm2" }],
                initialValue: caseRecord.OM2_min_area,
              })(<InputNumber precision={2} name="OM2_min-area"></InputNumber>)}
            </Item>
            <Item label="OM2_直径狭窄DS%" colon={false}>
              {getFieldDecorator("OM2_diameter_ratio", {
                rules: [{ required: true, message: "请录入OM2_直径狭窄DS%" }],
                initialValue: caseRecord.OM2_diameter_ratio,
              })(<InputNumber precision={2} name="OM2_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="OM2_面积狭窄DS%" colon={false}>
              {getFieldDecorator("OM2_area_ratio", {
                rules: [{ required: true, message: "请录入OM2_面积狭窄DS%" }],
                initialValue: caseRecord.OM2_area_ratio,
              })(<InputNumber precision={2} name="OM2_area_ratio"></InputNumber>)}
            </Item>
            <Item label="OM2_QFR值" colon={false}>
              {getFieldDecorator("OM2_qfr", {
                rules: [{ required: true, message: "请录入OM2_QFR" }],
                initialValue: caseRecord.OM2_qfr,
              })(<InputNumber precision={2} type="number" name="OM2_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="RAMUS_病变长度mm" colon={false}>
              {getFieldDecorator("RAMUS_lesion_length", {
                rules: [{ required: true, message: "请录入RAMUS_病变长度mm" }],
                initialValue: caseRecord.RAMUS_lesion_length,
              })(<InputNumber precision={2} name="RAMUS_lesion_length"></InputNumber>)}
            </Item>
            <Item label="RAMUS_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("RAMUS_min_area", {
                rules: [{ required: true, message: "请录入RAMUS_最小管腔面积mm2" }],
                initialValue: caseRecord.RAMUS_min_area,
              })(<InputNumber precision={2} name="RAMUS_min-area"></InputNumber>)}
            </Item>
            <Item label="RAMUS_直径狭窄DS%" colon={false}>
              {getFieldDecorator("RAMUS_diameter_ratio", {
                rules: [{ required: true, message: "请录入RAMUS_直径狭窄DS%" }],
                initialValue: caseRecord.RAMUS_diameter_ratio,
              })(<InputNumber precision={2} name="RAMUS_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="RAMUS_面积狭窄DS%" colon={false}>
              {getFieldDecorator("RAMUS_area_ratio", {
                rules: [{ required: true, message: "请录入RAMUS_面积狭窄DS%" }],
                initialValue: caseRecord.RAMUS_area_ratio,
              })(<InputNumber precision={2} name="RAMUS_area_ratio"></InputNumber>)}
            </Item>
            <Item label="RAMUS_QFR值" colon={false}>
              {getFieldDecorator("RAMUS_qfr", {
                rules: [{ required: true, message: "请录入RAMUS_QFR" }],
                initialValue: caseRecord.RAMUS_qfr,
              })(<InputNumber precision={2} type="number" name="RAMUS_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="RCA_病变长度mm" colon={false}>
              {getFieldDecorator("RCA_lesion_length", {
                rules: [{ required: true, message: "请录入RCA_病变长度mm" }],
                initialValue: caseRecord.RCA_lesion_length,
              })(<InputNumber precision={2} name="RCA_lesion_length"></InputNumber>)}
            </Item>
            <Item label="RCA_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("RCA_min_area", {
                rules: [{ required: true, message: "请录入RCA_最小管腔面积mm2" }],
                initialValue: caseRecord.RCA_min_area,
              })(<InputNumber precision={2} name="RCA_min-area"></InputNumber>)}
            </Item>
            <Item label="RCA_直径狭窄DS%" colon={false}>
              {getFieldDecorator("RCA_diameter_ratio", {
                rules: [{ required: true, message: "请录入RCA_直径狭窄DS%" }],
                initialValue: caseRecord.RCA_diameter_ratio,
              })(<InputNumber precision={2} name="RCA_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="RCA_面积狭窄DS%" colon={false}>
              {getFieldDecorator("RCA_area_ratio", {
                rules: [{ required: true, message: "请录入RCA_面积狭窄DS%" }],
                initialValue: caseRecord.RCA_area_ratio,
              })(<InputNumber precision={2} name="RCA_area_ratio"></InputNumber>)}
            </Item>
            <Item label="RCA_QFR值" colon={false}>
              {getFieldDecorator("RCA_qfr", {
                rules: [{ required: true, message: "请录入RCA_QFR" }],
                initialValue: caseRecord.RCA_qfr,
              })(<InputNumber precision={2} type="number" name="RCA_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="PLA_病变长度mm" colon={false}>
              {getFieldDecorator("PLA_lesion_length", {
                rules: [{ required: true, message: "请录入PLA_病变长度mm" }],
                initialValue: caseRecord.PLA_lesion_length,
              })(<InputNumber precision={2} name="PLA_lesion_length"></InputNumber>)}
            </Item>
            <Item label="PLA_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("PLA_min_area", {
                rules: [{ required: true, message: "请录入PLA_最小管腔面积mm2" }],
                initialValue: caseRecord.PLA_min_area,
              })(<InputNumber precision={2} name="PLA_min-area"></InputNumber>)}
            </Item>
            <Item label="PLA_直径狭窄DS%" colon={false}>
              {getFieldDecorator("PLA_diameter_ratio", {
                rules: [{ required: true, message: "请录入PLA_直径狭窄DS%" }],
                initialValue: caseRecord.PLA_diameter_ratio,
              })(<InputNumber precision={2} name="PLA_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="PLA_面积狭窄DS%" colon={false}>
              {getFieldDecorator("PLA_area_ratio", {
                rules: [{ required: true, message: "请录入PLA_面积狭窄DS%" }],
                initialValue: caseRecord.PLA_area_ratio,
              })(<InputNumber precision={2} name="PLA_area_ratio"></InputNumber>)}
            </Item>
            <Item label="PLA_QFR值" colon={false}>
              {getFieldDecorator("PLA_qfr", {
                rules: [{ required: true, message: "请录入PLA_QFR" }],
                initialValue: caseRecord.PLA_qfr,
              })(<InputNumber precision={2} type="number" name="PLA_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="PDA_病变长度mm" colon={false}>
              {getFieldDecorator("PDA_lesion_length", {
                rules: [{ required: true, message: "请录入PDA_病变长度mm" }],
                initialValue: caseRecord.PDA_lesion_length,
              })(<InputNumber precision={2} name="PDA_lesion_length"></InputNumber>)}
            </Item>
            <Item label="PDA_最小管腔面积mm2" colon={false}>
              {getFieldDecorator("PDA_min_area", {
                rules: [{ required: true, message: "请录入PDA_最小管腔面积mm2" }],
                initialValue: caseRecord.PDA_min_area,
              })(<InputNumber precision={2} name="PDA_min-area"></InputNumber>)}
            </Item>
            <Item label="PDA_直径狭窄DS%" colon={false}>
              {getFieldDecorator("PDA_diameter_ratio", {
                rules: [{ required: true, message: "请录入PDA_直径狭窄DS%" }],
                initialValue: caseRecord.PDA_diameter_ratio,
              })(<InputNumber precision={2} name="PDA_diameter_ratio"></InputNumber>)}
            </Item>
            <Item label="PDA_面积狭窄DS%" colon={false}>
              {getFieldDecorator("PDA_area_ratio", {
                rules: [{ required: true, message: "请录入PDA_面积狭窄DS%" }],
                initialValue: caseRecord.PDA_area_ratio,
              })(<InputNumber precision={2} name="PDA_area_ratio"></InputNumber>)}
            </Item>
            <Item label="PDA_QFR值" colon={false}>
              {getFieldDecorator("PDA_qfr", {
                rules: [{ required: true, message: "请录入PDA_QFR" }],
                initialValue: caseRecord.PDA_qfr,
              })(<InputNumber precision={2} type="number" name="PDA_qfr"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-LAD_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_LAD_vas_type", {
                rules: [{ required: true, message: "请录入桥-LAD_桥血管种类" }],
                initialValue: caseRecord.B_LAD_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-LAD_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_LAD_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-LAD_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_LAD_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_LAD_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-LAD_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_LAD_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-LAD_靶血管术前QFR值" }],
                initialValue: caseRecord.B_LAD_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_LAD_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-LAD_桥流量" colon={false}>
              {getFieldDecorator("B_LAD_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-LAD_桥流量" }],
                initialValue: caseRecord.B_LAD_bridge_flux,
              })(<InputNumber precision={2} name="B_LAD_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-LAD_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_LAD_flow_status", {
                rules: [{ required: true, message: "请录入LAD_桥通畅情况" }],
                initialValue: caseRecord.B_LAD_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-LAD_桥QFR值" colon={false}>
              {getFieldDecorator("B_LAD_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-LAD_桥QFR值" }],
                initialValue: caseRecord.B_LAD_bridge_qfr,
              })(<InputNumber precision={2} name="B_LAD_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-LAD_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_LAD_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-LAD_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_LAD_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_LAD_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-LAD_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_LAD_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-LAD_靶血管术后QFR值" }],
                initialValue: caseRecord.B_LAD_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_LAD_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-DIA1_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_DIA1_vas_type", {
                rules: [{ required: true, message: "请录入桥-DIA1_桥血管种类" }],
                initialValue: caseRecord.B_DIA1_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-DIA1_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_DIA1_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-DIA1_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_DIA1_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_DIA1_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-DIA1_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_DIA1_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-DIA1_靶血管术前QFR值" }],
                initialValue: caseRecord.B_DIA1_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_DIA1_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-DIA1_桥流量" colon={false}>
              {getFieldDecorator("B_DIA1_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-DIA1_桥流量" }],
                initialValue: caseRecord.B_DIA1_bridge_flux,
              })(<InputNumber precision={2} name="B_DIA1_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-DIA1_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_DIA1_flow_status", {
                rules: [{ required: true, message: "请录入DIA1_桥通畅情况" }],
                initialValue: caseRecord.B_DIA1_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-DIA1_桥QFR值" colon={false}>
              {getFieldDecorator("B_DIA1_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-DIA1_桥QFR值" }],
                initialValue: caseRecord.B_DIA1_bridge_qfr,
              })(<InputNumber precision={2} name="B_DIA1_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-DIA1_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_DIA1_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-DIA1_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_DIA1_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_DIA1_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-DIA1_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_DIA1_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-DIA1_靶血管术后QFR值" }],
                initialValue: caseRecord.B_DIA1_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_DIA1_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-DIA2_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_DIA2_vas_type", {
                rules: [{ required: true, message: "请录入桥-DIA2_桥血管种类" }],
                initialValue: caseRecord.B_DIA2_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-DIA2_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_DIA2_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-DIA2_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_DIA2_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_DIA2_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-DIA2_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_DIA2_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-DIA2_靶血管术前QFR值" }],
                initialValue: caseRecord.B_DIA2_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_DIA2_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-DIA2_桥流量" colon={false}>
              {getFieldDecorator("B_DIA2_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-DIA2_桥流量" }],
                initialValue: caseRecord.B_DIA2_bridge_flux,
              })(<InputNumber precision={2} name="B_DIA2_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-DIA2_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_DIA2_flow_status", {
                rules: [{ required: true, message: "请录入DIA2_桥通畅情况" }],
                initialValue: caseRecord.B_DIA2_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-DIA2_桥QFR值" colon={false}>
              {getFieldDecorator("B_DIA2_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-DIA2_桥QFR值" }],
                initialValue: caseRecord.B_DIA2_bridge_qfr,
              })(<InputNumber precision={2} name="B_DIA2_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-DIA2_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_DIA2_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-DIA2_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_DIA2_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_DIA2_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-DIA2_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_DIA2_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-DIA2_靶血管术后QFR值" }],
                initialValue: caseRecord.B_DIA2_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_DIA2_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-OM1_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_OM1_vas_type", {
                rules: [{ required: true, message: "请录入桥-OM1_桥血管种类" }],
                initialValue: caseRecord.B_OM1_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-OM1_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_OM1_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-OM1_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_OM1_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_OM1_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-OM1_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_OM1_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-OM1_靶血管术前QFR值" }],
                initialValue: caseRecord.B_OM1_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_OM1_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-OM1_桥流量" colon={false}>
              {getFieldDecorator("B_OM1_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-OM1_桥流量" }],
                initialValue: caseRecord.B_OM1_bridge_flux,
              })(<InputNumber precision={2} name="B_OM1_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-OM1_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_OM1_flow_status", {
                rules: [{ required: true, message: "请录入OM1_桥通畅情况" }],
                initialValue: caseRecord.B_OM1_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-OM1_桥QFR值" colon={false}>
              {getFieldDecorator("B_OM1_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-OM1_桥QFR值" }],
                initialValue: caseRecord.B_OM1_bridge_qfr,
              })(<InputNumber precision={2} name="B_OM1_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-OM1_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_OM1_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-OM1_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_OM1_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_OM1_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-OM1_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_OM1_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-OM1_靶血管术后QFR值" }],
                initialValue: caseRecord.B_OM1_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_OM1_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-OM2_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_OM2_vas_type", {
                rules: [{ required: true, message: "请录入桥-OM2_桥血管种类" }],
                initialValue: caseRecord.B_OM2_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-OM2_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_OM2_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-OM2_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_OM2_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_OM2_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-OM2_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_OM2_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-OM2_靶血管术前QFR值" }],
                initialValue: caseRecord.B_OM2_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_OM2_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-OM2_桥流量" colon={false}>
              {getFieldDecorator("B_OM2_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-OM2_桥流量" }],
                initialValue: caseRecord.B_OM2_bridge_flux,
              })(<InputNumber precision={2} name="B_OM2_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-OM2_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_OM2_flow_status", {
                rules: [{ required: true, message: "请录入OM2_桥通畅情况" }],
                initialValue: caseRecord.B_OM2_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-OM2_桥QFR值" colon={false}>
              {getFieldDecorator("B_OM2_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-OM2_桥QFR值" }],
                initialValue: caseRecord.B_OM2_bridge_qfr,
              })(<InputNumber precision={2} name="B_OM2_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-OM2_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_OM2_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-OM2_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_OM2_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_OM2_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-OM2_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_OM2_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-OM2_靶血管术后QFR值" }],
                initialValue: caseRecord.B_OM2_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_OM2_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-OM3_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_OM3_vas_type", {
                rules: [{ required: true, message: "请录入桥-OM3_桥血管种类" }],
                initialValue: caseRecord.B_OM3_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-OM3_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_OM3_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-OM3_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_OM3_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_OM3_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-OM3_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_OM3_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-OM3_靶血管术前QFR值" }],
                initialValue: caseRecord.B_OM3_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_OM3_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-OM3_桥流量" colon={false}>
              {getFieldDecorator("B_OM3_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-OM3_桥流量" }],
                initialValue: caseRecord.B_OM3_bridge_flux,
              })(<InputNumber precision={2} name="B_OM3_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-OM3_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_OM3_flow_status", {
                rules: [{ required: true, message: "请录入OM3_桥通畅情况" }],
                initialValue: caseRecord.B_OM3_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-OM3_桥QFR值" colon={false}>
              {getFieldDecorator("B_OM3_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-OM3_桥QFR值" }],
                initialValue: caseRecord.B_OM3_bridge_qfr,
              })(<InputNumber precision={2} name="B_OM3_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-OM3_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_OM3_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥OM3_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_OM3_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_OM3_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-OM3_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_OM3_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-OM3_靶血管术后QFR值" }],
                initialValue: caseRecord.B_OM3_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_OM3_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-RAMUS_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_RAMUS_vas_type", {
                rules: [{ required: true, message: "请录入桥-RAMUS_桥血管种类" }],
                initialValue: caseRecord.B_RAMUS_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-RAMUS_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_RAMUS_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-RAMUS_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_RAMUS_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_RAMUS_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-RAMUS_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_RAMUS_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-RAMUS_靶血管术前QFR值" }],
                initialValue: caseRecord.B_RAMUS_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_RAMUS_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-RAMUS_桥流量" colon={false}>
              {getFieldDecorator("B_RAMUS_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-RAMUS_桥流量" }],
                initialValue: caseRecord.B_RAMUS_bridge_flux,
              })(<InputNumber precision={2} name="B_RAMUS_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-RAMUS_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_RAMUS_flow_status", {
                rules: [{ required: true, message: "请录入RAMUS_桥通畅情况" }],
                initialValue: caseRecord.B_RAMUS_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-RAMUS_桥QFR值" colon={false}>
              {getFieldDecorator("B_RAMUS_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-RAMUS_桥QFR值" }],
                initialValue: caseRecord.B_RAMUS_bridge_qfr,
              })(<InputNumber precision={2} name="B_RAMUS_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-RAMUS_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_RAMUS_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-RAMUS_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_RAMUS_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_RAMUS_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-RAMUS_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_RAMUS_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-RAMUS_靶血管术后QFR值" }],
                initialValue: caseRecord.B_RAMUS_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_RAMUS_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-RCA_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_RCA_vas_type", {
                rules: [{ required: true, message: "请录入桥-RCA_桥血管种类" }],
                initialValue: caseRecord.B_RCA_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-RCA_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_RCA_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-RCA_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_RCA_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_RCA_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-RCA_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_RCA_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-RCA_靶血管术前QFR值" }],
                initialValue: caseRecord.B_RCA_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_RCA_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-RCA_桥流量" colon={false}>
              {getFieldDecorator("B_RCA_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-RCA_桥流量" }],
                initialValue: caseRecord.B_RCA_bridge_flux,
              })(<InputNumber precision={2} name="B_RCA_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-RCA_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_RCA_flow_status", {
                rules: [{ required: true, message: "请录入RCA_桥通畅情况" }],
                initialValue: caseRecord.B_RCA_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-RCA_桥QFR值" colon={false}>
              {getFieldDecorator("B_RCA_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-RCA_桥QFR值" }],
                initialValue: caseRecord.B_RCA_bridge_qfr,
              })(<InputNumber precision={2} name="B_RCA_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-RCA_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_RCA_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-RCA_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_RCA_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_RCA_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-RCA_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_RCA_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-RCA_靶血管术后QFR值" }],
                initialValue: caseRecord.B_RCA_target_vas_qfr_after
              })(<InputNumber precision={2} name="B_RCA_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-PLA_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_PLA_vas_type", {
                rules: [{ required: true, message: "请录入桥-PLA_桥血管种类" }],
                initialValue: caseRecord.B_PLA_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-PLA_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_PLA_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-PLA_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_PLA_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_PLA_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-PLA_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_PLA_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-PLA_靶血管术前QFR值" }],
                initialValue: caseRecord.B_PLA_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_PLA_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-PLA_桥流量" colon={false}>
              {getFieldDecorator("B_PLA_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-PLA_桥流量" }],
                initialValue: caseRecord.B_PLA_bridge_flux,
              })(<InputNumber precision={2} name="B_PLA_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-PLA_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_PLA_flow_status", {
                rules: [{ required: true, message: "请录入PLA_桥通畅情况" }],
                initialValue: caseRecord.B_PLA_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-PLA_桥QFR值" colon={false}>
              {getFieldDecorator("B_PLA_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-PLA_桥QFR值" }],
                initialValue: caseRecord.B_PLA_bridge_qfr,
              })(<InputNumber precision={2} name="B_PLA_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-PLA_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_PLA_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-PLA_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_PLA_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_PLA_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-PLA_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_PLA_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-PLA_靶血管术后QFR值" }],
                initialValue: caseRecord.B_PLA_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_PLA_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-PDA_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_PDA_vas_type", {
                rules: [{ required: true, message: "请录入桥-PDA_桥血管种类" }],
                initialValue: caseRecord.B_PDA_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-PDA_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_PDA_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-PDA_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_PDA_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_PDA_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-PDA_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_PDA_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-PDA_靶血管术前QFR值" }],
                initialValue: caseRecord.B_PDA_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_PDA_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-PDA_桥流量" colon={false}>
              {getFieldDecorator("B_PDA_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-PDA_桥流量" }],
                initialValue: caseRecord.B_PDA_bridge_flux,
              })(<InputNumber precision={2} name="B_PDA_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-PDA_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_PDA_flow_status", {
                rules: [{ required: true, message: "请录入PDA_桥通畅情况" }],
                initialValue: caseRecord.B_PDA_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-PDA_桥QFR值" colon={false}>
              {getFieldDecorator("B_PDA_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-PDA_桥QFR值" }],
                initialValue: caseRecord.B_PDA_bridge_qfr,
              })(<InputNumber precision={2} name="B_PDA_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-PDA_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_PDA_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-PDA_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_PDA_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_PDA_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-PDA_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_PDA_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-PDA_靶血管术后QFR值" }],
                initialValue: caseRecord.B_PDA_target_vas_qfr_after,
              })(<InputNumber precision={2} name="B_PDA_target_vas_qfr_after"></InputNumber>)}
            </Item>
            {/* 分段########################################## */}
            <Item label="桥-Other_桥血管种类（1-LIMA;2-SVG;3-Radial Artery）" colon={false}>
              {getFieldDecorator("B_Other_vas_type", {
                rules: [{ required: true, message: "请录入桥-Other_桥血管种类" }],
                initialValue: caseRecord.B_Other_vas_type,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {vasTypeList.length > 0 ? (
                    vasTypeList.map((item: VasTypeI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"1"} value={"1"} title={"LIMA"}>LIMA</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-Other_靶血管术前狭窄程度%" colon={false}>
              {getFieldDecorator("B_Other_target_vas_narrow_ratio_before", {
                rules: [{ required: true, message: "请录入桥-Other_靶血管术前狭窄程度%" }],
                initialValue: caseRecord.B_Other_target_vas_narrow_ratio_before,
              })(<InputNumber precision={2} name="B_Other_target_vas_narrow_ratio_before"></InputNumber>)}
            </Item>
            <Item label="桥-Other_靶血管术前QFR值" colon={false}>
              {getFieldDecorator("B_Other_target_vas_qfr_before", {
                rules: [{ required: true, message: "桥-Other_靶血管术前QFR值" }],
                initialValue: caseRecord.B_Other_target_vas_qfr_before,
              })(<InputNumber precision={2} name="B_Other_target_vas_qfr_before"></InputNumber>)}
            </Item>
            <Item label="桥-Other_桥流量" colon={false}>
              {getFieldDecorator("B_Other_bridge_flux", {
                rules: [{ required: true, message: "请录入桥-Other_桥流量" }],
                initialValue: caseRecord.B_Other_bridge_flux,
              })(<InputNumber precision={2} name="B_Other_bridge_flux"></InputNumber>)}
            </Item>
            <Item label="桥-Other_桥通畅情况（A widdely patient; B patent with flow limited C occluded）" colon={false}>
              {getFieldDecorator("B_Other_flow_status", {
                rules: [{ required: true, message: "请录入Other_桥通畅情况" }],
                initialValue: caseRecord.B_Other_flow_status,
              })(
                <Select
                  showSearch
                  filterOption={(input, option) => {
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                >
                  {flowStatusList.length > 0 ? (
                    flowStatusList.map((item: FlowStatusI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"A"} value={"A"} title={"widely patent"}>widely patent</Option>
                    )}
                </Select>
              )}
            </Item>
            <Item label="桥-Other_桥QFR值" colon={false}>
              {getFieldDecorator("B_Other_bridge_qfr", {
                rules: [{ required: true, message: "请录入桥-Other_桥QFR值" }],
                initialValue: caseRecord.B_Other_bridge_qfr,
              })(<InputNumber precision={2} name="B_Other_bridge_qfr"></InputNumber>)}
            </Item>
            <Item label="桥-Other_靶血管术后狭窄程度%" colon={false}>
              {getFieldDecorator("B_Other_target_vas_narrow_ratio_after", {
                rules: [{ required: true, message: "请录入桥-Other_靶血管术后狭窄程度%" }],
                initialValue: caseRecord.B_Other_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_Other_target_vas_narrow_ratio_after"></InputNumber>)}
            </Item>
            <Item label="桥-Other_靶血管术后QFR值" colon={false}>
              {getFieldDecorator("B_Other_target_vas_qfr_after", {
                rules: [{ required: true, message: "桥-Other_靶血管术后QFR值" }],
                initialValue: caseRecord.B_Other_target_vas_narrow_ratio_after,
              })(<InputNumber precision={2} name="B_Other_target_vas_qfr_after"></InputNumber>)}
            </Item>
            <Item label="备注" colon={false}>
              {getFieldDecorator("comments", {
                rules: [{ required: false, message: "备注" }],
                initialValue: caseRecord.comments,
              })(<Input.TextArea rows={2} name="comments"></Input.TextArea>)}
            </Item>

            <Item colon={false} className="case-record-form-item">
              <Button className="case-record-form-submit" type="default" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedCaseRecordForm = Form.create<CaseRecordFormProps>({
  name: "case_record_form",
  onFieldsChange(props, changedFields) {
    props.handleChange(changedFields);
  },
})(CaseRecordForm);

export default WrappedCaseRecordForm;
