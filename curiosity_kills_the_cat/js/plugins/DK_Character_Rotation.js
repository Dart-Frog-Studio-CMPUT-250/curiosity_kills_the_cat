/*
Title: Character Rotation
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.0.0
Release: 11.10.2020
First release: 11.10.2020
*/

/*ru
Название: Поворот Персонажа
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 2.0.1
Релиз: 11.10.2020
Первый релиз: 11.10.2020
*/

/*:
 * @plugindesc v.1.0.0 Allows you to rotate characters.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Character_Rotation
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.0.0
 Release: 10.10.2020
 First release: 09.10.2020

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 Use event comments to setup rotation angle
 1. <rotate: angle>
 Replace angle with rotation angle.
 Example: <rotate: 90>

 ###=========================================================================
 ## Plugin commands (RPG Maker MV)
 ###=========================================================================
 1. Rotate player/event: RotateCharacter angle character duration wait
 angle - Rotation angle. Calculated with Javascript.
 character - Character ID. 0 for Player. -1 for current event. Calculated with Javascript.
 duration - Animation duration. 0 for instant. Calculated with Javascript.
 wait - Wait for completion (true/false)
 Example: RotateCharacter 90 -1 60 true
 Example: RotateCharacter 180 $gameVariables.value(1) 0 false

 ###=========================================================================
 ## Script calls
 ###=========================================================================
 1. Rotate player: $gamePlayer.setRotation(angle, duration)
 2. Rotate event: $gameMap.event(eventId).setRotation(angle, duration)

 ###===========================================================================
 ## License and terms of use
 ###===========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 To use the plugin in commercial projects, you must be my subscriber on patreon
 https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @command RotateCharacter
 * @desc Rotate character
 *
 * @arg angle
 * @text Angle
 * @desc Rotation angle. Calculated with Javascript.
 * @default 0
 *
 * @arg character
 * @text Character
 * @desc Character ID. 0 for Player. -1 for current event. Calculated with Javascript.
 * @default -1
 *
 * @arg duration
 * @text Duration
 * @desc Animation duration. 0 for instant. Calculated with Javascript.
 * @default 0
 *
 * @arg wait
 * @text Wait
 * @desc Wait for completion
 * @type boolean
 * @default true

*/

