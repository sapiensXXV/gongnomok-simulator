import { useState, useCallback, type ChangeEvent } from 'react'
import axios, { AxiosError } from 'axios'
import axiosInstance from '../global/axiosInstance'
import { BASE_URL } from '../global/uri'
import type { ChallengeRecordPayload, ChallengeRecordResponse } from '../types/record'

const NAME_MAX_LENGTH = 10

interface Args {
  itemId: string | undefined
  /** 폼 제출 시 동적으로 페이로드를 만드는 함수 (현재 능력치/주문서 등에 의존). */
  buildPayload: (name: string) => ChallengeRecordPayload
}

/** 기록 도전 모달 + 제출 + 결과 모달을 한 hook 으로 캡슐화. */
export function useChallengeRecord({ itemId, buildPayload }: Args) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [isNameEmpty, setIsNameEmpty] = useState(false)
  const [resultOpen, setResultOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const openModal = useCallback(() => setOpen(true), [])
  const closeModal = useCallback(() => setOpen(false), [])
  const closeResult = useCallback(() => setResultOpen(false), [])

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > NAME_MAX_LENGTH) return
    setName(e.target.value)
    setIsNameEmpty(false)
  }, [])

  const submit = useCallback(async () => {
    if (name === '') {
      setIsNameEmpty(true)
      return
    }
    if (!itemId) return

    const payload = buildPayload(name)
    try {
      const res = await axiosInstance.post<ChallengeRecordResponse>(
        `${BASE_URL}/api/item/${itemId}/enhanced`,
        payload,
      )
      setIsSuccess(res.data.status === 'SUCCESS')
      setResultOpen(true)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err as AxiosError<{ message?: string }>).response?.data?.message
        if (message) alert(message)
      } else {
        console.error(err)
      }
    } finally {
      setOpen(false)
    }
  }, [itemId, name, buildPayload])

  return {
    open,
    name,
    isNameEmpty,
    resultOpen,
    isSuccess,
    openModal,
    closeModal,
    closeResult,
    onNameChange,
    submit,
  }
}
