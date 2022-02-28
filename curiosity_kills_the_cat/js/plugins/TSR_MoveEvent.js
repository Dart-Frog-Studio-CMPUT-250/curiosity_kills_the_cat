//========================================================================================
//=== TSR_MoveEvent === A Plugin by The Northern Frog ====================================
//========================================================================================

var TSR = TSR || {};
TSR.moveEvent = TSR.moveEvent || {};
TSR.moveEvent.version = 1.4;

var Imported = Imported || {};
Imported.TSR_MoveEvent = true;

//========================================================================================

/*:
 * @target MZ
 * @plugindesc v1.4.0 This plugin allow to push, pull, pick-up and throw events.
 *
 * @author TSR, The Northern Frog, 2021
 * @help
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 * Use the following comment tags to turn the event page into a movable event.
 *
 * Event Comment Tags:
 * ===================
 *
 *            <MOVABLE EVENT>
 *                  Event page having this comment tag can be pushed and
 *                  pulled by the player.
 *
 *                  <MOVABLE EVENT: X>
 *                      You can add a switch (X) argument to the comment
 *                      tag. If so, the event will only be movable when
 *                      the game switch X is ON. While the switch is OFF,
 *                      the player will react as if he can push/pull the
 *                      event, but it won't budge unless the switch is
 *                      turned ON.
 *
 *
 *            <MOVABLE MYSTERY: X>
 *                  Event page having this comment tag can be pushed and
 *                  pulled by the player. In addition, these events will
 *                  play the 'Mystery Sound' (set in parameters), and turn
 *                  ON the switch specified by X.
 *
 *                  This will happen only the first time the event is moved.
 *                  Those events will be considered as regular movable events
 *                  afterwards.
 *
 *
 *            <PICKUP EVENT>
 *                  Event page having this comment tags can be picked up and
 *                  thrown by the player. You can use images from tiles sheets
 *                  or character sheets; in both case the event will be fixed
 *                  on the specified image, no matter the direction. The step
 *                  animation can be toggle ON when using a character sheet.
 *
 *              <PICKUP EVENT: X>
 *                  You can add a self switch X argument to the comment tag.
 *                  The event will turn ON the self switch specified by X
 *                  when it reach the ground after being dropped or thrown.
 *
 *
 *            <PICKUP CHARACTER>
 *                  This comment tag have the same effect than the previous
 *                  one. But event having this comment tag must be assigned
 *                  an image from a character sheet because they will turn
 *                  around according to the player direction when picked up.
 *
 *                  Example:
 *                      The event is turned down and player comes from down
 *                      side (playing is looking up) and pick up the event.
 *                      The event and player are facing each other, so that
 *                      will remain when player change direction. Hence, if
 *                      player turn left, the event will turn right.
 *
 *
 *            <MOVE EVENT OFFSET: X>
 *                  Use this tag if you need to adjust the distance the
 *                  player has to walk to get closer to the movable event.
 *                  Without the tag, the distance will be defined by the
 *                  'move event offset' parameter.
 *
 *                  This commment tag can also be used on pickup events to
 *                  set the distance between the player and the event it is
 *                  holding.
 *
 *
 * Map Note Tag:
 * =============
 *
 *      By default the thrown events respect the same passability as the player.
 *      You can throw events over some unpassable tiles by using the following
 *      tag in a map notebox.
 *
 *            <THROW REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as passable
 *                  for throwing event through those regions.
 *
 *
 *      Some tiles, like rooftop tiles, aren't accessible by the player, but
 *      are considerated as passable. To prevent throwing event on those tiles.
 *      use the map notetag bellow:
 *
 *            <PREVENT THROW REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as impassable
 *                  for throwing event through those regions.
 *
 *
 *      If you're not using the default tile passability and need to restrict
 *      the movement of movable events on some tiles, use the following map
 *      notetag.
 *
 *             <PREVENT MOVE REGION: x, x, x>
 *                  Use this map notetag to mark some region Id as impassable
 *                  for movable event through those regions.
 *
 *
 * HOW TO USE:
 * ===========
 *
 *
 *
 *          TO PUSH: Hold the ARROW KEY in the direction toward the movable
 *                   event until it back off one tile.
 *
 *          TO PULL: Hold the MOVE KEY when standing next to a movable event
 *                   and facing it, and wait until it move one tile.
 *
 *              *The MOVE KEY is the OK button by default. But it can be
 *               changed to another key in the parameters (see bellow).
 *
 *             **There's a small delay when pushing or pulling. Keep holding
 *               the key and you'll see the player starting to 'run' against
 *               the movable event. Then you'll hear the 'Effort Sound' (set
 *               in parameters) and see the 'Effort Balloon' (also set in
 *               parameters). After a few more frames, the event will move
 *               and the player will move along with it.
 *
 *            ***When pushing and pulling, the player will walk shortly to
 *               get closer to the movable event. The default distance is
 *               set in parameters. There's also an event comment tag to
 *               assign specific distance to some events.
 *
 *           ****The pushing and pulling event will move at the speed set in
 *               the event tab. Player will move at same speed when pushing
 *               or pulling the event.
 *
 *
 *         TO PICKUP: Stand in front of a pickable event and hold the MOVE
 *                    KEY to pick it up. Keep holding the key because
 *                    releasing it will drop the event. You can move and
 *                    dash while holding an event.
 *
 *          TO THROW: Release the MOVE KEY to drop the event the player is
 *                    holding. The event will be dropped on the tile in front
 *                    of the player. If you drop it while holding an ARROW
 *                    KEY, the event will be thrown one tile away in front
 *                    of the player. And if you drop while holding both the
 *                    DASH BUTTON and an ARROW KEY, the event will be thrown
 *                    2 tiles away in front of the player.
 *
 *
 *     MOVE KEY
 *     ========
 *     To change the MOVE KEY, write the new key name in the corresponding
 *     parameter. Since 'escape'(open menu) and 'shift'(dash) can't be used,
 *     that leaves the following key names:
 *
 *     tab
 *     control (control, alt)
 *     pageup
 *     pagedown
 *
 *     You can also use alphabetic keys if your game is meant for keyboard
 *     control. Just type the key in the parameter, but keep in mind that
 *     using z, x, q or w won't do anything because these are already used
 *     by default.
 *
 *
 *
 * CHARACTER IMAGES
 * ================
 *
 *      The plugin allow to change the character images while moving events.
 *      To do so, set the sprite sheet name without extension, followed by
 *      the character index, separated by a comma, in the relevant parameter.
 *
 *      The images that can be changed are as follow:
 *
 *          -Push image:   will change the character image while the player is
 *                         pushing an event.
 *          -Pull image:   will change the character image while the player is
 *                         pulling an event.
 *          -Pickup image: will change the character image while the player is
 *                         holding an event.
 *          -throw image:  will change the character image while the player is
 *                         throwing an event.
 *
 *              Example: hero_pushPose, 3
 *
 *                    *entering the above in the Pushing Character Image
 *                     parameter will change the player image to the index
 *                     3 of the sprite sheet 'hero_pushPose', stored in the
 *                     /img/characters folder of your game. Image will revert
 *                     back to original player image once the pushing process
 *                     is over.
 *
 *      Move Frame Rate
 *      ===============
 *      By default, the character update their motion pattern each 12 frames.
 *      The default plugin update when pushing/pulling is 4, which give the
 *      look of the player 'running' against the movable event before it
 *      start to move.
 *
 *      If you're using a push or pull custom image, that rate of 4 frames
 *      might not be optimal. Hence, the plugin provide a parameter to adjust
 *      that value to your liking.
 *
 *
 * SCRIPT CALLS:
 * =============
 *
 *      In order to manage your movable events interaction on the map, you can
 *      use a few script calls to check events position on the map.
 *
 *
 *      PUSH / PULL events
 *      ==================
 *
 *      Use the following default call to check an event position at any time:
 *
 *               $gameMap.event(eventId).pos(x, y)
 *
 *      It will return true or false wheter the event is at position x, y on
 *      the map. This can be checked in a parallel process event or in an
 *      autonomous movement script command.
 *
 *
 *
 *      PICK & THROW events
 *      ===================
 *
 *      These events can be a bit trickier to manage for game mechanics
 *      purposes. The plugin provide additionnal script calls to check
 *      these events positions.
 *
 *               $gamePlayer.isHolding(eventId);
 *
 *      This call will return true if the map event specified by eventId is
 *      hold (carried) by the player.
 *
 *
 *               $gamePlayer.hasBroughtEvent(eventId, x, y, d)
 *
 *      This call will return true if the map event specified by eventId is
 *      hold by the player on tile x, y and turned in direction d.
 *
 *
 *               $gamePlayer.hasGaveEvent(eventId, targetEventId)
 *
 *      This call will return true if the map event specified by eventId is
 *      hold by the player on the tile in front of the map event specified
 *      by targetEventId The player must be facing the target event.
 *
 *
 *              $gamePlayer.hasThrownEvent(eventId, x, y)
 *
 *      This one will returm true if the player has actually thrown or
 *      drop the map event specified by evenId on that exact tile at
 *      position x, y.
 *
 *
 *
 * =======================================================================================
 * == Term of Usage ======================================================================
 * =======================================================================================
 *
 * Use in any independant RPG Maker MZ or MV projects, including commercials.
 *
 * Credit is required for using this Plugin.
 * For crediting, use 'TSR' along with one of
 * the following terms:
 *      'The Northern Frog' or 'A frog from the north'
 *
 * Do not change the Header or the Terms of usage.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itch.io account:
 * https://the-northern-frog.itch.io/
 *
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 08/12/2020 completed plugin, v1.0.0
 * 07/03/2021 add parameters and instructions, v1.0.1
 * 08/03/2021 add script calls and some code fixes, v1.0.2
 * 09/03/2021 made some changes on script calls, v1.0.4
 * 10/03/2021 made some changes on throw/drop mechanics, v1.0.5
 * 12/03/2021 add move event speed and push/pull smooth transition, v1.0.7
 * 14/03/2021 fix 'mystery music effect', v1.0.8
 * 16/03/2021 fix some inconsistancies with character images, v1.0.9
 * 18/03/2021 add more comment tag for pickup event, v1.1.0
 * 19/03/2021 add switch option for movable event tag, v1.1.1
 * 24/03/2021 add a map notetag to prevent throwing on regionId, v1.1.2
 * 12/05/2021 add new event comment tag and fix compatibility issue, v1.1.4
 * 13/05/2021 some changes in the push/pull process, v1.1.5
 * 16/05/2021 add the <prevent throw region> map notetag, v1.1.6
 * 04/06/2021 add the option to change player image while moving events v1.2.6
 * 28/07/2021 add the <prevent move region> map notetag, v1.2.7
 * 01/09/2021 add the option to change the pull and pickup key v1.3.7
 * 23/09/2021 small fix for move/pickup key input v1.3.8
 * 28/10/2021 small fix and revamp of the key mapping v1.4
 *
 * =======================================================================================
 * == END ================================================================================
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 * @param Move Key
 * @desc The name of the key for pulling and picking up
 * Default: ok (See plugin instruction)
 * @default ok
 *
 * @param Move Event Offset
 * @type Number
 * @min 0
 * @desc The move offset when pushing and pulling events.
 * Default: 12
 * @default 12
 *
 * @param Pickup Event Offset
 * @type Number
 * @min 0
 * @desc The offset when player hold a pickup event.
 * Default: 24
 * @default 24
 *
 * @param Effort Balloon Id
 * @type Number
 * @min 1
 * @max 15
 * @desc The effort Balloon Icon Id when pushing/pulling.
 * Default: 11
 * @default 11
 *
 * @param Move Frame Rate
 * @type Number
 * @min 1
 * @desc The frame rate of the character update when pushing/pulling.
 * Default: 4
 * @default 4
 *
 *
 * @param ---Sounds
 *
 * @param Effort Sound
 * @parent ---Sounds
 * @desc The effort Sound when pushing/pulling
 * Default: Cry2, 60, 150, 0
 * @default Cry2, 60, 150, 0
 *
 * @param Push Sound
 * @parent ---Sounds
 * @desc The sound when pushing/pulling an event
 * Default: Push, 100, 100, 0
 * @default Push, 100, 100, 0
 *
 * @param Mystery Music Effect
 * @parent ---Sounds
 * @desc The music effect when pushing/pulling a 'Mystery' event
 * Default: Mystery, 100, 100, 0
 * @default Mystery, 100, 100, 0
 *
 * @param Pickup Sound
 * @parent ---Sounds
 * @desc The sound when picking up an event
 * Default: Equip1, 60, 150, 0
 * @default Equip1, 60, 150, 0
 *
 * @param Throw Sound
 * @parent ---Sounds
 * @desc The sound when throwing an event
 * Default: Jump1, 80, 80, 0
 * @default Jump1, 80, 80, 0
 *
 * @param Drop Sound
 * @parent ---Sounds
 * @desc The sound when the event is drop (touch the ground)
 * Default: Blow1, 60, 150, 0
 * @default Blow1, 60, 150, 0
 *
 *
 * @param ---Motion images
 *
 * @param Pushing Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default:
 * @default
 *
 * @param Pulling Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default:
 * @default
 *
 * @param Pickup Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default:
 * @default
 *
 * @param Throw Character Image
 * @parent ---Motion images
 * @desc Enter the sprite sheet name and the index separated by a comma.
 * Default:
 * @default
 *
 */

