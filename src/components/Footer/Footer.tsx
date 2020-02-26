import React, { ReactElement } from "react";
import { Layout, Icon } from "antd";

import "./Footer.less";

const { Footer: AntdFooter } = Layout;

const Footer = (): ReactElement => (
  <AntdFooter id="footer">
    <span>
      <Icon type="copyright"></Icon>2020
    </span>
    <a href="http://beian.miit.gov.cn">京ICP备15010364号-2</a>
  </AntdFooter>
);

export default Footer;
