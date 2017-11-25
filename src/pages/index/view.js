import React, { Component } from 'react';
import { Link } from 'react-router';
import style from './indexStyle.mcss';
import IndexList from './react-iscroll/react-iscroll'
export default class List extends Component {
	render(){
		return(<div>
					<div className = {style['index-content']}>
						<p className = {style['index-title']}>VOA（美国之音）慢速英语,常速英语,官网最新内容在线收听。</p>
							<IndexList/>						
					</div>
					<div className = {style['img-con']}>
						<canvas width = "304" height = "304" id = "clock" ref = "clock"></canvas>						
					</div>
				</div>
			)
	}
	componentDidMount(){
		this.createClock()
		// this.getInfo()
	}
	createClock(){
		this.canvas = this.refs.clock;
		this.ctx = this.canvas.getContext('2d');
		this.init()
	}
	init(){
		var that = this;
		 setInterval(function(){
		 	that.clearRect()
		 	that.drowClock();
		 },1000);

		this.drowClock();		
	}
	clearRect(){
		this.ctx.clearRect(0, 0, 300, 300);
	}
	drowClock(){
		this.drowTable();
		this.drawCenterPoint();	
		this.drawMinutesPoint();
		this.drawHoursPoints();	
		this.drawHoursNumber();
		this.drawTimes();
	}
	drowTable(){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc(152,152,150,0,Math.PI*2);
		this.ctx.fillStyle = "#f6f6f2"
		this.ctx.stroke()
		this.ctx.restore();
	}
	drawCenterPoint(){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc(152,152,3,0,Math.PI*2);
		this.ctx.fillStyle = "red"
		this.ctx.fill()
		this.ctx.restore();
	}
	drawMinutesPoint(){
		this.ctx.save();
		this.ctx.translate(152, 152);
		this.ctx.beginPath();
		for (var i = 0; i <60; i++) {
			this.ctx.moveTo(0, -146);
			this.ctx.lineTo(0, -144);
			this.ctx.rotate(Math.PI / 30);
		}
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
	}
	drawHoursPoints() {
		this.ctx.save();
		this.ctx.translate(152, 152);
		this.ctx.beginPath();
		for (var i = 0; i < 12; i++) {
			this.ctx.moveTo(0, -144);
			this.ctx.lineTo(0, -140);
			this.ctx.rotate(Math.PI / 6);
		}
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
	}
	drawHoursNumber(){
		this.ctx.save();
		this.ctx.translate(152, 152);
		this.ctx.beginPath();
		for (var i = 1; i <= 12; i++) {
			this.ctx.font = "20px Arial";
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillText(i, Math.sin(Math.PI * i / 6) * 120, - Math.cos(Math.PI * i / 6) * 120);
		}
		
		this.ctx.restore();
	}
	drawTimes(){
		var date = new Date(),
			seconds = date.getSeconds(),
			minutes = date.getMinutes(),
			hours = (date.getHours() % 12) + (minutes / 60);

		this.drawSeconds(seconds);
		this.drawMinutes(minutes);
		this.drawHours(hours);
	}
	drawSeconds(seconds) {
		this.ctx.save();
		this.ctx.translate(152, 152);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI * seconds /30 );
		this.ctx.moveTo(0, -105);
		this.ctx.lineTo(0, 10);
		this.ctx.strokeStyle = "red";
		this.ctx.stroke();
		this.ctx.restore();
	}
	drawMinutes(minutes){
		this.ctx.save();
		this.ctx.translate(152, 152);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI * minutes /30 );
		this.ctx.moveTo(0, -100);
		this.ctx.lineTo(0, 5);
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
	}
	drawHours(hours){
		this.ctx.save();
		this.ctx.translate(152, 152);
		this.ctx.beginPath();
		this.ctx.rotate(Math.PI * hours / 6 );
		this.ctx.moveTo(0, -90);
		this.ctx.lineTo(0, 5);
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.restore();
	}
}
	