import { robotRoutes, robotModelCodes } from "./paths"
import { showNotification } from '../components/notifications'

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
  const body = {
    modelProcessCode: 'forkAutoTemplate2',
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

    showNotification(`✅ Tarea enviada: ${robot.toUpperCase()} → ${routeName}`, 'success')
  } catch (err) {
    console.error(err)
    showNotification('❌ Error enviando tarea. Revisa la consola.', 'error')
  } finally {
    buttonEl.disabled = false
    buttonEl.textContent = originalText
  }
}
