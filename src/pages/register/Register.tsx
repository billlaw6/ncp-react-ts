import React from "react";
import { Form, Button, Input } from "antd";
import { connect } from "react-redux";

import { StoreStateI } from "../../constants/interface";
import {
  RegisterPropsI,
  RegisterStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
} from "./type";
import { FormComponentProps } from "antd/es/form";

import "./Register.less";
import { registerUser } from "../../services/user";
import { setTokenAction, setUserAction, registerUserAction } from "../../store/actions/user";
import { history } from "../../store/configureStore";

const { Item } = Form;

interface RegisterFormProps extends FormComponentProps { }

class Register extends React.Component<RegisterFormProps & RegisterPropsI, RegisterStateI> {
  constructor(props: RegisterFormProps & RegisterPropsI) {
    super(props);
    this.state = {
      password1: "",
      registerErrors: {
        cell_phone: [],
        name: [],
        password1: [],
        password2: [],
        non_field_errors: [],
      },
    };
    this.password2Validator = this.password2Validator.bind(this); // 解决函数内部取不到props和state的问题
    this.handleSubmit = this.handleSubmit.bind(this); // 解决函数内部取不到props和state的问题
  }

  cellPhoneValidator(rule: any, value: any, callback: Function): any {
    console.log(value);
    try {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        throw new Error("手机号码有误，请修正");
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  }

  password2Validator(rule: any, value: any, callback: Function): any {
    // console.log(value);
    const { password1 } = this.state;
    // console.log(password1);
    try {
      if (password1 && value && password1 !== value) {
        throw new Error("两次密码输入不一样，请修正");
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  }

  // 提交修改
  handleSubmit = (e: any): void => {
    const { setTokenAction, setUserAction } = this.props;
    console.log("submit");
    const { registerErrors } = this.state;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        registerUser(values)
          .then((res: any) => {
            console.log(res.data);
            setTokenAction(res.data.token);
            setUserAction(res.data.user_info);
            history.push("/");
          })
          .catch((err: any) => {
            console.log(err.response.data);
            const newRegisterErrors = Object.assign(registerErrors, err.response.data);
            this.setState({ registerErrors: newRegisterErrors });
          });
      } else {
        console.error(err);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;
    const { registerErrors } = this.state;
    return (
      <section className="register">
        <div className="register-content">
          <div className="register-header">注册用户</div>
          <Form className="register-form" name="register" onSubmit={this.handleSubmit}>
            <div className="register-form-info">
              <Item label="手机号码" colon={false}>
                {getFieldDecorator("cell_phone", {
                  rules: [
                    { required: true, message: "请输入您的手机号" },
                    { validator: this.cellPhoneValidator },
                  ],
                  initialValue: "",
                })(<Input disabled={false} type="string" name="cell_phone" />)}
                <div className="register-form-validate-error">
                  {registerErrors.cell_phone.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item label="姓名" colon={false}>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "请输入您的姓名" },
                    { min: 2, message: "至少两个字符" },
                    { max: 10, message: "名字太长，用简短昵称吧" },
                  ],
                  initialValue: "",
                })(<Input disabled={false} type="string" name="name" />)}
                <div className="register-form-validate-error">
                  {registerErrors.name.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item label="密码" colon={false}>
                {getFieldDecorator("password1", {
                  rules: [
                    { required: true, message: "请输入您的密码" },
                    { min: 6, message: "密码至少6位字符" },
                    { max: 12, message: "长得我都校验不出来啦" },
                  ],
                  initialValue: "",
                })(
                  <Input
                    disabled={false}
                    type="password"
                    name="password1"
                    onChange={(e: any) => {
                      this.setState(
                        {
                          password1: e.target.value,
                        },
                        () => { },
                      );
                    }}
                  />,
                )}
                <div className="register-form-validate-error">
                  {registerErrors.password1.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item label="重复密码" colon={false}>
                {getFieldDecorator("password2", {
                  rules: [
                    { required: true, message: "请重复输入您的密码" },
                    { validator: this.password2Validator },
                  ],
                  trigger: "onChange",
                  initialValue: "",
                })(<Input disabled={false} type="password" name="password2" />)}
                <div className="register-form-validate-error">
                  {registerErrors.password2.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item>
                <div className="login-form-validate-error">
                  {registerErrors.non_field_errors.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item style={{textAlign: "center"}}>
                <Button
                  className="register-form-submit"
                  type="default"
                  htmlType="submit"
                >
                  注册
                </Button>
              </Item>
            </div>
          </Form>
        </div>
      </section>
    );
  }
}

const WrappedRegister = Form.create<RegisterFormProps & RegisterPropsI>({
  name: "register_form",
  onFieldsChange(props, changedFields) {
    // console.log(changedFields);
  },
})(Register);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  setTokenAction: setTokenAction,
  registerUserAction: registerUserAction,
  setUserAction: setUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegister);
