// CSS表单美化
import React from "react";
import style from "./index.scss";
import { Popover,Form,Button } from 'antd';

const FormItem = Form.Item;
const Draggabilly = require('draggabilly');

class DraggabillyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toolList: [
				{ title: '自定义文本', type: 'text', name: 'text' },
				{ title: '表格区域', type: 'table', name: 'table' },
				{ title: '二维码区域', type: 'qrcode', name: 'qrcode' },
			],
			activeList: [],
			toolDraggies: [],
			activeDraggies: [],
		};
	}

	componentDidMount () {
		let that = this;
		let contentDom = document.getElementById('contentContainer');
		document.querySelectorAll("#toolContainer [role = 'toolItem']").forEach((item, index) => {
			let toolItem = this.state.toolList[index];
			let type = toolItem.type;
			let toolDraggie = new Draggabilly(item, {})
			this.setState({ toolDraggies: this.state.toolDraggies.push(toolDraggie) })
			let originDelta = { y: item.offsetTop - contentDom.offsetTop, x: item.offsetLeft - contentDom.offsetLeft }

			toolDraggie.on('dragStart', function (event, pointer) {
				//样式处理
				item.style.opacity = 0.65;
				item.style.zIndex = 10;
				//计算初始偏移

			})

			toolDraggie.on('dragEnd', function (event, pointer) {
				//样式处理
				item.style.opacity = 1;
				item.style.zIndex = '';

				if (that.isOverlap(item, document.getElementById('contentContainer'))) {
					// 计算最终偏移的相对坐标
					let finalDelta = { x: toolDraggie.position.x, y: toolDraggie.position.y }
					let relativePosition = {
						x: (finalDelta.x + originDelta.x > 0 && type != 'table') ? finalDelta.x + originDelta.x : 0,
						y: finalDelta.y + originDelta.y > 0 ? finalDelta.y + originDelta.y : 0,
					}
					// 生成初始数据
					let timestamp = new Date().getTime();
					let newActiveList = [...that.state.activeList, {
						id: timestamp,
						font_size: 12,
						lockDirection: type == 'table' ? 'y' : 'free',
						x: relativePosition.x,
						y: relativePosition.y,
						...toolItem,
					}]

					//激活组件
					that.setState({ activeList: newActiveList })
					let activeDom = document.getElementById(timestamp);
					let activeDraggie = new Draggabilly(activeDom, { containment: '#contentContainer' })
					that.setState({ activeDraggies: [...that.state.activeDraggies, activeDraggie] })
					activeDraggie.setPosition(relativePosition.x, relativePosition.y)
					activeDraggie.on('dragEnd', function (event, pointer) { })
				}

				// 恢复工具控件的位置
				toolDraggie.setPosition(0, 0)

			})
		})
	}

	isOverlap (objOne, objTwo) {
		var x1 = objOne.offsetLeft;
		var y1 = objOne.offsetTop;
		var x2 = x1 + objOne.offsetWidth;
		var y2 = y1 + objOne.offsetHeight;

		var x3 = objTwo.offsetLeft;
		var y3 = objTwo.offsetTop;
		var x4 = x3 + objTwo.offsetWidth;
		var y4 = y3 + objTwo.offsetHeight;

		var zx = Math.abs(x1 + x2 - x3 - x4);
		var x = Math.abs(x1 - x2) + Math.abs(x3 - x4);
		var zy = Math.abs(y1 + y2 - y3 - y4);
		var y = Math.abs(y1 - y2) + Math.abs(y3 - y4);
		return (zx <= x && zy <= y);
	}


	render () {
		return (<div className={style.container}>
			<div data-flex='main:start cross:center'>
				{/* 选项列表 */}
				<ul className={style.toolContainer} flex='dir:top main:center cross:center' id='toolContainer'>
					{this.state.toolList.map(item => {
						return (<li className={style.toolItem} role='toolItem' key={item.name}>{item.title}</li>)
					})}
				</ul>
				{/* 画布 */}
				<div className={style.contentContainer} id='contentContainer'>
					<ul className={style.activeList}>
						{this.state.activeList.map(item => {
							if (item.type == 'text') {
								return (
									<Popover
										content={<a>Close</a>}
										title="Title"
										trigger="click"
										key={item.id}
										trigger="click"
									>
										<li className={style.textItem} id={item.id}>
											<span>{item.title}：</span>
											<content>123</content>
										</li>
									</Popover>
								)
							} else if (item.type == 'table') {
								return (<li className={style.tableItem} key={item.id} id={item.id}>表格区域</li>)
							} else if (item.type == 'qrcode') {
								return (<li className={style.qrcodeItem} key={item.id} id={item.id}><content></content></li>)
							}

						})}
					</ul>
				</div>

			</div>
		</div>)
	}
}


export default DraggabillyComponent;