(() => {
  function _0x5445() {
    const _0x1247f1 = [
      "removeChild",
      "isCollidedWithPickableEvent",
      "_pushSound",
      "_throw",
      "_cacheCharName",
      "_pattern",
      "regionId",
      "setThrowDestination",
      "_threwMidAir",
      "_isMovable",
      "updatePickup",
      "_hasThrew",
      "resetPushing",
      "_pushEventCount",
      "note",
      "executePickup",
      "5914386oUISmW",
      "canMoveEvent",
      "_characterName",
      "setMovableEvent",
      "setDirection",
      "playMe",
      "moveStraight",
      "_isPulling",
      "setupThrowShadow",
      "setPause",
      "startThrowShadow",
      "apply",
      "requireThrowShadow",
      "playPush",
      "mapCoordinates",
      "_isMovableChar",
      "direction",
      "endMapPickup",
      "_routeUndone",
      "setBackDist",
      "value",
      "isPlayer",
      "_dropSound",
      "playMystery",
      "loadBitmap",
      "Parameters",
      "dirInfo",
      "_Game_Event_isCollidedWithEvents",
      "_isBrought",
      "backDist",
      "_charSprite",
      "_Scene_Map_stop",
      "shift",
      "isCollidedWithCharacters",
      "_pushImage",
      "_pushSheet",
      "_Sprite_Character_updatePosition",
      "TSR_MoveEvent",
      "setPushMoved",
      "some",
      "Throw\x20Sound",
      "setPattern",
      "updatePull",
      "_pickupSound",
      "setPushDist",
      "call",
      "_throwCount",
      "_requireThrowShadow",
      "updatePickupEvent",
      "Pickup\x20Character\x20Image",
      "_isBreakable",
      "createThrowShadowContainer",
      "moveSpeed",
      "setMoveOffset",
      "isMoving",
      "pushMoved",
      "checkMystery",
      "_movableSwitch",
      "_direction",
      "_dirInfo",
      "hasThrew",
      "isBreakable",
      "updateShadowPosition",
      "_spriteset",
      "_moveRate",
      "494685KjAAQA",
      "_originalPattern",
      "updatePushEvent",
      "pullDist",
      "isPassable",
      "screenZ",
      "isCollidedWithEvents",
      "_throwDestination",
      "Pickup\x20Event\x20Offset",
      "isPushing",
      "_Game_Event_setupPage",
      "scale",
      "toString",
      "slice",
      "_dist",
      "anchor",
      "checkCacheImage",
      "movableEvent",
      "_jumpEnable",
      "resetPattern",
      "_balloonQueue",
      "canPull",
      "pullSpeed",
      "setFrame",
      "playEffort",
      "makeSheetInfo",
      "isDashing",
      "updateThrowShadowSprites",
      "_alphaKeyList",
      "_effortSound",
      "_normalSpeed",
      "maxPattern",
      "setPullDist",
      "setup",
      "updatePosition",
      "throwPass",
      "createLowerLayer",
      "contains",
      "_character",
      "_patternCount",
      "isEventRunning",
      "locate",
      "_mysteryEvents",
      "_isPickup",
      "_moveRouteIndex",
      "_Game_System_initialize",
      "_throwPattern",
      "canPush",
      "_hasPickup",
      "height",
      "setThrow",
      "_pullMoved",
      "_movingEventPreventMove",
      "makeEffort",
      "_pickupOffset",
      "setDirectionFix",
      "eventsXyNt",
      "isHolding",
      "setPriorityType",
      "_isPickupChar",
      "endPickup",
      "roundYWithDirection",
      "_realY",
      "isDashButtonPressed",
      "xWithDirection",
      "_Sprite_Character_update",
      "playSe",
      "event",
      "unsetPause",
      "setMovingEventPreventMove",
      "updatePattern",
      "_backDist",
      "7CKotVm",
      "_jumpPeak",
      "setPickup",
      "_cacheSpeed",
      "updatePush",
      "setNormalSpeed",
      "canPass",
      "getInputDirection",
      "isPulling",
      "moveEventStraight",
      "enableMenu",
      "isCliff",
      "prototype",
      "screenY",
      "Push\x20Sound",
      "isPickable",
      "_moveSpeed",
      "reverseDir",
      "Drop\x20Sound",
      "_eventId",
      "_pullEvent",
      "isThrowRegion",
      "throwPickup",
      "setRequireThrowShadow",
      "_duration",
      "_isPushing",
      "width",
      "resetPulling",
      "_moveJump",
      "_pushEvent",
      "Effort\x20Balloon\x20Id",
      "executePush",
      "225382ZAPACB",
      "setValue",
      "_isPickable",
      "mapJump",
      "screenX",
      "isHoldingOk",
      "_Spriteset_Map_createLowerLayer",
      "isCollidedWithMovableEvent",
      "_lastX",
      "_pullImage",
      "_throwSound",
      "split",
      "hasPickup",
      "_tileId",
      "playPickup",
      "normalSpeed",
      "_Sprite_Character_initMembers",
      "updateThrow",
      "isPickup",
      "round",
      "8713220OxTsUD",
      "loadSystem",
      "hasStepAnime",
      "_throwSheet",
      "createThrowShadow",
      "setMovementSuccess",
      "isMovable",
      "setPullMoved",
      "_pushMoved",
      "_throwImage",
      "setPullSpeed",
      "hasBroughtEvent",
      "_moveEventOffset",
      "_realX",
      "_Game_Player_initMembers",
      "_throwShadowContainer",
      "pickableEvent",
      "_dashing",
      "_pushCount",
      "_cacheDirFix",
      "pullMoved",
      "1176216UWFYwz",
      "_cacheCharIndex",
      "_effortBallonId",
      "Pushing\x20Character\x20Image",
      "resetCacheImage",
      "setMoveSpeed",
      "forceMove",
      "isNormalPriority",
      "cacheSpeed",
      "452chVmap",
      "bitmap",
      "_Game_CharacterBase_updatePattern",
      "setupPage",
      "trim",
      "isPlaying",
      "_pullSheet",
      "Move\x20Frame\x20Rate",
      "_GamePlayer_canMove",
      "_Game_Player_update",
      "executePull",
      "calcDirection",
      "movingEventPreventMove",
      "yWithDirection",
      "hasGaveEvent",
      "length",
      "isRepeated",
      "push",
      "setThrough",
      "136EnXdep",
      "makeSoundObj",
      "_pickupEvent",
      "_pullEventCount",
      "Move\x20Event\x20Offset",
      "thrownAt",
      "toUpperCase",
      "increaseSteps",
      "31985NWobgX",
      "eventId",
      "_mysterySound",
      "_pickupImage",
      "throwDestination",
      "setDirInfo",
      "Pulling\x20Character\x20Image",
      "stop",
      "_throwSpriteSet",
      "_characterIndex",
      "8CwpZtP",
      "disableMenu",
      "_lastY",
      "indexOf",
      "keyMapper",
      "initialize",
      "_cacheEnableJump",
      "moveEvent",
      "_pullSpeed",
      "Mystery\x20Music\x20Effect",
      "_scene",
      "setPosition",
      "_jumpOffset",
      "hasThrownEvent",
      "_pickupSheet",
      "tileWidth",
      "isPreventMoveRegion",
      "constructor",
      "pushDist",
      "isPreventThrowRegion",
      "isMovingEvent",
      "sqrt",
      "moveOffset",
      "evalDist",
      "roundXWithDirection",
      "isThrowCliff",
      "isThrow",
      "events",
      "Move\x20Key",
      "parameters",
      "requestBalloon",
      "update",
      "_moveOffset",
      "movableEventCanPass",
      "match",
      "34076493tGDzVL",
      "playThrow",
      "initMembers",
      "_moveKey",
      "resetSpeed",
      "_pullCount",
      "straighten",
      "pos",
    ];
    _0x5445 = function () {
      return _0x1247f1;
    };
    return _0x5445();
  }
  const _0xd9621d = _0x2fa8;
  function _0x2fa8(_0x2ea48d, _0x332925) {
    const _0x544501 = _0x5445();
    return (
      (_0x2fa8 = function (_0x2fa808, _0x394b57) {
        _0x2fa808 = _0x2fa808 - 0x68;
        let _0x445b2d = _0x544501[_0x2fa808];
        return _0x445b2d;
      }),
      _0x2fa8(_0x2ea48d, _0x332925)
    );
  }
  (function (_0x47c35d, _0x51f943) {
    const _0x3d10c6 = _0x2fa8,
      _0xe68a79 = _0x47c35d();
    while (!![]) {
      try {
        const _0x412419 =
          (-parseInt(_0x3d10c6(0xe4)) / 0x1) *
            (parseInt(_0x3d10c6(0x8d)) / 0x2) +
          parseInt(_0x3d10c6(0xb6)) / 0x3 +
          (-parseInt(_0x3d10c6(0xbf)) / 0x4) *
            (-parseInt(_0x3d10c6(0xda)) / 0x5) +
          (-parseInt(_0x3d10c6(0x11f)) / 0x6) *
            (parseInt(_0x3d10c6(0x6d)) / 0x7) +
          (parseInt(_0x3d10c6(0xd2)) / 0x8) *
            (-parseInt(_0x3d10c6(0x160)) / 0x9) +
          -parseInt(_0x3d10c6(0xa1)) / 0xa +
          parseInt(_0x3d10c6(0x107)) / 0xb;
        if (_0x412419 === _0x51f943) break;
        else _0xe68a79["push"](_0xe68a79["shift"]());
      } catch (_0x1344f9) {
        _0xe68a79["push"](_0xe68a79["shift"]());
      }
    }
  })(_0x5445, 0x7ee82),
    (TSR[_0xd9621d(0x138)] = PluginManager[_0xd9621d(0x101)](
      _0xd9621d(0x144)
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x10a)] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0x100)]
    )),
    (TSR[_0xd9621d(0xeb)]["_moveOffset"] = Number(
      TSR[_0xd9621d(0x138)][_0xd9621d(0xd6)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x196)] = Number(
      TSR[_0xd9621d(0x138)][_0xd9621d(0x168)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xb8)] = Number(
      TSR[_0xd9621d(0x138)][_0xd9621d(0x8b)]
    )),
    (TSR[_0xd9621d(0xeb)]["_moveRate"] = Number(
      TSR["Parameters"][_0xd9621d(0xc6)]
    )),
    (TSR["moveEvent"][_0xd9621d(0x17d)] = String(
      TSR[_0xd9621d(0x138)]["Effort\x20Sound"]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x111)] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0x7b)]
    )),
    (TSR[_0xd9621d(0xeb)]["_mysterySound"] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0xed)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x14a)] = String(
      TSR[_0xd9621d(0x138)]["Pickup\x20Sound"]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x97)] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0x147)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x135)] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0x7f)]
    )),
    (TSR["moveEvent"]["_pushImage"] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0xb9)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x96)] = String(
      TSR[_0xd9621d(0x138)][_0xd9621d(0xe0)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xdd)] = String(
      TSR["Parameters"][_0xd9621d(0x150)]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xaa)] = String(
      TSR[_0xd9621d(0x138)]["Throw\x20Character\x20Image"]
    )),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xd3)] = function (_0x90e524) {
      const _0x3da37c = _0xd9621d;
      array = _0x90e524[_0x3da37c(0x98)](",");
      if (array[_0x3da37c(0xce)] < 0x4) return null;
      const _0x58106f = array[0x0],
        _0x5365fc = parseInt(array[0x1]),
        _0x51b6cf = parseInt(array[0x2]),
        _0x1aca41 = parseInt(array[0x3]);
      return {
        name: _0x58106f,
        volume: _0x5365fc,
        pitch: _0x51b6cf,
        pan: _0x1aca41,
      };
    }),
    (TSR[_0xd9621d(0xeb)]["makeSheetInfo"] = function (_0x308abf) {
      const _0x2514c8 = _0xd9621d;
      array = _0x308abf["split"](",");
      if (array[_0x2514c8(0xce)] < 0x2) return null;
      const _0x396b1a = array[0x0],
        _0x5ca78f = parseInt(array[0x1]);
      return [_0x396b1a, _0x5ca78f];
    }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x142)] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0x179)
    ](TSR[_0xd9621d(0xeb)][_0xd9621d(0x141)])),
    (TSR["moveEvent"][_0xd9621d(0xc5)] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0x179)
    ](TSR["moveEvent"][_0xd9621d(0x96)])),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xf2)] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0x179)
    ](TSR["moveEvent"][_0xd9621d(0xdd)])),
    (TSR[_0xd9621d(0xeb)]["_throwSheet"] = TSR[_0xd9621d(0xeb)][
      "makeSheetInfo"
    ](TSR[_0xd9621d(0xeb)][_0xd9621d(0xaa)])),
    (TSR[_0xd9621d(0xeb)]["_effortSound"] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0xd3)
    ](TSR[_0xd9621d(0xeb)][_0xd9621d(0x17d)])),
    (TSR[_0xd9621d(0xeb)]["_pushSound"] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0xd3)
    ](TSR[_0xd9621d(0xeb)]["_pushSound"])),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xdc)] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0xd3)
    ](TSR["moveEvent"][_0xd9621d(0xdc)])),
    (TSR[_0xd9621d(0xeb)]["_pickupSound"] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0xd3)
    ](TSR[_0xd9621d(0xeb)][_0xd9621d(0x14a)])),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x97)] = TSR[_0xd9621d(0xeb)][
      _0xd9621d(0xd3)
    ](TSR["moveEvent"][_0xd9621d(0x97)])),
    (TSR[_0xd9621d(0xeb)]["_dropSound"] = TSR[_0xd9621d(0xeb)][
      "makeSoundObj"
    ](TSR[_0xd9621d(0xeb)]["_dropSound"])),
    (TSR["moveEvent"]["_alphaKeyList"] = {
      a: 0x41,
      b: 0x42,
      c: 0x43,
      d: 0x44,
      e: 0x45,
      f: 0x46,
      g: 0x47,
      h: 0x48,
      i: 0x49,
      j: 0x4a,
      k: 0x4b,
      l: 0x4c,
      m: 0x4d,
      n: 0x4e,
      o: 0x4f,
      p: 0x50,
      r: 0x52,
      s: 0x53,
      t: 0x54,
      u: 0x55,
      v: 0x56,
      y: 0x59,
    });
  if (TSR["moveEvent"]["_moveKey"] !== "ok") {
    const newKey =
      TSR[_0xd9621d(0xeb)][_0xd9621d(0x17c)][
        TSR[_0xd9621d(0xeb)][_0xd9621d(0x10a)]
      ];
    Input[_0xd9621d(0xe8)][newKey] =
      TSR[_0xd9621d(0xeb)][_0xd9621d(0x10a)];
  }
  (DataManager[_0xd9621d(0x82)] = function (_0x3343a0) {
    const _0x3f73d3 = _0xd9621d;
    if (!$dataMap) return ![];
    const _0x122fc1 =
        /<(?:THROW REGION|THREW REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,
      _0xca3b9a = $dataMap[_0x3f73d3(0x11d)]
        [_0x3f73d3(0x16c)]()
        [_0x3f73d3(0x98)](/[\r\n]+/);
    for (const _0x1887df of _0xca3b9a) {
      if (_0x1887df[_0x3f73d3(0x106)](_0x122fc1)) {
        const _0x5253e7 = _0x1887df["slice"](
          _0x1887df["indexOf"](":") + 0x1
        )[_0x3f73d3(0x98)](",");
        for (const _0x10b70f in _0x5253e7) {
          if (parseInt(_0x5253e7[_0x10b70f]) === _0x3343a0)
            return !![];
        }
      }
    }
    return ![];
  }),
    (DataManager[_0xd9621d(0xf7)] = function (_0x35a026) {
      const _0x199d50 = _0xd9621d;
      if (!$dataMap) return ![];
      const _0x56794e =
          /<(?:PREVENT THROW REGION|PREVENT THREW REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,
        _0x4abfae = $dataMap["note"]
          [_0x199d50(0x16c)]()
          [_0x199d50(0x98)](/[\r\n]+/);
      for (const _0x2b542b of _0x4abfae) {
        if (_0x2b542b["match"](_0x56794e)) {
          const _0x4fa30f = _0x2b542b[_0x199d50(0x16d)](
            _0x2b542b[_0x199d50(0xe7)](":") + 0x1
          )[_0x199d50(0x98)](",");
          for (const _0x3fbf8d in _0x4fa30f) {
            if (parseInt(_0x4fa30f[_0x3fbf8d]) === _0x35a026)
              return !![];
          }
        }
      }
      return ![];
    }),
    (DataManager[_0xd9621d(0xf4)] = function (_0x47164a) {
      const _0x5e9682 = _0xd9621d;
      if (!$dataMap) return ![];
      const _0x2c34cc =
          /<(?:PREVENT MOVE REGION|PREVENT MOVE REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,
        _0x4bf419 = $dataMap[_0x5e9682(0x11d)]
          [_0x5e9682(0x16c)]()
          [_0x5e9682(0x98)](/[\r\n]+/);
      for (const _0x1986a6 of _0x4bf419) {
        if (_0x1986a6[_0x5e9682(0x106)](_0x2c34cc)) {
          const _0x42fa27 = _0x1986a6[_0x5e9682(0x16d)](
            _0x1986a6[_0x5e9682(0xe7)](":") + 0x1
          )["split"](",");
          for (const _0x238e72 in _0x42fa27) {
            if (parseInt(_0x42fa27[_0x238e72]) === _0x47164a)
              return !![];
          }
        }
      }
      return ![];
    }),
    (SoundManager[_0xd9621d(0x178)] = function () {
      const _0x4c207b = _0xd9621d,
        _0x34b7a2 = TSR[_0x4c207b(0xeb)][_0x4c207b(0x17d)];
      _0x34b7a2 && AudioManager[_0x4c207b(0x1a2)](_0x34b7a2);
    }),
    (SoundManager[_0xd9621d(0x12c)] = function () {
      const _0x171bfd = _0xd9621d,
        _0x42fefc = TSR[_0x171bfd(0xeb)][_0x171bfd(0x111)];
      _0x42fefc && AudioManager[_0x171bfd(0x1a2)](_0x42fefc);
    }),
    (SoundManager[_0xd9621d(0x136)] = function () {
      const _0xea3cbc = _0xd9621d,
        _0x4c5b8c = TSR[_0xea3cbc(0xeb)][_0xea3cbc(0xdc)];
      _0x4c5b8c && AudioManager[_0xea3cbc(0x124)](_0x4c5b8c);
    }),
    (SoundManager[_0xd9621d(0x9b)] = function () {
      const _0x39624c = _0xd9621d,
        _0x5dbe6b = TSR[_0x39624c(0xeb)][_0x39624c(0x14a)];
      _0x5dbe6b && AudioManager[_0x39624c(0x1a2)](_0x5dbe6b);
    }),
    (SoundManager[_0xd9621d(0x108)] = function () {
      const _0x454aac = _0xd9621d,
        _0x230a58 = TSR[_0x454aac(0xeb)]["_throwSound"];
      _0x230a58 && AudioManager["playSe"](_0x230a58);
    }),
    (SoundManager["playDrop"] = function () {
      const _0xe25931 = _0xd9621d,
        _0x10cd77 = TSR[_0xe25931(0xeb)]["_dropSound"];
      _0x10cd77 && AudioManager[_0xe25931(0x1a2)](_0x10cd77);
    }),
    (TSR[_0xd9621d(0xeb)]["_Scene_Map_stop"] =
      Scene_Map[_0xd9621d(0x79)][_0xd9621d(0xe1)]),
    (Scene_Map[_0xd9621d(0x79)]["stop"] = function () {
      const _0x524902 = _0xd9621d;
      TSR[_0x524902(0xeb)][_0x524902(0x13e)][_0x524902(0x14c)](this),
        $gamePlayer[_0x524902(0x11b)](),
        $gamePlayer[_0x524902(0x88)](),
        $gamePlayer[_0x524902(0x130)](),
        $gamePlayer[_0x524902(0x132)](![]),
        $gamePlayer[_0x524902(0x6a)](![]);
    }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x18d)] =
      Game_System[_0xd9621d(0x79)][_0xd9621d(0xe9)]),
    (Game_System["prototype"][_0xd9621d(0xe9)] = function () {
      const _0x30ad65 = _0xd9621d;
      TSR[_0x30ad65(0xeb)][_0x30ad65(0x18d)][_0x30ad65(0x14c)](this),
        (this[_0x30ad65(0x18a)] = {});
    }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xc1)] =
      Game_CharacterBase[_0xd9621d(0x79)][_0xd9621d(0x6b)]),
    (Game_CharacterBase["prototype"][_0xd9621d(0x6b)] = function () {
      const _0x115388 = _0xd9621d;
      if (
        this[_0x115388(0x163)]() ||
        this[_0x115388(0xf6)]() ||
        this[_0x115388(0x13c)]() ||
        this[_0x115388(0x18e)]
      )
        this["_pattern"] =
          (this[_0x115388(0x114)] + 0x1) % this[_0x115388(0x17f)]();
      else
        !this[_0x115388(0x18e)] &&
          TSR[_0x115388(0xeb)][_0x115388(0xc1)][_0x115388(0x14c)](
            this
          );
    }),
    (Game_CharacterBase[_0xd9621d(0x79)][_0xd9621d(0xd7)] = function (
      _0x1b2eee,
      _0x413379
    ) {
      const _0x14121f = _0xd9621d;
      (this["_x"] += _0x1b2eee), (this["_y"] += _0x413379);
      const _0x5e905b = Math[_0x14121f(0xa0)](
        Math[_0x14121f(0xf9)](
          _0x1b2eee * _0x1b2eee + _0x413379 * _0x413379
        )
      );
      (this["_jumpPeak"] = 0xa + _0x5e905b - this[_0x14121f(0x7d)]),
        (this["_jumpCount"] = this[_0x14121f(0x6e)] * 0x2);
    }),
    (Game_CharacterBase[_0xd9621d(0x79)][_0xd9621d(0x76)] = function (
      _0x9ae600
    ) {
      const _0xf7a550 = _0xd9621d;
      this[_0xf7a550(0xa6)](
        this[_0xf7a550(0x73)](this["_x"], this["_y"], _0x9ae600)
      );
      if (this["isMovementSucceeded"]()) {
        (this["_x"] = $gameMap["roundXWithDirection"](
          this["_x"],
          _0x9ae600
        )),
          (this["_y"] = $gameMap[_0xf7a550(0x19d)](
            this["_y"],
            _0x9ae600
          )),
          (this[_0xf7a550(0xae)] = $gameMap[_0xf7a550(0x1a0)](
            this["_x"],
            this["reverseDir"](_0x9ae600)
          )),
          (this[_0xf7a550(0x19e)] = $gameMap[_0xf7a550(0xcc)](
            this["_y"],
            this[_0xf7a550(0x7e)](_0x9ae600)
          ));
        if (this[_0xf7a550(0x12e)]) this[_0xf7a550(0xd9)]();
      }
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x199)] = function (
      _0x5aefaa
    ) {
      const _0x459742 = _0xd9621d,
        _0x44e5f5 = $gameMap["event"](_0x5aefaa);
      return (
        this[_0x459742(0xd4)] === _0x44e5f5 && this[_0x459742(0x99)]()
      );
    }),
    (Game_Character[_0xd9621d(0x79)]["pickupEvent"] = function () {
      const _0x3abcd7 = _0xd9621d;
      return this[_0x3abcd7(0xd4)];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x99)] = function () {
      const _0x4eeef3 = _0xd9621d;
      return this[_0x4eeef3(0x190)];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x15c)] = function () {
      const _0x47669e = _0xd9621d;
      return this[_0x47669e(0x151)];
    }),
    (Game_Character[_0xd9621d(0x79)]["setPickup"] = function (
      _0x4814cd
    ) {
      const _0x2fdf90 = _0xd9621d;
      this[_0x2fdf90(0x18b)] = _0x4814cd;
    }),
    (Game_Character[_0xd9621d(0x79)]["isPickup"] = function () {
      return this["_isPickup"];
    }),
    (Game_Character["prototype"][_0xd9621d(0x192)] = function (
      _0x131c4e
    ) {
      const _0x23684b = _0xd9621d;
      this[_0x23684b(0x112)] = _0x131c4e;
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0xfe)] = function () {
      const _0x52d049 = _0xd9621d;
      return this[_0x52d049(0x112)];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x116)] = function (
      _0x5d56fe,
      _0x2bba66,
      _0x1aec04,
      _0x5c3a8a,
      _0x17385d
    ) {
      const _0x3673b9 = _0xd9621d;
      if (_0x5d56fe === _0x1aec04 && _0x2bba66 === _0x5c3a8a) {
        const _0x4ae5ed = 0xa - _0x17385d,
          _0x15b487 =
            _0x17385d === 0x4 || _0x17385d === 0x6 ? 0x2 : 0x4,
          _0x4ff9f4 = 0xa - _0x15b487,
          _0x586004 = [_0x4ae5ed, _0x15b487, _0x4ff9f4];
        for (const _0x5d8fda of _0x586004) {
          if (
            $gamePlayer["throwPass"](_0x1aec04, _0x5c3a8a, _0x5d8fda)
          ) {
            (_0x5d56fe = $gameMap[_0x3673b9(0xfc)](
              _0x1aec04,
              _0x5d8fda
            )),
              (_0x2bba66 = $gameMap[_0x3673b9(0x19d)](
                _0x5c3a8a,
                _0x5d8fda
              ));
            break;
          }
        }
      }
      this[_0x3673b9(0x167)] = [_0x5d56fe, _0x2bba66];
    }),
    (Game_Character["prototype"][_0xd9621d(0xde)] = function () {
      const _0x4002e5 = _0xd9621d;
      return this[_0x4002e5(0x167)];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x12b)] = function () {
      const _0x158a2c = _0xd9621d;
      return this[_0x158a2c(0x14e)];
    }),
    (Game_Character[_0xd9621d(0x79)]["setRequireThrowShadow"] =
      function (_0x12a6c2) {
        const _0xfd671d = _0xd9621d;
        this[_0xfd671d(0x14e)] = _0x12a6c2;
      }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0xfd)] = function () {
      const _0x228ca9 = _0xd9621d;
      if (Imported["TSR_MapJump"])
        return this[_0x228ca9(0x78)](
          this["_realX"],
          this[_0x228ca9(0x19e)]
        );
      return ![];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0xf8)] = function () {
      const _0x269a3e = _0xd9621d;
      return this[_0x269a3e(0x86)] || this["_isPulling"];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x169)] = function () {
      return ![];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x14b)] = function (
      _0x4cf3ea
    ) {
      this["_pushDist"] = _0x4cf3ea;
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0xf6)] = function () {
      return this["_pushDist"];
    }),
    (Game_Character[_0xd9621d(0x79)]["setPullDist"] = function (
      _0x64d339
    ) {
      this["_pullDist"] = _0x64d339;
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x163)] = function () {
      return this["_pullDist"];
    }),
    (Game_Character["prototype"][_0xd9621d(0x132)] = function (
      _0x1fe923
    ) {
      this["_backDist"] = _0x1fe923;
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x13c)] = function () {
      const _0x5c7c7a = _0xd9621d;
      return this[_0x5c7c7a(0x6c)];
    }),
    (Game_Character[_0xd9621d(0x79)][_0xd9621d(0x134)] = function () {
      return this === $gamePlayer;
    }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xaf)] =
      Game_Player[_0xd9621d(0x79)]["initMembers"]),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x109)] = function () {
      const _0x676d32 = _0xd9621d;
      TSR[_0x676d32(0xeb)][_0x676d32(0xaf)][_0x676d32(0x14c)](this),
        (this[_0x676d32(0x17e)] = 0x4);
    }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0xc8)] =
      Game_Player[_0xd9621d(0x79)][_0xd9621d(0x103)]),
    (Game_Player[_0xd9621d(0x79)]["update"] = function (_0x39ba93) {
      const _0x579997 = _0xd9621d;
      TSR[_0x579997(0xeb)][_0x579997(0xc8)][_0x579997(0x14c)](
        this,
        _0x39ba93
      ),
        _0x39ba93 &&
          (this[_0x579997(0xeb)](),
          this["updatePickupEvent"](),
          this[_0x579997(0x162)]());
    }),
    (TSR[_0xd9621d(0xeb)]["_GamePlayer_canMove"] =
      Game_Player[_0xd9621d(0x79)]["canMove"]),
    (Game_Player["prototype"]["canMove"] = function () {
      const _0x17e47b = _0xd9621d;
      return this["isPushing"]() ||
        this[_0x17e47b(0x81)] ||
        this["movingEventPreventMove"]()
        ? ![]
        : TSR["moveEvent"][_0x17e47b(0xc7)][_0x17e47b(0x14c)](this);
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x6a)] = function (
      _0x68a0a4
    ) {
      const _0x4102fe = _0xd9621d;
      this[_0x4102fe(0x194)] = _0x68a0a4;
    }),
    (Game_Player["prototype"][_0xd9621d(0xcb)] = function () {
      const _0x556810 = _0xd9621d;
      return this[_0x556810(0x194)];
    }),
    (Game_Player[_0xd9621d(0x79)]["moveEvent"] = function () {
      const _0x19ea6e = _0xd9621d,
        _0x455ddd = this[_0x19ea6e(0x159)],
        _0x3b7dbe = $gameMap[_0x19ea6e(0xfc)](this["x"], _0x455ddd),
        _0x3a4d21 = $gameMap["roundYWithDirection"](
          this["y"],
          _0x455ddd
        ),
        _0x552638 = $gameMap[_0x19ea6e(0xfc)](_0x3b7dbe, _0x455ddd),
        _0x2b84cf = $gameMap[_0x19ea6e(0x19d)](_0x3a4d21, _0x455ddd);
      this["isCollidedWithMovableEvent"](_0x3b7dbe, _0x3a4d21) &&
        (this[_0x19ea6e(0x149)](_0x3b7dbe, _0x3a4d21, _0x455ddd),
        this["updatePush"](
          _0x3b7dbe,
          _0x3a4d21,
          _0x552638,
          _0x2b84cf,
          _0x455ddd
        )),
        this[_0x19ea6e(0x119)](
          this["x"],
          this["y"],
          _0x3b7dbe,
          _0x3a4d21,
          _0x455ddd
        );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x162)] = function () {
      const _0x1ef06b = _0xd9621d;
      if (
        this[_0x1ef06b(0x8a)] &&
        this[_0x1ef06b(0xf6)]() &&
        this[_0x1ef06b(0x156)]()
      )
        this["_pushEvent"][_0x1ef06b(0xae)] ===
          this[_0x1ef06b(0x8a)]["dx"] &&
          this["_pushEvent"][_0x1ef06b(0x19e)] ===
            this[_0x1ef06b(0x8a)]["dy"] &&
          this[_0x1ef06b(0x11b)]();
      else
        this[_0x1ef06b(0x81)] &&
          this[_0x1ef06b(0x163)]() &&
          this[_0x1ef06b(0xb5)]() &&
          this["_pullEvent"][_0x1ef06b(0xae)] ===
            this[_0x1ef06b(0x81)]["dx"] &&
          this["_pullEvent"][_0x1ef06b(0x19e)] ===
            this["_pullEvent"]["dy"] &&
          this["resetPulling"]();
      if (!this["_pullEvent"]) this[_0x1ef06b(0x69)]();
    }),
    (Game_Player["prototype"][_0xd9621d(0x71)] = function (
      _0x238dd1,
      _0x8595c9,
      _0x3b5a7b,
      _0x27c8d1,
      _0x163bdf
    ) {
      const _0x39a68b = _0xd9621d;
      if (!this[_0x39a68b(0x92)]()) {
        if (
          _0x163bdf === this[_0x39a68b(0x74)]() &&
          this[_0x39a68b(0x120)]()
        ) {
          if (!this[_0x39a68b(0xf8)]()) {
            (this[_0x39a68b(0x8a)] = this[_0x39a68b(0x171)](
              _0x238dd1,
              _0x8595c9
            )),
              (this[_0x39a68b(0xb3)] = 0x0),
              (this[_0x39a68b(0x11c)] = 0x0),
              (this["_isPushing"] = !![]),
              (this["_dashing"] = ![]);
            const _0x533d12 =
              this["_pushEvent"][_0x39a68b(0xad)] ||
              TSR["moveEvent"][_0x39a68b(0x104)];
            this[_0x39a68b(0x154)](_0x533d12);
            const _0x4ece58 =
                _0x163bdf === 0x4 || _0x163bdf === 0x6
                  ? this[_0x39a68b(0x91)]()
                  : this[_0x39a68b(0x7a)](),
              _0x35bf3c =
                _0x163bdf === 0x2 || _0x163bdf === 0x6
                  ? _0x533d12
                  : -_0x533d12;
            this[_0x39a68b(0x14b)](_0x4ece58 + _0x35bf3c),
              TSR[_0x39a68b(0xeb)]["_pushSheet"] &&
                (this["checkCacheImage"](),
                (this["_characterName"] =
                  TSR["moveEvent"][_0x39a68b(0x142)][0x0]),
                (this[_0x39a68b(0xe3)] =
                  TSR[_0x39a68b(0xeb)][_0x39a68b(0x142)][0x1]));
          } else {
            if (this["isPushing"]()) {
              const _0x527d15 = TSR[_0x39a68b(0xeb)]["_moveRate"];
              this["_pushEventCount"]++;
              if (this[_0x39a68b(0x11c)] % _0x527d15 === 0x0)
                this[_0x39a68b(0x6b)]();
              if (this["_pushEventCount"] % 0x4 === 0x0)
                this[_0x39a68b(0x8c)](
                  _0x3b5a7b,
                  _0x27c8d1,
                  _0x163bdf
                );
            } else this[_0x39a68b(0x11b)]();
          }
        } else this[_0x39a68b(0x11b)]();
      }
    }),
    (Game_Player[_0xd9621d(0x79)]["executePush"] = function (
      _0x5e6830,
      _0x582b0f,
      _0x2d959f
    ) {
      const _0x14139d = _0xd9621d,
        _0x39b7a1 = this["_pushEvent"];
      if (
        this[_0x14139d(0x159)] !== this[_0x14139d(0x74)]() &&
        this[_0x14139d(0x156)]()
      )
        this[_0x14139d(0x11b)]();
      else {
        if (this[_0x14139d(0xb3)] < 0x18) {
          if (this[_0x14139d(0xb3)] === 0xc) this["makeEffort"]();
          this[_0x14139d(0xb3)]++;
        } else {
          if (
            !this["pushMoved"]() &&
            _0x39b7a1[_0x14139d(0x105)](
              _0x5e6830,
              _0x582b0f,
              _0x2d959f
            ) &&
            this[_0x14139d(0x18f)]()
          ) {
            this[_0x14139d(0x145)](!![]),
              SoundManager[_0x14139d(0x12c)](),
              (this[_0x14139d(0x8a)]["dx"] = $gameMap[
                _0x14139d(0xfc)
              ](this[_0x14139d(0x8a)]["x"], _0x2d959f)),
              (this[_0x14139d(0x8a)]["dy"] = $gameMap[
                "roundYWithDirection"
              ](this["_pushEvent"]["y"], _0x2d959f)),
              (this[_0x14139d(0x8a)]["sx"] =
                this[_0x14139d(0x8a)]["x"]),
              (this[_0x14139d(0x8a)]["sy"] = this["_pushEvent"]["y"]),
              this[_0x14139d(0x72)](this["_moveSpeed"]);
            const _0x3e6f78 =
              this[_0x14139d(0x8a)][_0x14139d(0x153)]();
            this[_0x14139d(0xbb)](
              this[_0x14139d(0x19f)]() ? _0x3e6f78 - 0x1 : _0x3e6f78
            ),
              _0x39b7a1[_0x14139d(0xbc)](_0x2d959f),
              this[_0x14139d(0x157)](_0x39b7a1),
              (this[_0x14139d(0xb3)] = 0x0),
              (this[_0x14139d(0x86)] = ![]),
              this[_0x14139d(0x173)]();
          } else this["resetPushing"]();
        }
      }
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x18f)] = function () {
      const _0x3f77e7 = _0xd9621d,
        _0x4789c8 = this[_0x3f77e7(0x8a)][_0x3f77e7(0x158)];
      return !_0x4789c8 || $gameSwitches["value"](_0x4789c8);
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x169)] = function () {
      return this["_isPushing"];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x154)] = function (
      _0xd295cd
    ) {
      const _0x3c68e9 = _0xd9621d;
      this[_0x3c68e9(0x104)] = _0xd295cd;
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xfa)] = function () {
      const _0x848fda = _0xd9621d;
      return this[_0x848fda(0x104)];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x72)] = function (
      _0x41b214
    ) {
      this["_normalSpeed"] = _0x41b214;
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x9c)] = function () {
      const _0x292d1e = _0xd9621d;
      return this[_0x292d1e(0x17e)];
    }),
    (Game_Player["prototype"][_0xd9621d(0x145)] = function (
      _0xc446f1
    ) {
      const _0x2ef224 = _0xd9621d;
      this[_0x2ef224(0xa9)] = _0xc446f1;
    }),
    (Game_Player["prototype"][_0xd9621d(0x156)] = function () {
      const _0x1f13a9 = _0xd9621d;
      return this[_0x1f13a9(0xa9)];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x11b)] = function () {
      const _0x138a81 = _0xd9621d;
      (this[_0x138a81(0xb3)] = 0x0),
        (this[_0x138a81(0x86)] = ![]),
        (this[_0x138a81(0x8a)] = null),
        this[_0x138a81(0x14b)](![]),
        this["setBackDist"](!![]),
        this[_0x138a81(0x145)](![]),
        this[_0x138a81(0x10b)](),
        this["resetCacheImage"]();
    }),
    (Game_Player["prototype"][_0xd9621d(0x149)] = function (
      _0x384bfd,
      _0x10fc67,
      _0x1d71d5
    ) {
      const _0x5daed0 = _0xd9621d;
      if (!this[_0x5daed0(0x74)]()) {
        if (this[_0x5daed0(0x92)]() && this[_0x5daed0(0x120)]()) {
          if (!this[_0x5daed0(0xf8)]()) {
            (this[_0x5daed0(0x81)] = this[_0x5daed0(0x171)](
              _0x384bfd,
              _0x10fc67
            )),
              (this[_0x5daed0(0x10c)] = 0x0),
              (this[_0x5daed0(0xd5)] = 0x0),
              (this["_isPulling"] = !![]),
              (this[_0x5daed0(0xb2)] = ![]);
            const _0x38ced3 =
              this["_pullEvent"][_0x5daed0(0xad)] ||
              TSR["moveEvent"][_0x5daed0(0x104)];
            this["setMoveOffset"](_0x38ced3);
            const _0x2edae3 =
                _0x1d71d5 === 0x4 || _0x1d71d5 === 0x6
                  ? this[_0x5daed0(0x91)]()
                  : this["screenY"](),
              _0x179bd0 =
                _0x1d71d5 === 0x2 || _0x1d71d5 === 0x6
                  ? _0x38ced3
                  : -_0x38ced3;
            this[_0x5daed0(0x180)](_0x2edae3 + _0x179bd0),
              this[_0x5daed0(0x128)](),
              TSR[_0x5daed0(0xeb)]["_pullSheet"] &&
                (this["checkCacheImage"](),
                (this[_0x5daed0(0x121)] =
                  TSR[_0x5daed0(0xeb)][_0x5daed0(0xc5)][0x0]),
                (this[_0x5daed0(0xe3)] =
                  TSR[_0x5daed0(0xeb)][_0x5daed0(0xc5)][0x1]));
          } else {
            if (this[_0x5daed0(0x75)]()) {
              const _0x4a60a4 =
                TSR[_0x5daed0(0xeb)][_0x5daed0(0x15f)];
              this[_0x5daed0(0xd5)]++;
              if (this["_pullEventCount"] % _0x4a60a4 === 0x0)
                this["updatePattern"]();
              if (this[_0x5daed0(0xd5)] % 0x4 === 0x0)
                this[_0x5daed0(0xc9)](this["_direction"]);
            } else this["resetPulling"]();
          }
        } else this[_0x5daed0(0x88)]();
      }
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xc9)] = function (
      _0x2eaeea
    ) {
      const _0x347ee6 = _0xd9621d,
        _0x2a1035 = this[_0x347ee6(0x81)],
        _0x3f1de5 = this[_0x347ee6(0x7e)](_0x2eaeea);
      if (this[_0x347ee6(0x10c)] < 0x14) {
        if (this[_0x347ee6(0x10c)] === 0xa) this[_0x347ee6(0x195)]();
        this[_0x347ee6(0x10c)]++;
      } else
        !this["pullMoved"]() &&
        this[_0x347ee6(0x73)](this["x"], this["y"], _0x3f1de5) &&
        _0x2a1035[_0x347ee6(0x105)](
          this["x"],
          this["y"],
          _0x3f1de5,
          !![]
        ) &&
        this["canPull"]()
          ? (this[_0x347ee6(0xa8)](!![]),
            SoundManager[_0x347ee6(0x12c)](),
            (this["_pullEvent"]["dx"] = $gameMap[_0x347ee6(0xfc)](
              this[_0x347ee6(0x81)]["x"],
              _0x3f1de5
            )),
            (this[_0x347ee6(0x81)]["dy"] = $gameMap[_0x347ee6(0x19d)](
              this[_0x347ee6(0x81)]["y"],
              _0x3f1de5
            )),
            (this["_pullEvent"]["sx"] = _0x2a1035["x"]),
            (this["_pullEvent"]["sy"] = _0x2a1035["y"]),
            this[_0x347ee6(0x72)](this[_0x347ee6(0x7d)]),
            this[_0x347ee6(0xab)](
              this[_0x347ee6(0x81)][_0x347ee6(0x153)]()
            ),
            this[_0x347ee6(0x125)](_0x3f1de5),
            _0x2a1035[_0x347ee6(0xbc)](_0x3f1de5),
            this[_0x347ee6(0x157)](_0x2a1035),
            (this[_0x347ee6(0x10c)] = 0x0),
            (this[_0x347ee6(0x126)] = ![]),
            this[_0x347ee6(0x173)]())
          : this[_0x347ee6(0x88)]();
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x175)] = function () {
      const _0x292429 = _0xd9621d,
        _0x577447 = this[_0x292429(0x81)][_0x292429(0x158)];
      return !_0x577447 || $gameSwitches[_0x292429(0x133)](_0x577447);
    }),
    (Game_Player[_0xd9621d(0x79)]["isPulling"] = function () {
      const _0x4ad64f = _0xd9621d;
      return this[_0x4ad64f(0x126)];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xa8)] = function (
      _0x507375
    ) {
      this["_pullMoved"] = _0x507375;
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xb5)] = function () {
      const _0x2ba053 = _0xd9621d;
      return this[_0x2ba053(0x193)];
    }),
    (Game_Player["prototype"][_0xd9621d(0xab)] = function (
      _0x377254
    ) {
      const _0x5283ca = _0xd9621d;
      this[_0x5283ca(0xec)] = _0x377254;
    }),
    (Game_Player["prototype"][_0xd9621d(0xbe)] = function () {
      const _0x5bb369 = _0xd9621d;
      return this[_0x5bb369(0x70)];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x176)] = function () {
      const _0x46b0f1 = _0xd9621d;
      return this[_0x46b0f1(0xec)];
    }),
    (Game_Player["prototype"]["resetPulling"] = function () {
      const _0x4bfc8c = _0xd9621d;
      (this["_pullCount"] = 0x0),
        (this[_0x4bfc8c(0x126)] = ![]),
        (this[_0x4bfc8c(0x81)] = null),
        this["setPullDist"](![]),
        this[_0x4bfc8c(0x132)](!![]),
        this[_0x4bfc8c(0xa8)](![]),
        this[_0x4bfc8c(0x10b)](),
        this[_0x4bfc8c(0xba)]();
    }),
    (Game_Player[_0xd9621d(0x79)]["isHoldingOk"] = function () {
      const _0x4dfcb8 = _0xd9621d;
      return (
        Input["isPressed"](TSR["moveEvent"][_0x4dfcb8(0x10a)]) ||
        Input["isTriggered"](TSR[_0x4dfcb8(0xeb)]["_moveKey"]) ||
        Input[_0x4dfcb8(0xcf)](TSR[_0x4dfcb8(0xeb)][_0x4dfcb8(0x10a)])
      );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x119)] = function (
      _0x162f71,
      _0x69181b,
      _0x1c70db,
      _0x3cfcb4,
      _0x46df0e
    ) {
      const _0x4f1695 = _0xd9621d;
      if (
        !$gameMap[_0x4f1695(0x188)]() &&
        !this[_0x4f1695(0x15b)]()
      ) {
        if (
          this[_0x4f1695(0x110)](
            _0x162f71,
            _0x69181b,
            _0x1c70db,
            _0x3cfcb4
          ) &&
          !this[_0x4f1695(0x155)]() &&
          this[_0x4f1695(0x92)]()
        ) {
          if (!this["hasPickup"]())
            this[_0x4f1695(0x19c)](),
              (this[_0x4f1695(0xd4)] = this[_0x4f1695(0xb1)](
                _0x162f71,
                _0x69181b,
                _0x1c70db,
                _0x3cfcb4
              )),
              (this[_0x4f1695(0xd4)]["_lastX"] =
                this[_0x4f1695(0xd4)]["x"]),
              (this["_pickupEvent"][_0x4f1695(0xe6)] =
                this[_0x4f1695(0xd4)]["y"]),
              this["_pickupEvent"][_0x4f1695(0xdf)](
                _0x46df0e,
                this[_0x4f1695(0xd4)][_0x4f1695(0x12f)]()
              ),
              (this[_0x4f1695(0xd4)][_0x4f1695(0x18c)] = 0x0),
              (this[_0x4f1695(0xd4)][_0x4f1695(0x131)] = ![]),
              (this["_hasPickup"] = !![]),
              this["_pickupEvent"][_0x4f1695(0xd1)](!![]),
              this["moveStraight"](_0x46df0e),
              $gameSystem[_0x4f1695(0xe5)](),
              SoundManager["playPickup"](),
              TSR[_0x4f1695(0xeb)][_0x4f1695(0xf2)] &&
                (this["checkCacheImage"](),
                (this["_characterName"] =
                  TSR["moveEvent"]["_pickupSheet"][0x0]),
                (this["_characterIndex"] =
                  TSR[_0x4f1695(0xeb)]["_pickupSheet"][0x1]));
          else
            this["hasPickup"]()
              ? this[_0x4f1695(0x11e)]()
              : this[_0x4f1695(0x83)]();
        } else
          this[_0x4f1695(0x92)]() && this[_0x4f1695(0x99)]()
            ? this["executePickup"]()
            : this[_0x4f1695(0x83)]();
      }
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x11e)] = function () {
      const _0x39ac10 = _0xd9621d,
        _0x5678cb = this[_0x39ac10(0xd4)];
      _0x5678cb &&
        (_0x5678cb[_0x39ac10(0x6f)](!![]),
        _0x5678cb["setThrough"](!![]));
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x14f)] = function () {
      const _0x2f33de = _0xd9621d;
      if (this[_0x2f33de(0x99)]()) {
        const _0x3d5273 = this[_0x2f33de(0xd4)],
          _0x2d42fb = this[_0x2f33de(0x12f)](),
          _0x5b1ed2 = this[_0x2f33de(0xae)],
          _0x77a7ed = this[_0x2f33de(0x19e)],
          _0xfb73c5 = this["pickupOffset"](),
          _0x2ddff3 = _0xfb73c5 / $gameMap[_0x2f33de(0xf3)](),
          _0x51b33d =
            _0x2d42fb === 0x4
              ? _0x5b1ed2 - _0x2ddff3
              : _0x2d42fb === 0x6
              ? _0x5b1ed2 + _0x2ddff3
              : _0x5b1ed2,
          _0x1765a6 =
            _0x2d42fb === 0x2
              ? _0x77a7ed + _0x2ddff3
              : _0x2d42fb === 0x8
              ? _0x77a7ed - _0x2ddff3
              : _0x77a7ed,
          _0x5e1fe8 =
            _0x2d42fb === 0x4 || _0x2d42fb === 0x6 ? -0.25 : -0.15;
        if (_0x3d5273["_isPickupChar"]) {
          const _0x3063b9 = this[_0x2f33de(0xca)](
            _0x2d42fb,
            _0x3d5273[_0x2f33de(0x139)]()
          );
          _0x3d5273[_0x2f33de(0x123)](_0x3063b9);
          if (!_0x3d5273[_0x2f33de(0xa3)]())
            _0x3d5273[_0x2f33de(0x10d)]();
        }
        _0x3d5273[_0x2f33de(0xef)](_0x51b33d, _0x1765a6 + _0x5e1fe8),
          !_0x3d5273[_0x2f33de(0x121)] &&
            !_0x3d5273[_0x2f33de(0x9a)] &&
            ((this["_hasPickup"] = ![]),
            (this[_0x2f33de(0xd4)] = null));
      } else this[_0x2f33de(0x15b)]() && this[_0x2f33de(0x9e)]();
    }),
    (Game_Player["prototype"]["calcDirection"] = function (
      _0x2a012c,
      _0x25c5cc
    ) {
      if (_0x25c5cc[0x0] === _0x25c5cc[0x1]) return _0x2a012c;
      else {
        if (_0x25c5cc[0x0] === 0xa - _0x25c5cc[0x1])
          return 0xa - _0x2a012c;
        else {
          if (_0x2a012c === _0x25c5cc[0x0]) return _0x25c5cc[0x1];
          else
            return _0x2a012c === 0xa - _0x25c5cc[0x0]
              ? 0xa - _0x25c5cc[0x1]
              : _0x2a012c === 0xa - _0x25c5cc[0x1]
              ? _0x25c5cc[0x0]
              : 0xa - _0x25c5cc[0x0];
        }
      }
    }),
    (Game_Player[_0xd9621d(0x79)]["pickupOffset"] = function () {
      const _0x11c281 = _0xd9621d;
      return (
        this[_0x11c281(0xd4)][_0x11c281(0xad)] ||
        TSR[_0x11c281(0xeb)][_0x11c281(0x196)]
      );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x83)] = function () {
      const _0x182f9c = _0xd9621d;
      if (this[_0x182f9c(0xd4)]) {
        const _0x34f4c9 = this[_0x182f9c(0x12f)](),
          _0x70a389 = this["x"],
          _0x4ddf74 = this["y"];
        let _0x1a38a4 = this[_0x182f9c(0xfb)](
            _0x70a389,
            _0x4ddf74,
            _0x34f4c9
          ),
          _0x4857ff =
            _0x34f4c9 === 0x4
              ? _0x70a389 - _0x1a38a4
              : _0x34f4c9 === 0x6
              ? _0x70a389 + _0x1a38a4
              : _0x70a389,
          _0x27c5a3 =
            _0x34f4c9 === 0x2
              ? _0x4ddf74 + _0x1a38a4
              : _0x34f4c9 === 0x8
              ? _0x4ddf74 - _0x1a38a4
              : _0x4ddf74,
          _0x505f46 = $gameMap[_0x182f9c(0xfc)](
            _0x4857ff,
            0xa - _0x34f4c9
          ),
          _0x5bce3c = $gameMap["roundYWithDirection"](
            _0x27c5a3,
            0xa - _0x34f4c9
          );
        while (!this["throwPass"](_0x505f46, _0x5bce3c, _0x34f4c9)) {
          _0x1a38a4--,
            (_0x4857ff =
              _0x34f4c9 === 0x4
                ? _0x70a389 - _0x1a38a4
                : _0x34f4c9 === 0x6
                ? _0x70a389 + _0x1a38a4
                : _0x70a389),
            (_0x27c5a3 =
              _0x34f4c9 === 0x2
                ? _0x4ddf74 + _0x1a38a4
                : _0x34f4c9 === 0x8
                ? _0x4ddf74 - _0x1a38a4
                : _0x4ddf74),
            (_0x505f46 = $gameMap[_0x182f9c(0xfc)](
              _0x4857ff,
              0xa - _0x34f4c9
            )),
            (_0x5bce3c = $gameMap[_0x182f9c(0x19d)](
              _0x27c5a3,
              0xa - _0x34f4c9
            ));
          if (_0x1a38a4 === 0x0) break;
        }
        (this[_0x182f9c(0xd4)][_0x182f9c(0x16e)] = _0x1a38a4),
          this[_0x182f9c(0xd4)]["setThrowDestination"](
            _0x4857ff,
            _0x27c5a3,
            _0x70a389,
            _0x4ddf74,
            _0x34f4c9
          ),
          this["_pickupEvent"]["setPriorityType"](0x2),
          (this[_0x182f9c(0x190)] = ![]),
          this["_pickupEvent"][_0x182f9c(0x6f)](![]),
          (this["_hasThrew"] = !![]),
          this[_0x182f9c(0xd4)][_0x182f9c(0x192)](!![]);
      }
    }),
    (Game_Player["prototype"][_0xd9621d(0xfb)] = function (
      _0x4dd697,
      _0x31af88,
      _0x375d67
    ) {
      const _0x37e80a = _0xd9621d;
      let _0xcb901 = 0x0;
      const _0x3422f5 =
        this[_0x37e80a(0x17a)]() && this[_0x37e80a(0x155)]()
          ? 0x3
          : this[_0x37e80a(0x74)]()
          ? 0x2
          : 0x1;
      for (;;) {
        const _0x12ae69 =
            _0x375d67 === 0x4
              ? _0x4dd697 - _0xcb901
              : _0x375d67 === 0x6
              ? _0x4dd697 + _0xcb901
              : _0x4dd697,
          _0x566292 =
            _0x375d67 === 0x2
              ? _0x31af88 + _0xcb901
              : _0x375d67 === 0x8
              ? _0x31af88 - _0xcb901
              : _0x31af88,
          _0x5ec694 = $gameMap[_0x37e80a(0x115)](
            _0x12ae69,
            _0x566292
          );
        if (DataManager[_0x37e80a(0xf7)](_0x5ec694)) return _0xcb901;
        else {
          if (_0xcb901 < _0x3422f5) _0xcb901++;
          else return _0xcb901;
        }
      }
    }),
    (Game_Player[_0xd9621d(0x79)]["updateThrow"] = function () {
      const _0x69c358 = _0xd9621d,
        _0xeb4bcf = this[_0x69c358(0xd4)],
        _0x29944d = _0xeb4bcf[_0x69c358(0xde)]();
      if (_0xeb4bcf[_0x69c358(0xfd)]() || _0xeb4bcf[_0x69c358(0x13b)])
        this[_0x69c358(0x19c)](_0x29944d);
      else {
        if (
          (_0xeb4bcf[_0x69c358(0xae)] !== _0x29944d[0x0] ||
            _0xeb4bcf[_0x69c358(0x19e)] !== _0x29944d[0x1]) &&
          !this[_0x69c358(0x117)]
        ) {
          const _0x1f64ab = -(_0xeb4bcf["x"] - _0x29944d[0x0]),
            _0x490fd4 = -(_0xeb4bcf["y"] - _0x29944d[0x1]);
          _0xeb4bcf[_0x69c358(0xd7)](_0x1f64ab, _0x490fd4),
            (this[_0x69c358(0x117)] = !![]),
            _0xeb4bcf[_0x69c358(0x84)](!![]),
            SoundManager["playThrow"](),
            TSR[_0x69c358(0xeb)][_0x69c358(0xa4)] &&
              (this[_0x69c358(0x170)](),
              (this[_0x69c358(0x121)] =
                TSR[_0x69c358(0xeb)][_0x69c358(0xa4)][0x0]),
              (this["_characterIndex"] =
                TSR[_0x69c358(0xeb)][_0x69c358(0xa4)][0x1]),
              this[_0x69c358(0x148)](0x0),
              (this[_0x69c358(0x14d)] = 0x0),
              (this["_throwPattern"] = !![]));
        } else {
          if (this[_0x69c358(0x117)]) {
            this[_0x69c358(0x14d)]++;
            if (
              this["_throwCount"] === 0xc ||
              this[_0x69c358(0x14d)] === 0x18
            )
              this[_0x69c358(0x6b)]();
            if (
              _0xeb4bcf[_0x69c358(0xae)] === _0x29944d[0x0] &&
              _0xeb4bcf[_0x69c358(0x19e)] === _0x29944d[0x1]
            )
              this[_0x69c358(0x117)] = ![];
          } else
            SoundManager["playDrop"](),
              this[_0x69c358(0x19c)](_0x29944d);
        }
      }
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x15b)] = function () {
      const _0x37f691 = _0xd9621d;
      return this[_0x37f691(0x11a)];
    }),
    (Game_Player[_0xd9621d(0x79)]["endPickup"] = function (
      _0x3024cf
    ) {
      const _0x2b611a = _0xd9621d;
      this[_0x2b611a(0xba)]();
      if (this[_0x2b611a(0xd4)]) {
        this["_pickupEvent"][_0x2b611a(0x189)](
          _0x3024cf[0x0],
          _0x3024cf[0x1]
        ),
          (this[_0x2b611a(0x11a)] = ![]),
          (this[_0x2b611a(0x117)] = ![]),
          this[_0x2b611a(0xd4)][_0x2b611a(0xd1)](![]),
          (this[_0x2b611a(0xd4)][_0x2b611a(0x114)] =
            this[_0x2b611a(0xd4)][_0x2b611a(0x161)]),
          this[_0x2b611a(0xd4)][_0x2b611a(0x19a)](0x1);
        if (this["_pickupEvent"]["isBreakable"]()) {
          const _0x2ef53b = $gameMap["mapId"](),
            _0x125e94 = this[_0x2b611a(0xd4)][_0x2b611a(0xdb)](),
            _0x57f7b2 = this["_pickupEvent"][_0x2b611a(0x15c)]();
          $gameSelfSwitches[_0x2b611a(0x8e)](
            [_0x2ef53b, _0x125e94, _0x57f7b2],
            !![]
          );
        }
      }
      $gameSystem[_0x2b611a(0x77)](),
        (this["_pickupEvent"] = null),
        (this[_0x2b611a(0x18e)] = ![]);
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x130)] = function () {
      const _0x3f61d7 = _0xd9621d;
      this[_0x3f61d7(0xba)](),
        this[_0x3f61d7(0xd4)] &&
          this[_0x3f61d7(0xd4)][_0x3f61d7(0x189)](
            this[_0x3f61d7(0xd4)][_0x3f61d7(0x95)],
            this[_0x3f61d7(0xd4)][_0x3f61d7(0xe6)]
          ),
        (this["_hasPickup"] = ![]),
        (this[_0x3f61d7(0xd4)] = null),
        $gameSystem["enableMenu"]();
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x170)] = function () {
      const _0x26e6f9 = _0xd9621d;
      !this[_0x26e6f9(0x113)] &&
        ((this[_0x26e6f9(0x113)] = this["characterName"]()),
        (this["_cacheCharIndex"] = this["characterIndex"]()));
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xba)] = function () {
      const _0x23e3ec = _0xd9621d;
      this[_0x23e3ec(0x113)] &&
        ((this[_0x23e3ec(0x121)] = this[_0x23e3ec(0x113)]),
        (this[_0x23e3ec(0xe3)] = this[_0x23e3ec(0xb7)]),
        (this["_cacheCharName"] = ![]),
        (this[_0x23e3ec(0xb7)] = ![]));
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x94)] = function (
      _0xaabd12,
      _0x3ae5a0
    ) {
      const _0x2b718a = _0xd9621d,
        _0x257d7f = $gameMap["eventsXyNt"](_0xaabd12, _0x3ae5a0);
      if (this[_0x2b718a(0x155)]()) return ![];
      return _0x257d7f[_0x2b718a(0x146)]((_0x51dd23) =>
        _0x51dd23[_0x2b718a(0xa7)]()
      );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x110)] = function (
      _0x5c018b,
      _0x215449,
      _0x4d9bbb,
      _0x360000
    ) {
      const _0x52282d = _0xd9621d,
        _0x3fce5e = $gameMap[_0x52282d(0x198)](_0x5c018b, _0x215449),
        _0x442974 = $gameMap["eventsXyNt"](_0x4d9bbb, _0x360000);
      return (
        _0x3fce5e[_0x52282d(0x146)]((_0x32c310) =>
          _0x32c310[_0x52282d(0x7c)]()
        ) ||
        _0x442974[_0x52282d(0x146)]((_0xf06d56) =>
          _0xf06d56["isPickable"]()
        )
      );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x171)] = function (
      _0x303fd1,
      _0x5b8fa5
    ) {
      const _0x4d061f = _0xd9621d,
        _0x479793 = $gameMap[_0x4d061f(0x198)](_0x303fd1, _0x5b8fa5);
      for (const _0x17fd91 of _0x479793) {
        if (_0x17fd91[_0x4d061f(0xa7)]()) return _0x17fd91;
      }
    }),
    (Game_Player["prototype"][_0xd9621d(0xb1)] = function (
      _0x5b7584,
      _0x38d87a,
      _0x3700ed,
      _0x5d07f3
    ) {
      const _0x1d3842 = _0xd9621d,
        _0x3be5da = $gameMap[_0x1d3842(0x198)](_0x5b7584, _0x38d87a),
        _0x21afc6 = $gameMap["eventsXyNt"](_0x3700ed, _0x5d07f3);
      for (const _0xcafc32 of _0x3be5da) {
        if (_0xcafc32[_0x1d3842(0x7c)]()) return _0xcafc32;
      }
      for (const _0x194671 of _0x21afc6) {
        if (_0x194671[_0x1d3842(0x7c)]()) return _0x194671;
      }
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x120)] = function () {
      const _0x40883f = _0xd9621d;
      return !this[_0x40883f(0xd4)];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x128)] = function () {
      const _0x4072ff = _0xd9621d;
      !this["_directionFix"] &&
        ((this[_0x4072ff(0xb4)] = !![]),
        this["setDirectionFix"](!![])),
        Imported["TSR_MapJump"] &&
          TSR[_0x4072ff(0x90)][_0x4072ff(0x172)] &&
          ((this[_0x4072ff(0xea)] = !![]),
          (TSR["mapJump"][_0x4072ff(0x172)] = ![]));
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x69)] = function () {
      const _0x467c1c = _0xd9621d;
      this[_0x467c1c(0xb4)] &&
        ((this[_0x467c1c(0xb4)] = ![]), this[_0x467c1c(0x197)](![])),
        this["_cacheEnableJump"] &&
          ((this[_0x467c1c(0xea)] = ![]),
          (TSR[_0x467c1c(0x90)][_0x467c1c(0x172)] = !![]));
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x195)] = function () {
      const _0x55f3c8 = _0xd9621d;
      SoundManager[_0x55f3c8(0x178)](),
        $gameTemp[_0x55f3c8(0x174)]
          ? $gameTemp[_0x55f3c8(0x102)](
              this,
              TSR[_0x55f3c8(0xeb)][_0x55f3c8(0xb8)]
            )
          : this["requestBalloon"](
              TSR["moveEvent"]["_effortBallonId"]
            );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x10b)] = function () {
      const _0x289bf5 = _0xd9621d;
      this[_0x289bf5(0xbb)](this[_0x289bf5(0x9c)]());
    }),
    (Game_Player["prototype"][_0xd9621d(0x157)] = function (
      _0xb451b0
    ) {
      const _0x580abf = _0xd9621d,
        _0x23a265 =
          $dataMap[_0x580abf(0xff)][_0xb451b0[_0x580abf(0x80)]][
            "name"
          ],
        _0x2bb2ea = $gameSystem["_mysteryEvents"][_0x23a265];
      _0x2bb2ea &&
        _0x2bb2ea[0x0] &&
        (SoundManager[_0x580abf(0x136)](),
        $gameSwitches[_0x580abf(0x8e)](_0x2bb2ea[0x1], !![]),
        (_0x2bb2ea[0x0] = ![]));
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0x183)] = function (
      _0x19c278,
      _0x89f430,
      _0x1bad8b
    ) {
      const _0x5d7123 = _0xd9621d,
        _0x2e4339 = $gameMap[_0x5d7123(0xfc)](_0x19c278, _0x1bad8b),
        _0x353d0e = $gameMap["roundYWithDirection"](
          _0x89f430,
          _0x1bad8b
        ),
        _0x3a161b = $gameMap[_0x5d7123(0x115)](_0x2e4339, _0x353d0e),
        _0x46ae6c = DataManager[_0x5d7123(0x82)](_0x3a161b);
      if (DataManager[_0x5d7123(0xf7)](_0x3a161b)) return ![];
      return (
        this["canPass"](_0x19c278, _0x89f430, _0x1bad8b) || _0x46ae6c
      );
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xac)] = function (
      _0x3fd375,
      _0x128079,
      _0x4db1d7,
      _0x36d0fa
    ) {
      const _0x4b4dce = _0xd9621d,
        _0x269c83 = $gameMap[_0x4b4dce(0x68)](_0x3fd375),
        _0x1afd68 = _0x36d0fa || this[_0x4b4dce(0x12f)]();
      if (
        this["x"] === _0x128079 &&
        this["y"] === _0x4db1d7 &&
        _0x1afd68 === this["direction"]() &&
        this[_0x4b4dce(0x199)](_0x269c83["_eventId"])
      )
        return (_0x269c83[_0x4b4dce(0x13b)] = !![]), !![];
      return ![];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xcd)] = function (
      _0x4c5dba,
      _0x5e5ff2
    ) {
      const _0x24ba79 = _0xd9621d,
        _0xaf7ae7 = $gameMap[_0x24ba79(0x68)](_0x4c5dba),
        _0x1b38bc = $gameMap[_0x24ba79(0x68)](_0x5e5ff2),
        _0x3f1fd2 = _0x1b38bc["x"],
        _0xd1feb = _0x1b38bc["y"],
        _0x387c76 = _0x1b38bc[_0x24ba79(0x12f)](),
        _0xc4f85a =
          _0x387c76 === 0x4
            ? _0x3f1fd2 - 0x1
            : _0x387c76 === 0x6
            ? _0x3f1fd2 + 0x1
            : _0x3f1fd2,
        _0x3aa458 =
          _0x387c76 === 0x2
            ? _0xd1feb + 0x1
            : _0x387c76 === 0x8
            ? _0xd1feb - 0x1
            : _0xd1feb,
        _0x555478 = this[_0x24ba79(0x12f)]();
      if (
        _0xaf7ae7[_0x24ba79(0x10e)](_0xc4f85a, _0x3aa458) &&
        _0x555478 === 0xa - _0x387c76 &&
        this[_0x24ba79(0x199)](_0xaf7ae7[_0x24ba79(0x80)])
      )
        return (_0xaf7ae7["_isBrought"] = !![]), !![];
      return ![];
    }),
    (Game_Player[_0xd9621d(0x79)][_0xd9621d(0xf1)] = function (
      _0x3b09cf,
      _0x5c43f6,
      _0xfff67f
    ) {
      const _0x282a19 = _0xd9621d,
        _0x176e3c = $gameMap[_0x282a19(0x68)](_0x3b09cf);
      return (
        _0x176e3c[_0x282a19(0xae)] === _0x5c43f6 &&
        _0x176e3c[_0x282a19(0x19e)] === _0xfff67f &&
        !this[_0x282a19(0x199)](_0x3b09cf)
      );
    }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x16a)] =
      Game_Event[_0xd9621d(0x79)]["setupPage"]),
    (Game_Event["prototype"][_0xd9621d(0xc2)] = function () {
      const _0x292da2 = _0xd9621d;
      TSR[_0x292da2(0xeb)][_0x292da2(0x16a)]["call"](this),
        this[_0x292da2(0x122)]();
    }),
    (Game_Event[_0xd9621d(0x79)][_0xd9621d(0x122)] = function () {
      const _0x5e620f = _0xd9621d;
      if (!this["page"]()) return;
      const _0xfa1f2f = /<(?:MOVABLE EVENT|MOVABLE)>/i,
        _0x2ea522 = /<(?:MOVABLE MYSTERY|PUSH MYSTERY):[ ](\d+)>/i,
        _0x4a643c = /<(?:PICKABLE EVENT|PICKUP EVENT)>/i,
        _0x154200 = /<(?:MOVE EVENT OFFSET|MOVE OFFSET):[ ](\d+)>/i,
        _0x192369 = /<(?:PICKABLE CHARACTER|PICKUP CHARACTER)>/i,
        _0x29bccd = /<(?:PICKABLE EVENT|PICKUP EVENT):[ ](.)>/i,
        _0x218ef6 = /<(?:MOVABLE EVENT|MOVABLE):[ ](\d+)>/i,
        _0x478518 = /<(?:MOVABLE CHARACTER|MOVABLE CHAR)>/i,
        _0x50d588 = this["list"](),
        _0x4a7a68 = _0x50d588[_0x5e620f(0xce)];
      (this[_0x5e620f(0x118)] = ![]),
        (this[_0x5e620f(0x8f)] = ![]),
        (this[_0x5e620f(0x19b)] = ![]),
        (this["_isBreakable"] = ![]),
        (this[_0x5e620f(0x158)] = ![]),
        (this["_isMovableChar"] = ![]),
        (this[_0x5e620f(0xad)] = 0x0);
      for (let _0x5bf36a = 0x0; _0x5bf36a < _0x4a7a68; ++_0x5bf36a) {
        let _0x39db0b = _0x50d588[_0x5bf36a];
        if ([0x6c, 0x198][_0x5e620f(0x185)](_0x39db0b["code"])) {
          if (
            _0x39db0b[_0x5e620f(0x101)][0x0][_0x5e620f(0x106)](
              _0xfa1f2f
            )
          )
            this[_0x5e620f(0x118)] = !![];
          else {
            if (
              _0x39db0b[_0x5e620f(0x101)][0x0][_0x5e620f(0x106)](
                _0x2ea522
              )
            ) {
              this[_0x5e620f(0x118)] = !![];
              const _0x200df3 =
                  $dataMap[_0x5e620f(0xff)][this[_0x5e620f(0x80)]][
                    "name"
                  ],
                _0x20afc4 = parseInt(RegExp["$1"]);
              !$gameSystem["_mysteryEvents"][_0x200df3] &&
                ($gameSystem[_0x5e620f(0x18a)][_0x200df3] = [
                  !![],
                  _0x20afc4,
                ]);
            } else {
              if (
                _0x39db0b[_0x5e620f(0x101)][0x0][_0x5e620f(0x106)](
                  _0x4a643c
                )
              )
                this[_0x5e620f(0x8f)] = !![];
              else {
                if (
                  _0x39db0b[_0x5e620f(0x101)][0x0][_0x5e620f(0x106)](
                    _0x154200
                  )
                )
                  this["_moveEventOffset"] = parseInt(RegExp["$1"]);
                else {
                  if (
                    _0x39db0b["parameters"][0x0]["match"](_0x192369)
                  )
                    (this[_0x5e620f(0x8f)] = !![]),
                      (this["_isPickupChar"] = !![]);
                  else {
                    if (
                      _0x39db0b[_0x5e620f(0x101)][0x0][
                        _0x5e620f(0x106)
                      ](_0x29bccd)
                    ) {
                      const _0x16c915 = _0x39db0b["parameters"][0x0],
                        _0x57f864 = _0x16c915[_0x5e620f(0x16d)](
                          _0x16c915[_0x5e620f(0xe7)](":") + 0x1,
                          _0x16c915[_0x5e620f(0xe7)](">")
                        )[_0x5e620f(0xc3)]();
                      (this["_isPickable"] = !![]),
                        (this["_isBreakable"] =
                          _0x57f864[_0x5e620f(0xd8)]());
                    } else {
                      if (
                        _0x39db0b[_0x5e620f(0x101)][0x0][
                          _0x5e620f(0x106)
                        ](_0x218ef6)
                      )
                        (this[_0x5e620f(0x118)] = !![]),
                          (this[_0x5e620f(0x158)] = parseInt(
                            RegExp["$1"]
                          ));
                      else
                        _0x39db0b[_0x5e620f(0x101)][0x0][
                          _0x5e620f(0x106)
                        ](_0x478518) &&
                          ((this[_0x5e620f(0x118)] = !![]),
                          (this[_0x5e620f(0x12e)] = !![]));
                    }
                  }
                }
              }
            }
          }
        }
      }
    }),
    (Game_Event["prototype"][_0xd9621d(0xa7)] = function () {
      return this["_isMovable"];
    }),
    (Game_Event["prototype"][_0xd9621d(0x7c)] = function () {
      const _0x1c7911 = _0xd9621d;
      return this[_0x1c7911(0x8f)];
    }),
    (Game_Event[_0xd9621d(0x79)][_0xd9621d(0xdf)] = function (
      _0x4f2362,
      _0x16422d
    ) {
      this["_dirInfo"] = [_0x4f2362, _0x16422d];
    }),
    (Game_Event[_0xd9621d(0x79)][_0xd9621d(0x139)] = function () {
      const _0x56a0cb = _0xd9621d;
      return this[_0x56a0cb(0x15a)];
    }),
    (Game_Event[_0xd9621d(0x79)][_0xd9621d(0x105)] = function (
      _0x4d3c9b,
      _0x20ab32,
      _0xe5cb51,
      _0x4a5220
    ) {
      const _0x4efd7e = _0xd9621d;
      if (
        DataManager["isPreventMoveRegion"](
          $gameMap[_0x4efd7e(0x115)](_0x4d3c9b, _0x20ab32)
        )
      )
        return ![];
      if (
        !$gameMap[_0x4efd7e(0x164)](_0x4d3c9b, _0x20ab32, _0xe5cb51)
      )
        return ![];
      if (this[_0x4efd7e(0x140)](_0x4d3c9b, _0x20ab32) && !_0x4a5220)
        return ![];
      return !![];
    }),
    (Game_Event["prototype"][_0xd9621d(0x115)] = function () {
      const _0x5e78fb = _0xd9621d;
      if (this[_0x5e78fb(0x9f)]()) return null;
      return $gameMap[_0x5e78fb(0x115)](this["_x"], this["_y"]);
    }),
    (Game_Event["prototype"]["forceMove"] = function (_0x561a4a) {
      const _0x3fe897 = _0xd9621d;
      this[_0x3fe897(0xd1)](!![]), this[_0x3fe897(0x76)](_0x561a4a);
      if (this[_0x3fe897(0x12e)]) this[_0x3fe897(0x159)] = _0x561a4a;
      this[_0x3fe897(0xd1)](![]);
    }),
    (TSR["moveEvent"]["_Game_Event_isCollidedWithEvents"] =
      Game_Event[_0xd9621d(0x79)][_0xd9621d(0x166)]),
    (Game_Event[_0xd9621d(0x79)]["isCollidedWithEvents"] = function (
      _0x5507eb,
      _0x90a4e5
    ) {
      const _0x47993e = _0xd9621d,
        _0x19960b = $gameMap["eventsXyNt"](_0x5507eb, _0x90a4e5),
        _0x4d46f7 = _0x19960b[_0x47993e(0x146)](
          (_0x335b99) => !_0x335b99[_0x47993e(0xbd)]()
        );
      return (this[_0x47993e(0xa7)]() || this["isPickable"]()) &&
        _0x4d46f7
        ? ![]
        : TSR[_0x47993e(0xeb)][_0x47993e(0x13a)][_0x47993e(0x14c)](
            this,
            _0x5507eb,
            _0x90a4e5
          );
    }),
    (TSR["moveEvent"][_0xd9621d(0x93)] =
      Spriteset_Map[_0xd9621d(0x79)][_0xd9621d(0x184)]),
    (Spriteset_Map[_0xd9621d(0x79)][_0xd9621d(0x184)] = function () {
      const _0x5b6796 = _0xd9621d;
      TSR[_0x5b6796(0xeb)][_0x5b6796(0x93)][_0x5b6796(0x14c)](this),
        this[_0x5b6796(0x152)]();
    }),
    (Spriteset_Map[_0xd9621d(0x79)]["createThrowShadowContainer"] =
      function () {
        const _0x5396fc = _0xd9621d;
        (this[_0x5396fc(0xb0)] = new Sprite()),
          this[_0x5396fc(0xb0)][_0x5396fc(0x177)](
            0x0,
            0x0,
            this[_0x5396fc(0x87)],
            this["height"]
          ),
          (this["_throwShadowContainer"]["z"] = 0x2),
          this["_tilemap"]["addChild"](this[_0x5396fc(0xb0)]);
      }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x9d)] =
      Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x109)]),
    (Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x109)] =
      function () {
        const _0x3de87d = _0xd9621d;
        TSR[_0x3de87d(0xeb)][_0x3de87d(0x9d)][_0x3de87d(0x14c)](this),
          (this[_0x3de87d(0xe2)] = []),
          (this[_0x3de87d(0x187)] = 0x0);
      }),
    (TSR[_0xd9621d(0xeb)][_0xd9621d(0x1a1)] =
      Sprite_Character["prototype"][_0xd9621d(0x103)]),
    (Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x103)] =
      function () {
        const _0xefbc3a = _0xd9621d;
        TSR["moveEvent"][_0xefbc3a(0x1a1)][_0xefbc3a(0x14c)](this),
          this[_0xefbc3a(0x17b)]();
      }),
    (TSR["moveEvent"][_0xd9621d(0x143)] =
      Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x182)]),
    (Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x182)] =
      function () {
        const _0x58082e = _0xd9621d;
        if (this["_character"][_0x58082e(0x134)]()) {
          const _0x37775c =
              this[_0x58082e(0x186)][_0x58082e(0x12f)](),
            _0x3475e6 =
              _0x37775c === 0x4 || _0x37775c === 0x6 ? "x" : "y",
            _0x5e8463 = _0x3475e6 === "x" ? "y" : "x",
            _0x1e2ed5 =
              _0x5e8463 === "x"
                ? this[_0x58082e(0x186)][_0x58082e(0x91)]()
                : this["_character"][_0x58082e(0x7a)](),
            _0x28f44e = _0x37775c === 0x2 || _0x37775c === 0x6;
          let _0x512a36 = ![];
          if (this[_0x58082e(0x186)][_0x58082e(0xf6)]())
            (this[_0x3475e6] = this[_0x58082e(0x12d)](
              _0x28f44e,
              _0x3475e6,
              this[_0x58082e(0x186)][_0x58082e(0xf6)]()
            )),
              (this[_0x5e8463] = _0x1e2ed5),
              (this["z"] =
                this[_0x58082e(0x186)][_0x58082e(0x165)]());
          else {
            if (this[_0x58082e(0x186)]["pullDist"]())
              this[_0x58082e(0x186)]["pullMoved"]() &&
                (this[_0x58082e(0x186)][_0x58082e(0xbb)](
                  this[_0x58082e(0x186)][_0x58082e(0x176)]()
                ),
                (_0x512a36 = !![])),
                (this[_0x3475e6] = this[_0x58082e(0x12d)](
                  _0x28f44e,
                  _0x3475e6,
                  this["_character"][_0x58082e(0x163)](),
                  ![],
                  _0x512a36
                )),
                (this[_0x5e8463] = _0x1e2ed5),
                (this["z"] =
                  this[_0x58082e(0x186)][_0x58082e(0x165)]());
            else
              this["_character"][_0x58082e(0x13c)]()
                ? ((this[_0x3475e6] = this[_0x58082e(0x12d)](
                    !_0x28f44e,
                    _0x3475e6,
                    this[_0x58082e(0x186)]["backDist"](),
                    !![]
                  )),
                  (this[_0x5e8463] = _0x1e2ed5),
                  (this["z"] =
                    this[_0x58082e(0x186)][_0x58082e(0x165)]()))
                : TSR["moveEvent"][_0x58082e(0x143)][
                    _0x58082e(0x14c)
                  ](this);
          }
        } else
          TSR[_0x58082e(0xeb)][_0x58082e(0x143)][_0x58082e(0x14c)](
            this
          );
      }),
    (Sprite_Character["prototype"]["mapCoordinates"] = function (
      _0x185d0f,
      _0x4aaec6,
      _0x5b7994,
      _0x3f3bb2,
      _0x260fa1
    ) {
      const _0x106d58 = _0xd9621d;
      this[_0x106d58(0x187)]++;
      const _0x1a9274 = this[_0x106d58(0x186)],
        _0x1f4056 =
          _0x4aaec6 === "x"
            ? _0x1a9274[_0x106d58(0x91)]()
            : _0x1a9274[_0x106d58(0x7a)](),
        _0x183f63 = _0x3f3bb2 || _0x260fa1 ? _0x1f4056 : _0x5b7994,
        _0x49df33 = _0x3f3bb2 ? 0x0 : _0x1a9274["moveOffset"]();
      if (_0x185d0f) {
        if (this[_0x4aaec6] < _0x183f63)
          return (
            _0x1a9274["setMovingEventPreventMove"](!![]),
            this[_0x4aaec6] + 0x1
          );
        else {
          _0x1a9274["setMovingEventPreventMove"](![]);
          if (_0x3f3bb2) _0x1a9274[_0x106d58(0x132)](![]);
          return _0x1f4056 + _0x49df33;
        }
      } else {
        if (this[_0x4aaec6] > _0x183f63)
          return (
            _0x1a9274[_0x106d58(0x6a)](!![]), this[_0x4aaec6] - 0x1
          );
        else {
          _0x1a9274["setMovingEventPreventMove"](![]);
          if (_0x3f3bb2) _0x1a9274[_0x106d58(0x132)](![]);
          return _0x1f4056 - _0x49df33;
        }
      }
    }),
    (Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x127)] =
      function () {
        const _0xa4de95 = _0xd9621d;
        this[_0xa4de95(0x186)][_0xa4de95(0x12b)]() &&
          (this[_0xa4de95(0x186)]["setRequireThrowShadow"](![]),
          this[_0xa4de95(0x129)]());
      }),
    (Sprite_Character[_0xd9621d(0x79)][_0xd9621d(0x129)] =
      function () {
        const _0x54fe7e = _0xd9621d,
          _0xb57dfc = this[_0x54fe7e(0xa5)]();
        this[_0x54fe7e(0xe2)][_0x54fe7e(0xd0)](_0xb57dfc);
      }),
    (Sprite_Character["prototype"][_0xd9621d(0xa5)] = function () {
      const _0x1a330f = _0xd9621d;
      let _0x43d82 = new Sprite_ThrowShadow();
      return (
        (_0x43d82["x"] = this["x"]),
        (_0x43d82["y"] = this["y"] - 0x10),
        (_0x43d82[_0x1a330f(0x16b)]["x"] = 0.8),
        (_0x43d82[_0x1a330f(0x16b)]["y"] = 0.8),
        _0x43d82[_0x1a330f(0x181)](this, this[_0x1a330f(0x186)]),
        SceneManager[_0x1a330f(0xee)][_0x1a330f(0x15e)][
          "_throwShadowContainer"
        ]["addChild"](_0x43d82),
        _0x43d82
      );
    }),
    (Sprite_Character["prototype"][_0xd9621d(0x17b)] = function () {
      const _0x481f25 = _0xd9621d;
      this[_0x481f25(0x127)](),
        this[_0x481f25(0xe2)]["length"] > 0x0 &&
          !this["_throwSpriteSet"][0x0]["isPlaying"]() &&
          (SceneManager[_0x481f25(0xee)]["_spriteset"][
            _0x481f25(0xb0)
          ][_0x481f25(0x10f)](this["_throwSpriteSet"][0x0]),
          this[_0x481f25(0xe2)][_0x481f25(0x13f)]());
    });
  function Sprite_ThrowShadow() {
    const _0x4385d1 = _0xd9621d;
    this[_0x4385d1(0xe9)][_0x4385d1(0x12a)](this, arguments);
  }
  (Sprite_ThrowShadow["prototype"] = Object["create"](
    Sprite["prototype"]
  )),
    (Sprite_ThrowShadow["prototype"][_0xd9621d(0xf5)] =
      Sprite_ThrowShadow),
    (Sprite_ThrowShadow[_0xd9621d(0x79)][_0xd9621d(0xe9)] =
      function () {
        const _0x99e55f = _0xd9621d;
        Sprite["prototype"]["initialize"][_0x99e55f(0x14c)](this),
          this["initMembers"](),
          this["loadBitmap"]();
      }),
    (Sprite_ThrowShadow["prototype"][_0xd9621d(0x109)] = function () {
      const _0x433f9e = _0xd9621d;
      (this[_0x433f9e(0x16f)]["x"] = 0.5),
        (this[_0x433f9e(0x16f)]["y"] = 0.5),
        (this[_0x433f9e(0x85)] = 0x0);
    }),
    (Sprite_ThrowShadow[_0xd9621d(0x79)][_0xd9621d(0x137)] =
      function () {
        const _0x1bea93 = _0xd9621d;
        (this[_0x1bea93(0xc0)] =
          ImageManager[_0x1bea93(0xa2)]("Shadow1")),
          this[_0x1bea93(0x177)](
            0x0,
            0x0,
            this["bitmap"][_0x1bea93(0x87)],
            this[_0x1bea93(0xc0)][_0x1bea93(0x191)]
          );
      }),
    (Sprite_ThrowShadow[_0xd9621d(0x79)][_0xd9621d(0x181)] =
      function (_0x3c6f82, _0x362a53) {
        const _0x54fcff = _0xd9621d;
        (this[_0x54fcff(0x13d)] = _0x3c6f82),
          (this["_moveJump"] = !![]),
          (this[_0x54fcff(0x159)] = _0x362a53[_0x54fcff(0x159)]),
          (this["_duration"] = _0x362a53["_dist"] * 0x9),
          (this[_0x54fcff(0xf0)] = 0x0);
      }),
    (Sprite_ThrowShadow[_0xd9621d(0x79)]["update"] = function () {
      const _0x5b1192 = _0xd9621d;
      this[_0x5b1192(0x85)]--, this[_0x5b1192(0x15d)]();
    }),
    (Sprite_ThrowShadow["prototype"][_0xd9621d(0x15d)] = function () {
      const _0x28e625 = _0xd9621d,
        _0x1e1aa3 = $gamePlayer[_0x28e625(0x159)];
      if (this[_0x28e625(0x89)]) {
        if (_0x1e1aa3 === 0x4)
          this["x"] = this[_0x28e625(0x13d)]["x"] - 0x4;
        else
          _0x1e1aa3 === 0x6
            ? (this["x"] = this[_0x28e625(0x13d)]["x"] + 0x2)
            : ((this[_0x28e625(0xf0)] += -0x1),
              (this["y"] =
                this[_0x28e625(0x13d)]["y"] + this[_0x28e625(0xf0)]));
      }
    }),
    (Sprite_ThrowShadow["prototype"][_0xd9621d(0xc4)] = function () {
      const _0x29d3c0 = _0xd9621d;
      return this[_0x29d3c0(0x85)] > 0x0;
    });
})();

//== END ========================================================================
//===============================================================================
