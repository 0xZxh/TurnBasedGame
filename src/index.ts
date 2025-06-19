// Core classes used in this quick demo
import { BattleManager } from './BattleManager.js'
import { Actor } from './Actor.js'
import { Skill } from './Skill.js'
import { EffectType, SkillType } from './types.js'

// create manager and two simple actors
const bm = new BattleManager()

const actorA = new Actor('A', 100, 1)
const actorB = new Actor('B', 100, 2)

// give each actor a basic attack skill
actorA.addSkill(
  new Skill(1, 'Punch', SkillType.pt, [
    { type: EffectType.hurt_p, value: 10 }
  ])
)

actorB.addSkill(
  new Skill(2, 'Kick', SkillType.pt, [
    { type: EffectType.hurt_p, value: 8 }
  ])
)

// register them to the battle
bm.addActor(actorA)
bm.addActor(actorB)

// start synchronous battle simulation
bm.startBattle()

// print winner id
console.log('Winner:', bm.actors.find(a => a.isAlive())?.id)
