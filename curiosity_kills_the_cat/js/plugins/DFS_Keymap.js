/*:
 * @plugindesc This plugin ables new keymap: WASD and V
 * @author Duc Ho - From Dart Frog Studio - CMPUT 250
 * @help
 * This script just add a new key into RPG Maker MV, which is WASD and V
 */

(function () {
  Input.keyMapper[86] = "action"; // keycode for V;
  Input.keyMapper[65] = "left"; // keycode for A;
  Input.keyMapper[83] = "down"; // keycode for S;
  Input.keyMapper[87] = "up"; // keycode for W;
  Input.keyMapper[68] = "right"; // keycode for D;
})();
