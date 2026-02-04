import { useState } from 'react';

type Tab = 'studies' | 'testosterone' | 'intimacy' | 'wisdom';

export function Resources() {
  const [activeTab, setActiveTab] = useState<Tab>('studies');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Resources</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
        <TabButton
          active={activeTab === 'studies'}
          onClick={() => setActiveTab('studies')}
        >
          Scientific Studies
        </TabButton>
        <TabButton
          active={activeTab === 'testosterone'}
          onClick={() => setActiveTab('testosterone')}
        >
          Testosterone
        </TabButton>
        <TabButton
          active={activeTab === 'intimacy'}
          onClick={() => setActiveTab('intimacy')}
        >
          Real Intimacy
        </TabButton>
        <TabButton
          active={activeTab === 'wisdom'}
          onClick={() => setActiveTab('wisdom')}
        >
          Wisdom
        </TabButton>
      </div>

      {/* Tab Content */}
      {activeTab === 'studies' && <StudiesContent />}
      {activeTab === 'testosterone' && <TestosteroneContent />}
      {activeTab === 'intimacy' && <IntimacyContent />}
      {activeTab === 'wisdom' && <WisdomContent />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        active
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
}

function StudiesContent() {
  const studies = [
    {
      title: 'Neuroscience of Internet Pornography Addiction',
      source: 'Behavioral Sciences, 2015',
      summary: 'Research shows pornography consumption can lead to neuroplastic changes in the brain similar to substance addiction, affecting dopamine pathways and reward circuits.',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4600144/',
    },
    {
      title: 'Pornography and the Male Sexual Script',
      source: 'Archives of Sexual Behavior, 2016',
      summary: 'Study found that higher pornography use was associated with lower sexual satisfaction and less positive attitudes toward one\'s partner.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/25466233/',
    },
    {
      title: 'Is Internet Pornography Causing Sexual Dysfunctions?',
      source: 'Behavioral Sciences, 2016',
      summary: 'Clinical reports suggest a rise in erectile dysfunction and delayed ejaculation in young men, with internet pornography as a potential contributing factor.',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5039517/',
    },
    {
      title: 'Brain Structure and Functional Connectivity',
      source: 'JAMA Psychiatry, 2014',
      summary: 'Research found that higher pornography consumption was associated with less gray matter volume in the striatum and reduced functional connectivity.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/24871202/',
    },
  ];

  return (
    <div className="space-y-4">
      {studies.map((study, index) => (
        <div key={index} className="card">
          <h3 className="font-semibold text-gray-900 mb-1">{study.title}</h3>
          <p className="text-sm text-primary-600 mb-2">{study.source}</p>
          <p className="text-gray-600 text-sm mb-3">{study.summary}</p>
          <a
            href={study.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:underline"
          >
            Read full study →
          </a>
        </div>
      ))}
    </div>
  );
}

function TestosteroneContent() {
  const facts = [
    {
      title: 'The 7-Day Spike',
      content: 'Research published in the Journal of Zhejiang University found that abstaining from ejaculation for 7 days resulted in a 145.7% spike in serum testosterone levels on the seventh day.',
    },
    {
      title: 'Androgen Receptors',
      content: 'Chronic overstimulation from pornography may lead to downregulation of androgen receptors, making your body less sensitive to the testosterone you produce.',
    },
    {
      title: 'Prolactin Connection',
      content: 'Orgasm triggers prolactin release, which temporarily suppresses dopamine and can affect motivation and energy. Frequent orgasms may lead to chronically elevated prolactin.',
    },
    {
      title: 'Energy & Focus',
      content: 'Many men report increased energy, motivation, and mental clarity during abstinence periods. This may be related to stabilized dopamine levels and hormonal balance.',
    },
    {
      title: 'Physical Performance',
      content: 'Historically, athletes have practiced abstinence before competitions. Some research suggests this may be related to testosterone optimization and increased aggression.',
    },
    {
      title: 'Sleep Quality',
      content: 'Better sleep is commonly reported during abstinence. Quality sleep is crucial for testosterone production, creating a positive feedback loop.',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="card bg-primary-50 border-primary-200">
        <p className="text-primary-800 text-sm">
          <strong>Note:</strong> Individual experiences vary. The goal isn't just testosterone—it's reclaiming your energy, focus, and self-control. These are observed patterns, not guaranteed outcomes.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {facts.map((fact, index) => (
          <div key={index} className="card">
            <h3 className="font-semibold text-gray-900 mb-2">{fact.title}</h3>
            <p className="text-gray-600 text-sm">{fact.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntimacyContent() {
  const studies = [
    {
      title: 'Oxytocin and Pair Bonding in Humans',
      source: 'Psychoneuroendocrinology, 2012',
      summary: 'Physical intimacy with a real partner triggers sustained oxytocin release, strengthening emotional bonds and attachment. This "bonding hormone" creates lasting connection that pornography cannot replicate.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/22115921/',
    },
    {
      title: 'Sexual Satisfaction and Relationship Quality',
      source: 'Journal of Sex Research, 2017',
      summary: 'Couples who engage in affectionate touch and real intimacy report significantly higher relationship satisfaction. Emotional presence during sex predicts long-term relationship success.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/28276929/',
    },
    {
      title: 'Recovery from Porn-Induced Erectile Dysfunction',
      source: 'Behavioral Sciences, 2016',
      summary: 'Men who abstain from pornography often report full recovery of erectile function with real partners within 2-6 months. The brain\'s reward system recalibrates to respond to natural stimuli.',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5039517/',
    },
    {
      title: 'Performance Anxiety and Sexual Function',
      source: 'Journal of Sexual Medicine, 2015',
      summary: 'Performance anxiety from porn-induced expectations is a leading cause of sexual dysfunction in young men. Mindfulness and present-moment awareness with a partner significantly reduces anxiety.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/25545022/',
    },
    {
      title: 'The Neuroscience of Human Touch',
      source: 'Nature Neuroscience, 2014',
      summary: 'Skin-to-skin contact activates C-tactile afferents that trigger dopamine and serotonin release in ways that visual stimulation cannot. Real touch creates neurochemical rewards that build genuine satisfaction.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/24997764/',
    },
    {
      title: 'Pornography Use and Intimacy Avoidance',
      source: 'Archives of Sexual Behavior, 2017',
      summary: 'Higher pornography consumption is correlated with reduced desire for real intimacy and avoidance of emotional vulnerability. Quitting porn often restores interest in genuine connection.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/28677048/',
    },
    {
      title: 'Benefits of Committed Relationships on Male Health',
      source: 'Health Psychology, 2018',
      summary: 'Men in committed intimate relationships show lower cortisol, better immune function, and longer lifespan. Real partnership provides health benefits that solitary behaviors cannot.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/29369662/',
    },
  ];

  const tips = [
    {
      title: 'Presence Over Performance',
      content: 'Real intimacy isn\'t about performing like in porn. It\'s about being fully present with another person. Focus on connection, not technique.',
    },
    {
      title: 'Rewiring Takes Time',
      content: 'Your brain needs time to recalibrate. Many men report that attraction to real partners intensifies after 60-90 days of abstaining from porn.',
    },
    {
      title: 'Emotional Vulnerability',
      content: 'True intimacy requires emotional openness—something porn trains you to avoid. Practice being vulnerable in small ways to rebuild this capacity.',
    },
    {
      title: 'Touch Without Expectation',
      content: 'Learn to enjoy physical affection without it needing to lead to sex. Holding hands, cuddling, and casual touch rebuild healthy intimacy patterns.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="card bg-primary-50 border-primary-200">
        <p className="text-primary-800 text-sm">
          <strong>Why This Matters:</strong> Quitting porn isn't just about stopping a bad habit—it's about preparing yourself for real, fulfilling intimacy with a real partner. These studies show what you're working toward.
        </p>
      </div>

      {/* Studies Section */}
      <h3 className="text-lg font-semibold text-gray-900">Research on Real Intimacy</h3>
      <div className="space-y-4">
        {studies.map((study, index) => (
          <div key={index} className="card">
            <h3 className="font-semibold text-gray-900 mb-1">{study.title}</h3>
            <p className="text-sm text-primary-600 mb-2">{study.source}</p>
            <p className="text-gray-600 text-sm mb-3">{study.summary}</p>
            <a
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:underline"
            >
              Read full study →
            </a>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <h3 className="text-lg font-semibold text-gray-900 mt-8">Rebuilding Real Connection</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="card">
            <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
            <p className="text-gray-600 text-sm">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WisdomContent() {
  const wisdom = [
    {
      quote: "The urge is temporary. The regret lasts much longer.",
      lesson: "When you feel the pull, remember: this feeling will pass in minutes, but breaking your streak affects your momentum for days.",
    },
    {
      quote: "You're not giving something up. You're getting your life back.",
      lesson: "Reframe the journey. This isn't about deprivation—it's about reclaiming time, energy, and mental clarity.",
    },
    {
      quote: "The first week is the hardest. After that, it gets easier—but never let your guard down.",
      lesson: "Early days require constant vigilance. Later stages require wisdom to avoid overconfidence.",
    },
    {
      quote: "Replace the habit, don't just remove it.",
      lesson: "Fill the time and energy you reclaim with exercise, learning, socializing, or creative pursuits.",
    },
    {
      quote: "Your brain will lie to you. It will say 'just once' or 'you deserve this.'",
      lesson: "Recognize these thoughts as the addiction speaking. They're not your true desires.",
    },
    {
      quote: "Track your triggers. Know your enemy.",
      lesson: "Boredom, stress, loneliness, and late nights are common triggers. Identify yours and have a plan.",
    },
    {
      quote: "Physical exercise is your best weapon.",
      lesson: "When urges hit, intense physical activity can redirect that energy productively.",
    },
    {
      quote: "It's not about perfection. It's about progress.",
      lesson: "If you slip, don't spiral. Learn what went wrong, adjust your strategy, and continue forward.",
    },
  ];

  return (
    <div className="space-y-4">
      {wisdom.map((item, index) => (
        <div key={index} className="card">
          <blockquote className="text-lg text-gray-900 italic mb-2">
            "{item.quote}"
          </blockquote>
          <p className="text-gray-600 text-sm">{item.lesson}</p>
        </div>
      ))}
    </div>
  );
}
