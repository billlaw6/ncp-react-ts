import React, { FunctionComponent, useState, useRef } from "react";
import {
  Form,
  Button,
  Input,
  AutoComplete,
  InputNumber,
  Row,
  Col,
  Select,
  DatePicker,
  Radio,
} from "antd";
import { FormComponentProps } from "antd/es/form";
import moment, { Moment } from "moment";
import { connect, MapDispatchToProps } from "react-redux";

import { StoreStateI, RoleI } from "../../constants/interface";
import { ProfilePropsI, ProfileStateI, MapStateToPropsI, MapDispatchToPropsI } from "./type";
import { history } from "../../store/configureStore";
import { updateUserInfo, getDutyList, getRoleList, getWorkStatusList } from "../../services/user";

import "./Profile.less";

import { updateUserAction } from "../../store/actions/user";

const { Item } = Form;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface ProfileFormProps extends FormComponentProps { }

class ProfileForm extends React.Component<ProfileFormProps & ProfilePropsI, ProfileStateI> {
  constructor(props: ProfileFormProps & ProfilePropsI) {
    super(props);
    this.state = {
      // 本页面要用的字典
      roleList: [],
      dutyList: [],
      isEditable: true,
      isFever: false,
      foreignFlag: false,
      selectedRole: "",
    };
  }

  componentDidMount() {
    getDutyList()
      .then((res: any) => {
        this.setState({ dutyList: res.data });
      })
      .catch((error: any) => {
        console.log(error);
      });
    getRoleList()
      .then((res: any) => {
        this.setState({ roleList: res.data });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  cellPhoneValidator(rule: any, value: any, callback: Function): any {
    try {
      if (value) {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          throw new Error("手机号码有误，请修正");
        } else {
          callback();
        }
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  }

  // 提交修改
  handleSubmit = (e: any): void => {
    e.preventDefault();
    // console.log('submit');
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        // console.log(values);
        this.props.updateUserAction(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;

    return (
      <div className="profile">
        <div className="profile-header">个人信息编辑</div>
        <div className="profile-content">
          <Form className="profile-form" name="profile" onSubmit={this.handleSubmit}>
            <Item label="人员类别" colon={false}>
              {getFieldDecorator("role", {
                rules: [{ required: true, message: "请选择人员类别" }],
                initialValue: user.role,
              })(
                <Select
                  disabled={!this.state.isEditable}
                  showSearch
                  filterOption={(input, option) => {
                    // console.log(option.props.title);
                    if (
                      option!
                        .props!.title!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0 ||
                      option!
                        .props!.value!.toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }}
                  onChange={(value: string) => {
                    this.setState(
                      {
                        selectedRole: value,
                      },
                      () => {
                        // 修改完值后立即校验表单对应项
                        this.props.form.validateFields(["department"], { force: true });
                      },
                    );
                  }}
                >
                  {this.state.roleList.length > 0 ? (
                    this.state.roleList.map((item: RoleI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"empty"} value={"empty"} title={"empty"}>
                        Empty
                    </Option>
                    )}
                </Select>,
              )}
            </Item>
            <Item label="姓名" colon={false}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入姓名" }],
                initialValue: user.name,
              })(<Input disabled={!this.state.isEditable} type="text" name="name" />)}
            </Item>
            <Item label="性别" colon={false}>
              {getFieldDecorator("gender", {
                rules: [{ required: true, message: "请选择您的性别" }],
                initialValue: user.gender,
              })(
                <Select disabled={!this.state.isEditable}>
                  <Option value={0}>保密</Option>
                  <Option value={1}>男</Option>
                  <Option value={2}>女</Option>
                </Select>,
              )}
            </Item>
            <Item label="年龄" colon={false}>
              {getFieldDecorator("age", {
                rules: [{ required: true, message: "请录入您的年龄" }],
                initialValue: user.age ? user.age : 18,
              })(<Input disabled={!this.state.isEditable} type="number" name="age"></Input>)}
            </Item>
            <Item label="职务（普通职员还是干部，由人事处统一设定，不用个人编辑）" colon={false}>
              {getFieldDecorator("duty", {
                rules: [{ required: false, message: "所在位置为必填项" }],
                initialValue: user.duty,
              })(
                <Select disabled={true} dropdownClassName="profile-form-gender">
                  {this.state.dutyList.length > 0 ? (
                    this.state.dutyList.map((item: RoleI) => {
                      return (
                        <Option key={item.code} value={item.code} title={item.py}>
                          {item.name}
                        </Option>
                      );
                    })
                  ) : (
                      <Option key={"empty"} value={"empty"} title={"empty"}>
                        Empty
                    </Option>
                    )}
                </Select>,
              )}
            </Item>
            <Item label="手机" colon={false}>
              {getFieldDecorator("cell_phone", {
                rules: [
                  { required: false, message: "所在位置为必填项" },
                  { validator: this.cellPhoneValidator },
                ],
                initialValue: user.cell_phone,
              })(<Input disabled={false} type="number" name="cell_phone" />)}
            </Item>
            <Item colon={false} className="profile-form-item">
              <Button className="profile-form-submit" type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedProfileForm = Form.create<ProfileFormProps>({
  name: "profile_form",
  onFieldsChange(props, changedFields, allValues) {
    // console.log(changedFields);
  },
})(ProfileForm);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  updateUserAction: updateUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedProfileForm);
