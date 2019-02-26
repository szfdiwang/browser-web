import echarts from 'echarts'
import 'echarts-gl';
import 'echarts/map/js/world';
// import store from '@/vuex/store'
/*
 * fun init(ele, option) 初始化
 *  @param ele 必传
 *  @param option 必传
 *
 * fun update(updateOption) 更新数据
 * fun changeTitle(title) 改变标题
 * fun resize() 重置图表尺寸
 */
let data=require('../../static/json/data.json')
data = data.filter(function (dataItem) {
    return dataItem[2] > 0;
}).map(function (dataItem) {
    return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
});
let data1=[],data2=[],data3=[]
// data.map((item,index) => {
//     if (index < 1000) {
//         data1.push(item)
//     } else if (index < 2000) {
//         data2.push(item)
//     } else {
//         data3.push(item)
//     }
// })
// console.log('data111',data)
class ChartService {
    // worldMapOption = {
    //   // backgroundColor: '#fff',
    //   geo: {
    //     map: 'world',
    //     roam: 'scale',
    //     label: {
    //       emphasis: {
    //         show: false
    //       }
    //     },
    //     silent: true,
    //     itemStyle: {
    //       normal: {
    //         areaColor: '#323c48',
    //         borderColor: '#111'
    //       },
    //       emphasis: {
    //         areaColor: '#2a333d'
    //       }
    //     },
    //     scaleLimit: {
    //       min: 0.5,
    //       max: 1.5
    //     }
    //   },
    //   series: [{
    //     name: '弱',
    //     type: 'scatterGL',
    //     progressive: 1e6,
    //     coordinateSystem: 'geo',
    //     symbolSize: ((level) => {
    //       switch (level) {
    //         case 1:
    //           return 1;
    //           break;
    //         case 2:
    //           return 5;
    //           break;
    //         case 3:
    //           return 10;
    //           break;
    //         default:
    //           return 1;
    //           break;
    //       }
    //     })(2), //store.state.common.baseConfig.worldMapSymbolLevel
    //     zoomScale: 0.002,
    //     blendMode: 'lighter',
    //     large: true,
    //     itemStyle: {
    //       color: 'rgb(20, 15, 2)'
    //     },
    //     postEffect: {
    //       enable: true
    //     },
    //     silent: true,
    //     dimensions: ['lng', 'lat'],
    //     data: new Float32Array()
    //   }]
    // }

