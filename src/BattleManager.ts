// Actor entity and shared enums
import { Actor } from './Actor.js'
import { SkillStage } from './types.js'

// BattleManager orchestrates the turn order and victory check
export class BattleManager {
  // all actors participating in battle
  actors: Actor[] = []
  // current round counter
  round = 0
  // flag to stop the loop
  finished = false

  // register an actor to the battle
  addActor(actor: Actor) {
    this.actors.push(actor)
  }

  // begin battle loop
  startBattle() {
    this.round = 1
    this.loop()
  }

  // main loop running until one side wins
  private loop() {
    while (!this.finished) {
      for (const actor of this.actors) {
        if (!actor.isAlive()) continue
        actor.onTurnStart()
        actor.act()
        if (this.checkBattleEnd()) {
          this.finished = true
          break
        }
      }
      this.round++
    }
  }

  // simple win condition: only one team remains alive
  private checkBattleEnd(): boolean {
    const aliveTeams = new Set(
      this.actors.filter(a => a.isAlive()).map(a => a.team)
    )
    return aliveTeams.size <= 1
  }
}
