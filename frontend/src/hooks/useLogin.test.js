import { render, fireEvent } from '@testing-library/react'
import { useLogin } from './useLogin'
import { useAuthContext } from './useAuthContext'
import { useState } from 'react'

jest.mock('./useAuthContext', () => ({
  useAuthContext: jest.fn(() => ({
    dispatch: jest.fn(),
  })),
}))

jest.mock('react', () => ({
 ...jest.requireActual('react'),
  useState: jest.fn(),
}))

describe('useLogin', () => {
    it('updates state when login is successful', async () => {
      const email = 'janis@example.com'
      const password = 'Valodzes2005!'
      const user = { id: 1, email: 'janis@example.com', token: 'token' }
  
      useState.mockImplementationOnce((init) => [null, init])
      useState.mockImplementationOnce((init) => [false, init])
      useState.mockImplementationOnce((init) => [null, init])
  
      useAuthContext.mockImplementationOnce(() => ({
        dispatch: jest.fn(),
      }))
  
      const { login, isLoading } = useLogin()
  
      const response = {
        ok: true,
        json: jest.fn(() => Promise.resolve(user)),
      }
  
      global.fetch = jest.fn(() => Promise.resolve(response))
  
      console.log('localStorage.setItem:', localStorage.setItem)
      console.log('useState:', useState)
      console.log('fetch:', fetch)
  
      await login(email, password)
  
      console.log('isLoading:', isLoading)
      console.log('localStorage.setItem:', localStorage.setItem)
  
    })
  })