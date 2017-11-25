import React, { Component } from 'react';
import style from './listStyle.mcss';
import { connect } from "react-redux";
import axios from 'axios';
import { getListInfo } from './actionCreate';
import Echarts from 'echarts';
class List extends Component{
	render(){
		const list = this.props.list.map((item,index) =>{
			return (
					<li className = {style['list-item']} key = {item.id}>
					<span>[{item.category}]</span>&nbsp;&nbsp;
					<span>{item.title}</span>&nbsp;&nbsp;
					<span>[{item.time}]</span>
					</li>
				)
		})
		const content = this.props.content.map((item,index) =>{
			return (
					<div className = {style['list-title']} key = {item.id}>{item.title}</div>
				)
		})

		return(
				<div className = {style['list-content']}>
					{content}
					<ul className = {style['list-list']}>
						{list}
					</ul>
				<div className = {style['table']} ref={(elem) => {this.echartsContainer = elem}} style={{width:1022+'px',height:400+'px'}}></div>
				</div>
			)
	}
	componentDidMount(){
		 var myChart = Echarts.init(this.echartsContainer).setOption({
		 	backgroundColor: '#EDF8FC',
		    visualMap: {
		        show: false,
		        min: 80,
		        max: 600,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
            series : [{
	            name: '访问来源',
	            type: 'pie',
	            radius: '55%',
	            data:[
	                {value:235, name:'视频广告'},
	                {value:274, name:'联盟广告'},
	                {value:310, name:'邮件营销'},
	                {value:335, name:'直接访问'},
	                {value:400, name:'搜索引擎'}
	            ],
            roseType: 'angle',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(145, 125, 125, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
        });

		this.getIndexInfo();
	}
	componentWillReceiveProps(nextProps){
		if(this.props.params.id !== nextProps.routeParams.id){
			this.getIndexInfo(nextProps.routeParams.id)
		}
	}
	getIndexInfo(id){
		id = id || this.props.params.id;
		axios.get("/list.json?id="+ id)
		.then(this.props.handleGetIndexDataSucc.bind(this))
		this.handleTable();
	}
	handleTable(){
		var table = this.props.table
		console.log(table)
	}
}
const mapStateToProps = (state) => ({
	list:state.list.listdata.list,
	content:state.list.listdata.content,
	table:state.list.listdata.table
})
const mapDispatchToProps = (dispatch) => ({
	handleGetIndexDataSucc:(res) => {
		const {content,list} = res.data.data;
		dispatch(getListInfo(content,list));
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(List)