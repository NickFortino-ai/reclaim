import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import * as api from '../api/client';

export function useUserData() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.user.getMe(token!),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });
}

export function useCheckIn() {
  const { token, updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.user.checkIn(token!),
    onSuccess: (data) => {
      updateUser({
        currentStreak: data.currentStreak,
        totalDaysWon: data.totalDaysWon,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useHandleMissedDays() {
  const { token, updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stayedStrong, missedDays }: { stayedStrong: boolean; missedDays: number }) =>
      api.user.handleMissedDays(token!, stayedStrong, missedDays),
    onSuccess: (data) => {
      updateUser({
        currentStreak: data.currentStreak,
        totalDaysWon: data.totalDaysWon,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useReset() {
  const { token, updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.user.reset(token!),
    onSuccess: () => {
      updateUser({ currentStreak: 0 });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useCommunity() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['community'],
    queryFn: () => api.community.getMembers(token!),
    enabled: !!token,
  });
}

export function useSendSupport() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => api.community.sendSupport(token!, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community'] });
    },
  });
}

export function useDesensImage(dayNum: number) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['desens', dayNum],
    queryFn: () => api.content.getDesensImage(token!, dayNum),
    enabled: !!token && dayNum > 0,
  });
}

export function useLogUrgeSurf() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: { sessionDay: number; completedBreathing: boolean; resumedExercise: boolean }) =>
      api.content.logUrgeSurf(token!, data),
  });
}

// Admin hooks
export function useAdminStats() {
  const { token, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => api.admin.getStats(token!),
    enabled: !!token && isAdmin,
  });
}

export function useAdminAffirmations() {
  const { token, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin', 'affirmations'],
    queryFn: () => api.admin.getAffirmations(token!),
    enabled: !!token && isAdmin,
  });
}

export function useSaveAffirmation() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dayNum, text }: { dayNum: number; text: string }) =>
      api.admin.saveAffirmation(token!, dayNum, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'affirmations'] });
    },
  });
}

export function useDeleteAffirmation() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.admin.deleteAffirmation(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'affirmations'] });
    },
  });
}

export function useAdminImages() {
  const { token, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin', 'images'],
    queryFn: () => api.admin.getImages(token!),
    enabled: !!token && isAdmin,
  });
}

export function useSaveImage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dayNum, overlayText, difficulty, imageFile }: { dayNum: number; overlayText: string; difficulty: string; imageFile?: File }) =>
      api.admin.saveImage(token!, dayNum, overlayText, difficulty, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'images'] });
    },
  });
}

export function useDeleteImage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.admin.deleteImage(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'images'] });
    },
  });
}

// Referral hooks
export function useReferralStats() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['referral', 'stats'],
    queryFn: () => api.referral.getStats(token!),
    enabled: !!token,
  });
}

export function useClaimLifetime() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.referral.claimLifetime(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referral', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
