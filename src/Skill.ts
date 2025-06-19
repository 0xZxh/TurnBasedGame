import { EffectType, SkillType } from './types'
import { Actor } from './Actor'

export interface SkillEffect {
  type: EffectType
  value: number
}

export class Skill {
  id: number
  name: string
  type: SkillType
  effects: SkillEffect[]

  constructor(id: number, name: string, type: SkillType, effects: SkillEffect[]) {
    this.id = id
    this.name = name
    this.type = type
    this.effects = effects
  }

  cast(caster: Actor) {
    for (const eff of this.effects) {
      this.resolveEffect(caster, eff)
    }
  }

  private resolveEffect(caster: Actor, eff: SkillEffect) {
    // simple demonstration: handle hurt_p by reducing target HP
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
