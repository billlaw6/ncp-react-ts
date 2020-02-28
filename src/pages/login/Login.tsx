import React from "react";
import { Form, Button, Input } from "antd";
import { connect } from "react-redux";

import { StoreStateI } from "../../constants/interface";
import {
  LoginPropsI,
  LoginStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
} from "./type";
import { FormComponentProps } from "antd/es/form";

import "./Login.less";
import { loginUser, getUserInfo } from "../../services/user";
import { setTokenAction, setUserAction } from "../../store/actions/user";
import { history } from "../../store/configureStore";
// import axios from "axios";
// import qs from "qs";

const { Item } = Form;

interface LoginFormProps extends FormComponentProps { }

class Login extends React.Component<LoginFormProps & LoginPropsI, LoginStateI> {
  constructor(props: LoginFormProps & LoginPropsI) {
    super(props);
    this.state = {
      loginErrors: {
        username: [],
        password: [],
        non_field_errors: [],
      },
    };
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

  // 提交修改
  handleSubmit = (e: any): void => {
    const { setTokenAction, setUserAction } = this.props;
    console.log("submit");
    const { loginErrors } = this.state;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 登录前清空原Token，避免无效Token401错误
        setTokenAction("");
        await loginUser(values)
          .then((res: any) => {
            console.log(res);
            setTokenAction(res.data.key);
            history.push("/case-record");
          })
          .catch((err: any) => {
            // console.log(err);
            if (err.response){
              const newLoginErrors = Object.assign(loginErrors, err.response.data);
              this.setState({ loginErrors: newLoginErrors });
            }
          });
        getUserInfo().then((res: any) => {
          // console.log(res.data);
          setUserAction(res.data);
          history.push("/case-record");
        }).catch((err) => {
          console.log(err);
        })
      } else {
        console.error(err);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;
    const { loginErrors } = this.state;
    return (
      <section className="login">
        <div className="login-content">
          <div className="login-header">系统登录</div>
          <Form className="login-form" name="login" onSubmit={this.handleSubmit}>
            <div className="login-form-info">
              <Item label="用户名" colon={false}>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "请输入您的用户名" },
                    { min: 2, message: "最少两个字符" },
                    { max: 10, message: "最多10个字符" },
                  ],
                  initialValue: "84464",
                })(<Input disabled={false} type="string" name="username" />)}
                <div className="login-form-validate-error">
                  {loginErrors.username.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item label="密码" colon={false}>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "请输入您的密码" },
                    { min: 6, message: "密码至少6位字符" },
                    { max: 12, message: "长得我都校验不出来啦" },
                  ],
                  initialValue: "111111",
                })(
                  <Input
                    disabled={false}
                    type="password"
                    name="password"
                  />,
                )}
                <div className="login-form-validate-error">
                  {loginErrors.password.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item>
                <div className="login-form-validate-error">
                  {loginErrors.non_field_errors.map(item => {
                    return <li>{item}</li>;
                  })}
                </div>
              </Item>
              <Item style={{ textAlign: "center" }}>
                <Button
                  className="login-form-submit"
                  type="default"
                  htmlType="submit"
                >
                  登录
                </Button>
              </Item>
            </div>
          </Form>
        </div>
      </section>
    );
  }
}

const WrappedLogin = Form.create<LoginFormProps & LoginPropsI>({
  name: "login_form",
  onFieldsChange(props, changedFields) {
    // console.log(changedFields);
  },
})(Login);

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  setTokenAction: setTokenAction,
  setUserAction: setUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin);
