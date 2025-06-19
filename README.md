# TurnBasedGame

简体中文 | [English](#english-version)

## 项目简介

**TurnBasedGame** 是一个用于实验回合制战斗机制的示例仓库。本文档整理了当前设计思路，包括战斗流程、技能、Buff 与配置文件格式等内容，方便后续实现与维护。

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

## 配置文件示例

- `battleSkill.json`：定义技能基础信息、效果及触发方式。
- `battleEffect.json`：描述技能效果的具体参数和命中率等数据。
- `battleBuff.json`：管理 Buff 的持续时间、叠加规则和特效。
- `battleBullet.json`：法球或弹道类数据。
- `battleCaller.json`：召唤单位的属性、持续时间与技能列表。

更多字段请参考相应配置文件中的注释。

---

## English Version

### Overview

**TurnBasedGame** is a sample repository for experimenting with a turn-based battle system. This document summarizes the current design, covering the battle flow, skills, buffs and configuration formats.

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

### Configuration Examples

Refer to the various `battle*.json` files for details on skills, effects, buffs, bullets and summoned units.
