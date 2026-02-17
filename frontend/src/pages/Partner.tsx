import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  usePartnership,
  useFindPartner,
  useSendPartnerMessage,
  useSendNudge,
  useDissolvePartnership,
  useMarkPartnerMessagesRead,
} from '../hooks/useApi';

function getThemeColor(theme: string): string {
  const colors: Record<string, string> = {
    slate: '#475569',
    navy: '#334e68',
    charcoal: '#333333',
    gunmetal: '#3e4c59',
    forest: '#15803d',
    olive: '#4d5638',
    burgundy: '#8c1f3b',
    leather: '#71453a',
  };
  return colors[theme] || colors.slate;
}

export function Partner() {
  const { user } = useAuth();
  const { data, isLoading } = usePartnership();
  const findPartner = useFindPartner();
  const sendMessage = useSendPartnerMessage();
  const sendNudge = useSendNudge();
  const dissolve = useDissolvePartnership();
  const markRead = useMarkPartnerMessagesRead();

  const [message, setMessage] = useState('');
  const [showDissolveConfirm, setShowDissolveConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mark messages as read on mount
  useEffect(() => {
    if (data?.partnership && data.partnership.unreadCount > 0) {
      markRead.mutate();
    }
  }, [data?.partnership?.unreadCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.partnership?.messages.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleSend = async () => {
    if (!message.trim()) return;
    await sendMessage.mutateAsync(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // No partnership — show find partner card
  if (!data?.partnership) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="card text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find an Accountability Partner</h1>
          <p className="text-gray-600 mb-6">
            Get matched with someone at a similar point in their journey.
            Support each other, check in, and stay accountable together.
          </p>

          {data?.inQueue ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="animate-pulse flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="font-semibold text-blue-800">Searching for a match...</span>
              </div>
              <p className="text-sm text-blue-700">
                We're looking for someone compatible. This usually takes a few hours.
                You'll be matched automatically.
              </p>
            </div>
          ) : (
            <button
              onClick={() => findPartner.mutate()}
              disabled={findPartner.isPending}
              className="btn btn-primary py-3 px-8 text-lg"
            >
              {findPartner.isPending ? 'Finding...' : 'Find My Partner'}
            </button>
          )}

          {findPartner.isSuccess && findPartner.data.status === 'matched' && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 font-semibold">Partner found! Refreshing...</p>
            </div>
          )}
        </div>

        <div className="card bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">How it works</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• You'll be matched with someone who has a similar number of total days won</li>
            <li>• Send messages to encourage each other (up to 10 per day)</li>
            <li>• Nudge your partner if they haven't checked in today</li>
            <li>• Either partner can dissolve the partnership at any time</li>
          </ul>
        </div>
      </div>
    );
  }

  const { partner, messages } = data.partnership;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Partner Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: getThemeColor(partner.colorTheme) }}
            >
              {partner.displayName.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{partner.displayName}</h1>
              <p className="text-sm text-gray-600">Day {partner.currentStreak} streak</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {partner.lastCheckIn && !isCheckedInToday(partner.lastCheckIn) && (
              <button
                onClick={() => sendNudge.mutate()}
                disabled={sendNudge.isPending}
                className="btn btn-secondary text-sm"
                title="Nudge your partner to check in"
              >
                {sendNudge.isPending ? '...' : 'Nudge'}
              </button>
            )}
            <button
              onClick={() => setShowDissolveConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-500"
              title="Dissolve partnership"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {sendNudge.isError && (
          <p className="text-sm text-red-600 mt-2">
            {(sendNudge.error as Error).message || 'Could not send nudge'}
          </p>
        )}
      </div>

      {/* Dissolve Confirmation */}
      {showDissolveConfirm && (
        <div className="card border-red-200">
          <p className="text-gray-700 mb-3">Are you sure you want to dissolve this partnership?</p>
          <div className="flex gap-3">
            <button
              onClick={() => { dissolve.mutate(); setShowDissolveConfirm(false); }}
              disabled={dissolve.isPending}
              className="btn bg-red-600 text-white hover:bg-red-700 text-sm"
            >
              Dissolve
            </button>
            <button
              onClick={() => setShowDissolveConfirm(false)}
              className="btn btn-secondary text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="card" style={{ minHeight: '300px' }}>
        <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No messages yet. Say hello to your partner!
            </p>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 ${
                      msg.type === 'nudge'
                        ? 'bg-amber-50 border border-amber-200 text-amber-800'
                        : isMine
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'nudge'
                        ? 'text-amber-600'
                        : isMine ? 'text-primary-200' : 'text-gray-400'
                    }`}>
                      {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 500))}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || sendMessage.isPending}
            className="btn btn-primary px-4"
          >
            {sendMessage.isPending ? '...' : 'Send'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">{message.length}/500</p>
      </div>
    </div>
  );
}

function isCheckedInToday(lastCheckIn: string): boolean {
  const today = new Date();
  const checkIn = new Date(lastCheckIn);
  return today.toDateString() === checkIn.toDateString();
}
