import './styles/main.scss'
import { sendRobotTask } from './utils/robot'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!

  app.innerHTML = `
    <h1 class="fade-in">Control de Robots</h1>

    <div class="robot-container">
      <div class="robot-card fade-in-up">
        <h2>Robot 1</h2>
        <button data-robot="robot1" data-path="Ruta A">Enviar Ruta A</button>
        <button data-robot="robot1" data-path="Ruta B">Enviar Ruta B</button>
      </div>

      <div class="robot-card fade-in-up">
        <h2>Robot 2</h2>
        <button data-robot="robot2" data-path="Ruta A">Enviar Ruta A</button>
        <button data-robot="robot2" data-path="Ruta B">Enviar Ruta B</button>
      </div>
    </div>
  `

  document.querySelectorAll('button[data-robot]')?.forEach((btn) => {
    btn.addEventListener('click', () => {
      const robot = (btn as HTMLButtonElement).dataset.robot as 'robot1' | 'robot2'
      const path = (btn as HTMLButtonElement).dataset.path as 'Ruta A' | 'Ruta B'
      sendRobotTask(robot, path, btn as HTMLButtonElement)
    })
  })
})
