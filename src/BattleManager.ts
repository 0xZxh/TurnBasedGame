import { Actor } from './Actor'
import { SkillStage } from './types'

export class BattleManager {
  actors: Actor[] = []
  round = 0
  finished = false

  addActor(actor: Actor) {
    this.actors.push(actor)
  }

  startBattle() {
    this.round = 1
    this.loop()
  }

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

  private checkBattleEnd(): boolean {
    const aliveTeams = new Set(this.actors.filter(a => a.isAlive()).map(a => a.team))
    return aliveTeams.size <= 1
  }
}
