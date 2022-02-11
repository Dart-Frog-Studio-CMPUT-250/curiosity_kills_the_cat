	/*
 * ==============================================================================
 * ** Victor Engine MV - Diagonal Movement
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.12.15 > First release.
 *  v 1.01 - 2016.03.23 > Compatibility with YEP Event Chase Player.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Diagonal Movement'] = '1.00';

var VictorEngine = VictorEngine || {};
VictorEngine.DiagonalMovement = VictorEngine.DiagonalMovement || {};

(function() {

	VictorEngine.DiagonalMovement.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.DiagonalMovement.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Diagonal Movement', 'VE - Basic Module', '1.06');
	};

	VictorEngine.DiagonalMovement.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.DiagonalMovement.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 *------------------------------------------------------------------------------ 
 * @plugindesc v1.00 - Allows diagonal movement for player and events.
 * @author Victor Sant
 
 * @param Diagonal Adjust
 * @desc Adjust movement speed when waling diagonally.
 * true - ON	false - OFF
 * @default true
 *
 * @param Diagonal Events
 * @desc All events will have diagonal movement by default.
 * true - ON	false - OFF
 * @default false
 *
 * @param Diagonal Fix
 * @desc When the diagonal movement is blocked the character moves 
 * straight.	true - ON	false - OFF
 * @default false
 *
 * @param Diagonal Trigger
 * @desc Trigger events diagonally.
 * true - ON	false - OFF
 * @default false
 *
 * @param Corner Passability
 * @desc Pass through corners. (This cause a small graphic glitch with
 * tree, so it's disabled by default).	true - ON	false - OFF
 * @default false
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 *  Plugin Commands:
 * ------------------------------------------------------------------------------
 *
 *  DiagonalMovement on player
 *  DiagonalMovement off player
 *    Turn on/off player diagonal movement
 *
 * ---------------
 *
 *  DiagonalMovement on event x
 *  DiagonalMovement off event x
 *    Turn on/off diagonal movement for the event ID = X.
 *
 * ------------------------------------------------------------------------------
 *  Event Comments:
 * ------------------------------------------------------------------------------
 *
 *  <diagonal move>
 *  Enables diagonal movement for the event while the page with this comment
 *  is active.
 *
 * ---------------
 *
 *  <block diagonal>
 *  Disable diagonal movement for the event while the page with this comment
 *  is active if you turned ON the 'Diagonal Events' plugin parameter.
 *
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  To use diagonal sprites you will need a special setup for your charset 
 *  graphic. First, it must be a default template with 8 sprites (single sprites
 *  will not work). Then you need to add the '%' prefix to the charser filename.
 *  (for example, a charset named 'Actor' should be renamed '%Actor').
 *
 * ---------------
 *
 *  The charset graphic should be as the following model.
 *    ____________ _____________ ____________ _____________ 
 *   |            |             |            |             |
 *   |            |             |            |             |
 *   |  charset 1 |  charset 1  |  charset 2 |  charset 2  |
 *   |            |  diagonal   |            |  diagonal   |
 *   |            |             |            |             |
 *   |____________|_____________|____________|_____________|
 *   |            |             |            |             |
 *   |            |             |            |             |
 *   |  charset 3 |  charset 3  |  charset 4 |  charset 4  |
 *   |            |  diagonal   |            |  diagonal   |
 *   |            |             |            |             |
 *   |____________|_____________|____________|_____________|
 *
 * ---------------
 *
 *  Thedirection the graphic is facing should be as the following model.
 *    ____________ _____________ ____________ _____________ 
 *   |            |             |            |             |
 *   |    down    | lower left  |    down    | lower left  |
 *   |    left    | upper left  |    left    | upper left  |
 *   |    right   | lower right |    right   | lower right |
 *   |    up      | upper right |    up      | upper right |
 *   |____________|_____________|____________|_____________|
 *   |            |             |            |             |
 *   |    down    | lower left  |    down    | lower left  |
 *   |    left    | upper left  |    left    | upper left  |
 *   |    right   | lower right |    right   | lower right |
 *   |    up      | upper right |    up      | upper right |
 *   |____________|_____________|____________|_____________|
 *	
 * Single charsets (with the $ sign) and 8 sprites charsets without the % sign
 * will not display diagonal sprites for movement.
 * 
 * ------------------------------------------------------------------------------
 */

	
