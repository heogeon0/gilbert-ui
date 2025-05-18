import { clsx } from 'clsx'

type ClassDictionary = Record<string, boolean | undefined>

export function createCx<T extends Record<string, string>>(styles: T) {
  return (...args: (keyof T | ClassDictionary)[]): string => {
    const mapped = args.map((arg) => {
      if (typeof arg === 'string') {
        return styles[arg]
      } else if (typeof arg === 'object' && arg !== null) {
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => styles[key as keyof T])
      }
      return null
    })

    return clsx(mapped)
  }
}
