// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.

import React from "react"
import Spinner from "./Spinner"
import { render, screen } from '@testing-library/react'
import { setupServer, getHandlers } from '../../backend/mock-server'
import { BrowserRouter } from 'react-router-dom'
import App from '../../frontend/components/App'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(750) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 150 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.localStorage.clear()
  window.history.pushState({}, 'Test page', '/')
  return render(ui)
}
let server
beforeAll(() => {
  server = setupServer(...getHandlers())
  server.listen()
})
afterAll(() => {
  server.close()
})
beforeEach(() => {
  renderApp(<BrowserRouter><App /></BrowserRouter>)
})
afterEach(() => {
  server.resetHandlers(...getHandlers())
})

describe('Personal Spinner test', () => {
test('sanity', () => {
  const spinnerComponent = render(<Spinner on={false}/>)
  expect(screen.queryByText(/Please wait.../i)).not.toBeInTheDocument();
  spinnerComponent.unmount();
  render(<Spinner on={true}/>)
  expect(screen.queryByText(/Please wait.../i)).toBeInTheDocument();
})
})