(function() {

	//=============================================================================
	// Parameters
	//=============================================================================
	
	if (Imported['VE - Basic Module']) {
		var parameters = VictorEngine.getPluginParameters();
		VictorEngine.Parameters = VictorEngine.Parameters || {};
		VictorEngine.Parameters.DiagonalMovement = {};
		VictorEngine.Parameters.DiagonalMovement.DiagonalAdjust    = eval(parameters["Diagonal Adjust"]);
		VictorEngine.Parameters.DiagonalMovement.DiagonalEvents    = eval(parameters["Diagonal Events"]);
		VictorEngine.Parameters.DiagonalMovement.DiagonalFix       = eval(parameters["Diagonal Fix"]);
		VictorEngine.Parameters.DiagonalMovement.DiagonalTrigger   = eval(parameters["Diagonal Trigger"]);
		VictorEngine.Parameters.DiagonalMovement.CornerPassability = eval(parameters["Corner Passability"]);
	};
	
	//=============================================================================
	// ImageManager
	//=============================================================================
	
	ImageManager.isDiagonalCharacter = function(filename) {
		var sign = filename.match(/^[\!\%]+/);
		return sign && sign[0].contains('%') && !this.isBigCharacter(filename);
	};

	//=============================================================================
	// Game_CharacterBase
	//=============================================================================
	
	VictorEngine.DiagonalMovement.initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		VictorEngine.DiagonalMovement.initMembers.call(this);
		this._diagonal = 0;
	};
	
	VictorEngine.DiagonalMovement.moveStraight = Game_CharacterBase.prototype.moveStraight;
	Game_CharacterBase.prototype.moveStraight = function(d) {
		if (this.isDiagonalEnabled() && d % 2 !== 0) {
			this._diagonal = d;
			var horz = (d === 1 || d === 7) ? 4 : 6;
			var vert = (d === 1 || d === 3) ? 2 : 8;
			this.moveDiagonally(horz, vert)
		} else {
			this._diagonal = 0;
			VictorEngine.DiagonalMovement.moveStraight.call(this, d);
		}
	};
	
	VictorEngine.DiagonalMovement.characterIndex = Game_CharacterBase.prototype.characterIndex;
	Game_CharacterBase.prototype.characterIndex = function() {
		var adjust = (this.isDiagonal() && this.isDiagonalCharacter()) ? 1 : 0;
		return VictorEngine.DiagonalMovement.characterIndex.call(this) + adjust;
	};
	
	VictorEngine.DiagonalMovement.moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
	Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
		if (this.isDiagonalEnabled()) this.setDiagonalDirection(horz, vert);
		VictorEngine.DiagonalMovement.moveDiagonally.call(this, horz, vert);
		if (this.isDiagonalEnabled()) this.diagonalDirection();
		if (!this.isMovementSucceeded()) this.checkEventTriggerTouchFront(this._diagonal);
	};
	
	VictorEngine.DiagonalMovement.distancePerFrame = Game_CharacterBase.prototype.distancePerFrame;
	Game_CharacterBase.prototype.distancePerFrame = function() {
		var distance = VictorEngine.DiagonalMovement.distancePerFrame.call(this);
		var adjust   = VictorEngine.Parameters.DiagonalMovement.DiagonalAdjust;
		if (adjust && this.isDiagonal()) distance /= Math.sqrt(2);
		return distance
	};
	
	VictorEngine.DiagonalMovement.canPassDiagonally = Game_CharacterBase.prototype.canPassDiagonally;
	Game_CharacterBase.prototype.canPassDiagonally = function(x, y, horz, vert) {
		if (VictorEngine.Parameters.DiagonalMovement.CornerPassability) {
			return VictorEngine.DiagonalMovement.canPassDiagonally.call(this, x, y, horz, vert)
		} else {
			var x2 = $gameMap.roundXWithDirection(x, horz);
			var y2 = $gameMap.roundYWithDirection(y, vert);
			return (this.canPass(x, y, vert) && this.canPass(x, y2, horz) &&
					this.canPass(x, y, horz) && this.canPass(x2, y, vert))
		}
	};

	VictorEngine.DiagonalMovement.copyPosition = Game_CharacterBase.prototype.copyPosition;
	Game_CharacterBase.prototype.copyPosition = function(character) {
		VictorEngine.DiagonalMovement.copyPosition.call(this, character);
		this._diagonal = character._diagonal
		this._diagonalEnabled = character._diagonalEnabled
		this.diagonalDirection();
	};
		
	VictorEngine.DiagonalMovement.checkEventTriggerTouchFront = Game_CharacterBase.prototype.checkEventTriggerTouchFront;
	Game_CharacterBase.prototype.checkEventTriggerTouchFront = function(d) {
		if (VictorEngine.Parameters.DiagonalMovement.DiagonalTrigger && d % 2 !== 0){
			var horz = ((d === 1 || d === 7) ? 4 : 6);
			var vert = ((d === 1 || d === 3) ? 2 : 8);
			var x2 = $gameMap.roundXWithDirection(this.x, horz);
			var y2 = $gameMap.roundYWithDirection(this.y, vert);
			this.checkEventTriggerTouch(x2, y2);
			if (!$gameMap.isEventRunning()) this.checkEventTriggerTouch(this.x, y2);
			if (!$gameMap.isEventRunning()) this.checkEventTriggerTouch(x2, this.y);
		} else {
			VictorEngine.DiagonalMovement.checkEventTriggerTouchFront.call(this, d)
		}				
	};
	
	Game_CharacterBase.prototype.setDiagonalDirection = function(horz, vert) {
		if (horz === 4 && vert === 2) this._diagonal = 1;
		if (horz === 6 && vert === 2) this._diagonal = 3;
		if (horz === 4 && vert === 8) this._diagonal = 7;
		if (horz === 6 && vert === 8) this._diagonal = 9;
	};
	
	Game_CharacterBase.prototype.diagonalDirection = function() {
		if (this.isDiagonalCharacter()) {
			if (this._diagonal === 1) this.setDirection(2);
			if (this._diagonal === 7) this.setDirection(4);
			if (this._diagonal === 3) this.setDirection(6);
			if (this._diagonal === 9) this.setDirection(8);
		}
	};
	
	Game_CharacterBase.prototype.isDiagonalEnabled = function() {
		return (this._diagonalEnabled === true);
	};
	
	Game_CharacterBase.prototype.isDiagonal = function() {
		return (this._diagonal !== 0)
	};	

	Game_CharacterBase.prototype.isDiagonalCharacter = function() {
		return ImageManager.isDiagonalCharacter(this._characterName)
	};
	
	Game_CharacterBase.prototype.setDiagonalOn = function() {
		this._diagonalEnabled = true
	};	
	
	Game_CharacterBase.prototype.setDiagonalOff = function() {
		this._diagonalEnabled = false
	};
		
	Game_CharacterBase.prototype.setDiagonalTriggerOn = function() {
		this._diagonalTrigger = true
	};	
	
	Game_CharacterBase.prototype.setDiagonalTriggerOff = function() {
		this._diagonalTrigger = false
	};
	
	//=============================================================================
	// Game_Character
	//=============================================================================
		
	Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
		var searchLimit = this.searchLimit();
		var mapWidth = $gameMap.width();
		var nodeList = [];
		var openList = [];
		var closedList = [];
		var start = {};
		var best = start;
		if (this.x === goalX && this.y === goalY) return 0;
		start.parent = null;
		start.x = this.x;
		start.y = this.y;
		start.g = 0;
		start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
		nodeList.push(start);
		openList.push(start.y * mapWidth + start.x);
		while (nodeList.length > 0) {
			var bestIndex = 0;
			for (var i = 0; i < nodeList.length; i++) {
				if (nodeList[i].f < nodeList[bestIndex].f) bestIndex = i;
			}
			var current = nodeList[bestIndex];
			var x1 = current.x;
			var y1 = current.y;
			var pos1 = y1 * mapWidth + x1;
			var g1 = current.g;
			nodeList.splice(bestIndex, 1);
			openList.splice(openList.indexOf(pos1), 1);
			closedList.push(pos1);
			if (current.x === goalX && current.y === goalY) {
				best = current;
				goaled = true;
				break;
			}
			if (g1 >= searchLimit) continue;
			var list = [2, 4, 6, 8, 1, 3, 7, 9,];
			for (var i = 0; i < list.length; i++) {
				var direction = list[i]
				if (direction % 2 == 0) {
					var x2 = $gameMap.roundXWithDirection(x1, direction);
					var y2 = $gameMap.roundYWithDirection(y1, direction);
				} else {
					var horz = ((direction === 1 || direction === 7) ? 4 : 6);
					var vert = ((direction === 1 || direction === 3) ? 2 : 8);
					var x2 = $gameMap.roundXWithDirection(x1, horz);
					var y2 = $gameMap.roundYWithDirection(y1, vert);
				}
				var pos2 = y2 * mapWidth + x2;
				if (closedList.contains(pos2)) continue;
				if (!this.canPassFindDirection(x1, y1, direction)) continue;	
				var g2 = g1 + ((direction % 2 === 0) ? 1 : 1.4);
				var index2 = openList.indexOf(pos2);
				if (index2 < 0 || g2 < nodeList[index2].g) {
					var neighbor;
					if (index2 >= 0) {
						neighbor = nodeList[index2];
					} else {
						neighbor = {};
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) best = neighbor;
				}
			}
		}
		var node = best;
		while (node.parent && node.parent !== start) node = node.parent;
		var deltaX1 = $gameMap.deltaX(node.x, start.x);
		var deltaY1 = $gameMap.deltaY(node.y, start.y);
		if (deltaX1 !== 0 && deltaY1 !==  0) {
			if (deltaX1 < 0 && deltaY1 > 0) return 1;
			if (deltaX1 > 0 && deltaY1 > 0) return 3;
			if (deltaX1 < 0 && deltaY1 < 0) return 7;
			if (deltaX1 > 0 && deltaY1 < 0) return 9;
		};
		if (deltaY1 > 0) {
			return 2;
		} else if (deltaX1 < 0) {
			return 4;
		} else if (deltaX1 > 0) {
			return 6;
		} else if (deltaY1 < 0) {
			return 8;
		}
		var deltaX2 = this.deltaXFrom(goalX);
		var deltaY2 = this.deltaYFrom(goalY);
		if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
			return deltaX2 > 0 ? 4 : 6;
		} else if (deltaY2 !== 0) {
			return deltaY2 > 0 ? 8 : 2;
		}
		return 0;
	};

	VictorEngine.DiagonalMovement.moveRandom = Game_Character.prototype.moveRandom;
	Game_Character.prototype.moveRandom = function() {
		var direction = Math.randomInt(10)
		if (this.isDiagonalEnabled() && direction % 2 !== 0 && direction !== 5) {
			var horz = (direction === 1 || direction === 7) ? 4 : 6;
			var vert = (direction === 1 || direction === 3) ? 2 : 8;
			if (this.canPassDiagonally(this.x, this.y, horz, vert)) {
				this.moveDiagonally(horz, vert);
			};
		} else {
			VictorEngine.DiagonalMovement.moveRandom.call(this);
		};
	};

	
	VictorEngine.DiagonalMovement.moveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
	Game_Character.prototype.moveTowardCharacter = function(character) {
		var deltaX = this.deltaXFrom(character.x);
		var deltaY = this.deltaYFrom(character.y);
		if (deltaX > 0) { var horz = 4 } else { var horz = 6 };
		if (deltaY > 0) { var vert = 8 } else { var vert = 2 };
		if (this.isDiagonalEnabled() && deltaX !== 0 && deltaY !==  0 && 
			this.canPassDiagonally(this.x, this.y, horz, vert)) {
			this.moveDiagonally(horz, vert);
		} else {
			VictorEngine.DiagonalMovement.moveTowardCharacter.call(this, character);
		};
	};
	
	VictorEngine.DiagonalMovement.moveAwayFromCharacter = Game_Character.prototype.moveAwayFromCharacter;
	Game_Character.prototype.moveAwayFromCharacter = function(character) {
		var deltaX = this.deltaXFrom(character.x);
		var deltaY = this.deltaYFrom(character.y);
		if (deltaX > 0) { var horz = 6 } else { var horz = 4 };
		if (deltaY > 0) { var vert = 2 } else { var vert = 8 };
		if (this.isDiagonalEnabled() && deltaX !== 0 && deltaY !==  0 && 
			this.canPassDiagonally(this.x, this.y, horz, vert)) {
			this.moveDiagonally(horz, vert);
		} else {
			VictorEngine.DiagonalMovement.moveAwayFromCharacter.call(this, character);
		};
	};
	
	VictorEngine.DiagonalMovement.turnTowardCharacter = Game_Character.prototype.turnTowardCharacter;
	Game_Character.prototype.turnTowardCharacter = function(character) {
		var deltaX = this.deltaXFrom(character.x);
		var deltaY = this.deltaYFrom(character.y);
		if (this.isDiagonalEnabled() && deltaX !== 0 && deltaY !==  0) {
			if (deltaX > 0 && deltaY < 0) this._diagonal = 1;
			if (deltaX < 0 && deltaY < 0) this._diagonal = 3;
			if (deltaX > 0 && deltaY > 0) this._diagonal = 7;
			if (deltaX < 0 && deltaY > 0) this._diagonal = 9;
			this.diagonalDirection();
		} else {
			this._diagonal = 0;
			VictorEngine.DiagonalMovement.turnTowardCharacter.call(this, character);
		};
	};

	VictorEngine.DiagonalMovement.turnAwayFromCharacter = Game_Character.prototype.turnAwayFromCharacter;
	Game_Character.prototype.turnAwayFromCharacter = function(character) {
		var deltaX = this.deltaXFrom(character.x);
		var deltaY = this.deltaYFrom(character.y);
		if (this.isDiagonalEnabled() && deltaX !== 0 && deltaY !==  0) {
			if (deltaX < 0 && deltaY > 0) this._diagonal = 1;
			if (deltaX > 0 && deltaY > 0) this._diagonal = 3;
			if (deltaX < 0 && deltaY < 0) this._diagonal = 7;
			if (deltaX > 0 && deltaY < 0) this._diagonal = 9;
			this.diagonalDirection();
		} else {
			this._diagonal = 0;
			VictorEngine.DiagonalMovement.turnAwayFromCharacter.call(this, character);
		};
	};
	
	VictorEngine.DiagonalMovement.moveForward = Game_Character.prototype.moveForward;
	Game_Character.prototype.moveForward = function() {
		if (this.isDiagonal()) {
			this.diagonalMovement(this._diagonal);
			if (this.needDiagonalFix()) this.diagonalMovementFix(this._diagonal);
		} else {
			VictorEngine.DiagonalMovement.moveForward.call(this);
		}
	};
	
	Game_CharacterBase.prototype.canPassFindDirection = function(x, y, d) {
		if (d % 2 !== 0) {
			var horz = ((d === 1 || d === 7) ? 4 : 6);
			var vert = ((d === 1 || d === 3) ? 2 : 8);
			return this.canPassDiagonally(x, y, horz, vert);
		} else {
			return this.canPass(x, y, d);
		}
	};
	
	Game_Character.prototype.needDiagonalFix = function() {
		return (!this.isMoving() && VictorEngine.Parameters.DiagonalMovement.DiagonalFix);
	};
	
	Game_Character.prototype.diagonalMovement = function(d) {
		if (d === 1) this.moveDiagonally(4, 2);
		if (d === 3) this.moveDiagonally(6, 2);
		if (d === 7) this.moveDiagonally(4, 8);
		if (d === 9) this.moveDiagonally(6, 8);
	};

	Game_Character.prototype.diagonalMovementFix = function(d) {
		this._diagonal = 0;
		if (d === 1) {
			this.moveStraight(4);
			if (!this.isMoving()) this.moveStraight(2);
		} else if (d === 3){
			this.moveStraight(6);
			if (!this.isMoving()) this.moveStraight(2);
		} else if (d === 7){
			this.moveStraight(4);
			if (!this.isMoving()) this.moveStraight(8);
		} else if (d === 9){
			this.moveStraight(6);
			if (!this.isMoving()) this.moveStraight(8);
		}
	};
	
	//=============================================================================
	// Game_Player
	//=============================================================================
	
	VictorEngine.DiagonalMovement.gamePlayerinitMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
		VictorEngine.DiagonalMovement.gamePlayerinitMembers.call(this);
		this.setDiagonalOn();
	};
	
	VictorEngine.DiagonalMovement.getInputDirection = Game_Player.prototype.getInputDirection;
	Game_Player.prototype.getInputDirection = function() {
		if (this.isDiagonalEnabled()) {
			return Input.dir8;
		} else {
			return VictorEngine.DiagonalMovement.getInputDirection.call(this);
		};
	};
	
	VictorEngine.DiagonalMovement.executeMove = Game_Player.prototype.executeMove;
	Game_Player.prototype.executeMove = function(direction) {
		if (direction % 2 !== 0) {
			this._diagonal = direction;
			this.diagonalMovement(direction);
			if (this.needDiagonalFix()) this.diagonalMovementFix(direction);
		} else {
			this._diagonal = 0;
			VictorEngine.DiagonalMovement.executeMove.call(this, direction);
		};
	};
	
	VictorEngine.DiagonalMovement.checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
	Game_Player.prototype.checkEventTriggerThere = function(triggers) {
		if (VictorEngine.Parameters.DiagonalMovement.DiagonalTrigger && this.isDiagonal()){
			if (this.canStartLocalEvents()) {
				var horz = ((this._diagonal === 1 || this._diagonal === 7) ? 4 : 6);
				var vert = ((this._diagonal === 1 || this._diagonal === 3) ? 2 : 8);
				var x2 = $gameMap.roundXWithDirection(this.x, horz);
				var y2 = $gameMap.roundYWithDirection(this.y, vert);
				this.startMapEvent(x2, y2, triggers, true);
			}
		} else {
			VictorEngine.DiagonalMovement.checkEventTriggerThere.call(this, triggers);
		}
	};
	
	//=============================================================================
	// Game_Follower
	//=============================================================================
	
	Game_Follower.prototype.isDiagonalEnabled = function() {
		return $gamePlayer.isDiagonalEnabled();
	}
	
	Game_Follower.prototype.distancePerFrame = function() {
		var distance = VictorEngine.DiagonalMovement.distancePerFrame.call(this);
		var adjust   = VictorEngine.Parameters.DiagonalMovement.DiagonalAdjust;
		if (adjust && $gamePlayer.isDiagonal()) distance /= Math.sqrt(2);
		return distance
	};
	
	//=============================================================================
	// Game_Event
	//=============================================================================
	
	VictorEngine.DiagonalMovement.clearPageSettings = Game_Event.prototype.clearPageSettings;
	Game_Event.prototype.clearPageSettings = function() {
		VictorEngine.DiagonalMovement.clearPageSettings.call(this);
		this.setDiagonalOff();
	};

	VictorEngine.DiagonalMovement.setupPageSettings = Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		VictorEngine.DiagonalMovement.setupPageSettings.call(this);
		this.enableDiagonalEvent();
		this.disableDiagonalEvent();
	};
		
	VictorEngine.DiagonalMovement.lock = Game_Event.prototype.lock;
	Game_Event.prototype.lock = function() {
		this._prelockDiagonal = this._diagonal;
		VictorEngine.DiagonalMovement.lock.call(this);
	};
	
	VictorEngine.DiagonalMovement.unlock = Game_Event.prototype.unlock;
	Game_Event.prototype.unlock = function() {
		this._diagonal = this._prelockDiagonal;
		VictorEngine.DiagonalMovement.unlock.call(this);
	};
		
	Game_Event.prototype.enableDiagonalEvent = function() {
		var regex = new RegExp('<diagonal[ ]*move>', 'gi');
		var note  = VictorEngine.getPageNotes(this)
		if (VictorEngine.Parameters.DiagonalMovement.DiagonalEvents || regex.test(note)) {
			this.setDiagonalOn();
		};
	};	

	Game_Event.prototype.disableDiagonalEvent = function() {
		var regex = new RegExp('<disable[ ]*diagonal>', 'gi');
		var note  = VictorEngine.getPageNotes(this)
		if (regex.test(note)) this.setDiagonalOff();
	};
	
	//=============================================================================
	// Game_Interpreter
	//=============================================================================

	VictorEngine.DiagonalMovement.pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		VictorEngine.DiagonalMovement.pluginCommand.call(this, command, args);
		if (command.toLowerCase() === 'diagonalmovement') {
			switch (args[1].toLowerCase()) {
			case 'player':
				if (args[0].toLowerCase() === 'on')  $gamePlayer.setDiagonalOn();
				if (args[0].toLowerCase() === 'off') $gamePlayer.setDiagonalOff();
				break;
			case 'event':
				var event = $gameMap.event(Number(args[2]));
				if (args[0].toLowerCase() === 'on')  event.setDiagonalOn();
				if (args[0].toLowerCase() === 'off') event.setDiagonalOff();
				break;
			}
		}
	};
	
	//=============================================================================
	// Sprite_Character
	//=============================================================================

	VictorEngine.DiagonalMovement.isImageChanged = Sprite_Character.prototype.isImageChanged;
	Sprite_Character.prototype.isImageChanged = function() {
		return (this._isDiagonal !== this._character.isDiagonal() ||
				VictorEngine.DiagonalMovement.isImageChanged.call(this));
	}
		
	VictorEngine.DiagonalMovement.setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
	Sprite_Character.prototype.setCharacterBitmap = function() {
		this._isDiagonal = this._character.isDiagonal();
		VictorEngine.DiagonalMovement.setCharacterBitmap.call(this);
	};

})();