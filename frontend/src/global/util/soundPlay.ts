import { ASSETS_URL } from '../uri'

function play(path: string, volume: number): void {
  const audio = new Audio(`${ASSETS_URL}${path}`)
  audio.volume = volume
  audio.currentTime = 0
  void audio.play()
}

export function playFailureSound(): void {
  play('/sound/fail.mp3', 0.03)
}

export function playSuccessSound(): void {
  play('/sound/success.mp3', 0.03)
}

export function playPurchaseSound(): void {
  play('/sound/purchase.mp3', 0.05)
}

export function playDiceSound(): void {
  play('/sound/dice.mp3', 0.05)
}
