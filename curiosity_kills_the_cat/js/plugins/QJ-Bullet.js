//=============================================================================
// RPG Maker MV
//=============================================================================
/*:
 * @plugindesc QJ-Bullet[V5.5] 2021-12-21
 * @author Qiu Jiu
 * 
 *
 * @help
 * ================================================================
 * I`m sorry that my English is very poor,so some sentences may not be very fluent.
 * ================================================================
 * 一.Plugin Notice  (projectiles/bullets)
 * ================================================================
 * 1.This plugin has a complete damage determination system, which can be used as the core plugin for 
 *   determining damage in ARPG/STG game or as the extension of other ABS plugins.
 *   And the plugin`s function of the particle and residual shadow effects can also be used to make 
 *   special effects.
 * 2.You need to place bullet image in "img/bullets" folder.
 * 3.The way of reducing calculation capacity is below:
 *   Set the 'CollisionBox' to circular instead of rectangular.
 *   Reduce the number of bullets that exist simultaneously in the same period of time.
 * 4.The system take some time to load the image.so if the projectile image is used for the first time,
 *   the appearance of bullet will be delayed for some time.
 *   You can just add the needed file`s name in the preload field,and the system will preload it automatically.
 * 5.The plugin is sold on itch.io.And you can get a preview version on itch.io.
 *   https://qiujiu.itch.io/qj-bullet-plugin
 *   If you want use it for uncommercial use ,you can contact me on discord.
 *   https://discord.gg/2Hyg8Vb7Jv
 *   It is not free for commercial use.
 * 6.The attribute name with * below can use special fade effects.
 *   Use ~ to separate the different change.
 *   The format of a change point is 'duration|target value' or 'duration/fade target value'.
 *   And the first change point is the initial value of the attribute.
 *   e.g:
 *       0|5~30|20~20/30:the initial value is 5, then it becomes 20 after 20 frames,finally it becomes 
 *       30 in 30 frames gradually(because of using /).
 *   The fade target value may also be color as #00FF00.
 *   You should use angle and system can convert it to radians automatically.
 *   The value changes will cycle.
 * 7.The content of DeadQT/MoveQT/UpdateQT or DeadJS/MoveJS/UpdateJS can contain below phrase:
 *   this.screenShowX()   refer to the x coordinate of bullet.
 *   this.screenShowY()   refer to the y coordinate of bullet.
 *   this.showRotation()   refer to the rotation of bullet image.
 *   this.showRotationMove()   refer to the rotation of bullet`s move.
 *   this.screenShowXLast(num)   refer to the 'num' from last X coordinate of the bullet.
 *   this.screenShowYLast(num)   refer to the 'num' from last Y coordinate of the bullet.
 *   You can use the above phrase in DeadQT/MoveQT/UpdateQT to make a new bullet in the old bullet`s
 *   position.
 * 8.You can write notes <Group:"group id"> in event`s page`s first order.
 *   Then those events can be added to a group.
 *   If the page change,the group of event may change base on new page`s first order.
 * 8.You can write notes <Group:"group id"> in event`s page`s first order.
 *   Then those events can be added to a group.
 *   If the page change,the group of event may change base on new page`s first order.
 * ================================================================
 * 二.Plugin Help
 * ================================================================
 * 1.Base way to shoot a bullet:
 *   every attribute has a default value.
 *
 *   QJ.BL.Shoot({
 *    attribute:value,
 *    attribute:value,
 *    attribute:value
 *   });
 *
 *   e.g:change the value of Aciotn and Anim.
 *
 *   QJ.BL.Shoot({
 *    Action:["SS[A,true]"],
 *    Anim:1
 *   });
 * ===============================================
 * The content of attribute:
 * ===============================================
 *      initialRotation:The default is "PD[]".The initial rotation of bullet.
 *          0-360 degree.0 refers to up,90 refers to right,180 refers to down,270 refers to left.
 *          You can also use:(the phrase such as "M[]+5","P[]-10/2" and "D[0]+5*5" is OK.)
 *          "M[]":Aim at the direction of mouse from (x,y) below.
 *          "PD[]":Same as the direction of player.
 *          "D[number]":Same as the direction of event.
 *          "P[]":Aim at the direction of player from (x,y) below.
 *          "E[event id]":Aim at the direction of event from (x,y) below.
 *          "EV[variable id]":Aim at the direction of event from (x,y) below.The event`s id is the value of variable.
 *          "X[xValue]Y[yValue]":Aim at (xValue,yValue) from (x,y) below. e.g:"X[100]Y[100]".
 *          "XM[variable1 id]YM[variable2 id]"Aim at (xValue,yValue) from (x,y) below.The xValue/yValue is 
 *              the value of variable1/variable2.
 *          "G[group id]":Aim at the nearest event from (x,y) below in the group.
 * ===============================================
 *      x/y:The default is"P[]"The initial x/y coordinate.
 *          "M[]":refer to x/y coordinate of mouse.
 *          "P[]":refer to x/y coordinate of player.
 *          "E[event id]":refer to x/y coordinate of event.0 refers to this event.
 *          "B[index]":refer to x/y coordinate of bullet.Every bullet has their own index.
 *              This phrase is used in DeadQT/MoveQT/UpdateQT/DeadJS/MoveJS/UpdateJS.
 *              Use this.index to get the old bullet`s x/y.
 *              Standard text is "B["+this.index+"]".
 *          Special phrase:
 *          "G[group id,orginX,orginY,MaxRange,num]":
 *              refer to the num(1st,2nd,3rd......) nearest event from (orginX,orginY) in the range of 'MaxRange' pixels
 *              in the special group.
 *              orginX/orginY can be M[]/P[]/E[event id].(can`t nest)
 *          "GR[group id]":refer to the random event in the special group.
 *          "GRR[group id,orginX,orginY,MaxRange]":
 *              refer to the random event from (orginX,orginY) in the range of 'MaxRange' pixels in the special group.
 *          !!!G,GR and GRR are opposed to each other!!!
 * ===============================================
 *      z:The default is"C[]".The z value of bullet.
 *           "T[]":The bullet image will show below map,player,event and picture.
 *           "M[]":The bullet image will show below player,event and picture above map.
 *           "C[]":The bullet image will show below picture above map,player and event.
 *           "P[]":The bullet image will show above map,player,event and picture.
 * ===============================================
 *      scaleX*:The default is 100.(%)
 * ===============================================
 *      scaleY*:The default is 100.(%)
 * ===============================================
 *      MoveType:The default is "S[]".The move type of bullet.
 *           mR = min Rotation angle per frame.
 *           "S[]":move Straight.
 *           "TP[mR]":trace Player.
 *           "TE[mR,event id]":trace event.
 *           "TEV[mR,variable id]":trace event whose id is variable.
 *           "TG[mR,group id]":trace the nearest event in group.
 *           "QP[min width,angle,min time,bounce times]":Quadratic parabola.
 *                  min width/min time:width/time of the last bounce.
 *                  Prefer to use function 'QJ.BL.Shooter_HandGrenade' directly.
 *           "B[character,
 *                  offset x down,offset y down,
 *                  offset x left,offset x left,
 *                  offset x right,offset x right,
 *                  offset x up,offset x up]":
 *                  The bullet will stick to the bullet.
 *                  character:-1 refer to player.the number greater than 0 refer to event.
 *                  default value is "B[-1,0,0,0,0,0,0,0,0]".
 *           "F[content]":use function to define the trail of bullet.
 *                  read 'the moveType of Particles' for more detail explain.
 *                  !The value ReBound,speed and so on of bullet will be uinvalid if you use this.
 * ===============================================
 *      rTRotation:The default is "".Special angle increase.
 *          You can write a similar format to specify the angle of mutation at a certain time:
 *          "10|30~50|15~100|-20"
 *          It rotates 30 degrees clockwise at frame 10, 15 degrees clockwise at frame 50, and 20 
 *          degrees counterclockwise at frame 100.
 *          This is defferent from 'Plugin Notice 6'.
 * ===============================================
 *      Regions:The default is [].List of regions where bullets disappear.
 *              e.g: [1,5]
 * ===============================================
 *      Terrains:The default is [].List of terrains where bullets disappear.
 * ===============================================
 *      Target:The default is [].List of character that bullets can collied with.
 *          "E[event id]":collied with event.
 *          "G[group id]":collied with event in group.
 *          "EV[variable]":collied with event whose id is variable.
 *          "P[]":collied with player.
 * ===============================================
 *      Pierce:The default is 0.The pierce times of bullet.
 *          Bullet can only pierce through event/player,can`t pierce through designated regions and terrains.
 * ===============================================
 *      Img:The default is"bullet0".The image name of bullet.
 *          The name can have parenthesis that contains frames and speed.
 *          "imageName[frames,speed]"
 *          e.g:   "flash1[4,5]"
 *          
 *          Use character`s image as the image of bullet.
 *          [0,character]
 *          character:-1 refer to player.the number greater than 0 refer to event.
 *
 *          Use text as the image of bullet.
 *          [1,text,text color,text size,text arrangement,max width,max height,text stroke color,text stroke size]
 *          text color/text stroke color:    e.g:#00FF00
 *          text arrangement:0 refer to Horizontal row,1 refer to Vertical row.
 *
 *          Use icon as the image of bullet.
 *          [2,icon id]
 * ===============================================
 *      Anim:The default is 0.the animation that bullet plays when it disappear.
 * ===============================================
 *      DeadCount:The default is 0.the fade time when it disappear.
 * ===============================================
 *      Speed*:The default is 12.the pixel the bullet moves per frame.
 * ===============================================
 *      Max:The default is 120(2 seconds).The max time bullet exists or the condition that bullet disappears.
 *          -1:The bullet exists forever unless using QJ.BL.setBulletDisappear(Name);/QJ.BL.deleteBullet(Name);
 *             The Name refer the attribute 'Name'.
 *          "S[id,true/false]":The bullet disappears when the switch is true/false.
 *          "SS[EventId,A/B/C/D,true/false]":The bullet disappears when the self switch A/B/C/D is true/false.
 *          "T[content]":Execute the content and obtain the result as a Boolean value.
 *              When the result is true, the bullet disappears.
 * ===============================================
 *      RotationAuto:The default is-1.
 *          -1:No effect.
 *          0-360:Fixed angle.
 *          361-1080:"The angle of move" is different with "the angle of the image".
 *              And this number minus 720 represents the rotation speed.
 *              (minus 720 can be negative counterclockwise, minus 720 can be positive clockwise)
 *              And the unit is degrees/frame.
 * ===============================================
 *      Action:The default is [].The action that bullet executes for Target.
 *          "C[commonEvent id]":start commonEvent.
 *          "S[id,true/false]":open/close switch.
 *          "SS[id,true/false]":open/close self switch.
 *          "E[]":erase event.
 *          "C[commonEvent id,value1,value2......]":start commonEvent and pass in parameters.
 *              (1) You can get the parameters in commonEvent. e.g:  this.BP[1] refer to value1.
 *              (2) You can use this.EID to get the Target character id.
 *                  -1 refer to player.the number greater than 0 refer to event.
 *              (3) Use this.bullet.x/this.bullet.y to get the x/y of bullet when it diasppears.
 *          "CP[page id]":call the page of event.
 *          "T[content]":execute content.
 * ===============================================
 *      CollisionBox:The default is "R[4,4]".Shape of the bullet`s Collider.
 *          "C[radius]":circle.
 *              The value AnchorX,AnchorY and scaleY of bullet will be uinvalid if you use this.
 *              scaleX will refer to the scale of whole circle.
 *              But the bullet can rebound if you use this.
 *          "R[width,height]":Rectangle.
 *              The value ReBound of bullet will be uinvalid if you use this.
 * ===============================================
 *      Tone:The default is [0,0,0,0].
 *          [red,green,blue,gray].
 * ===============================================
 *      Opacity*:0~255.
 * ===============================================
 *      AfterImage:The default is [](don`t show afterImage).
 *          (afterImage may mean drag effect.my English is so poor.)
 *          [color,initial opacity,max time,width]  e.g: ["#FF0000",150,10,0]
 *          color:color can be gradient value same as 'Plugin Notice 6'.
 *              e.g:
 *              ["0|#0000FF~10/#00FF00~10/#FF0000~10/#0000FF",150,10,0]
 *              The initial color of the afterImage is blue(#0000ff),then gradually turns green (#00ff00)
 *              within 10 frames, and then gradually turns red(#ff0000) within 10 frames,then gradually 
 *              change back to blue (#0000ff) within 10 frames, and then cycle.
 *          width:the width of afterImage.
 *              if the width is 0,the width of afterImage will be calculated automatically.
 * ===============================================
 *      Particles:The default is [](don`t use particles effect).Show particle effects near bullets.
 *          This may be complex.
 *          default value of a emitter which emits particles:
 *             {img:null,
 *              offsetX:0,
 *              offsetY:0,
 *              dir:Math.PI,
 *              dirOffset:Math.PI/6,
 *              max:30,
 *              deadCount:60,
 *              opacityMin:0.5,
 *              opacityMax:1,
 *              scaleMin:0.5,
 *              scaleMax:1.5,
 *              moveType:"-8*t;0",
 *              wait:2,
 *              num:1}
 *          img:the iamge of a particle.
 *          offsetX:The offset x of the particle emission point from the center of the bullet.
 *          offsetY:The offset y of the particle emission point from the center of the bullet
 *          dir:emitting direction, which is the direction relative to the bullet direction.
 *              Note that the unit here is radian rather than angle.
 *          dirOffset:The maximum offset range of the emission direction. If 0 is written, it 
 *              will be no offset. Note that the unit here is radian rather than angle.
 *          speed:-
 *          max:-
 *          deadCount:-
 *          opacityMin:Initial min opacity.Note that the range here is 0-1 instead of 0-255
 *          opacityMax:Initial max opacity.Note that the range here is 0-1 instead of 0-255
 *          scaleMin:Min scale.Note that the range here is 0-1 instead of 0-100.
 *          scaleMax:Max scale.Note that the range here is 0-1 instead of 0-100.
 *          moveType:Moving Type, here write the parameter function that crosses the zero point and is 
 *              continuous within the moving range (otherwise the effect will be strange or invalid).
 *
 *              The default is "-8*t;0".
 *              The symbol ; divides X and Y.the direction the particle faces is the positive half axis of the 
 *              X axis, and this axis rotates clockwise if the system is established by turning 90 degrees to 
 *              the y-axis, when the particle survives t frame, the relative coordinates of the particle are 
 *              (-8*t,0),the particle will retreat at a uniform speed.
 *
 *              If you want to make complex effects, please contact me.
 *
 *              Possible values:
 *              "-8*t;0":move straight.8 is speed. 
 *              "-8*t;24*Math.sin(t/3)":sinusoidal jitter.(24 and 3 can be changed).
 *              "t/2*Math.cos(t/2);t/2*Math.sin(t/2)":spiral motion.(2 can be changed).
 *
 *              For better results, polar equation is also supported here.When polar equation is used,
 *              | segmentation is applied to separate ρ and θ.
 *              ρ=sin(θ)   =>       "Math.sin(t)|t"        t represents time which always changes.("ρ(t)|θ(t)")
 *              "-8*t|0":move straight.8 is speed. 
 *              "144*Math.sin(3*t/180)|t/180":three roses line.
 *          wait:Interval time between two emitted particles.
 *          num:Number of particles emitted at a time.
 * ===============================================
 *      AtkRange:The default is 0.Atk range.
 *          If 0 is written here, the bullet will execute an action for Target chatracter after it collieds 
 *              with Target,and then disappear.
 *          If the region or terrain is written here, or the maximum duration is reached, it will disappear 
 *              directly.(if 'ReBound' is not true)
 *          If a number greater than 0 is written here, the bullet will not perform an action for Target chatracter 
 *              when it collied with Target directly.It will create a temporary circular collision body centered 
 *              on the disappearance position of the bullet. The number here represents the radius of the circle,
 *              and then perform actions for all Target chatracter in this circle.
 * ===============================================
 *      WaitBaseOnSpeed:The default is -2.
 *          -2:no effect.
 *          -1:The bullet cannot perform an action for Target chatracter.
 *              You can set AtkRange a number greater than 0 and set DeadAction/NoCollisionAction true
 *              to perform AOE damage.
 *          0:When the speed of the bullet is 0, it can attack the enemy or hit the wall.This function is 
 *              mainly used to trigger the test mine when the mine is thrown (mine gun) or placed (at this 
 *              time, the bullet speed as a mine is not 0) it cannot attack the enemy. It can attack the 
 *              Target chatracter only when it is placed (no longer moving, speed is 0).
 *          Integer greater than 0: the bullet can attack the enemy only when the bullet speed is this value
 * ===============================================
 *      DeadAction:The default is false.
 *          whether the bullet performs action when it collieds with regions or terrains.
 * ===============================================
 *      PierceAction:The default is false.
 *          whether the bullet performs action when it pierce through Target character.
 * ===============================================
 *      NoCollisionAction:The default is false.
 *          whether the bullet performs action when the attribute 'Max' is reached.
 * ===============================================
 *      DeadAnim:The default is true.
 *          whether the bullet plays animation when it collieds with regions or terrains.
 * ===============================================
 *      PierceAnim:The default is false.子弹进行穿透时,是否显示动画.
 *          whether the bullet plays animation when it pierce through Target character.
 * ===============================================
 *      NoCollisionAnim:The default is false.
 *          whether the bullet plays animation when the attribute 'Max' is reached.
 * ===============================================
 *      ReBound:The default is 0.
 *          The ReBound times of bullet.
 *          Only when 'CollisionBox' is circle,the bullet can rebound.  
 * ===============================================
 *      AnchorX:The default is 0.5.   (0-1)
 * ===============================================
 *      AnchorY:The default is 0.   (0-1)
 * ===============================================
 *      LMD:The default is true(Leave Map Disappear).
 *          If this attribute is true, the bullet will disappear directly when it leave the map(not screen).
 * ===============================================
 *      Bit:The default is false.
 *          When this switch is turned on, the bullet will not collied with anything.
 * ===============================================
 *      UpdateJS:The default is "".(string)
 *          eval will be executed for this string every frame when the bullet runs.
 * ===============================================
 *      MoveJS:The default is [].Specifies that after the bullet moves to a few frames, it starts 
 *          to execute a script every few frames.
 *          Base format:
 *          [wait time before circling,waiting interval,script]
 *          wait time before circling:greater than 0.
 *          waiting interval:greater than 0.
 *          script:string.
 *          e.g:     [[60,5,"console.log(this.speed)"],[0,5,"console.log(this.x)"]]
 *          After the bullet runs for 60 frames, output the bullet speed to the console once, and then 
 *          output the bullet speed to the console every 5 frames when the bullet starts running, the 
 *          X coordinate of the bullet is output to the console once, and then the X coordinate of the 
 *          bullet is output to the console every 5 frames.
 *          The rest are the same as UpdateJS.
 * ===============================================
 *      DeadJS:The default is "".string.an additional script that must be executed before the action 
 *          is executed when the bullet disappears.
 *          The rest are the same as UpdateJS.
 * ===============================================
 *      UpdateQT:The default is "".string.
 *           Each frame when the bullet runs will execute the instruction of 
 *           'preset text id'.
 * ===============================================
 *      MoveQT:The default is [].Specifies that after the bullet moves to a few frames, it starts 
 *          to execute the instruction of 'preset text id' every few frames.
 *          Base format:
 *          [wait time before circling,waiting interval,preset text id]
 *          e.g:     [[10,5,"test1"]]
 *          After the bullet runs for 10 frames, execute the instruction of 'preset text id' test1 
 *          once, and then execute the instruction of 'preset text id' test1 every 5 frames
 * ===============================================
 *      DeadQT:The default is "".string.the instruction of 'preset text id'must be executed before 
 *          the action is executed when the bullet disappears.
 * ===============================================
 *      Name:Assign a special number to the bullet.
 *          You can use QJ.BL.deleteBullet(Name); to directly delete the bullet with the specified 
 *          number without executing action and playing animation.
 *          Or use QJ.BL.setBulletDisappear(Name); make the bullet disappear normally as the attribute
 *          'Max' is reached.
 * ================================================================
 * 2.Based on the direction of the player or an event, the launch point is finely set to launch a 
 *   certain number of bullets within a certain angle range
 *   QJ.BL.Shooter_CharacterAtk(character,{},[ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8],[r1,r2,num,l]);
 *   QJ.BL.Shooter_CharacterAtk(character,{},[ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8]);
 *   QJ.BL.Shooter_ArcRange(initialRotation,{},[r1,r2,num,l])
 *
 *   character:-1 refer to player.the number greater than 0 refer to event.
 *
 *   [ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8]
 *
 *   [r1,r2,num,l]:
 *   r1/r2 are the additional angles,r1 is the additional starting angle,and r2 is the additional ending angle.
 *   num is the number of bullets fired in this range.l is the angular fluctuation number.
 *   Bullets are generally evenly distributed in a certain range. When l is equal to 0, there is no effect, and 
 *   when l is greater than 0 ,it will cause the angle to fluctuate within l degrees.
 *
 * ================================================================
 * 3.Call preset:
 *   Directly call the instruction of the 'text preset' in the plugin parameters, and then modify it in {}.
 *   QJ.BL.Quick(preser id,{})
 * ================================================================
 * 4.Execute the instructions in the page of an event in the current map.
 *   QJ.BL.CallEvent(event id,page id)
 * ================================================================
 * 5.Clear all bullets:
 *   QJ.BL.ClearAll()
 * ================================================================
 * 6.Turn mouse / finger click movement on or off.
 *   If clicking can make the player move and fire bullets at the same time, it will make the situation...
 *   Very strange
 *   QJ.BL.SetMove(true)
 *   QJ.BL.SetMove(false)
 * ================================================================
 * 7.Construct an Collider at the specified place and execute action on the target collided with this collider.
 *  The collision body disappears directly after one detection. It is equivalent to a flashing bullet.
 *
 *   QJ.BL.DirectAction(X,Y,CollisionBox,Action,Target);
 * ================================================================
 * 8.Get the number of bullets at this time.
 *
 *   $gameMap.bulletsNumber()
 * ================================================================
 * 9.the afterimage of character.
 *
 *   QJ.BL.Shadow(id,{})
 *
 *   id:-1 refer to player.the number greater than 0 refer to event.
 * ================================================================
 * 10.Throw missiles centered on the player character
 *
 * QJ.BL.Shooter_HandGrenade({},oneLength,oneTime,maxReBound);
 * (moveType is "QP[min width,angle,min time,bounce times]")
 * (AtkRange is greater than 0.)
 * (It's best not to modify Speed/MoveType.)
 *
 *
 *  oneLength:min bounce distance
 *  oneTime:min bounce time
 *  maxReBound:bounce times
 *  
 * default:
 *
 * QJ.BL.Shooter_HandGrenade({Img:"xzd"},56,30,3);
 *
 *
 * ================================================================
 * 11.Add a text bullet with characters or events as the center and text always facing down.
 * QJ.BL.Text(text,color,fontsize,linecolor,linewidth,character,{});
 * text:-
 * color:-
 * fontsize:-
 * linecolor:-
 * linewidth:-
 * character:-1 refer to player.the number greater than 0 refer to event.
 *
 * (It's best not to modify x/y/initialRotation.)
 *
 * ================================================================
 * 12.Multiple bullets are fired in one direction. Multiple bullets are arranged in 
 * a circle near the firing point and fired in one direction as a whole.
 *
 * QJ.BL.Shooter_C({},r,speed,roSpeed,number,initRotation,x,y) 
 * {}:
 * r:radius.
 * speed:The speed at which all bullets move as a whole.
 * roSpeed:The (angular) speed at which each bullet rotates along a circle as it moves.(0.05-1 is fine.)
 * number:-
 * initRotation:The direction in which all bullets move as a whole.
 * x/y:(can`t use G/GR/GRR)
 *
 * Default:
 * QJ.BL.Shooter_C({Img:"dart"},48,4,0.25,8,"M[]","P[]","P[]") 
 *
 * ================================================================
 * 13.Multiple bullets are fired in one direction. Multiple bullets are arranged as regular polygons 
 * near the firing point and fired in one direction as a whole
 *
 * QJ.BL.Shooter_P({},r,speed,roSpeed,number,initRotation,x,y,edgeNum) 
 * {}:
 * r:The radius of a regular polygon (the line between the center of the polygon and any vertex on the polygon).
 * speed:The speed at which all bullets move as a whole.
 * roSpeed:The (angular) speed at which each bullet rotates along a circle as it moves.(0.05-1 is fine.)
 * number:The number of bullets (including vertices) on each edge of the polygon. This value should be greater
 *      than or equal to 2, and it should be written as an odd number as far as possible. The effect of writing
 *      an even number may be poor
 * initRotation:The direction in which all bullets move as a whole.
 * x/y:(can`t use G/GR/GRR)
 * edgeNum:The number of sides of the polygon. Note that the number of sides should be a positive integer 
 *      greater than or equal to 2
 *
 * e.g:
 * Regular triangle:QJ.BL.Shooter_P({Img:"dart"},48,4,0.25,3,"M[]","P[]","P[]",3) 
 * Square:QJ.BL.Shooter_P({Img:"dart"},48,4,0.25,3,"M[]","P[]","P[]",4) 
 * Regular pentagon:QJ.BL.Shooter_P({Img:"dart"},48,4,0.25,3,"M[]","P[]","P[]",5) 
 *
 * ================================================================
 * 14.Shoot a laser in one direction. The laser will bounce back and cause damage to the Target.
 *
 * QJ.BL.Laser({ })
 *
 * name:The same as the 'Name' of QJ.BL.Shoot({}).
 * initialRotation:The default is "M[]".
 * RotationAuto:The default is -1.
 *          -1:change initialRotation automatically.
 *          0:don`t change.
 *          1-719:After subtracting 360, it is a fixed rotation speed. For example, when writing 360, 
 *              it does not rotate. When writing 361, it rotates 1 degree per frame, and when writing 359, 
 *              it rotates - 1 degree per frame
 * x/y:The default "P[]".
 *     "M[]"
 *     "P[]"
 *     "E[event id]"
 *     (can`t use G/GR/GRR)
 * z:The default "C[]".
 * Action:The default [].
 * Regions:The default [].
 * Terrains:The default [].
 * Target:The default [].
 * Img:The default "laser1".
 * ImgPoint:The default "laser1Point".The corner image of laser.
 * DeadCount:The default 10.
 * Opacity*:The default 255.
 * Width*:The default 12.
 * AtkWait:The default 30.
 * ReBound:The default 10.
 * Max:The default 120.
 * ScaleX*:-
 * MaxLength*:The default is 960.The max length of laser.(px)
 * 
 * QJ.BL.deleteLaser(name);
 * To eliminate the laser bound to an event / player.
 *
 * ================================================================
 * 15.Launch items around. Players can get this item after touching it
 *
 * QJ.BL.Shooter_Gain({},type,id,num)
 *
 * type:The type of item.
 *      0 refers to item.
 *      1 refers to weapon.
 *      2 refers to armor.
 *      3 refers to gold.
 * id:when type is 0/1/2,this should be the id of item/weapon/armor.
 *    the image of bullet will be the icon automatically.
 *    when type is 3,this should be the icon index of gold.
 * num:-
 *
 * e.g:
 * QJ.BL.Shooter_Gain({},0,2,5) gain 5 item whose id is 2
 * QJ.BL.Shooter_Gain({},1,6,6) gain 6 weapon whose id is 6
 * QJ.BL.Shooter_Gain({},2,7,2) gain 2 item whose id is 7
 * QJ.BL.Shooter_Gain({},3,5,100) gain 100 gold
 *
 * ================================================================
 * 16.Take two points as anchor points, display a picture between the two tracing points, 
 *  and then determine the attack between the two points
 * QJ.BL.TwoPoint(x1,y1,x2,y2,{});
 * x1,y1,x2,y2:x1/y1 is start point,x2/y2 is end point.
 * Possible values in {} :
 * name:The default "".
 * Img:-
 * Max:The default 120.
 * DeadCount:-
 * Opacity*:-
 * ScaleX*:-
 * Action:The default [].
 * Target:The default [].
 * Width*:The default 24.
 * AtkWait:The default 30.
 * ExtraRotation:Additional rotation angle added on the basis of judgment, with (x1, Y1) as the rotation center.
 *
 * QJ.BL.deleteTwoPoint(name);
 * 
 * ================================================================
 * 17.Make the event / player continue to produce residual shadows.
 *      QJ.BL.addShadow(character,{},time,delta)
 * time:Duration Time of shadow generation.The default 60.
 *      "S[id,true/false]"
 *      "SS[A/B/C/D,true/false]"
 *      "T[content]"
 * delta:Waiting time between two aftereffects.The default 1.
 * ================================================================
 * 18.Directly execute the instructions in 'text preset'.
 *      QJ.BL.quickOrder(id)
 * If the barrage firing commands of many events are the same, it will be very troublesome to change 
 * them one by one. At this time, the command can be used for direct unified control
 * ================================================================
 * 19.Fire bullets of random size at a certain angle.
 *      QJ.BL.Shooter_FlameThrower({},minScale,maxScale,offsetDir,num)
 * {}:
 * minScale/maxScale:Max and min magnification of bullet.
 * offsetDir:The max offset of the bullet along the initial angle of initialrotation specified in {}. 
 *      For example, if initialrotation is written as 90 and offsetdir is written as 10,The bullet will 
 *      be fired randomly within 80-100 degrees
 * num:Number of bullets fired at one time.
 * ================================================================
 * 三.You can write contents below in the notes on the first line of the event page.
 * ================================================================
 * 1.<BoxType:data> data is the same as 'CollisionBox'.
 * ================================================================
 * 2.<BoxOffset:x,y> change the x/y of event`s collider.
 * ================================================================
 * 3.<Group:"group id"> Then those events can be added to a group.
 * ================================================================
 * 四:Additional script instructions.
 * ================================================================
 * 1.Modify event default collision volume and offset:
 *      QJ.BL.setDefaultEventBox(CollisionBox,OffsetX,OffsetY)
 * ================================================================
 * 2.Modify the player's default collision volume and offset:
 *      QJ.BL.setPlayerBox(CollisionBox,OffsetX,OffsetY)
 * ================================================================
 *
 *
 *
 *
 * @param ======player preset======
 * @default
 *
 * @param playerInitBox
 * @type text
 * @text player preset collision box
 * @desc prefer to write C[24] R[48,48]
 * @default R[48,48]
 * @parent ======player preset======
 *
 * @param playerInitBoxOffsetX
 * @type text
 * @text player preset Offset X
 * @desc 0
 * @default 0
 * @parent ======player preset======
 *
 * @param playerInitBoxOffsetY
 * @type text
 * @text player preset Offset Y
 * @desc 0
 * @default 0
 * @parent ======player preset======
 *
 * @param ======event preset======
 * @default
 *
 * @param eventInitBox
 * @type text
 * @text event preset collision box
 * @desc prefer to write C[24] R[48,48]
 * @default R[48,48]
 * @parent ======event preset======
 *
 * @param eventInitBoxOffsetX
 * @type text
 * @text event preset Offset X
 * @desc 0
 * @default 0
 * @parent ======event preset======
 *
 * @param eventInitBoxOffsetY
 * @type text
 * @text event preset Offset Y
 * @desc 0
 * @default 0
 * @parent ======event preset======
 *
 * @param ======chaos======
 * @default
 *
 * @param forBidDestination
 * @type boolean
 * @text Cancel click Move
 * @desc Cancel click Move
 * @default true
 * @parent ======chaos======
 *
 * @param showWarn
 * @type boolean
 * @text Display warning message
 * @desc Display warning message
 * @default true
 * @parent ======chaos======
 *
 * @param maxbullet
 * @type number
 * @min 1
 * @text max number of bullet
 * @desc 
 * @default 500
 * @parent ======chaos======
 *
 * @param offsetGY
 * @type boolean
 * @text Automatic floating
 * @desc Automatic floating 6 pixels of walking map
 * @default false
 * @parent ======chaos======
 *
 * @param ======presets set======
 * @default
 *
 * @param reserveImg
 * @type []
 * @text Preload bullet name
 * @desc Preload bullet name，Multiple of the same type can be separated by |.
 * @default []
 * @parent ======presets set======
 *
 * @param preset
 * @type struct<persetdata>[]
 * @text Preset instruction
 * @desc QJ.BL.Quick(id,{}) can be used to call directly
 * @default []
 * @parent ======presets set======
 *
 * @param presetText
 * @type struct<persetdataType>[]
 * @text Text Preset
 * @desc use in UpdateQT/MoveQT/DeadQT.
 * @default []
 * @parent ======presets set======
 *
 * @param ======Display collision volume======
 * @default
 *
 * @param showBox
 * @type boolean
 * @text Display collision volume
 * @desc Display collision volume
 * @default false
 * @parent ======Display collision volume======
 *
 * @param regionShow
 * @type []
 * @text the list of showing region box
 * @desc The format is regionId|color (for example 1|#FF0000)
 * @default []
 * @parent ======Display collision volume======
 *
 * @param terrainShow
 * @type []
 * @text the list of showing terrain box
 * @desc The format is regionId|color (for example 1|#FF0000)
 * @default []
 * @parent ======Display collision volume======
 *
 * @param tile10Show
 * @type text
 * @text can`t pass color
 * @desc the color of the grid that can`t pass
 * @default #FF0000
 * @parent ======Display collision volume======
 *
 * @param characterShow
 * @type text
 * @text player` box color
 * @desc player` box color
 * @default #FF0000
 * @parent ======Display collision volume======
 *
 *
*/
/*~struct~persetdataType:
 *
 * @param name
 * @type text
 * @text id
 * @desc The id of this preset
 * @default 1
 *
 * @param content1
 * @type note
 * @text content1
 * @desc content1
 * @default 
 *
 * @param content2
 * @type note
 * @text content2
 * @desc content2
 * @default 
 *
 * @param content3
 * @type note
 * @text content3
 * @desc content3
 * @default 
 *
*/
/*~struct~persetdata:
 *
 * @param name
 * @type text
 * @text id
 * @desc The id of this preset
 * @default 1
 *
 * @param initialRotation
 * @type combo
 * @text initial Rotation
 * @desc initial Rotation
 * @default PD[]
 * @option PD[]
 * @option M[]
 * @option D[]
 * @option P[]
 * @option E[event id]
 * @option EV[variables id]
 * @option X[number]Y[number]
 * @option XM[number]YM[number]
 * @option G[group id]
 *
 * @param x
 * @type combo
 * @text x
 * @desc x
 * @default P[]
 * @option P[]
 * @option E[event id]
 *
 * @param y
 * @type combo
 * @text y
 * @desc y
 * @default P[]
 * @option P[]
 * @option E[event id]
 *
 * @param z
 * @type combo
 * @text z
 * @desc z
 * @default C[]
 * @option T[]
 * @option M[]
 * @option C[]
 * @option P[]
 *
 * @param scaleX
 * @type text
 * @text x scale
 * @desc x scale
 * @default 100
 *
 * @param scaleY
 * @type text
 * @text y scale
 * @desc y scale
 * @default 100
 *
 * @param MoveType
 * @type combo
 * @text move type
 * @desc Move Type
 * @default S[]
 * @option TP[min angle]
 * @option TE[min angle,event id]
 * @option TEV[min angle,variable id]
 * @option TG[min angle,group]
 * @option QP[min width,angle,min time,bounce times]
 * @option B[character,ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8]
 * @option F[content]
 *
 * @param rTRotation
 * @type text
 * @text Special angle increase.
 * @desc Special angle increase.
 * @default 
 *
 * @param Regions
 * @type text
 * @text Regions
 * @desc List of regions where bullets disappear.
 * @default []
 *
 * @param Terrains
 * @type text
 * @text Terrains
 * @desc List of terrains where bullets disappear.
 * @default []
 *
 * @param Target
 * @type text
 * @text Target
 * @desc List of character that bullets can collied with.
 * @default []
 *
 * @param Pierce
 * @type number
 * @text pierce times
 * @desc The pierce times of bullet
 * @default 0
 *
 * @param Img
 * @type file
 * @dir img/bullets
 * @text image name
 * @desc image name
 * @default 
 *
 * @param Anim
 * @type animation
 * @text anim id
 * @desc anim id
 * @default 0
 *
 * @param DeadCount
 * @type number
 * @text fade ou time
 * @desc fade ou time
 * @default 0
 *
 * @param Speed
 * @type text
 * @text speed
 * @desc speed
 * @default 12
 *
 * @param Max
 * @type text
 * @text max
 * @desc max
 * @default 120
 *
 * @param RotationAuto
 * @type text
 * @text special Rotation
 * @desc special Rotation
 * @default -1
 *
 * @param Action
 * @type text
 * @text Action
 * @desc "S[id,value]" "SS[id,value]" "E[]" "C[commonEvent id,value1,value2......]"  "CP[id]" "T[content]"
 * @default []
 *
 * @param CollisionBox
 * @type text
 * @text CollisionBox
 * @desc Shape of the bullet`s Collider.
 * @default R[4,4]
 *
 * @param Tone
 * @type text
 * @text Tone
 * @desc Tone [0,0,0,0]
 * @default [0,0,0,0]
 *
 * @param Opacity
 * @type text
 * @text Opacity
 * @desc Opacity
 * @default 255
 *
 * @param AfterImage
 * @type text
 * @text AfterImage
 * @desc AfterImage [color,initial opacity,max time,width]
 * @default []
 *
 * @param Light
 * @type text
 * @text no use
 * @desc this value is no longer used.
 * @default []
 *
 * @param Particles
 * @type struct<particles>[]
 * @text Particles
 * @desc Particles
 * @default []
 *
 * @param AtkRange
 * @type number
 * @text AtkRange
 * @desc AtkRange
 * @default 0
 *
 * @param WaitBaseOnSpeed
 * @type text
 * @text special value
 * @desc special value
 * @default -2
 *
 * @param DeadAction
 * @type boolean
 * @text DeadAction
 * @desc whether the bullet performs action when it collieds with regions or terrains.
 * @default false
 *
 * @param PierceAction
 * @type boolean
 * @text PierceAction
 * @desc whether the bullet performs action when it pierce through Target character.
 * @default false
 *
 * @param NoCollisionAction
 * @type boolean
 * @text NoCollisionAction
 * @desc whether the bullet performs action when the attribute 'Max' is reached.
 * @default false
 *
 * @param DeadAnim
 * @type boolean
 * @text DeadAnim
 * @desc whether the bullet plays animation when it collieds with regions or terrains.
 * @default true
 *
 * @param PierceAnim
 * @type boolean
 * @text PierceAnim
 * @desc whether the bullet plays animation when it pierce through Target character.
 * @default false
 *
 * @param NoCollisionAnim
 * @type boolean
 * @text NoCollisionAnim
 * @desc whether the bullet plays animation when the attribute 'Max' is reached.
 * @default false
 *
 * @param ReBound
 * @type number
 * @text ReBound
 * @desc The ReBound times of bullet.
 * @default 0
 *
 * @param AnchorX
 * @type text
 * @text AnchorX
 * @desc AnchorX
 * @default 0.5
 *
 * @param AnchorY
 * @type text
 * @text AnchorY
 * @desc AnchorY
 * @default 0
 *
 * @param LMD
 * @type boolean
 * @text Leave Map Disappear
 * @desc If this attribute is true, the bullet will disappear directly when it leave the map(not screen).
 * @default true
 *
 * @param Bit
 * @type boolean
 * @text forbid to collied
 * @desc When this switch is turned on, the bullet will not collied with anything.
 * @default false
 *
 * @param UpdateJS
 * @type Note
 * @text UpdateJS
 * @desc 
 * @default 
 *
 * @param MoveJS
 * @type Note
 * @text MoveJS
 * @desc 
 * @default 
 *
 * @param DeadJS
 * @type Note
 * @text DeadJS
 * @desc 
 * @default 
 *
 * @param UpdateQT
 * @type Text
 * @text UpdateQT
 * @desc 
 * @default 
 *
 * @param MoveQT
 * @type Text
 * @text MoveQT
 * @desc 
 * @default 
 *
 * @param DeadQT
 * @type Text
 * @text DeadQT
 * @desc 
 * @default
 *
 * @param Name
 * @type Text
 * @text special name
 * @desc Assign a special number to the bullet.
 * @default 
 *
 * @param noPassDo
 * @type boolean
 * @text impassable grid
 * @desc Collision effect triggered by impassable grid
 * @default false
 *
*/
/*~struct~particles:
 * @param img
 * @type text
 * @text img name
 * @desc img name
 * @default 
 *
 * @param offsetX
 * @type number
 * @text offsetX
 * @desc offsetX
 * @default 0
 *
 * @param offsetY
 * @type text
 * @text offsetY
 * @desc offsetY
 * @default 0
 *
 * @param dir
 * @type text
 * @text direction
 * @desc direction
 * @default Math.PI
 *
 * @param dirOffset
 * @type text
 * @text dirOffset
 * @desc dirOffset
 * @default Math.PI/6
 *
 * @param max
 * @type number
 * @text max time
 * @desc max time
 * @default 120
 *
 * @param deadCount
 * @type number
 * @text fade time
 * @desc fade time
 * @default 10
 *
 * @param opacityMin
 * @type text
 * @text min opacity
 * @desc min opacity
 * @default 0.5
 *
 * @param opacityMax
 * @type text
 * @text max opacity
 * @desc max opacity
 * @default 1
 *
 * @param scaleMin
 * @type text
 * @text min scale
 * @desc min scale
 * @default 0.5
 *
 * @param scaleMax
 * @type text
 * @text max scale
 * @desc max scale
 * @default 1.5
 *
 * @param moveType
 * @type text
 * @text move type
 * @desc move type
 * @default -8*t;0
 *
 * @param wait
 * @type number
 * @text wait time
 * @desc wait time
 * @default 2
 *
*/
//=============================================================================
//particles
//=============================================================================
/*!
 * pixi-particles - v4.3.0
 * License MIT
 */
