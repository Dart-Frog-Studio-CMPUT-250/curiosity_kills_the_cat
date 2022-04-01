//=============================================================================
//
//=============================================================================
/*:
 * @plugindesc Copy event script[V1.0]
 * @author Qiu Jiu
 *
 * @help
 *
 *
 * @param preLoad
 * @type text
 * @text Pre load list
 * @desc The data of the map ID set here will be preloaded, and there will be no interval between copying and generating events. Use | to separate.
 * @default 13
 *
 *
 * ========================================================
 * 1.spawn event
 * QJ.SE.spawnEvent(0,mapid,eventId,x,y);
 * mapid:orgin map id。
 * eventId:orgin evnet id。
 * x/y:-1 refer to this event.-2 refer to player.
 *
 * e.g:
 * QJ.SE.spawnEvent(0,1,2,3,4);
 * QJ.SE.spawnEvent(0,7,1,-1,-1);
 *
 * ========================================================
 * 2.Clear specified events
 * QJ.SE.clearEvent(id);
 * id:-1 refer to this event.-2 refer to player.
 * 
 * ========================================================
 * 3.Clears all copy events on the current map
 * QJ.SE.clearMap();
 *
 * ========================================================
 * 
 */
//=============================================================================
//
//=============================================================================
var QJ = QJ || {};
QJ.SE = QJ.SE || {};
var Imported = Imported || {};
Imported.QJSpawnEvent = true;
$dataDirectEvent=null;
//=============================================================================
//
//=============================================================================
function Game_SpawnEvent() {
    this.initialize.apply(this, arguments);
}
//=============================================================================
//
//=============================================================================
(()=>{
//=============================================================================
//
//=============================================================================
const pluginName = "QJ-SpawnEvent";
const parameters = PluginManager.parameters(pluginName);
const preLoad = String(parameters["preLoad"]).split("|").map((id)=>Number(id));
let $dataSpawnMapList = {};
//=============================================================================
//
//=============================================================================
const SE_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    SE_Scene_Boot_loadSystemImages.call(this);
    for (let i of preLoad) {
    	DataManager.loadSpawnMapData(0,i,0,0,0);
    }
};
//=============================================================================
//
//=============================================================================
let QJSEInter=null;
QJ.SE.getEvent=()=>{return (typeof QJBInter == "number")?$gameMap.event(QJBInter):$gameMap.event(QJBInter._eventId);};
const QJSE_Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    QJBInter=this;
    return QJSE_Game_Interpreter_executeCommand.call(this);
};
//=============================================================================
//
//=============================================================================
QJ.SE.spawnEvent = function(bid,mapid,eventId,x,y) {//默认为本地图的xy
	if (eventId<=0) {
		console.error("复制事件数据错误。");
		return;
	}
	let event=QJ.SE.getEvent();
	if (x==-1) {
		if (!event) {
			console.error("复制事件数据错误。");
			return;
		} else x=event.x;
	} else if (x==-2) x=$gamePlayer.x;
	if (y==-1) {
		if (!event) {
			console.error("复制事件数据错误。");
			return;
		} else y=event.y;
	} else if (y==-2) y=$gamePlayer.y;
	if (x<0||x>=$gameMap.width()||y<0||y>=$gameMap.height()) {
		console.error("复制事件数据错误,x/y数据不合法。");
		return;
	}
	DataManager.loadSpawnMapData(bid,mapid,eventId,x,y);
};
QJ.SE.clearEvent = function(id) {
	let event=QJ.SE.getEvent();
	if (id==-1) {
		if (!event) {
			console.error("清除事件数据错误。");
			return;
		} else id=event._eventId;
	}
	$gameMap.clearEvent(id);
};
QJ.SE.clearMap = function() {
	$gameMap.clearMap();
};
QJ.SE.clearSwitches = function(mapId,eventId) {
	var switches = ['A','B','C','D'];
	for (var s = 0; s < switches.length; s++) {
		var key = mapId + "," + eventId + "," + switches[s];
		$gameSelfSwitches.setValue(key,false);
	};
};
//=============================================================================
//
//=============================================================================
DataManager.loadSpawnMapData = function(bid,mapid,eventId,x,y) {
    if (Number(mapid) > 0) {
    	if (($dataSpawnMapList[mapid]&&eventId>0)||$dataDirectEvent) {
    		$gameMap.spawnEvent(bid,mapid,eventId,x,y);
    		return;
    	}
        var src = 'Map%1.json'.format(mapid.padZero(3));
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                $dataSpawnMapList[mapid] = JSON.parse(xhr.responseText);
                var object=$dataSpawnMapList[mapid];
                var array;
 	            if (object === $dataSpawnMapList[mapid]) {
                    DataManager.extractMetadata(object);
                    array = object.events;
	            	if (Array.isArray(array)) {
	            		for (var i = 0; i < array.length; i++) {
	            			var data = array[i];
	            			if (data && data.note !== undefined) {
	            				DataManager.extractMetadata(data);
                        	}
	            		}
	            	}
	            }
	            if (eventId>0) $gameMap.spawnEvent(bid,mapid,eventId,x,y);
            }
        };
        xhr.send();
    }
};
//=============================================================================
//
//=============================================================================
Game_Map.prototype.spawnEvent = function(bid,sourcemapid,sourceid,x,y) {
    var maxid = this._events.length;
    this._events.push(new Game_SpawnEvent(bid,sourcemapid,sourceid,maxid,this._mapId,x,y));
    SceneManager._scene._spriteset.createSpawnEvent(maxid);
    this.lastestSpawnEventIdRem = maxid;
    return maxid;
};
Game_Map.prototype.lastestSpawnEventId = function() {
    return this.lastestSpawnEventIdRem;
};
Game_Map.prototype.clearEvent = function(id) {
	this._events[id] = null;
	SceneManager._scene._spriteset.clearEvent(id);
	QJ.SE.clearSwitches(this._mapId,id);
};
Game_Map.prototype.clearMap = function() {
	for (var i in this._events) {
		if (this._events[i]) {
			if (!!this._events[i]._sourceid) {
				$gameMap.clearEvent(i);
			}
		}
	}
};
Game_Map.prototype.clearId = function() {
	//There is no need to do this.
	/*for (var i = this._events.length - 1; i > 0; i--) {
		if (this._events[i] === null) this._events.splice(i, 1);
        else return;
	};*/
};
//=============================================================================
//
//=============================================================================
Spriteset_Map.prototype.clearEvent = function(id) {
	for (var i = 0; i < this._characterSprites.length; i++) {
		var event = this._characterSprites[i]._character;
		if (event._sourceid!=null && id == event._eventId) {
			for (var s = 0; s < this._characterSprites[i]._animationSprites.length; s++) {
				this._tilemap.removeChild(this._characterSprites[i]._animationSprites[s]);
			};
			this._tilemap.removeChild(this._characterSprites[i]);
		};
	};
};
Spriteset_Map.prototype.createSpawnEvent = function(id) {
	var event = $gameMap._events[id];
	var sId = this._characterSprites.length;
	this._characterSprites[sId] = new Sprite_Character(event);
	this._characterSprites[sId].update();
	this._tilemap.addChild(this._characterSprites[sId])
};
//=============================================================================
//
//=============================================================================
Game_SpawnEvent.prototype = Object.create(Game_Event.prototype);
Game_SpawnEvent.prototype.constructor = Game_SpawnEvent;
Game_SpawnEvent.prototype.initialize = function(bid,sourcemapid,sourceid,maxid,mapid,x,y) {
	this._bid = bid;
	this._sourcemapid = sourcemapid;
	this._sourceid = sourceid;
	this._eventId = maxid;
	this._mapId = mapid;
	this._sx = x;
	this._sy = y;
	this._event = $dataDirectEvent?$dataDirectEvent:$dataSpawnMapList[sourcemapid].events[this._sourceid];
	this._event.x = x;
	this._event.y = y;
	Game_Event.prototype.initialize.call(this,mapid,maxid);
	DataManager.extractMetadata(this.event());
	this.refresh();
};
Game_SpawnEvent.prototype.event = function() {
    return this._event;
};
Game_SpawnEvent.prototype.locate = function(x,y) {
    Game_Event.prototype.locate.call(this, x, y);
};
Game_SpawnEvent.prototype.bid = function() {
	return this._bid;
};
//=============================================================================
//
//=============================================================================
})();
//=============================================================================
//
//=============================================================================