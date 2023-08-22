export type Task = () => void

export function executeSafely(task: Task): void {
  try {
    task()
  } catch (e) {
    // ignore error
  }
}

export function executeSafelyFactory(task: Task): Task {
  return () => {
    executeSafely(task)
  }
}
