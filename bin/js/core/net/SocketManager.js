/**
 * @description socket管理类，通过connect可生成多个socket连接
 * @author wangyz
 * @export
 * @class SocketManager
 */
var SocketManager = /** @class */ (function () {
    function SocketManager() {
        this._dic_ws = {};
    }
    /*
    main是URL或者host
    如果sub不存在，则是连接url
    */
    SocketManager.prototype.connect = function (main, sub) {
        if (sub === void 0) { sub = null; }
        if (SocketManager.arr_address.length > 0) {
            for (var i = 0; i < SocketManager.arr_address.length; i++) {
                if (SocketManager.arr_address[i].hasOwnProperty("main")) {
                    if (SocketManager.arr_address[i]["main"] == main && SocketManager.arr_address[i]["sub"] == sub) {
                    }
                    else {
                        SocketManager.arr_address.push({ "main": main, "sub": sub });
                    }
                }
            }
        }
        else {
            SocketManager.arr_address.push({ "main": main, "sub": sub });
        }
        var tuple = this.getWSBykey(main, sub);
        var ws = tuple[0];
        var key = tuple[1];
        if (!ws) {
            ws = new laya.net.Socket();
            ws.endian = Laya.Byte.LITTLE_ENDIAN;
            this._dic_ws[key] = ws;
            ws.on(laya.events.Event.MESSAGE, ws, this.onMessage);
            ws.on(laya.events.Event.OPEN, ws, this.onOpen);
            ws.on(laya.events.Event.CLOSE, ws, this.onClose);
            ws.on(laya.events.Event.ERROR, ws, this.onError);
        }
        else {
            ws = this._dic_ws[key];
        }
        if (!sub) {
            ws.connectByUrl(main);
        }
        else {
            ws.connect(main, Number(sub));
        }
    };
    /**
     * @description 清除socket连接
     * @author wangyz
     * @param {string} main 连接地址(url\host)
     * @param {string} [sub] 连接地址(port)
     * @memberof SocketManager
     */
    SocketManager.prototype.destroy = function (main, sub) {
        if (sub === void 0) { sub = null; }
        var tuple = this.getWSBykey(main, sub);
        var ws = tuple[0];
        var key = tuple[1];
        if (ws) {
            ws.offAll();
            ws.cleanSocket();
            ws = null;
            this._dic_ws[key] = null;
            delete this._dic_ws[key];
        }
        else {
            CFun.throw("正在清除不存在的链接");
        }
    };
    /*
    关闭连接，但是事件和字典没有移除
    */
    SocketManager.prototype.close = function (main, sub) {
        if (sub === void 0) { sub = null; }
        var tuple = this.getWSBykey(main, sub);
        var ws = tuple[0];
        if (ws) {
            ws.close();
        }
        else {
            CFun.throw("正在关闭不存在的链接");
        }
    };
    /**
     * 发送数据
     * @param {*} pac 待发送数据
     * @param {string} main 连接地址(url\host)
     * @param {string} [sub] 连接地址(port)
     * @memberof SocketManager
     */
    SocketManager.prototype.send = function (pac, main, sub) {
        if (sub === void 0) { sub = null; }
        var tuple = this.getWSBykey(main, sub);
        var ws = tuple[0];
        var key = tuple[1];
        if (!ws) {
            CFun.throw("正在向不存在的" + key + "链接发送消息");
        }
        var flushData = AnalyzeData.ins.analyzeSend(pac, key);
        ws.send(flushData[1]);
        laya.utils.Pool.recover("tmpByte", flushData[0]);
    };
    SocketManager.prototype.onMessage = function (msg) {
        if (msg === void 0) { msg = null; }
        var key = SocketManager.ins.getKeyByWS(this);
        var recvData = AnalyzeData.ins.analyzeRecv(msg, key);
    };
    /**
    获取不到key值，把作用域改了
    */
    SocketManager.prototype.getKeyByWS = function (ws) {
        for (var key in this._dic_ws) {
            if (this._dic_ws[key] == ws) {
                return key;
            }
        }
        return "";
    };
    SocketManager.prototype.getWSBykey = function (main, sub) {
        if (sub === void 0) { sub = null; }
        var key = "";
        if (!sub)
            key = main + "," + sub;
        else
            key = main;
        return [this._dic_ws[key], key];
    };
    Object.defineProperty(SocketManager, "ins", {
        get: function () {
            if (!this._instance) {
                this._instance = new SocketManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SocketManager.prototype.onOpen = function (event) {
        if (event === void 0) { event = null; }
    };
    SocketManager.prototype.onClose = function (event) {
        if (event === void 0) { event = null; }
        CFun.log("连接关闭：" + event);
    };
    SocketManager.prototype.onError = function (event) {
        if (event === void 0) { event = null; }
        CFun.log("连接错误：" + event);
    };
    //设置一个默认的地址
    SocketManager.arr_address = [];
    return SocketManager;
}());
//# sourceMappingURL=SocketManager.js.map