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
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function useLogUrgeSurf() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: { sessionDay: number; completedBreathing: boolean; resumedExercise: boolean }) =>
      api.content.logUrgeSurf(token!, data),
  });
}

export function useCompleteDesens() {
  const { token, updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) => api.content.completeDesens(token!, imageId),
    onSuccess: (data) => {
      updateUser({ desensitizationPoints: data.totalPoints });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
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

export function useAdminUserSearch(query: string) {
  const { token, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin', 'users', query],
    queryFn: () => api.admin.searchUsers(token!, query),
    enabled: !!token && isAdmin && query.length >= 2,
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
    mutationFn: ({ dayNum, overlayText, difficulty, imageFile, imageUrl }: { dayNum: number; overlayText: string; difficulty: number; imageFile?: File; imageUrl?: string }) =>
      api.admin.saveImage(token!, dayNum, overlayText, difficulty, imageFile, imageUrl),
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

// Resource hooks
export function useResources() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['resources'],
    queryFn: () => api.content.getResources(token!),
    enabled: !!token,
  });
}

export function useToggleBookmark() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resourceId: string) => api.content.toggleBookmark(token!, resourceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}

export function useBookmarks() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => api.content.getBookmarks(token!),
    enabled: !!token,
  });
}

// Admin resource hooks
export function useAdminResources(week?: number) {
  const { token, isAdmin } = useAuth();

  return useQuery({
    queryKey: ['admin', 'resources', week],
    queryFn: () => api.admin.getResources(token!, week),
    enabled: !!token && isAdmin,
  });
}

export function useSaveResource() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id?: string;
      week: number;
      category: string;
      title: string;
      source?: string;
      summary: string;
      link?: string;
    }) => api.admin.saveResource(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resources'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
}

export function useDeleteResource() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.admin.deleteResource(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resources'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
}

export function useMoveResource() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, week }: { id: string; week: number }) =>
      api.admin.moveResource(token!, id, week),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resources'] });
    },
  });
}

// Journal hooks
export function useJournalEntries() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['journal'],
    queryFn: () => api.journal.getEntries(token!),
    enabled: !!token,
  });
}

export function useCreateJournalEntry() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, mood }: { content: string; mood?: string }) =>
      api.journal.createEntry(token!, content, mood),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal'] });
    },
  });
}

export function useUpdateJournalEntry() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content, mood }: { id: string; content?: string; mood?: string }) =>
      api.journal.updateEntry(token!, id, { content, mood }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal'] });
    },
  });
}

export function useDeleteJournalEntry() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.journal.deleteEntry(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal'] });
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
