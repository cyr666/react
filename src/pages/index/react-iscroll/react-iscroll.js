import React, { Component } from 'react';
import axios from 'axios';
import style from '../indexStyle.mcss';
import { Link } from 'react-router';
import Swiper from '../../../../node_modules/swiper/dist/js/swiper.js';
import './reactIscroll.css';
export default class iscroll extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:[]
		}
	}
	render(){
		const list = this.state.list.map((item,index)=>{
			return(
				
				<li key = {item.id}>
					<Link to = {item.link}>
						<span className = {style['category']}>[ {item.category} ]</span>
						<span className = {style['item-title']}>{item.title}</span> 
						<span className = {style['item-time']}>({item.time})</span>
					</Link>
				</li>
				
				)
		})
		return (
		<div className="index">
			<div className='swiper-container' ref ={(elem)=>{this.swipercontainer=elem}}>
				<div className="swiper-wrapper">
					<ul className = 'swiper-slide'>
						{list}
					</ul>
				</div>
			</div>
		</div>
		)
	}
	componentDidMount(){
		var swiper = new Swiper(this.swipercontainer, {
      	direction: 'vertical',
      	slidesPerView: 'auto',
      	freeMode: true,
      	scrollbar: {
       		el: '.swiper-scrollbar',
      	},
      	mousewheel: true,
    });

		this.getInfo()
	}
	getInfo(){
		axios.get('/index.json')
		.then(this.handleGetInfoSucc.bind(this))
	}
	handleGetInfoSucc(res){
		console.log(res)
		const {list} = res.data.data
		this.setState({
			list:list
		})
	}
}