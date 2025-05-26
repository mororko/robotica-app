import { robotRoutes, robotModelCodes } from "./utils/paths"
import { showNotification } from './components/notifications'
import './styles/main.scss'


console.log("App inicializada correctamente")

function generateOrderId(): string {
  const now = new Date()
  return now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
}

export async function sendRobotTask<
  T extends keyof typeof robotRoutes
>(
  robot: T,
  routeName: keyof typeof robotRoutes[T],
  buttonEl: HTMLButtonElement
) {
  const taskPath = robotRoutes[robot][routeName]
  const modelProcessCode = robotModelCodes[robot]

  const body = {
    modelProcessCode,
    priority: 6,
    fromSystem: 'MES',
    orderId: generateOrderId(),
    taskOrderDetail: [{ taskPath }],
  }

  buttonEl.disabled = true
  const originalText = buttonEl.textContent
  buttonEl.textContent = 'Enviando...'

  try {
    const response = await fetch('http://192.168.5.6:7000/ics/taskOrder/addTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

    showNotification(`✅ Tarea enviada: ${String(robot).toUpperCase()} → ${String(routeName)}`, 'success')
  } catch (err) {
    console.error(err)
    showNotification('❌ Error enviando tarea. Revisa la consola.', 'error')
  } finally {
    buttonEl.disabled = false
    buttonEl.textContent = originalText
  }
}

// 👇 Aquí comienza la interfaz visual
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = `
    <h1>Control de Robots</h1>
    <div class="robot-card">
      <h2>Forklift</h2>
      <button data-robot="forklift" data-path="Mover Pallet Abajo">Mover Pallet Abajo</button>
      <button data-robot="forklift" data-path="Mover Pallet Arriba">Mover Pallet Arriba</button>
    </div>
    <div class="robot-card">
      <h2>Mouse</h2>
      <button data-robot="mouse" data-path="Mover Estantería al Fondo">Mover Estantería al Fondo</button>
      <button data-robot="mouse" data-path="Mover Estantería al Frente">Mover Estantería al Frente</button>
    </div>
  `

  // Agregar listeners a los botones
  const buttons = document.querySelectorAll<HTMLButtonElement>('button[data-robot]')
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const robot = btn.dataset.robot as keyof typeof robotRoutes
      const path = btn.dataset.path as keyof typeof robotRoutes[typeof robot]
      sendRobotTask(robot, path, btn)
    })
  })
})
