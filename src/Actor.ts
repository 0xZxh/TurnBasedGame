// Import the Skill class so each actor can own skills
import { Skill } from './Skill.js'

// Actor represents a combat unit participating in battle
export class Actor {
  // unique identifier
  id: string
  // current hit points
  hp: number
  // maximum hit points
  maxHp: number
  // team index for win condition checks
  team: number
  // list of active skills the actor can use
  skills: Skill[] = []

  // create a new actor with given id, starting hp and team
  constructor(id: string, hp: number, team: number) {
    this.id = id
    this.hp = hp
    this.maxHp = hp
    this.team = team
  }

  // attach a skill to this actor
  addSkill(skill: Skill) {
    this.skills.push(skill)
  }

  // whether the actor is still alive
  isAlive() {
    return this.hp > 0
  }

  // placeholder hook for passive skill triggers at start of turn
  onTurnStart() {
    // TODO: handle passive triggers
  }

  // perform one action (always uses first skill for demo)
  act() {
    const skill = this.skills[0]
    if (skill) {
      skill.cast(this)
    }
  }

  // reduce hp when taking damage
  receiveDamage(amount: number) {
    this.hp -= amount
    if (this.hp < 0) this.hp = 0
  }
}
