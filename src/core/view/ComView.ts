module core.view{
    export class ComView extends laya.ui.View{
        public static TOP:string = "top";
        public static WINDOW:string = "window";
        /**
         * 不需要点击空白处关窗的界面
         */
        public static WINDOW_NO_CLOSEAUTO:string = "window_no_closeauto";
        public static SCENE:string = "scene";

        protected _vm:core.viewmodel.ViewModel;

        public c_name:string;
        protected _view_type:string = "other";
        public get viewType():string{
            return this._view_type;
        }

        public get vm():core.viewmodel.ViewModel{
            if(!this._vm) core.CFun.throw("ComView中_vm还未初始化！");
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
    }
}