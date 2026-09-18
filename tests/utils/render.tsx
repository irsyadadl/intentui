import type { ReactNode } from 'react'
import { render as rtlRender, type RenderOptions } from '@testing-library/react'
import { I18nProvider } from 'react-aria-components/I18nProvider'

// Fix locale so calendar segment names and number formatting are deterministic.
export function render(ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <I18nProvider locale="en-US">{children}</I18nProvider>,
    ...options,
  })
}
export { screen, within, waitFor, fireEvent, act } from '@testing-library/react'
