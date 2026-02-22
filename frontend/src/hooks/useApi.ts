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
    mutationFn: ({ imageId, feedbackScore }: { imageId: string; feedbackScore?: number }) =>
      api.content.completeDesens(token!, imageId, feedbackScore),
    onSuccess: (data) => {
      updateUser({ desensitizationPoints: data.totalPoints });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['desensStats'] });
    },
  });
}

export function useDesensStats() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['desensStats'],
    queryFn: () => api.content.getDesensStats(token!),
    enabled: !!token,
  });
}

// Preference hooks
export function useUpdateReminderTime() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reminderTime: string | null) => api.user.updateReminderTime(token!, reminderTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useUpdateLeaderboardVisibility() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hide: boolean) => api.user.updateLeaderboardVisibility(token!, hide),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useWarriorNameOptions() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['warrior-name-options'],
    queryFn: () => api.user.getWarriorNameOptions(token!),
    enabled: !!token,
    staleTime: Infinity,
  });
}

export function useUpdateDisplayName() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (displayName: string) => api.user.updateDisplayName(token!, displayName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useChangeAccessCode() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.user.changeAccessCode(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

// Complete onboarding
export function useCompleteOnboarding() {
  const { token, updateUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.user.completeOnboarding(token!),
    onSuccess: () => {
      updateUser({ hasCompletedOnboarding: true });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

// Intimacy check-in
export function useSubmitIntimacyCheckIn() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { confidence: number; realAttraction: number; emotionalConnection: number }) =>
      api.user.submitIntimacyCheckIn(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['patterns'] });
    },
  });
}

// Intimacy tracker hooks
export function useIntimacyLogs() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['intimacy-logs'],
    queryFn: () => api.intimacy.getLogs(token!),
    enabled: !!token,
  });
}

export function useCreateIntimacyLog() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      date: string;
      erectionQuality: number;
      stayingPower: string;
      presence: number;
      enjoyment: number;
      connection: number;
      notes?: string;
    }) => api.intimacy.createLog(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intimacy-logs'] });
    },
  });
}

export function useUpdateIntimacyLog() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<{
      date: string;
      erectionQuality: number;
      stayingPower: string;
      presence: number;
      enjoyment: number;
      connection: number;
      notes: string | null;
    }>) => api.intimacy.updateLog(token!, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intimacy-logs'] });
    },
  });
}

export function useDeleteIntimacyLog() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.intimacy.deleteLog(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['intimacy-logs'] });
    },
  });
}

// Assessment hooks
export function useAssessmentScores() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['assessment-scores'],
    queryFn: () => api.assessment.getScores(token!),
    enabled: !!token,
  });
}

export function useSubmitAssessment() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { responses: number[]; milestone: string }) =>
      api.assessment.submit(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment-scores'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['patterns'] });
    },
  });
}

// Pattern insights
export function usePatterns() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['patterns'],
    queryFn: () => api.user.getPatterns(token!),
    enabled: !!token,
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
    mutationFn: ({ dayNum, overlayText, difficulty, imageFile, imageUrl, durationSeconds, textAppearAt, textDisappearAt }: { dayNum: number; overlayText: string; difficulty: number; imageFile?: File; imageUrl?: string; durationSeconds?: number; textAppearAt?: number; textDisappearAt?: number }) =>
      api.admin.saveImage(token!, dayNum, overlayText, difficulty, imageFile, imageUrl, durationSeconds, textAppearAt, textDisappearAt),
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

// Lifetime membership hooks
export function useLifetimeCheckout() {
  const { token } = useAuth();

  return useMutation({
    mutationFn: () => api.stripe.createLifetimeCheckout(token!),
  });
}

export function useCompleteLifetime() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => api.stripe.completeLifetime(token!, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
    mutationFn: ({ content, mood, trigger }: { content: string; mood?: string; trigger?: string }) =>
      api.journal.createEntry(token!, content, mood, trigger),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal'] });
    },
  });
}

export function useUpdateJournalEntry() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content, mood, trigger }: { id: string; content?: string; mood?: string; trigger?: string }) =>
      api.journal.updateEntry(token!, id, { content, mood, trigger }),
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

// Partnership hooks
export function usePartnership() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['partnership'],
    queryFn: () => api.partnership.get(token!),
    enabled: !!token,
    refetchInterval: 30000,
  });
}

export function useFindPartner() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.partnership.find(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnership'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useSendPartnerMessage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => api.partnership.sendMessage(token!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnership'] });
    },
  });
}

export function useSendNudge() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.partnership.sendNudge(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnership'] });
    },
  });
}

export function useDissolvePartnership() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.partnership.dissolve(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnership'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useMarkPartnerMessagesRead() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.partnership.markRead(token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnership'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
