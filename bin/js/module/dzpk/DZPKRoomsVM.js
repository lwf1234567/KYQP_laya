var module;
(function (module) {
    var dzpk;
    (function (dzpk) {
        class DZPKRoomsVM extends mbase.base.MViewModel {
            constructor() {
                super();
                this.setClass = dzpk.DZPKRoomsView;
                this.setAtlasName = "res/atlas/dzpk/roomHallScene.atlas,res/atlas/dzpk/zh-cn/roomHallScene.atlas";
            }
            onShowHelp() {
                this.showOther("DZPKHelpVM");
            }
            onShowRecord() {
                this.showOther("DZPKRecordVM");
            }
            backToHall() {
                this.showOther("SCENE_HallVM");
            }
            onChoseRoom(roomIndex) {
                let roomInfo = this.getRoomInfo(roomIndex);
                if (!roomInfo)
                    core.CFun.throw("所选房间" + roomIndex + "不存在");
                let playerMoney = this.data.gold;
                let minMoney = roomInfo.chip;
                if (playerMoney < minMoney) {
                    core.CFun.dialog("游戏币不足，匹配失败，请充值后继续游戏！", null, null, "确 定");
                    return;
                }
                this.data.lastRoomId = roomInfo.id;
                let maxMoney = (roomInfo.maxchip >= playerMoney || roomInfo.maxchip == 0) ? playerMoney : roomInfo.maxchip;
                //获取本定玩家上次设置的携带筹码数量
                let storageData = core.CFun.getLSItem(StorageKeys.DZPKTakeScore + this.data.lastRoomId, "Object");
                let takeScore = storageData.takeScore == undefined ? roomInfo.defaultTakeIn : storageData.takeScore;
                takeScore = takeScore < maxMoney ? takeScore : maxMoney;
                takeScore = takeScore == 0 ? roomInfo.defaultTakeIn : takeScore;
                takeScore = takeScore > playerMoney ? playerMoney : takeScore;
                if (storageData.isautoTakeScore == undefined) {
                    storageData.isautoTakeScore = false;
                }
                let obj = { playerMoney: playerMoney, max: maxMoney, min: minMoney, take: takeScore, isAuto: storageData.isautoTakeScore, roomInfo: roomInfo };
                this.showOther("DZPKTakeVM", obj);
            }
            getRoomInfo(roomIndex) {
                let roomInfo = null;
                if (this.playerData.roomDataList[mbase.data.Player.HOLDEM][roomIndex]) {
                    roomInfo = this.playerData.roomDataList[mbase.data.Player.HOLDEM][roomIndex];
                }
                return roomInfo;
            }
            //继承的
            onShow(recv) {
                super.onShow(this.playerData);
                this.sendData(16778269, [mbase.data.Player.HOLDEM]); //changeGameType 
            }
            //继承的
            eventInit() {
                // this.regist("client_Player_onEnterRoomList",this.onSceneChange);
            }
        }
        dzpk.DZPKRoomsVM = DZPKRoomsVM;
    })(dzpk = module.dzpk || (module.dzpk = {}));
})(module || (module = {}));
//# sourceMappingURL=DZPKRoomsVM.js.map