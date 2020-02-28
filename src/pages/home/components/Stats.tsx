import React from "react";
import { connect } from "react-redux";

import { StoreStateI } from "../../../constants/interface";
import { MapStateToPropsI } from "./type";
// import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { statsCaseRecordList } from "../../../services/report";

export interface StatsStateI {
  xAxisColumns: string[];
  statsCaseRecord: {
    branch_stats: any[];
    dept_stats: any[];
  };
}

class Stats extends React.Component<MapStateToPropsI, StatsStateI> {
  constructor(props: MapStateToPropsI) {
    super(props);
    this.state = {
      xAxisColumns: [],
      statsCaseRecord: {
        branch_stats: [],
        dept_stats: [],
      },
    };
    this.getOption = this.getOption.bind(this); //
  }
  componentDidMount() {
    const { caseRecordSearchForm } = this.props;
    statsCaseRecordList(caseRecordSearchForm)
      .then(res => {
        this.setState({
          statsCaseRecord: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        // history.push("/login");
      });
  }

  getOption() {
    // const { xAxisColumns, statsCaseRecord } = this.state;
    const { caseRecordStats } = this.props;
    return {
      title: {
          text: "报告统计",
          // subtext: '',
          left: '50%',
          textAlign: 'center',
          textStyle: {
              fontSize: 16,
              color: '#000',
          }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          "总病历数",
        ],
        top: "10%",
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
        },
      ],
      yAxis: [
        {
          type: "category",
          data: (() => {
            let yColumns: string[] = [];
            caseRecordStats.forEach((item: any) => {
              if (yColumns.indexOf(item[1]) === -1) {
                yColumns.push(item[1]);
              }
            });
            return yColumns;
          })(),
        },
      ],
      series: [
        {
          name: "总报告数",
          type: "bar",
          label: {
            show: false,
            position: "insideRight",
          },
          data: (() => {
            let yColumns: string[] = [];
            let empCount: number[] = [];
            caseRecordStats.forEach((item: any) => {
              let index = yColumns.indexOf(item[1]);
              // 科室没出现过增加对应数据元素
              if (index === -1) {
                yColumns.push(item[1]);
                empCount.push(item[5]);
              } else {
                // 科室出现过，在对应数据元素节点上累加
                empCount[index] = empCount[index] + item[5];
              }
            });
            return empCount;
          })(),
          color: "#0780cf",
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <ReactEcharts
          notMerge={true}
          lazyUpdate={true}
          style={{ width: "100%", height: "300px" }}
          // theme={"dark"}
          // onChartReady={this.onCharReadyCallback}
          // onEvents={EventsDict}
          // opts={}
          option={this.getOption()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  user: state.user,
  caseRecordSearchForm: state.caseRecordSearchForm,
  caseRecordStats: state.caseRecordStats,
});
export default connect(mapStateToProps)(Stats);
