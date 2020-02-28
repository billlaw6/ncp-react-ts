import React from "react";
import { connect } from "react-redux";

import { StoreStateI } from "../../constants/interface";
import { CaseRecordPropsI, CaseRecordStateI, MapStateToPropsI, MapDispatchToPropsI } from "./type";
import { Row, Col, Button } from "antd";
import WrappedCaseRecordForm from "./components/CaseRecordForm";
// import { history } from "../../store/configureStore";
import { submitCaseRecord, getVasTypeList, getFlowStatusList } from "../../services/report";

import "./CaseRecord.less";

import { setCaseRecordAction, setCaseRecordListAction } from "../../store/actions/report";
import { baseURL } from "../../services/api";
import axios from "axios";


class CaseRecord extends React.Component<CaseRecordPropsI, CaseRecordStateI> {
    constructor(props: CaseRecordPropsI) {
        super(props);
        this.state = {
            vasTypeList: [],
            flowStatusList: [],
        };
    }

    componentDidMount() {
        getVasTypeList().then((res) => {
            // console.log(res);
            this.setState({ vasTypeList: res.data })
        }).catch((err) => {
            console.log(err);
        })
        getFlowStatusList().then((res) => {
            // console.log(res);
            this.setState({ flowStatusList: res.data })
        }).catch((err) => {
            console.log(err);
        })
    }

    // 提交修改
    handleSubmit = (e: any): void => {
        e.preventDefault();
        console.log(e.target);
        e.target.validateFields((err: any, values: any) => {
            if (!err) {
                submitCaseRecord(values).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            }
        });
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
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                let a = document.createElement("a");
                let objectUrl = window.URL.createObjectURL(blob); // 创建下载链接
                a.href = objectUrl;
                // a.download = (new Date().valueOf()).toString + ".xlsx";
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

    handleChange = (changedFields: any): void => {
        const { caseRecord, setCaseRecordAction } = this.props;
        let newCaseRecord = JSON.parse(JSON.stringify(caseRecord));
        Object.keys(changedFields).forEach((key: string) => {
            // console.log(changedFields[key].name);
            // console.log(changedFields[key].value);
            let prop: any = {}
            prop[changedFields[key].name] = changedFields[key].value;
            Object.assign(newCaseRecord, prop);
        })
        setCaseRecordAction(newCaseRecord);
    };

    render() {
        const { caseRecord } = this.props;
        const { vasTypeList, flowStatusList } = this.state;
        return (
            <div className="case-record">
                <WrappedCaseRecordForm
                    vasTypeList={vasTypeList}
                    flowStatusList={flowStatusList}
                    caseRecord={caseRecord}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />
                <Row>
                    <Col>
                        <Button
                            style={{
                                margin: "15px",
                                float: "right",
                            }}
                            onClick={this.handleDownloadClick}
                        >
                            下载报告到Excel文件
                    </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
    user: state.user,
    caseRecord: state.caseRecord,
    caseRecordSearchForm: state.caseRecordSearchForm,
});
const mapDispatchToProps: MapDispatchToPropsI = {
    setCaseRecordAction: setCaseRecordAction,
    setCaseRecordListAction: setCaseRecordListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(CaseRecord);