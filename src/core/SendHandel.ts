module core{
    export class SendHandel{

        protected send(data:any){
            net.SocketManager.ins.send(data,this._host == undefined?core.net.SocketManager.arr_address[0]["main"]:this._host,
            this._port == undefined?core.net.SocketManager.arr_address[0]["sub"]:this._port);
        }

        protected _host:string;
        protected _port:string;
        constructor(){
            //设置个默认连接，子类需要给其他链接发送数据可改
        }
    }
}