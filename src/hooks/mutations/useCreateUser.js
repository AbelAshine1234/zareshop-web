import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../../services/usersService'
import { usersKeys } from '../queries/useUsers'

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload) => createUser(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.all })
    },
  })
}
