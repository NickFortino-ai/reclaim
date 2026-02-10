import { useState } from 'react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const sections: FAQSection[] = [
  {
    title: 'Product & Billing',
    items: [
      {
        question: 'Who is this for?',
        answer:
          'Reclaim is designed specifically for heterosexual men who are conquering porn addiction and rebuilding their relationship with real intimacy, masculinity, and self-discipline.',
      },
      {
        question: 'How does billing work?',
        answer:
          'Just $0.69 per week (billed monthly). Your subscription automatically cancels when you achieve an unbroken 365-day streak. If you reset your streak, the progress bar resets and you stay subscribed until you complete a full 365-day streak. First day is free.',
      },
      {
        question: 'Can I cancel anytime?',
        answer:
          "Yes, absolutely. You can cancel your subscription at any time with no penalties or fees. You\u2019ll keep access through the end of your current billing period.",
      },
      {
        question: 'Is my data private and anonymous?',
        answer:
          'Yes. You\u2019re identified by a unique warrior name (like \u201cSilent Wolf\u201d or \u201cIron Bear\u201d), not your real identity. No email is required after signup. Your streak data and check-ins are private \u2014 only you can see them. The brotherhood leaderboard shows warrior names only.',
      },
      {
        question: 'What is the Hall of Fame?',
        answer:
          'The Hall of Fame is an elite section of the community reserved for warriors who completed the 365-day challenge and purchased lifetime membership ($20 one-time). Hall of Fame members appear in a special gold-themed section on the Community page, showing both their highest streak ever and their current streak. They serve as proof that freedom is possible.',
      },
      {
        question: 'How do I get lifetime membership?',
        answer:
          'After completing an unbroken 365-day streak, you\u2019ll be offered lifetime access for a one-time $20 payment. You have a 7-day grace period after completion to claim this offer. You can also earn lifetime access for free by referring 3 brothers to Reclaim. Lifetime members join the Hall of Fame and keep full access forever.',
      },
      {
        question: 'What happens if I reset after getting lifetime access?',
        answer:
          'You stay in the Hall of Fame permanently. Your highest streak is preserved and displayed alongside your current streak. Resets are part of the journey \u2014 your lifetime status and legacy are never lost.',
      },
    ],
  },
  {
    title: 'Tools',
    items: [
      {
        question: 'What is Urge Surfing?',
        answer:
          'Urge Surfing is a guided breathing exercise built into Reclaim. When an urge hits, you can open the Urge Surf tool and follow a timed breathing pattern (inhale, hold, exhale) that helps you ride out the urge without acting on it. Urges typically peak and pass within 15-20 minutes \u2014 this tool helps you get through that window.',
      },
      {
        question: 'How does the Journal work?',
        answer:
          'The Journal is a private space to write down your thoughts, track your mood, and identify triggers. Each entry can include a mood tag (like Strong, Motivated, or Struggling) and a trigger tag (like Bored, Stressed, or Late Night). Over time, the Journal shows you pattern insights \u2014 your most common triggers, peak journaling times, and mood trends. No one else can see your journal entries, not even the admin.',
      },
    ],
  },
  {
    title: 'Recovery & Philosophy',
    items: [
      {
        question: 'What if I reset my streak?',
        answer:
          "Resets happen \u2014 they\u2019re part of the journey, not the end of it. When you reset, your current streak goes to Day 1, but your Total Days Won keeps climbing. You stay subscribed until you complete an unbroken 365-day streak. The brotherhood is here to support you through every reset and victory.",
      },
      {
        question: 'Why 365 days specifically?',
        answer:
          'One full year represents a complete transformation cycle. It\u2019s long enough to rewire deeply ingrained neural pathways (90+ days for neuroplasticity), experience every season, holiday, and life situation without relapse, build unshakeable discipline that extends beyond porn recovery, and prove to yourself that you\u2019re capable of anything.',
      },
      {
        question: "What\u2019s the science behind the desensitization exercise?",
        answer:
          "We use AI-generated images for two important reasons. First, the centers of your brain that produce sexual urge can\u2019t tell the difference. The neural response to an AI-generated attractive woman is identical to your response to any other pixelated woman. This is what makes the exercise effective \u2014 we\u2019re retraining the same pathways that got hijacked by porn.\n\nSecond, you were never looking at real women anyway. A real woman may have been recorded, but she wasn\u2019t there when you watched the video. There\u2019s no consciousness behind those pixels. No real connection. No reciprocal desire. Just stimulation without substance.\n\nThis understanding is central to your recovery: the release you\u2019ve been chasing is a misplacement of masculine energy. That energy is better spent in real connection, sex, and intensity in your life. The place for that energy is with a woman who wants you passionately, who\u2019s fully present, who responds to you.\n\nThe desensitization exercise helps your brain learn the difference between pixels (AI or otherwise) and presence. Between stimulation and connection. Between a screen and a real woman.",
      },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        question: 'How does the brotherhood leaderboard work?',
        answer:
          'The leaderboard shows the top warriors ranked by current streak length. Everyone is identified by their warrior name only (like \u201cSteel Guardian\u201d or \u201cShadow Phoenix\u201d). You can see others\u2019 progress and send encouragement, but all identities remain anonymous. It updates in real-time as warriors check in.',
      },
      {
        question: 'Can other users see my real identity?',
        answer:
          'No. Only your warrior name is visible to the community. Your email, personal info, and identity are completely private. Even when you send encouragement or appear on the leaderboard, you\u2019re anonymous.',
      },
      {
        question: 'How do I send encouragement to others?',
        answer:
          "On the Community page, you\u2019ll see the brotherhood leaderboard. Click the encouragement button next to any warrior\u2019s name to send them support. They\u2019ll receive your message anonymously \u2014 you\u2019re both just warriors in the same battle.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 text-gray-600 leading-relaxed whitespace-pre-line">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-primary-600 hover:underline text-sm">
            &larr; Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mb-10">
          Everything you need to know about Reclaim.
        </p>

        {sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h2>
            <div className="card">
              {section.items.map((item) => (
                <AccordionItem key={item.question} item={item} />
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-500 text-sm">Still have questions?</p>
          <a
            href="mailto:support@reclaim365.app?subject=Reclaim App Question"
            className="inline-block btn btn-outline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
