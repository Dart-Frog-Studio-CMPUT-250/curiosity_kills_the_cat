// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"YEP_SaveEventLocations","status":true,"description":"v1.06 Enable specified maps to memorize the locations of\r\nevents when leaving and loading them upon reentering map.","parameters":{}},
{"name":"DFS_Keymap","status":true,"description":"This plugin ables new keymap: WASD and V","parameters":{}},
{"name":"HIME_CommonEventButtons","status":true,"description":"v1.1 - Allows you to execute common events with the press of a \r\nbutton on the map.","parameters":{}},
{"name":"GALV_MapProjectiles","status":true,"description":"(v.1.8) Create projectiles that can interact with the map and map characters","parameters":{"Tile Size":"48","Fade Speed":"40","Disable Mouse Move":"false","Premade 1":"1,2,3,9.5,'CBall1',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 2":"1,2,3,9.5,'VLaser2',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 3":"1,4,3,9.5,'CBall1',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 4":"1,4,3,9.5,'VLaser2',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 5":"1,6,3,9.5,'CBall1',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 6":"1,6,3,9.5,'VLaser2',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 7":"1,8,3,9.5,'CBall1',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 8":"1,8,3,9.5,'VLaser2',1,'c(10),S(11:on)|e,S(24:on)',[1],[],3,1","Premade 9":"","Premade 10":"","Premade 11":"","Premade 12":"","Premade 13":"","Premade 14":"","Premade 15":"","Premade 16":"","Premade 17":"","Premade 18":"","Premade 19":"","Premade 20":""}},
{"name":"GALV_MessageSoundEffects","status":true,"description":"Play sound effects when during Show Text event commands.","parameters":{"Delay Time":"4","Default Talk SE":"felixblip,80,120","Default Confirm SE":"Cursor2,80,150","-----------":"","Quick SE 1":"","Quick SE 2":"","Quick SE 3":"","Quick SE 4":""}},
{"name":"QJ-Bullet","status":true,"description":"QJ-Bullet[V5.5] 2021-12-21","parameters":{"======player preset======":"","playerInitBox":"R[48,48]","playerInitBoxOffsetX":"0","playerInitBoxOffsetY":"0","======event preset======":"","eventInitBox":"R[48,48]","eventInitBoxOffsetX":"0","eventInitBoxOffsetY":"0","======chaos======":"","forBidDestination":"true","showWarn":"true","maxbullet":"500","offsetGY":"false","======presets set======":"","reserveImg":"[]","preset":"[]","presetText":"[\"{\\\"name\\\":\\\"laser1\\\",\\\"content1\\\":\\\"\\\\\\\"QJ.BL.Laser({\\\\\\\\nRegions:[1],\\\\\\\\nWidth:12,ReBound:0,DeadCount:10,\\\\\\\\nMax:90,Img:\\\\\\\\\\\\\\\"WideBeam2\\\\\\\\\\\\\\\",ImgPoint:\\\\\\\\\\\\\\\"LaserCircle2\\\\\\\\\\\\\\\",\\\\\\\\ninitialRotation:\\\\\\\\\\\\\\\"P[]\\\\\\\\\\\\\\\",\\\\\\\\nx:\\\\\\\\\\\\\\\"E[0]\\\\\\\\\\\\\\\",y:\\\\\\\\\\\\\\\"E[0]\\\\\\\\\\\\\\\",\\\\\\\\nAtkWait:10,ScaleX:20,\\\\\\\\nOpacity:\\\\\\\\\\\\\\\"0|255~5/200~5/255~5/200\\\\\\\\\\\\\\\",\\\\\\\\nMaxLength:48*10,\\\\\\\\n});\\\\\\\"\\\",\\\"content2\\\":\\\"\\\",\\\"content3\\\":\\\"\\\"}\",\"{\\\"name\\\":\\\"laser2\\\",\\\"content1\\\":\\\"\\\\\\\"QJ.BL.Laser({\\\\\\\\nRegions:[1],\\\\\\\\nWidth:12,ReBound:0,DeadCount:10,\\\\\\\\nMax:45,Img:\\\\\\\\\\\\\\\"WideBeam2\\\\\\\\\\\\\\\",ImgPoint:\\\\\\\\\\\\\\\"LaserCircle2\\\\\\\\\\\\\\\",\\\\\\\\ninitialRotation:\\\\\\\\\\\\\\\"D[8]\\\\\\\\\\\\\\\",\\\\\\\\nx:\\\\\\\\\\\\\\\"E[8]\\\\\\\\\\\\\\\",y:\\\\\\\\\\\\\\\"E[8]\\\\\\\\\\\\\\\",\\\\\\\\nAtkWait:10,ScaleX:20,\\\\\\\\nOpacity:\\\\\\\\\\\\\\\"0|255~5/200~5/255~5/200\\\\\\\\\\\\\\\",\\\\\\\\nMaxLength:960,\\\\\\\\n});\\\\\\\"\\\",\\\"content2\\\":\\\"\\\",\\\"content3\\\":\\\"\\\"}\"]","======Display collision volume======":"","showBox":"false","regionShow":"[]","terrainShow":"[]","tile10Show":"#FF0000","characterShow":"#FF0000"}},
{"name":"QJ-SpawnEvent","status":true,"description":"Copy event script[V1.0]","parameters":{"preLoad":"13\r"}},
{"name":"Shaz_TileChanger","status":true,"description":"Change tiles on map or copy tiles from another map","parameters":{}},
{"name":"SRD_SuperToolsEngine","status":true,"description":"The heart of all maker-style plugins; it adds a playtesting editor that can be opened with F12.","parameters":{"Connect Editor":"true","Auto Open Window":"false","Auto Move Window":"true","Menu Editor Exempt List":"[\"Window_BattleLog\",\"Window_MapName\"]"}},
{"name":"SRD_HUDMaker","status":true,"description":"Allows developers to create their own map-based HUD through an in-game GUI window!","parameters":{"Active Updating":"true","Show During Events":"transparent","Map Global Condition":"","Battle Global Condition":"","Disable Delete Key":"true"}},
{"name":"SRD_ShakingText","status":true,"description":"Allows you to add Shaking Text to your Show Text events!","parameters":{"Reset Shaking per Box":"true","Default Shaking Power":"$.randomNum(0.2, 0.3)","Default Shaking Max":"0.5","Default Wave Power":"0.5","Default Wave Max":"2","Default Slide Power":"0.5","Default Slide Max":"4","Copy Outline":"true"}},
{"name":"ShakeScreen","status":true,"description":"Simply shakes the screen","parameters":{}},
{"name":"YEP_MessageCore","status":true,"description":"v1.19 Adds more features to the Message Window to customized\nthe way your messages appear and functions.","parameters":{"---General---":"","Default Rows":"4","Default Width":"Graphics.boxWidth","Face Indent":"Window_Base._faceWidth + 24","Fast Forward Key":"pagedown","Enable Fast Forward":"true","Word Wrapping":"false","Description Wrap":"false","Word Wrap Space":"false","Tight Wrap":"false","---Font---":"","Font Name":"GameFont","Font Name CH":"SimHei, Heiti TC, sans-serif","Font Name KR":"Dotum, AppleGothic, sans-serif","Font Size":"28","Font Size Change":"12","Font Changed Max":"96","Font Changed Min":"12","Font Outline":"4","Maintain Font":"false","---Name Box---":"","Name Box Buffer X":"-28","Name Box Buffer Y":"0","Name Box Padding":"this.standardPadding() * 4","Name Box Color":"0","Name Box Clear":"false","Name Box Added Text":"\\c[6]","Name Box Auto Close":"false"}},
{"name":"RS_MessageAlign","status":true,"description":"(v1.0.16) This plugin allows you to align the text in the message system.","parameters":{}},
{"name":"SRD_CreditsPlugin","status":true,"description":"Adds a scene to your game that allows developers to give organized credits to people.","parameters":{"Credit Data":"[\"{\\\"Name\\\":\\\"Plugins\\\",\\\"Credits\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"SumRndmDde\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"URL\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"http://sumrndm.site\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"SumRndmDde made plugins for this game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Example 1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"URL\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"https://www.google.com\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is an example.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can delete this by changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Credit Data\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" parameter.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"Name\\\":\\\"Dart Frog Studios\\\",\\\"Credits\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Nicole\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"URL\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Executive Producer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Name\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"Alex Sainsbury\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"URL\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Description\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Producer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"Name\\\":\\\"Music\\\",\\\"Credits\\\":\\\"[]\\\"}\",\"{\\\"Name\\\":\\\"Other\\\",\\\"Credits\\\":\\\"[]\\\"}\"]","Add to Title?":"true","Command Name":"Credits","Window Options":"====================================","Use Desc. Window":"true","Credit Window Width":"408","Desc. Text Size":"20","Category Rows":"1","Category Columns":"4","Text Alignment":"left"}},
{"name":"KhasCore","status":true,"description":"[2.0] Required by Khas plugins.","parameters":{}},
{"name":"KhasGraphics","status":true,"description":"[1.1] Required by Khas graphics plugins.","parameters":{}},
{"name":"KhasUltraLighting","status":true,"description":"[4.2] Adds lighting and real-time shadows to your game.","parameters":{"Custom Blending":"ON","Transfer Reset":"OFF","Auto Battle Lighting":"ON"}}
];
