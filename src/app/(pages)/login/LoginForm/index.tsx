'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'
import { useLoader } from '../../../_providers/LoaderContext'
import { useToast } from '../../../_providers/Toast/ToastContext'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const { addToast } = useToast()

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { showLoader, hideLoader } = useLoader()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  // Show loader when route changes and hide it after navigation completes
  useEffect(() => {
    hideLoader() // Hide the loader when component is loaded

    return () => {
      hideLoader() // Ensure to hide the loader when component unmounts or route changes
    }
  }, [router])

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)
      setError(null)

      try {
        await login(data)
        addToast('Login successful!', 'success')
        showLoader()
        if (redirect.current) {
          router.push(redirect.current)
        } else {
          router.push('/')
        }
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
        addToast('Login failed. Please check your credentials and try again.', 'error')
      } finally {
        setIsLoading(false)
      }
    },
    [login, router, addToast, showLoader],
  )

  const handleLinkClick = (message: string, href: string) => {
    addToast(message, 'info')
    showLoader() // Show the loader when link is clicked
    router.push(href) // Navigate using router.push
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      <Button
        type="submit"
        appearance="secondary"
        label={isLoading ? 'Processing...' : 'Login'}
        disabled={isLoading}
        className={classes.submit}
      />
      <div className={classes.links}>
        <a
          onClick={() =>
            handleLinkClick('Navigating to create account.', `/create-account${allParams}`)
          }
        >
          Create an account
        </a>
        <br />
        <a
          onClick={() =>
            handleLinkClick('Navigating to recover password.', `/recover-password${allParams}`)
          }
        >
          Recover your password
        </a>
      </div>
    </form>
  )
}

export default LoginForm
