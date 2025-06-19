import { BattleManager } from './BattleManager'
import { Actor } from './Actor'
import { Skill } from './Skill'
import { EffectType, SkillType } from './types'

const bm = new BattleManager()

const actorA = new Actor('A', 100, 1)
const actorB = new Actor('B', 100, 2)

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

bm.addActor(actorA)
bm.addActor(actorB)

bm.startBattle()

console.log('Winner:', bm.actors.find(a => a.isAlive())?.id)
