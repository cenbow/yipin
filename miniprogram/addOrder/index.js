"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../api/order");
var ajax_1 = require("../api/ajax");
Page({
    data: {
        address: {},
        information: '',
        amount: '',
        note: '',
        pics: [],
        token: '',
        baseUrl: ajax_1.base
    },
    onLoad: function () {
        this.getAddress();
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function (res) {
                that.setData({
                    token: res.data
                });
            }
        });
    },
    write: function (e) {
        this.setData({
            information: e.detail.value
        });
    },
    amount: function (e) {
        this.setData({
            amount: e.detail.value
        });
    },
    noteText: function (e) {
        this.setData({
            note: e.detail.value
        });
    },
    getAddress: function () {
        var _this = this;
        order_1.address().then(function (res) {
            _this.setData({
                address: res.data
            });
        });
    },
    uploadImage: function () {
        var that = this;
        var pics = this.data.pics;
        wx.chooseImage({
            count: 3 - pics.length,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                var picAll = pics.concat(tempFilePaths);
                that.uploadimg({
                    url: that.data.baseUrl + '/api/upload_img',
                    path: picAll
                });
            }
        });
    },
    uploadimg: function (data) {
        var that = this, i = data.i ? data.i : 0, success = data.success ? data.success : 0, fail = data.fail ? data.fail : 0;
        wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'image',
            success: function (resp) {
                success++;
                var conf = JSON.parse(resp.data);
                var arrImage = [];
                arrImage.push(conf.data);
                var picAlls = that.data.pics.concat(arrImage);
                that.setData({
                    pics: picAlls
                });
            },
            fail: function () {
                fail++;
                console.log('fail:' + i + "fail:" + fail);
            },
            complete: function () {
                console.log(i);
                i++;
                if (i == data.path.length) {
                    console.log('执行完毕');
                    console.log('成功：' + success + " 失败：" + fail);
                }
                else {
                    console.log(i);
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadimg(data);
                }
            }
        });
    },
    yulan: function () {
        wx.previewImage({
            current: this.data.pics,
            urls: this.data.pics
        });
    },
    tijiao: function () {
        var picture = '';
        this.data.pics.map(function (res) {
            picture += res + ',';
        });
        picture = picture.substring(0, picture.length - 1);
        if (this.data.information == '' || this.data.amount == '') {
            wx.showToast({
                title: '请输入必填信息',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        var reg = /^[1-9]\d*$/;
        if (!reg.test(this.data.amount)) {
            wx.showToast({
                title: '请输入正确的下单数量',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        order_1.addOrder(this.data.token, this.data.information, this.data.amount, this.data.note, picture).then(function (res) {
            if (res.code == 1) {
                console.log(res);
                console.log(res.data);
                wx.navigateTo({
                    url: '../post/post?id=' + res.data
                });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHNDQUE4QztBQUM5QyxvQ0FBZ0M7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFDLEVBQUU7UUFDVixXQUFXLEVBQUMsRUFBRTtRQUNkLE1BQU0sRUFBQyxFQUFFO1FBQ1QsSUFBSSxFQUFDLEVBQUU7UUFDUCxJQUFJLEVBQUMsRUFBRTtRQUNQLEtBQUssRUFBQyxFQUFFO1FBQ1IsT0FBTyxFQUFDLFdBQUk7S0FDYjtJQUNELE1BQU0sRUFBTjtRQUNFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSxPQUFPO1lBQ1osT0FBTyxFQUFQLFVBQVEsR0FBRztnQkFDVCxJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLEtBQUssRUFBQyxHQUFHLENBQUMsSUFBSTtpQkFDZixDQUFDLENBQUE7WUFDSixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELEtBQUssRUFBTCxVQUFNLENBQUs7UUFDVixJQUFJLENBQUMsT0FBUSxDQUFDO1lBQ1osV0FBVyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUMzQixDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QsTUFBTSxFQUFOLFVBQU8sQ0FBSztRQUNWLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxRQUFRLEVBQVIsVUFBUyxDQUFLO1FBQ1osSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJ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QUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDOUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUMsWUFBWTtnQkFDbEIsSUFBSSxFQUFDLE1BQU07Z0JBQ1gsUUFBUSxFQUFDLElBQUk7YUFDZCxDQUFDLENBQUE7WUFDRixPQUFPO1NBQ1I7UUFDRCxnQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDbEcsSUFBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBQztnQkFFbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXRCLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ2IsR0FBRyxFQUFFLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxJQUFJO2lCQUNsQyxDQUFDLENBQUE7YUFVQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vaW5kZXguanNcbi8v6I635Y+W5bqU55So5a6e5L6LXG5pbXBvcnQge2FkZE9yZGVyLCBhZGRyZXNzfSBmcm9tICcuLi9hcGkvb3JkZXInXG5pbXBvcnQge2Jhc2V9IGZyb20gJy4uL2FwaS9hamF4J1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGFkZHJlc3M6e30sXG4gICAgaW5mb3JtYXRpb246JycsXG4gICAgYW1vdW50OicnLFxuICAgIG5vdGU6JycsXG4gICAgcGljczpbXSxcbiAgICB0b2tlbjonJyxcbiAgICBiYXNlVXJsOmJhc2VcbiAgfSxcbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuZ2V0QWRkcmVzcygpO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAndG9rZW4nLFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgdGhhdC5zZXREYXRhISh7XG4gICAgICAgICAgdG9rZW46cmVzLmRhdGFcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgd3JpdGUoZTphbnkpe1xuICAgdGhpcy5zZXREYXRhISh7XG4gICAgIGluZm9ybWF0aW9uOmUuZGV0YWlsLnZhbHVlXG4gICB9KVxuICB9LFxuICBhbW91bnQoZTphbnkpe1xuICAgIHRoaXMuc2V0RGF0YSEoe1xuICAgICAgYW1vdW50OiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH0sXG4gIG5vdGVUZXh0KGU6YW55KXtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIG5vdGU6IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfSxcbiAgLy8g6I635Y+W5Zyw5Z2AXG4gIGdldEFkZHJlc3MoKXtcbiAgICBhZGRyZXNzKCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhISh7XG4gICAgICAgIGFkZHJlc3M6cmVzLmRhdGFcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgLy8g5LiK5Lyg5Zu+54mHXG4gIHVwbG9hZEltYWdlKCl7XG4gIFx0Y29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3QgcGljcyA9IHRoaXMuZGF0YS5waWNzO1xuICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgIGNvdW50OiAzIC0gcGljcy5sZW5ndGgsXG4gICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgLy8gdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXG4gICAgICAgIGNvbnN0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICAvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGNvbnN0IHBpY0FsbCA9IHBpY3MuY29uY2F0KHRlbXBGaWxlUGF0aHMpO1xuICAgICAgICB0aGF0LnVwbG9hZGltZyh7XG4gICAgICAgICAgICB1cmw6IHRoYXQuZGF0YS5iYXNlVXJsICsgJy9hcGkvdXBsb2FkX2ltZycsXG4gICAgICAgICAgICBwYXRoOiBwaWNBbGxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG5cdHVwbG9hZGltZyhkYXRhOmFueSl7XG5cdFx0dmFyIHRoYXQ9dGhpcyxcblx0XHRcdGk9ZGF0YS5pP2RhdGEuaTowLC8v5b2T5YmN5LiK5Lyg55qE5ZOq5byg5Zu+54mHXG5cdFx0XHRzdWNjZXNzPWRhdGEuc3VjY2Vzcz9kYXRhLnN1Y2Nlc3M6MCwvL+S4iuS8oOaIkOWKn+eahOS4quaVsFxuXHRcdFx0ZmFpbD1kYXRhLmZhaWw/ZGF0YS5mYWlsOjA7Ly/kuIrkvKDlpLHotKXnmoTkuKrmlbBcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0d3gudXBsb2FkRmlsZSh7XG5cdFx0XHR1cmw6IGRhdGEudXJsLFxuXHRcdFx0ZmlsZVBhdGg6IGRhdGEucGF0aFtpXSxcblx0XHRcdG5hbWU6ICdpbWFnZScsLy/ov5nph4zmoLnmja7oh6rlt7HnmoTlrp7pmYXmg4XlhrXmlLlcblx0XHRcdC8vIGZvcm1EYXRhOm51bGwsLy/ov5nph4zmmK/kuIrkvKDlm77niYfml7bkuIDotbfkuIrkvKDnmoTmlbDmja5cblx0XHRcdHN1Y2Nlc3M6IChyZXNwKSA9PiB7XG5cdFx0XHRcdHN1Y2Nlc3MrKzsvL+WbvueJh+S4iuS8oOaIkOWKn++8jOWbvueJh+S4iuS8oOaIkOWKn+eahOWPmOmHjysxXG5cdFx0XHRcdGNvbnN0IGNvbmYgPSBKU09OLnBhcnNlKHJlc3AuZGF0YSk7XG5cdFx0XHRcdGNvbnN0IGFyckltYWdlID0gW107XG5cdFx0XHRcdGFyckltYWdlLnB1c2goY29uZi5kYXRhKTtcblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRjb25zdCBwaWNBbGxzID0gdGhhdC5kYXRhLnBpY3MuY29uY2F0KGFyckltYWdlKTtcblx0XHRcdFx0dGhhdC5zZXREYXRhISh7XG5cdFx0XHRcdFx0cGljczpwaWNBbGxzXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC8v6L+Z6YeM5Y+v6IO95pyJQlVH77yM5aSx6LSl5Lmf5Lya5omn6KGM6L+Z6YeMLOaJgOS7pei/memHjOW6lOivpeaYr+WQjuWPsOi/lOWbnui/h+adpeeahOeKtuaAgeeggeS4uuaIkOWKn+aXtu+8jOi/memHjOeahHN1Y2Nlc3PmiY0rMVxuXHRcdFx0fSxcblx0XHRcdGZhaWw6ICgpID0+IHtcblx0XHRcdFx0ZmFpbCsrOy8v5Zu+54mH5LiK5Lyg5aSx6LSl77yM5Zu+54mH5LiK5Lyg5aSx6LSl55qE5Y+Y6YePKzFcblx0XHRcdFx0Y29uc29sZS5sb2coJ2ZhaWw6JytpK1wiZmFpbDpcIitmYWlsKTtcblx0XHRcdH0sXG5cdFx0XHRjb21wbGV0ZTogKCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhpKTtcblx0XHRcdFx0aSsrOy8v6L+Z5Liq5Zu+54mH5omn6KGM5a6M5LiK5Lyg5ZCO77yM5byA5aeL5LiK5Lyg5LiL5LiA5bygXG5cdFx0XHRcdGlmKGk9PWRhdGEucGF0aC5sZW5ndGgpeyAgIC8v5b2T5Zu+54mH5Lyg5a6M5pe277yM5YGc5q2i6LCD55SoXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ+aJp+ihjOWujOavlScpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCfmiJDlip/vvJonK3N1Y2Nlc3MrXCIg5aSx6LSl77yaXCIrZmFpbCk7XG5cdFx0XHRcdH1lbHNley8v6Iul5Zu+54mH6L+Y5rKh5pyJ5Lyg5a6M77yM5YiZ57un57ut6LCD55So5Ye95pWwXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coaSk7XG5cdFx0XHRcdFx0ZGF0YS5pPWk7XG5cdFx0XHRcdFx0ZGF0YS5zdWNjZXNzPXN1Y2Nlc3M7XG5cdFx0XHRcdFx0ZGF0YS5mYWlsPWZhaWw7XG5cdFx0XHRcdFx0dGhhdC51cGxvYWRpbWcoZGF0YSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuICAvLyDpooTop4jlm77niYdcbiAgeXVsYW4oKXtcbiAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuXHRcdFx0Ly9AdHMtaWdub3JlXG4gICAgICBjdXJyZW50OiB0aGlzLmRhdGEucGljcywgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgdXJsczogdGhpcy5kYXRhLnBpY3MgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgIH0pXG4gIH0sXG5cbiAgLy8g5o+Q5Lqk6K6i5Y2VXG4gIHRpamlhbygpe1xuICAgIGxldCBwaWN0dXJlID0gJyc7XG4gICAgdGhpcy5kYXRhLnBpY3MubWFwKChyZXMpID0+e1xuICAgICAgcGljdHVyZSArPSByZXMgKyAnLCc7XG4gICAgfSk7XG5cdFx0cGljdHVyZSA9IHBpY3R1cmUuc3Vic3RyaW5nKDAscGljdHVyZS5sZW5ndGggLSAxKTtcblx0XHRpZiAodGhpcy5kYXRhLmluZm9ybWF0aW9uID09ICcnIHx8IHRoaXMuZGF0YS5hbW91bnQgPT0gJycpIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5b+F5aGr5L+h5oGvJyxcbiAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVnID0gL15bMS05XVxcZCokLztcbiAgICBpZiAoIXJlZy50ZXN0KHRoaXMuZGF0YS5hbW91bnQpKXtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOifor7fovpPlhaXmraPnoa7nmoTkuIvljZXmlbDph48nLFxuICAgICAgICBpY29uOidub25lJyxcbiAgICAgICAgZHVyYXRpb246MjAwMFxuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYWRkT3JkZXIodGhpcy5kYXRhLnRva2VuLCB0aGlzLmRhdGEuaW5mb3JtYXRpb24sIHRoaXMuZGF0YS5hbW91bnQsIHRoaXMuZGF0YS5ub3RlLCBwaWN0dXJlKS50aGVuKHJlcyA9PiB7XG4gICAgICBpZihyZXMuY29kZSA9PSAxKXtcblxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG5cblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnLi4vcG9zdC9wb3N0P2lkPScgKyByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXG4gICAgICAgIC8vIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIC8vICAgdGl0bGU6cmVzLm1lc3NhZ2UsXG5cdFx0XHRcdC8vIFx0Y29udGVudDonJyxcbiAgICAgICAgLy8gICBzaG93Q2FuY2VsOmZhbHNlLFxuICAgICAgICAvLyAgIHN1Y2Nlc3MoKXtcblx0XHRcdFx0Ly9cbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcbiJdfQ==