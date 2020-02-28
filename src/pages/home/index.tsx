/* eslint-disable @typescript-eslint/camelcase */
import React, { ReactElement, Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Table, Modal } from "antd";
import moment from "moment";
import { StoreStateI } from "../../constants/interface";

import { MapStateToPropsI, HomePropsI, HomeStateI, MapDispatchToPropsI } from "./type";
import {
  setCaseRecordSearchAction,
  getCaseRecordListAction,
  checkCaseRecordListAction,
  setCaseRecordStatsAction,
} from "../../store/actions/report";

import { TableEventListeners } from "antd/lib/table";
import SearchForm from "./components/SearchForm";
import { baseURL } from "../../services/api";
import { statsCaseRecordList } from "../../services/report";
import axios from "axios";
import "./Home.less";
import Stats from "./components/Stats";

const dateFormat = "YYYY-MM-DD HH:mm:ss";

class Home extends Component<HomePropsI, HomeStateI> {
  constructor(props: HomePropsI) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      redirectReport: false,
      isDeptReporter: false,
      statsCaseRecord: {
        branch_stats: [],
        dept_stats: [],
      },
    };
    this.handleFieldsChange = this.handleFieldsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); //
  }
  // 传给检索表单
  handleFieldsChange = (changedValues: any) => {
    const { caseRecordSearchForm, setCaseRecordSearchAction } = this.props;
    // 此时收到的还是Moment类型
    if (changedValues.hasOwnProperty("dtRange")) {
      // console.log(changedValues.dtRange.value.length);
      if (changedValues.dtRange.value.length > 0) {
        const start = changedValues.dtRange.value[0].locale("zh-cn").format(dateFormat);
        const end = changedValues.dtRange.value[1].locale("zh-cn").format(dateFormat);
        const keyword = caseRecordSearchForm.keyword;
        setCaseRecordSearchAction({ start: start, end: end, keyword: keyword });
      }
    }
    if (changedValues.hasOwnProperty("keyword")) {
      const start = caseRecordSearchForm.start;
      const end = caseRecordSearchForm.end;
      const keyword = changedValues.keyword.value;
      setCaseRecordSearchAction({ start: start, end: end, keyword: keyword });
    }
  };

  // 传给检索表单
  handleSubmit = (submitedData: any) => {
    const { caseRecordSearchForm, setCaseRecordStatsAction } = this.props;
    // console.log(submitedData);
    // console.log(this.props.caseRecordSearchForm);
    this.props.getCaseRecordListAction(this.props.caseRecordSearchForm);
    // 获取相应统计分析数据
    statsCaseRecordList(caseRecordSearchForm)
      .then(res => {
        this.setState({
          statsCaseRecord: res.data,
        });
        setCaseRecordStatsAction(res.data)
      })
      .catch(err => {
        console.log(err);
        // history.push("/login");
      });
  };

  componentDidMount(): void {
    const { user, caseRecordSearchForm, getCaseRecordListAction } = this.props;
    if (user.groups.indexOf(1) && user.groups.indexOf(2)) {
      this.setState({ isDeptReporter: true });
    }
    // console.log(caseRecordSearchForm);
    getCaseRecordListAction(caseRecordSearchForm);
  }

  showConfirm = (): void => {
    Modal.confirm({
      centered: true,
      className: "del-confirm",
      title: "确认审核",
      content: "确认审核所选病例吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async (): Promise<void> => {
        const { selectedRowKeys } = this.state;
        const { checkCaseRecordListAction } = this.props;
        // console.log("check selected reports: ", selectedRowKeys);
        checkCaseRecordListAction(selectedRowKeys);
        this.setState({
          selectedRowKeys: [],
        });
      },
      onCancel: (): void => {
        this.setState({
          selectedRowKeys: [],
        });
      },
    });
  };

  onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleDownloadClick = () => {
    const { caseRecordSearchForm } = this.props;
    // console.log("donwload clicked");
    const downloadUrl = baseURL + "report/case/download/";
    axios({
      method: "get",
      url: downloadUrl,
      params: caseRecordSearchForm,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        // "X-Requested-With": "XMLHttpRequest",
        // "Content-Type": "application/x-download;charset=utf-8",
        // "Content-Dispositin": "attachment;filename=abc.xlsx",
      },
      responseType: "blob",
    }).then((res: any) => {
      // let blob = new Blob([res]);
      if (res.data) {
        // let blob = new Blob([res.data]);
        let blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        let a = document.createElement("a");
        let objectUrl = window.URL.createObjectURL(blob); // 创建下载链接
        a.href = objectUrl;
        a.download = ((new Date()).valueOf()).toString() + ".xlsx";
        document.body.appendChild(a);
        a.click(); // 点击下载
        // a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        document.body.removeChild(a);
        window.URL.revokeObjectURL(objectUrl); // 释放掉blob对象
      } else {
        console.error("no data");
      }
    }).catch((err) => {
      console.error(err);
    });
  };
  

  render(): ReactElement {
    const { caseRecordList } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    // const hasSelected = selectedRowKeys.length > 0;
    const columns: any = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: any): ReactElement | string => {
          // const { id } = record;
          return (
            <span>
              <span>{text}</span>
            </span>
          );
        },
        sorter: (a: any, b: any) => {
          return a.name.localeCompare(b.name, "zh-CN");
        },
      },
      {
        title: "病案号",
        dataIndex: "patient_no",
        key: "patient_no",
        render: (text: string, record: any): ReactElement | string => {
          return (
            <span>
              <span>{text}</span>
            </span>
          );
        },
        sorter: (a: any, b: any) => {
          return a.patient_no.localeCompare(b.patient_no, "zh-CN");
        },
      },
      {
        title: "入院日期",
        dataIndex: "check_in_date",
        key: "check_in_date",
        render: (value: string) => {
          const dt = moment(new Date(value));
          // console.log(dt.valueOf());
          return <span> {dt.format(dateFormat)} </span>;
        },
        sorter: (a: any, b: any) => {
          // console.log(a);
          const a1 = new Date(a.check_in_date).valueOf();
          const b1 = new Date(b.check_in_date).valueOf();
          return a1 - b1;
        },
      },
      {
        title: "出院日期",
        dataIndex: "check_out_date",
        key: "check_out_date",
        render: (value: string) => {
          const dt = moment(new Date(value));
          // console.log(dt.valueOf());
          return <span> {dt.format(dateFormat)} </span>;
        },
        sorter: (a: any, b: any) => {
          // console.log(a);
          const a1 = new Date(a.check_out_date).valueOf();
          const b1 = new Date(b.check_out_date).valueOf();
          return a1 - b1;
        },
      },
      {
        title: "手术日期",
        dataIndex: "operate_date",
        key: "operate_date",
        render: (value: string) => {
          const dt = moment(new Date(value));
          // console.log(dt.valueOf());
          return <span> {dt.format(dateFormat)} </span>;
        },
        sorter: (a: any, b: any) => {
          // console.log(a);
          const a1 = new Date(a.operate_date).valueOf();
          const b1 = new Date(b.operate_date).valueOf();
          return a1 - b1;
        },
      },
      {
        title: "影像日期",
        dataIndex: "radio_date",
        key: "radio_date",
        render: (value: string) => {
          const dt = moment(new Date(value));
          // console.log(dt.valueOf());
          return <span> {dt.format(dateFormat)} </span>;
        },
        sorter: (a: any, b: any) => {
          // console.log(a);
          const a1 = new Date(a.radio_date).valueOf();
          const b1 = new Date(b.radio_date).valueOf();
          return a1 - b1;
        },
      },
      {
        title: "填报日期",
        dataIndex: "created_at",
        key: "created_at",
        render: (value: string) => {
          const dt = moment(new Date(value));
          // console.log(dt.valueOf());
          return <span> {dt.format(dateFormat)} </span>;
        },
        sorter: (a: any, b: any) => {
          // console.log(a);
          const a1 = new Date(a.created_at).valueOf();
          const b1 = new Date(b.created_at).valueOf();
          return a1 - b1;
        },
      },
      {
        title: "备注",
        dataIndex: "comments",
        key: "comments",
      },
      {
        title: "填报人",
        dataIndex: "reporter_name",
        key: "reporter_name",
        render: (value: string) => {
          return <span> {value}</span>;
        },
        sorter: (a: any, b: any) => {
          return a.reporter_name.localeCompare(b.reporter_name, "zh-CN");
        },
      },
      // {
      //   title: '操作',
      //   key: 'action',
      //   render: (text: string, record: CaseRecordI) => {
      //     return (
      //       <span>
      //         删除
      //       </span>
      //     )
      //   }
      // }
    ];

    return (
      <div className="case-record">
        <div className="case-record-header">病历列表</div>
        <Row type="flex" justify="start">
          <Col sm={24} xs={24}>
            <SearchForm
              handleFieldsChange={this.handleFieldsChange}
              handleSubmit={this.handleSubmit}
            ></SearchForm>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col sm={24} xs={24}>
            <section className="case-record-summary">
              共检索到{caseRecordList.length}份数据
            </section>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="start"
          style={{
            display: "none",
            marginTop: "20px",
          }}
        >
          <Col span={24}>
            <Stats></Stats>
          </Col>
        </Row>
        <div className="case-record-table-div">
          <Row type="flex" justify="start" className="case-record-link">
            <Col span={12}>
              <h3>病历录入</h3>
            </Col>
            <Col offset={6} span={6}>
              <a href="/case-record">新录入</a>
            </Col>
          </Row>
          <Table
            ref="case-record-table"
            rowSelection={rowSelection}
            className="case-record-list case-record-list-table"
            rowKey={record => record.id}
            columns={columns}
            dataSource={caseRecordList}
            onRow={(record): TableEventListeners => {
              return {
                onClick: (): void => {
                  // this.onClickItem(record.id);
                },
              };
            }}
          ></Table>

          <Row>
            <Col>
              <Button
                style={{
                  margin: "15px",
                  float: "right",
                }}
                onClick={this.handleDownloadClick}
              >
                下载病历到Excel文件
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  token: state.token,
  caseRecordList: state.caseRecordList,
  caseRecordSearchForm: state.caseRecordSearchForm,
  caseRecordStats: state.caseRecordStats,
});
const mapDispatchToProps: MapDispatchToPropsI = {
  setCaseRecordSearchAction: setCaseRecordSearchAction,
  getCaseRecordListAction: getCaseRecordListAction,
  checkCaseRecordListAction: checkCaseRecordListAction,
  setCaseRecordStatsAction: setCaseRecordStatsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
