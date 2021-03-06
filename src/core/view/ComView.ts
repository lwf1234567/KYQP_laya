module mview{
    export class ComView extends laya.ui.View{
        public static TOP:string = "top";
        public static WINDOW:string = "window";
        /**
         * 不需要点击空白处关窗的界面
         */
        public static WINDOW_NO_CLOSEAUTO:string = "window_no_closeauto";
        public static SCENE:string = "scene";

        protected _vm:ViewModel;

        public c_name:string;
        protected _view_type:string = "other";
        public get viewType():string{
            return this._view_type;
        }

        public get vm():ViewModel{
            if(!this._vm) CFun.throw("ComView中_vm还未初始化！");
            return this._vm;
        }

        //组件事件初始化，实例化时调用一次
        protected comInit(){

        }

        //显示对象根据数据初始化，每次显示时调用
        public viewInit(data:any):void{

        }

        //关闭前调用
        public beClose(){
            
        }

        protected onClick(e:Event){
            //阻止后续节点的监听器
            e.stopPropagation();
        }

        protected layerInit(){

        }

        constructor(){
            super();
            this.on(Laya.Event.CLICK,this,this.onClick);

            this.comInit();
            this.layerInit();
        }

        createChildren():void {
            super.createChildren();

            let pname = this["__proto__"].constructor["__proto__"].name;
            if(pname == "ComView"){
                pname = this.constructor.name;
            }

            let path = CFun.parsingPath(pname);
            this.createView(Laya.loader.getRes(path));
        }

        // loadUI(path:string):void{
        //     this.createView(Laya.loader.getRes(path + ".json"));
        //     // let parsing_path = CFun.parsingPath(this["__proto__"].constructor["__proto__"].name);
        //     super.loadUI(path);
        // }
    }
}
