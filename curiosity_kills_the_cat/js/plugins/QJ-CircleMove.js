//=============================================================================
// RPG Maker MV
//=============================================================================
/*:
 * @plugindesc Add a rotation track for the event
 * @author Qiu Jiu
 *
 *
 * @help
 *
 * this.rotateMove(centerCharacter,initR,radius,speed,force);
 *
 *
 *
*/
//=============================================================================
//
//=============================================================================
Game_Character.prototype.rotateMove = function(centerCharacter,initR,radius,speed,force) {
    if (this.isMoving()) return;
    if (centerCharacter==-1) centerCharacter = $gamePlayer;
    else if (centerCharacter>0) centerCharacter = $gameMap.event(centerCharacter);
    else return;
    if (this.rotateDegree==undefined) this.rotateDegree = initR*Math.PI/180;
    if (force==undefined) force = true;
    this._x = centerCharacter._realX + radius/48*Math.sin(this.rotateDegree);
    this._y = centerCharacter._realY - radius/48*Math.cos(this.rotateDegree);
    if (force) {
        this._realX = this._x;
        this._realY = this._y;
    }
    this.rotateDegree += speed*Math.PI/180;
}
//=============================================================================
//
//=============================================================================