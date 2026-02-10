const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string | null;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error || 'Request failed', response.status);
  }

  return data;
}

// Auth
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    currentStreak: number;
    totalDaysWon: number;
    desensitizationPoints: number;
    lastCheckIn: string | null;
    colorTheme: string;
    subscriptionStatus: string;
    completedAt: string | null;
  };
}

export interface RegisterResponse extends LoginResponse {
  accessCode: string;
}

export const auth = {
  login: (accessCode: string) =>
    request<LoginResponse>('/api/auth/login', { method: 'POST', body: { accessCode } }),

  adminLogin: (username: string, password: string) =>
    request<{ token: string }>('/api/auth/admin/login', { method: 'POST', body: { username, password } }),
};

// User
export interface UserData {
  user: {
    id: string;
    displayName: string;
    currentStreak: number;
    totalDaysWon: number;
    lastCheckIn: string | null;
    colorTheme: string;
    subscriptionStatus: string;
    completedAt: string | null;
    desensitizationPoints: number;
    supportReceivedToday: number;
  };
  affirmation: string | null;
  dayNum: number;
  checkedInToday: boolean;
  missedDays: number;
  needsMissedDaysCheck: boolean;
}

export interface CheckInResponse {
  currentStreak: number;
  totalDaysWon: number;
  completed: boolean;
}

export interface MissedDaysResponse {
  currentStreak: number;
  totalDaysWon: number;
  quote?: string;
}

export interface ResetResponse {
  message: string;
  quote: string;
}

export const user = {
  getMe: (token: string) =>
    request<UserData>('/api/user/me', { token }),

  checkIn: (token: string) =>
    request<CheckInResponse>('/api/user/checkin', { method: 'POST', token }),

  handleMissedDays: (token: string, stayedStrong: boolean, missedDays: number) =>
    request<MissedDaysResponse>('/api/user/missed-days', {
      method: 'POST',
      token,
      body: { stayedStrong, missedDays },
    }),

  reset: (token: string) =>
    request<ResetResponse>('/api/user/reset', { method: 'POST', token }),

  updateTheme: (token: string, theme: string) =>
    request<{ theme: string }>('/api/user/theme', { method: 'PATCH', token, body: { theme } }),

  deleteAccount: (token: string) =>
    request<{ message: string }>('/api/user/account', { method: 'DELETE', token }),

  exportData: (token: string) =>
    request<Record<string, unknown>>('/api/user/export', { token }),
};

// Community
export interface CommunityMember {
  id: string;
  displayName: string;
  currentStreak: number;
  totalDaysWon: number;
  colorTheme: string;
  isCompleted: boolean;
  supportReceivedToday: number;
  alreadySupported: boolean;
}

export const community = {
  getMembers: (token: string) =>
    request<{ members: CommunityMember[] }>('/api/community', { token }),

  sendSupport: (token: string, userId: string) =>
    request<{ message: string }>(`/api/community/support/${userId}`, { method: 'POST', token }),
};

// Content
export interface Affirmation {
  id: string;
  dayNum: number;
  text: string;
}

export interface DesensImage {
  id: string;
  dayNum: number;
  imageUrl: string;
  overlayText: string;
  difficulty: number;
}

export interface DesensCompleteResponse {
  pointsEarned: number;
  totalPoints: number;
  maxPoints: number;
  isComplete: boolean;
}

// Resources
export interface Resource {
  id: string;
  week: number;
  category: 'studies' | 'drive' | 'intimacy' | 'wisdom';
  title: string;
  source: string | null;
  summary: string;
  link: string | null;
  isBookmarked: boolean;
}

export interface ResourcesResponse {
  week: number;
  resources: Resource[];
}

export interface BookmarksResponse {
  resources: Resource[];
}

export interface BookmarkToggleResponse {
  bookmarked: boolean;
}

export interface AdminResourcesResponse {
  resources: Resource[];
  weekCounts: { week: number; _count: { id: number } }[];
}

export const content = {
  getAffirmation: (token: string, day: number) =>
    request<Affirmation>(`/api/content/affirmation/${day}`, { token }),

  getDesensImage: (token: string, day: number) =>
    request<DesensImage>(`/api/content/desens/${day}`, { token }),

  logUrgeSurf: (token: string, data: { sessionDay: number; completedBreathing: boolean; resumedExercise: boolean }) =>
    request<{ success: boolean; eventId: string }>('/api/content/urge-surf', {
      method: 'POST',
      token,
      body: data,
    }),

  completeDesens: (token: string, imageId: string) =>
    request<DesensCompleteResponse>('/api/content/desens/complete', {
      method: 'POST',
      token,
      body: { imageId },
    }),

  getResources: (token: string) =>
    request<ResourcesResponse>('/api/content/resources', { token }),

  toggleBookmark: (token: string, resourceId: string) =>
    request<BookmarkToggleResponse>(`/api/content/resources/${resourceId}/bookmark`, {
      method: 'POST',
      token,
    }),

  getBookmarks: (token: string) =>
    request<BookmarksResponse>('/api/content/bookmarks', { token }),
};

// Stripe
export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface CompleteRegistrationResponse extends RegisterResponse {
  referralApplied?: boolean;
}