/*:ru
 * @plugindesc v.1.0.0 Позволяет вращать персонажей.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Character_Rotation
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.0.0
 Релиз: 11.10.2020
 Первый релиз: 11.10.2020

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 Используйте комментарии события, чтобы установить угол вращения
 1. <rotate: angle>
 Замените angle на угол вращения
 Example: <rotate: 90>

 ###=========================================================================
 ## Команды плагина (RPG Maker MV)
 ###=========================================================================
 1. Вращать игрока/событие: RotateCharacter angle character duration wait
 angle - Угол вращения. Вычисляется с помощью Javascript.
 character - ID персонажа. 0 для Игрока. -1 для текущего события. Вычисляется с помощью Javascript.
 duration - Длительность анимации. 0 для мгновенной смены. Вычисляется с помощью Javascript.
 wait - Ждать выполнения (true/false)
 Пример: RotateCharacter 90 -1 60 true
 Пример: RotateCharacter 180 $gameVariables.value(1) 0 false

 ###=========================================================================
 ## Вызовы скриптов
 ###=========================================================================
 1. Вращать игрока: $gamePlayer.setRotation(angle, duration)
 2. Вращать событие: $gameMap.event(eventId).setRotation(angle, duration)

 ###===========================================================================
 ## Лицензия и правила использования плагина
 ###===========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Для использования плагина в коммерческих проектах необходимо быть моим подписчиком на патреоне
 https://www.patreon.com/dkplugins

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @command RotateCharacter
 * @desc Rotate character
 *
 * @arg angle
 * @text Угол
 * @desc Угол вращения. Вычисляется с помощью Javascript.
 * @default 0
 *
 * @arg character
 * @text Персонаж
 * @desc ID персонажа. 0 для Игрока. -1 для текущего события. Вычисляется с помощью Javascript.
 * @default -1
 *
 * @arg duration
 * @text Duration
 * @desc Длительность анимации. 0 для мгновенной смены. Вычисляется с помощью Javascript.
 * @default 0
 *
 * @arg wait
 * @text Ожидание
 * @desc Ждать выполнения
 * @type boolean
 * @default true

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Character_Rotation'] = '1.0.0';

//===========================================================================
// initialize plugin commands
//===========================================================================

const CharacterRotation_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    CharacterRotation_Game_Interpreter_pluginCommand.apply(this, arguments);

    switch (command) {
        case 'RotateCharacter': {
            const angle = eval(args[0]);
            const duration = eval(args[2]);
            const wait = args[3] === 'true';
            let characterId = eval(args[1]);

            if (characterId === -1) {
                characterId = this.eventId();
            }

            const character = characterId === 0 ?
                $gamePlayer : $gameMap.event(characterId);

            character.setRotation(angle, duration);

            if (wait && duration > 0) {
                this.wait(duration);
            } else {
                const sprite = SceneManager._scene._spriteset._characterSprites.find(
                    sprite => sprite._character === character);

                sprite && sprite.updateRotation();
            }
            break;
        }
    }
};

if (Utils.RPGMAKER_NAME === 'MZ') {

    PluginManager.registerCommand('DK_Character_Rotation', 'RotateCharacter', function(args) {
        const angle = eval(args.angle);
        const duration = eval(args.duration);
        const wait = args.wait === 'true';
        let characterId = eval(args.character);

        if (characterId === -1) {
            characterId = this.eventId();
        }

        const character = characterId === 0 ?
            $gamePlayer : $gameMap.event(characterId);

        character.setRotation(angle, duration);

        if (wait && duration > 0) {
            this.wait(duration);
        } else {
            const sprite = SceneManager._scene._spriteset._characterSprites.find(
                sprite => sprite._character === character);

            sprite && sprite.updateRotation();
        }
    });

}

//===========================================================================
// Game_Character
//===========================================================================

Game_Character.prototype.setRotation = function(angle, duration = 0) {
    this._rotation = { angle, duration };
};

Game_Character.prototype.rotation = function() {
    return this._rotation;
};

Game_Character.prototype.isRotating = function() {
    return !!this._rotation && this._rotation.duration > 0;
};

//===========================================================================
// Game_Event
//===========================================================================

const CharacterRotation_Game_Event_setupPageSettings =
    Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    CharacterRotation_Game_Event_setupPageSettings.apply(this, arguments);

    const comment = this.getComments().find(
        comment => /<rotate:\s*(\d+)>/.exec(comment));

    if (comment) {
        this.setRotation(Number(RegExp.$1), 0);
    }
};

Game_Event.prototype.getComments = function() {
    const page = this.page();
    const list = (page ? page.list : null);

    return (list ? list.reduce((comments, command) => {
        if (command.code === 108 || command.code === 408) {
            comments.push(command.parameters[0]);
        }

        return comments;
    }, []) : []);
};

//===========================================================================
// Sprite_Character
//===========================================================================

const CharacterRotation_Sprite_Character_update =
    Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    CharacterRotation_Sprite_Character_update.apply(this, arguments);
    this.updateRotation();
};

Sprite_Character.prototype.updateRotation = function() {
    const rotation = this._character.rotation();

    if (!rotation) {
        return;
    }

    if (rotation.duration > 0) {
        let rotationSpeed = rotation.rotationSpeed;

        if (rotationSpeed === undefined) {
            rotationSpeed = (this.rotation - rotation.angle * Math.PI / 180) / rotation.duration;
            rotation.rotationSpeed = rotationSpeed;
        }

        this.rotation -= rotationSpeed;

        rotation.duration--;
    } else if (rotation.duration === 0) {
        this.rotation = rotation.angle * Math.PI / 180;

        delete rotation.duration;
        delete rotation.rotationSpeed;
    }
};
