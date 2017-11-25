import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import './style.css';
export default class View extends Component {
	constructor(props){
		super(props);
		this.state = {
			list:[],
			standardEnglish:[],
			slowEnglish:[],
			EnglishTeach:[],
			standardEnglishList:[],
			slowEnglishList:[],
			EnglishTeachList:[]
		}
		this.handleGetHeaderDataSucc = this.handleGetHeaderDataSucc.bind(this)
	}
	render() {
		const list = this.state.list.map((item,index) =>{
			return(
					<li className = 'header-item' key = {item.id}>{item.title}</li>
				)
		})
		const standardEnglish = this.state.standardEnglish.map((item,index) =>{
			return(				
					<div className = 'standardEnglish' style = {{width:item.width + 'px'}} key = {item.id}><Link to = {item.url}>{item.title}</Link>	</div>			
				)
		})
		const slowEnglish = this.state.slowEnglish.map((item,index) =>{
			return(
					<div className = 'slowEnglish' style = {{width:item.width + 'px'}} key = {item.id}><Link to = {item.url}>{item.title}</Link></div>
				)
		})
		const EnglishTeach = this.state.EnglishTeach.map((item,index) =>{
			return(
					<div className = 'EnglishTeach' style = {{width:item.width + 'px'}} key = {item.id}><Link to = {item.url}>{item.title}</Link></div>
				)
		})
		const standardEnglishList = this.state.standardEnglishList.map((item,index) =>{
			return(
					<div className = 'standardEnglish-item' key = {item.id}>{item.title}</div>
				)
		})
		const slowEnglishList = this.state.slowEnglishList.map((item,index) =>{
			return(
					<div className = 'slowEnglish-item' key = {item.id}>{item.title}</div>
				)
		})
		const EnglishTeachList = this.state.EnglishTeachList.map((item,index) =>{
			return(
					<div className = 'EnglishTeachList-item' key = {item.id}>{item.title}</div>
				)
		})
		return (
				<div className = 'index'>
					<div className = 'header'>
						<Link to = '/'>
							<img alt = "图片" className = 'header-img' src={require('../../statics/images/logo.png')}/>
						</Link>
						<ul className = 'header-list'>
							{list}
						</ul>												
					</div>
					<div className = 'EngType-con'>
							{standardEnglish}
							{slowEnglish}
							{EnglishTeach}
					</div>
					<div className = 'EngTypeList'>
						<div className = 'standardEnglish-list'>
								{standardEnglishList}
						</div>
						<div className = 'slowEnglish-list'>
								{slowEnglishList}
						</div>
						<div className = 'EnglishTeach-list'>
								{ EnglishTeachList}
						</div>
					</div>
					
					<div><div className = 'advert'>
						<span className ='hot-recommend'>热门推荐 :</span>
						<span className = 'Chrome'>谷歌提供的广告</span>
						<span className = 'voa'>Voa在线听</span>
						<span className = 'USA'>美国之sp音n</span>
						<span className = 'onlineEng'>在线听英语</span>
					</div>
						{this.props.children}
					</div>
					<div className = 'footer'>
						<p className = 'partner'>本网站由<a href="http://www.easyvoa.com" className = "net">EasyVOA</a>开发上线 @ 2011-2014 <a className = "phone">手机版EasyVOA</a></p>
						<p className = 'introduce'>网站所有内容，均来自VOA官方网站，所有资料均只作为英文学习资料使用。 站长QQ:1801785742 欢迎联系合作</p>
					</div>
				</div>
			)
	}
	componentDidMount(){

		axios.get('/header.json').then(this.handleGetHeaderDataSucc)
	}
	handleGetHeaderDataSucc(response){
		const{list,standardEnglish,slowEnglish,EnglishTeach,standardEnglishList,slowEnglishList,EnglishTeachList} = response.data.data;
		this.setState({
			list:list,
			standardEnglish:standardEnglish,
			slowEnglish:slowEnglish,
			EnglishTeach:EnglishTeach,
			standardEnglishList:standardEnglishList,
			slowEnglishList:slowEnglishList,
			EnglishTeachList:EnglishTeachList
		})

	}
}