export const stripe = {
  createCheckout: (referralCode?: string) =>
    request<CheckoutSession>('/api/stripe/create-checkout', {
      method: 'POST',
      body: referralCode ? { referralCode } : undefined,
    }),

  completeRegistration: (sessionId: string) =>
    request<CompleteRegistrationResponse>('/api/stripe/complete-registration', {
      method: 'POST',
      body: { sessionId },
    }),

  cancelSubscription: (userId: string) =>
    request<{ message: string }>('/api/stripe/cancel', {
      method: 'POST',
      body: { userId },
    }),
};

// Referral
export interface ReferralStats {
  referralCode: string;
  referralLink: string;
  referralCount: number;
  referrals: {
    number: number;
    joinedAt: string;
    currentStreak: number;
    totalDaysWon: number;
  }[];
  totalCreditDays: number;
  lifetimeAccess: boolean;
  canGetLifetimeAccess: boolean;
  referralsNeededForLifetime: number;
}

export const referral = {
  getStats: (token: string) =>
    request<ReferralStats>('/api/referral/stats', { token }),

  validateCode: (code: string) =>
    request<{ valid: boolean }>(`/api/referral/validate/${code}`),

  claimLifetime: (token: string) =>
    request<{ message: string; lifetimeAccess: boolean }>('/api/referral/claim-lifetime', {
      method: 'POST',
      token,
    }),
};

// Admin
export interface AdminStats {
  users: {
    total: number;
    active: number;
    completed: number;
  };
  streaks: {
    average: number;
    distribution: Record<string, number>;
  };
  totalDaysAverage: number;
  checkInsToday: number;
  content: {
    affirmations: number;
    images: number;
    resources: number;
    resourceWeeksCovered: string;
    affirmationCoverage: string;
    imageCoverage: string;
  };
}

export interface AdminUserResult {
  id: string;
  displayName: string;
  accessCode: string;
  currentStreak: number;
  totalDaysWon: number;
  createdAt: string;
}

export const admin = {
  getStats: (token: string) =>
    request<AdminStats>('/api/admin/stats', { token }),

  searchUsers: (token: string, q: string) =>
    request<AdminUserResult[]>(`/api/admin/users/search?q=${encodeURIComponent(q)}`, { token }),

  getAffirmations: (token: string) =>
    request<Affirmation[]>('/api/admin/affirmations', { token }),

  saveAffirmation: (token: string, dayNum: number, text: string) =>
    request<Affirmation>('/api/admin/affirmations', {
      method: 'POST',
      token,
      body: { dayNum, text },
    }),

  deleteAffirmation: (token: string, id: string) =>
    request<{ message: string }>(`/api/admin/affirmations/${id}`, { method: 'DELETE', token }),

  getImages: (token: string) =>
    request<DesensImage[]>('/api/admin/images', { token }),

  saveImage: async (
    token: string,
    dayNum: number,
    overlayText: string,
    difficulty: number,
    imageFile?: File,
    imageUrl?: string
  ): Promise<DesensImage> => {
    const formData = new FormData();
    formData.append('dayNum', dayNum.toString());
    formData.append('overlayText', overlayText);
    formData.append('difficulty', difficulty.toString());
    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    const response = await fetch(`${API_URL}/api/admin/images`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.error || 'Request failed', response.status);
    }

    return data;
  },

  deleteImage: (token: string, id: string) =>
    request<{ message: string }>(`/api/admin/images/${id}`, { method: 'DELETE', token }),

  getResources: (token: string, week?: number) =>
    request<AdminResourcesResponse>(
      `/api/admin/resources${week ? `?week=${week}` : ''}`,
      { token }
    ),

  saveResource: (token: string, data: {
    id?: string;
    week: number;
    category: string;
    title: string;
    source?: string;
    summary: string;
    link?: string;
  }) =>
    request<Resource>('/api/admin/resources', {
      method: 'POST',
      token,
      body: data,
    }),

  deleteResource: (token: string, id: string) =>
    request<{ message: string }>(`/api/admin/resources/${id}`, { method: 'DELETE', token }),

  moveResource: (token: string, id: string, week: number) =>
    request<Resource>(`/api/admin/resources/${id}/move`, {
      method: 'PATCH',
      token,
      body: { week },
    }),
};

// Journal
export interface JournalEntry {
  id: string;
  content: string;
  mood: string | null;
  createdAt: string;
  updatedAt: string;
}

export const journal = {
  getEntries: (token: string) =>
    request<{ entries: JournalEntry[] }>('/api/journal', { token }),

  createEntry: (token: string, content: string, mood?: string) =>
    request<JournalEntry>('/api/journal', {
      method: 'POST',
      token,
      body: { content, mood },
    }),

  updateEntry: (token: string, id: string, data: { content?: string; mood?: string }) =>
    request<JournalEntry>(`/api/journal/${id}`, {
      method: 'PATCH',
      token,
      body: data,
    }),

  deleteEntry: (token: string, id: string) =>
    request<{ message: string }>(`/api/journal/${id}`, { method: 'DELETE', token }),
};

export { ApiError };
