import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import style from './detailStyle.mcss';
import '../../statics/swiper/swiper.css';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.js';
import { getDetailInfo } from './actionCreate'; 
class Detail extends Component {
	constructor(props){
		super(props);
		this.hanldPlay = this.hanldPlay.bind(this);	
		this.handlePause = this.handlePause.bind(this);
		this.handleScrollChange =this.handleScrollChange.bind(this);	
	}
	render(){
		return(
			<div className = {style['detail']}>
				<div className = {style['VOA-teach']}>VOA > VOA教学英语 > AS IT IS ></div>
				<div className='swiper-container' ref = {(elem) =>{this.swiperContainer = elem}}>
				    <div className='swiper-wrapper'>
					    <img alt = "pho" className='swiper-slide' src={require('../../statics/images/swiper1.jpg')}/>
					    <img alt = "pho" className='swiper-slide' src={require('../../statics/images/swiper2.jpg')}/>
					    <img alt = "pho" className='swiper-slide' src={require('../../statics/images/swiper3.jpg')}/>
				    </div>
				</div>
				<div className = {style['detail-title']}>{this.props.detail.title}</div>
				<div className = {style['detail-main']}> 
					<div className = {style['detail-img']} dangerouslySetInnerHTML = {{__html:this.props.detail.img}}></div>
					<div className = {style['detail-video']}>
						<video id="video"  width="249" height="182" ref = "video" >							
							<source src={require('../../statics/4.mp4')} type='video/mp4' />
						</video >
					</div>
						<img  className = {style['videoBG']} alt = "video" src = {require('../../statics/images/video.jpg')} ref = "videoBG" style={{display:"block"}}/>
					<div className = {style['detail-content']} dangerouslySetInnerHTML = {{__html:this.props.detail.content}}></div>									
				</div>
				<div className = {style['adLeft']} ref = "adLeft">csc</div>
			</div>
				
		)
	}
	componentDidMount(){
		const adLeft = this.refs.adLeft;
		console.log(adLeft)
		this.isplay = false;
		var swiper = new Swiper(this.swiperContainer,{
			autoplay:true
		})
		this.getDetailInfo();
		const videoBG = this.refs.videoBG;
		const video = this.refs.video;
		videoBG.onclick = this.hanldPlay;
		video.onclick = this.handlePause;
		window.addEventListener('scroll',this.handleScrollChange)
		
	}
	
	handleScrollChange(e){
		const adLeft = this.refs.adLeft;
		const top = document.documentElement.scrollTop || document.body.scrollTop;
		if(top >= 205){
			adLeft.style.position = "fixed";
			adLeft.style.top = 0;
		}
		if(top<205){
			adLeft.style.position = "absolute";
			adLeft.style.top = 205+"px";
		}
		
	}
	
	hanldPlay(){
		const video = this.refs.video;
		const videoBG = this.refs.videoBG;
		if(!this.isplay){
			videoBG.style.display = "none"
			video.play()		
		}
		this.isplay = !this.isplay
				
	}
	handlePause(){
		const videoBG = this.refs.videoBG;
		const video = this.refs.video;
		if(this.isplay){
			video.pause()
			videoBG.style.display = "block"
		}else{
			video.play()		
		}
		this.isplay = !this.isplay
	}
	getDetailInfo(){
		const id = this.props.params.id;
		console.log(id)
		axios.get("/detail.json?id="+id)
		.then(this.props.handleGetDetailDataSucc.bind(this))
	}
}
const mapStateToProps = (state) => ({
	 detail:state.detail.listdata.detail,
	 display:state.detail.listdata.display
})
const mapDispatchToProps = (dispatch) =>({
	handleGetDetailDataSucc:(res) => {
		 console.log(res.data.data)
		 const { detail } = res.data.data;
		 dispatch(getDetailInfo(detail))
	}
})
export default connect(mapStateToProps,mapDispatchToProps)(Detail)