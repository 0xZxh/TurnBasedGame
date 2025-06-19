# TurnBasedGame

简体中文 | [English](#english-version)

## 项目简介

**TurnBasedGame** 是一个用于实验回合制战斗机制的示例仓库。本文档整理了当前设计思路，包括战斗流程、技能、Buff 与配置文件格式等内容，方便后续实现与维护。

## 启动项目指南

- 安装 Node.js（建议 16 以上版本）。
- 克隆或下载本仓库到本地。
- 如需实际开发，可在根目录新建 `src/` 存放核心代码。
- 配置文件位于 `excel/` 目录，启动时按需加载。
- 若引入构建工具，可自行创建 `package.json` 并执行 `npm install` 安装依赖。
- 编写入口脚本初始化 `BattleManager` 等模块，便可开始调试。

## 战斗流程

```
[战斗开始] →
  [战斗循环开始] →
    [排序角色队列（速度等）] →
      [轮到角色行动] →
        [触发被动 OnTurnStart] →
        [选择技能（主动）] →
        [结算技能效果（属性、状态、伤害等）] →
        [触发被动 OnSkillUsed、OnHit 等] →
        [检查角色存活状态/战斗是否结束] →
    [下一个角色行动] →
  [战斗结束]
```

## 技能系统

### 主动技能
- 满足释放条件后选定目标并产生效果。
- 消耗 **EPS**（技能资源值）。
- 根据情况触发额外效果（如暴击、连击、吸血等）。

### 被动技能
- 常驻或在特定条件下触发，无需额外消耗。
- 通常绑定在角色生命周期事件上（如战斗开始、受到伤害等）。

## Buff 与状态

- 每个角色维护自身状态，可叠加并具有持续时间。
- Buff/Debuff 会影响角色属性或技能可用性，例如降低 EPS 上限。
- 状态变化可能同时影响 EPS、技能效果以及被动触发。

## 战斗框架

- **BattleManager**：负责控制整体战斗流程，包括回合循环与胜负判断。
- **Actor**：角色实体，包含属性、技能和 Buff 列表。
- **SkillSystem**：驱动技能释放流程，解析配置并触发事件。
- **BuffSystem**：管理 Buff 的添加、刷新与消失，处理持续效果。
- **EventSystem**：事件发布与订阅中心，供被动技能和 Buff 使用。
- **AI**：控制非玩家角色的行动决策。
- **DataLoader**：从 JSON 等配置文件加载战斗所需数据。
- **RecordManager**：可选的战斗记录与回放功能，方便调试。

## 配置文件示例

- `battleSkill.json`：定义技能基础信息、效果及触发方式。
- `battleEffect.json`：描述技能效果的具体参数和命中率等数据。
- `battleBuff.json`：管理 Buff 的持续时间、叠加规则和特效。
- `battleBullet.json`：法球或弹道类数据。
- `battleCaller.json`：召唤单位的属性、持续时间与技能列表。

更多字段请参考相应配置文件中的注释。

## 代码结构

本仓库提供一个简单的 `src/` 目录用于编写核心逻辑，目前包含以下文件：

- `BattleManager.ts`：控制战斗回合循环与结束判定。
- `Actor.ts`：描述角色属性与行动。
- `Skill.ts`：定义技能效果及释放流程。
- `types.ts`：枚举与接口集合。
- `index.ts`：演示如何初始化并运行一场简单战斗。

## 类型定义

以下枚举和接口用于描述战斗系统中的常见概念，方便在配置和代码中引用。

### EffectSelTag
- `dft`：当前目标
- `skill`：技能寻人
- `askill`：主技能寻人
- `askill_a`：主技能的出手者
- `askill_fist_hurt`：主技能的首个效果目标
- `fist_eft`：技能首个效果目标
- `fist_hurt`：技能首个伤害目标
- `last_eft`：最后一个效果目标
- `askill_eft_one`：主技能当前效果的当前目标
- `zi`：自己
- `zi_huo`：友军所有活人
- `zi_zi_aoe`：以自己为中心，小范围圆形友军
- `zi_di_aoe`：以自己为中心，小范围圆形敌人
- `di_huo`：敌方所有活人
- `di_n`：距离最近的敌人
- `di_f`：距离最远的敌人
- `di_j`：随机敌人
- `di_hp_low`：血量最低的敌人
- `zi_hp_low`：血量最低的友军
- `skill_di_aoe`：以技能目标为中心的小范围敌人
- `skill_zi_aoe`：以技能目标为中心的小范围友军
- `skill_di_mf_aoe`：以技能目标为方向的前方小范围扇形敌人
- `skill_di_rect`：以技能目标为方向的前方矩形敌人
- `skill_zi_rect`：以技能目标为方向的前方矩形友军
- `bulle`：法球目标
- `bulle_aoe`：以法球目标为中心的范围

### SkillType
- `pt`：普通攻击
- `dz`：大招，需要魔法
- `bsk`：被动技能

### EffectType
- `hurt_p`：普攻物理伤害
- `hurt_m`：普攻魔法伤害
- `hurt_p_dz`：大招物理伤害
- `hurt_m_dz`：大招魔法伤害
- `hurt3`：真实伤害
- `add_buff`：施加 Buff
- `add_buff_absorb`：护盾 Buff
- `del_buff`：净化 Buff
- `heal`：治疗
- `move`：击飞
- `call`：召唤
- `attr`：属性加成

### Buff_type
- `attr`：属性加成
- `dot`：持续伤害
- `xuanyun`：眩晕
- `hurt_ex`：额外真伤
- `hurt_per`：伤害增减
- `absorb`：吸收护盾
- `rebound`：反弹伤害
- `defBuff`：魔免盾
- `qishi_shanghai`：气势技能伤害
- `mpoff`：沉默
- `changeSkill`：技能替换

### SkillStage
- `start`：前摇
- `fang`：发出技能
- `hit`：击中
- `stop`：打断
`BuffParam` 与 `BuffParam_call` 接口定义了被动技能或 Buff 的详细参数，包括属性增幅、数值倍率和召唤单位等，可按需求扩展。

### PassDo
- `create`：英雄被创建
- `neal_die`：自己濒死
- `die`：自己死亡
- `kill`：击杀他人
- `otherDie`：他人死亡
- `buff_attr`：Buff 属性重构
- `buff_dot`：Buff DOT 回调
- `at_s_pt`：普攻前
- `at_e_pt`：普攻后
- `at_e_mp`：大招后
- `hurt_a_f_s`：首次伤害前
- `hurt_a_s`：伤害前
- `hurt_a_e`：伤害后
- `hurt_b_e`：被打后
- `hurt_a_e_pt`：普攻伤害后
- `hurt_a_e_bj`：暴击后
- `shanbi_b_e`：闪避后
- `subhp_b_e`：自身扣血后
- `heal_b_e`：被动治疗后
- `changeSkill`：技能转换

### Pass_pram
- `hpLow`：生命值低于
- `hpHig`：生命值高于
- `limit`：次数限制
- `skills`：技能 ID 组
- `haveBuffZid`：拥有 Buff 组 ID

### CondParam
- `buff`：目标是否拥有指定 Buff
- `isbuff`：触发的 Buff 是否为指定 Buff
- `hpLow`：自身生命值低于
- `hpLow_b`：目标生命值低于
- `hpHight`：自身生命值高于

## English Version

### Overview

**TurnBasedGame** is a sample repository for experimenting with a turn-based battle system. This document summarizes the current design, covering the battle flow, skills, buffs and configuration formats.

### Project Setup

- Install Node.js (version 16 or above recommended).
- Clone or download this repository.
- Create a `src/` folder for your core logic if implementing the framework.
- The configuration JSON files reside in `excel/`. Load them as needed.
- If you use build tools, create a `package.json` and run `npm install` to install dependencies.
- Write an entry script that initializes modules like `BattleManager` for testing.

### Battle Flow

```
[Battle Start] →
  [Battle Loop Begin] →
    [Sort actors by speed] →
      [Actor's turn] →
        [Trigger passive OnTurnStart] →
        [Choose active skill] →
        [Resolve skill effects] →
        [Trigger passives such as OnSkillUsed, OnHit] →
        [Check actor status / battle end] →
    [Next actor] →
  [Battle End]
```

### Skill System

- **Active Skills**: consume EPS, target specific units and may trigger bonus effects.
- **Passive Skills**: always active or triggered by conditions without EPS cost.

### Buffs

- Characters maintain their own buffs which may stack and have durations.
- Buffs/Debuffs can affect skill availability or alter stats such as EPS capacity.

### Battle Framework

- **BattleManager**: controls the overall flow including turns and win checks.
- **Actor**: entity containing attributes, skills and a buff list.
- **SkillSystem**: drives skill usage, parses configs and emits events.
- **BuffSystem**: handles adding, refreshing and removing buffs with periodic effects.
- **EventSystem**: central event bus used by passives and buffs.
- **AI**: governs decision making for non-player units.
- **DataLoader**: loads battle data from JSON or other formats.
- **RecordManager**: optional recording and replay support for debugging.

### Configuration Examples

Refer to the various `battle*.json` files for details on skills, effects, buffs, bullets and summoned units.

## Project Structure

Core logic resides under `src/` and currently contains:

- `BattleManager.ts`: handles the battle loop and win checks.
- `Actor.ts`: represents a combat unit.
- `Skill.ts`: skill definitions and casting logic.
- `types.ts`: shared enums and interfaces.
- `index.ts`: small demo showing how to start a battle.

## Type Definitions

The following enums and interfaces describe common concepts used throughout the battle system.

### EffectSelTag
- `dft`: current target
- `skill`: search via skill
- `askill`: search for main skill target
- `askill_a`: source actor of the main skill
- `askill_fist_hurt`: first effect target of the main skill
- `fist_eft`: first effect target
- `fist_hurt`: first hurt target
- `last_eft`: last effect target
- `askill_eft_one`: current effect target of the main skill
- `zi`: self
- `zi_huo`: all living allies
- `zi_zi_aoe`: small ally area around self
- `zi_di_aoe`: small enemy area around self
- `di_huo`: all living enemies
- `di_n`: nearest enemy
- `di_f`: farthest enemy
- `di_j`: random enemy
- `di_hp_low`: enemy with lowest HP
- `zi_hp_low`: ally with lowest HP
- `skill_di_aoe`: small enemy area around skill target
- `skill_zi_aoe`: small ally area around skill target
- `skill_di_mf_aoe`: small frontal cone toward skill target
- `skill_di_rect`: frontal rectangle toward skill target (enemies)
- `skill_zi_rect`: frontal rectangle toward skill target (allies)
- `bulle`: projectile target
- `bulle_aoe`: area centered on projectile target

### SkillType
- `pt`: normal attack
- `dz`: ultimate skill (requires mana)
- `bsk`: passive skill

### EffectType
- `hurt_p`: physical damage
- `hurt_m`: magic damage
- `hurt_p_dz`: physical damage (ultimate)
- `hurt_m_dz`: magic damage (ultimate)
- `hurt3`: true damage
- `add_buff`: apply buff
- `add_buff_absorb`: apply shield buff
- `del_buff`: dispel buff
- `heal`: healing
- `move`: knockback
- `call`: summon
- `attr`: modify attributes

### Buff_type
- `attr`: attribute bonus
- `dot`: damage over time
- `xuanyun`: stun
- `hurt_ex`: extra true damage
- `hurt_per`: damage modifier
- `absorb`: absorb shield
- `rebound`: damage reflection
- `defBuff`: immunity shield
- `qishi_shanghai`: momentum skill damage
- `mpoff`: silence
- `changeSkill`: skill replacement

### SkillStage
- `start`: start-up
- `fang`: skill launch
- `hit`: hit
- `stop`: interrupt

`BuffParam` and `BuffParam_call` define parameters for passive skills or buffs such as attribute scaling, shield values and summoned units.

### PassDo
- `create`: actor created
- `neal_die`: near death
- `die`: actor dies
- `kill`: kill someone
- `otherDie`: another actor dies
- `buff_attr`: buff attribute rebuild
- `buff_dot`: buff DOT callback
- `at_s_pt`: before normal attack
- `at_e_pt`: after normal attack
- `at_e_mp`: after ultimate
- `hurt_a_f_s`: before first hurt
- `hurt_a_s`: before hurt
- `hurt_a_e`: after hurt
- `hurt_b_e`: target hurt end
- `hurt_a_e_pt`: normal attack hurt end
- `hurt_a_e_bj`: after critical hit
- `shanbi_b_e`: after dodge
- `subhp_b_e`: after self damage
- `heal_b_e`: passive heal end
- `changeSkill`: skill replacement

### Pass_pram
- `hpLow`: HP lower than
- `hpHig`: HP higher than
- `limit`: trigger limit
- `skills`: skill ID list
- `haveBuffZid`: owns buff group ID

### CondParam
- `buff`: whether target has specified buff
- `isbuff`: whether triggered buff matches
- `hpLow`: self HP lower than
- `hpLow_b`: target HP lower than
- `hpHight`: self HP higher than