    worldMapOption = {
        tooltip: {
            show:true,
            trigger: 'item',
        },
        geo: {
            map: 'world',
            roam: false,
            zoom: 0.9,
            label: {
                emphasis: {
                    show: false
                }
            },
            silent: true,
            itemStyle: {
                normal: {
                    // areaColor: 'transparent',
                    areaColor: '#242C51',
                    borderColor: 'transparent',
                    // borderWidth: 1.5,
                    // shadowColor: 'rgba(63, 218, 255, 0.3)',
                    shadowBlur: 2
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            },
            scaleLimit: {
                min: 0.5,
                max: 1.5
            }
        },
        series: [
            {
                name:'共识节点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: [],
                symbolSize: 6,
                showEffectOn: 'render',
                rippleEffect: {
                    period: 5,
                    scale: 6,
                    brushType: 'fill'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,0,1)',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            },
            {
                name: '普通节点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: [],
                symbolSize: 6,
                showEffectOn: 'render',
                rippleEffect: {
                    period: 5,
                    scale: 6,
                    brushType: 'fill'
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(44,213,230,0.8)',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
              zlevel: 1
            },
            {
                name: '异常离线节点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: [],
                symbolSize: 4,
                itemStyle: {
                    normal: {
                        color: '#b0b0b0',
                    }
                }
            }
        ]
    }
    earthOption = {
        // backgroundColor: '#000',
        globe: {
            baseTexture: '../../static/images/earth2.jpg',
            heightTexture: 'http://echarts.baidu.com/examples/data-gl/asset/bathymetry_bw_composite_4k.jpg',
            shading: 'color',
            light: {
                ambient: {
                    intensity: 0.4
                },
                main: {
                    intensity: 0.4
                }
            },
            viewControl: {
                autoRotate: true,
                zoomSensitivity:0
            },
            top: '5%',
            bottom:'8%',
            globeRadius:70,
        },
        series: [{
            name: '共识节点',
            type: 'scatter3D',
            coordinateSystem: 'globe',
            data: data1,
            symbol:'pin',
            symbolSize: 13,
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,0,1)',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }, {
                name: '普通节点',
                type: 'scatter3D',
                coordinateSystem: 'globe',
                data: data2,
                symbol:'arrow',
                //   symbolSize: 10,
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: 'rgba(44,213,230,0.8)',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }, {
                name: '异常离线节点',
                type: 'scatter3D',
                coordinateSystem: 'globe',
                blendMode: 'lighter',
                symbol:'pin',
                itemStyle: {
                    color: '#b0b0b0',
                    opacity: 1
                },
                data:data3
            }]
    }

    constructor() {
        this.chart = null
        this.ele = null
        this.blocklineOption = {
            grid: {
                show: false,
                left:'3%',
            },
            //提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#2F3753',
                            fontSize: '16'
                        },
                        // interval: 2,
                        rotate: 50,
                    },
                    splitLine: {
                        show: true,
                        interval: 0,
                        lineStyle: {
                            color: ['#2b66f3'],
                            opacity: 0.1,
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '2b66f3',
                            width: 1
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}s',
                        textStyle: {
                            color: '#2F3753',
                            fontSize: '16'
                        }
                    },
                    splitLine: {
                        show: true,
                        interval: 0,
                        lineStyle: {
                            color: ['#2b66f3'],
                            opacity: 0.1,
                            type: 'dashed',
                            width: 1
                        }
                    },
                },
                {
                    type: 'value',
                    name: '',
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#2F3753',
                            fontSize: '16'
                        }
                    },
                    splitLine: {
                        show: false,
                        interval: 1,
                        lineStyle: {
                            color: ['#2b66f3'],
                            opacity: 0,
                            type: 'dashed',
                            width: 1
                        }
                    },
                },

            ],
            series: [
                {
                    name: '出块时间',
                    type: 'line',
                    yAxisIndex: 0,
                    // data: [1, 2.3, 4, 3, 3.5, 4],去掉默认数据
                    data: [],
                    lineStyle: {
                        color: '#2FAAF8',
                        width: 2,
                        shadowBlur: 4,
                        shadowColor: 'rgba(42, 63, 131, 0.50)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 4
                    },
                    // smooth:true,
                    itemStyle: {
                        color: '#2FAAF8',
                        borderColor: '#2FAAF8',
                        boredrWidth: 0,
                        opacity: 0,
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(17,66,250,0.20)'
                        }, {
                            offset: 1,
                            color: 'rgba(35,112,160,0.05)'
                        }])
                    },
                    symbol: 'none', //去掉折线图中的节点
                    smooth: true //true 为平滑曲线，false为直线
                },
                {
                    name: '交易数量',
                    type: 'bar',
                    yAxisIndex: 1,
                    smooth: true,
                    // data: [20, 4, 5, 30, 14, 25], 去掉默认数据
                    data: [],
                    itemStyle: {
                        color: '#30EAF6',
                        opacity: 0.3
                    },
                    barWidth: 10
                }
            ]
        }
    }
    init(ele, option) {
        this.ele = ele
        //基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(ele)
        this.chart.setOption(option)
    }
    update(updateOption) {
        this.chart ? this.chart.setOption(updateOption) : console.warn('请先执行init方法')
    }
    changeTitle(title) {
        this.echart ? this.echart.setOption({
            title: {
                text: title,
            },
        }) : console.warn('请先执行init方法')
    }
    resize() {
        return this.echart.resize()
    }
}
export default ChartService