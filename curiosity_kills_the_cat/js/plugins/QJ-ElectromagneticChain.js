//=============================================================================
// RPG Maker MV QJ-ElectromagneticChain.js
//=============================================================================
/*:
 * @plugindesc Electromagnetic chain management
 * @author Qiu Jiu
 *
 *
 * @help
 *
 *
 *
*/
//=============================================================================
//
//=============================================================================
(()=>{
//=============================================================================
//
//=============================================================================
const EC_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    EC_Game_Map_setup.call(this,mapId);
    this._dctList = [];
    this._dctListRem = {};
};
const EC_Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    EC_Game_Map_update.call(this,sceneActive);
    this.updateElectromagneticChain();
};
Game_Map.prototype.updateElectromagneticChain = function() {
    let events = this._events;
    for (let i=0,il=this._dctList,dlr=this._dctListRem,ill=il.length;i<ill;i++) {
        if (il[i]) {
            if (events[il[i]]) {
                if (!dlr[il[i]]) {
                    for (let j in dlr) {
                        let e1 = "E["+j+"]",e2 = "E["+il[i]+"]";
                        //电磁链子弹设置=======================================
                        QJ.BL.TwoPoint(e1,e1+"-36",e2,e2+"-36",
                            {Target:["G[enemy]"],
                            Img:"electricity[4,5]",
                            Max:999999999,
                            Action:["C[1,1]"]});
                        //====================================================
                    }
                    dlr[il[i]] = 1;
                }
            } else {
                il[i] = 0;
                dlr[il[i]] = 0;
            }
        }
    }
};
//=============================================================================
//
//=============================================================================
})();
//=============================================================================
//
//=============================================================================