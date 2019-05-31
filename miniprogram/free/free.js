"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../api/index");
Page({
    data: {
        token: '',
        serial_number: '',
        phone: '',
        code: '',
        list: [],
        array: [],
        list2: [],
        array2: [],
        multiArray: [[], []],
        multiIndex: [0, 0],
        index: 0,
        msgData: '获取验证码',
        time: 60,
        timer: 0,
        active: ''
    },
    onLoad: function () {
        var _this = this;
        wx.getStorage({
            key: 'token',
            success: function (res) {
                console.log(res);
                _this.setData({
                    token: res.data
                });
            }
        });
        this.getPhoneModels();
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            multiIndex: e.detail.value
        });
        console.log(this.data.multiIndex);
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        if (e.detail.column === 0) {
            var _b = this.data, list = _b.list, array = _b.array;
            this.setData({
                multiArray: [array, list[e.detail.value]["subclass"].map(function (item) { return item.name; })]
            });
        }
    },
    input: function (e) {
        var _b;
        console.log(e);
        var label = e.target.dataset.type;
        var value = e.detail.detail.value;
        console.log(value);
        this.setData((_b = {},
            _b[label] = value,
            _b));
        console.log(label, value);
    },
    getPhoneModels: function () {
        var _this_1 = this;
        index_1.reqPhoneModels().then(function (res) {
            if (res.code === 1) {
                console.log('get-phone-models', res);
                _this_1.setData({
                    list: res.data,
                    array: res.data.map(function (item) { return item.name; }),
                    list2: res.data[0].subclass,
                    array2: res.data[0].subclass.map(function (item) { return item.name; }),
                    multiArray: [res.data.map(function (item) { return item.name; }), res.data[0].subclass.map(function (item) { return item.name; })]
                });
            }
        });
    },
    changeCode: function (e) {
        console.log(e);
        this.setData({
            code: e.detail.value
        });
        console.log(this.data.code);
    },
    doSendMsg: function () {
        var _this = this;
        var _a = this.data, time = _a.time, timer = _a.timer;
        if (timer !== 0) {
            return;
        }
        var mobile = this.data.phone;
        var type = 'SMS_166320348';
        index_1.sendMsg({ type: type, mobile: mobile }).then(function (res) {
            if (res.code === 1) {
                timer = setInterval(function () {
                    if (time === 0) {
                        clearInterval(timer);
                        _this.setData({
                            timer: 0,
                            time: 60,
                            msgData: '获取验证码',
                            active: ''
                        });
                        return;
                    }
                    time--;
                    _this.setData({
                        msgData: time + 's',
                        timer: timer,
                        active: 'active'
                    });
                }, 1000);
            }
        });
    },
    getFreeFilm: function () {
        var _b = this.data, token = _b.token, multiArray = _b.multiArray, multiIndex = _b.multiIndex, serial_number = _b.serial_number, phone = _b.phone, code = _b.code;
        var phone_model = multiArray[1][multiIndex[1]];
        console.log(phone_model);
        index_1.reqGetFreeFilm({ token: token, phone_model: phone_model, serial_number: serial_number, phone: phone, code: code }).then(function (res) {
            wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUU7QUFFckUsSUFBSSxDQUFDO0lBRUosSUFBSSxFQUFFO1FBRUwsS0FBSyxFQUFFLEVBQUU7UUFDVCxhQUFhLEVBQUMsRUFBRTtRQUNoQixLQUFLLEVBQUMsRUFBRTtRQUNSLElBQUksRUFBQyxFQUFFO1FBRVAsSUFBSSxFQUFDLEVBQUU7UUFDUCxLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxFQUFFO1FBQ1QsTUFBTSxFQUFFLEVBQUU7UUFFVixVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDO1FBQ25CLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbEIsS0FBSyxFQUFFLENBQUM7UUFFUixPQUFPLEVBQUUsT0FBTztRQUNoQixJQUFJLEVBQUUsRUFBRTtRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxFQUFFLEVBQUU7S0FFVjtJQUVELE1BQU0sRUFBTjtRQUVDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ2IsR0FBRyxFQUFFLE9BQU87WUFDWixPQUFPLEVBQVAsVUFBUSxHQUFHO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQyxPQUFRLENBQUM7b0JBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUNmLENBQUMsQ0FBQTtZQUNILENBQUM7U0FDRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHFCQUFxQixFQUFFLFVBQVUsQ0FBTTtRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9B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Q0FBQyxDQUFDO2FBQ1Q7UUFDRixDQUFDLENBQ0QsQ0FBQztJQUdILENBQUM7SUFFRCxXQUFXLEVBQVg7UUFDTyxJQUFBLGNBQWtFLEVBQWpFLGdCQUFLLEVBQUMsMEJBQVUsRUFBQywwQkFBVSxFQUFDLGdDQUFhLEVBQUMsZ0JBQUssRUFBQyxjQUFpQixDQUFDO1FBRXpFLElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLHNCQUFjLENBQUMsRUFBQyxLQUFLLE9BQUEsRUFBQyxXQUFXLGFBQUEsRUFBQyxhQUFhLGVBQUEsRUFBQyxLQUFLLE9BQUEsRUFBQyxJQUFJLE1BQUEsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUNoRSxVQUFDLEdBQU87WUFDUCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNQLEtBQUssRUFBQyxHQUFHLENBQUMsT0FBTztnQkFDakIsSUFBSSxFQUFDLE1BQU07Z0JBQ1gsUUFBUSxFQUFDLElBQUk7YUFDZCxDQUFDLENBQUE7UUFDUCxDQUFDLENBQ0QsQ0FBQTtJQUNGLENBQUM7Q0FFRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3JlcUdldEZyZWVGaWxtLCByZXFQaG9uZU1vZGVscywgc2VuZE1zZ30gZnJvbSBcIi4uL2FwaS9pbmRleFwiO1xuXG5QYWdlKHtcblxuXHRkYXRhOiB7XG5cblx0XHR0b2tlbjogJycsXG5cdFx0c2VyaWFsX251bWJlcjonJyxcblx0XHRwaG9uZTonJyxcblx0XHRjb2RlOicnLFxuXG5cdFx0bGlzdDpbXSxcblx0XHRhcnJheTogW10sXG5cdFx0bGlzdDI6IFtdLFxuXHRcdGFycmF5MjogW10sXG5cblx0XHRtdWx0aUFycmF5OiBbW10sW11dLFxuXHRcdG11bHRpSW5kZXg6IFswLCAwXSxcblxuXHRcdGluZGV4OiAwLFxuXG5cdFx0bXNnRGF0YTogJ+iOt+WPlumqjOivgeeggScsXG5cdFx0dGltZTogNjAsXG5cdFx0dGltZXI6IDAsXG5cdFx0YWN0aXZlOiAnJ1xuXG5cdH0sXG5cblx0b25Mb2FkKCkge1xuXHRcdC8vIOivu+WPlnRva2VuXG5cdFx0bGV0IF90aGlzID0gdGhpcztcblx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdGtleTogJ3Rva2VuJyxcblx0XHRcdHN1Y2Nlc3MocmVzKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0XHRcdF90aGlzLnNldERhdGEhKHtcblx0XHRcdFx0XHR0b2tlbjogcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuZ2V0UGhvbmVNb2RlbHMoKTtcblx0fSxcblxuXHRiaW5kTXVsdGlQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uIChlOiBhbnkpIHtcblx0XHRjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpO1xuXHRcdHRoaXMuc2V0RGF0YSEoe1xuXHRcdFx0bXVsdGlJbmRleDogZS5kZXRhaWwudmFsdWVcblx0XHR9KVxuXHRcdGNvbnNvbGUubG9nKHRoaXMuZGF0YS5tdWx0aUluZGV4KTtcblx0fSxcblxuXHRiaW5kTXVsdGlQaWNrZXJDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIChlOiBhbnkpIHtcblx0XHRjb25zb2xlLmxvZygn5L+u5pS555qE5YiX5Li6JywgZS5kZXRhaWwuY29sdW1uLCAn77yM5YC85Li6JywgZS5kZXRhaWwudmFsdWUpO1xuXHRcdGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDApIHtcblx0XHRcdGxldCB7bGlzdCwgYXJyYXl9ID0gdGhpcy5kYXRhO1xuXHRcdFx0dGhpcy5zZXREYXRhISh7XG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0bXVsdGlBcnJheTogW2FycmF5LCBsaXN0W2UuZGV0YWlsLnZhbHVlXVtcInN1YmNsYXNzXCJdLm1hcChpdGVtID0+IGl0ZW0ubmFtZSldXG5cdFx0XHR9KVxuXHRcdH1cblx0fSxcblxuXG5cdGlucHV0KGU6IGFueSkge1xuXHRcdGNvbnNvbGUubG9nKGUpO1xuXHRcdGNvbnN0IGxhYmVsID0gZS50YXJnZXQuZGF0YXNldC50eXBlO1xuXHRcdGNvbnN0IHZhbHVlID0gZS5kZXRhaWwuZGV0YWlsLnZhbHVlO1xuXHRcdGNvbnNvbGUubG9nKHZhbHVlKTtcblx0XHR0aGlzLnNldERhdGEhKHtcblx0XHRcdFtsYWJlbF06IHZhbHVlXG5cdFx0fSk7XG5cblx0XHRjb25zb2xlLmxvZyhsYWJlbCwgdmFsdWUpO1xuXHR9LFxuXG5cblx0Z2V0UGhvbmVNb2RlbHMoKSB7XG5cdFx0cmVxUGhvbmVNb2RlbHMoKS50aGVuKFxuXHRcdFx0cmVzID0+IHtcblx0XHRcdFx0aWYgKHJlcy5jb2RlID09PSAxKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2dldC1waG9uZS1tb2RlbHMnLCByZXMpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSEoe1xuXHRcdFx0XHRcdFx0bGlzdDogcmVzLmRhdGEsXG5cdFx0XHRcdFx0XHRhcnJheTogcmVzLmRhdGEubWFwKChpdGVtOiBhbnkpID0+IGl0ZW0ubmFtZSksXG5cdFx0XHRcdFx0XHRsaXN0MjogcmVzLmRhdGFbMF0uc3ViY2xhc3MsXG5cdFx0XHRcdFx0XHRhcnJheTI6IHJlcy5kYXRhWzBdLnN1YmNsYXNzLm1hcCgoaXRlbTogYW55KSA9PiBpdGVtLm5hbWUpLFxuXHRcdFx0XHRcdFx0bXVsdGlBcnJheTogW3Jlcy5kYXRhLm1hcCgoaXRlbTogYW55KSA9PiBpdGVtLm5hbWUpLCByZXMuZGF0YVswXS5zdWJjbGFzcy5tYXAoKGl0ZW06IGFueSkgPT4gaXRlbS5uYW1lKV1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KVxuXHR9LFxuXG5cdGNoYW5nZUNvZGU6IGZ1bmN0aW9uIChlOiBhbnkpIHtcblx0XHRjb25zb2xlLmxvZyhlKTtcblx0XHR0aGlzLnNldERhdGEhKHtcblx0XHRcdGNvZGU6IGUuZGV0YWlsLnZhbHVlXG5cdFx0fSk7XG5cdFx0Y29uc29sZS5sb2codGhpcy5kYXRhLmNvZGUpO1xuXHR9LFxuXHRkb1NlbmRNc2c6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHZhciBfYSA9IHRoaXMuZGF0YSwgdGltZSA9IF9hLnRpbWUsIHRpbWVyID0gX2EudGltZXI7XG5cdFx0aWYgKHRpbWVyICE9PSAwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gdG9kbzog5re75Yqg5a6e5pe255uR5o6nXG5cblx0XHRjb25zdCBtb2JpbGUgPSB0aGlzLmRhdGEucGhvbmU7XG5cdFx0Y29uc3QgdHlwZSA9ICdTTVNfMTY2MzIwMzQ4Jztcblx0XHRzZW5kTXNnKHt0eXBlLCBtb2JpbGV9KS50aGVuKFxuXHRcdFx0KHJlczogYW55KSA9PiB7XG5cdFx0XHRcdGlmIChyZXMuY29kZSA9PT0gMSkge1xuXG5cdFx0XHRcdFx0dGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAodGltZSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKHRpbWVyKTtcblx0XHRcdFx0XHRcdFx0X3RoaXMuc2V0RGF0YSEoe1xuXHRcdFx0XHRcdFx0XHRcdHRpbWVyOiAwLFxuXHRcdFx0XHRcdFx0XHRcdHRpbWU6IDYwLFxuXHRcdFx0XHRcdFx0XHRcdG1zZ0RhdGE6ICfojrflj5bpqozor4HnoIEnLFxuXHRcdFx0XHRcdFx0XHRcdGFjdGl2ZTogJydcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRpbWUtLTtcblx0XHRcdFx0XHRcdF90aGlzLnNldERhdGEhKHtcblx0XHRcdFx0XHRcdFx0bXNnRGF0YTogdGltZSArICdzJyxcblx0XHRcdFx0XHRcdFx0dGltZXI6IHRpbWVyLFxuXHRcdFx0XHRcdFx0XHRhY3RpdmU6ICdhY3RpdmUnXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cblxuXHR9LFxuXG5cdGdldEZyZWVGaWxtKCkge1xuXHRcdGNvbnN0IHt0b2tlbixtdWx0aUFycmF5LG11bHRpSW5kZXgsc2VyaWFsX251bWJlcixwaG9uZSxjb2RlfSA9IHRoaXMuZGF0YTtcblxuXHRcdGxldCBwaG9uZV9tb2RlbCA9IG11bHRpQXJyYXlbMV1bbXVsdGlJbmRleFsxXV07XG5cdFx0Y29uc29sZS5sb2cocGhvbmVfbW9kZWwpO1xuXHRcdHJlcUdldEZyZWVGaWxtKHt0b2tlbixwaG9uZV9tb2RlbCxzZXJpYWxfbnVtYmVyLHBob25lLGNvZGV9KS50aGVuKFxuXHRcdFx0KHJlczphbnkpID0+IHtcblx0XHRcdFx0d3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTpyZXMubWVzc2FnZSxcbiAgICAgICAgICBpY29uOidub25lJyxcbiAgICAgICAgICBkdXJhdGlvbjoyMDAwXG4gICAgICAgIH0pXG5cdFx0XHR9XG5cdFx0KVxuXHR9XG5cbn0pO1xuIl19