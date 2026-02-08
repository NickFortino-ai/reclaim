import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ResourceData {
  week: number;
  category: string;
  title: string;
  source?: string;
  summary: string;
  link?: string;
}

const resources: ResourceData[] = [
  // ===== WEEK 1 =====

  // Studies
  {
    week: 1,
    category: 'studies',
    title: 'Neuroscience of Internet Pornography Addiction',
    source: 'Behavioral Sciences, 2015',
    summary: 'Research shows pornography consumption can lead to neuroplastic changes in the brain similar to substance addiction, affecting dopamine pathways and reward circuits.',
    link: 'https://doi.org/10.3390/bs5030388',
  },
  {
    week: 1,
    category: 'studies',
    title: 'Pornography and the Male Sexual Script',
    source: 'Archives of Sexual Behavior, 2016',
    summary: 'Study found that higher pornography use was associated with lower sexual satisfaction, greater preference for pornographic sexual stimuli, and decreased enjoyment of intimate behaviors with a partner.',
    link: 'https://doi.org/10.1007/s10508-014-0391-2',
  },
  {
    week: 1,
    category: 'studies',
    title: 'Brain Structure and Connectivity Associated with Pornography Consumption',
    source: 'JAMA Psychiatry, 2014',
    summary: 'MRI study of 64 men found that increased pornography use correlated with reduced gray matter volume in the striatum and decreased connectivity in the prefrontal cortex, areas critical for motivation and decision-making.',
    link: 'https://doi.org/10.1001/jamapsychiatry.2014.93',
  },
  {
    week: 1,
    category: 'studies',
    title: 'Is Internet Pornography Causing Sexual Dysfunctions?',
    source: 'Behavioral Sciences, 2016',
    summary: 'Clinical review found growing evidence that internet pornography is a significant factor in the rise of sexual dysfunctions among young men, including erectile dysfunction and delayed ejaculation.',
    link: 'https://doi.org/10.3390/bs6030017',
  },
  {
    week: 1,
    category: 'studies',
    title: 'Predicting Compulsive Internet Use: The Role of Pornography',
    source: 'Cyberpsychology, Behavior, and Social Networking, 2015',
    summary: 'Research demonstrated that frequency of pornography use was the strongest predictor of compulsive internet use, surpassing all other online activities studied.',
    link: 'https://doi.org/10.1089/cyber.2014.0468',
  },

  // Testosterone
  {
    week: 1,
    category: 'testosterone',
    title: 'The 7-Day Spike',
    source: 'Journal of Zhejiang University, 2003',
    summary: 'Research found that abstaining from ejaculation for 7 days resulted in a 145.7% spike in serum testosterone levels on the seventh day.',
    link: 'https://doi.org/10.1631/jzus.2003.0236',
  },
  {
    week: 1,
    category: 'testosterone',
    title: 'Testosterone and Mental Clarity',
    summary: 'Healthy testosterone levels are associated with improved cognitive function, including better spatial memory, verbal fluency, and faster processing speed. Many men report a "brain fog lift" during recovery.',
  },
  {
    week: 1,
    category: 'testosterone',
    title: 'Sleep Quality and Testosterone',
    source: 'JAMA, 2011',
    summary: 'Studies show that poor sleep reduces testosterone by 10-15%. Quitting late-night pornography use often improves sleep onset and quality, indirectly supporting hormonal health.',
  },
  {
    week: 1,
    category: 'testosterone',
    title: 'Exercise Amplifies Recovery',
    summary: 'Resistance training combined with abstinence creates a compounding effect on testosterone. Compound movements like squats and deadlifts produce the largest acute testosterone responses.',
  },
  {
    week: 1,
    category: 'testosterone',
    title: 'Dopamine-Testosterone Connection',
    summary: 'Chronic overstimulation of dopamine receptors through pornography can suppress GnRH (gonadotropin-releasing hormone), which is essential for testosterone production. Recovery allows this system to normalize.',
  },

  // Intimacy
  {
    week: 1,
    category: 'intimacy',
    title: 'Oxytocin and Pair Bonding in Humans',
    source: 'Psychoneuroendocrinology, 2012',
    summary: 'Physical intimacy with a real partner triggers sustained oxytocin release, strengthening emotional bonds and attachment. This "bonding hormone" creates lasting connection that pornography cannot replicate.',
    link: 'https://doi.org/10.1016/j.psyneuen.2012.01.007',
  },
  {
    week: 1,
    category: 'intimacy',
    title: 'Pornography and Relationship Satisfaction',
    source: 'Human Communication Research, 2017',
    summary: 'Meta-analysis of 50 studies found that pornography consumption is significantly associated with lower relationship satisfaction, reduced commitment, and poorer communication with partners.',
    link: 'https://doi.org/10.1111/hcre.12108',
  },
  {
    week: 1,
    category: 'intimacy',
    title: 'The Coolidge Effect and Novelty Seeking',
    summary: 'Pornography exploits the brain\'s novelty-seeking circuitry (the Coolidge Effect), creating a cycle of escalation. Real intimacy builds depth and satisfaction through familiarity and emotional safety.',
  },
  {
    week: 1,
    category: 'intimacy',
    title: 'Rebuilding Sensitivity',
    summary: 'Recovery from pornography use allows the brain to recalibrate its reward system. Many men report increased physical and emotional sensitivity to real touch within weeks of quitting.',
  },
  {
    week: 1,
    category: 'intimacy',
    title: 'Presence Over Performance',
    summary: 'Pornography creates performance anxiety by setting unrealistic expectations. Real intimacy thrives on presence, vulnerability, and emotional attunement rather than technique or performance.',
  },

  // Wisdom
  {
    week: 1,
    category: 'wisdom',
    title: 'On Self-Mastery',
    source: 'Marcus Aurelius',
    summary: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
    link: 'The first step to reclaiming your life is recognizing that the urge is not your master. You choose your response.',
  },
  {
    week: 1,
    category: 'wisdom',
    title: 'On Temporary Urges',
    summary: 'The urge is temporary. The regret lasts much longer.',
    link: 'When you feel the pull, remember: this feeling will pass in minutes, but breaking your streak affects your momentum for days.',
  },
  {
    week: 1,
    category: 'wisdom',
    title: 'On Discipline',
    source: 'Jocko Willink',
    summary: 'Discipline equals freedom.',
    link: 'Every time you say no to an urge, you build the discipline muscle. That discipline extends to every area of your life.',
  },
  {
    week: 1,
    category: 'wisdom',
    title: 'On Becoming',
    source: 'James Clear',
    summary: 'Every action you take is a vote for the type of person you wish to become.',
    link: 'Each day you choose recovery, you are voting for the man you want to be. Your identity is built one choice at a time.',
  },
  {
    week: 1,
    category: 'wisdom',
    title: 'On Starting',
    source: 'Lao Tzu',
    summary: 'A journey of a thousand miles begins with a single step.',
    link: '365 days can feel overwhelming. But you only need to win today. Stack enough todays and the journey takes care of itself.',
  },

  // ===== WEEK 2 =====

  // Studies
  {
    week: 2,
    category: 'studies',
    title: 'Pornography Use and Loneliness',
    source: 'Psychology of Addictive Behaviors, 2017',
    summary: 'Longitudinal study found that increased pornography use predicted increased loneliness over time, and loneliness predicted increased pornography use, creating a self-reinforcing cycle.',
    link: 'https://doi.org/10.1037/adb0000309',
  },
  {
    week: 2,
    category: 'studies',
    title: 'Habituation to Internet Pornography',
    source: 'PLOS ONE, 2014',
    summary: 'fMRI study showed that frequent pornography users exhibited reduced neural response in the reward system, requiring increasingly extreme material to achieve the same level of arousal — evidence of tolerance.',
    link: 'https://doi.org/10.1371/journal.pone.0102419',
  },
  {
    week: 2,
    category: 'studies',
    title: 'Self-Perceived Effects of Pornography Consumption',
    source: 'Archives of Sexual Behavior, 2019',
    summary: 'Survey of 1,500+ participants found that the majority perceived negative effects from their own pornography use, including decreased satisfaction with real partners and feeling addicted.',
  },
  {
    week: 2,
    category: 'studies',
    title: 'Pornography and Aggression: A Meta-Analysis',
    source: 'Aggressive Behavior, 2015',
    summary: 'Meta-analysis of 22 studies across 7 countries found a significant association between pornography consumption and sexual aggression, both verbal and physical.',
    link: 'https://doi.org/10.1002/ab.21562',
  },
  {
    week: 2,
    category: 'studies',
    title: 'Delay Discounting and Pornography',
    source: 'Journal of Sex Research, 2016',
    summary: 'Pornography exposure increased delay discounting — the tendency to choose smaller immediate rewards over larger future ones — similar to the effect seen with substance use disorders.',
  },

  // Testosterone
  {
    week: 2,
    category: 'testosterone',
    title: 'Zinc and Testosterone Production',
    summary: 'Zinc is essential for testosterone synthesis. Foods like oysters, red meat, pumpkin seeds, and dark chocolate are excellent sources. A zinc deficiency can reduce testosterone by up to 50%.',
  },
  {
    week: 2,
    category: 'testosterone',
    title: 'Cold Exposure and Hormones',
    summary: 'Cold showers and cold exposure activate the sympathetic nervous system, increase norepinephrine by 200-300%, and may support testosterone production. Many recovery practitioners use cold showers as an urge management tool.',
  },
  {
    week: 2,
    category: 'testosterone',
    title: 'Stress, Cortisol, and Testosterone',
    summary: 'Cortisol and testosterone have an inverse relationship. Chronic stress from guilt, shame, and the binge-regret cycle of addiction suppresses testosterone. Breaking the cycle allows cortisol to normalize.',
  },
  {
    week: 2,
    category: 'testosterone',
    title: 'Vitamin D: The Hormone Vitamin',
    source: 'Hormone and Metabolic Research, 2011',
    summary: 'Men who supplemented with Vitamin D for one year showed a significant increase in testosterone levels compared to placebo. Sun exposure and supplementation both support healthy levels.',
  },
  {
    week: 2,
    category: 'testosterone',
    title: 'Body Fat and Estrogen',
    summary: 'Excess body fat increases aromatase activity, converting testosterone into estrogen. Maintaining a healthy body composition through exercise and diet directly supports optimal testosterone levels.',
  },

  // Intimacy
  {
    week: 2,
    category: 'intimacy',
    title: 'Attachment Theory and Adult Relationships',
    source: 'Personality and Social Psychology Review, 2000',
    summary: 'Secure attachment — feeling safe and connected — is the foundation of satisfying intimate relationships. Pornography use often correlates with avoidant attachment patterns that can be reversed through recovery.',
  },
  {
    week: 2,
    category: 'intimacy',
    title: 'Emotional Availability in Relationships',
    summary: 'Being emotionally present is more important than physical performance in intimate relationships. Pornography trains the brain to disconnect emotionally during physical intimacy. Recovery reverses this pattern.',
  },
  {
    week: 2,
    category: 'intimacy',
    title: 'The Science of Touch',
    source: 'Neuron, 2014',
    summary: 'Gentle human touch activates C-tactile afferents, specialized nerve fibers that promote calm, connection, and well-being. This system is unique to skin-to-skin contact and cannot be replicated by screens.',
  },
  {
    week: 2,
    category: 'intimacy',
    title: 'Communication and Sexual Satisfaction',
    source: 'Journal of Sex & Marital Therapy, 2019',
    summary: 'Couples who communicate openly about desires and boundaries report significantly higher sexual satisfaction. Pornography bypasses this crucial skill, while recovery naturally develops it.',
  },
  {
    week: 2,
    category: 'intimacy',
    title: 'Vulnerability as Strength',
    source: 'Brené Brown',
    summary: 'Vulnerability is the birthplace of connection and intimacy. Pornography offers a vulnerability-free substitute that ultimately leaves you more isolated. Real connection requires emotional risk.',
  },

  // Wisdom
  {
    week: 2,
    category: 'wisdom',
    title: 'On Struggle',
    source: 'Viktor Frankl',
    summary: 'What is to give light must endure burning.',
    link: 'The discomfort of recovery is the forge that shapes you. Embrace the difficulty — it means transformation is happening.',
  },
  {
    week: 2,
    category: 'wisdom',
    title: 'On Character',
    source: 'John Wooden',
    summary: 'The true test of a man\'s character is what he does when no one is watching.',
    link: 'Recovery happens in private moments. The choices you make alone define who you truly are.',
  },
  {
    week: 2,
    category: 'wisdom',
    title: 'On Patience',
    source: 'Epictetus',
    summary: 'No great thing is created suddenly, any more than a bunch of grapes or a fig.',
    link: 'Healing takes time. Your brain didn\'t rewire overnight, and it won\'t fully recover overnight either. Trust the process.',
  },
  {
    week: 2,
    category: 'wisdom',
    title: 'On Falling',
    source: 'Japanese Proverb',
    summary: 'Fall seven times, stand up eight.',
    link: 'A relapse doesn\'t erase your progress. The neural pathways you\'ve built during clean days are still there. Get back up.',
  },
  {
    week: 2,
    category: 'wisdom',
    title: 'On Chains',
    source: 'Samuel Johnson',
    summary: 'The chains of habit are too light to be felt until they are too heavy to be broken.',
    link: 'Act now while you have the awareness and motivation. Every day of freedom makes the next day easier.',
  },

  // ===== WEEK 3 =====

  // Studies
  {
    week: 3,
    category: 'studies',
    title: 'Pornography Use and Depressive Symptoms',
    source: 'Journal of Affective Disorders, 2020',
    summary: 'Study of 1,639 adults found that pornography use frequency was significantly associated with increased depressive symptoms, even after controlling for demographics and relationship status.',
  },
  {
    week: 3,
    category: 'studies',
    title: 'The Developing Brain and Pornography',
    source: 'Child and Adolescent Psychiatric Clinics, 2018',
    summary: 'Neuroscience research shows that pornography exposure during brain development (before age 25) can permanently alter reward circuitry, making young men particularly vulnerable to compulsive use.',
  },
  {
    week: 3,
    category: 'studies',
    title: 'Cue Reactivity in Problematic Pornography Users',
    source: 'Neuropsychopharmacology, 2018',
    summary: 'fMRI study demonstrated that men with compulsive pornography use show heightened brain activation when shown sexual cues, matching patterns seen in drug addiction cue-reactivity studies.',
  },
  {
    week: 3,
    category: 'studies',
    title: 'Recovery of Sexual Function After Pornography Cessation',
    source: 'Urology Case Reports, 2020',
    summary: 'Case study documented complete recovery of erectile function in a young man after 6 months of pornography abstinence, with no pharmaceutical intervention required.',
  },
  {
    week: 3,
    category: 'studies',
    title: 'Mindfulness and Urge Surfing',
    source: 'Addictive Behaviors, 2019',
    summary: 'Research found that mindfulness-based interventions significantly reduced pornography use by training participants to observe urges without acting on them — the "urge surfing" technique.',
  },

  // Testosterone
  {
    week: 3,
    category: 'testosterone',
    title: 'Alcohol and Testosterone',
    summary: 'Even moderate alcohol consumption suppresses testosterone production. Studies show acute alcohol intake can reduce testosterone for up to 24 hours. Reducing or eliminating alcohol amplifies recovery benefits.',
  },
  {
    week: 3,
    category: 'testosterone',
    title: 'The Androgen Receptor Density Theory',
    summary: 'Some researchers theorize that abstinence increases androgen receptor density in muscles and the brain, making you more sensitive to existing testosterone. This could explain the increased confidence many men report.',
  },
  {
    week: 3,
    category: 'testosterone',
    title: 'Intermittent Fasting and Growth Hormone',
    summary: 'Intermittent fasting can increase human growth hormone (HGH) by up to 2000%, which works synergistically with testosterone for muscle growth, fat loss, and overall vitality.',
  },
  {
    week: 3,
    category: 'testosterone',
    title: 'Competitive Drive and Testosterone',
    source: 'Hormones and Behavior, 2010',
    summary: 'Testosterone rises in anticipation of competition and further increases with victory. Engaging in healthy competition — sports, career goals, fitness challenges — naturally elevates testosterone.',
  },
  {
    week: 3,
    category: 'testosterone',
    title: 'Sugar: The Silent Testosterone Killer',
    source: 'Clinical Endocrinology, 2013',
    summary: 'Glucose ingestion was shown to decrease testosterone levels by up to 25% in men. Reducing sugar intake is one of the simplest dietary changes to support hormonal health.',
  },

  // Intimacy
  {
    week: 3,
    category: 'intimacy',
    title: 'Mirror Neurons and Empathy',
    source: 'Annual Review of Neuroscience, 2004',
    summary: 'Mirror neurons fire both when we act and when we observe others acting. Pornography may train these neurons toward detached observation rather than empathic participation in intimacy.',
  },
  {
    week: 3,
    category: 'intimacy',
    title: 'Eye Contact and Connection',
    source: 'Royal Society Open Science, 2019',
    summary: 'Sustained eye contact increases feelings of attraction, bonding, and intimacy between partners. This simple act activates the social brain network in ways that screen-based stimuli cannot.',
  },
  {
    week: 3,
    category: 'intimacy',
    title: 'The Gottman Method: Building Trust',
    source: 'John Gottman, PhD',
    summary: 'Dr. Gottman\'s research shows that relationship trust is built through small, everyday moments of turning toward your partner. Pornography use represents a "turning away" that erodes trust over time.',
  },
  {
    week: 3,
    category: 'intimacy',
    title: 'Sensate Focus Therapy',
    summary: 'Developed by Masters and Johnson, sensate focus exercises help couples rebuild physical intimacy by removing performance pressure and focusing purely on sensation and presence.',
  },
  {
    week: 3,
    category: 'intimacy',
    title: 'Post-Orgasmic Bonding vs. Post-Pornography Shame',
    summary: 'Sexual intimacy with a partner releases a cocktail of bonding neurochemicals (oxytocin, vasopressin, endorphins). Pornography use, by contrast, often produces post-use shame that drives isolation.',
  },

  // Wisdom
  {
    week: 3,
    category: 'wisdom',
    title: 'On Awareness',
    source: 'Carl Jung',
    summary: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
    link: 'Understanding your triggers and patterns is half the battle. When you can name the urge, you can choose differently.',
  },
  {
    week: 3,
    category: 'wisdom',
    title: 'On Discomfort',
    source: 'Ryan Holiday',
    summary: 'The obstacle is the way.',
    link: 'The discomfort, the boredom, the restlessness — these are not problems to avoid. They are the path itself. Sit with them and grow.',
  },
  {
    week: 3,
    category: 'wisdom',
    title: 'On Identity',
    source: 'Atomic Habits',
    summary: 'The goal is not to quit pornography. The goal is to become someone who doesn\'t need it.',
    link: 'Focus on who you are becoming, not just what you are stopping. Identity change drives lasting behavior change.',
  },
  {
    week: 3,
    category: 'wisdom',
    title: 'On Strength',
    source: 'Seneca',
    summary: 'It is not because things are difficult that we do not dare; it is because we do not dare that things are difficult.',
    link: 'You are stronger than you think. The only way to discover your strength is to face the challenge head-on.',
  },
  {
    week: 3,
    category: 'wisdom',
    title: 'On Purpose',
    source: 'Friedrich Nietzsche',
    summary: 'He who has a why to live can bear almost any how.',
    link: 'Connect your recovery to your deeper purpose — your relationships, your career, your self-respect. The "why" fuels the discipline.',
  },

  // ===== WEEK 4 =====

  // Studies
  {
    week: 4,
    category: 'studies',
    title: 'Neuroplasticity and Recovery',
    source: 'Neuroscience & Biobehavioral Reviews, 2019',
    summary: 'Review of neuroimaging studies confirmed that the brain changes associated with compulsive sexual behavior are reversible with sustained abstinence, demonstrating the brain\'s remarkable plasticity.',
  },
  {
    week: 4,
    category: 'studies',
    title: 'Pornography and Working Memory',
    source: 'Journal of Sex Research, 2013',
    summary: 'Participants watching pornography showed significantly decreased working memory capacity. This "cognitive narrowing" effect explains the difficulty concentrating that many users report.',
  },
  {
    week: 4,
    category: 'studies',
    title: 'The Role of Shame in Compulsive Behavior',
    source: 'Sexual Addiction & Compulsivity, 2019',
    summary: 'Research shows that shame drives compulsive pornography use in a vicious cycle. Self-compassion-based approaches reduce shame and are more effective than willpower alone.',
  },
  {
    week: 4,
    category: 'studies',
    title: 'Social Connection as Protection Against Addiction',
    source: 'Human Psychopharmacology, 2015',
    summary: 'Studies consistently show that strong social connections are protective against all forms of addiction. The "opposite of addiction is connection" finding applies directly to pornography recovery.',
  },
  {
    week: 4,
    category: 'studies',
    title: 'Meditation and Prefrontal Cortex Strengthening',
    source: 'Psychiatry Research: Neuroimaging, 2011',
    summary: 'Just 8 weeks of mindfulness meditation increased gray matter density in the prefrontal cortex — the brain region responsible for impulse control and decision-making that pornography use weakens.',
    link: 'https://doi.org/10.1016/j.pscychresns.2010.08.006',
  },

  // Testosterone
  {
    week: 4,
    category: 'testosterone',
    title: 'Ashwagandha and Testosterone',
    source: 'Journal of the International Society of Sports Nutrition, 2015',
    summary: 'Men supplementing with ashwagandha showed a 17% increase in testosterone and 167% increase in sperm count. It also significantly reduced cortisol levels.',
  },
  {
    week: 4,
    category: 'testosterone',
    title: 'The Testosterone Timeline of Recovery',
    summary: 'Week 1: Energy fluctuations. Week 2-3: Flatline common, testosterone stabilizing. Week 4+: Consistent energy improvements. Month 2-3: Significant confidence and drive increases. Month 6+: Full hormonal optimization.',
  },
  {
    week: 4,
    category: 'testosterone',
    title: 'Microplastics and Endocrine Disruption',
    summary: 'Microplastics and BPA in food packaging act as endocrine disruptors, mimicking estrogen in the body. Using glass containers, filtering water, and avoiding heated plastic supports hormonal health.',
  },
  {
    week: 4,
    category: 'testosterone',
    title: 'Sprinting vs. Long Cardio',
    source: 'British Journal of Sports Medicine',
    summary: 'High-intensity sprinting increases testosterone significantly more than endurance cardio. Long-distance running can actually increase cortisol and decrease testosterone. Short, intense bursts are optimal.',
  },
  {
    week: 4,
    category: 'testosterone',
    title: 'Social Dominance and Hormones',
    summary: 'Testosterone levels are influenced by social context. Taking on leadership roles, asserting boundaries, and stepping outside your comfort zone create positive feedback loops with testosterone production.',
  },

  // Intimacy
  {
    week: 4,
    category: 'intimacy',
    title: 'Love Languages and Connection',
    source: 'Gary Chapman, PhD',
    summary: 'Understanding your partner\'s love language (words of affirmation, acts of service, physical touch, gifts, quality time) deepens connection far beyond physical intimacy alone.',
  },
  {
    week: 4,
    category: 'intimacy',
    title: 'Pornography\'s Impact on Partner Self-Esteem',
    source: 'Sex Roles, 2017',
    summary: 'Research found that a partner\'s pornography use was associated with lower self-esteem, body image issues, and feelings of betrayal in the other partner, damaging the relationship foundation.',
  },
  {
    week: 4,
    category: 'intimacy',
    title: 'The Four Horsemen of Relationships',
    source: 'John Gottman, PhD',
    summary: 'Criticism, contempt, defensiveness, and stonewalling predict relationship failure with 94% accuracy. Pornography use often increases stonewalling and defensiveness. Recovery opens the door to healthier patterns.',
  },
  {
    week: 4,
    category: 'intimacy',
    title: 'Neurochemistry of Falling in Love',
    source: 'Journal of Comparative Neurology, 2005',
    summary: 'Romantic love activates the brain\'s reward system differently than lust alone — engaging areas associated with long-term bonding, attachment, and deep satisfaction that pornography cannot access.',
  },
  {
    week: 4,
    category: 'intimacy',
    title: 'Healing Together: Disclosure and Recovery',
    summary: 'For couples, honest disclosure about pornography use — while painful initially — is consistently associated with better long-term outcomes than secrecy. Healing happens in the open, not in the shadows.',
  },

  // Wisdom
  {
    week: 4,
    category: 'wisdom',
    title: 'On Consistency',
    source: 'Aristotle',
    summary: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    link: 'You are building new habits right now. Every clean day is reinforcing the neural pathways of the person you are becoming.',
  },
  {
    week: 4,
    category: 'wisdom',
    title: 'On Fear',
    source: 'Nelson Mandela',
    summary: 'I learned that courage was not the absence of fear, but the triumph over it.',
    link: 'You don\'t need to be fearless. You need to act despite the fear. That is true courage.',
  },
  {
    week: 4,
    category: 'wisdom',
    title: 'On Integrity',
    source: 'C.S. Lewis',
    summary: 'Integrity is doing the right thing, even when no one is watching.',
    link: 'Your private choices are the truest measure of your character. Build integrity in the unseen moments.',
  },
  {
    week: 4,
    category: 'wisdom',
    title: 'On Progress',
    source: 'Confucius',
    summary: 'It does not matter how slowly you go as long as you do not stop.',
    link: 'Four weeks in. You are further than you were. Don\'t compare your timeline to anyone else\'s. Just keep going.',
  },
  {
    week: 4,
    category: 'wisdom',
    title: 'On Transformation',
    source: 'Rumi',
    summary: 'The wound is the place where the Light enters you.',
    link: 'Your struggle with this addiction is not a weakness — it is the catalyst for becoming the strongest version of yourself.',
  },
];

async function main() {
  const existing = await prisma.resource.count();
  if (existing > 0) {
    console.log(`Skipping seed: ${existing} resources already exist.`);
    return;
  }

  console.log(`Seeding ${resources.length} resources...`);

  for (const r of resources) {
    await prisma.resource.create({ data: r });
  }

  console.log(`Done! Seeded ${resources.length} resources across weeks 1-4.`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