this.PIXI=this.PIXI||{},function(t,i){"use strict";var e,s=function(){function i(i,e,s){this.value=i,this.time=e,this.next=null,this.isStepped=!1,this.ease=s?"function"==typeof s?s:t.ParticleUtils.generateEase(s):null}return i.createList=function(e){if("list"in e){var s=e.list,r=void 0,n=s[0],a=n.value,h=n.time,o=r=new i("string"==typeof a?t.ParticleUtils.hexToRGB(a):a,h,e.ease);if(s.length>2||2===s.length&&s[1].value!==a)for(var l=1;l<s.length;++l){var p=s[l],d=p.value,c=p.time;r.next=new i("string"==typeof d?t.ParticleUtils.hexToRGB(d):d,c),r=r.next}return o.isStepped=!!e.isStepped,o}var u=new i("string"==typeof e.start?t.ParticleUtils.hexToRGB(e.start):e.start,0);return e.end!==e.start&&(u.next=new i("string"==typeof e.end?t.ParticleUtils.hexToRGB(e.end):e.end,1)),u},i}(),r=i;function n(t){return e(t)}e=parseInt(/^(\d+)\./.exec(i.VERSION)[1],10)<5?r.Texture.fromImage:r.Texture.from,function(t){t.verbose=!1,t.DEG_TO_RADS=Math.PI/180,t.rotatePoint=function(i,e){if(i){i*=t.DEG_TO_RADS;var s=Math.sin(i),r=Math.cos(i),n=e.x*r-e.y*s,a=e.x*s+e.y*r;e.x=n,e.y=a}},t.combineRGBComponents=function(t,i,e){return t<<16|i<<8|e},t.normalize=function(i){var e=1/t.length(i);i.x*=e,i.y*=e},t.scaleBy=function(t,i){t.x*=i,t.y*=i},t.length=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},t.hexToRGB=function(t,i){var e;return i||(i={}),"#"===t.charAt(0)?t=t.substr(1):0===t.indexOf("0x")&&(t=t.substr(2)),8===t.length&&(e=t.substr(0,2),t=t.substr(2)),i.r=parseInt(t.substr(0,2),16),i.g=parseInt(t.substr(2,2),16),i.b=parseInt(t.substr(4,2),16),e&&(i.a=parseInt(e,16)),i},t.generateEase=function(t){var i=t.length,e=1/i;return function(s){var r=i*s|0,n=(s-r*e)*i,a=t[r]||t[i-1];return a.s+n*(2*(1-n)*(a.cp-a.s)+n*(a.e-a.s))}},t.getBlendMode=function(t){if(!t)return i.BLEND_MODES.NORMAL;for(t=t.toUpperCase();t.indexOf(" ")>=0;)t=t.replace(" ","_");return i.BLEND_MODES[t]||i.BLEND_MODES.NORMAL},t.createSteppedGradient=function(i,e){void 0===e&&(e=10),("number"!=typeof e||e<=0)&&(e=10);var r=new s(t.hexToRGB(i[0].value),i[0].time);r.isStepped=!0;for(var n=r,a=i[0],h=1,o=i[h],l=1;l<e;++l){for(var p=l/e;p>o.time;)a=o,o=i[++h];p=(p-a.time)/(o.time-a.time);var d=t.hexToRGB(a.value),c=t.hexToRGB(o.value),u={r:(c.r-d.r)*p+d.r,g:(c.g-d.g)*p+d.g,b:(c.b-d.b)*p+d.b};n.next=new s(u,l/e),n=n.next}return r}}(t.ParticleUtils||(t.ParticleUtils={}));var a=function(t,i){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t[e]=i[e])})(t,i)};function h(t,i){function e(){this.constructor=t}a(t,i),t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)}function o(t){return this.ease&&(t=this.ease(t)),(this.next.value-this.current.value)*t+this.current.value}function l(i){this.ease&&(i=this.ease(i));var e=this.current.value,s=this.next.value,r=(s.r-e.r)*i+e.r,n=(s.g-e.g)*i+e.g,a=(s.b-e.b)*i+e.b;return t.ParticleUtils.combineRGBComponents(r,n,a)}function p(t){for(this.ease&&(t=this.ease(t));t>this.next.time;)this.current=this.next,this.next=this.next.next;return t=(t-this.current.time)/(this.next.time-this.current.time),(this.next.value-this.current.value)*t+this.current.value}function d(i){for(this.ease&&(i=this.ease(i));i>this.next.time;)this.current=this.next,this.next=this.next.next;i=(i-this.current.time)/(this.next.time-this.current.time);var e=this.current.value,s=this.next.value,r=(s.r-e.r)*i+e.r,n=(s.g-e.g)*i+e.g,a=(s.b-e.b)*i+e.b;return t.ParticleUtils.combineRGBComponents(r,n,a)}function c(t){for(this.ease&&(t=this.ease(t));this.next&&t>this.next.time;)this.current=this.next,this.next=this.next.next;return this.current.value}function u(i){for(this.ease&&(i=this.ease(i));this.next&&i>this.next.time;)this.current=this.next,this.next=this.next.next;var e=this.current.value;return t.ParticleUtils.combineRGBComponents(e.r,e.g,e.b)}var m,f=function(){function t(t){void 0===t&&(t=!1),this.current=null,this.next=null,this.isColor=!!t,this.interpolate=null,this.ease=null}return t.prototype.reset=function(t){this.current=t,this.next=t.next,this.next&&this.next.time>=1?this.interpolate=this.isColor?l:o:t.isStepped?this.interpolate=this.isColor?u:c:this.interpolate=this.isColor?d:p,this.ease=this.current.ease},t}(),_=function(e){function s(t){var r=e.call(this)||this;return r.prevChild=r.nextChild=null,r.emitter=t,r.anchor.x=r.anchor.y=.5,r.velocity=new i.Point,r.rotationSpeed=0,r.rotationAcceleration=0,r.maxLife=0,r.age=0,r.ease=null,r.extraData=null,r.alphaList=new f,r.speedList=new f,r.speedMultiplier=1,r.acceleration=new i.Point,r.maxSpeed=NaN,r.scaleList=new f,r.scaleMultiplier=1,r.colorList=new f(!0),r._doAlpha=!1,r._doScale=!1,r._doSpeed=!1,r._doAcceleration=!1,r._doColor=!1,r._doNormalMovement=!1,r._oneOverLife=0,r.next=null,r.prev=null,r.init=r.init,r.Particle_init=s.prototype.init,r.update=r.update,r.Particle_update=s.prototype.update,r.Sprite_destroy=e.prototype.destroy,r.Particle_destroy=s.prototype.destroy,r.applyArt=r.applyArt,r.kill=r.kill,r}return h(s,e),s.prototype.init=function(){this.age=0,this.velocity.x=this.speedList.current.value*this.speedMultiplier,this.velocity.y=0,t.ParticleUtils.rotatePoint(this.rotation,this.velocity),this.noRotation?this.rotation=0:this.rotation*=t.ParticleUtils.DEG_TO_RADS,this.rotationSpeed*=t.ParticleUtils.DEG_TO_RADS,this.rotationAcceleration*=t.ParticleUtils.DEG_TO_RADS,this.alpha=this.alphaList.current.value,this.scale.x=this.scale.y=this.scaleList.current.value,this._doAlpha=!!this.alphaList.current.next,this._doSpeed=!!this.speedList.current.next,this._doScale=!!this.scaleList.current.next,this._doColor=!!this.colorList.current.next,this._doAcceleration=0!==this.acceleration.x||0!==this.acceleration.y,this._doNormalMovement=this._doSpeed||0!==this.speedList.current.value||this._doAcceleration,this._oneOverLife=1/this.maxLife;var i=this.colorList.current.value;this.tint=t.ParticleUtils.combineRGBComponents(i.r,i.g,i.b),this.visible=!0},s.prototype.applyArt=function(t){this.texture=t||i.Texture.EMPTY},s.prototype.update=function(i){if(this.age+=i,this.age>=this.maxLife||this.age<0)return this.kill(),-1;var e=this.age*this._oneOverLife;if(this.ease&&(e=4===this.ease.length?this.ease(e,0,1,1):this.ease(e)),this._doAlpha&&(this.alpha=this.alphaList.interpolate(e)),this._doScale){var s=this.scaleList.interpolate(e)*this.scaleMultiplier;this.scale.x=this.scale.y=s}if(this._doNormalMovement){var r=void 0,n=void 0;if(this._doSpeed){var a=this.speedList.interpolate(e)*this.speedMultiplier;t.ParticleUtils.normalize(this.velocity),t.ParticleUtils.scaleBy(this.velocity,a),r=this.velocity.x*i,n=this.velocity.y*i}else if(this._doAcceleration){var h=this.velocity.x,o=this.velocity.y;if(this.velocity.x+=this.acceleration.x*i,this.velocity.y+=this.acceleration.y*i,this.maxSpeed){var l=t.ParticleUtils.length(this.velocity);l>this.maxSpeed&&t.ParticleUtils.scaleBy(this.velocity,this.maxSpeed/l)}r=(h+this.velocity.x)/2*i,n=(o+this.velocity.y)/2*i}else r=this.velocity.x*i,n=this.velocity.y*i;this.position.x+=r,this.position.y+=n}if(this._doColor&&(this.tint=this.colorList.interpolate(e)),0!==this.rotationAcceleration){var p=this.rotationSpeed+this.rotationAcceleration*i;this.rotation+=(this.rotationSpeed+p)/2*i,this.rotationSpeed=p}else 0!==this.rotationSpeed?this.rotation+=this.rotationSpeed*i:this.acceleration&&!this.noRotation&&(this.rotation=Math.atan2(this.velocity.y,this.velocity.x));return e},s.prototype.kill=function(){this.emitter.recycle(this)},s.prototype.destroy=function(){this.parent&&this.parent.removeChild(this),this.Sprite_destroy(),this.emitter=this.velocity=this.colorList=this.scaleList=this.alphaList=this.speedList=this.ease=this.next=this.prev=null},s.parseArt=function(i){var e;for(e=i.length;e>=0;--e)"string"==typeof i[e]&&(i[e]=n(i[e]));if(t.ParticleUtils.verbose)for(e=i.length-1;e>0;--e)if(i[e].baseTexture!==i[e-1].baseTexture){window.console&&console.warn("PixiParticles: using particle textures from different images may hinder performance in WebGL");break}return i},s.parseData=function(t){return t},s}(i.Sprite),C=function(){function t(t){this.segments=[],this.countingLengths=[],this.totalLength=0,this.init(t)}return t.prototype.init=function(t){if(t&&t.length)if(Array.isArray(t[0]))for(var i=0;i<t.length;++i)for(var e=t[i],s=e[0],r=1;r<e.length;++r){var n=e[r];this.segments.push({p1:s,p2:n,l:0}),s=n}else for(s=t[0],i=1;i<t.length;++i){n=t[i];this.segments.push({p1:s,p2:n,l:0}),s=n}else this.segments.push({p1:{x:0,y:0},p2:{x:0,y:0},l:0});for(i=0;i<this.segments.length;++i){var a=this.segments[i],h=a.p1,o=a.p2,l=Math.sqrt((o.x-h.x)*(o.x-h.x)+(o.y-h.y)*(o.y-h.y));this.segments[i].l=l,this.totalLength+=l,this.countingLengths.push(this.totalLength)}},t.prototype.getRandomPoint=function(t){var i,e,s=Math.random()*this.totalLength;if(1===this.segments.length)i=this.segments[0],e=s;else for(var r=0;r<this.countingLengths.length;++r)if(s<this.countingLengths[r]){i=this.segments[r],e=0===r?s:s-this.countingLengths[r-1];break}e/=i.l||1;var n=i.p1,a=i.p2;t.x=n.x+e*(a.x-n.x),t.y=n.y+e*(a.y-n.y)},t}(),v=i;m=parseInt(/^(\d+)\./.exec(i.VERSION)[1],10)<5?v.ticker.shared:v.Ticker.shared;var x=new i.Point,y=function(){function e(t,i,e){this._currentImageIndex=-1,this._particleConstructor=_,this.particleImages=null,this.startAlpha=null,this.startSpeed=null,this.minimumSpeedMultiplier=1,this.acceleration=null,this.maxSpeed=NaN,this.startScale=null,this.minimumScaleMultiplier=1,this.startColor=null,this.minLifetime=0,this.maxLifetime=0,this.minStartRotation=0,this.maxStartRotation=0,this.noRotation=!1,this.minRotationSpeed=0,this.maxRotationSpeed=0,this.particleBlendMode=0,this.customEase=null,this.extraData=null,this._frequency=1,this.spawnChance=1,this.maxParticles=1e3,this.emitterLifetime=-1,this.spawnPos=null,this.spawnType=null,this._spawnFunc=null,this.spawnRect=null,this.spawnCircle=null,this.spawnPolygonalChain=null,this.particlesPerWave=1,this.particleSpacing=0,this.angleStart=0,this.rotation=0,this.ownerPos=null,this._prevEmitterPos=null,this._prevPosIsValid=!1,this._posChanged=!1,this._parent=null,this.addAtBack=!1,this.particleCount=0,this._emit=!1,this._spawnTimer=0,this._emitterLife=-1,this._activeParticlesFirst=null,this._activeParticlesLast=null,this._poolFirst=null,this._origConfig=null,this._origArt=null,this._autoUpdate=!1,this._currentImageIndex=-1,this._destroyWhenComplete=!1,this._completeCallback=null,this.parent=t,i&&e&&this.init(i,e),this.recycle=this.recycle,this.update=this.update,this.rotate=this.rotate,this.updateSpawnPos=this.updateSpawnPos,this.updateOwnerPos=this.updateOwnerPos}return Object.defineProperty(e.prototype,"orderedArt",{get:function(){return-1!==this._currentImageIndex},set:function(t){this._currentImageIndex=t?0:-1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"frequency",{get:function(){return this._frequency},set:function(t){this._frequency="number"==typeof t&&t>0?t:1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"particleConstructor",{get:function(){return this._particleConstructor},set:function(t){if(t!==this._particleConstructor){this._particleConstructor=t,this.cleanup();for(var i=this._poolFirst;i;i=i.next)i.destroy();this._poolFirst=null,this._origConfig&&this._origArt&&this.init(this._origArt,this._origConfig)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this._parent},set:function(t){this.cleanup(),this._parent=t},enumerable:!0,configurable:!0}),e.prototype.init=function(e,r){if(e&&r){this.cleanup(),this._origConfig=r,this._origArt=e,e=Array.isArray(e)?e.slice():[e];var n=this._particleConstructor;this.particleImages=n.parseArt?n.parseArt(e):e,r.alpha?this.startAlpha=s.createList(r.alpha):this.startAlpha=new s(1,0),r.speed?(this.startSpeed=s.createList(r.speed),this.minimumSpeedMultiplier=("minimumSpeedMultiplier"in r?r.minimumSpeedMultiplier:r.speed.minimumSpeedMultiplier)||1):(this.minimumSpeedMultiplier=1,this.startSpeed=new s(0,0));var a=r.acceleration;a&&(a.x||a.y)?(this.startSpeed.next=null,this.acceleration=new i.Point(a.x,a.y),this.maxSpeed=r.maxSpeed||NaN):this.acceleration=new i.Point,r.scale?(this.startScale=s.createList(r.scale),this.minimumScaleMultiplier=("minimumScaleMultiplier"in r?r.minimumScaleMultiplier:r.scale.minimumScaleMultiplier)||1):(this.startScale=new s(1,0),this.minimumScaleMultiplier=1),r.color?this.startColor=s.createList(r.color):this.startColor=new s({r:255,g:255,b:255},0),r.startRotation?(this.minStartRotation=r.startRotation.min,this.maxStartRotation=r.startRotation.max):this.minStartRotation=this.maxStartRotation=0,r.noRotation&&(this.minStartRotation||this.maxStartRotation)?this.noRotation=!!r.noRotation:this.noRotation=!1,r.rotationSpeed?(this.minRotationSpeed=r.rotationSpeed.min,this.maxRotationSpeed=r.rotationSpeed.max):this.minRotationSpeed=this.maxRotationSpeed=0,this.rotationAcceleration=r.rotationAcceleration||0,this.minLifetime=r.lifetime.min,this.maxLifetime=r.lifetime.max,this.particleBlendMode=t.ParticleUtils.getBlendMode(r.blendMode),r.ease?this.customEase="function"==typeof r.ease?r.ease:t.ParticleUtils.generateEase(r.ease):this.customEase=null,n.parseData?this.extraData=n.parseData(r.extraData):this.extraData=r.extraData||null,this.spawnRect=this.spawnCircle=null,this.particlesPerWave=1,r.particlesPerWave&&r.particlesPerWave>1&&(this.particlesPerWave=r.particlesPerWave),this.particleSpacing=0,this.angleStart=0,this.parseSpawnType(r),this.frequency=r.frequency,this.spawnChance="number"==typeof r.spawnChance&&r.spawnChance>0?r.spawnChance:1,this.emitterLifetime=r.emitterLifetime||-1,this.maxParticles=r.maxParticles>0?r.maxParticles:1e3,this.addAtBack=!!r.addAtBack,this.rotation=0,this.ownerPos=new i.Point,this.spawnPos=new i.Point(r.pos.x,r.pos.y),this.initAdditional(e,r),this._prevEmitterPos=this.spawnPos.clone(),this._prevPosIsValid=!1,this._spawnTimer=0,this.emit=void 0===r.emit||!!r.emit,this.autoUpdate=!!r.autoUpdate,this.orderedArt=!!r.orderedArt}},e.prototype.initAdditional=function(t,i){},e.prototype.parseSpawnType=function(t){var e;switch(t.spawnType){case"rect":this.spawnType="rect",this._spawnFunc=this._spawnRect;var s=t.spawnRect;this.spawnRect=new i.Rectangle(s.x,s.y,s.w,s.h);break;case"circle":this.spawnType="circle",this._spawnFunc=this._spawnCircle,e=t.spawnCircle,this.spawnCircle=new i.Circle(e.x,e.y,e.r);break;case"ring":this.spawnType="ring",this._spawnFunc=this._spawnRing,e=t.spawnCircle,this.spawnCircle=new i.Circle(e.x,e.y,e.r),this.spawnCircle.minRadius=e.minR;break;case"burst":this.spawnType="burst",this._spawnFunc=this._spawnBurst,this.particleSpacing=t.particleSpacing,this.angleStart=t.angleStart?t.angleStart:0;break;case"point":this.spawnType="point",this._spawnFunc=this._spawnPoint;break;case"polygonalChain":this.spawnType="polygonalChain",this._spawnFunc=this._spawnPolygonalChain,this.spawnPolygonalChain=new C(t.spawnPolygon);break;default:this.spawnType="point",this._spawnFunc=this._spawnPoint}},e.prototype.recycle=function(t){t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next),t===this._activeParticlesLast&&(this._activeParticlesLast=t.prev),t===this._activeParticlesFirst&&(this._activeParticlesFirst=t.next),t.prev=null,t.next=this._poolFirst,this._poolFirst=t,t.parent&&t.parent.removeChild(t),--this.particleCount},e.prototype.rotate=function(i){if(this.rotation!==i){var e=i-this.rotation;this.rotation=i,t.ParticleUtils.rotatePoint(e,this.spawnPos),this._posChanged=!0}},e.prototype.updateSpawnPos=function(t,i){this._posChanged=!0,this.spawnPos.x=t,this.spawnPos.y=i},e.prototype.updateOwnerPos=function(t,i){this._posChanged=!0,this.ownerPos.x=t,this.ownerPos.y=i},e.prototype.resetPositionTracking=function(){this._prevPosIsValid=!1},Object.defineProperty(e.prototype,"emit",{get:function(){return this._emit},set:function(t){this._emit=!!t,this._emitterLife=this.emitterLifetime},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"autoUpdate",{get:function(){return this._autoUpdate},set:function(t){this._autoUpdate&&!t?m.remove(this.update,this):!this._autoUpdate&&t&&m.add(this.update,this),this._autoUpdate=!!t},enumerable:!0,configurable:!0}),e.prototype.playOnceAndDestroy=function(t){this.autoUpdate=!0,this.emit=!0,this._destroyWhenComplete=!0,this._completeCallback=t},e.prototype.playOnce=function(t){this.emit=!0,this._completeCallback=t},e.prototype.update=function(t){if(this._autoUpdate&&(t=t/i.settings.TARGET_FPMS/1e3),this._parent){var e,s,r,n,a;for(s=this._activeParticlesFirst;s;s=r)r=s.next,s.update(t);this._prevPosIsValid&&(n=this._prevEmitterPos.x,a=this._prevEmitterPos.y);var h=this.ownerPos.x+this.spawnPos.x,o=this.ownerPos.y+this.spawnPos.y;if(this._emit)for(this._spawnTimer-=t<0?0:t;this._spawnTimer<=0;){if(this._emitterLife>=0&&(this._emitterLife-=this._frequency,this._emitterLife<=0)){this._spawnTimer=0,this._emitterLife=0,this.emit=!1;break}if(this.particleCount>=this.maxParticles)this._spawnTimer+=this._frequency;else{var l=void 0;if(l=this.minLifetime===this.maxLifetime?this.minLifetime:Math.random()*(this.maxLifetime-this.minLifetime)+this.minLifetime,-this._spawnTimer<l){var p=void 0,d=void 0;if(this._prevPosIsValid&&this._posChanged){var c=1+this._spawnTimer/t;p=(h-n)*c+n,d=(o-a)*c+a}else p=h,d=o;e=0;for(var u=Math.min(this.particlesPerWave,this.maxParticles-this.particleCount);e<u;++e)if(!(this.spawnChance<1&&Math.random()>=this.spawnChance)){var m=void 0;this._poolFirst?(m=this._poolFirst,this._poolFirst=this._poolFirst.next,m.next=null):m=new this.particleConstructor(this),this.particleImages.length>1?-1!==this._currentImageIndex?(m.applyArt(this.particleImages[this._currentImageIndex++]),(this._currentImageIndex<0||this._currentImageIndex>=this.particleImages.length)&&(this._currentImageIndex=0)):m.applyArt(this.particleImages[Math.floor(Math.random()*this.particleImages.length)]):m.applyArt(this.particleImages[0]),m.alphaList.reset(this.startAlpha),1!==this.minimumSpeedMultiplier&&(m.speedMultiplier=Math.random()*(1-this.minimumSpeedMultiplier)+this.minimumSpeedMultiplier),m.speedList.reset(this.startSpeed),m.acceleration.x=this.acceleration.x,m.acceleration.y=this.acceleration.y,m.maxSpeed=this.maxSpeed,1!==this.minimumScaleMultiplier&&(m.scaleMultiplier=Math.random()*(1-this.minimumScaleMultiplier)+this.minimumScaleMultiplier),m.scaleList.reset(this.startScale),m.colorList.reset(this.startColor),this.minRotationSpeed===this.maxRotationSpeed?m.rotationSpeed=this.minRotationSpeed:m.rotationSpeed=Math.random()*(this.maxRotationSpeed-this.minRotationSpeed)+this.minRotationSpeed,m.rotationAcceleration=this.rotationAcceleration,m.noRotation=this.noRotation,m.maxLife=l,m.blendMode=this.particleBlendMode,m.ease=this.customEase,m.extraData=this.extraData,this.applyAdditionalProperties(m),this._spawnFunc(m,p,d,e),m.init(),this.addAtBack?this._parent.addChildAt(m,0):this._parent.addChild(m),this._activeParticlesLast?(this._activeParticlesLast.next=m,m.prev=this._activeParticlesLast,this._activeParticlesLast=m):this._activeParticlesLast=this._activeParticlesFirst=m,++this.particleCount,m.update(-this._spawnTimer)}}this._spawnTimer+=this._frequency}}if(this._posChanged&&(this._prevEmitterPos.x=h,this._prevEmitterPos.y=o,this._prevPosIsValid=!0,this._posChanged=!1),!this._emit&&!this._activeParticlesFirst){if(this._completeCallback){var f=this._completeCallback;this._completeCallback=null,f()}this._destroyWhenComplete&&this.destroy()}}},e.prototype.applyAdditionalProperties=function(t){},e.prototype._spawnPoint=function(t,i,e){this.minStartRotation===this.maxStartRotation?t.rotation=this.minStartRotation+this.rotation:t.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,t.position.x=i,t.position.y=e},e.prototype._spawnRect=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,x.x=Math.random()*this.spawnRect.width+this.spawnRect.x,x.y=Math.random()*this.spawnRect.height+this.spawnRect.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnCircle=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,x.x=Math.random()*this.spawnCircle.radius,x.y=0,t.ParticleUtils.rotatePoint(360*Math.random(),x),x.x+=this.spawnCircle.x,x.y+=this.spawnCircle.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnRing=function(i,e,s){var r=this.spawnCircle;this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,r.minRadius!==r.radius?x.x=Math.random()*(r.radius-r.minRadius)+r.minRadius:x.x=r.radius,x.y=0;var n=360*Math.random();i.rotation+=n,t.ParticleUtils.rotatePoint(n,x),x.x+=this.spawnCircle.x,x.y+=this.spawnCircle.y,0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnPolygonalChain=function(i,e,s){this.minStartRotation===this.maxStartRotation?i.rotation=this.minStartRotation+this.rotation:i.rotation=Math.random()*(this.maxStartRotation-this.minStartRotation)+this.minStartRotation+this.rotation,this.spawnPolygonalChain.getRandomPoint(x),0!==this.rotation&&t.ParticleUtils.rotatePoint(this.rotation,x),i.position.x=e+x.x,i.position.y=s+x.y},e.prototype._spawnBurst=function(t,i,e,s){0===this.particleSpacing?t.rotation=360*Math.random():t.rotation=this.angleStart+this.particleSpacing*s+this.rotation,t.position.x=i,t.position.y=e},e.prototype.cleanup=function(){var t,i;for(t=this._activeParticlesFirst;t;t=i)i=t.next,this.recycle(t),t.parent&&t.parent.removeChild(t);this._activeParticlesFirst=this._activeParticlesLast=null,this.particleCount=0},e.prototype.destroy=function(){var t;this.autoUpdate=!1,this.cleanup();for(var i=this._poolFirst;i;i=t)t=i.next,i.destroy();this._poolFirst=this._parent=this.particleImages=this.spawnPos=this.ownerPos=this.startColor=this.startScale=this.startAlpha=this.startSpeed=this.customEase=this._completeCallback=null},e}(),g=new i.Point,P=["pow","sqrt","abs","floor","round","ceil","E","PI","sin","cos","tan","asin","acos","atan","atan2","log"],w=new RegExp(["[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]"].concat(P).join("|"),"g");var b=function(e){function s(t){var s=e.call(this,t)||this;return s.path=null,s.initialRotation=0,s.initialPosition=new i.Point,s.movement=0,s}return h(s,e),s.prototype.init=function(){this.initialRotation=this.rotation,this.Particle_init(),this.path=this.extraData.path,this._doNormalMovement=!this.path,this.movement=0,this.initialPosition.x=this.position.x,this.initialPosition.y=this.position.y},s.prototype.update=function(i){var e=this.Particle_update(i);if(e>=0&&this.path){if(this._doSpeed){var s=this.speedList.interpolate(e)*this.speedMultiplier;this.movement+=s*i}else{s=this.speedList.current.value*this.speedMultiplier;this.movement+=s*i}g.x=this.movement,g.y=this.path(this.movement),t.ParticleUtils.rotatePoint(this.initialRotation,g),this.position.x=this.initialPosition.x+g.x,this.position.y=this.initialPosition.y+g.y}return e},s.prototype.destroy=function(){this.Particle_destroy(),this.path=this.initialPosition=null},s.parseArt=function(t){return _.parseArt(t)},s.parseData=function(i){var e={};if(i&&i.path)try{e.path=function(t){for(var i=t.match(w),e=i.length-1;e>=0;--e)P.indexOf(i[e])>=0&&(i[e]="Math."+i[e]);return t=i.join(""),new Function("x","return "+t+";")}(i.path)}catch(i){t.ParticleUtils.verbose&&console.error("PathParticle: error in parsing path expression"),e.path=null}else t.ParticleUtils.verbose&&console.error("PathParticle requires a path string in extraData!"),e.path=null;return e},s}(_),S=function(t){function e(i){var e=t.call(this,i)||this;return e.textures=null,e.duration=0,e.framerate=0,e.elapsed=0,e.loop=!1,e}return h(e,t),e.prototype.init=function(){this.Particle_init(),this.elapsed=0,this.framerate<0&&(this.duration=this.maxLife,this.framerate=this.textures.length/this.duration)},e.prototype.applyArt=function(t){this.textures=t.textures,this.framerate=t.framerate,this.duration=t.duration,this.loop=t.loop},e.prototype.update=function(t){var e=this.Particle_update(t);if(e>=0){this.elapsed+=t,this.elapsed>this.duration&&(this.loop?this.elapsed=this.elapsed%this.duration:this.elapsed=this.duration-1e-6);var s=this.elapsed*this.framerate+1e-7|0;this.texture=this.textures[s]||i.Texture.EMPTY}return e},e.prototype.destroy=function(){this.Particle_destroy(),this.textures=null},e.parseArt=function(t){for(var e=[],s=0;s<t.length;++s){for(var r=t[s],a=e[s]={},h=a.textures=[],o=r.textures,l=0;l<o.length;++l){var p=o[l];if("string"==typeof p)h.push(n(p));else if(p instanceof i.Texture)h.push(p);else{var d=p.count||1;for(p="string"==typeof p.texture?n(p.texture):p.texture;d>0;--d)h.push(p)}}"matchLife"===r.framerate?(a.framerate=-1,a.duration=0,a.loop=!1):(a.loop=!!r.loop,a.framerate=r.framerate>0?r.framerate:60,a.duration=h.length/a.framerate)}return e},e}(_),R=function(t){function e(){var i=null!==t&&t.apply(this,arguments)||this;return i._firstChild=null,i._lastChild=null,i._childCount=0,i}return h(e,t),Object.defineProperty(e.prototype,"firstChild",{get:function(){return this._firstChild},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"lastChild",{get:function(){return this._lastChild},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"childCount",{get:function(){return this._childCount},enumerable:!0,configurable:!0}),e.prototype.addChild=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];if(t.length>1)for(var e=0;e<t.length;e++)this.addChild(t[e]);else{var s=t[0];s.parent&&s.parent.removeChild(s),s.parent=this,this.sortDirty=!0,s.transform._parentID=-1,this._lastChild?(this._lastChild.nextChild=s,s.prevChild=this._lastChild,this._lastChild=s):this._firstChild=this._lastChild=s,++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",s,this,this._childCount),s.emit("added",this)}return t[0]},e.prototype.addChildAt=function(t,i){if(i<0||i>this._childCount)throw new Error("addChildAt: The index "+i+" supplied is out of bounds "+this._childCount);t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1;var e=t;if(this._firstChild)if(0===i)this._firstChild.prevChild=e,e.nextChild=this._firstChild,this._firstChild=e;else if(i===this._childCount)this._lastChild.nextChild=e,e.prevChild=this._lastChild,this._lastChild=e;else{for(var s=0,r=this._firstChild;s<i;)r=r.nextChild,++s;r.prevChild.nextChild=e,e.prevChild=r.prevChild,e.nextChild=r,r.prevChild=e}else this._firstChild=this._lastChild=e;return++this._childCount,this._boundsID++,this.onChildrenChange(i),t.emit("added",this),this.emit("childAdded",t,this,i),t},e.prototype.addChildBelow=function(t,i){if(i.parent!==this)throw new Error("addChildBelow: The relative target must be a child of this parent");return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,i.prevChild.nextChild=t,t.prevChild=i.prevChild,t.nextChild=i,i.prevChild=t,this._firstChild===i&&(this._firstChild=t),++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",t,this,this._childCount),t.emit("added",this),t},e.prototype.addChildAbove=function(t,i){if(i.parent!==this)throw new Error("addChildBelow: The relative target must be a child of this parent");return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,i.nextChild.prevChild=t,t.nextChild=i.nextChild,t.prevChild=i,i.nextChild=t,this._lastChild===i&&(this._lastChild=t),++this._childCount,this._boundsID++,this.onChildrenChange(),this.emit("childAdded",t,this,this._childCount),t.emit("added",this),t},e.prototype.swapChildren=function(t,i){if(t!==i&&t.parent===this&&i.parent===this){var e=t,s=e.prevChild,r=e.nextChild;t.prevChild=i.prevChild,t.nextChild=i.nextChild,i.prevChild=s,i.nextChild=r,this._firstChild===t?this._firstChild=i:this._firstChild===i&&(this._firstChild=t),this._lastChild===t?this._lastChild=i:this._lastChild===i&&(this._lastChild=t),this.onChildrenChange()}},e.prototype.getChildIndex=function(t){for(var i=0,e=this._firstChild;e&&e!==t;)e=e.nextChild,++i;if(!e)throw new Error("The supplied DisplayObject must be a child of the caller");return i},e.prototype.setChildIndex=function(t,i){if(i<0||i>=this._childCount)throw new Error("The index "+i+" supplied is out of bounds "+this._childCount);if(t.parent!==this)throw new Error("The supplied DisplayObject must be a child of the caller");if(t.nextChild&&(t.nextChild.prevChild=t.prevChild),t.prevChild&&(t.prevChild.nextChild=t.nextChild),this._firstChild===t&&(this._firstChild=t.nextChild),this._lastChild===t&&(this._lastChild=t.prevChild),t.nextChild=null,t.prevChild=null,this._firstChild)if(0===i)this._firstChild.prevChild=t,t.nextChild=this._firstChild,this._firstChild=t;else if(i===this._childCount)this._lastChild.nextChild=t,t.prevChild=this._lastChild,this._lastChild=t;else{for(var e=0,s=this._firstChild;e<i;)s=s.nextChild,++e;s.prevChild.nextChild=t,t.prevChild=s.prevChild,t.nextChild=s,s.prevChild=t}else this._firstChild=this._lastChild=t;this.onChildrenChange(i)},e.prototype.removeChild=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];if(t.length>1)for(var e=0;e<t.length;e++)this.removeChild(t[e]);else{var s=t[0];if(s.parent!==this)return null;s.parent=null,s.transform._parentID=-1,s.nextChild&&(s.nextChild.prevChild=s.prevChild),s.prevChild&&(s.prevChild.nextChild=s.nextChild),this._firstChild===s&&(this._firstChild=s.nextChild),this._lastChild===s&&(this._lastChild=s.prevChild),s.nextChild=null,s.prevChild=null,--this._childCount,this._boundsID++,this.onChildrenChange(),s.emit("removed",this),this.emit("childRemoved",s,this)}return t[0]},e.prototype.getChildAt=function(t){if(t<0||t>=this._childCount)throw new Error("getChildAt: Index ("+t+") does not exist.");if(0===t)return this._firstChild;if(t===this._childCount)return this._lastChild;for(var i=0,e=this._firstChild;i<t;)e=e.nextChild,++i;return e},e.prototype.removeChildAt=function(t){var i=this.getChildAt(t);return i.parent=null,i.transform._parentID=-1,i.nextChild&&(i.nextChild.prevChild=i.prevChild),i.prevChild&&(i.prevChild.nextChild=i.nextChild),this._firstChild===i&&(this._firstChild=i.nextChild),this._lastChild===i&&(this._lastChild=i.prevChild),i.nextChild=null,i.prevChild=null,--this._childCount,this._boundsID++,this.onChildrenChange(t),i.emit("removed",this),this.emit("childRemoved",i,this,t),i},e.prototype.removeChildren=function(t,i){void 0===t&&(t=0),void 0===i&&(i=this._childCount);var e=t,s=i,r=s-e;if(r>0&&r<=s){for(var n=[],a=this._firstChild,h=0;h<=s&&a;++h,a=a.nextChild)h>=e&&n.push(a);var o=n[0].prevChild,l=n[n.length-1].nextChild;l?l.prevChild=o:this._lastChild=o,o?o.nextChild=l:this._firstChild=l;for(h=0;h<n.length;++h)n[h].parent=null,n[h].transform&&(n[h].transform._parentID=-1),n[h].nextChild=null,n[h].prevChild=null;this._boundsID++,this.onChildrenChange(t);for(h=0;h<n.length;++h)n[h].emit("removed",this),this.emit("childRemoved",n[h],this,h);return n}if(0===r&&0===this._childCount)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},e.prototype.updateTransform=function(){var t,i;for(this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha,t=this._firstChild;t;t=i)i=t.nextChild,t.visible&&t.updateTransform()},e.prototype.calculateBounds=function(){var t,i;for(this._bounds.clear(),this._calculateBounds(),t=this._firstChild;t;t=i)if(i=t.nextChild,t.visible&&t.renderable)if(t.calculateBounds(),t._mask){var e=t._mask.maskObject||t._mask;e.calculateBounds(),this._bounds.addBoundsMask(t._bounds,e._bounds)}else t.filterArea?this._bounds.addBoundsArea(t._bounds,t.filterArea):this._bounds.addBounds(t._bounds);this._bounds.updateID=this._boundsID},e.prototype.getLocalBounds=function(t,e){void 0===e&&(e=!1);var s=i.DisplayObject.prototype.getLocalBounds.call(this,t);if(!e){var r=void 0,n=void 0;for(r=this._firstChild;r;r=n)n=r.nextChild,r.visible&&r.updateTransform()}return s},e.prototype.render=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this.filters&&this.filters.length)this.renderAdvanced(t);else{this._render(t);var i=void 0,e=void 0;for(i=this._firstChild;i;i=e)e=i.nextChild,i.render(t)}},e.prototype.renderAdvanced=function(t){t.batch.flush();var i,e,s=this.filters,r=this._mask;if(s){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<s.length;n++)s[n].enabled&&this._enabledFilters.push(s[n]);this._enabledFilters.length&&t.filter.push(this,this._enabledFilters)}for(r&&t.mask.push(this,this._mask),this._render(t),i=this._firstChild;i;i=e)e=i.nextChild,i.render(t);t.batch.flush(),r&&t.mask.pop(this),s&&this._enabledFilters&&this._enabledFilters.length&&t.filter.pop()},e.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this.filters&&this.filters.length)this.renderAdvancedWebGL(t);else{this._renderWebGL(t);var i=void 0,e=void 0;for(i=this._firstChild;i;i=e)e=i.nextChild,i.renderWebGL(t)}},e.prototype.renderAdvancedWebGL=function(t){t.flush();var i,e,s=this._filters,r=this._mask;if(s){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(var n=0;n<s.length;n++)s[n].enabled&&this._enabledFilters.push(s[n]);this._enabledFilters.length&&t.filterManager.pushFilter(this,this._enabledFilters)}for(r&&t.maskManager.pushMask(this,this._mask),this._renderWebGL(t),i=this._firstChild;i;i=e)e=i.nextChild,i.renderWebGL(t);t.flush(),r&&t.maskManager.popMask(this,this._mask),s&&this._enabledFilters&&this._enabledFilters.length&&t.filterManager.popFilter()},e.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable){var i,e;for(this._mask&&t.maskManager.pushMask(this._mask),this._renderCanvas(t),i=this._firstChild;i;i=e)e=i.nextChild,i.renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},e}(i.Container);t.AnimatedParticle=S,t.Emitter=y,t.GetTextureFromString=n,t.LinkedListContainer=R,t.Particle=_,t.PathParticle=b,t.PolygonalChain=C,t.PropertyList=f,t.PropertyNode=s}(this.PIXI.particles=this.PIXI.particles||{},PIXI);
//=============================================================================
//SAT.js
//=============================================================================
/*!
 * SAT.js - v0.9.0
 * License MIT
 */
