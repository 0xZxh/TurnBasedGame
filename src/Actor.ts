import { Skill } from './Skill'

export class Actor {
  id: string
  hp: number
  maxHp: number
  team: number
  skills: Skill[] = []

  constructor(id: string, hp: number, team: number) {
    this.id = id
    this.hp = hp
    this.maxHp = hp
    this.team = team
  }

  addSkill(skill: Skill) {
    this.skills.push(skill)
  }

  isAlive() {
    return this.hp > 0
  }

  onTurnStart() {
    // TODO: handle passive triggers
  }

  act() {
    const skill = this.skills[0]
    if (skill) {
      skill.cast(this)
    }
  }

  receiveDamage(amount: number) {
    this.hp -= amount
    if (this.hp < 0) this.hp = 0
  }
}
