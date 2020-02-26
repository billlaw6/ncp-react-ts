import React, { Component, ReactElement } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";

/* components */
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { StoreStateI } from "../../constants/interface";

/* style */
import "./Default.less";

/* action */
import { logoutUserAction } from "../../store/actions/user";

const { Content } = Layout;

class DefalutLayout extends Component<StoreStateI & MapDispatchToPropsI> {
  render(): ReactElement {
    const { children, user, logout } = this.props;
    const { name, emp_code: empCode, cell_phone: cellPhone, duty } = user;

    return (
      <Layout id="defaultLayout">
        <Header
          empCode={empCode}
          name={name}
          cellPhone={cellPhone}
          logout={logout}
          duty={duty}
        ></Header>
        <Content id="content">{children}</Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: StoreStateI): StoreStateI => state;
interface MapDispatchToPropsI {
  logout: typeof logoutUserAction;
}
const mapDispatchToProps: MapDispatchToPropsI = {
  logout: logoutUserAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(DefalutLayout);