if (!SATVector) {
    function SATVector(x, y) {  this['x'] = x || 0;  this['y'] = y || 0;}SATVector.prototype.copy = function (other) {  this['x'] = other['x'];  this['y'] = other['y'];  return this;};SATVector.prototype.clone = function () {  return new SATVector(this['x'], this['y']);};SATVector.prototype.perp = function () {  var x = this['x'];  this['x'] = this['y'];  this['y'] = -x;  return this;};SATVector.prototype.rotate = function (angle) {  var x = this['x'];  var y = this['y'];  this['x'] = x * Math.cos(angle) - y * Math.sin(angle);  this['y'] = x * Math.sin(angle) + y * Math.cos(angle);  return this;};SATVector.prototype.reverse = function () {  this['x'] = -this['x'];  this['y'] = -this['y'];  return this;};SATVector.prototype.normalize = function () {  var d = this.len();  if (d > 0) {    this['x'] = this['x'] / d;    this['y'] = this['y'] / d;  }  return this;};SATVector.prototype.add = function (other) {  this['x'] += other['x'];  this['y'] += other['y'];  return this;};SATVector.prototype.sub = function (other) {  this['x'] -= other['x'];  this['y'] -= other['y'];  return this;};SATVector.prototype.scale = function (x, y) {  this['x'] *= x;  this['y'] *= typeof y != 'undefined' ? y : x;  return this;};SATVector.prototype.project = function (other) {  var amt = this.dot(other) / other.len2();  this['x'] = amt * other['x'];  this['y'] = amt * other['y'];  return this;};SATVector.prototype.projectN = function (other) {  var amt = this.dot(other);  this['x'] = amt * other['x'];  this['y'] = amt * other['y'];  return this;};SATVector.prototype.reflect = function (axis) {  var x = this['x'];  var y = this['y'];  this.project(axis).scale(2);  this['x'] -= x;  this['y'] -= y;  return this;};SATVector.prototype.reflectN = function (axis) {  var x = this['x'];  var y = this['y'];  this.projectN(axis).scale(2);  this['x'] -= x;  this['y'] -= y;  return this;};SATVector.prototype.dot = function (other) {  return this['x'] * other['x'] + this['y'] * other['y'];};SATVector.prototype.len2 = function () {  return this.dot(this);};SATVector.prototype.len = function () {  return Math.sqrt(this.len2());};function SATCircle(pos, r) {  this['pos'] = pos || new SATVector();  this['r'] = r || 0;  this['offset'] = new SATVector();}SATCircle.prototype.getAABBAsBox = function () {  var r = this['r'];  var corner = this['pos'].clone().add(this['offset']).sub(new SATVector(r, r));  return new SATBox(corner, r * 2, r * 2);};SATCircle.prototype.getAABB = function () {  return this.getAABBAsBox().toPolygon();};SATCircle.prototype.setOffset = function (offset) {  this['offset'] = offset;  return this;};function SATPolygon(pos, points) {  this['pos'] = pos || new SATVector();  this['angle'] = 0;  this['offset'] = new SATVector();  this.setPoints(points || []);}SATPolygon.prototype.setPoints = function (points) {  var lengthChanged = !this['points'] || this['points'].length !== points.length;  if (lengthChanged) {    var i;    var calcPoints = this['calcPoints'] = [];    var edges = this['edges'] = [];    var normals = this['normals'] = [];    for (i = 0; i < points.length; i++) {      var p1 = points[i];      var p2 = i < points.length - 1 ? points[i + 1] : points[0];      if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {        points.splice(i, 1);        i -= 1;        continue;      }      calcPoints.push(new SATVector());      edges.push(new SATVector());      normals.push(new SATVector());    }  }  this['points'] = points;  this._recalc();  return this;};SATPolygon.prototype.setAngle = function (angle) {  this['angle'] = angle;  this._recalc();  return this;};SATPolygon.prototype.setOffset = function (offset) {  this['offset'] = offset;  this._recalc();  return this;};SATPolygon.prototype.rotate = function (angle) {  var points = this['points'];  var len = points.length;  for (var i = 0; i < len; i++) {    points[i].rotate(angle);  }  this._recalc();  return this;};SATPolygon.prototype.translate = function (x, y) {  var points = this['points'];  var len = points.length;  for (var i = 0; i < len; i++) {    points[i]['x'] += x;    points[i]['y'] += y;  }  this._recalc();  return this;};SATPolygon.prototype._recalc = function () {  var calcPoints = this['calcPoints'];  var edges = this['edges'];  var normals = this['normals'];  var points = this['points'];  var offset = this['offset'];  var angle = this['angle'];  var len = points.length;  var i;  for (i = 0; i < len; i++) {    var calcPoint = calcPoints[i].copy(points[i]);    calcPoint['x'] += offset['x'];    calcPoint['y'] += offset['y'];    if (angle !== 0) {      calcPoint.rotate(angle);    }  }  for (i = 0; i < len; i++) {    var p1 = calcPoints[i];    var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];    var e = edges[i].copy(p2).sub(p1);    normals[i].copy(e).perp().normalize();  }  return this;};SATPolygon.prototype.getAABBAsBox = function () {  var points = this['calcPoints'];  var len = points.length;  var xMin = points[0]['x'];  var yMin = points[0]['y'];  var xMax = points[0]['x'];  var yMax = points[0]['y'];  for (var i = 1; i < len; i++) {    var point = points[i];    if (point['x'] < xMin) {      xMin = point['x'];    }    else if (point['x'] > xMax) {      xMax = point['x'];    }    if (point['y'] < yMin) {      yMin = point['y'];    }    else if (point['y'] > yMax) {      yMax = point['y'];    }  }  return new SATBox(this['pos'].clone().add(new SATVector(xMin, yMin)), xMax - xMin, yMax - yMin);};SATPolygon.prototype.getAABB = function () {  return this.getAABBAsBox().toPolygon();};SATPolygon.prototype.getCentroid = function () {  var points = this['calcPoints'];  var len = points.length;  var cx = 0;  var cy = 0;  var ar = 0;  for (var i = 0; i < len; i++) {    var p1 = points[i];    var p2 = i === len - 1 ? points[0] : points[i + 1];    var a = p1['x'] * p2['y'] - p2['x'] * p1['y'];    cx += (p1['x'] + p2['x']) * a;    cy += (p1['y'] + p2['y']) * a;    ar += a;  }  ar = ar * 3;  cx = cx / ar;  cy = cy / ar;  return new SATVector(cx, cy);};function SATBox(pos, w, h) {  this['pos'] = pos || new SATVector();  this['w'] = w || 0;  this['h'] = h || 0;}SATBox.prototype.toPolygon = function () {  var pos = this['pos'];  var w = this['w'];  var h = this['h'];  return new SATPolygon(new SATVector(pos['x'], pos['y']), [    new SATVector(), new SATVector(w, 0),    new SATVector(w, h), new SATVector(0, h)  ]);};function SATResponse() {  this['a'] = null;  this['b'] = null;  this['overlapN'] = new SATVector();  this['overlapV'] = new SATVector();  this.clear();}SATResponse.prototype.clear = function () {  this['aInB'] = true;  this['bInA'] = true;  this['overlap'] = Number.MAX_VALUE;  return this;};var T_VECTORS = [];for (var i = 0; i < 10; i++) { T_VECTORS.push(new SATVector()); }var T_ARRAYS = [];for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }var T_RESPONSE = new SATResponse();var TEST_POINT = new SATBox(new SATVector(), 0.000001, 0.000001).toPolygon();function flattenPointsOn(points, normal, result) {  var min = Number.MAX_VALUE;  var max = -Number.MAX_VALUE;  var len = points.length;  for (var i = 0; i < len; i++) {    var dot = points[i].dot(normal);    if (dot < min) { min = dot; }    if (dot > max) { max = dot; }  }  result[0] = min; result[1] = max;}function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {  var rangeA = T_ARRAYS.pop();  var rangeB = T_ARRAYS.pop();  var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);  var projectedOffset = offsetV.dot(axis);  flattenPointsOn(aPoints, axis, rangeA);  flattenPointsOn(bPoints, axis, rangeB);  rangeB[0] += projectedOffset;  rangeB[1] += projectedOffset;  if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {    T_VECTORS.push(offsetV);    T_ARRAYS.push(rangeA);    T_ARRAYS.push(rangeB);    return true;  }  if (response) {    var overlap = 0;    if (rangeA[0] < rangeB[0]) {      response['aInB'] = false;      if (rangeA[1] < rangeB[1]) {        overlap = rangeA[1] - rangeB[0];        response['bInA'] = false;      } else {        var option1 = rangeA[1] - rangeB[0];        var option2 = rangeB[1] - rangeA[0];        overlap = option1 < option2 ? option1 : -option2;      }    } else {      response['bInA'] = false;      if (rangeA[1] > rangeB[1]) {        overlap = rangeA[0] - rangeB[1];        response['aInB'] = false;      } else {        var option1 = rangeA[1] - rangeB[0];        var option2 = rangeB[1] - rangeA[0];        overlap = option1 < option2 ? option1 : -option2;      }    }    var absOverlap = Math.abs(overlap);    if (absOverlap < response['overlap']) {      response['overlap'] = absOverlap;      response['overlapN'].copy(axis);      if (overlap < 0) {        response['overlapN'].reverse();      }    }  }  T_VECTORS.push(offsetV);  T_ARRAYS.push(rangeA);  T_ARRAYS.push(rangeB);  return false;}function voronoiRegion(line, point) {  var len2 = line.len2();  var dp = point.dot(line);  if (dp < 0) { return LEFT_VORONOI_REGION; }  else if (dp > len2) { return RIGHT_VORONOI_REGION; }  else { return MIDDLE_VORONOI_REGION; }}var LEFT_VORONOI_REGION = -1;var MIDDLE_VORONOI_REGION = 0;var RIGHT_VORONOI_REGION = 1;function pointInCircle(p, c) {  var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']).sub(c['offset']);  var radiusSq = c['r'] * c['r'];  var distanceSq = differenceV.len2();  T_VECTORS.push(differenceV);  return distanceSq <= radiusSq;}function pointInPolygon(p, poly) {  TEST_POINT['pos'].copy(p);  T_RESPONSE.clear();  var result = SATtestPolygonPolygon(TEST_POINT, poly, T_RESPONSE);  if (result) {    result = T_RESPONSE['aInB'];  }  return result;}function SATtestCircleCircle(a, b, response) {  var differenceV = T_VECTORS.pop().copy(b['pos']).add(b['offset']).sub(a['pos']).sub(a['offset']);  var totalRadius = a['r'] + b['r'];  var totalRadiusSq = totalRadius * totalRadius;  var distanceSq = differenceV.len2();  if (distanceSq > totalRadiusSq) {    T_VECTORS.push(differenceV);    return false;  }  if (response) {    var dist = Math.sqrt(distanceSq);    response['a'] = a;    response['b'] = b;    response['overlap'] = totalRadius - dist;    response['overlapN'].copy(differenceV.normalize());    response['overlapV'].copy(differenceV).scale(response['overlap']);    response['aInB'] = a['r'] <= b['r'] && dist <= b['r'] - a['r'];    response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];  }  T_VECTORS.push(differenceV);  return true;}function SATtestPolygonCircle(polygon, circle, response) {  var circlePos = T_VECTORS.pop().copy(circle['pos']).add(circle['offset']).sub(polygon['pos']);  var radius = circle['r'];  var radius2 = radius * radius;  var points = polygon['calcPoints'];  var len = points.length;  var edge = T_VECTORS.pop();  var point = T_VECTORS.pop();  for (var i = 0; i < len; i++) {    var next = i === len - 1 ? 0 : i + 1;    var prev = i === 0 ? len - 1 : i - 1;    var overlap = 0;    var overlapN = null;    edge.copy(polygon['edges'][i]);    point.copy(circlePos).sub(points[i]);    if (response && point.len2() > radius2) {      response['aInB'] = false;    }    var region = voronoiRegion(edge, point);    if (region === LEFT_VORONOI_REGION) {      edge.copy(polygon['edges'][prev]);      var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);      region = voronoiRegion(edge, point2);      if (region === RIGHT_VORONOI_REGION) {        var dist = point.len();        if (dist > radius) {          T_VECTORS.push(circlePos);          T_VECTORS.push(edge);          T_VECTORS.push(point);          T_VECTORS.push(point2);          return false;        } else if (response) {          response['bInA'] = false;          overlapN = point.normalize();          overlap = radius - dist;        }      }      T_VECTORS.push(point2);    } else if (region === RIGHT_VORONOI_REGION) {      edge.copy(polygon['edges'][next]);      point.copy(circlePos).sub(points[next]);      region = voronoiRegion(edge, point);      if (region === LEFT_VORONOI_REGION) {        var dist = point.len();        if (dist > radius) {          T_VECTORS.push(circlePos);          T_VECTORS.push(edge);          T_VECTORS.push(point);          return false;        } else if (response) {          response['bInA'] = false;          overlapN = point.normalize();          overlap = radius - dist;        }      }    } else {      var normal = edge.perp().normalize();      var dist = point.dot(normal);      var distAbs = Math.abs(dist);      if (dist > 0 && distAbs > radius) {        T_VECTORS.push(circlePos);        T_VECTORS.push(normal);        T_VECTORS.push(point);        return false;      } else if (response) {        overlapN = normal;        overlap = radius - dist;        if (dist >= 0 || overlap < 2 * radius) {          response['bInA'] = false;        }      }    }    if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {      response['overlap'] = overlap;      response['overlapN'].copy(overlapN);    }  }  if (response) {    response['a'] = polygon;    response['b'] = circle;    response['overlapV'].copy(response['overlapN']).scale(response['overlap']);  }  T_VECTORS.push(circlePos);  T_VECTORS.push(edge);  T_VECTORS.push(point);  return true;}function SATtestCirclePolygon(circle, polygon, response) {  var result = SATtestPolygonCircle(polygon, circle, response);  if (result && response) {    var a = response['a'];    var aInB = response['aInB'];    response['overlapN'].reverse();    response['overlapV'].reverse();    response['a'] = response['b'];    response['b'] = a;    response['aInB'] = response['bInA'];    response['bInA'] = aInB;  }  return result;}function SATtestPolygonPolygon(a, b, response) {  var aPoints = a['calcPoints'];  var aLen = aPoints.length;  var bPoints = b['calcPoints'];  var bLen = bPoints.length;  for (var i = 0; i < aLen; i++) {    if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {      return false;    }  }  for (var i = 0; i < bLen; i++) {    if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {      return false;    }  }  if (response) {    response['a'] = a;    response['b'] = b;    response['overlapV'].copy(response['overlapN']).scale(response['overlap']);  }  return true;}
}
//=============================================================================
//
//=============================================================================
var QJ = QJ || {};
QJ.BL = QJ.BL || {};
var Imported = Imported || {};
Imported.QJBullet = true;
//=============================================================================
//
//=============================================================================
var numberQJY = 0;
//=============================================================================
//
//=============================================================================
function Game_QJBullet() {
    this.initialize.apply(this, arguments);
}
function Game_QJLaser() {
    this.initialize.apply(this, arguments);
}
function Game_QJTwoPoint() {
    this.initialize.apply(this, arguments);
}
function Game_InterpreterForceQBCommonEvent() {
    this.initialize.apply(this, arguments);
}
function Game_InterpreterForceQBEvent() {
    this.initialize.apply(this, arguments);
}
function QJFrame() {
    this.initialize.apply(this, arguments);
}
//=============================================================================
//
//=============================================================================
(()=>{
//=============================================================================
//
//=============================================================================
const pluginName = "QJ-Bullet";
const parameters = PluginManager.parameters(pluginName);
const preset=eval(parameters['preset']) || [];
const presetText=eval(parameters['presetText']) || [];
const maxbullet=Number(parameters['maxbullet']) || 200;
const showWarn=eval(parameters['showWarn']) || true;
const reserveImg=eval(parameters['reserveImg']);
const PresetText = (()=>{
    let list = {};
    for (let i=0;i<presetText.length;i++) {
        let detial=JsonEx.parse(presetText[i]);
        let stringCon = eval(detial.content1);
        if (detial.content2.length>0) stringCon=stringCon+"+"+eval(detial.content2);
        if (detial.content3.length>0) stringCon=stringCon+"+"+eval(detial.content3);
        list[String(detial.name)] = eval("(function(){"+stringCon+"})");
    }
    return list;
})();
const Preset = (()=>{
    let list = {};
    for (let i=0;i<preset.length;i++) {
        let detial=JsonEx.parse(preset[i]);
        list[String(detial.name)] = {
            initialRotation:detial.initialRotation,
            x:(isNaN(Number(detial.x))?detial.x:Number(detial.x)),
            y:(isNaN(Number(detial.y))?detial.y:Number(detial.y)),
            z:detial.z,
            scaleX:(isNaN(Number(detial.scaleX))?detial.scaleX:Number(detial.scaleX)),
            scaleY:(isNaN(Number(detial.scaleY))?detial.scaleY:Number(detial.scaleY)),
            //======================================
            MoveType:detial.MoveType,
            Regions:eval(detial.Regions),
            Terrains:eval(detial.Terrains),
            Target:eval(detial.Target),
            Pierce:Number(detial.Pierce),
            //======================================
            Img:((Img)=>{
                let newImg;
                try{newImg=eval(Img);} catch(e) {newImg=Img;}
                return newImg;
            })(detial.Img),
            Anim:Number(detial.Anim),
            DeadCount:Number(detial.DeadCount),
            Speed:(isNaN(Number(detial.Speed))?detial.Speed:Number(detial.Speed)),
            Max:(isNaN(Number(detial.Max))?detial.Max:Number(detial.Max)),
            RotationAuto:Number(detial.RotationAuto),
            //======================================
            Action:eval(detial.Action),
            CollisionBox:detial.CollisionBox,
            //======================================
            Tone:eval(detial.Tone),
            Opacity:(isNaN(Number(detial.Opacity))?detial.Opacity:Number(detial.Opacity)),
            AfterImage:eval(detial.AfterImage),
            Light:eval(detial.Light),
            Particles:eval(detial.Particles),
            AtkRange:Number(detial.AtkRange),
            DeadAction:eval(detial.DeadAction),
            PierceAction:eval(detial.PierceAction),
            NoCollisionAction:eval(detial.NoCollisionAction),
            DeadAnim:eval(detial.DeadAnim),
            PierceAnim:eval(detial.PierceAnim),
            NoCollisionAnim:eval(detial.NoCollisionAnim),
            ReBound:eval(detial.ReBound),
            AnchorX:Number(detial.AnchorX),
            AnchorY:Number(detial.AnchorY),
            rTRotation:detial.rTRotation,
            WaitBaseOnSpeed:(isNaN(Number(detial.WaitBaseOnSpeed))?detial.WaitBaseOnSpeed:Number(detial.WaitBaseOnSpeed)),
            LMD:eval(detial.LMD),
            Bit:eval(detial.Bit),
            UpdateJS:detial.UpdateJS,
            MoveJS:detial.MoveJS,
            DeadJS:detial.DeadJS,
            UpdateQT:detial.UpdateQT,
            MoveQT:detial.MoveQT,
            DeadQT:detial.DeadQT,
            Name:detial.Name,
            noPassDo:eval(detial.noPassDo)
        }
    }
    //console.log(list);
    return list;
})();
const tileSize=48;
let QJBInter=null;
let forBidDestination=eval(parameters['forBidDestination']) || false;
let textureSave = {};
const offsetGY = eval(parameters['offsetGY']);
let showBox = eval(parameters['showBox']);
const regionShow = eval(parameters['regionShow']).map((item,index,ary)=>{
    if (item.length==0) return [];
    let detail=item.split("|");
    return [Number(detail[0]),detail[1]]; 
});
const terrainShow = eval(parameters['terrainShow']).map((item,index,ary)=>{
    if (item.length==0) return [];
    let detail=item.split("|");
    return [Number(detail[0]),detail[1]]; 
});
const tile10Show = String(parameters['tile10Show']);
const characterShow = String(parameters['characterShow']);
//=================================
//expandLine:Increase the size of the box to avoid bugs when something rebounds.
const expandLine = 12;
Input.keyMapper[121] = 'F10';
QJ.BL.sprite = null;
//=============================================================================
//Game_QJBullet
//=============================================================================
Game_QJBullet.prototype.initialize = function(data,index) {
    this.data=data;
    this.index=index;
    this.setBase();
    this.setOthers();
};
Game_QJBullet.prototype.setBase = function() {
    //===============================================
    this.bulletMode = 0;
    this.rotationAuto=this.data.RotationAuto>=0?this.data.RotationAuto*Math.PI/180:-1;
    this.max=this.data.Max;
    this.time = 0;
    this.ReBound=this.data.ReBound;
    this.Bit = this.data.Bit;
    this.moveType = this.data.MoveType;
    //===============================================
    this.z=this.data.z;
    if (this.moveType[0]==9) {
        //===============================================
        this.x = QJ.BL.dealX(this.data.x,null,true);
        this.y = QJ.BL.dealY(this.data.y,null,true);
        if (this.x==null||this.y==null) {
            $gameMap.removeBullet(this.index);
            return;
        }
        //===============================================
    } else {
        this._x=this.data.x+$gameMap.displayX()*48;
        this._y=this.data.y+$gameMap.displayY()*48;
        this.x = this._x;
        this.y = this._y;
    }
    this.anchorX = this.data.AnchorX;
    this.anchorY = this.data.AnchorY;
    //===============================================
    this.bitmap = this.data.Img;
    this.tone = this.data.Tone;
    this.animation=this.data.Anim;
    //===============================================
    this.dead=false;
    this.rememberEvent=[];
    //===============================================
    if (typeof this.data.rTRotation == "string"&&this.data.rTRotation.length>0) {
        this.rTRotationManager={};
        let datas=this.data.rTRotation.split("~");
        for (let i=0,l=datas.length;i<l;i++) {
            let data=datas[i].split("|");
            this.rTRotationManager[Number(data[0])]=Number(data[1])*Math.PI/180;
        }
    }
    //===============================================
    this.target=QJ.BL.dealTarget(this.data.Target);
    this.regions=this.data.Regions;
    this.terrains=this.data.Terrains;
    this.pierce=this.data.Pierce;
    this.deadCount=this.data.DeadCount;
    this.speed = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.action=this.data.Action;
    this.afterImage=this.data.AfterImage;
    if (this.afterImage.length>0) {
        this.afterImage[0] = new QJFrame("afterImageColor",this.afterImage[0],1);
        this.afterImage[1] = new QJFrame("afterImageOpacity",this.afterImage[1],0,true);
        this.afterImage[3] = new QJFrame("afterImageWidth",this.afterImage[3],0,true);
    }
    this.light=this.data.Light;
    this.Particles=QJ.BL.dealParticles(this.data.Particles);
    //===============================================
    this.atkRange=this.data.AtkRange;
    this.DeadAction=this.data.DeadAction;
    this.PierceAction=this.data.PierceAction;
    this.NoCollisionAction=this.data.NoCollisionAction;
    this.DeadAnim=this.data.DeadAnim;
    this.PierceAnim=this.data.PierceAnim;
    this.NoCollisionAnim=this.data.NoCollisionAnim;
    if (typeof this.data.WaitBaseOnSpeed  == "string") {
        this.WaitBaseOnSpeedManager={};
        let datas=this.data.WaitBaseOnSpeed.split("~");
        for (let i=0,l=datas.length;i<l;i++) {
            let data=datas[i].split("|");
            this.WaitBaseOnSpeedManager[Number(data[0])]=Number(data[1]);
        }
        this.WaitBaseOnSpeed=-2;
        this.updateWaitBaseOnSpeed();
    } else this.WaitBaseOnSpeed=this.data.WaitBaseOnSpeed;
    this.LMD=this.data.LMD;
    this.UpdateJS=this.data.UpdateJS.length>0;
    this.MoveJS=this.data.MoveJS.length>0;
    if (this.MoveJS) {
        for (let i=0,il=this.data.MoveJS.length;i<il;i++) {
            this.data.MoveJS[i][3]=this.data.MoveJS[i][1];
            this.data.MoveJS[i][1]=0;
        }
    }
    this.DeadJS=this.data.DeadJS.length>0;
    this.UpdateQT=this.data.UpdateQT.length>0;
    this.MoveQT=this.data.MoveQT.length>0;
    if (this.MoveQT) {
        for (let i=0,il=this.data.MoveQT.length;i<il;i++) {
            this.data.MoveQT[i][3]=this.data.MoveQT[i][1];
            this.data.MoveQT[i][1]=0;
        }
    }
    this.DeadQT=this.data.DeadQT.length>0;
    this.Name=this.data.Name;
    this.noPassDo = this.data.noPassDo;
    //===============================================
};
Game_QJBullet.prototype.setOthers = function() {
    //===============================================
    if (this.data.MoveType[0]==6) {
        this.rM6S = [0,0,0];
        this.RB6S = [1,1];
    }
    //===============================================
    if (typeof this.bitmap == "object") {
        let data=this.bitmap;
        if (data[0]==0) {
            let tar=(data[1]==-1)?$gamePlayer:$gameMap.event(data[1]),sp=null;
            if (!tar) {this.setDirectDead();return;}
            for (let i of SceneManager._scene._spriteset._characterSprites) {
                if (i._character==tar) {sp=i;break;}
            }
            if (!sp) {this.setDirectDead();return;}
            this.bitmap=data.concat([sp.bitmap,sp._frame.x,sp._frame.y,sp._frame.width,sp._frame.height]);
            if (tar.isObjectCharacter()) {
                this.y-=6;
                this._y-=6;
            }
            if (this.anchorY==0) this.anchorY=1;
        } else if (data[0]==1) {
            //文字显示，不需要预处理
        } else $gameMap.removeBullet(this.index);
    }
    //===============================================
    if ([1,2,3,4,7].includes(this.moveType[0])) this.maxRotation = this.moveType[1]*Math.PI/180;
    //===============================================
    if (this.moveType[0]==9) {
        this.rotationMove = QJ.BL.dealInitialRotation(this.data.initialRotation,null,this.x,this.y);
    } else {
        this.rotationMove=this.data.initialRotation;
    }
    this.updateFadeValue();
    //===============================================
    this.rotation=this.rotationMove;
    this.updateImgRotation();
    //===============================================
    this.xyRem=[[this.x,this.y,this.rotationMove]];
    this.collidedCount=0;
    //===============================================
    this.boxType=this.data.CollisionBox;
    this.refreshBox();
    //===============================================
    if (this.data.MoveType[0]==9||this.data.MoveType[0]==8||this.boxType[0]!=0) {
        this.ReBound = 0;
    }
    if (this.ReBound>0) this.ReBound++;
    //===============================================
    QJ.BL.setPostion(this.QJBody,this.x,this.y);
    //===============================================
};
Game_QJBullet.prototype.updateImgRotation = function () {
    if (this.rotationAuto==-1) {
        if (this.moveType[0]==6) {
            this.rotation=this.rM6S[2];
        } else this.rotation=this.rotationMove;
    } else if (this.rotationAuto>=0) {
        if (this.rotationAuto<=Math.PI*2) {
            this.rotation=this.rotationAuto;
        } else {
            this.rotation+=this.rotationAuto-Math.PI*4;
            if (this.rotation<0) this.rotation+=2*Math.PI;
            else if (this.rotation>2*Math.PI) this.rotation-=2*Math.PI;
        }
    }
    if (this.QJBody&&this.QJBody.setAngle) {
        this.QJBody.setAngle(this.rotation);
    }
}
Game_QJBullet.prototype.updateFadeValue = function() {
    let newScaleX = this.data.scaleX.get()/100;
    let newScaleY = this.data.scaleY.get()/100;
    if (this.scaleX!=newScaleX||this.scaleY!=newScaleY) {
        this.scaleX = newScaleX;
        this.scaleY = newScaleY;
        if (this.QJBody) this.refreshBox();
    }
    this.opacity = this.data.Opacity.get();
    if (this.rTRotationManager) {
        let data=this.rTRotationManager[this.time];
        if (typeof data == "number") {
            this.rotate(data,true);
            this.updateImgRotation();
        }
    }
    if ((this.moveType[0]==9||this.moveType[0]==8||this.moveType[0]==6)&&this.xyRem) {
        if (this.xyRem.length>1) {
            let xd = this.xyRem[this.xyRem.length-1][0]-this.xyRem[this.xyRem.length-2][0];
            let yd = this.xyRem[this.xyRem.length-1][1]-this.xyRem[this.xyRem.length-2][1];
            this.updateSpeed(Math.sqrt(xd*xd+yd*yd));
        }
    } else {
        this.updateSpeed(this.data.Speed.get());
    }
};
Game_QJBullet.prototype.rotate = function(value,sign) {
    if (sign) {
        this.rotationMove+=value;
    } else {
        this.rotationMove=value;
    }
    this.updateImgRotation();
    this.updateSpeed();
};
Game_QJBullet.prototype.updateSpeed = function(speed) {
    if (speed==undefined) speed = this.speed;
    if (this.moveType[0]!=5) {
        this.speed = speed;
        this.moveX = speed*Math.sin(this.rotationMove);
        this.moveY = -speed*Math.cos(this.rotationMove);
    }
};
Game_QJBullet.prototype.refreshBox = function() {
    if (this.boxType[0]==0) {
        this.QJBody = QJ.BL.box(this._x,this._y,[
            0,
            this.boxType[1]*this.scaleX
        ]);
    } else if (this.boxType[0]==1) {
        this.QJBody = QJ.BL.box(this._x,this._y,[
            1,
            this.boxType[1]*this.scaleX,
            this.boxType[2]*this.scaleY
        ]);
        this.QJBody.setOffset(
            new SATVector(
                this.boxType[1]*this.scaleX*(0.5-this.anchorX),
                this.boxType[2]*this.scaleY*(0.5-this.anchorY)
            )
        );
    }
    if (this.QJBody.setAngle) this.QJBody.setAngle(this.rotationMove);
};
Game_QJBullet.prototype.boxScreenX = function() {
    return this.x;
}
Game_QJBullet.prototype.boxScreenY = function() {
    return this.y;
}
Game_QJBullet.prototype.screenShowX = function() {
    return this.x - $gameMap.displayX()*48;
}
Game_QJBullet.prototype.screenShowY = function() {
    return this.y - $gameMap.displayY()*48;
}
Game_QJBullet.prototype.showRotation = function() {
    return this.rotation*180/Math.PI;
}
Game_QJBullet.prototype.showRotationMove = function() {
    return this.rotationMove*180/Math.PI;
}
Game_QJBullet.prototype.showRotationLastMove = function(num) {
    if (this.xyRem.length-1-num<0) return this.rotationMove*180/Math.PI;
    return this.xyRem[this.xyRem.length-1-num][2]*180/Math.PI;
}
Game_QJBullet.prototype.screenShowXLast = function(num) {
    if (this.xyRem.length-1-num<0) return this.x - $gameMap.displayX()*48;
    return this.xyRem[this.xyRem.length-1-num][0] - $gameMap.displayX()*48;
}
Game_QJBullet.prototype.screenShowYLast = function(num) {
    if (this.xyRem.length-1-num<0) return this.y - $gameMap.displayY()*48;
    return this.xyRem[this.xyRem.length-1-num][1] - $gameMap.displayY()*48;
}
Game_QJBullet.prototype.updateRotation = function () {
    //===============================================
    if (this.moveType[0]==0) {
        //===============================================
        this.x += this.moveX;
        this.y += this.moveY;
        QJ.BL.setPostion(this.QJBody,this.x,this.y);
        //===============================================
    }
    //===============================================
    if (this.speed>0&&[1,2,3,4,7].includes(this.moveType[0])) {
        //===============================================
        let xy=this.getSpecialTargetXy();
        if (xy[0]==null) {
            this.x += this.moveX;
            this.y += this.moveY;
            QJ.BL.setPostion(this.QJBody,this.x,this.y);
            return;
        }
        //===============================================
        let x=this.x,y=this.y,ex=xy[0],ey=xy[1],ro=QJ.BL.calculateAngleByTwoPoint(x,y,ex,ey);
        let rod=Math.abs(ro-this.rotationMove);
        rod=rod>Math.PI?(Math.PI*2-rod):rod;
        if (rod<=this.maxRotation) this.rotate(ro);
        else {
            let rodp=Math.abs(ro-this.rotationMove-this.maxRotation);
            let rodm=Math.abs(ro-this.rotationMove+this.maxRotation);
            rodp=rodp>Math.PI?(Math.PI*2-rodp):rodp;
            rodm=rodm>Math.PI?(Math.PI*2-rodm):rodm;
            if (rodp>rodm) this.rotate(-this.maxRotation,true);
            else this.rotate(this.maxRotation,true);
        }
        //===============================================
        this.x += this.moveX;
        this.y += this.moveY;
        QJ.BL.setPostion(this.QJBody,this.x,this.y);
        //===============================================
    }
    //===============================================
    if (this.moveType[0]==5) {
        let character=null;
        if (this.moveType[1]==-1) character = $gamePlayer;
        else character = $gameMap.event(this.moveType[1]);
        if (!character) {this.setDirectDead();return;}
        let d = character.direction();
        this.x = character.boxScreenRealX() + this.moveType[d];
        this.y = character.boxScreenRealY() + this.moveType[d+1];
        QJ.BL.setPostion(this.QJBody,this.x,this.y);
    }
    //===============================================
    if (this.moveType[0]==6&&!this.dead) {
        if (this.moveType[4]==0) return;
        let data = this.moveType;
        if (data.length<6) {
            //this.updateSpeed(0);
            data[5]=this.data.initialRotation;
            if (data[5]>=Math.PI) data[2]=Math.PI*2-data[2];
            this.updateMoveType6(data);
        }
        data[6]--;
        let hor=data[14]*data[6]*(data[7]-data[6]);
        let addx=(this.RB6S[0])*data[13]*Math.cos(data[2]);
        let addy=-(this.RB6S[1])*(data[13]*Math.sin(data[2])-data[14]*(data[7]-data[6]));
        if (data[6]<=0) {
            data[4]--;
            this.updateMoveType6(data);
        }
        this.x = this.x+addx;
        this.y = data[4]==0?data[16]:(this.y+addy);
        QJ.BL.setPostion(this.QJBody,this.x,this.y);
        this.rotationMove = QJ.BL.calculateAngleByTwoPoint(0,0,addx,addy);
        this.rM6S = [addx,addy,this.rotationMove];
    }
    //===============================================
    if (this.moveType[0]==8&&!this.dead) {
        let r=this.data.initialRotation,m=this.moveType,t=this.time,xL=0,yL=0,x=0,y=0;
        try{
            if (m[1]==0) {
                xL=-1*Number(eval(m[2]));yL=Number(eval(m[3]));
            } else {
                let length = -1*Number(eval(m[2])),rota=Number(eval(m[3]));
                xL=length*Math.cos(rota);
                yL=length*Math.sin(rota);
            }
        } catch(e) {
            if (showWarn) console.warn("The moveType is wrong.");
            xL=0;
            yL=0;
        }
        if (!xL&&xL!=0) {xL=0;if (showWarn) console.warn("The moveType is wrong.");}
        if (!yL&&yL!=0) {yL=0;if (showWarn) console.warn("The moveType is wrong.");}
        let oldX = this.x,oldY = this.y;
        this.x = xL*Math.sin(r)+ yL*Math.sin(r+Math.PI/2)+this._x;
        this.y = -xL*Math.cos(r)-yL*Math.cos(r+Math.PI/2)+this._y;
        this.rotationMove = QJ.BL.calculateAngleByTwoPoint(oldX,oldY,this.x,this.y);
        QJ.BL.setPostion(this.QJBody,this.x,this.y);
    }
    //===============================================
    if (this.moveType[0]==9) {
        //===============================================
        this.x = QJ.BL.dealX(this.data.x,null,true) + $gameMap.displayX()*48;
        this.y = QJ.BL.dealY(this.data.y,null,true) + $gameMap.displayY()*48;
        if (this.x==null||this.y==null) {
            this.setDirectDead();
            return;
        } else {
            this.rotationMove = QJ.BL.dealInitialRotation(this.data.initialRotation,null,this.x,this.y);
            QJ.BL.setPostion(this.QJBody,this.x,this.y);
        }
        //===============================================
    }
    //===============================================
    this.updateImgRotation();
    //===============================================
}
Game_QJBullet.prototype.updateMoveType6 = function(data) {
    //1一倍宽度,2发射角度,3一倍时间,4次数
    data[6]=data[3]*data[4];//时间
    data[7]=data[6];
    data[8]=data[1]*data[4];//宽度
    data[9]=this.x+data[8]*Math.sin(data[5]);
    data[10]=this.y-data[8]*Math.cos(data[5]);
    data[11]=data[8]*Math.sin(data[5])/data[7];
    data[12]=-data[8]*Math.cos(data[5])/data[7];
    data[13]=data[8]*Math.sin(data[5])/data[7]/Math.cos(data[2]);//v
    data[14]=2/(data[7]*data[7])*(data[13]*Math.sin(data[2])*data[7]-data[8]*Math.cos(data[5]));//g
    data[15]=this.x;
    data[16]=this.y;
};
Game_QJBullet.prototype.updateWaitBaseOnSpeed = function() {
    if (this.WaitBaseOnSpeedManager) {
        let data=this.WaitBaseOnSpeedManager[this.time];
        if (typeof data == "number") this.WaitBaseOnSpeed=data;
    }
};
Game_QJBullet.prototype.getSpecialTargetXy = function () {
    let character=null;
    if (this.moveType[0]==1) 
        character=$gamePlayer;
    if (this.moveType[0]==2||this.moveType[0]==3) 
        character=$gameMap.event(this.moveType[2]);
    if (this.moveType[0]==4) 
        character=$gameMap.event(QJ.BL.getMinEventId(this.x,this.y,this.moveType[2]));
    if (this.moveType[0]==7) 
        character=$gameMap.event(QJ.BL.getMinEventIdNobi(this.x,this.y,this.moveType[2]));
    if (character) {
        return [character.boxScreenX(),character.boxScreenY()];
    } else {
        return [null,null];
    }
}
Game_QJBullet.prototype.backToLastXYR = function () {
    let last = this.xyRem.pop();
    this.x = last[0];
    this.y = last[1];
    this.rotationMove = last[2];
    QJ.BL.setPostion(this.QJBody,this.x,this.y);
}
//===============================================================
Game_QJBullet.prototype.destroy = function() {

};
//===============================================================
Game_QJBullet.prototype.update = function () {
    //console.time("bulletUpdate");
    //=======================
    if (this.dead) {
        if (this.deadMode==3) {
            if (this.delayDelete>0) {
                this.delayDelete--;
            } else {
                $gameMap.removeBullet(this.index);
                return;
            }
        }
        if (this.perFade==undefined) {
            if (this.deadCount<=0) this.opacity=0;
            else this.perFade=Math.max(this.opacity/this.deadCount,1);
        } else this.opacity-=this.perFade;
        return;
    }
    //===============================================================
    if (this.LMD) {
        if (this.x>$gameMap.maxScreenWidth||this.x<0||this.y<0||this.y>$gameMap.maxScreenHeight) {
            this.setDirectDead();
            return;
        }
    }
    //=======================
    this.updateWaitBaseOnSpeed();
    this.updateFadeValue();
    this.updateRotation();
    //=======================
    if (this.UpdateJS) eval(this.data.UpdateJS);
    if (this.MoveJS) {
        for (let i=0,il=this.data.MoveJS.length;i<il;i++) {
            if (this.data.MoveJS[i][0]<=0) {
                if (this.data.MoveJS[i][1]<=0) {
                    eval(this.data.MoveJS[i][2]);
                    this.data.MoveJS[i][1] = this.data.MoveJS[i][3];
                } else this.data.MoveJS[i][1]--;
            } else this.data.MoveJS[i][0]--;
        }
    }
    if (this.UpdateQT) this.QuickText(this.data.UpdateQT);
    if (this.MoveQT) {
        for (let i=0,il=this.data.MoveQT.length;i<il;i++) {
            if (this.data.MoveQT[i][0]<=0) {
                if (this.data.MoveQT[i][1]<=0) {
                    this.QuickText(this.data.MoveQT[i][2]);
                    this.data.MoveQT[i][1] = this.data.MoveQT[i][3];
                } else this.data.MoveQT[i][1]--;
            } else this.data.MoveQT[i][0]--;
        }
    }
    //=======================
    if (this.dead) return;
    //=======================
    if (!this.Bit) this.updateCollision();
    //=======================
    this.xyRem.push([this.x,this.y,this.rotationMove]);
    //=======================
    this.time++;
    switch(this.max[0]) {
        case 0:if (this.time>=this.max[1]) {this.setDeadDisappear();break;}
        case 1:if ($gameSelfSwitches.value([this.max[1],this.max[2],this.max[3]])==this.max[4]) {this.setDeadDisappear();break;}
        case 2:if ($gameSwitches.value(this.max[1])==this.max[2]) {this.setDeadDisappear();break;}
        case 3:if (!!eval(this.max[1])==this.max[2]) {this.setDeadDisappear();break;}
    }
    //=======================
    //console.timeEnd("bulletUpdate");
}
//===============================================================
Game_QJBullet.prototype.actionAndDead = function (character) {
    if (this.dead) return;
    //打击到敌人后消失
    if (this.rememberEvent.indexOf(character)!=-1) return;
    this.pierce-=1;
    this.rememberEvent.push(character);
    if (this.PierceAction||this.pierce<0) this.setAction(character);
    if (this.PierceAnim||this.pierce<0) this.requestAnimationQJB();
    if (this.pierce<0) {
        this.dead=true;
        this.deadMode = 0;
        this.startDeadQTJS(this.deadMode);
    }
}
Game_QJBullet.prototype.setDead = function () {
    if (this.dead) return;
    //碰到障碍后消失
    this.dead=true;
    this.deadMode = 1;
    if (this.DeadAction) this.setAction();
    if (this.DeadAnim) this.requestAnimationQJB();
    this.startDeadQTJS(this.deadMode);
}
Game_QJBullet.prototype.setDeadDisappear = function () {
    if (this.dead) return;
    //到时间后消失
    this.dead=true;
    this.deadMode = 2;
    if (this.NoCollisionAction) this.setAction();
    if (this.NoCollisionAnim) this.requestAnimationQJB();
    this.startDeadQTJS(this.deadMode);
}
Game_QJBullet.prototype.setDirectDead = function () {
    if (this.dead) return;
    //直接中断子弹
    this.dead=true;
    this.deadMode = 3;
    this.startDeadQTJS(this.deadMode);
}
Game_QJBullet.prototype.startDeadQTJS = function (deadMode) {
    if (this.DeadJS) eval(this.data.DeadJS);
    if (this.DeadQT) this.QuickText(this.data.DeadQT);
    if (this.afterImage.length>0) {
        this.delayDelete = this.afterImage[2];
        this.opacity = 0;
    }
}
Game_QJBullet.prototype.QuickText = function(id) {
    if (!PresetText[String(id)]) {
        console.log("id为"+id+"的预设不存在。");
        return;
    }
    PresetText[id].call(this);
}
Game_QJBullet.prototype.setAction = function (character) {
    if (this.atkRange>0) this.atkRangeTarget(character);
    else {QJ.BL.startAction(this,character);}
}
Game_QJBullet.prototype.requestAnimationQJB = function () {
    let sprite = $gameMap.findBulletSprite(this);
    if (sprite) {
        sprite.startAnimation($dataAnimations[Number(this.animation)], false, 0);
    }
}
Game_QJBullet.prototype.atkRangeTarget = function (character) {
    let index=this.target.indexOf(character),xs=this.x,ys=this.y,atkPow=Math.pow(this.atkRange,2);
    if (index!=-1) this.target.splice(index,1);
    for (let i=0;i<this.target.length;i++) {
        let tar=this.target[i]==0?$gamePlayer:$gameMap.event(this.target[i]);
        if (!tar) continue;
        if (Math.pow(xs-tar.boxScreenX(),2)+Math.pow(ys-tar.boxScreenY(),2)<=atkPow) {
            QJ.BL.startAction(this,tar);
        }
    }
}
Game_QJBullet.prototype.JudgeReBound = function (sat,tb,cb) {
    if (this.ReBound<1) {
        this.setDead();
        return true;
    } else {
        this.ReBound--;
        this.x -= Math.sign(sat.overlapV.x)*(Math.abs(sat.overlapV.x)+4);
        this.y -= Math.sign(sat.overlapV.y)*(Math.abs(sat.overlapV.y)+4);
        QJ.BL.setPostion(this.QJBody,this.x,this.y);
        if (this.moveType[0]==6) {
            //====================================
            let tbp=tb.pos,cbp=cb.pos;
            let du = QJ.BL.calculateAngleByTwoPoint(cbp.x,cbp.y,tbp.x,tbp.y);
            if (du<cb.dl) this.RB6S[1]=this.RB6S[1]==-1?1:-1;
            else if (du<Math.PI-cb.dl) this.RB6S[0]=this.RB6S[0]==-1?1:-1;
            else if (du<Math.PI+cb.dl) this.RB6S[1]=this.RB6S[1]==-1?1:-1;
            else if (du<2*Math.PI-cb.dl) this.RB6S[0]=this.RB6S[0]==-1?1:-1;
            else this.RB6S[1]=this.RB6S[1]==-1?1:-1;
            //====================================
        } else {
            //====================================
            this.updateSpeed(this.speed);
            let oldR = this.rotationMove,tbp=tb.pos,cbp=cb.pos;
            let du = QJ.BL.calculateAngleByTwoPoint(cbp.x,cbp.y,tbp.x,tbp.y);
            if (du<cb.dl) this.rotationMove=Math.PI-oldR;
            else if (du<Math.PI-cb.dl) this.rotationMove=-oldR;
            else if (du<Math.PI+cb.dl) this.rotationMove=Math.PI-oldR;
            else if (du<2*Math.PI-cb.dl) this.rotationMove=-oldR;
            else this.rotationMove=Math.PI-oldR;
            if (this.rotationMove>2*Math.PI) this.rotationMove-=2*Math.PI;
            if (this.rotationMove<0) this.rotationMove+=2*Math.PI;
            //====================================
        }
        this.updateImgRotation();
        //====================================
        return false;
        //====================================
    }
}
Game_QJBullet.prototype.updateCollision = function () {
    //console.time("collidedTime");
    //===============================================================
    if (this.noPassDo) {
        if ($gameMap.noPassBoxNow(Math.floor(this.x),Math.floor(this.y))) {
            this.setDead();
            return;
        }
    }
    //===============================================================
    for (let i=0,l=this.regions.length;i<l;i++) {
        let list=$gameMap._regionBox[this.regions[i]];
        if (!list) continue;
        for (let j=0,jl=list.length;j<jl;j++) {
            let sat = QJ.BL.judge(this.QJBody,list[j]);
            if (sat.result&&this.JudgeReBound(sat,this.QJBody,list[j])) return;
        }
    }
    //===============================================================
    for (let i=0,l=this.terrains.length;i<l;i++) {
        let list=$gameMap._terrainBox[this.terrains[i]];
        if (!list) continue;
        for (let j=0,jl=list.length;j<jl;j++) {
            let sat = QJ.BL.judge(this.QJBody,list[j]);
            if (sat.result&&this.JudgeReBound(sat,this.QJBody,list[j])) return;
        }
    }
    //===============================================================
    if (this.WaitBaseOnSpeed==-1) return;
    if (this.WaitBaseOnSpeed>=0&&this.speed!=this.WaitBaseOnSpeed) return;
    this.target=QJ.BL.dealTarget(this.data.Target);
    //===============================================================
    if (this.target.length==0) return;
    //===============================================================
    for (let i=0,l=this.target.length;i<l;i++) {
        let character=QJ.BL.dealCharacter(this.target[i]);
        if (!character) continue;
        if (QJ.BL.judge(this.QJBody,character.QJBody).result) {
            this.actionAndDead(character);
            if (this.dead) break;
            continue;
        }
        let index=this.rememberEvent.indexOf(character);
        if (index!=-1) this.rememberEvent.splice(index,1);
    }
    //===============================================================
    //console.timeEnd("collidedTime");
}
Game_QJBullet.prototype.colliedWith = function (id) {
    //===============================================================
    let character=QJ.BL.dealCharacter(id);
    if (!character) return;
    return QJ.BL.judge(this.QJBody,character.QJBody).result;
    //===============================================================
}
//=============================================================================
//Sprite_QJBullet
//=============================================================================
function Sprite_QJBullet() {
    this.initialize.apply(this, arguments);
};
Sprite_QJBullet.prototype = Object.create(Sprite_Base.prototype);
Sprite_QJBullet.prototype.constructor = Sprite_QJBullet;
Sprite_QJBullet.prototype.initialize = function(index) {
    Sprite_Base.prototype.initialize.call(this);
    this.o=$gameMap.bullet(index);
    this.opacity=this.o.opacity;
    this.setColorTone(this.o.tone);
    if (typeof this.o.bitmap == "string") {
        this.TarBitmap = null;
        let frameImage=this.o.bitmap.match(/\[[^\]]*\]/i);
        if (frameImage){
            let data=eval(frameImage[0]);
            ImageManager.loadBullet(this.o.bitmap).addLoadListener((bit)=>{
                if (this.o.dead) return;
                this.TarBitmap=bit;
                this.dymaticBitmap=[0,Number(data[0]),bit.width/Number(data[0]),0,Number(data[1]),bit.height];
            });
        } else ImageManager.loadBullet(this.o.bitmap).addLoadListener((bit)=>{
            if (this.o.dead) return;
            this.TarBitmap=bit;
        });
    } else if (typeof this.o.bitmap == "object") {
        let data=this.o.bitmap;
        if (data[0]==0) {
            this.bitmap=data[2];
            this.setFrame(data[3],data[4],data[5],data[6]);
        }
        if (data[0]==1) {
            //[1,文字内容,文字颜色,文字字号,4文字排列方式,文本子弹最大宽度,文本子弹最大高度,7描边颜色,8描边粗细]
            let mw = data[5],mh = data[6];
            if (data[4]==0) this.bitmap=new Bitmap(mw,mh);
            else this.bitmap=new Bitmap(mh,mw);
            this.bitmap.fontSize = Number(data[3]);
            if (typeof data[2] === "object") {
                this.bitmap.textColor = QJ.BL.ColorGrad(this.bitmap,data[2][0],0,0,mw,mh,data[2][1]*Math.PI/180);
            } else this.bitmap.textColor = data[2];
            this.bitmap.fontItalic = false;
            if (typeof data[7] === "object") {
                this.bitmap.outlineColor = QJ.BL.ColorGrad(this.bitmap,data[7][0],0,0,mw,mh,data[7][1]*Math.PI/180);
            } else this.bitmap.outlineColor = data[7];
            this.bitmap.outlineWidth = data[8];
            if (data[4]==0) this.bitmap.drawText(data[1],0,0,mw,mh,"center");
            else if (data[4]==1) this.bitmap.drawTextVerticalRow(data[1],0,0,mw,mh,"center");
            //else if (data[4]==1) this.bitmap.drawTextChangeRotation(data[1],0,0,mw,mh,"center",90*Math.PI/180);
        }
        if (data[0]==2) {
            this.bitmap=ImageManager.loadSystem('IconSet');
            this.setIconIndexFrame(data[1]);
        }
    }
    this.QJParentid=""+this.o.bitmap;
    this.updateBaseData();
};
Sprite_QJBullet.prototype.setIconIndexFrame = function(index) {
    var pw = 32;
    var ph = 32;
    var sx = index % 16 * pw;
    var sy = Math.floor(index / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
}
Sprite_QJBullet.prototype.refresDymaticBitmap = function() {
    let dB = this.dymaticBitmap;
    dB[3]++;
    if (dB[3]==dB[4]) {
        dB[3]=0;
        dB[0]++;
        if (dB[0]==dB[1]) dB[0]=0;
        this.setFrame(dB[0]*dB[2],0,dB[2],dB[5]);
    }
}
Sprite_QJBullet.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    //========================================
    this.updateBaseData();
    if (!this.o.dead) this.updateParticles();
    //========================================
    if (this.dymaticBitmap) this.refresDymaticBitmap();
    //========================================
    if (this.o.deadMode==3) return;
    if (this.o.dead) {
        if (this.o.opacity<=5) {
            if (!this.isAnimationPlaying()&&this.children.length<=0) {
                if (this.o.delayDelete>0) {
                    this.o.delayDelete--;
                } else {
                    $gameMap.removeBullet(this.o.index);
                    return;
                }
            }
        }
    }
    //========================================
    if (!this.bitmap) {
        if (this.TarBitmap) {
            this.bitmap = this.TarBitmap;
            let dB = this.dymaticBitmap;
            if (dB) this.setFrame(dB[0]*dB[2],0,dB[2],dB[5]);
        } else return;
    }
    //========================================
};
Sprite_QJBullet.prototype.updateafterImage = function() {
    let afterImage = this.o.afterImage;
    if (afterImage.length>0) {
        //[颜色,初始不透明度,最大存在时间,宽度]
        //console.log(afterImage);
        let value = afterImage[0].get(),initO,initODe;
        if (!afterImage[1].isMode) {
            initO=afterImage[1].get()/255;
            initODe = 0;
            if (this.o.delayDelete>=0) initODe = (afterImage[2] - this.o.delayDelete)/afterImage[2]*initO;
        } else initODe = (1-(afterImage[2] - this.o.delayDelete)/afterImage[2]);
        if (value&&this.o.time>2) {
            let w=0;
            for (let ll=this.o.xyRem,i=ll.length-1,il=Math.max(0,i-afterImage[2]),mu=i-il,
                dx48=$gameMap.displayX()*48-48,dy48=$gameMap.displayY()*48,newO,newx,newy,
                gw=Graphics.width+96,gh=Graphics.height+96;i>il;i--) {
                w=afterImage[3].getTar(ll.length-1-i);
                if (!afterImage[3].isMode) w=w||this.width;
                if (!ll[i][3]) {
                    ll[i][3]=1;//原用于储存宽度，已抛弃。用1是为了防止多次更新。
                    ll[i][4]=Math.sqrt(
                        (ll[i][0]-ll[i-1][0])*(ll[i][0]-ll[i-1][0])+
                        (ll[i][1]-ll[i-1][1])*(ll[i][1]-ll[i-1][1]));
                    ll[i][5]=value;
                }
                if (afterImage[1].isMode) {
                    if (this.o.delayDelete>=0)  newO = afterImage[1].getTar(ll.length-1-i)/255*initODe;
                    else newO = afterImage[1].getTar(ll.length-1-i)/255;
                } else {
                    newO = (i-il)/mu*initO - initODe;
                }
                newx = ll[i][0]-dx48;
                newy = ll[i][1]-dy48;
                if (newO>0&&(newy>-48&&newy<gh&&newx>-48&&newx<gw)) {
                    this.particleParent.drawAfterImage(newx,newy,ll[i][2],ll[i][5],newO,w,
                        this.o.moveType[0]==6?(ll[i][4]+1):ll[i][4]);
                }
            }
        }
    }
}
Sprite_QJBullet.prototype.updateParticles = function() {
    for (let i of this.o.Particles) {
        if (!i) continue;
        if (i.count==0) {
            let bitmap = ImageManager.loadBullet(i.img);
            if (!bitmap.isReady()) continue;
            for (let j=i.num;j>0;j--) {
                this.particleParent.addChildrenAtId(new Sprite_QJY(this,[2,i],this.o));
            }
            i.count = i.wait;
        } else i.count--;
    }
}
Sprite_QJBullet.prototype.updateBaseData = function() {
    this.x=this.o.screenShowX();
    this.y=this.o.screenShowY();
    this.rotation=this.o.rotation;
    this.scale.x = this.o.scaleX;
    this.scale.y = this.o.scaleY;
    this.anchor.x=this.o.anchorX;
    this.anchor.y=this.o.anchorY;
    this.opacity=this.o.opacity;
};
//=============================================================================
//Sprite_QJY
//=============================================================================
function Sprite_QJY() {
    this.initialize.apply(this, arguments);
};
Sprite_QJY.prototype = Object.create(PIXI.Sprite.prototype);
Sprite_QJY.prototype.constructor = Sprite_QJY;
Sprite_QJY.prototype.initialize = function(parent,data,buttle) {
    if (data[0]==1) this.QJParentid="qjy1"+Math.floor(data[5])+Math.floor(data[6])+data[7];
    else if (data[0]==2) this.QJParentid="qjy2"+data[1].img;
    this.baseTexture = textureSave[this.QJParentid]?
        textureSave[this.QJParentid]:this.createTexture(data);
    this.textureData = this.baseTexture?(new PIXI.Texture(this.baseTexture,new PIXI.Rectangle(0,0,0,0))):null;
    PIXI.Sprite.call(this,this.textureData);
    this.rotation = buttle.rotationMove;
    this.bitType = data[0];
    if (this.bitType==1) {
        if (buttle.moveType[0]==6) this.rotation = buttle.rM6S[2];
        else if (buttle.moveType[0]==5||buttle.moveType[0]==8) this.rotation = buttle.rotationMove;
        else this.rotation = parent.rotation;
        this._x=parent.x+$gameMap.displayX()*48;
        this._y=parent.y+$gameMap.displayY()*48;
        //=======================================
        this.opacity = data[4];
        this.perFade=Math.max(this.opacity/data[3],1);
        this.time=data[2];
        this.setFrame(0,0,data[5],data[6]);
    } else if (this.bitType==2) {
        this.data = data[1];
        this._x=parent.x+
            eval(this.data.offsetX)*Math.cos(parent.rotation)-
            eval(this.data.offsetY)*Math.sin(parent.rotation)+
            $gameMap.displayX()*48;
        this._y=parent.y+
            eval(this.data.offsetY)*Math.cos(parent.rotation)-
            eval(this.data.offsetX)*Math.sin(parent.rotation)+
            $gameMap.displayY()*48;
        this.rotation = parent.rotation + this.data.dir + Math.random()*this.data.dirOffset*2 - this.data.dirOffset;
        //=======================================
        this.opacity = ((this.data.opacityMax-this.data.opacityMin)*Math.random()+this.data.opacityMin)*255;
        this.perFade=Math.max(this.opacity/this.data.deadCount,1);
        this.time=this.data.max;
        this.sizeManager = [0,10,((this.data.scaleMax-this.data.scaleMin)*Math.random()+this.data.scaleMin)/10];
        this.setScale(this.sizeManager[0]*this.sizeManager[2]);
        let frameImage=this.data.img.match(/\[[^\]]*\]/i);
        if (frameImage){
            let data=eval(frameImage[0]);
            this.dymaticBitmap=[0,Number(data[0]),this.baseTexture.width/Number(data[0]),0,Number(data[1]),this.baseTexture.height];
            this.setFrame(this.dymaticBitmap[0]*this.dymaticBitmap[2],0,this.dymaticBitmap[2],this.dymaticBitmap[5]);
        } else this.setFrame(0,0,this.baseTexture.width,this.baseTexture.height);
        if (this.data.moveType.includes(";")) {
            this.mTFT=0;
            let d = this.data.moveType;
            if (d.substr(d.length-4)=="*t;0") {
                this.lineMove = true;
                this.moveType = [-Math.sin(this.rotation)*eval(d.substr(0,d.length-4)),
                    Math.cos(this.rotation)*eval(d.substr(0,d.length-4))];
            } else this.moveType=d.split(";");
        } else {
            this.mTFT=1;
            let d = this.data.moveType;
            if (d.substr(d.length-4)=="*t|0") {
                this.lineMove = true;
                this.moveType = [-Math.sin(this.rotation)*eval(d.substr(0,d.length-4)),
                    Math.cos(this.rotation)*eval(d.substr(0,d.length-4))];
            } else this.moveType=d.split("|");
        }
        if (this.moveType.length!=2) {
            this.moveTypeWrong();
            this.data.moveType=[0,0];
        }
    } 
    this.anchor.set(0.5,0.5);
    this.updateBaseData();
    numberQJY++;
};
Sprite_QJY.prototype.moveTypeWrong = function() {
    if (showWarn) console.warn("The moveType "+this.data.moveType+" of particle is wrong.");
}
Sprite_QJY.prototype.update = function() {
    this.updateBaseData();
    if (this.time<=0) {
        this.opacity-=this.perFade;
        if (this.opacity<=0) {
            this.parent.removeChild(this);
            numberQJY--;
            this.destroy();
            return;
        }
    }
    this.time--;
};
Sprite_QJY.prototype.setFrame = function(x,y,w,h) {
    this.textureData.frame = new PIXI.Rectangle(
        Math.floor(x),Math.floor(y),Math.floor(w),Math.floor(h));
};
Sprite_QJY.prototype.setScale = function(size) {
    this.scale = new PIXI.ObservablePoint(null,null,size,size);
};
Sprite_QJY.prototype.updateBaseData = function() {
    if (this.bitType==1) {
        this.alpha = this.opacity/255;
        this.x=this._x-$gameMap.displayX()*48;
        this.y=this._y-$gameMap.displayY()*48;
    } else if (this.bitType==2) {
        //=============================================
        if (this.sizeManager[0]<this.sizeManager[1]) {
            this.sizeManager[0]++;
            this.setScale(this.sizeManager[0]*this.sizeManager[2]);
        }
        //=============================================
        this.alpha = this.opacity/255;
        //=============================================
        if (this.lineMove) {
            let m=this.moveType,t=this.data.max-this.time;
            this.x=m[0]*t+this._x-$gameMap.displayX()*48;
            this.y=m[1]*t+this._y-$gameMap.displayY()*48;
        } else {
            let r=this.rotation,m=this.moveType,t=this.data.max-this.time,xL=0,yL=0;
            try{
                if (this.mTFT==0) {
                    xL=-1*Number(eval(m[0]));yL=Number(eval(m[1]));
                } else {
                    let length = -1*Number(eval(m[0])),rota=Number(eval(m[1]));
                    xL=length*Math.cos(rota);
                    yL=length*Math.sin(rota);
                }
            } catch(e) {
                this.moveTypeWrong();
                xL=0;
                yL=0;
            }
            if (!xL&&xL!=0) {xL=0;this.moveTypeWrong();}
            if (!yL&&yL!=0) {yL=0;this.moveTypeWrong();}
            this.x=xL*Math.sin(r)+ yL*Math.sin(r+Math.PI/2)+this._x-$gameMap.displayX()*48;
            this.y=-xL*Math.cos(r)-yL*Math.cos(r+Math.PI/2)+this._y-$gameMap.displayY()*48;
        }
        //=============================================
        let db = this.dymaticBitmap;
        if (db) {
            db[3]++;
            if (db[3]==db[4]) {
                db[3]=0;
                db[0]++;
                if (db[0]==db[1]) db[0]=0;
                this.setFrame(db[0]*db[2],0,db[2],db[5]);
            }
        }
        //=============================================
    }
};
Sprite_QJY.prototype.createTexture = function(data) {
    let lsCanvas = document.createElement('canvas');
    let lscontext = lsCanvas.getContext('2d');
    let lsBaseTexture = null;
    if (data[0]==1) {
        lsCanvas.width = data[5];
        lsCanvas.height = data[6];
        lsBaseTexture = new PIXI.BaseTexture(lsCanvas);
        lsBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        lsBaseTexture.width = data[5];
        lsBaseTexture.height = data[6];
        lscontext.save();
        lscontext.fillStyle = data[7];
        lscontext.fillRect(0,0,data[5],data[6]);
        lscontext.restore();
    } else if (data[0]==2) {
        let bitmap = ImageManager.loadBullet(data[1].img),w=bitmap.width,h=bitmap.height;
        lsCanvas.width = w;
        lsCanvas.height = h;
        lsBaseTexture = new PIXI.BaseTexture(lsCanvas);
        lsBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        lsBaseTexture.width = w;
        lsBaseTexture.height = h;
        lscontext.globalCompositeOperation = 'source-over';
        lscontext.drawImage(bitmap._canvas,0,0,w,h,0,0,w,h);
    }
    lsBaseTexture.update();
    textureSave[this.QJParentid] = lsBaseTexture;
    return lsBaseTexture;
};
//=============================================================================
//Game_QJLaser
//=============================================================================
Game_QJLaser.prototype.initialize = function(data,index) {
    this.data=data;
    this.index=index;
    this.setBase();
};
Game_QJLaser.prototype.orginX = function() {
    return this.x+$gameMap.displayX()*48;
};
Game_QJLaser.prototype.orginY = function() {
    return this.y+$gameMap.displayY()*48;
};
Game_QJLaser.prototype.setBase = function() {
    //===============================================
    this.bulletMode = 1;
    this.z=this.data.z;
    this.rotationAuto = (this.data.RotationAuto-360)*Math.PI/180;
    //===============================================
    this.dead=false;//此子弹开始死亡，死亡后播放完动画且淡出后才真正消失。
    this.rememberEvent=[];//穿透时一个敌人只攻击一次，移出后才删除
    this.target=null;
    this.regions=this.data.Regions;
    this.terrains=this.data.Terrains;
    this.deadCount=this.data.DeadCount;
    this.action=this.data.Action;
    //===============================================
    this.rotation=this.data.initialRotation;
    this.lineList = [];
    //===============================================
    this.name=this.data.name;
    this.updateWait = [this.data.AtkWait,this.data.AtkWait];
    this.ReBound=this.data.ReBound+1;
    this.max = this.data.Max;
    this.time = 0;
    this.noPassDo = this.data.noPassDo;
    if (this.data.UpdateJS.length>0) this.UpdateJS = true;
    this.updateFadeValue();
    this.updateXYR(true);
};
Game_QJLaser.prototype.updateFadeValue = function() {
    this.opacity = this.data.Opacity.get();
    this.atkWidth = this.data.Width.get();
    this.scaleX = this.data.ScaleX.get()/100;
    this.MaxLength = this.data.MaxLength.get();
};
Game_QJLaser.prototype.updateXYR = function(ifInit) {
    try{
        this.x = QJ.BL.dealX(this.data.x,null,true);
        this.y = QJ.BL.dealY(this.data.y,null,true);
        if (this.data.RotationAuto==-1||ifInit) {
            this.rotation = QJ.BL.dealInitialRotation(
                this.data.initialRotation,null,this.x,this.y);
        } else if (this.data.RotationAuto>0) {
            this.rotation+=this.rotationAuto;
        }
    } catch(e) {
        this.setDead();
        return;
    }
    this.lineList=[[this.x,this.y,this.rotation]];
    //console.time("bulletUpdate");
    for (let i=0,il=this.lineList,
        j=1,rbnum=0,
        x,y,
        lastX=-1,lastY=-1,
        dx=$gameMap.displayX(),dy=$gameMap.displayY(),
        w=Math.sin(this.rotation),h=-Math.cos(this.rotation);
        rbnum<this.ReBound;j++) {
        if (j>=this.MaxLength) {
            this.lineList.push([il[i][0]+j*w,il[i][1]+j*h,0]);
            break;
        }
        x=Math.floor((il[i][0]+j*w)/48+dx);
        y=Math.floor((il[i][1]+j*h)/48+dy);
        if (lastX==x&&lastY==y) continue;
        else {lastX=x;lastY=y;}
        //判断是否为反弹点
        if (!(this.regions.includes($gameMap.regionId(x,y))||
            this.terrains.includes($gameMap.terrainTag(x,y))||
            (this.noPassDo&&!$gameMap.noPassBoxNow(x,y)))) continue;
        //找到对应格子的中心点
        x=(x-dx)*48+24;
        y=(y-dy)*48+24;
        let k=Math.tan(il[i][2]-Math.PI/2),b=il[i][1]-k*il[i][0];
        let judgeLsit;
        if (il[i][0]<=x+24&&il[i][0]>=x-24) {
            if (il[i][1]<y) judgeLsit=[8];
            else judgeLsit=[2];
        } else if (il[i][1]<=y+24&&il[i][1]>=y-24) {
            if (il[i][0]<x) judgeLsit=[4];
            else judgeLsit=[6];
        } else if (il[i][0]<x-24&&il[i][1]<y-24) {
            judgeLsit=[4,8];
        } else if (il[i][0]>x+24&&il[i][1]<y-24) {
            judgeLsit=[6,8];
        } else if (il[i][0]<x-24&&il[i][1]>y+24) {
            judgeLsit=[2,4];
        } else if (il[i][0]>x+24&&il[i][1]>y+24) {
            judgeLsit=[2,6];
        } else {
            this.lineList.push(il[i]);
            break;
        }
        let tx=-1,ty=-1,ro;
        for (let d=0;d<judgeLsit.length;d++) {
            if (judgeLsit[d]==2) {
                ty=y+24;
                tx=(ty-b)/k;
                ro=Math.PI-il[i][2];
                if (Math.abs(tx-x)<=24) break;
            } else if (judgeLsit[d]==4) {
                tx=x-24;
                ty=k*tx+b;
                ro=2*Math.PI-il[i][2];
                if (Math.abs(ty-y)<=24) break;
            } else if (judgeLsit[d]==6) {
                tx=x+24;
                ty=k*tx+b;
                ro=2*Math.PI-il[i][2];
                if (Math.abs(ty-y)<= 24) break;
            } else if (judgeLsit[d]==8) {
                ty=y-24;
                tx=(ty-b)/k;
                ro=Math.PI-il[i][2];
                if (Math.abs(tx-x)<=24) break;
            }
        }
        if (tx==-1&&ty==-1) {
            throw new Error("出错");
        }
        this.lineList.push([tx,ty,ro]);
        w=Math.sin(ro);
        h=-Math.cos(ro);
        i++;
        j=1;
        rbnum++;
    }
    //console.timeEnd("bulletUpdate");
};
Game_QJLaser.prototype.update = function () {
    //=======================
    if (this.dead) {
        if (this.deadCount==0) {
            $gameMap.removeBullet(this.index);
        } else {
            this.opacity-=this.perFade;
            if (this.opacity<=5) $gameMap.removeBullet(this.index);
        }
        return;
    }
    this.time++;
    switch(this.max[0]) {
        case 0:if (this.time>=this.max[1]) {this.setDead();break;}
        case 1:if ($gameSelfSwitches.value([this.max[1],this.max[2],this.max[3]])==this.max[4]) {this.setDead();break;}
        case 2:if ($gameSwitches.value(this.max[1])==this.max[2]) {this.setDead();break;}
        case 3:if (!!eval(this.max[1])==this.max[2]) {this.setDead();break;}
    }
    //=======================
    this.updateFadeValue();
    if (this.updateWait[0]==0) {
        this.updateAtk();
        this.updateWait[0]=this.updateWait[1];
    } else this.updateWait[0]--;
    if (this.UpdateJS) eval(this.data.UpdateJS);
    //=======================
}
Game_QJLaser.prototype.updateAtk = function() {
    this.target=QJ.BL.dealTarget(this.data.Target);
    let judgeBody=null;
    for (let ll=this.lineList,i=0,il=ll.length-1;i<il;i++) {
        let len=Math.sqrt((ll[i][0]-ll[i+1][0])*(ll[i][0]-ll[i+1][0])+
            (ll[i][1]-ll[i+1][1])*(ll[i][1]-ll[i+1][1]));
        if (len<=2) continue;
        judgeBody = QJ.BL.box(
            (ll[i][0]+ll[i+1][0])/2+$gameMap.displayX()*48,
            (ll[i][1]+ll[i+1][1])/2+$gameMap.displayY()*48,
            [1,this.atkWidth,len+2]);
        //+2是为了让激光能打到这条支线的末端点处的反弹事件。
        judgeBody.setAngle(QJ.BL.calculateAngleByTwoPoint(
            ll[i][0],ll[i][1],
            ll[i+1][0],ll[i+1][1]));
        //=============================
        for (let i=0,l=this.target.length;i<l;i++) {
            let character=QJ.BL.dealCharacter(this.target[i]);
            if (!character||!character.QJBody) continue;
            if (QJ.BL.judge(judgeBody,character.QJBody).result) {
                QJ.BL.startAction(this,character);
                continue;
            }
            let index=this.rememberEvent.indexOf(character);
            if (index!=-1) this.rememberEvent.splice(index,1);
        }
        //QJ.BL.sprite.aBody(judgeBody);
        //=============================
    }
};
Game_QJLaser.prototype.destroy = function() {
    this.judgeBody = null;
};
Game_QJLaser.prototype.setDead = function() {
    this.dead = true;
    this.perFade=Math.max(this.opacity/this.deadCount,1);
};
Game_QJLaser.prototype.xs = function() {
    return 0;
};
Game_QJLaser.prototype.ys = function() {
    return 0;
};
Game_QJLaser.prototype.screenShowX = function() {
    return this.x - $gameMap.displayX()*48;
}
Game_QJLaser.prototype.screenShowY = function() {
    return this.y - $gameMap.displayY()*48;
}
//=============================================================================
//Sprite_QJLaser
//=============================================================================
function Sprite_QJLaser() {
    this.initialize.apply(this, arguments);
};
Sprite_QJLaser.prototype = Object.create(Sprite_Base.prototype);
Sprite_QJLaser.prototype.constructor = Sprite_QJLaser;
Sprite_QJLaser.prototype.initialize = function(index) {
    Sprite_Base.prototype.initialize.call(this);
    this.o=$gameMap.bullet(index);
    //=================================================
    let frameImage;
    let img1 = this.o.data.Img;
    let img2 = this.o.data.ImgPoint;
    //=================================================
    frameImage=img1.match(/\[[^\]]*\]/i);
    if (frameImage){
        let data=eval(frameImage[0]);
        ImageManager.loadBullet(img1).addLoadListener((bit)=>{
            if (this.o.dead) return;
            this.lineBit=bit;
            this.lineBit.smooth = false;
            this.dymaticBitmapLine=[0,Number(data[0]),bit.width/Number(data[0]),0,Number(data[1]),bit.height];
            this.drawRectangleLine=[0,0,0,0];
            this.refresDymaticBitmapLine();
        });
    } else ImageManager.loadBullet(img1).addLoadListener((bit)=>{
        if (this.o.dead) return;
        this.lineBit=bit;
        this.lineBit.smooth = true;
        this.drawRectangleLine=[0,0,bit.width,bit.height];
    });
    //=================================================
    frameImage=img2.match(/\[[^\]]*\]/i);
    if (frameImage){
        let data=eval(frameImage[0]);
        ImageManager.loadBullet(img2).addLoadListener((bit)=>{
            if (this.o.dead) return;
            this.pointBit=bit;
            this.dymaticBitmapPoint=[0,Number(data[0]),bit.width/Number(data[0]),0,Number(data[1]),bit.height];
            this.drawRectanglePoint=[0,0,0,0];
            this.refresDymaticBitmapPoint();
        });
    } else ImageManager.loadBullet(img2).addLoadListener((bit)=>{
        if (this.o.dead) return;
        this.pointBit=bit;
        this.drawRectanglePoint=[0,0,bit.width,bit.height];
    });
};
Sprite_QJLaser.prototype.refresDymaticBitmapLine = function() {
    this.dymaticBitmapLine[3]++;
    if (this.dymaticBitmapLine[3]==this.dymaticBitmapLine[4]) {
        this.dymaticBitmapLine[3]=0;
        this.dymaticBitmapLine[0]++;
        if (this.dymaticBitmapLine[0]==this.dymaticBitmapLine[1]) this.dymaticBitmapLine[0]=0;
        this.drawRectangleLine=[this.dymaticBitmapLine[0]*this.dymaticBitmapLine[2],0,
            this.dymaticBitmapLine[2],this.dymaticBitmapLine[5]];
    }
}
Sprite_QJLaser.prototype.refresDymaticBitmapPoint = function() {
    this.dymaticBitmapPoint[3]++;
    if (this.dymaticBitmapPoint[3]==this.dymaticBitmapPoint[4]) {
        this.dymaticBitmapPoint[3]=0;
        this.dymaticBitmapPoint[0]++;
        if (this.dymaticBitmapPoint[0]==this.dymaticBitmapPoint[1]) this.dymaticBitmapPoint[0]=0;
        this.drawRectanglePoint=[this.dymaticBitmapPoint[0]*this.dymaticBitmapPoint[2],0,
            this.dymaticBitmapPoint[2],this.dymaticBitmapPoint[5]];
    }
}
Sprite_QJLaser.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    //========================================
    if (!this.lineBit||!this.pointBit) return;
    if (!this.lineList) {
        //=================================================
        let tone = this.o.data.Tone;
        this.lineList = [];
        this.pointList = [];
        for (let i=0,bit1,bit2;i<this.o.ReBound;i++) {
            bit1 = new Sprite(this.lineBit);
            bit2 = new Sprite(this.pointBit);
            bit1.setColorTone(tone);
            bit2.setColorTone(tone);
            bit1.anchor.x=0.5;
            bit1.anchor.y=1;
            bit2.anchor.x=0.5;
            bit2.anchor.y=0.5;
            this.lineList.push(bit1);
            this.pointList.push(bit2);
            this.addChild(bit1);
            this.addChild(bit2);
        }
        let bit = new Sprite(this.pointBit);
        bit.setColorTone(tone);
        bit.anchor.x=0.5;
        bit.anchor.y=0.5;
        this.pointList.push(bit);
        this.addChild(bit);
        //=================================================
    }
    //========================================
    if (this.dymaticBitmapLine) this.refresDymaticBitmapLine();
    if (this.dymaticBitmapPoint) this.refresDymaticBitmapPoint();
    //========================================
    this.o.updateXYR();
    let scaleX = this.o.scaleX;
    let opacity = this.o.opacity;
    let ll = this.o.lineList;
    let drl = this.drawRectangleLine;
    let drp = this.drawRectanglePoint;
    //========================================
    //========================================
    for (let i=0,bit1,bit2,il=this.o.ReBound,lll=ll.length;i<il;i++) {
        //==========================
        bit1 = this.lineList[i];
        bit2 = this.pointList[i];
        //==========================
        bit2.x = ll[i][0];
        bit2.y = ll[i][1];
        bit2.setFrame(drp[0],drp[1],drp[2],drp[3]);
        bit2.scale.x = scaleX;
        bit2.rotation = ll[i][2];
        bit2.opacity = opacity;
        //==========================
        if (!ll[i+1]) {
            bit1.visible = false;
            bit2.visible = false;
            for (let j=i+1;j<il;j++) {
                this.lineList[j].visible = false;
                this.pointList[j].visible = false;
            }
            break;
        } else {
            bit1.visible = true;
            bit2.visible = true;
        }
        //==========================
        bit1.x = ll[i][0];
        bit1.y = ll[i][1];
        bit1.setFrame(drl[0],drl[1],drl[2],drl[3]);
        bit1.rotation = ll[i][2];
        bit1.scale.x = scaleX;
        bit1.scale.y = Math.sqrt(
            (ll[i][0]-ll[i+1][0])*(ll[i][0]-ll[i+1][0])+
            (ll[i][1]-ll[i+1][1])*(ll[i][1]-ll[i+1][1])
        )/drl[3];
        bit1.opacity = opacity;
        //==========================
    }
    //==========================
    let bit = this.pointList[this.pointList.length-1];
    bit.x = ll[ll.length-1][0];
    bit.y = ll[ll.length-1][1];
    bit.setFrame(drp[0],drp[1],drp[2],drp[3]);
    bit.rotation = ll[ll.length-2][2];
    bit.scale.x = scaleX;
    bit.opacity = opacity;
    //========================================
};
//=============================================================================
//Game_QJLaser
//=============================================================================
Game_QJTwoPoint.prototype.initialize = function(data,index) {
    this.data=data;
    this.index=index;
    this.setBase();
};
Game_QJTwoPoint.prototype.orginX = function() {
    return this.x+$gameMap.displayX()*48;
};
Game_QJTwoPoint.prototype.orginY = function() {
    return this.y+$gameMap.displayY()*48;
};
Game_QJTwoPoint.prototype.setBase = function() {
    //===============================================
    this.bulletMode = 2;
    this.z=this.data.z;
    this.bitmap = this.data.Img;
    this.scaleX = this.data.scaleX/100;
    //===============================================
    this.opacity = this.data.Opacity.get();
    this.tone = this.data.Tone;
    this.dead=false;
    this.deadCount=this.data.DeadCount;
    this.max = this.data.Max;
    this.time = 0;
    this.perFade=Math.max(this.opacity/this.deadCount,1);
    //===============================================
    this.rotation=this.data.initialRotation;
    this.twoPointLength=0;
    //===============================================
    this.action=this.data.Action;
    this.target=null;
    this.updateWait = [this.data.AtkWait,this.data.AtkWait];
    this.rememberEvent = [];
    this.name=this.data.name;
    this.ExtraRotation=this.data.ExtraRotation*Math.PI/180;
    //===============================================
    this.xyData = [];
    GroupRandomList = []
    GroupRandomReLoad = false;
    this.xyData[0]=QJ.BL.calculateGAndGR(this.data.x1);
    GroupRandomReLoad = true;
    this.xyData[1]=QJ.BL.calculateGAndGR(this.data.y1);
    GroupRandomList = []
    GroupRandomReLoad = false;
    this.xyData[2]=QJ.BL.calculateGAndGR(this.data.x2);
    GroupRandomReLoad = true;
    this.xyData[3]=QJ.BL.calculateGAndGR(this.data.y2);
    if (!this.xyData[0]||!this.xyData[1]||!this.xyData[2]||!this.xyData[3]) {
        this.setDead();
        return;
    }
    //===============================================
    this.updateXYR();
    this.updateFadeValue();
    //===============================================
};
Game_QJTwoPoint.prototype.updateFadeValue = function() {
    this.opacity = this.data.Opacity.get();
    this.atkWidth = this.data.Width.get();
    this.scaleX = this.data.ScaleX.get()/100;
};
Game_QJTwoPoint.prototype.updateXYR = function() {
    this.x = QJ.BL.dealX(this.xyData[0],null,true);
    this.y = QJ.BL.dealY(this.xyData[1],null,true);
    this.tarX = QJ.BL.dealX(this.xyData[2],null,true);
    this.tarY = QJ.BL.dealY(this.xyData[3],null,true);
    if (this.x==null||this.y==null||this.tarX==null||this.tarY==null) {
        //directly delete.
        $gameMap.removeBullet(this.index);
        return;
    }
    this.rotation = QJ.BL.calculateAngleByTwoPoint(this.x,this.y,this.tarX,this.tarY);
    this.twoPointLength=Math.sqrt((this.x-this.tarX)*(this.x-this.tarX)+(this.y-this.tarY)*(this.y-this.tarY));
    this.rotation+=this.ExtraRotation;
};
Game_QJTwoPoint.prototype.update = function () {
    //=======================
    this.updateXYR();
    if (this.dead) {
        if (this.deadCount==0) {
            $gameMap.removeBullet(this.index);
        } else {
            this.opacity-=this.perFade;
            if (this.opacity<=5) $gameMap.removeBullet(this.index);
        }
        return;
    }
    this.time++;
    switch(this.max[0]) {
        case 0:if (this.time>=this.max[1]) {this.setDead();break;}
        case 1:if ($gameSelfSwitches.value([this.max[1],this.max[2],this.max[3]])==this.max[4]) {this.setDead();break;}
        case 2:if ($gameSwitches.value(this.max[1])==this.max[2]) {this.setDead();break;}
        case 3:if (!!eval(this.max[1])==this.max[2]) {this.setDead();break;}
    }
    //=======================
    this.updateFadeValue();
    if (this.updateWait[0]==0) {
        this.updateAtk();
        this.updateWait[0]=this.updateWait[1];
    } else this.updateWait[0]--;
    //=======================
}
Game_QJTwoPoint.prototype.destroy = function() {
    this.judgeBody = null;
};
Game_QJTwoPoint.prototype.setDead = function() {
    this.dead = true;
};
Game_QJTwoPoint.prototype.xs = function() {
    return this.x;
};
Game_QJTwoPoint.prototype.ys = function() {
    return this.y;
};
Game_QJTwoPoint.prototype.screenShowX = function() {
    return this.x;// - $gameMap.displayX()*48;
}
Game_QJTwoPoint.prototype.screenShowY = function() {
    return this.y;// - $gameMap.displayY()*48;
}
Game_QJTwoPoint.prototype.updateAtk = function() {
    this.target=QJ.BL.dealTarget(this.data.Target);
    let judgeBody;
    if (this.data.AtkRange>0) {
        //=============================
        judgeBody = QJ.BL.box(
            this.tarX+$gameMap.displayX()*48,
            this.tarY+$gameMap.displayY()*48,
            [0,this.data.AtkRange]);
    } else {
        //=============================
        let len = this.twoPointLength;
        if (len<=2) return;
        judgeBody = QJ.BL.box(
            this.x+$gameMap.displayX()*48,
            this.y+$gameMap.displayY()*48,
            [1,this.atkWidth,len]);
        judgeBody.translate(0,-len/2);
        judgeBody.setAngle(this.rotation);
    }
    //=============================
    for (let i=0,l=this.target.length;i<l;i++) {
        let character=QJ.BL.dealCharacter(this.target[i]);
        if (!character||!character.QJBody) continue;
        if (QJ.BL.judge(judgeBody,character.QJBody).result) {
            QJ.BL.startAction(this,character);
            continue;
        }
        let index=this.rememberEvent.indexOf(character);
        if (index!=-1) this.rememberEvent.splice(index,1);
    }
    //QJ.BL.sprite.aBody(judgeBody);
    //=============================
};
//=============================================================================
//Sprite_QJLaser
//=============================================================================
function Sprite_QJTwoPoint() {
    this.initialize.apply(this, arguments);
};
Sprite_QJTwoPoint.prototype = Object.create(Sprite_Base.prototype);
Sprite_QJTwoPoint.prototype.constructor = Sprite_QJTwoPoint;
Sprite_QJTwoPoint.prototype.initialize = function(index) {
    Sprite_Base.prototype.initialize.call(this);
    this.o=$gameMap.bullet(index);
    this.anchor.x=0.5;
    this.anchor.y=1;
    this.opacity=this.o.opacity;
    this.scale.x=this.o.scaleX;
    //this.setColorTone(this.o.tone);
    if (typeof this.o.bitmap == "string") {
        let frameImage=this.o.bitmap.match(/\[[^\]]*\]/i);
        if (frameImage){
            let data=eval(frameImage[0]);
            ImageManager.loadBullet(this.o.bitmap).addLoadListener((bit)=>{
                if (this.o.dead) return;
                this.bitmap=bit;
                this.dymaticBitmap=[0,Number(data[0]),bit.width/Number(data[0]),0,Number(data[1]),bit.height];
                this.drawRectangle=[0,0,0,0];
                this.refresDymaticBitmap();
                this.remHeight = this.bitmap.height;
                let dB = this.dymaticBitmap;
                this.setFrame(dB[0]*dB[2],0,dB[2],dB[5]);
            });
        } else ImageManager.loadBullet(this.o.bitmap).addLoadListener((bit)=>{
            if (this.o.dead) return;
            this.bitmap=bit;
            this.drawRectangle=[0,0,bit.width,bit.height];
            this.remHeight = this.bitmap.height;
        });
    }
};
Sprite_QJTwoPoint.prototype.refresDymaticBitmap = function() {
    let dB = this.dymaticBitmap;
    dB[3]++;
    if (dB[3]==dB[4]) {
        dB[3]=0;
        dB[0]++;
        if (dB[0]==dB[1]) dB[0]=0;
        this.setFrame(dB[0]*dB[2],0,dB[2],dB[5]);
    }
}
Sprite_QJTwoPoint.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    //========================================
    //if (this.o.dead) return;
    if (!this.bitmap) return;
    //========================================
    this.x=this.o.screenShowX();
    this.y=this.o.screenShowY();
    this.rotation=this.o.rotation;
    this.opacity=this.o.opacity;
    this.scale.y=this.o.twoPointLength/this.remHeight;
    //========================================
    if (this.dymaticBitmap) this.refresDymaticBitmap();
    //========================================
};
//=============================================================================
//
//=============================================================================
//=============================================================================
//
//=============================================================================
QJ.BL.box = function(x,y,boxType){
    let body = null;
    if (boxType[0]==0) {
        body = new SATCircle(new SATVector(x,y),boxType[1]);
        body.type = 0;
    } else if (boxType[0]==1) {
        body = new SATPolygon(
            new SATVector(x,y), [
            new SATVector(-boxType[1]/2,-boxType[2]/2),
            new SATVector(+boxType[1]/2,-boxType[2]/2),
            new SATVector(+boxType[1]/2,+boxType[2]/2),
            new SATVector(-boxType[1]/2,+boxType[2]/2)
        ]);
        body.type = 1;
        body.w = boxType[1];
        body.h = boxType[2];
        body.dl = Math.atan(body.w/body.h);//Diagonal line
    }
    return body;
};
QJ.sat = new SATResponse();
QJ.BL.judge = function(bodyA,bodyB){
    QJ.sat.clear();
    if (bodyA.type==0&&bodyB.type==0) {
        QJ.sat.result = SATtestCircleCircle(bodyA,bodyB,QJ.sat);
    } else if (bodyA.type==1&&bodyB.type==1) {
        QJ.sat.result = SATtestPolygonPolygon(bodyA,bodyB,QJ.sat);
    } else if (bodyA.type==1&&bodyB.type==0) {
        QJ.sat.result = SATtestPolygonCircle(bodyA,bodyB,QJ.sat);
    }  else if (bodyA.type==0&&bodyB.type==1) {
        QJ.sat.result = SATtestCirclePolygon(bodyA,bodyB,QJ.sat);
    } 
    return QJ.sat;
};
QJ.BL.setPostion = function(body,x,y){
    //body.setOffset(new SAT.Vector(x,y));
    body.pos.x = x;
    body.pos.y = y;
};
//=============================================================================
//Call Page
//=============================================================================
QJ.BL.CallEvent = function(value,listvalue){
    if ($gameMap.event(value)) 
    $gameMap.event(value).steupTarPageQB(listvalue);
};
const QB_Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    this._forceInterpreterQB = new Array();
    //console.log($dataMap);
    QB_Game_Event_initialize.call(this,mapId, eventId);
};
Game_Event.prototype.steupTarPageQB = function(value) {
    if (!!this.event().pages[value-1])
    this._forceInterpreterQB.push(new Game_InterpreterForceQBEvent(value-1));
};
const QB_Game_Event_updateParallel = Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function() {
    QB_Game_Event_updateParallel.call(this);
    for (let i=0,l=this._forceInterpreterQB.length;i<l;i++) {
        if (!this._forceInterpreterQB[i]) continue;
        if (!this._forceInterpreterQB[i].isRunning()) {
            this._forceInterpreterQB[i].setup(
                this.event().pages[this._forceInterpreterQB[i].pageIndex].list,
                this._eventId);
        }
        this._forceInterpreterQB[i].update();
    }
};
//=============================================================================
//Common Event
//=============================================================================
QJ.BL.callCommonEvent = function(listvalue,eid,bp,bulletCanUseData){
    $gameMap.steupTarPageQB(listvalue,eid,bp,bulletCanUseData);
};
const QB_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    QB_Game_Map_initialize.call(this);
    this._forceInterpreterQB = new Array();
};
Game_Map.prototype.steupTarPageQB = function(value,eid,bp,bulletCanUseData) {
    if (!!$dataCommonEvents[value])
    this._forceInterpreterQB.push(new Game_InterpreterForceQBCommonEvent(value,eid,bp,bulletCanUseData));
};
Game_Map.prototype.clearTarPage = function() {
    this._forceInterpreterQB = [];
    for (let i of this.events()) {
        i._forceInterpreterQB = [];
    }
};
//=============================================================================
//Deal Detail Data.
//=============================================================================
QJ.BL.dealInitialRotation=function(data,event,x,y){
    //======================================
    if (!isNaN(Number(data))) return data*Math.PI/180;
    //======================================
    if (data[0]=="S") {
        data=data.substr(2,data.length-3);
        try{
            data=eval(data);
            if (isNaN(Number(data))) return null;
            return Number(data);
        } catch(e) {
            return null;
        }
    }
    //======================================
    try{
    //======================================
    data=data.replace(/PD(\[\])*/ig,(d)=>{
        return QJ.BL.calculateAngleByDirection($gamePlayer.direction())*180/Math.PI;
    });
    data=data.replace(/EV\[([^\],]*)\]/ig,(d,s1)=>{
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            $gameMap.event($gameVariables.value(Number(s1))).boxScreenSubRealX(),
            $gameMap.event($gameVariables.value(Number(s1))).boxScreenSubRealY())*180/Math.PI;
    });
    data=data.replace(/XM\[([^\],]*)\]YM\[([^\],]*)\]/ig,(d,s1,s2)=>{
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            Number(s1)*tileSize+24 + $gameMap.displayX(),
            Number(s2)*tileSize+24 + $gameMap.displayY())*180/Math.PI;
    });
    //======================================
    data=data.replace(/P(\[\])+/ig,(d)=>{
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            $gamePlayer.boxScreenSubRealX(),$gamePlayer.boxScreenSubRealY())*180/Math.PI;
    });
    data=data.replace(/M(\[\])+/ig,(d)=>{
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            TouchInput.x + $gameMap.displayX(),TouchInput.y + $gameMap.displayY())*180/Math.PI;
    });
    data=data.replace(/D\[([^\],]+)\]/ig,(d,s1)=>{
        return QJ.BL.calculateAngleByDirection(
            s1==0?event.direction():$gameMap.event(Number(s1)).direction())*180/Math.PI;
    });
    data=data.replace(/E\[([^\],]+)\]/ig,(d,s1)=>{
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            $gameMap.event(Number(s1)).boxScreenSubRealX(),
            $gameMap.event(Number(s1)).boxScreenSubRealY())*180/Math.PI;
    });
    data=data.replace(/G\[([^\],]+)\]/ig,(d,s1)=>{
        let eventData = $gameMap.event(QJ.BL.getMinEventId(x+$gameMap.displayX()*48,y+$gameMap.displayY()*48,s1));
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            eventData.boxScreenSubRealX(),eventData.boxScreenSubRealY())*180/Math.PI;
    });
    data=data.replace(/N\[([^\],]+)\]/ig,(d,s1)=>{
        let eventData = $gameMap.event(QJ.BL.getMinEventIdNobi(x+$gameMap.displayX()*48,y+$gameMap.displayY()*48,s1));
        return QJ.BL.calculateAngleByTwoPoint(x,y,
            eventData.boxScreenSubRealX(),eventData.boxScreenSubRealY())*180/Math.PI;
    });
    data=data.replace(/X\[([^\],]+)\]Y\[([^\],]+)\]/ig,(d,s1,s2)=>{
        return QJ.BL.calculateAngleByTwoPoint(x,y,Number(s1),Number(s2))*180/Math.PI;
    });
    data=data.replace(/B\[([^\]]+),([^\]]+)\]/ig,(d,s1,s2)=>{
        let tar = $gameMap.bullet(Number(s1));
        return tar?tar.showRotationLastMove(Number(s2)):null;
    });
    //======================================
    data=eval(data);
    if (isNaN(Number(data))) return null;
    return Number(data)*Math.PI/180;
    //======================================
    } catch(e) {return null;}
    //======================================
};
let GroupRandomList = [];
let GroupRandomReLoad = false;
QJ.BL.calculateGAndGR=function(data){
    //======================================
    if (!isNaN(Number(data))) return data;
    //======================================
    try{
        let broken = false;
        data=data.replace(/G\[([^\],]+),([^,]+),([^,]+),([^\],]+),([^\],]+)\]/ig,(d,s1,s2,s3,s4,s5)=>{
            s2=QJ.BL.dealX(s2,null,true);
            s3=QJ.BL.dealY(s3,null,true);
            let eventData = QJ.BL.getMinEventId(
                Number(s2)+$gameMap.displayX()*48,
                Number(s3)+$gameMap.displayY()*48,s1,Number(s5),Number(s4));
            if (!eventData) broken = true;
            return eventData>0?("E["+eventData+"]"):0;
        });
        if (broken) return null;
        data=data.replace(/GR\[([^\],]+)\]/ig,(d,s1)=>{
            if (GroupRandomReLoad) {
                return "E["+GroupRandomList.shift()+"]";
            } else {
                let eventsData = QJ.BL.getGroupId(s1);
                let eventData = eventsData[Math.floor(Math.random()*eventsData.length)];
                if (!eventData) broken = true;
                GroupRandomList.push(eventData);
                return eventData>0?("E["+eventData+"]"):0;
            }
        });
        data=data.replace(/GRR\[([^\],]+),([^,]+),([^,]+),([^\],]+)\]/ig,(d,s1,s2,s3,s4)=>{
            if (GroupRandomReLoad) {
                return "E["+GroupRandomList.shift()+"]";
            } else {
                s2=QJ.BL.dealX(s2,null,true);
                s3=QJ.BL.dealY(s3,null,true);
                let eventsData = QJ.BL.getGroupIdInRange(s1,Number(s2),Number(s3),Number(s4));
                let eventData = eventsData[Math.floor(Math.random()*eventsData.length)];
                if (!eventData) broken = true;
                GroupRandomList.push(eventData);
                return eventData>0?("E["+eventData+"]"):0;
            }
        });
        if (broken) return null;
        return data;
    } catch(e) {
        console.log(e);
        return null;
    }
    //======================================
};
QJ.BL.dealX=function(data,event,fastRead){
    //======================================
    if (!isNaN(Number(data))) return data;
    //======================================
    if (!fastRead&&data[0]=="S") {
        data=data.substr(2,data.length-3);
        try{
            data=eval(data);
            if (isNaN(Number(data))) return null;
            return Number(data);
        } catch(e) {
            return null;
        }
    }
    //======================================
    try{
    //======================================
    data=data.replace(/P(\[\])+/ig,(d)=>{
        return $gamePlayer.boxScreenSubRealX();
    });
    data=data.replace(/M(\[\])+/ig,(d)=>{
        return TouchInput.x;
    });
    data=data.replace(/E\[([^\],]+)\]/ig,(d,s1)=>{
        let tar = Number(s1)==0?event:$gameMap.event(Number(s1));
        return tar.boxScreenSubRealX();
    });
    data=data.replace(/B\[([^\],]+)\]/ig,(d,s1)=>{
        let tar = $gameMap.bullet(Number(s1));
        return tar?tar.screenShowX():null;
    });
    data=data.replace(/B\[([^\]]+),([^\]]+)\]/ig,(d,s1,s2)=>{
        let tar = $gameMap.bullet(Number(s1));
        return tar?tar.screenShowXLast(Number(s2)):null;
    });
    //======================================
    data=eval(data);
    if (data==null||isNaN(Number(data))||(!data&&data!=0)) return null;
    return Number(data);
    //======================================
    } catch(e) {return null;}
    //======================================
};
QJ.BL.dealY=function(data,event,fastRead){
    //======================================
    if (!isNaN(Number(data))) return data;
    //======================================
    if (!fastRead&&data[0]=="S") {
        data=data.substr(2,data.length-3);
        try{
            data=eval(data);
            if (isNaN(Number(data))) return null;
            return Number(data);
        } catch(e) {
            return null;
        }
    }
    //======================================
    try{
    //======================================
    data=data.replace(/P(\[\])+/ig,(d)=>{
        return $gamePlayer.boxScreenSubRealY();
    });
    data=data.replace(/M(\[\])+/ig,(d)=>{
        return TouchInput.y;
    });
    data=data.replace(/E\[([^\],]+)\]/ig,(d,s1)=>{
        let tar = Number(s1)==0?event:$gameMap.event(Number(s1));
        return tar.boxScreenSubRealY();
    });
    data=data.replace(/B\[([^\],]+)\]/ig,(d,s1)=>{
        let tar = $gameMap.bullet(Number(s1));
        return tar?tar.screenShowY():null;
    });
    data=data.replace(/B\[([^\]]+),([^\]]+)\]/ig,(d,s1,s2)=>{
        let tar = $gameMap.bullet(Number(s1));
        return tar?tar.screenShowYLast(Number(s2)):null;
    });
    //======================================
    data=eval(data);
    if (data==null||isNaN(Number(data))||(!data&&data!=0)) return null;
    return Number(data);
    //======================================
    } catch(e) {return null;}
    //======================================
};
QJ.BL.dealMax=function(data,event){
    //======================================
    if (typeof data=="number"||!isNaN(Number(data))) {
        data = Number(data);
        return [0,data==-1?999999999:data];
    } else if (data[0]=="S"&&data[1]=="S") {
        let detail = data.substr(3,data.length-4).split(",");
        return [2,Number(detail[0])==0?event._eventId:Number(detail[0]),
            detail[1],eval(detail[2])];
    } else if (data[0]=="S") {
        let detail = data.substr(2,data.length-3).split(",");
        return [1,$gameMap.mapId(),Number(detail[0]),eval(detail[1])];
    } else {
        let detail = data.substr(2,data.length-3);
        return [3,detail,true];
    }
    return null;
    //======================================
};
QJ.BL.dealZ=function(data,event){
    if (typeof data === "number") return "C";
    else if (data[0]=="T") return "T";
    else if (data[0]=="M") return "M";
    else if (data[0]=="C") return "C";
    else if (data[0]=="P") return "P";
    else return null;
};
QJ.BL.dealMoveType = function(movetype,event) {
    if (movetype[0]=="S") return [0];
    //======================================
    try{
    if (movetype[0]=="F") {
        let data=movetype.substr(2,movetype.length-3);
        if (data.includes(";")) {
            data=data.split(";");
            if (data.length!=2) return null;
            return [8,0,data[0],data[1]];
        } else {
            data=data.split("|");
            if (data.length!=2) return null;
            return [8,1,data[0],data[1]];
        }
    }
    if (movetype[0]=="C") {
        return [9];
    }
    if (movetype[0]=="B") {
        let data=(movetype.substr(2,movetype.length-3)).split(",");
        if (Number(data[0])==0) data[0] = event._eventId;
        else data[0] = Number(data[0]);
        if (!data) return null;
        return [5,data[0],Number(data[1]),Number(data[2]),Number(data[3]),Number(data[4])
                         ,Number(data[5]),Number(data[6]),Number(data[7]),Number(data[8])];
    }
    if (movetype[0]=="Q"&&movetype[1]=="P") {
        let data=(movetype.substr(3,movetype.length-4)).split(",");
        if (!data) return null;
        return [6,Number(eval(data[0])),Number(eval(data[1])),
                  Number(eval(data[2])),Number(eval(data[3]))];
    }
    if (movetype[0]!="T") return null;
    //======================================
    if (movetype[1]=="E"&&movetype[2]=="V") {
        let data=movetype.match(/\[[^\]]*\]/i);
        if (!data) return null;
        let detail=eval(data[0]);
        return [3,Number(detail[0]),$gameVariables.value(Number(detail[1]))];
    }
    if (movetype[1]=="E") {
        let data=movetype.match(/\[[^\]]*\]/i);
        if (!data) return null;
        let detail=eval(data[0]);
        return [2,Number(detail[0]),Number(detail[1])];
    }
    if (movetype[1]=="P") {
        let data=movetype.match(/\[[^\]]*\]/i);
        if (!data) return null;
        let detail=eval(data[0]);
        return [1,Number(detail[0])];
    }
    if (movetype[1]=="G") {
        let data=(movetype.substr(3,movetype.length-4)).split(",");
        if (!data) return null;
        return [4,Number(data[0]),String(data[1])];
    }
    if (movetype[1]=="N") {
        let data=(movetype.substr(3,movetype.length-4)).split(",");
        if (!data) return null;
        return [7,Number(data[0]),String(data[1])];
    }
    return null;
    //======================================
    } catch(e) {return null;}
    //======================================
};
QJ.BL.dealTarget = function(data) {
    let tarList=new Array();
    //======================================
    try{
    //======================================
    for (let i of data) {
        if (i[0]=="E"&&i[1]=="V") {
            let detail=eval(i.match(/\[[^\]]*\]/i)[0]);
            if (!detail||isNaN(Number(detail[0]))) continue;
            tarList.push($gameVariables.value(Number(detail[0])));
        } else if (i[0]=="E") {
            let detail=eval(i.match(/\[[^\]]*\]/i)[0]);
            if (!detail||isNaN(Number(detail[0]))) continue;
            tarList.push(Number(detail[0]));
        } else if (i[0]=="P") {
            tarList.push(-1);
        } else if (i[0]=="G") {
            let detail=i.substr(2,i.length-3);
            if (!detail) continue;
            tarList=tarList.concat(QJ.BL.getGroupId(detail));
        } else if (i.includes("Nobi")) {
            let detail=i.substr(5,i.length-6);
            if (!detail) continue;
            tarList=tarList.concat(QJ.BL.getCommentId("["+detail+"]"));
        }
    }
    return tarList;
    //======================================
    } catch(e) {return null;}
    //======================================
};
QJ.BL.dealTime=function(time){
    if (typeof time=="number") return time;
    try{
    if (time[0]=="S"&&time[1]=="S") {
        let detail=time.substr(3,time.length-4).split(",");
        return [0,detail[0],!!eval(detail[1])];
    } else if (time[0]=="S") {
        let detail=time.substr(2,time.length-3).split(",");
        return [1,Number(detail[0]),!!eval(detail[1])];
    } else if (time[0]=="T") {
        let detail=time.substr(2,time.length-3);
        return [2,detail];
    }
    return [0,""];
    } catch(e) {return [0,""];}
};
QJ.BL.dealTimeBoolean=function(time,event){
    if (typeof time=="number") return time<=0;
    try{
    if (time[0]==0) {
        return $gameSelfSwitches.value([$gameMap.mapId(),event._eventId,time[1]]) == time[2];
    } else if (time[0]==1) {
        return $gameSwitches.value(time[1])==time[2];
    } else if (time[0]==2) {
        return !!eval(time[1]);
    }
    return false;
    } catch(e) {return false;}
};
QJ.BL.startAction=function(bullet,tarCharacter){
    let dataList=bullet.action,eid=0;
    if (tarCharacter) {
        if (tarCharacter==$gamePlayer) eid=-1;
        else if (tarCharacter._eventId>0) eid=tarCharacter._eventId;
    }
    let bulletX = bullet.screenShowX(),bulletY = bullet.screenShowY(),bulletR = bullet.rotation;
    if (typeof dataList === "string") dataList=[dataList];
    for (let data of dataList) {
    if (data[0]=="C"&&data[1]=="P"&&eid!=0) {
        let detail=eval(data.match(/\[[^\]]*\]/i)[0]);
        if (!detail) return;
        if (isNaN(Number(detail[0]))) return;
        if (Number(detail[0])<=0||!Number.isInteger(detail[0])) return;
        QJ.BL.CallEvent(eid,Number(detail[0]));
    } else if (data[0]=="C") {
        let detail=eval(data.match(/\[[^\]]*\]/i)[0]);
        if (!detail) return;
        if (isNaN(Number(detail[0]))) return;
        if (Number(detail[0])<=0||!Number.isInteger(detail[0])) return;
        QJ.BL.callCommonEvent(Number(detail[0]),eid,detail,{
            x:bulletX,
            y:bulletY,
            r:bulletR,
            extra:bullet.commonEventExtraData||{}
        });
    } else if (data[0]=="S"&&data[1]=="S"&&eid!=0) {
        let detail=data.substr(3,data.length-4).split(",");
        let key = [$gameMap.mapId(),eid,detail[0]];
        let result=detail[1]=="true"?true:false;
        $gameSelfSwitches.setValue(key,result);
    } else if (data[0]=="S") {
        let detail=eval(data.match(/\[[^\]]*\]/i)[0]);
        if (!detail) return;
        if (isNaN(Number(detail[0]))) return;
        if (Number(detail[0])<=0||!Number.isInteger(detail[0])) return;
        $gameSwitches.setValue(Number(detail[0]),detail[1]);
    } else if (data[0]=="E") {
        if (tarCharacter._eventId>0) tarCharacter.erase();
    } else if (data[0]=="T") {
        let detail=data.substr(2,data.length-3);
        eval(detail);
    }
    }
};
QJ.BL.DirectAction = function(x,y,box,action,target,lastAtkEvent) {
    //==========================================
    let event=QJ.BL.getEvent();
    GroupRandomList = []
    GroupRandomReLoad = false;
    let xo = QJ.BL.dealX(x,event);
    GroupRandomReLoad = true;
    let yo = QJ.BL.dealY(y,event);
    x = xo+$gameMap.displayX()*tileSize;
    y = yo+$gameMap.displayY()*tileSize;
    let body=QJ.BL.box(x,y,QJ.BL.dealCollisionBox(box));
    QJ.BL.sprite.aBody(body);
    //==========================================
    target = QJ.BL.dealTarget(target);
    let hasAtkEvent = [];
    lastAtkEvent = lastAtkEvent||[];
    //==========================================
    for (let i=0,l=target.length;i<l;i++) {
        let character=null;
        character=QJ.BL.dealCharacter(target[i]);
        if (!character) continue;
        if (lastAtkEvent.includes(character)) continue;
        if (QJ.BL.judge(body,character.QJBody).result) {
            hasAtkEvent.push(character);
            QJ.BL.startAction({
                action:action,
                screenShowX:()=>{return xo;},
                screenShowY:()=>{return yo;},
                rotation:0
            },character);
        }
    }
    return hasAtkEvent;
}
QJ.BL.dealParticles = function(data){
    if (typeof data !== "object"||data.length==null||data.length==undefined) return [];
    for (let i in data) {
        if (typeof data[i] == "string") {
            try{data[i] = JsonEx.parse(data[i]);}catch(e){data[i] = null;}
        } else if (typeof data[i] !== "object") data[i] = null;
        if (!data[i]) continue;
        let list = {
            img:null,
            offsetX:0,
            offsetY:0,
            dir:Math.PI,
            dirOffset:Math.PI/6,
            max:30,
            deadCount:60,
            opacityMin:0.5,
            opacityMax:1,
            scaleMin:0.5,
            scaleMax:1.5,
            moveType:"-8*t;0",
            wait:2,
            num:1
        };
        for (let j in data[i]) list[j] = data[i][j];
        list.count = list.wait;
        data[i] = list;
    };
    return data;
};
//=============================================================================
//Shoot order.
//=============================================================================
QJ.BL.Shooter_FlameThrower = function(data,minScale,maxScale,offsetDir,num) {
    let bullet = {
        Img:"fire[11,5]",
        Max:80,
        DeadCount:40,
        AnchorX:0.5,
        AnchorY:0.5
    };
    for (let i in data) bullet[i] = data[i];
    for (let i=0;i<num;i++) {
        let size = minScale+Math.random()*(maxScale-minScale);
        bullet.initialRotation=(data.initialRotation!=undefined?data.initialRotation:"PD[]")+"+"+(Math.random()*offsetDir*2-offsetDir);
        bullet.Speed=1.5+Math.random()*1.5;
        bullet.CollisionBox="R["+size+","+size+"]";
        bullet.scaleX=size;
        bullet.scaleY=size;
        QJ.BL.Shoot(bullet);
    }
}
QJ.BL.Shooter_Gain = function(data,type,id,num) {
    data.x = "E[0]";
    data.y = "E[0]";
    data.Target = ["P[]"];
    data.Max = 90+60*60*60;
    data.initialRotation = 60*Math.random()-30+(Math.random()>0.5?90:270);
    data.RotationAuto = 0;
    data.CollisionBox = "R[32,32]";
    let item;
    if (type==3||type=="gold") {
        data.Img=[2,id];
        if (Imported.MOG_TreasurePopup&&((Moghunter.trpopup_GoldVisible) === "true"&&$gameSystem._trspupVisible)) {
            if (num>0||(num<0&&Moghunter.trpopup_LostItemVisible)) 
                data.Action = ["T[$gameParty.gainGold("+num+");"+
                "$gameSystem._trspupData.push(["+null+","+num+",bullet.screenShowX(),bullet.screenShowY()]);]"];
        } else data.Action = ["T[$gameParty.gainGold("+num+");]"];
    } else {
        if (type==0||type=="item") item="$dataItems["+id+"]";
        else if (type==1||type=="weapon") item="$dataWeapons["+id+"]";
        else if (type==2||type=="armor") item="$dataArmors["+id+"]";
        else {
            console.log("投射物品的指令参数错误。");
            return;
        }
        data.Img=[2,eval(item).iconIndex];
        if (Imported.MOG_TreasurePopup&&$gameSystem._trspupVisible) {
            if (num>0||(num<0&&Moghunter.trpopup_LostItemVisible)) 
                data.Action = ["T[$gameParty.gainItem("+item+","+num+");"+
                "$gameSystem._trspupData.push(["+item+","+num+",bullet.screenShowX(),bullet.screenShowY()]);]"];
        } else data.Action = ["T[$gameParty.gainItem("+item+","+num+");]"];
    }
    data.UpdateJS = 
        "if (this.moveType[4]==0&&this.QJBody) {"+
        "    if (this.itemOffset==undefined) this.itemOffset = 30;"+
        "    this.itemOffset--;"+
        "    if (this.itemOffset>=15) this.anchorY+=0.1/15;"+
        "    else this.anchorY-=0.1/15;"+
        "    if (this.itemOffset==0) this.itemOffset=30;"+
        "}";
    data.AtkRange = 0;
    data.WaitBaseOnSpeed = -2;
    QJ.BL.Shooter_HandGrenade(data,16,5,5);
}
QJ.BL.Shooter_CharacterAtk = function(character,data,of,arc) {
    //[ox2,oy2,ox4,oy4,ox6,oy6,ox8,oy8],[r1,r2,num,l]
    //====================================
    let tar = character==-1?$gamePlayer:
        (character==0?QJ.BL.getEvent():$gameMap.event(character));
    if (!tar) return;
    //====================================
    let orginRotation = QJ.BL.calculateAngleByDirection(tar.direction())*180/Math.PI;
    let ofx=of[tar.direction()-2],ofy=of[tar.direction()-1];
    //====================================
    if (arc) {
        let delta = (arc[1] - arc[0]) / arc[2];
        for (let i=arc[0];i<arc[1];i+=delta) {
            let bullet = {
                initialRotation:orginRotation+i+(Math.random()-0.5)*arc[3],
                x:tar.boxScreenSubX()+ofx,
                y:tar.boxScreenSubY()+ofy
            };
            for (let i in data) bullet[i] = data[i];
            QJ.BL.Shoot(bullet);
        }
    } else {
        let bullet = {
            initialRotation:orginRotation,
            x:tar.boxScreenSubX()+ofx,
            y:tar.boxScreenSubY()+ofy
        };
        for (let i in data) bullet[i] = data[i];
        QJ.BL.Shoot(bullet);
    }
    //====================================
}
QJ.BL.Shooter_P = function(data,r,speed,roSpeed,number,rotation,x,y,edgeNum) {
    if (edgeNum<2) {
        QJ.BL.error(" edgeNum "+edgeNum+" ");
        return;
    }
    if (number<2) {
        QJ.BL.error(" edgeNum "+number+" ");
        return;
    }
    //====================================
    let calRo=(a,b,c)=>{
        return Math.asin(a*Math.sin(c)/Math.sqrt(a*a+b*b-2*a*b*Math.cos(c)));
    };
    let calLo=(a,b,c)=>{
        return Math.sqrt(a*a+b*b-2*a*b*Math.cos(c));
    }
    //====================================
    for (let i=0,il=number-1,ilm=Math.max(Math.sqrt(2-2*Math.cos(2*Math.PI/edgeNum))*r/(number-1),1),
        c=Math.PI*(0.5-1/edgeNum),fan=false,halfil=(il+1)/2;i<il;i++) {
        if (i>halfil) fan=true;
        QJ.BL.Shooter_C(data,calLo(i*ilm,r,c),speed,roSpeed,edgeNum,rotation,x,y,
            fan?(-calRo((il-i)*ilm,r,c)):calRo(i*ilm,r,c));
    }
    //====================================
}
QJ.BL.Shooter_C = function(data,r,speed,roSpeed,number,rotation,x,y,extraRo) {
    //====================================
    let makeText=(r,rs,n,m,s)=>{
        return "F[-"+s+"*t+"+
        r+"*Math.sin(t/"+
        rs+"+2*Math.PI*"+
        n+"/"+m+"+"+extraRo+");0+"+
        r+"*Math.cos(t/"+
        rs+"+2*Math.PI*"+
        n+"/"+m+"+"+extraRo+")]";
    };
    //====================================
    let event=QJ.BL.getEvent();
    let ro = QJ.BL.dealInitialRotation(rotation,event,QJ.BL.dealX(x,event,false),QJ.BL.dealY(y,event,false));
    roSpeed=30/roSpeed/Math.PI;
    extraRo=extraRo||0;
    //====================================
    let bullet = {
        initialRotation:ro*180/Math.PI,
        Max:120,
        RotationAuto:0,
        Img:"dart",
        Regions:[1],
        x:x,
        y:y,
        MoveType:"S[]"
    }
    for (let i in data) bullet[i] = data[i];
    for (let i=0;i<number;i++) {
        bullet.MoveType=makeText(r,roSpeed,i,number,speed);
        QJ.BL.Shoot(JsonEx.makeDeepCopy(bullet));
    }
    //====================================
}
QJ.BL.Shooter_ArcRange = function(initialRotation,data,arc) {
    //====================================
    for (let i=arc[0],delta = (arc[1] - arc[0]) / arc[2];i<arc[1];i+=delta) {
        data["initialRotation"] = initialRotation+"+"+(i+(Math.random()-0.5)*arc[3]);
        QJ.BL.Shoot(JsonEx.makeDeepCopy(data));
    }
    //====================================
}
QJ.BL.Shooter_HandGrenade = function(data,oneLength,oneTime,maxReBound) {
    //====================================
    //一倍宽度,发射角度,一倍时间,次数
    let bullet = {
        MoveType:"QP["+oneLength+","+Math.PI/3+","+oneTime+","+maxReBound+"]",
        Max:oneTime*(maxReBound+1)*maxReBound/2,
        NoCollisionAction:true,
        NoCollisionAnim:true,
        DeadAction:true,
        DeadAnim:true,
        Speed:18,
        ReBound:999999,
        AnchorY:0.5,
        AtkRange:96,
        CollisionBox:"C[16]",
        WaitBaseOnSpeed:-1
    };
    for (let i in data) bullet[i] = data[i];
    QJ.BL.Shoot(bullet);
    //====================================
}
QJ.BL.Shadow = function(character,data) {
    //====================================
    let tar = character==-1?$gamePlayer:
        (character==0?QJ.BL.getEvent():$gameMap.event(character));
    if (!tar) return;
    //====================================
    let bullet = {
        initialRotation:0,
        x:tar.boxScreenSubRealX(),
        y:tar.boxScreenSubRealY()+24,
        Speed:0,
        Img:[0,character],
        Bit:true
    };
    for (let i in data) bullet[i] = data[i];
    QJ.BL.Shoot(bullet);
    //====================================
}
QJ.BL.addShadow = function(character,data,time,delta) {
    //====================================
    let tar;
    if (character==-1) {
        tar = $gamePlayer;
    } else {
        if (character==0) tar = QJ.BL.getEvent();
        else tar = $gameMap.event(character);
    }
    //====================================
    tar.addShadowCircle(character==0?tar._eventId:character,data,QJ.BL.dealTime(time),delta);
    //====================================
}
Bitmap.prototype.getWAndH = function(text,fontsize) {
    var context = this._context;
    context.save();
    this.fontSize = fontsize;
    context.font = this._makeFontNameText();
    var data = context.measureText(text);
    context.restore();
    return data;
};
QJ.BL.Text = function(text,color,fontsize,linecolor,linewidth,character,data) {
    //====================================
    let tar = character==-1?$gamePlayer:
        (character==0?QJ.BL.getEvent():$gameMap.event(character));
    if (!tar) return;
    let d=tar.direction();
    let bitmapData = new Bitmap(1,1);
    let WAndH = bitmapData.getWAndH(text,fontsize),box;
    if (d==2||d==8) {
        box="R["+fontsize*96/72+","+(d==2||d==8?fontsize*96/72*(text.length+1):WAndH.width)+"]";
    } else {
        box="R["+(d==2||d==8?fontsize*96/72*(text.length+1):WAndH.width)+","+fontsize*96/72+"]";
    }
    //====================================
    let bullet = {
        Pierce:100,
        Speed:2,
        x:tar.boxScreenSubX()+(d==4?-text.length*(fontsize-4)/72*96/2:(d==6?text.length*(fontsize-4)/72*96/2:0)),
        y:tar.boxScreenSubY()+(d==8?-text.length*(fontsize-4)/72*96/2:(d==2?text.length*(fontsize-4)/72*96/2:0)),
        Img:[1,text,color,fontsize,(d==2||d==8?1:0),fontsize*96/72*(text.length+1),fontsize*96/72,linecolor,linewidth],
        CollisionBox:box,
        AnchorX:0.5,
        AnchorY:0.5,
        PierceAction:true,
        RotationAuto:0,
        initialRotation:(d==2?180:(d==4?270:(d==6?90:0))),
    };
    for (let i in data) bullet[i] = data[i];
    QJ.BL.Shoot(bullet);
    //====================================
}
QJ.BL.Pic = function(data) {
    //====================================
    let bullet = {
        Max:-1,
        initialRotation:0,
        AnchorX:0,
        AnchorY:0,
        x:0,
        y:0,
        Bit:true,
        Speed:0
    };
    for (let i in data) bullet[i] = data[i];
    QJ.BL.Shoot(bullet);
    //====================================
}
QJ.BL.Shoot = function(data,bo) {
    //======================================
    let bullet = {
        //======================================
        initialRotation:"PD[]",
        x:"P[]",
        y:"P[]",
        z:"C[]",
        scaleX:100,
        scaleY:100,
        //======================================
        MoveType:"S[]",
        Regions:[],
        Terrains:[],
        Target:[],
        Pierce:0,
        //======================================
        Img:"bullet0",
        Anim:0,
        DeadCount:0,
        Speed:12,
        Max:120,
        RotationAuto:-1,
        //======================================
        Action:[],
        CollisionBox:"R[4,4]",
        //======================================
        Tone:[0,0,0,0],
        Opacity:255,
        AfterImage:[],
        Light:[],
        Particles:[],
        AtkRange:0,
        DeadAction:false,
        PierceAction:false,
        NoCollisionAction:false,
        DeadAnim:true,
        PierceAnim:false,
        NoCollisionAnim:false,
        ReBound:false,
        AnchorX:0.5,
        AnchorY:0,
        rTRotation:"",
        WaitBaseOnSpeed:-2,
        LMD:true,
        Bit:false,
        //======================================
        UpdateJS:"",
        MoveJS:[],
        DeadJS:"",
        UpdateQT:"",
        MoveQT:[],
        DeadQT:"",
        Name:"",
        noPassDo:false
        //======================================
    };
    //======================================
    if (!bo) {
        for (let i in data) bullet[i] = data[i];
    } else bullet=data;
    //======================================
    let event=QJ.BL.getEvent();
    //======================================
    
    bullet["MoveType"] = QJ.BL.dealMoveType(bullet["MoveType"],event);
    if (bullet["MoveType"][0]==9) {
        //empty
    } else {
        GroupRandomList = []
        GroupRandomReLoad = false;
        bullet["x"] = QJ.BL.dealX(bullet["x"],event);
        GroupRandomReLoad = true;
        bullet["y"] = QJ.BL.dealY(bullet["y"],event);
        bullet["initialRotation"] = 
            QJ.BL.dealInitialRotation(bullet["initialRotation"],event,bullet["x"],bullet["y"]);
    }
    bullet["z"] = QJ.BL.dealZ(bullet["z"],event);
    bullet["CollisionBox"] = QJ.BL.dealCollisionBox(bullet["CollisionBox"]);
    if (typeof bullet["Img"] == "object"&&bullet["Img"][0]==0&&bullet["Img"][1]==0) 
        bullet["Img"][1] = QJ.BL.getEvent()._eventId;
    //======================================
    //console.log(bullet);
    bullet.scaleX = new QJFrame("scaleX",bullet.scaleX,0);
    bullet.scaleY = new QJFrame("scaleY",bullet.scaleY,0);
    bullet.Speed = new QJFrame("Speed",bullet.Speed,0);
    bullet.Opacity = new QJFrame("Opacity",bullet.Opacity,0);
    bullet.ReBound = (typeof bullet.ReBound == "boolean"?(bullet.ReBound?999999:0):bullet.ReBound);
    bullet.Max = QJ.BL.dealMax(bullet.Max,event);
    //======================================
    if (QJ.BL.findNull(bullet)) return null;
    return $gameMap.addBullet(bullet,0);
    //======================================
}
QJ.BL.deleteBullet = function(name) {
    for (let i of $gameMap._mapBullets) {
        if (!i) continue;
        if (i.bulletMode!=0||!i.data.Name) continue;
        if (i.data.Name==name) {
            i.setDirectDead();
        }
    }
}
QJ.BL.setBulletDisappear = function(name) {
    for (let i of $gameMap._mapBullets) {
        if (!i) continue;
        if (i.bulletMode!=0||!i.data.Name) continue;
        if (i.data.Name==name) {
            i.setDeadDisappear();
        }
    }
}
QJ.BL.Quick = function(id,data) {
    if (!Preset[String(id)]) {
        console.log("id为"+id+"的预设不存在。");
        return;
    }
    let bullet = JsonEx.makeDeepCopy(Preset[String(id)]);
    for (let i in data) bullet[i] = data[i];
    QJ.BL.Shoot(bullet,true);
}
//=======================================LASER=======================================LASER
QJ.BL.Laser = function(data) {
    //======================================
    let bullet={
        name:-1,
        initialRotation:"M[]",
        RotationAuto:-1,
        x:"P[]",
        y:"P[]",
        z:"C[]",
        Action:[],
        Regions:[],
        Terrains:[],
        Target:[],
        Img:"laser1",
        ImgPoint:"laser1Point",
        DeadCount:0,
        Tone:[0,0,0,0],
        Opacity:255,
        Width:12,
        AtkWait:30,
        ReBound:10,
        Max:120,
        ScaleX:100,
        MaxLength:960,
        noPassDo:false,
        UpdateJS:""
    }
    //======================================
    for (let i in data) bullet[i] = data[i];
    //======================================
    let event=QJ.BL.getEvent();
    bullet.z = QJ.BL.dealZ(bullet.z,QJ.BL.getEvent(),false);
    if (event) {
        if (typeof bullet.x == "string") bullet.x=bullet.x.replace(/E\[0\]/ig,"E["+event._eventId+"]");
        if (typeof bullet.y == "string") bullet.y=bullet.y.replace(/E\[0\]/ig,"E["+event._eventId+"]");
        if (typeof bullet.initialRotation == "string") 
            bullet.initialRotation=bullet.initialRotation.replace(/D\[0\]/ig,"D["+event._eventId+"]");
    }
    //======================================
    bullet.Opacity= new QJFrame("Opacity",bullet.Opacity,0);
    bullet.ScaleX = new QJFrame("scaleX",bullet.ScaleX,0);
    bullet.Width = new QJFrame("Width",bullet.Width,0);
    bullet.Max = QJ.BL.dealMax(bullet.Max,event);
    bullet.MaxLength = new QJFrame("MaxLength",bullet.MaxLength,0);
    //======================================
    if (QJ.BL.findNull(bullet)) return null;
    return $gameMap.addBullet(bullet,1);
    //======================================
}
QJ.BL.deleteLaser = function(name) {
    for (let i of $gameMap._mapBullets) {
        if (!i) continue;
        if (i.bulletMode!=1) continue;
        if (i.data.name==name) {
            i.setDead();
        }
    }
}
QJ.BL.deleteTwoPoint = function(name) {
    for (let i of $gameMap._mapBullets) {
        if (!i) continue;
        if (i.bulletMode!=2) continue;
        if (i.data.name==name) {
            i.setDead();
        }
    }
}
QJ.BL.dealCharacter = function(data) {
    if (typeof data == "number") {
        if (data==-1) return $gamePlayer;
        else if (data==0) return QJ.BL.getEvent()?QJ.BL.getEvent():null;
        else return $gameMap.event(data)?$gameMap.event(data):null;
    } else return data;
}
QJ.BL.TwoPoint = function(x1,y1,x2,y2,data) {
    //======================================
    let bullet={
        Img:"electricity[4,5]",
        Max:240,
        DeadCount:5,
        x1:x1,
        y1:y1,
        x2:x2,
        y2:y2,
        z:3,
        Opacity:255,
        Tone:[0,0,0,0],
        ScaleX:100,
        Action:[],
        Target:[],
        Width:24,
        AtkWait:30,
        ExtraRotation:0,
        AtkRange:0
    }
    //======================================
    for (let i in data) bullet[i] = data[i];
    //======================================
    let event=QJ.BL.getEvent();
    bullet.z = QJ.BL.dealZ(bullet.z,QJ.BL.getEvent(),false);
    if (event) {
        if (typeof bullet.x1 == "string") bullet.x1=bullet.x1.replace(/E\[0\]/ig,"E["+event._eventId+"]");
        if (typeof bullet.y1 == "string") bullet.y1=bullet.y1.replace(/E\[0\]/ig,"E["+event._eventId+"]");
        if (typeof bullet.x2 == "string") bullet.x2=bullet.x2.replace(/E\[0\]/ig,"E["+event._eventId+"]");
        if (typeof bullet.y2 == "string") bullet.y2=bullet.y2.replace(/E\[0\]/ig,"E["+event._eventId+"]");
    }
    //======================================
    bullet.Opacity= new QJFrame("Opacity",bullet.Opacity,0);
    bullet.ScaleX = new QJFrame("scaleX",bullet.ScaleX,0);
    bullet.Width = new QJFrame("Width",bullet.Width,0);
    bullet.Max = QJ.BL.dealMax(bullet.Max,event);
    //======================================
    if (QJ.BL.findNull(bullet)) return null;
    return $gameMap.addBullet(bullet,2);
    //======================================
}
QJ.BL.quickOrder = function(id) {
    if (!PresetText[String(id)]) {
        console.log("id为"+id+"的预设不存在。");
        return;
    }
    PresetText[id].call(this);
}
//=============================================================================
//ImageManager.
//=============================================================================
ImageManager.loadBullet = function(filename) {
    return this.loadBitmap('img/bullets/', filename, 0, false);
};
ImageManager.reserveBullet = function(filename) {
    return this.reserveBitmap('img/bullets/', filename, 0, false, null);
};
//=============================================================================
//Event.
//=============================================================================
const QJBL_Game_Event_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    QJBL_Game_Event_initMembers.call(this);
    this._annotationData = "";
    this._groupData = null;
};
const QJBL_Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    QJBL_Game_Event_setupPage.call(this);
    this.refreshBodyBox();
    this._annotationData = QJ.BL.calculateAnnotation(this);
    this._groupData = QJ.BL.calculateGroup(this._annotationData);
    if (this._groupData!="") {
        $gameMap._groupList[this._groupData] = null;
    }
};
//=============================================================================
//Map.
//=============================================================================
Game_Map.prototype.maxScreenWidth = function() {
    return this._maxScreenWidth;
};
Game_Map.prototype.maxScreenHeight = function() {
    return this._maxScreenHeight;
};
Game_Map.prototype.regionBox = function(id) {
    return this._regionBox[id]||[];
};
Game_Map.prototype.terrainBox = function(id) {
    return this._terrainBox[id]||[];
};
Game_Map.prototype.noPassBox = function(x,y) {
    if (x<0||x>=$gameMap.width()||y<0||y>=$gameMap.height()) return true;
    return this._noPassBox[x][y];
};
Game_Map.prototype.noPassBoxNow = function(x,y) {
    if (x<0||x>=$gameMap.width()||y<0||y>=$gameMap.height()) return true;
    return this._noPassBoxNow[x][y];
};
Game_Map.prototype.judgeColliedWithRegion = function(body,id) {
    return false;
};
Game_Map.prototype.judgeColliedWithTerrain = function(body,id) {
    return false;
};
Game_Map.prototype.refreshMapBox = function() {
    //console.time("allTime");
    //========================================
    this._regionBox={};
    this._terrainBox={};
    this._maxScreenWidth=this.width()*tileSize;
    this._maxScreenHeight=this.height()*tileSize;
    let rB = this._regionBox;
    let tB = this._terrainBox;
    let lastR=0,lastT=0;
    //========================================
    for (let x=0,xl=$dataMap.width;x<xl;x++) {
        for (let y=0,yl=$dataMap.height;y<=yl;y++) {
            //========================================
            if (y==yl) {
                for (let e=1;e<9;e++) {
                    if (!rB[e]) continue;
                    if (rB[e][rB[e].length-1][0]!=0) continue;
                    let last = rB[e][rB[e].length-1];
                    rB[e][rB[e].length-1] = QJ.BL.box(
                        (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                }
                for (let e=1;e<8;e++) {
                    if (!tB[e]) continue;
                    if (tB[e][tB[e].length-1][0]!=0) continue;
                    let last = tB[e][tB[e].length-1];
                    tB[e][tB[e].length-1] = QJ.BL.box(
                        (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                }
                lastR=0;lastT=0;
                break;
            }
            //========================================
            while (true) {
                let r = this.regionId(x,y);
                if (r==0) {
                    if (lastR!=0) {
                        let last = rB[lastR][rB[lastR].length-1];
                        rB[lastR][rB[lastR].length-1] = QJ.BL.box(
                            (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                    }
                    lastR=r;
                    break;
                } else if (lastR!=r) {
                    if (lastR!=0) {
                        let last = rB[lastR][rB[lastR].length-1];
                        rB[lastR][rB[lastR].length-1] = QJ.BL.box(
                            (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                    }
                    lastR=r;
                    if (!rB[r]) rB[r]=[[0,x,y,1]];
                    else rB[r].push([0,x,y,1]);
                    break;
                } else {
                    let last = rB[r][rB[r].length-1];
                    if (last[1]==x&&last[2]+last[3]==y) last[3]++;
                    else {
                        rB[r][rB[r].length-1] = QJ.BL.box(
                            (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                    }
                }
                break;
            }
            //========================================
            while (true) {
                let r = this.terrainTag(x,y);
                if (r==0) {
                    if (lastT!=0) {
                        let last = tB[lastT][tB[lastT].length-1];
                        tB[lastT][tB[lastT].length-1] = QJ.BL.box(
                            (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                    }
                    lastT=r;
                    break;
                } else if (lastT!=r) {
                    if (lastT!=0) {
                        let last = tB[lastT][tB[lastT].length-1];
                        tB[lastT][tB[lastT].length-1] = QJ.BL.box(
                            (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                    }
                    lastT=r;
                    if (!tB[r]) tB[r]=[[0,x,y,1]];
                    else tB[r].push([0,x,y,1]);
                    break;
                } else {
                    let last = tB[r][tB[r].length-1];
                    if (last[1]==x&&last[2]+last[3]==y) last[3]++;
                    else {
                        tB[r][tB[r].length-1] = QJ.BL.box(
                            (last[1]+0.5)*48,(last[2]+last[3]/2)*48,[1,48,last[3]*48]);
                    }
                }
                break;
            }
            //========================================
        }
    }
    //========================================
    this._noPassBox=[];
    this._noPassBoxNow=[];
    let nP = this._noPassBox;
    let g2,g4,g6,g8;
    for (let x=0,xl=$dataMap.width;x<xl;x++) {
        nP[x] = [];
        for (let y=0,yl=$dataMap.height;y<yl;y++) {
            g2=this.isPassable(x,y,2);
            g4=this.isPassable(x,y,4);
            g6=this.isPassable(x,y,6);
            g8=this.isPassable(x,y,8);
            nP[x].push(g2&&g4&&g6&&g8);
        }
    }
    //========================================
    //console.timeEnd("allTime");
    //========================================
};
const QB_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    this._mapBullets = [];
    this._forceInterpreterQB = new Array();
    this._groupList = {};
    QB_Game_Map_setup.call(this,mapId);
    this.refreshMapBox();
    this.refreshUpdateBoxData();
};
Game_Map.prototype.refreshUpdateBoxData = function() {
    //====================================
    this._noPassBoxNow = JsonEx.makeDeepCopy(this._noPassBox);
    let nOBN = this._noPassBoxNow;
    for (let i of $gameMap.events()) {
        if (i.laserObstacle) nOBN[Math.floor(i.x+0.5)][Math.floor(i.y+0.5)] = false;
    }
    //====================================
    for (let i in this._groupList) {
        this._groupList[i] = QJ.BL.getGroupIdMap(i);
    }
    //====================================
};
const QJB_Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    QJB_Game_Map_update.call(this,sceneActive);
    //====================================
    this.refreshUpdateBoxData();
    //====================================
    for (let i=0,l=this._forceInterpreterQB.length;i<l;i++) {
        if (!this._forceInterpreterQB[i]) continue;
        if (!this._forceInterpreterQB[i].isRunning()) {
            this._forceInterpreterQB[i].setup(
                $dataCommonEvents[this._forceInterpreterQB[i].commonEventId].list,
                this._forceInterpreterQB[i].EID>0?this._forceInterpreterQB[i].EID:0);
        }
        this._forceInterpreterQB[i].update();
    }
    //====================================
    $gameMap._aliveBullet=0;
    //console.time("allTime");
    this._mapBullets.forEach(function(bullet) {
        if (bullet) {
            $gameMap._aliveBullet++;
            bullet.update();
        }
    });
    //console.timeEnd("allTime");
    //====================================
}
Game_Map.prototype.bulletsNumber = function() {
    return $gameMap._aliveBullet;
};
Game_Map.prototype.addBullet = function(bullet,type) {
    if (showWarn) {
        if ($gameMap._aliveBullet>=maxbullet) {
            console.warn("The number of bullets has reached the limit."+
                "And the number is"+$gameMap._aliveBullet+".");
            return null;
        }
    }
    let bulletsTarget;
    if (!type) bulletsTarget=new Game_QJBullet(bullet,this._mapBullets.length);
    else if (type==1) bulletsTarget=new Game_QJLaser(bullet,this._mapBullets.length);
    else if (type==2) bulletsTarget=new Game_QJTwoPoint(bullet,this._mapBullets.length);
    this._mapBullets.push(bulletsTarget);
    if (!this._mapBullets[this._mapBullets.length-1].dead)
       SceneManager._scene._spriteset.createBullet(this._mapBullets.length-1,type);
    return bulletsTarget;
};
Game_Map.prototype.removeBullet = function(index) {
    let data=this._mapBullets[index];
    if (data) {
        //=====================remove sprite=====================
        let sprite = this.findBulletSprite(data);
        if (sprite) {
            if (sprite.parent) sprite.parent.removeChild(sprite);
            sprite.destroy();
        }
        //=====================remove data=======================
        data.destroy();
        this._mapBullets[index] = null;
        //=======================================================
    }
};
Game_Map.prototype.bullet = function(index) {
    return this._mapBullets[index];
};
Game_Map.prototype.findBulletSprite = function(data) {
    if (!SceneManager._scene._spriteset) return null;
    let contain,target = null;
    if (data.data.z=="T") {
        contain = SceneManager._scene._spriteset._parallaxBulletContainer;
    } else if (data.data.z=="M") {
        contain = SceneManager._scene._spriteset._mapBulletContainer;
    } else if (data.data.z=="P") {
        contain = SceneManager._scene._spriteset._upperBulletContainer;
    } else {
        contain = SceneManager._scene._spriteset._lowerBulletContainer;
    }
    for (let i of contain.children) {
        if (i.o==data) {
            target = i;
            break;
        }
    }
    return target;
};
//=============================================================================
//Extra plugin order.
//=============================================================================
QJ.BL.callCE = function (id,bullet) {
    QJ.BL.callCommonEvent(id,0,[],{x:bullet.screenShowX(),y:bullet.screenShowY()});
}
QJ.BL.SetMove = function(bo) {
    forBidDestination = !(!!bo);
}
QJ.BL.ClearAll = function() {
    if (!SceneManager._scene) return;
    if (!SceneManager._scene._spriteset) return;
    SceneManager._scene._spriteset.clearAllButtle();
    $gameMap._mapBullets = [];
}
//=============================================================================
//Boot.
//=============================================================================
const QJB_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    QJB_Scene_Boot_loadSystemImages.call(this);
    for (let i of reserveImg) {
        if (i.includes("|")) {
            let detail = i.split("|");
            for (let j of detail) {
                ImageManager.reserveBullet(j);
            }
        } else ImageManager.reserveBullet(i);
    }
};
//=============================================================================
//Bitmap
//=============================================================================
Bitmap.prototype.drawTextChangeRotation = function(text, x, y, maxWidth, lineHeight, align ,rotation) {
    if (text !== undefined) {
        var tx = x;
        var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
        var context = this._context;
        var alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        if (align === 'center') {
            tx += maxWidth / 2;
        }
        if (align === 'right') {
            tx += maxWidth;
        }
        context.save();
        context.translate(0,0);
        context.rotate(rotation);
        context.translate(0,-lineHeight+4);
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = 'alphabetic';
        context.globalAlpha = 1;
        this._drawTextOutline(text, tx, ty, maxWidth);
        context.globalAlpha = alpha;
        this._drawTextBody(text, tx, ty, maxWidth);
        context.restore();
        this._setDirty();
    }
};
Bitmap.prototype.drawTextVerticalRow = function(text, x, y, maxWidth, lineHeight, align) {
    if (text !== undefined) {
        var tx = x + lineHeight / 2;
        var ty = y + lineHeight;
        var context = this._context;
        var alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        context.save();
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = 'alphabetic';
        for (let i=0;i<text.length;i++) {
            context.globalAlpha = 1;
            this._drawTextOutline(text[i], tx, ty+i*lineHeight, maxWidth);
            context.globalAlpha = alpha;
            this._drawTextBody(text[i], tx, ty+i*lineHeight, maxWidth);
        }
        context.restore();
        this._setDirty();
    }
};
//=============================================================================
//Game_InterpreterForceQBEvent
//=============================================================================
Game_InterpreterForceQBEvent.prototype = Object.create(Game_Interpreter.prototype);
Game_InterpreterForceQBEvent.prototype.constructor = Game_InterpreterForceQBEvent;
Game_InterpreterForceQBEvent.prototype.initialize = function(pageIndex) {
    Game_Interpreter.prototype.initialize.call(this,0);
    this.pageIndex=pageIndex;
};
Game_InterpreterForceQBEvent.prototype.terminate = function() {
    $gameMap.event(this.eventId())._forceInterpreterQB.splice(
        $gameMap.event(this.eventId())._forceInterpreterQB.indexOf(this),1);
    Game_Interpreter.prototype.terminate.call(this);
};
//=============================================================================
//Game_InterpreterForceQBCommonEvent
//=============================================================================
Game_InterpreterForceQBCommonEvent.prototype = Object.create(Game_Interpreter.prototype);
Game_InterpreterForceQBCommonEvent.prototype.constructor = Game_InterpreterForceQBCommonEvent;
Game_InterpreterForceQBCommonEvent.prototype.initialize = function(id,eid,bp,bulletCanUseData) {
    Game_Interpreter.prototype.initialize.call(this,0);
    this.commonEventId=id;
    this.EID=eid;
    this.BP=bp;
    this.bullet = bulletCanUseData;
};
Game_InterpreterForceQBCommonEvent.prototype.terminate = function() {
    $gameMap._forceInterpreterQB.splice($gameMap._forceInterpreterQB.indexOf(this),1);
    Game_Interpreter.prototype.terminate.call(this);
};
//=============================================================================
//Base Tool.
//=============================================================================
QJ.BL.randomColor = function(start,length) {
    return QJ.BL.rgbToHex({
        r:start+Math.floor(Math.random()*length),
        g:start+Math.floor(Math.random()*length),
        b:start+Math.floor(Math.random()*length)});
}
QJ.BL.ColorGrad = function(bitmap,content,x,y,w,h,ro) {
    if (!content.includes("|")) return content;
    const list=content.split("~");
    const colorNum = list.length;
    const grad = bitmap._context.createLinearGradient(x,y,x+w*Math.sin(ro),y-h*Math.cos(ro));
    for(let i=0; i<colorNum; i++) {
        let detail = list[i].split("|");
        grad.addColorStop(detail[0],detail[1]);
    }
    return grad;
}
QJ.BL.hexToRgb = function (hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {r: parseInt(result[1],16),g: parseInt(result[2], 16),b: parseInt(result[3], 16)};
}
QJ.BL.rgbToHex = function (rgb) {
    let r=rgb.r.toString(16),g=rgb.g.toString(16),b=rgb.b.toString(16);
    return "#"+(r.length==1?("0"+r):r)+(g.length==1?("0"+g):g)+(b.length==1?("0"+b):b);
}
QJ.BL.calculateAngleByTwoPoint=function(x,y,ex,ey){
    let ro;
    if (ex>x&&ey<y)  ro=(-Math.atan((x-ex)/(y-ey)));
    if (ex>x&&ey>y)  ro=(Math.PI-Math.atan((x-ex)/(y-ey)));
    if (ex<x&&ey>y)  ro=(Math.PI-Math.atan((x-ex)/(y-ey)));
    if (ex<x&&ey<y)  ro=(2*Math.PI-Math.atan((x-ex)/(y-ey)));
    if (ex==x&&ey>y) ro=Math.PI;
    if (ex==x&&ey<y) ro=0;
    if (ex>x&&ey==y) ro=Math.PI/2;
    if (ex<x&&ey==y) ro=Math.PI*3/2;
    if (ex==x&&ey==y)ro=null;//说明在同一点
    return ro;
};
QJ.BL.calculateAngleByDirection=function(direction){
    if (direction==1) return Math.PI*5/4;//左下
    if (direction==2) return Math.PI;
    if (direction==3) return Math.PI*3/4;//右下
    if (direction==4) return Math.PI*3/2;
    if (direction==6) return Math.PI/2;
    if (direction==7) return Math.PI*7/4;//左上
    if (direction==8) return 0;
    if (direction==9) return Math.PI/4;//右上
    return 0;
};
QJ.BL.calculateAnnotation = function(event) {
    let page=null,content="";
    try{
        page=event.page();
    } catch(e) {
        page=null;
    }
    if (page) {
        if (page.list[0].code === 108) {
            let i=0;
            while (page.list[i].code === 408 || page.list[i].code === 108) {
                content=content + page.list[i].parameters[0];
                i++;
            }
        }
    }
    return content;
};
QJ.BL.calculateGroup = function(content) {
    let detail = content.match(/<Group:[^>]*>/i);
    return detail?(detail[0].substr(8,detail[0].length-10)):"";
};
QJ.BL.getGroup = function(name) {
    return $gameMap.events().filter((event)=>{
        return event&&event._groupData==name;
    });
};
QJ.BL.getGroupId = function(name) {
    return $gameMap._groupList[name];
};
QJ.BL.getGroupIdInRange = function(name,ox,oy,range) {
    let eventData,ax,ay;
    range=range*range;
    ox+=$gameMap.displayX()*48;
    oy+=$gameMap.displayY()*48;
    return $gameMap._groupList[name].filter((event)=>{
        if (!event) return false;
        eventData = $gameMap.event(event);
        if (!eventData) return false;
        ax = eventData.boxScreenX() - ox;
        ay = eventData.boxScreenY() - oy;
        return ax*ax+ay*ay<=range;
    });
};
QJ.BL.getGroupIdMap = function(name) {
    return $gameMap.events().filter((event)=>{
        return event&&event._groupData==name;
    }).map((event)=>{
        return event._eventId;
    });
};
QJ.BL.getMinEventId = function(x,y,group,num,range) {
    let basedata=null,min=9999999,id=0;
    num=num||1;
    range=range||null;
    if (group) {
        basedata=QJ.BL.getGroup(group);
    } else {
        basedata=$gameMap.events();
    }
    let ax,ay,bx,by,dis;
    if (range&&range>0) {
        range=range*range;
        basedata = basedata.filter((event)=>{
            ax = event.boxScreenX()-x;
            ay = event.boxScreenY()-y;
            return ax*ax+ay*ay<=range;
        });
    }
    basedata = basedata.sort((a,b)=>{
        ax = a.boxScreenX();
        ay = a.boxScreenY();
        bx = b.boxScreenX();
        by = b.boxScreenY();
        dis = ((ax-x)*(ax-x)+(ay-y)*(ay-y))-((bx-x)*(bx-x)+(by-y)*(by-y));
        return dis>0?1:(dis<0?-1:0);
    });
    id = basedata[Math.min(num,basedata.length)-1];
    return id?id._eventId:0;
};
QJ.BL.getCommentId = function(name) {
    let basedata=$gameMap.events(),eventIdList=new Array();
    for (let i in basedata) {
        if (basedata[i].event().note.includes(name)) {
            if (basedata[i]._pageIndex>=0) {
                eventIdList.push(basedata[i]._eventId);
            }
        }
    }
    return eventIdList;
};
QJ.BL.getComment = function(name) {
    let basedata=$gameMap.events(),eventIdList=new Array();
    for (let i in basedata) {
        if (basedata[i].event().note.includes(name)) {
            if (basedata[i]._pageIndex>=0) {
                eventIdList.push(basedata[i]);
            }
        }
    }
    return eventIdList;
};
QJ.BL.getMinEventIdNobi = function(x,y,nobi) {
    let basedata=null,min=9999999,id=0;
    if (nobi) {
        basedata=QJ.BL.getComment(nobi);
    } else {
        basedata=$gameMap.events();
    }
    for (let i in basedata) {
        let length=(basedata[i].boxScreenX()-x)*(basedata[i].boxScreenX()-x)+
                   (basedata[i].boxScreenY()-y)*(basedata[i].boxScreenY()-y);
        if (length<min) {
            id=basedata[i]._eventId;
            min=length;
        }
    }
    return id;
};
QJ.BL.error=function(content){
    if (!showWarn) return;
    throw new Error("子弹数据中的"+content+"书写错误。");
};
QJ.BL.findNull=function(bullet){
    for (var i in bullet) {
        if (bullet[i]==null) {
            if (!showWarn) return true;
            console.error("参数录入有误，某子弹未成功创建。错误点："+i);
            return true;
        } 
    }
    return false;
};
QJ.BL.getAnnotation = function(event) {
    let page=null,content="";
    try{page=event.page();} catch(e) {page=null;}
    if (page) {
        if (page.list[0].code === 108) {
            let i=0;
            while (page.list[i].code === 408 || page.list[i].code === 108) {
                content=content + page.list[i].parameters[0];
                i++;
            }
        }
    }
    return content;
};
QJ.BL.dealCollisionBox = function(data) {
    let tarList=new Array();
    if (data[0]=="C") {
        let detail=eval(data.match(/\[[^\]]*\]/i)[0]);
        if (!detail||isNaN(Number(detail[0]))) return null;
        return [0,Number(detail[0])];
    } else if (data[0]=="R") {
        let detail=eval(data.match(/\[[^\]]*\]/i)[0]);
        if (!detail||isNaN(Number(detail[0]))||isNaN(Number(detail[1]))) return null;
        return [1,Number(detail[0]),Number(detail[1])];
    }
    return null;
};
//=============================================================================
//System.
//=============================================================================
const QJB_Game_Temp_setDestination = Game_Temp.prototype.setDestination
Game_Temp.prototype.setDestination = function(x, y) {
    if (forBidDestination) return;
    QJB_Game_Temp_setDestination.call(this,x,y);
};
Game_Map.prototype.xyQJLight = function(x,y,r,c,t) {
    if (!Imported.TerraxLighting) {
        console.warn("没有TerraxLighting插件，无法启动光效插件。");
        return;
    }
    let x1 = x;
    let y1 = y;
    let radius = r;
    let color = c;
    let time =t;
    let def = radius+","+color+","+time;
    Terrax_ABS_blast_x.push(x1);
    Terrax_ABS_blast_y.push(y1);
    Terrax_ABS_blast.push(def);
    Terrax_ABS_blast_duration.push(-1);
    Terrax_ABS_blast_fade.push(-1);
    Terrax_ABS_blast_grow.push(-1);
    Terrax_ABS_blast_mapid.push($gameMap.mapId());
};
const QJB_Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    QJBInter=this;
    return QJB_Game_Interpreter_executeCommand.call(this);
};
QJ.BL.getEvent = ()=>{
    return (typeof QJBInter == "number")?$gameMap.event(QJBInter):$gameMap.event(QJBInter._eventId);
};
//=============================================================================
//QJFrame./ fade effect.| direction effect.
//=============================================================================
QJFrame.prototype.initialize = function(name,orginData,dataType,noFadeCopy) {
    noFadeCopy = noFadeCopy||false;
    this.i = dataType;//0-number 1-text 2-degree
    this.n = name;
    this.d = {};
    this.m = 0;
    this.t = 0;
    this.rt = 0;
    this.isMode = true;
    if (typeof orginData == "string"&&orginData.includes("~")) {
        let data = orginData.split("~"),num=0,fadeT=0,last;
        for (let i=0,il=data.length,detail;i<il;i++) {
            if (data[i].includes("|")) {
                detail = data[i].split("|");
                if (dataType==0) num = Number(detail[1]);
                else if (dataType==1) num = detail[1];
                else if (dataType==2) num = Number(detail[1])*Math.PI/180;
                this.d[this.m] = num;
                if (noFadeCopy) {
                    for (let i=this.m,ll=Number(detail[0]);i<ll;i++) {
                        this.d[i] = num;
                    }
                }
                this.m+=Number(detail[0]);
                this.d[this.m] = num;
            } else if (data[i].includes("/")) {
                detail = data[i].split("/");
                fadeT = Number(detail[0]);
                if (dataType==0) {
                    num = Number(detail[1]);
                    last = this.d[this.m];
                    for (let j=1;j<=fadeT;j++) {
                        this.d[this.m+j] = last+(num-last)*j/fadeT;
                    }
                    this.m+=fadeT;
                    this.d[this.m] = num;
                } else if (dataType==1) {
                    num = QJ.BL.hexToRgb(detail[1]);
                    last = QJ.BL.hexToRgb(this.d[this.m])//[0,{r:0,g:0,b:0}];
                    for (let j=1;j<=fadeT;j++) {
                        this.d[this.m+j] = QJ.BL.rgbToHex({
                            r:Math.floor(last.r+(num.r-last.r)*j/fadeT),
                            g:Math.floor(last.g+(num.g-last.g)*j/fadeT),
                            b:Math.floor(last.b+(num.b-last.b)*j/fadeT)
                        });
                    }
                    this.m+=fadeT;
                    this.d[this.m] = detail[1];
                } else if (dataType==2) {
                    num = Number(detail[1])*Math.PI/180;
                    last = this.d[this.m];
                    for (let j=1;j<=fadeT;j++) {
                        this.d[this.m+j] = last+(num-last)*j/fadeT;
                    }
                    this.m+=fadeT;
                    this.d[this.m] = num;
                }
            } else if (data[i].includes("%")) {
                detail = data[i].split("%");
                fadeT = Number(detail[0]);
                if (dataType==0) {
                    num = Number(detail[1]);
                    last = this.d[this.m];
                    for (let j=1;j<=fadeT;j++) {
                        this.d[this.m+j] = num-(num-last)*Math.sqrt(1-Math.pow(j/fadeT,2));
                    }
                    this.m+=fadeT;
                    this.d[this.m] = num;
                } else if (dataType==1) {
                    num = QJ.BL.hexToRgb(detail[1]);
                    last = QJ.BL.hexToRgb(this.d[this.m])//[0,{r:0,g:0,b:0}];
                    for (let j=1,xs;j<=fadeT;j++) {
                        xs = Math.sqrt(1-Math.pow(j/fadeT,2));
                        this.d[this.m+j] = QJ.BL.rgbToHex({
                            r:Math.floor(num.r-(num.r-last.r)*xs),
                            g:Math.floor(num.g-(num.g-last.g)*xs),
                            b:Math.floor(num.b-(num.b-last.b)*xs)
                        });
                    }
                    this.m+=fadeT;
                    this.d[this.m] = detail[1];
                } else if (dataType==2) {
                    num = Number(detail[1])*Math.PI/180;
                    last = this.d[this.m];
                    for (let j=1;j<=fadeT;j++) {
                        this.d[this.m+j] = num-(num-last)*Math.sqrt(1-Math.pow(j/fadeT,2));
                    }
                    this.m+=fadeT;
                    this.d[this.m] = num;
                }
            }
        }
    } else {
        this.isMode = false;
        let num;
        if (dataType==0) num = Number(orginData);
        else if (dataType==1) num = orginData;
        else if (dataType==2) num = Number(orginData)*Math.PI/180;
        this.d[this.m] = num;
    }
};
QJFrame.prototype.get = function() {
    if (this.t>this.m) this.t = 0;
    if (this.d[this.t]!=undefined) this.rt = this.t;
    this.t++;
    return this.d[this.rt];
};
QJFrame.prototype.getOnly = function() {
    return this.d[this.rt];
};
QJFrame.prototype.getTar = function(i) {
    return this.d[i>this.m?0:i];
};
//=============================================================================
//Spriteset_Map
//=============================================================================
Spriteset_Map.prototype.clearAllButtle = function() {
    this._upperBulletContainer.removeChildren();
    this._lowerBulletContainer.removeChildren();
    this._parallaxBulletContainer.removeChildren();
    this._mapBulletContainer.removeChildren();
};
const QJB_Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
    QJB_Spriteset_Map_createParallax.call(this);
    this._parallaxBulletContainer = new Sprite_QJContainer();
    this._parallaxBulletContainerParticle = new Sprite_QJContainer(true);
    this._baseSprite.addChild(this._parallaxBulletContainerParticle);
    this._baseSprite.addChild(this._parallaxBulletContainer);
};
const QJB_Spriteset_creatBullets = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
    this._mapBulletContainer = new Sprite_QJContainer();
    this._mapBulletContainerParticle = new Sprite_QJContainer(true);
    this._mapBulletContainer.z = 0.5;
    this._mapBulletContainerParticle.z = 0.5;
    this._tilemap.addChild(this._mapBulletContainerParticle);
    this._tilemap.addChild(this._mapBulletContainer);
    QJB_Spriteset_creatBullets.call(this);
    this._upperBulletContainer = new Sprite_QJContainer();
    this._upperBulletContainerParticle = new Sprite_QJContainer(true);
    this._lowerBulletContainer = new Sprite_QJContainer();
    this._lowerBulletContainerParticle = new Sprite_QJContainer(true);
    //The upper container will be added later.
    //To ensure it will be added above picture.
    this.addChild(this._lowerBulletContainerParticle);
    this.addChild(this._lowerBulletContainer);
    if (!$gameMap._mapBullets) return;
    if ($gameMap._mapBullets.length==0) return;
    for (let i=0;i<$gameMap._mapBullets.length;i++) {
        if ($gameMap._mapBullets[i]) this.createBullet(i,$gameMap._mapBullets[i].bulletMode);
    }
};
const QJB_Spriteset_Base_createTimer = Spriteset_Base.prototype.createTimer;
Spriteset_Base.prototype.createTimer = function() {
    QJB_Spriteset_Base_createTimer.call(this);
    this.addChild(this._upperBulletContainerParticle);
    this.addChild(this._upperBulletContainer);
};
Spriteset_Map.prototype.createBullet = function(index,type) {
    let data=$gameMap._mapBullets[index],spriteData;
    if (!type) spriteData=new Sprite_QJBullet(index);
    else if (type==1) spriteData=new Sprite_QJLaser(index);
    else if (type==2) spriteData=new Sprite_QJTwoPoint(index);
    if (data.data.z=="T") {
        this._parallaxBulletContainer.addChild(spriteData);
        spriteData.particleParent = this._parallaxBulletContainerParticle;
    } else if (data.data.z=="M") {
        this._mapBulletContainer.addChild(spriteData);
        spriteData.particleParent = this._mapBulletContainerParticle;
    } else if (data.data.z=="P") {
        this._upperBulletContainer.addChild(spriteData);
        spriteData.particleParent = this._upperBulletContainerParticle;
    } else {
        this._lowerBulletContainer.addChild(spriteData);
        spriteData.particleParent = this._lowerBulletContainerParticle;
    }
};
//=============================================================================
//Sprite_QJContainer
//=============================================================================
function Sprite_QJContainer() {
    this.initialize.apply(this, arguments);
};
Sprite_QJContainer.prototype = Object.create(PIXI.Container.prototype);
Sprite_QJContainer.prototype.constructor = Sprite_QJContainer;
Sprite_QJContainer.prototype.initialize = function() {
    PIXI.Container.call(this);
    this.list={};
}
Sprite_QJContainer.prototype.addChildrenAtId = function(bulletSprite) {
    let bulletSpriteId=bulletSprite.QJParentid;
    if (this.list[bulletSpriteId]) {
        this.list[bulletSpriteId].addChild(bulletSprite);
    } else{
        let newContainer=new Sprite_QJPContainer(bulletSpriteId);
        this.addChild(newContainer);
        newContainer.addChild(bulletSprite);
        this.list[bulletSpriteId]=newContainer;
    }
};
Sprite_QJContainer.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
    if (this.AIBitmap) this.AIBitmap.clear();
    //Separate update and updateafterImage in order to forbid the flicker of afterimage.
    //I rule out the probable reason such as canvas drawing and basecontext update.
    //But i don`t know the real reason.
    this.children.forEach(function(child) {
        if (child.updateafterImage) {
            child.updateafterImage();
        }
    });
};
Sprite_QJContainer.prototype.drawAfterImage = function(x,y,r,c,o,w,h) {
    if (!this.AIBitmap) {
        this.AIBitmap = new Bitmap(Graphics.width+48*2,Graphics.height);
        let spriteAI = new Sprite(this.AIBitmap);
        spriteAI.x = -48;
        this.addChild(spriteAI);
    }
    let ctx = this.AIBitmap._context;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(r);
    ctx.fillStyle = c;
    ctx.globalAlpha = o;
    ctx.fillRect(-w/2,0,w,h);
    ctx.restore();
    this.AIBitmap._setDirty();
};
//=============================================================================
//Sprite_QJPContainer
//=============================================================================
function Sprite_QJPContainer() {
    this.initialize.apply(this, arguments);
};
Sprite_QJPContainer.prototype = Object.create(PIXI.particles.ParticleContainer.prototype);
Sprite_QJPContainer.prototype.constructor = Sprite_QJPContainer;
Sprite_QJPContainer.prototype.initialize = function(id) {
    PIXI.particles.ParticleContainer.call(this,10000,{
        rotation:true,
        scale:true,
        alpha:true,
        uvs:true
    });
    this.QJParentid=id;
};
Sprite_QJPContainer.prototype.update = function() {
    this.children.forEach(function(child) {
        if (child.update) {
            child.update();
        }
    });
};
//=============================================================================
//
//=============================================================================
const BL_Game_Variables_initialize = Game_Variables.prototype.initialize;
Game_Variables.prototype.initialize = function() {
    BL_Game_Variables_initialize.call(this);
    QJ.BL.initParam(this);
};
QJ.BL.initParam=function(gameVariables) {
    if (!gameVariables._playerInitBox) {
        gameVariables._playerInitBox=String(parameters['playerInitBox']) || "C[24]";
    }
    if (!gameVariables._playerInitBoxOffsetX) {
        gameVariables._playerInitBoxOffsetX=Number(parameters['playerInitBoxOffsetX']) || 0;
    }
    if (!gameVariables._playerInitBoxOffsetY) {
        gameVariables._playerInitBoxOffsetY=Number(parameters['playerInitBoxOffsetY']) || 0;
    }
    if (!gameVariables._eventInitBox) {
        gameVariables._eventInitBox=String(parameters['eventInitBox']) || "C[24]";
    }
    if (!gameVariables._eventInitBoxOffsetX) {
        gameVariables._eventInitBoxOffsetX=Number(parameters['eventInitBoxOffsetX']) || 0;
    }
    if (!gameVariables._eventInitBoxOffsetY) {
        gameVariables._eventInitBoxOffsetY=Number(parameters['eventInitBoxOffsetY']) || 0;
    }
}
QJ.BL.setDefaultEventBox=function(collisionBox,offsetx,offsety) {
    $gameVariables._eventInitBox=String(collisionBox) || "C[24]";
    $gameVariables._eventInitBoxOffsetX=Number(offsetx) || 0;
    $gameVariables._eventInitBoxOffsetY=Number(offsety) || 0;
    for (let i of $gameMap.events()) {
        i.refreshBodyBox();
    }
}
QJ.BL.setPlayerBox=function(collisionBox,offsetx,offsety) {
    $gameVariables._playerInitBox=String(collisionBox) || "C[24]";
    $gameVariables._playerInitBoxOffsetX=Number(offsetx) || 0;
    $gameVariables._playerInitBoxOffsetY=Number(offsety) || 0;
    $gamePlayer.refreshBodyBox();
}
//=============================================================================
//Game_CharacterBase.not consider jump now. 
//=============================================================================
Game_CharacterBase.prototype.boxShiftY = function() {
    return offsetGY?(this.isObjectCharacter() ? 0 : 6):0;
};
Game_CharacterBase.prototype.boxScreenSubX = function() {
    return (this._x + 0.5 - $gameMap.displayX()) * tileSize + this.boxOffsetX;
};
Game_CharacterBase.prototype.boxScreenSubY = function() {
    return (this._y + 0.5 - $gameMap.displayY()) * tileSize + this.boxOffsetY - this.boxShiftY();
};
Game_CharacterBase.prototype.boxScreenSubRealX = function() {
    return (this._realX + 0.5 - $gameMap.displayX()) * tileSize + this.boxOffsetX;
};
Game_CharacterBase.prototype.boxScreenSubRealY = function() {
    return (this._realY + 0.5 - $gameMap.displayY()) * tileSize + this.boxOffsetY - this.boxShiftY();
};
Game_CharacterBase.prototype.boxScreenX = function() {
    return (this._x + 0.5) * tileSize + this.boxOffsetX;
};
Game_CharacterBase.prototype.boxScreenY = function() {
    return (this._y + 0.5) * tileSize + this.boxOffsetY - this.boxShiftY();
};
Game_CharacterBase.prototype.boxScreenRealX = function() {
    return (this._realX + 0.5) * tileSize + this.boxOffsetX;
};
Game_CharacterBase.prototype.boxScreenRealY = function() {
    return (this._realY + 0.5) * tileSize + this.boxOffsetY - this.boxShiftY();
};
//=============================================================================
//Game_Event
//=============================================================================
const QJB_Game_Character_update = Game_Character.prototype.update;
Game_Character.prototype.update = function() {
    QJB_Game_Character_update.call(this);
    if (this.QJBody) this.updateBodyPosition();
    else this.refreshBodyBox();
    if (this.shadowCircle) this.updateShadowCirccle();
};
Game_Character.prototype.updateBodyPosition = function() {
    QJ.BL.setPostion(this.QJBody,this.boxScreenRealX(),this.boxScreenRealY());
};
//=============================================================================
//Shadow
//=============================================================================
Game_Character.prototype.addShadowCircle = function(character,data,time,delta) {
    if (typeof time == "number") {
        this.shadowCircle = [0,1,delta,time,character,data];
    } else {
        if (time[0]==0&&this==$gamePlayer) return;
        this.shadowCircle = [1,1,delta,time,character,data];
    }
    this.updateShadowCirccle();
};
Game_Character.prototype.updateShadowCirccle = function() {
    let sc = this.shadowCircle;
    if (sc[0]==0) {
        sc[1]--;
        if (sc[1]<=0) {
            sc[3]--;
            sc[1]=sc[2];
            QJ.BL.Shadow(sc[4],sc[5]);
            if (sc[3]<=0) {
                this.shadowCircle = null;
            }
        }
    } else {
        if (QJ.BL.dealTimeBoolean(sc[3],this)) this.shadowCircle = null;
        else {
            sc[1]--;
            if (sc[1]<=0) {
                sc[1]=sc[2];
                QJ.BL.Shadow(sc[4],sc[5]);
            }
        }
    }
};
//=============================================================================
//refreshBodyBox
//=============================================================================
Game_Character.prototype.refreshBodyBox = function() {
    //Empty
};
Game_Player.prototype.refreshBodyBox = function() {
    //========================================
    this.boxOffsetX=$gameVariables._playerInitBoxOffsetX;
    this.boxOffsetY=$gameVariables._playerInitBoxOffsetY;
    let boxType = $gameVariables._playerInitBox;
    this.QJBody = QJ.BL.box(this.boxScreenX(),this.boxScreenY(),QJ.BL.dealCollisionBox(boxType));
    //========================================
};
Game_Event.prototype.refreshBodyBox = function() {
    //========================================
    let content="",detail;
    try {content=QJ.BL.getAnnotation(this);} catch(e) {content="";}
    //========================================
    this.boxOffsetX=$gameVariables._eventInitBoxOffsetX;
    this.boxOffsetY=$gameVariables._eventInitBoxOffsetY;
    let boxType = $gameVariables._eventInitBox;
    //========================================
    detail=content.match(/<BoxOffset:([^\,]+)\,([^\,\>]+)>/i);
    if (detail) {
        if (!isNaN(Number(detail[1]))&&!isNaN(Number(detail[2]))) {
            this.boxOffsetX=Number(detail[1]);
            this.boxOffsetY=Number(detail[2]);
        } 
    }
    //========================================
    detail=content.match(/<BoxType:([^\>]+)>/i);
    if (detail) {
        boxType=eval(detail[1]);
    }
    //========================================
    detail=content.match(/<laserObstacle>/i);
    if (detail) {
        this.laserObstacle = true;
    } else this.laserObstacle = false;
    //========================================
    this.QJBody = QJ.BL.box(this.boxScreenX(),this.boxScreenY(),QJ.BL.dealCollisionBox(boxType));
    //========================================
};
Game_Vehicle.prototype.refreshBodyBox = function() {
    //Empty
};
Game_Follower.prototype.refreshBodyBox = function() {
    //Empty
};
//=============================================================================
//erase
//=============================================================================
/*const QJC_Game_Event_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function() {
    QJC_Game_Event_erase.call(this);
};*/
//=============================================================================
//Box Sprite.
//=============================================================================
const QJC_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    QJC_Spriteset_Map_createLowerLayer.call(this);
    this._collisionBoxSprite = new Sprite_CollisiobBox();
    this.addChild(this._collisionBoxSprite);
};
function Sprite_CollisiobBox() {
    this.initialize.apply(this, arguments);
}
Sprite_CollisiobBox.prototype = Object.create(Sprite.prototype);
Sprite_CollisiobBox.prototype.constructor = Sprite_CollisiobBox;
Sprite_CollisiobBox.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.visible = showBox;
    this.bitmap = new Bitmap(Graphics.width,Graphics.height);
    this.bitmap.paintOpacity = 80;
    QJ.BL.sprite = this;
};
Sprite_CollisiobBox.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Input.isTriggered("F10")) {
        showBox=!showBox;
        this.bitmap.clear();
        this.visible = showBox;
    }
    if (this.visible) {
        this.bitmap.clear();
        let dx = -$gameMap.displayX()*tileSize;
        let dy = -$gameMap.displayY()*tileSize;
        if ($gamePlayer.QJBody) this.drawBody($gamePlayer.QJBody,this.bitmap._context,dx,dy,characterShow);
        for (let i=0,el=$gameMap._events,ell=el.length;i<ell;i++) {
            if (!el[i]||!el[i].QJBody) continue;
            this.drawBody(el[i].QJBody,this.bitmap._context,dx,dy,characterShow);
        }
        for (let i of regionShow) {
            if (i.length!=2) continue;
            if (!$gameMap._regionBox[i[0]]) continue;
            this.drawBodies($gameMap._regionBox[i[0]],this.bitmap._context,dx,dy,i[1]);
        }
        for (let i of terrainShow) {
            if (i.length!=2) continue;
            if (!$gameMap._terrainBox[i[0]]) continue;
            this.drawBodies($gameMap._terrainBox[i[0]],this.bitmap._context,dx,dy,i[1]);
        }
        for (let i of $gameMap._mapBullets) {
            if (!i||!i.QJBody) continue;
            this.drawBody(i.QJBody,this.bitmap._context,dx,dy);
        }
    }
};
//QJ.BL.sprite.aBody(body);
Sprite_CollisiobBox.prototype.aBody = function(body) {
    this.bitmap.clear();
    let dx = -$gameMap.displayX()*tileSize;
    let dy = -$gameMap.displayY()*tileSize;
    this.drawBody(body,this.bitmap._context,dx,dy);
};
Sprite_CollisiobBox.prototype.drawBodies = function(list,c,dx,dy,color) {
    for (let i of list) {
        if (i) {
            this.drawBody(i,c,dx,dy,color);
        }
    }
};
Sprite_CollisiobBox.prototype.drawBody = function(body,c,dx,dy,color) {
    let posX = body.pos.x+dx,posY = body.pos.y+dy;
    c.beginPath();
    if (body.type==0) {//Circle 
        c.arc(posX,posY,body.r,0,2*Math.PI);
    } else if (body.type==1) {//Rectangle
        let bounds = body.calcPoints;
        c.moveTo(bounds[0].x+posX,bounds[0].y+posY);
        for (let j=1,jl=bounds.length;j<jl;j++) {
            c.lineTo(bounds[j].x+posX,bounds[j].y+posY);
        }
        c.lineTo(bounds[0].x+posX,bounds[0].y+posY);
    }
    c.closePath();
    c.fillStyle = color?color:(body.color?body.color:"#00FF00");
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = "#000000";
    c.stroke();
};
//=============================================================================
//
//=============================================================================
})();
//=============================================================================
//
//=============================================================================