import React from "react";
import { Form, Icon, Input, Button, DatePicker } from "antd";
import { FormComponentProps } from "antd/es/form";
import moment from "moment";
import { connect } from "react-redux";

import { StoreStateI } from "../../../constants/interface";
import { SearchFormPropsI, MapDispatchToPropsI, MapStateToPropsI } from "./type";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface SearchFormProps extends FormComponentProps {
  handleFieldsChange: any;
  handleSubmit: any;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalSearchForm extends React.Component<SearchFormProps & SearchFormPropsI, any> {
  componentDidMount() {
    // To disable submit button at the beginning.
    this.props.form.validateFields();
  }

  onSubmit = (e: any) => {
    const { handleSubmit } = this.props;
    console.log("on submit");
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        handleSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { caseRecordSearchForm } = this.props; // 析构出来避免后续this指向不明确

    // Only show error after a field is touched.
    const dtRangeError = isFieldTouched("dtRange") && getFieldError("dtRange");
    const keywordError = isFieldTouched("keyword") && getFieldError("keyword");
    return (
      <div className="search-form">
        <Form layout="inline" onSubmit={this.onSubmit}>
          <Form.Item
            label="填报时间"
            validateStatus={dtRangeError ? "error" : ""}
            help={dtRangeError || ""}
          >
            {getFieldDecorator("dtRange", {
              rules: [{ required: false, message: "Please input your dtRange!" }],
              // RangePicker的数据要及早转化成字符串传输，Moment类型不适宜
              initialValue: [
                moment(caseRecordSearchForm.start),
                moment(caseRecordSearchForm.end),
              ],
            })(<RangePicker showTime={true} format={dateFormat} />)}
          </Form.Item>
          <Form.Item
            label="关键词"
            validateStatus={keywordError ? "error" : ""}
            help={keywordError || ""}
          >
            {getFieldDecorator("keyword", {
              rules: [{ required: false, message: "Please input your keyword!" }],
              initialValue: this.props.caseRecordSearchForm.keyword,
            })(
              <Input
                prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="keyword"
                placeholder="患者姓名 病案号 录入人"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedHorizontalSearchForm = Form.create<SearchFormProps>({
  name: "horizontal_search",
  onFieldsChange(props, changedFields) {
    props.handleFieldsChange(changedFields);
  },
})(HorizontalSearchForm);

// export default WrappedHorizontalSearchForm;
const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  caseRecordSearchForm: state.caseRecordSearchForm,
  caseRecordStats: state.caseRecordStats,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  // setCaseRecordSearch: setCaseRecordListAction,
  // getCaseRecordList: getCaseRecordListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedHorizontalSearchForm);
