//=============================================================================
// RPG Maker MV
//=============================================================================
/*:
 * @plugindesc Set a switch. When this switch is turned on, players cannot use the direction keys to control the character's movement.
 * @author Qiu Jiu
 *
 *
 * @help
 *
 * @param switch
 * @type switch
 * @text switch id
 * @desc When this switch is true, players cannot use the arrow keys to manipulate the character's movement.
 * @default 1
 *
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
const pluginName = "QJ-BindMove";
const parameters = PluginManager.parameters(pluginName);
const switchId=eval(parameters['switchId']) || [];
//=============================================================================
//
//=============================================================================
const BM_Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    if ($gameSwitches.value(switchId)) return;
    BM_Game_Player_moveByInput.call(this);
};
//=============================================================================
//
//=============================================================================
})();
//=============================================================================
//
//=============================================================================