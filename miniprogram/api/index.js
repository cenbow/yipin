"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajax_1 = require("./ajax");
exports.reqBanner = function () { return ajax_1.ajax('/api/banners', {}); };
exports.reqAfterQuery = function (imei) { return ajax_1.ajax('/api/after_query', { imei: imei }); };
exports.reqRegister = function (_a) {
    var openid = _a.openid, phone = _a.phone, password = _a.password, code = _a.code;
    return ajax_1.ajax('/api/register', { openid: openid, phone: phone, password: password, code: code });
};
exports.reqPartner = function (_a) {
    var token = _a.token, phone = _a.phone, name = _a.name, address = _a.address, identity = _a.identity, id_card = _a.id_card, id_card_contrary = _a.id_card_contrary, id_card_positive = _a.id_card_positive;
    return ajax_1.ajax('/api/partner', { token: token, phone: phone, name: name, address: address, identity: identity, id_card: id_card, id_card_contrary: id_card_contrary, id_card_positive: id_card_positive });
};
exports.reqAddressList = function () { return ajax_1.ajax('/api/address_list'); };
exports.sendMsg = function (_a) {
    var mobile = _a.mobile, type = _a.type;
    return ajax_1.ajax('/api/send_message', { mobile: mobile, type: type });
};
exports.reqLogin = function (_a) {
    var type = _a.type, openid = _a.openid, phone = _a.phone, password = _a.password;
    return ajax_1.ajax('/api/login', { type: type, openid: openid, phone: phone, password: password });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUEyQjtBQU9kLFFBQUEsU0FBUyxHQUFHLGNBQU0sT0FBQSxXQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxFQUF4QixDQUF3QixDQUFDO0FBRzNDLFFBQUEsYUFBYSxHQUFHLFVBQUMsSUFBWSxJQUFLLE9BQUEsV0FBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUMsSUFBSSxNQUFBLEVBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO0FBR25FLFFBQUEsV0FBVyxHQUFHLFVBQUMsRUFBb0M7UUFBbkMsa0JBQU0sRUFBRSxnQkFBSyxFQUFFLHNCQUFRLEVBQUUsY0FBSTtJQUFXLE9BQUEsV0FBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLElBQUksTUFBQSxFQUFDLENBQUM7QUFBdEQsQ0FBc0QsQ0FBQTtBQWM5RyxRQUFBLFVBQVUsR0FBRyxVQUFDLEVBQTZGO1FBQTVGLGdCQUFLLEVBQUUsZ0JBQUssRUFBRSxjQUFJLEVBQUUsb0JBQU8sRUFBRSxzQkFBUSxFQUFFLG9CQUFPLEVBQUUsc0NBQWdCLEVBQUUsc0NBQWdCO0lBQWUsT0FBQSxXQUFJLENBQUMsY0FBYyxFQUFFLEVBQUMsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUMsQ0FBQztBQUExRyxDQUEwRyxDQUFDO0FBSTNOLFFBQUEsY0FBYyxHQUFHLGNBQU0sT0FBQSxXQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBekIsQ0FBeUIsQ0FBQTtBQUloRCxRQUFBLE9BQU8sR0FBRyxVQUFDLEVBQW1CO1FBQWxCLGtCQUFNLEVBQUUsY0FBSTtJQUFXLE9BQUEsV0FBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsTUFBTSxRQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQztBQUF6QyxDQUF5QyxDQUFDO0FBVTdFLFFBQUEsUUFBUSxHQUFHLFVBQUMsRUFBc0M7UUFBckMsY0FBSSxFQUFFLGtCQUFNLEVBQUUsZ0JBQUssRUFBRSxzQkFBUTtJQUFhLE9BQUEsV0FBSSxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksTUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFDLENBQUM7QUFBbkQsQ0FBbUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YWpheH0gZnJvbSBcIi4vYWpheFwiXG5cblxuLy8g6aaW6aG1YmFubmVy5Zu+5pWw5o2u5ZKM5ZKo6K+i5pWw5o2uXG4vLyDpppbpobViYW5uZXLlm77mlbDmja7lkozlkqjor6LmlbDmja5cbi8vIOmmlumhtWJhbm5lcuWbvuaVsOaNruWSjOWSqOivouaVsOaNrlxuXG5leHBvcnQgY29uc3QgcmVxQmFubmVyID0gKCkgPT4gYWpheCgnL2FwaS9iYW5uZXJzJywge30pO1xuXG4vLyDllK7lkI7mn6Xor6JcbmV4cG9ydCBjb25zdCByZXFBZnRlclF1ZXJ5ID0gKGltZWk6IHN0cmluZykgPT4gYWpheCgnL2FwaS9hZnRlcl9xdWVyeScsIHtpbWVpfSk7XG5cbi8vIOeUqOaIt+azqOWGjEFQSVxuZXhwb3J0IGNvbnN0IHJlcVJlZ2lzdGVyID0gKHtvcGVuaWQsIHBob25lLCBwYXNzd29yZCwgY29kZX06IGFueSkgPT4gYWpheCgnL2FwaS9yZWdpc3RlcicsIHtvcGVuaWQsIHBob25lLCBwYXNzd29yZCwgY29kZX0pXG5cbi8vIOaIkOS4uuWQiOS9nOWVhlxuaW50ZXJmYWNlIFBhcnRuZXQge1xuXHR0b2tlbjogc3RyaW5nLFxuXHRwaG9uZTogbnVtYmVyLFxuXHRuYW1lOiBzdHJpbmcsXG5cdGFkZHJlc3M6IHN0cmluZyxcblx0aWRlbnRpdHk6IHN0cmluZyxcblx0aWRfY2FyZD86IG51bWJlcixcblx0aWRfY2FyZF9wb3NpdGl2ZT86IGFueSxcblx0aWRfY2FyZF9jb250cmFyeT86IGFueSxcbn1cblxuZXhwb3J0IGNvbnN0IHJlcVBhcnRuZXIgPSAoe3Rva2VuLCBwaG9uZSwgbmFtZSwgYWRkcmVzcywgaWRlbnRpdHksIGlkX2NhcmQsIGlkX2NhcmRfY29udHJhcnksIGlkX2NhcmRfcG9zaXRpdmV9OiBQYXJ0bmV0KSA9PiBhamF4KCcvYXBpL3BhcnRuZXInLCB7dG9rZW4sIHBob25lLCBuYW1lLCBhZGRyZXNzLCBpZGVudGl0eSwgaWRfY2FyZCwgaWRfY2FyZF9jb250cmFyeSwgaWRfY2FyZF9wb3NpdGl2ZX0pO1xuXG5cbi8vIOecgeW4guWIl+ihqFxuZXhwb3J0IGNvbnN0IHJlcUFkZHJlc3NMaXN0ID0gKCkgPT4gYWpheCgnL2FwaS9hZGRyZXNzX2xpc3QnKVxuXG5cbi8vIOWPkemAgSDkv6Hmga9cbmV4cG9ydCBjb25zdCBzZW5kTXNnID0gKHttb2JpbGUsIHR5cGV9OiBhbnkpID0+IGFqYXgoJy9hcGkvc2VuZF9tZXNzYWdlJywge21vYmlsZSwgdHlwZX0pO1xuXG4vLyDnlKjmiLfnmbvlvZVcbmludGVyZmFjZSBMb2dpbiB7XG5cdHR5cGU6IG51bWJlcixcblx0b3BlbmlkPzogc3RyaW5nLFxuXHRwaG9uZT86IHN0cmluZyxcblx0cGFzc3dvcmQ/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCBjb25zdCByZXFMb2dpbiA9ICh7dHlwZSwgb3BlbmlkLCBwaG9uZSwgcGFzc3dvcmR9OiBMb2dpbikgPT4gYWpheCgnL2FwaS9sb2dpbicsIHt0eXBlLCBvcGVuaWQsIHBob25lLCBwYXNzd29yZH0pO1xuIl19