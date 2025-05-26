export function showNotification(message: string, type: 'success' | 'error') {
  const container = document.createElement('div')
  container.className = `notification ${type}`
  container.textContent = message

  document.body.appendChild(container)

  setTimeout(() => {
    container.remove()
  }, 3000)
}
