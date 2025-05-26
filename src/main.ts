import './styles/main.scss'
import { sendRobotTask } from './utils/robot'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')!

  app.innerHTML = `
    <h1 class="fade-in">Control de Robots</h1>

    <div class="robot-container">
      <div class="robot-card fade-in-up">
        <h2>Forklift</h2>
        <button data-robot="forklift" data-path="Mover Pallet Abajo">Mover Pallet Abajo</button>
        <button data-robot="forklift" data-path="Mover Pallet Arriba">Mover Pallet Arriba</button>
      </div>

      <div class="robot-card fade-in-up">
        <h2>Mouse</h2>
        <button data-robot="mouse" data-path="Mover Estantería al Fondo">Mover Estantería al Fondo</button>
        <button data-robot="mouse" data-path="Mover Estantería al Frente">Mover Estantería al Frente</button>
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
