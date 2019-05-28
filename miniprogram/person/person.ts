import {reqUpdateBasicInformation, reqUserInformation} from "../api/index";

Page({
	data: {
		token: '',
		name: '',
		id_card: '',
		id_card_positive: '',
		id_card_contrary: '',

		identity:'',
		disabled: false,
		state: ['供货商', '加盟店', '区域代理']
		// 1：供货商；2：加盟店；3：区域代理
	},
	onLoad() {
		// 读取token
		let _this = this;
		wx.getStorage({
			key: 'token',
			success(res) {
				console.log(res);
				_this.setData!({
					token: res.data
					}, () => _this.getInfor()
				)
			}
		});
	},

	input(e: any) {
		console.log(e);
		const label = e.target.dataset.type;
		const value = e.detail.detail.value;
		console.log(value);
		this.setData!({
			[label]: value
		});

		console.log(label, value);
	},

	chooseTop() {
		if (this.data.disabled) {
			return
		}
		let _this = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				console.log(res);
				const tempFilePaths = res.tempFilePaths;
				_this.setData!({
					id_card_positive: tempFilePaths
				});
				console.log(tempFilePaths);
			}
		})
	},

	chooseBottom() {
		if (this.data.disabled) {
			return
		}
		let _this = this;
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths;
				_this.setData!({
					id_card_contrary: tempFilePaths
				});
				console.log(tempFilePaths);
			}
		})
	},
	doUpdateBasicInformation() {
		const {name,token,id_card,id_card_contrary,id_card_positive} = this.data;
		if (!name || !token || !id_card_positive || !id_card_contrary || !id_card) {
			wx.showToast({
				title: '请检查表单填写是否完整',
				mask: true,
				duration: 2000,
				icon: "none"
			});
			return;
		}
		const data = {name,token,id_card,id_card_contrary:id_card_contrary[0],id_card_positive:id_card_positive[0]};
		reqUpdateBasicInformation(data).then(
			res => {
				console.log(res);
			}
		)
	},

	getInfor() {
		wx.showLoading({
			title: '',
			mask: true
		})
		const {token,state} = this.data;
		reqUserInformation({token}).then(
			(res: any) => {
				if (res.code === 1) {
					wx.hideLoading();

					const {name, id_card, id_card_contrary, id_card_positive,identity} = res.data;
					console.log(name, id_card, id_card_contrary, id_card_positive);
					if (name || id_card || id_card_contrary || id_card_positive) {
						this.setData!({
							disabled: true,
							name,
							id_card,
							id_card_contrary,
							id_card_positive,
							identity : state[identity]
						})
					}

				}
			}
		)
	}
})
