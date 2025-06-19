// Import enums describing skill and effect types
import { EffectType, SkillType } from './types.js'
// Actor is used as the skill caster and target
import { Actor } from './Actor.js'

// Basic effect description for our demo
export interface SkillEffect {
  type: EffectType
  value: number
}

// Skill groups together multiple effects
export class Skill {
  // numeric id from config
  id: number
  // readable name
  name: string
  // skill classification
  type: SkillType
  // list of effects applied when casting
  effects: SkillEffect[]

  // create a skill instance
  constructor(id: number, name: string, type: SkillType, effects: SkillEffect[]) {
    this.id = id
    this.name = name
    this.type = type
    this.effects = effects
  }

  // apply all effects in order
  cast(caster: Actor) {
    for (const eff of this.effects) {
      this.resolveEffect(caster, eff)
    }
  }

  // very small resolver implementing a few effect types
  private resolveEffect(caster: Actor, eff: SkillEffect) {
    // simple demonstration: use caster as target for now
    const target = caster // placeholder for target selection
    switch (eff.type) {
      case EffectType.hurt_p:
      case EffectType.hurt_m:
      case EffectType.hurt3:
        target.receiveDamage(eff.value)
        break
      case EffectType.heal:
        target.hp = Math.min(target.hp + eff.value, target.maxHp)
        break
      default:
        // TODO handle more effect types
        break
    }
  }
}
