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

  // ===== WEEK 5 =====
  { week: 5, category: 'studies', title: 'Pornography and Anxiety Disorders', source: 'Journal of Sexual Medicine, 2015', summary: 'Study found a strong positive correlation between pornography use frequency and generalized anxiety. Men who quit reported significant anxiety reduction within 90 days.' },
  { week: 5, category: 'studies', title: 'The Dopamine Deficit State', source: 'Nature Reviews Neuroscience, 2011', summary: 'Chronic overstimulation of dopamine circuits leads to receptor downregulation — a "dopamine deficit state" where everyday pleasures feel flat. This explains the anhedonia many heavy users experience.' },
  { week: 5, category: 'studies', title: 'Pornography and Objectification', source: 'Psychology of Women Quarterly, 2017', summary: 'Experimental studies show that pornography consumption increases objectification of others, reducing empathy and the ability to see potential partners as full human beings.' },
  { week: 5, category: 'studies', title: 'Executive Function Impairment', source: 'Journal of Behavioral Addictions, 2016', summary: 'Compulsive pornography users showed significant deficits in executive function tasks including planning, cognitive flexibility, and inhibitory control — matching profiles of substance addicts.' },
  { week: 5, category: 'studies', title: 'The Role of Boredom in Relapse', source: 'Addictive Behaviors, 2018', summary: 'Research identified boredom as one of the top three triggers for pornography relapse. Developing structured routines and engaging hobbies is protective against this trigger.' },

  { week: 5, category: 'testosterone', title: 'Magnesium: The Forgotten Mineral', source: 'Biological Trace Element Research, 2011', summary: 'Magnesium supplementation significantly increased free and total testosterone in both athletes and sedentary men. Most Western diets are magnesium-deficient.' },
  { week: 5, category: 'testosterone', title: 'The Power of Morning Sunlight', summary: 'Exposure to natural sunlight within 30 minutes of waking helps regulate circadian rhythm, which governs testosterone production. The testes have light-sensitive receptors that respond to UV exposure.' },
  { week: 5, category: 'testosterone', title: 'Healthy Fats and Hormone Production', summary: 'Testosterone is synthesized from cholesterol. Diets too low in healthy fats (avocados, olive oil, nuts, eggs) can suppress testosterone production. Moderate fat intake is essential.' },
  { week: 5, category: 'testosterone', title: 'Deep Breathing and Cortisol Reduction', summary: 'Box breathing (4-4-4-4) and diaphragmatic breathing activate the parasympathetic nervous system, reducing cortisol within minutes. Lower cortisol directly supports testosterone production.' },
  { week: 5, category: 'testosterone', title: 'Posture and Hormones', source: 'Psychological Science, 2010', summary: 'Adopting "power poses" — expansive, upright postures — for just two minutes increased testosterone by 20% and decreased cortisol by 25%. Your body position literally changes your biochemistry.' },

  { week: 5, category: 'intimacy', title: 'Active Listening in Relationships', summary: 'Active listening — reflecting, validating, and being fully present — is the single strongest predictor of relationship satisfaction. Pornography trains passive consumption; intimacy requires active engagement.' },
  { week: 5, category: 'intimacy', title: 'The Bid for Connection', source: 'John Gottman, PhD', summary: 'Partners constantly make "bids" for attention and connection. Couples who respond to 86% of bids stay together; those who respond to only 33% divorce. Recovery increases your capacity to notice and respond.' },
  { week: 5, category: 'intimacy', title: 'Physical Affection Without Sexual Intent', summary: 'Non-sexual physical affection — hugs, hand-holding, cuddling — builds trust and intimacy independent of sexual desire. Men recovering from pornography often need to relearn that touch is not always sexual.' },
  { week: 5, category: 'intimacy', title: 'Repair Attempts in Conflict', source: 'The Seven Principles for Making Marriage Work', summary: 'The ability to make and receive "repair attempts" during conflict is the number one predictor of relationship survival. A repair attempt is any statement or action that de-escalates tension.' },
  { week: 5, category: 'intimacy', title: 'Fantasy vs. Reality Gap', summary: 'Pornography creates an ever-widening gap between fantasy and reality. Closing this gap through recovery allows you to find genuine arousal and satisfaction in real experiences with real people.' },

  { week: 5, category: 'wisdom', title: 'On Solitude', source: 'Blaise Pascal', summary: 'All of humanity\'s problems stem from man\'s inability to sit quietly in a room alone.', link: 'Learn to be comfortable with stillness. The urge to reach for stimulation is the habit you\'re breaking. Sit with the quiet.' },
  { week: 5, category: 'wisdom', title: 'On Growth', source: 'Carol Dweck', summary: 'In a growth mindset, challenges are exciting rather than threatening.', link: 'Reframe this journey. You are not depriving yourself of something. You are growing into someone stronger.' },
  { week: 5, category: 'wisdom', title: 'On Habits', source: 'Will Durant', summary: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', link: 'Five weeks of new habits. Your brain is physically different now than when you started. Keep building.' },
  { week: 5, category: 'wisdom', title: 'On Temptation', source: 'Oscar Wilde', summary: 'I can resist anything except temptation.', link: 'Don\'t rely on willpower alone. Build systems — accountability partners, website blockers, structured routines — that make temptation harder to act on.' },
  { week: 5, category: 'wisdom', title: 'On Self-Respect', source: 'Joan Didion', summary: 'Self-respect is a discipline, a habit of mind that can never be faked but can be developed.', link: 'Every day clean is a deposit into your self-respect account. You are earning your own trust back.' },

  // ===== WEEK 6 =====
  { week: 6, category: 'studies', title: 'Pornography and Social Anxiety', source: 'Computers in Human Behavior, 2017', summary: 'Study found that pornography use was associated with increased social anxiety and decreased social confidence, particularly in face-to-face interactions with potential partners.' },
  { week: 6, category: 'studies', title: 'The Escalation Phenomenon', source: 'Archives of Sexual Behavior, 2016', summary: 'Approximately 49% of users reported escalating to content they previously found uninteresting or disturbing. This tolerance pattern mirrors substance addiction escalation.' },
  { week: 6, category: 'studies', title: 'Pornography and Time Perception', source: 'Cyberpsychology, Behavior, 2018', summary: 'Heavy pornography users significantly underestimated time spent viewing, often by 200-300%. This distorted time perception is characteristic of flow states hijacked by addictive stimuli.' },
  { week: 6, category: 'studies', title: 'Withdrawal Symptoms Are Real', source: 'Journal of Behavioral Addictions, 2019', summary: 'Men who quit pornography reported withdrawal symptoms including irritability, anxiety, insomnia, and mood swings — peaking at 2-3 weeks. Recognizing these as temporary withdrawal reduces relapse risk.' },
  { week: 6, category: 'studies', title: 'Pornography and Body Image in Men', source: 'Body Image, 2019', summary: 'Research shows pornography use is associated with increased body dissatisfaction in men, including genital size anxiety and muscle dysmorphia. Recovery reduces these comparisons.' },

  { week: 6, category: 'testosterone', title: 'Creatine and Hormonal Benefits', source: 'Journal of the International Society of Sports Nutrition, 2009', summary: 'Creatine supplementation was shown to increase dihydrotestosterone (DHT) by 56% after loading and 40% during maintenance. DHT is the most potent androgen in the body.' },
  { week: 6, category: 'testosterone', title: 'Sleep Architecture and Hormones', summary: 'Most testosterone is produced during REM sleep. Blue light from screens suppresses melatonin and disrupts sleep architecture. Eliminating screens 1 hour before bed optimizes hormonal production.' },
  { week: 6, category: 'testosterone', title: 'The Gut-Hormone Connection', summary: 'Your gut microbiome directly influences hormone production. Fermented foods (kimchi, sauerkraut, yogurt) and fiber support a diverse microbiome that optimizes testosterone metabolism.' },
  { week: 6, category: 'testosterone', title: 'Boron: The Trace Mineral', source: 'Journal of Trace Elements in Medicine and Biology, 2011', summary: 'Just 10mg of boron daily for one week increased free testosterone by 28% and decreased estradiol by 39%. Boron is found in raisins, almonds, and avocados.' },
  { week: 6, category: 'testosterone', title: 'Overtraining and Testosterone Crash', summary: 'Excessive exercise without recovery suppresses testosterone and spikes cortisol. Rest days are not laziness — they are when your body builds muscle and optimizes hormones. Train hard, recover harder.' },

  { week: 6, category: 'intimacy', title: 'Emotional Flooding and Timeout', source: 'John Gottman, PhD', summary: 'When heart rate exceeds 100 BPM during conflict, rational thinking shuts down. Taking a 20-minute break allows the nervous system to calm. This is not avoidance — it is regulation.' },
  { week: 6, category: 'intimacy', title: 'The Importance of Friendship in Romance', summary: 'Research consistently shows that the strongest romantic relationships are built on a foundation of genuine friendship. Shared laughter, inside jokes, and playfulness predict long-term satisfaction.' },
  { week: 6, category: 'intimacy', title: 'Responsive Desire vs. Spontaneous Desire', source: 'Come As You Are, Emily Nagoski', summary: 'Not all desire works like a lightning bolt. Responsive desire — arousal that emerges in response to context and stimulation — is equally valid and far more common than spontaneous desire.' },
  { week: 6, category: 'intimacy', title: 'Creating Rituals of Connection', summary: 'Daily rituals — morning coffee together, goodnight kisses, weekly date nights — create predictable moments of connection that strengthen bonds over time. Small, consistent actions outperform grand gestures.' },
  { week: 6, category: 'intimacy', title: 'Secure Functioning in Relationships', source: 'Stan Tatkin, PsyD', summary: 'Secure-functioning relationships prioritize the partnership above individual needs. Both partners commit to protecting each other\'s sense of safety, making recovery a shared project.' },

  { week: 6, category: 'wisdom', title: 'On Endurance', source: 'Theodore Roosevelt', summary: 'Nothing in the world is worth having or worth doing unless it means effort, pain, difficulty.', link: 'Six weeks of effort. You are doing something genuinely difficult. That is exactly what makes it worth doing.' },
  { week: 6, category: 'wisdom', title: 'On Self-Knowledge', source: 'Socrates', summary: 'The unexamined life is not worth living.', link: 'Use this recovery to learn about yourself. What triggers you? What do you really want? Self-knowledge is the ultimate power.' },
  { week: 6, category: 'wisdom', title: 'On Environment', source: 'Jim Rohn', summary: 'You are the average of the five people you spend the most time with.', link: 'Surround yourself with people who support your growth. Distance yourself from influences that normalize what you\'re leaving behind.' },
  { week: 6, category: 'wisdom', title: 'On Attention', source: 'William James', summary: 'The faculty of voluntarily bringing back a wandering attention, over and over again, is the very root of judgment, character, and will.', link: 'Every time you redirect your attention from an urge, you strengthen your attention muscle. This is the core skill of recovery.' },
  { week: 6, category: 'wisdom', title: 'On Simplicity', source: 'Bruce Lee', summary: 'It is not a daily increase, but a daily decrease. Hack away at the unessential.', link: 'Recovery is subtraction, not addition. You are removing what doesn\'t serve you to reveal who you really are.' },

  // ===== WEEK 7 =====
  { week: 7, category: 'studies', title: 'Pornography and Empathy Reduction', source: 'Media Psychology, 2017', summary: 'Repeated pornography exposure was linked to decreased empathy toward sexual assault victims and reduced ability to take another person\'s emotional perspective.' },
  { week: 7, category: 'studies', title: 'The Default Mode Network and Craving', source: 'NeuroImage, 2019', summary: 'Brain imaging shows that pornography cravings activate the default mode network — the brain\'s "autopilot." Mindfulness deactivates this network, breaking the automatic craving-action cycle.' },
  { week: 7, category: 'studies', title: 'Pornography and Academic Performance', source: 'Journal of Adolescent Health, 2016', summary: 'Study of college students found that each additional hour of weekly pornography use predicted a 0.13 GPA decrease. The cognitive effects directly impair learning and academic achievement.' },
  { week: 7, category: 'studies', title: 'Dopamine Receptor Recovery Timeline', source: 'Synapse, 2010', summary: 'PET imaging studies show that dopamine D2 receptor density begins recovering after 2-4 weeks of abstinence, with significant recovery at 3 months. Pleasure from normal activities returns gradually.' },
  { week: 7, category: 'studies', title: 'The Prefrontal-Limbic Imbalance', source: 'Neuroscience & Biobehavioral Reviews, 2017', summary: 'Pornography addiction weakens prefrontal cortex control over limbic impulses, creating a "hijacked" brain. Recovery strengthens these top-down control pathways over time.' },

  { week: 7, category: 'testosterone', title: 'Omega-3 Fatty Acids and Hormones', source: 'Prostaglandins, Leukotrienes and Essential Fatty Acids, 2010', summary: 'Omega-3 fatty acids from fish oil support testosterone production by reducing inflammation and providing raw materials for hormone synthesis. Aim for 2-3g EPA/DHA daily.' },
  { week: 7, category: 'testosterone', title: 'Sauna Use and Growth Hormone', source: 'Annals of Clinical Research, 1986', summary: 'Sauna sessions of 20 minutes at 80°C increased growth hormone by 200-300%. Growth hormone works synergistically with testosterone for body composition and recovery.' },
  { week: 7, category: 'testosterone', title: 'The Testosterone-Confidence Loop', summary: 'Testosterone increases confidence, and confident behavior increases testosterone. This positive feedback loop means that small wins during recovery compound into major changes in how you carry yourself.' },
  { week: 7, category: 'testosterone', title: 'Hydration and Hormonal Function', summary: 'Even mild dehydration (2%) can reduce testosterone production and increase cortisol. Most men are chronically under-hydrated. Aim for body weight in pounds divided by 2 in ounces daily.' },
  { week: 7, category: 'testosterone', title: 'Heavy Compound Lifts', summary: 'Squats, deadlifts, bench press, and overhead press recruit the most muscle fibers and produce the greatest acute testosterone response. 3-5 sets of 5-8 reps with heavy weight is optimal for hormonal response.' },

  { week: 7, category: 'intimacy', title: 'The Pursuer-Withdrawer Dynamic', source: 'Emotionally Focused Therapy', summary: 'In many relationships, one partner pursues connection while the other withdraws. Understanding this cycle helps break destructive patterns. Pornography often fuels the withdrawal side.' },
  { week: 7, category: 'intimacy', title: 'Apology and Repair', summary: 'A genuine apology includes acknowledgment, remorse, and changed behavior — not just words. For partners affected by pornography use, consistent changed behavior is the most powerful form of repair.' },
  { week: 7, category: 'intimacy', title: 'The Window of Tolerance', source: 'Daniel Siegel, MD', summary: 'The "window of tolerance" is the zone where we can process emotions without becoming overwhelmed or numb. Pornography use narrows this window; recovery and mindfulness expand it.' },
  { week: 7, category: 'intimacy', title: 'Nonsexual Massage and Bonding', summary: 'Regular nonsexual massage between partners increases oxytocin, reduces cortisol, and builds physical trust. It teaches that physical closeness is about connection, not performance.' },
  { week: 7, category: 'intimacy', title: 'Gratitude in Relationships', source: 'Personal Relationships, 2010', summary: 'Expressing gratitude to your partner — noticing and verbalizing appreciation — is one of the strongest predictors of relationship longevity. It shifts focus from what\'s lacking to what\'s present.' },

  { week: 7, category: 'wisdom', title: 'On Time', source: 'Seneca', summary: 'It is not that we have a short time to live, but that we waste a great deal of it.', link: 'Calculate how many hours you\'ve reclaimed since quitting. That time is now invested in your growth, your relationships, your purpose.' },
  { week: 7, category: 'wisdom', title: 'On Momentum', source: 'Isaac Newton', summary: 'An object in motion stays in motion. An object at rest stays at rest.', link: 'Seven weeks of momentum. The physics of habit are on your side now. Keep moving forward — the energy required decreases over time.' },
  { week: 7, category: 'wisdom', title: 'On Action', source: 'Martin Luther King Jr.', summary: 'You don\'t have to see the whole staircase. Just take the first step.', link: 'Don\'t worry about day 365. Just win the next hour. Then the next. Small steps in the right direction add up.' },
  { week: 7, category: 'wisdom', title: 'On Sacrifice', source: 'Jordan Peterson', summary: 'You can only become truly accomplished at something you love. Don\'t make money your goal. Instead, pursue the things you love doing.', link: 'What you sacrifice pornography for is what matters. Not deprivation — redirection toward what truly fulfills you.' },
  { week: 7, category: 'wisdom', title: 'On the Present', source: 'Eckhart Tolle', summary: 'Realize deeply that the present moment is all you ever have.', link: 'Urges pull you into fantasy. Recovery anchors you in the present. This moment — right now — is where your real life is happening.' },

  // ===== WEEK 8 =====
  { week: 8, category: 'studies', title: 'Pornography and Attachment Insecurity', source: 'Journal of Social and Personal Relationships, 2017', summary: 'Pornography use significantly increased attachment anxiety and avoidance in longitudinal studies. Recovery was associated with a gradual shift toward more secure attachment styles.' },
  { week: 8, category: 'studies', title: 'The Stress-Relapse Connection', source: 'Psychoneuroendocrinology, 2016', summary: 'Cortisol spikes significantly increase the probability of addictive behavior relapse. Stress management is not optional in recovery — it is a core clinical requirement.' },
  { week: 8, category: 'studies', title: 'Pornography and Sleep Disruption', source: 'Sleep Health, 2019', summary: 'Late-night pornography use was associated with delayed sleep onset, reduced total sleep time, and poorer sleep quality. The blue light and arousal state create a double disruption to circadian rhythm.' },
  { week: 8, category: 'studies', title: 'Accountability Partners and Recovery Success', source: 'Journal of Groups in Addiction & Recovery, 2014', summary: 'Having at least one accountability partner doubled recovery success rates in behavioral addiction studies. The mechanism involves both social support and external monitoring reducing impulsive behavior.' },
  { week: 8, category: 'studies', title: 'The Abstinence Violation Effect', source: 'Clinical Psychology Review, 2011', summary: 'A single relapse often leads to a full binge due to the "abstinence violation effect" — the belief that one slip means total failure. Cognitive reframing of lapses as learning experiences prevents this cascade.' },

  { week: 8, category: 'testosterone', title: 'Tongkat Ali (Eurycoma Longifolia)', source: 'Journal of the International Society of Sports Nutrition, 2013', summary: 'Tongkat Ali supplementation for 4 weeks improved testosterone levels by 37% in stressed men and significantly reduced cortisol. It works primarily by freeing testosterone bound to SHBG.' },
  { week: 8, category: 'testosterone', title: 'Protein Timing and Testosterone', summary: 'Consuming 20-40g of protein within 30 minutes post-workout supports both muscle protein synthesis and the hormonal environment. Leucine-rich sources (whey, eggs, meat) are optimal.' },
  { week: 8, category: 'testosterone', title: 'Grounding and Cortisol', source: 'Journal of Alternative and Complementary Medicine, 2010', summary: 'Walking barefoot on natural ground (grounding/earthing) reduced cortisol levels and improved sleep quality in controlled studies. Lower cortisol directly supports testosterone production.' },
  { week: 8, category: 'testosterone', title: 'The Two-Month Milestone', summary: 'At approximately 8 weeks of recovery, many men report a significant shift: energy stabilizes, motivation increases, and the "flatline" period typically ends. Your hormonal system is recalibrating.' },
  { week: 8, category: 'testosterone', title: 'Limiting Processed Foods', summary: 'Ultra-processed foods contain additives, seed oils, and preservatives that increase inflammation and disrupt endocrine function. Whole foods — meat, vegetables, fruits, nuts — are the foundation of hormonal health.' },

  { week: 8, category: 'intimacy', title: 'Co-Regulation in Relationships', source: 'Polyvagal Theory, Stephen Porges', summary: 'Our nervous systems are designed to regulate each other. Being near a calm, safe partner literally calms your own nervous system. This biological co-regulation is the foundation of true intimacy.' },
  { week: 8, category: 'intimacy', title: 'The 5:1 Ratio', source: 'John Gottman, PhD', summary: 'Stable, happy couples maintain a ratio of 5 positive interactions for every 1 negative interaction. Focus on increasing positivity rather than just eliminating conflict.' },
  { week: 8, category: 'intimacy', title: 'Desire Discrepancy', summary: 'Mismatched sex drives are normal and universal. The goal is not identical desire but compassionate negotiation. Pornography distorts expectations around sexual frequency and availability.' },
  { week: 8, category: 'intimacy', title: 'Mindful Touch Exercises', summary: 'Practice touching your partner\'s hand or arm with full attention for 60 seconds. Notice temperature, texture, pressure. This mindful touch exercise rewires the brain toward present-moment physical connection.' },
  { week: 8, category: 'intimacy', title: 'Rebuilding Trust: The Timeline', summary: 'Trust is rebuilt slowly — typically 6-24 months after disclosure. Impatience is the enemy. Consistent, transparent behavior over time is the only evidence that matters.' },

  { week: 8, category: 'wisdom', title: 'On Perseverance', source: 'Winston Churchill', summary: 'If you\'re going through hell, keep going.', link: 'The flatline, the urges, the difficult days — they are not signs of failure. They are the "hell" you must walk through to reach the other side.' },
  { week: 8, category: 'wisdom', title: 'On Legacy', source: 'Ralph Waldo Emerson', summary: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', link: 'Your past does not define you. Your potential does. What you are building within yourself right now is what matters.' },
  { week: 8, category: 'wisdom', title: 'On Comparison', source: 'Theodore Roosevelt', summary: 'Comparison is the thief of joy.', link: 'Don\'t compare your day 56 to someone else\'s day 200. Your journey is yours alone. Celebrate your own progress.' },
  { week: 8, category: 'wisdom', title: 'On Mastery', source: 'George Leonard', summary: 'We fail to realize that mastery is not about perfection. It\'s about a process, a journey.', link: 'Recovery is not about being perfect. It\'s about the daily practice of choosing well. The practice itself is the goal.' },
  { week: 8, category: 'wisdom', title: 'On Inner Peace', source: 'Thich Nhat Hanh', summary: 'Peace is present right here and now, in ourselves and in everything we do and see.', link: 'You don\'t need external stimulation to feel alive. Peace is already within you. Recovery is learning to access it.' },

  // ===== WEEK 9 =====
  { week: 9, category: 'studies', title: 'Pornography and Moral Incongruence', source: 'Archives of Sexual Behavior, 2020', summary: 'The distress of pornography use often stems from moral incongruence — the gap between behavior and values. Aligning actions with values through recovery eliminates this persistent psychological burden.' },
  { week: 9, category: 'studies', title: 'Trigger-Response Mapping', source: 'Cognitive Therapy and Research, 2017', summary: 'CBT research shows that identifying specific triggers (boredom, stress, loneliness, HALT: Hungry, Angry, Lonely, Tired) and pre-planning responses reduces relapse by 60%.' },
  { week: 9, category: 'studies', title: 'Pornography and Procrastination', source: 'Computers in Human Behavior, 2019', summary: 'Pornography use was strongly associated with procrastination and reduced goal-directed behavior. The depleted dopamine system reduces motivation for effortful tasks that don\'t provide instant rewards.' },
  { week: 9, category: 'studies', title: 'The Role of Self-Efficacy in Recovery', source: 'Psychology of Addictive Behaviors, 2018', summary: 'Self-efficacy — belief in your ability to succeed — was the strongest predictor of sustained abstinence. Each successful week builds self-efficacy, creating a positive recovery spiral.' },
  { week: 9, category: 'studies', title: 'Surfing the Urge: A Clinical Technique', source: 'Mindfulness, 2016', summary: 'Clinical research validated that urges last an average of 15-20 minutes. The "urge surfing" technique — observing the urge rise, peak, and fall without acting — is one of the most effective relapse prevention tools.' },

  { week: 9, category: 'testosterone', title: 'Selenium and Thyroid-Testosterone Axis', summary: 'Selenium supports thyroid function, which regulates metabolism and testosterone production. Brazil nuts are the richest natural source — just 2-3 daily provide your entire selenium requirement.' },
  { week: 9, category: 'testosterone', title: 'Meditation Lowers Cortisol', source: 'Health Psychology, 2014', summary: 'Regular meditation practice reduced cortisol by 23% in a meta-analysis of 45 studies. Since cortisol directly suppresses testosterone, meditation indirectly supports hormonal optimization.' },
  { week: 9, category: 'testosterone', title: 'The Importance of Leg Day', summary: 'Legs contain the body\'s largest muscle groups. Training legs produces the greatest systemic hormonal response. Skipping leg day doesn\'t just affect your physique — it limits your testosterone production.' },
  { week: 9, category: 'testosterone', title: 'Caffeine Timing and Hormones', summary: 'Morning caffeine spikes cortisol and can disrupt the natural cortisol awakening response. Delaying caffeine by 90 minutes after waking optimizes both cortisol rhythm and testosterone production.' },
  { week: 9, category: 'testosterone', title: 'Nature Exposure and Stress Hormones', source: 'Frontiers in Psychology, 2019', summary: 'Spending just 20 minutes in nature reduced cortisol by 21%. Combining outdoor exercise with nature exposure creates a powerful hormonal optimization protocol.' },

  { week: 9, category: 'intimacy', title: 'Secure Base and Safe Haven', source: 'Attachment Theory', summary: 'In healthy relationships, partners serve as both a "secure base" for exploration and a "safe haven" for comfort. Pornography replaces the partner as safe haven, undermining the relationship foundation.' },
  { week: 9, category: 'intimacy', title: 'Emotional Intelligence and Intimacy', source: 'Daniel Goleman', summary: 'Emotional intelligence — self-awareness, self-regulation, empathy, and social skills — is more important for relationship success than IQ. Recovery naturally develops all four components.' },
  { week: 9, category: 'intimacy', title: 'The Art of Asking Questions', summary: 'Asking open-ended questions and being genuinely curious about your partner\'s inner world deepens intimacy more than any physical act. Create a habit of daily check-ins: "What was the best part of your day?"' },
  { week: 9, category: 'intimacy', title: 'Boundaries as Love', summary: 'Setting healthy boundaries is not rejection — it is an act of love and self-respect. Clear boundaries create the safety necessary for genuine intimacy to flourish.' },
  { week: 9, category: 'intimacy', title: 'Shared Meaning and Purpose', source: 'John Gottman, PhD', summary: 'Couples who build shared meaning — common goals, rituals, values, and dreams — report the highest levels of relationship satisfaction. Find what you are building together.' },

  { week: 9, category: 'wisdom', title: 'On Choices', source: 'Dumbledore (J.K. Rowling)', summary: 'It is our choices that show what we truly are, far more than our abilities.', link: 'Nine weeks of choices that define you. You are proving who you are with every decision you make.' },
  { week: 9, category: 'wisdom', title: 'On Battle', source: 'Sun Tzu', summary: 'Know your enemy and know yourself, and you can fight a hundred battles without disaster.', link: 'Know your triggers, your weak moments, your patterns. Self-knowledge is your greatest weapon in this fight.' },
  { week: 9, category: 'wisdom', title: 'On Suffering', source: 'Kahlil Gibran', summary: 'Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.', link: 'Your struggle is not wasted. It is building character that nothing else could build.' },
  { week: 9, category: 'wisdom', title: 'On Mindset', source: 'Marcus Aurelius', summary: 'The happiness of your life depends upon the quality of your thoughts.', link: 'Guard your mind. What you feed it — content, thoughts, beliefs — shapes your entire experience of life.' },
  { week: 9, category: 'wisdom', title: 'On Gratitude', source: 'Meister Eckhart', summary: 'If the only prayer you ever say in your entire life is thank you, it will be enough.', link: 'Practice gratitude for your recovery. For your clarity. For the version of yourself that is emerging.' },

  // ===== WEEK 10 =====
  { week: 10, category: 'studies', title: 'Pornography and Creativity', source: 'Psychology of Aesthetics, Creativity, and the Arts, 2018', summary: 'Heavy pornography users scored lower on creative thinking tasks. The theory is that dopamine depletion reduces the brain\'s ability to make novel associations — the core of creative thought.' },
  { week: 10, category: 'studies', title: 'The Reward Prediction Error', source: 'Neuron, 2016', summary: 'Addiction hijacks the brain\'s reward prediction system. Pornography trains the brain to expect supranormal stimuli, making normal rewards feel disappointing. Recovery recalibrates these predictions.' },
  { week: 10, category: 'studies', title: 'Physical Exercise as Addiction Treatment', source: 'Frontiers in Psychiatry, 2019', summary: 'Systematic review found that regular exercise significantly reduced cravings and relapse rates across all behavioral addictions. Exercise provides natural dopamine, endorphins, and improves executive function.' },
  { week: 10, category: 'studies', title: 'The Hypofrontality Theory', source: 'American Journal of Drug and Alcohol Abuse, 2012', summary: 'Chronic addiction causes "hypofrontality" — reduced activity in the prefrontal cortex responsible for self-control. At 10 weeks, research shows measurable prefrontal recovery begins accelerating.' },
  { week: 10, category: 'studies', title: 'Digital Minimalism and Well-Being', source: 'Journal of Social and Clinical Psychology, 2018', summary: 'Reducing overall screen time to 30 minutes of social media daily significantly improved well-being and reduced loneliness — a key trigger for pornography use.' },

  { week: 10, category: 'testosterone', title: 'Fenugreek Extract', source: 'Phytotherapy Research, 2011', summary: 'Fenugreek supplementation significantly increased testosterone and sexual function in healthy men over 8 weeks. It works by inhibiting enzymes that convert testosterone to estrogen.' },
  { week: 10, category: 'testosterone', title: 'Progressive Overload Principle', summary: 'Gradually increasing weight, reps, or volume in strength training continually challenges the body to produce more testosterone. Stagnant workouts produce stagnant hormonal responses.' },
  { week: 10, category: 'testosterone', title: 'The Power Nap', summary: 'A 20-minute nap between 1-3 PM can restore cognitive function and reduce cortisol without entering deep sleep. This optimizes afternoon energy and supports hormonal balance.' },
  { week: 10, category: 'testosterone', title: 'Garlic and Testosterone', source: 'Journal of Nutrition, 2001', summary: 'Garlic supplementation combined with a high-protein diet was shown to increase testicular testosterone levels in animal studies by reducing cortisol and oxidative stress.' },
  { week: 10, category: 'testosterone', title: 'Cold Water Immersion', summary: 'Cold water immersion at 14°C for 10-15 minutes post-workout reduces inflammation, speeds recovery, and stimulates brown fat activation. The acute stress response may support testosterone production.' },

  { week: 10, category: 'intimacy', title: 'The Relationship Bank Account', source: 'Stephen Covey', summary: 'Every positive interaction is a deposit; every negative one is a withdrawal. Pornography use is a major withdrawal. Recovery and consistent presence are deposits that rebuild the balance.' },
  { week: 10, category: 'intimacy', title: 'Differentiation in Relationships', source: 'David Schnarch, PhD', summary: 'Differentiation — maintaining your sense of self while staying connected — is the hallmark of mature intimacy. It means you can hold your own position while deeply respecting your partner\'s.' },
  { week: 10, category: 'intimacy', title: 'The Role of Humor in Connection', summary: 'Shared laughter releases endorphins, reduces stress hormones, and creates positive memories. Couples who laugh together regularly report higher satisfaction and resilience during difficult times.' },
  { week: 10, category: 'intimacy', title: 'Appreciative Inquiry in Relationships', summary: 'Instead of focusing on problems, ask: "What\'s working well? What do I love about us?" This appreciative approach builds on strengths rather than fixating on deficits.' },
  { week: 10, category: 'intimacy', title: 'Sexual Afterglow', source: 'Psychological Science, 2017', summary: 'Research found that sexual satisfaction\'s positive effects on relationship quality last approximately 48 hours. Real intimacy creates lasting neurochemical benefits that pornography cannot provide.' },

  { week: 10, category: 'wisdom', title: 'On Decisions', source: 'Tony Robbins', summary: 'It is in your moments of decision that your destiny is shaped.', link: 'Every moment of temptation is a decision point. You are literally choosing your future self right now.' },
  { week: 10, category: 'wisdom', title: 'On Freedom', source: 'Viktor Frankl', summary: 'Between stimulus and response there is a space. In that space is our freedom and our power to choose our response.', link: 'That space between urge and action — that is where you live now. That space is freedom itself.' },
  { week: 10, category: 'wisdom', title: 'On Persistence', source: 'Calvin Coolidge', summary: 'Nothing in this world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent.', link: 'Keep showing up. That is all that is asked of you. Show up again today.' },
  { week: 10, category: 'wisdom', title: 'On Self-Trust', source: 'Ralph Waldo Emerson', summary: 'Self-trust is the first secret of success.', link: 'Ten weeks clean. You are proving to yourself that you can be trusted with your own life. That trust is priceless.' },
  { week: 10, category: 'wisdom', title: 'On Silence', source: 'Mother Teresa', summary: 'In the silence of the heart God speaks.', link: 'In the absence of constant stimulation, you can finally hear your own inner voice. Listen to what it is telling you.' },

  // ===== WEEK 11 =====
  { week: 11, category: 'studies', title: 'Pornography and Mate Value Perception', source: 'Journal of Sex Research, 2017', summary: 'Exposure to pornography decreased men\'s perception of their own mate value and attractiveness. This reduced self-perception correlated with decreased confidence in approaching real partners.' },
  { week: 11, category: 'studies', title: 'The Habit Loop in Addiction', source: 'The Power of Habit, Charles Duhigg', summary: 'Every habit follows a cue-routine-reward loop. Identifying the specific cue (boredom, stress, time of day) allows you to insert a different routine while still satisfying the underlying reward need.' },
  { week: 11, category: 'studies', title: 'Green Exercise and Mental Health', source: 'Environmental Science & Technology, 2010', summary: 'Just 5 minutes of exercise in a natural environment significantly improved mood and self-esteem. "Green exercise" is an evidence-based tool for managing urges and improving mental health.' },
  { week: 11, category: 'studies', title: 'Pornography-Induced Delayed Ejaculation', source: 'Journal of Sexual Medicine, 2014', summary: 'Clinical research documented that pornography-induced delayed ejaculation resolved in the majority of cases after 2-3 months of abstinence, restoring normal sexual responsiveness.' },
  { week: 11, category: 'studies', title: 'Cognitive Behavioral Therapy for Pornography', source: 'Sexual Addiction & Compulsivity, 2019', summary: 'CBT programs specifically designed for pornography addiction showed 70% reduction in compulsive use. Key techniques include cognitive restructuring, behavioral experiments, and relapse prevention planning.' },

  { week: 11, category: 'testosterone', title: 'Vitamin K2 and Testosterone', source: 'Food & Function, 2011', summary: 'Vitamin K2 (MK-4) supplementation significantly increased testosterone production by activating enzymes in the testes. Found in fermented foods, grass-fed butter, and aged cheeses.' },
  { week: 11, category: 'testosterone', title: 'The Circadian Testosterone Cycle', summary: 'Testosterone peaks between 6-8 AM and drops to its lowest around midnight. Aligning your schedule with this rhythm — intense activity in the morning, rest at night — optimizes your hormonal environment.' },
  { week: 11, category: 'testosterone', title: 'Resistance Bands as Alternative Training', summary: 'Resistance bands provide variable resistance that stimulates muscle fibers differently than free weights. Adding bands to your routine provides novel stimulus that can reignite hormonal response.' },
  { week: 11, category: 'testosterone', title: 'Anti-Inflammatory Diet', summary: 'Chronic inflammation suppresses testosterone. An anti-inflammatory diet rich in turmeric, ginger, berries, leafy greens, and fatty fish reduces systemic inflammation and supports hormonal health.' },
  { week: 11, category: 'testosterone', title: 'Gratitude and Testosterone', source: 'Psychoneuroendocrinology, 2016', summary: 'Positive emotional states including gratitude were associated with healthier cortisol profiles. Since cortisol inversely affects testosterone, a gratitude practice indirectly supports hormonal balance.' },

  { week: 11, category: 'intimacy', title: 'The Art of Presence', summary: 'Being truly present — phone down, eyes engaged, mind focused — is the greatest gift you can give another person. In a world of constant distraction, presence has become the ultimate expression of love.' },
  { week: 11, category: 'intimacy', title: 'Emotional Attunement', source: 'Sue Johnson, PhD', summary: 'Emotional attunement means sensing what your partner feels and responding with care. It is the opposite of the emotional numbness that pornography creates. Recovery restores this capacity.' },
  { week: 11, category: 'intimacy', title: 'Dating Yourself First', summary: 'Before you can be a great partner, you must be comfortable with yourself. Take yourself on "dates" — do things alone that you enjoy. Self-sufficiency makes you more attractive and less needy.' },
  { week: 11, category: 'intimacy', title: 'The Transition from Limerence to Love', summary: 'The initial "high" of new relationships (limerence) naturally fades after 6-18 months. Mature love — built on choice, commitment, and daily care — is deeper and more satisfying than the initial rush.' },
  { week: 11, category: 'intimacy', title: 'Expressing Needs Without Criticism', summary: 'Use "I feel... when... because... I need..." instead of "You always/never." This nonviolent communication formula expresses needs without triggering defensiveness in your partner.' },

  { week: 11, category: 'wisdom', title: 'On Habits', source: 'Fyodor Dostoevsky', summary: 'The second half of a man\'s life is made up of nothing but the habits he has acquired during the first half.', link: 'You are in the process of rewriting your habits. The second half of your story starts with the choices you make now.' },
  { week: 11, category: 'wisdom', title: 'On Pain', source: 'Haruki Murakami', summary: 'Pain is inevitable. Suffering is optional.', link: 'You cannot avoid discomfort. But you can choose not to compound it with shame, self-pity, or relapse. Feel the pain, then let it pass.' },
  { week: 11, category: 'wisdom', title: 'On Brotherhood', source: 'African Proverb', summary: 'If you want to go fast, go alone. If you want to go far, go together.', link: 'This community exists because recovery is a team sport. Lean on others. Let others lean on you.' },
  { week: 11, category: 'wisdom', title: 'On Responsibility', source: 'Jean-Paul Sartre', summary: 'Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.', link: 'You are fully responsible for your choices. That is not a burden — it is power. Own it completely.' },
  { week: 11, category: 'wisdom', title: 'On Excellence', source: 'Vince Lombardi', summary: 'Perfection is not attainable, but if we chase perfection, we can catch excellence.', link: 'A perfect streak is not the goal. An excellent life is. Focus on excellence, not perfection.' },

  // ===== WEEK 12 =====
  { week: 12, category: 'studies', title: 'Three Months: A Critical Milestone', source: 'Journal of Behavioral Addictions, 2019', summary: 'Research shows that 90 days is a neurological milestone. Dopamine receptor density approaches baseline levels, cravings significantly decrease, and executive function shows marked improvement at this point.' },
  { week: 12, category: 'studies', title: 'Pornography and Emotional Regulation', source: 'Journal of Sex Research, 2018', summary: 'Users reported using pornography as a primary emotion regulation strategy — to manage stress, boredom, anxiety, and sadness. Developing alternative coping skills is essential for long-term recovery.' },
  { week: 12, category: 'studies', title: 'Social Media as a Gateway', source: 'Cyberpsychology, Behavior, 2020', summary: 'Research identified social media platforms as a major gateway to pornography relapse, with algorithmically served suggestive content triggering craving responses. Content filtering reduces this risk.' },
  { week: 12, category: 'studies', title: 'Pornography and Risk-Taking Behavior', source: 'Journal of Behavioral Decision Making, 2017', summary: 'Pornography viewing increased general risk-taking behavior, not just sexual risk-taking. The impaired prefrontal function from chronic use affects judgment across all domains.' },
  { week: 12, category: 'studies', title: 'The Power of Implementation Intentions', source: 'British Journal of Health Psychology, 2002', summary: 'Creating specific "if-then" plans (e.g., "If I feel an urge at night, then I will do 20 push-ups") increased follow-through from 34% to 91%. Specificity turns intention into action.' },

  { week: 12, category: 'testosterone', title: 'DHEA: The Precursor Hormone', summary: 'DHEA is a precursor to both testosterone and estrogen. It peaks in your mid-20s and declines 2% per year. Lifestyle factors that support DHEA include adequate sleep, stress management, and regular exercise.' },
  { week: 12, category: 'testosterone', title: 'The Three-Month Hormonal Checkpoint', summary: 'At 12 weeks of recovery, testosterone levels have typically stabilized significantly. Many men report clearer skin, improved body composition, deeper voice, and increased facial hair growth around this milestone.' },
  { week: 12, category: 'testosterone', title: 'Nettle Root and Free Testosterone', summary: 'Stinging nettle root binds to SHBG (sex hormone-binding globulin), freeing up more testosterone to be biologically active. It is one of the most well-researched natural testosterone support compounds.' },
  { week: 12, category: 'testosterone', title: 'Heat Therapy: Hot-Cold Contrast', summary: 'Alternating between hot sauna and cold plunge creates a hormetic stress response that strengthens the cardiovascular system, reduces inflammation, and may optimize the HPG axis for testosterone production.' },
  { week: 12, category: 'testosterone', title: 'Socializing and Testosterone', summary: 'Positive social interactions — laughing with friends, engaging in group activities, team sports — naturally increase testosterone. Isolation, by contrast, lowers it. Community is hormonal medicine.' },

  { week: 12, category: 'intimacy', title: 'Earned Secure Attachment', source: 'Daniel Siegel, MD', summary: 'Even if you grew up with insecure attachment, you can develop "earned security" through self-awareness, therapy, and healthy relationships. Your attachment style is not your destiny.' },
  { week: 12, category: 'intimacy', title: 'The Power of Saying "Tell Me More"', summary: 'Three words that can transform any conversation: "Tell me more." This simple phrase communicates genuine interest, creates space for deeper sharing, and is the key to emotional intimacy.' },
  { week: 12, category: 'intimacy', title: 'Rebuilding After Betrayal', source: 'Journal of Marital and Family Therapy, 2018', summary: 'Couples who successfully rebuild after betrayal report even stronger relationships than before. The process requires honesty, accountability, patience, and professional support.' },
  { week: 12, category: 'intimacy', title: 'Foreplay Starts Outside the Bedroom', summary: 'Emotional foreplay — kindness throughout the day, thoughtful gestures, genuine conversation — creates the safety and desire that lead to fulfilling physical intimacy. It is a 24-hour practice.' },
  { week: 12, category: 'intimacy', title: 'The Courage to Be Seen', source: 'Brené Brown', summary: 'True belonging only happens when we present our authentic, imperfect selves to the world. Hiding behind pornography is the opposite of this courage. Recovery is the path to being truly seen.' },

  { week: 12, category: 'wisdom', title: 'On Achievement', source: 'Muhammad Ali', summary: 'I hated every minute of training, but I said, don\'t quit. Suffer now and live the rest of your life as a champion.', link: 'Twelve weeks. A quarter of the way. The suffering of discipline now creates the life of a champion later.' },
  { week: 12, category: 'wisdom', title: 'On Reinvention', source: 'Alan Watts', summary: 'The only way to make sense out of change is to plunge into it, move with it, and join the dance.', link: 'You are not losing something. You are becoming something new. Dance with the change instead of fighting it.' },
  { week: 12, category: 'wisdom', title: 'On Desire', source: 'Buddha', summary: 'Attachment is the root of all suffering.', link: 'The attachment to instant gratification is the source of your struggle. Releasing that attachment is the path to freedom.' },
  { week: 12, category: 'wisdom', title: 'On Preparation', source: 'Abraham Lincoln', summary: 'Give me six hours to chop down a tree and I will spend the first four sharpening the axe.', link: 'Preparation prevents relapse. Set up your environment, plan your responses, build your support system before the urge hits.' },
  { week: 12, category: 'wisdom', title: 'On Victory', source: 'Lao Tzu', summary: 'Mastering others is strength. Mastering yourself is true power.', link: 'Three months of self-mastery. You are building the rarest and most valuable form of power there is.' },

  // ===== WEEK 13 =====
  { week: 13, category: 'studies', title: 'Pornography and Occupational Performance', source: 'Journal of Behavioral Addictions, 2018', summary: 'Workers who used pornography during work hours showed decreased productivity, increased absenteeism, and higher likelihood of workplace misconduct. Recovery improves professional performance across all metrics.' },
  { week: 13, category: 'studies', title: 'The Neuroscience of Willpower', source: 'Annual Review of Neuroscience, 2015', summary: 'Willpower is a limited resource managed by the prefrontal cortex. It fatigues with use throughout the day. Structuring your environment to minimize temptation preserves willpower for when you truly need it.' },
  { week: 13, category: 'studies', title: 'Gratitude Journaling and Addiction Recovery', source: 'Journal of Substance Abuse Treatment, 2017', summary: 'Daily gratitude journaling for 8 weeks significantly reduced cravings and improved emotional well-being in addiction recovery programs. The practice shifts neural focus from lack to abundance.' },
  { week: 13, category: 'studies', title: 'Sleep Deprivation and Impulse Control', source: 'Sleep, 2011', summary: 'Just one night of poor sleep reduces prefrontal cortex function by 60%, dramatically increasing impulsive behavior. Protecting your sleep is one of the most important relapse prevention strategies.' },
  { week: 13, category: 'studies', title: 'The Upward Spiral of Behavioral Change', source: 'Frontiers in Psychology, 2020', summary: 'Positive behavioral changes create upward spirals — quitting pornography improves sleep, which improves mood, which improves relationships, which strengthens motivation to maintain abstinence.' },

  { week: 13, category: 'testosterone', title: 'Pine Pollen and Phyto-Androgens', summary: 'Pine pollen contains plant-based analogs of testosterone and DHEA. While human research is limited, it has been used in Traditional Chinese Medicine for vitality for thousands of years.' },
  { week: 13, category: 'testosterone', title: 'Grip Strength as Testosterone Marker', source: 'Journal of Strength and Conditioning Research, 2011', summary: 'Grip strength is positively correlated with testosterone levels and is a reliable marker of overall health. Training grip through dead hangs, farmer walks, and thick-bar training supports hormonal health.' },
  { week: 13, category: 'testosterone', title: 'Limiting EMF Exposure', summary: 'Some research suggests that prolonged EMF exposure from phones in pockets may affect testicular function. While evidence is mixed, keeping phones away from reproductive organs is a simple precaution.' },
  { week: 13, category: 'testosterone', title: 'The Recovery Day Protocol', summary: 'Active recovery — light walking, stretching, foam rolling, cold exposure — on rest days supports muscle repair and hormonal recovery better than complete inactivity. Movement aids recovery.' },
  { week: 13, category: 'testosterone', title: 'Quarter-Year Hormonal Progress', summary: 'At 13 weeks, the hormonal benefits of recovery are well-established. Consistent energy throughout the day, improved morning drive, better workout performance, and stabilized mood are all signs of hormonal optimization.' },

  { week: 13, category: 'intimacy', title: 'Conflict as Opportunity', source: 'Terry Real', summary: 'Every conflict is an opportunity for deeper understanding and connection. Avoiding conflict through pornography or withdrawal actually prevents the growth that disagreements can catalyze.' },
  { week: 13, category: 'intimacy', title: 'The Role of Novelty in Long-Term Relationships', summary: 'Research shows that trying new activities together activates the same dopamine pathways as early-stage romance. Adventure and novelty keep long-term relationships exciting without artificial stimulation.' },
  { week: 13, category: 'intimacy', title: 'Compassion Meditation for Relationships', source: 'Emotion, 2013', summary: 'Loving-kindness meditation increased feelings of social connection and positivity toward others within just 7 minutes of practice. Regular practice builds the empathy and warmth essential for intimacy.' },
  { week: 13, category: 'intimacy', title: 'Pillow Talk and Bonding', summary: 'Post-intimacy conversation — sharing thoughts, feelings, and vulnerabilities — extends the oxytocin release and deepens the bonding experience. This window of openness is precious for connection.' },
  { week: 13, category: 'intimacy', title: 'Your Relationship With Yourself', summary: 'The relationship you have with yourself sets the template for all other relationships. Self-compassion, self-respect, and self-care are not selfish — they are prerequisites for healthy intimacy.' },

  { week: 13, category: 'wisdom', title: 'On Seasons', source: 'Ecclesiastes', summary: 'To everything there is a season, and a time to every purpose under heaven.', link: 'This season of recovery has its own purpose. Embrace it fully. It will not last forever, but its effects will.' },
  { week: 13, category: 'wisdom', title: 'On Small Things', source: 'Mother Teresa', summary: 'Not all of us can do great things. But we can do small things with great love.', link: 'Recovery is built from small moments of choice, done with great intention. Every small victory matters.' },
  { week: 13, category: 'wisdom', title: 'On the Mind', source: 'Buddha', summary: 'The mind is everything. What you think you become.', link: 'Your thoughts shape your reality. Choose them carefully. You are becoming what you think about most.' },
  { week: 13, category: 'wisdom', title: 'On Courage', source: 'Mary Anne Radmacher', summary: 'Courage doesn\'t always roar. Sometimes courage is the quiet voice at the end of the day saying, I will try again tomorrow.', link: 'Some days, courage is simply going to bed clean and deciding to do it again tomorrow.' },
  { week: 13, category: 'wisdom', title: 'On Change', source: 'Mahatma Gandhi', summary: 'Be the change you wish to see in the world.', link: 'By reclaiming yourself, you are changing the world around you. Your transformation ripples outward to everyone you touch.' },


  // ===== WEEK 14 =====
  { week: 14, category: 'studies', title: 'Pornography and Partner Phubbing', source: 'Computers in Human Behavior, 2020', summary: 'Pornography users were more likely to engage in "phubbing" — ignoring their partner in favor of phone use — which significantly predicted lower relationship satisfaction and increased conflict.' },
  { week: 14, category: 'studies', title: 'Sexual Conditioning Through Pornography', source: 'Archives of Sexual Behavior, 2015', summary: 'The brain becomes sexually conditioned to associate arousal with screens, novelty, and voyeurism rather than real-partner cues. This conditioning is reversible through sustained abstinence and real-world exposure.' },
  { week: 14, category: 'studies', title: 'Nature Deficit Disorder and Addiction', source: 'International Journal of Environmental Research, 2018', summary: 'Reduced nature exposure is correlated with increased screen addiction, including pornography. Nature provides restorative cognitive benefits that directly counteract addiction-related brain changes.' },
  { week: 14, category: 'studies', title: 'Pornography and Infidelity Risk', source: 'Journal of Family Psychology, 2017', summary: 'Pornography use doubled the likelihood of infidelity in committed relationships. The mechanism involves normalized novelty-seeking and decreased commitment to the existing partnership.' },
  { week: 14, category: 'studies', title: 'Heart Rate Variability and Self-Regulation', source: 'Psychological Science, 2007', summary: 'Higher heart rate variability (HRV) predicts better self-regulation and resistance to temptation. HRV improves with exercise, meditation, and sleep — all components of a strong recovery program.' },

  { week: 14, category: 'testosterone', title: 'Tribulus Terrestris: Myth vs. Reality', summary: 'Despite marketing claims, research on Tribulus shows inconsistent effects on testosterone in healthy men. However, it may improve libido through other mechanisms. Evidence-based approaches remain more reliable.' },
  { week: 14, category: 'testosterone', title: 'Eccentric Training for Hormonal Response', summary: 'Emphasizing the lowering (eccentric) phase of lifts creates more muscle damage and a stronger hormonal response. Slow, controlled negatives (3-4 seconds) maximize testosterone and growth hormone release.' },
  { week: 14, category: 'testosterone', title: 'Optimizing Pre-Workout Nutrition', summary: 'A small meal with protein and carbs 60-90 minutes before training provides fuel for performance without blunting the growth hormone response. Fasted training may spike cortisol and suppress testosterone.' },
  { week: 14, category: 'testosterone', title: 'The Role of Cholesterol', summary: 'Testosterone is literally made from cholesterol. Very low-fat diets consistently show reduced testosterone levels. Include adequate dietary cholesterol from eggs, shellfish, and quality meats.' },
  { week: 14, category: 'testosterone', title: 'Laughter and Hormones', source: 'Alternative Therapies in Health and Medicine, 2003', summary: 'Genuine laughter decreased cortisol by 39% and increased endorphins significantly. A good sense of humor is not just social — it is hormonal medicine.' },

  { week: 14, category: 'intimacy', title: 'Stonewalling and Its Antidotes', source: 'John Gottman, PhD', summary: 'Stonewalling — shutting down during conflict — is the most damaging relationship behavior. Pornography use often trains this response. The antidote is self-soothing and then re-engaging with your partner.' },
  { week: 14, category: 'intimacy', title: 'The Importance of Rupture and Repair', source: 'Ed Tronick, PhD', summary: 'In healthy relationships, disconnections (ruptures) happen naturally and frequently. What matters is not avoiding rupture but reliably repairing it. Repair builds trust more than perfect harmony.' },
  { week: 14, category: 'intimacy', title: 'Holding Space for Your Partner', summary: 'Holding space means being present with someone without trying to fix, advise, or redirect their experience. Sometimes your partner just needs you to witness their emotions without judgment.' },
  { week: 14, category: 'intimacy', title: 'Physical Intimacy Milestones in Recovery', summary: 'Week 2-4: Flatline possible. Month 2-3: Sensitivity returning. Month 4-6: Natural arousal patterns emerge. Month 6+: Full sexual responsiveness. Every timeline is individual — don\'t rush the process.' },
  { week: 14, category: 'intimacy', title: 'Choosing Your Partner Daily', summary: 'Long-term love is not a feeling — it is a daily choice. Choosing your partner every morning, despite imperfections, is the most powerful act of love there is.' },

  { week: 14, category: 'wisdom', title: 'On Discipline', source: 'Jim Rohn', summary: 'We must all suffer one of two things: the pain of discipline or the pain of regret.', link: 'The pain of discipline is momentary. The pain of regret lingers. Choose your pain wisely.' },
  { week: 14, category: 'wisdom', title: 'On Strength Through Adversity', source: 'Nassim Nicholas Taleb', summary: 'Wind extinguishes a candle and energizes fire. You want to be the fire — to wish for the wind.', link: 'Let challenges strengthen you rather than defeat you. Become antifragile — growing stronger from stress, not weaker.' },
  { week: 14, category: 'wisdom', title: 'On Authenticity', source: 'Brené Brown', summary: 'Authenticity is a collection of choices that we have to make every day.', link: 'Living without pornography is living authentically. Every day you choose truth over escape, you strengthen your authentic self.' },
  { week: 14, category: 'wisdom', title: 'On Direction', source: 'Lewis Carroll', summary: 'If you don\'t know where you are going, any road will get you there.', link: 'Know your destination. Who do you want to be at day 365? Let that vision guide every choice along the way.' },
  { week: 14, category: 'wisdom', title: 'On the Present Moment', source: 'Lao Tzu', summary: 'If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.', link: 'Recovery happens in the present moment. Not yesterday\'s mistakes. Not tomorrow\'s worries. Right now.' },

  // ===== WEEK 15 =====
  { week: 15, category: 'studies', title: 'Pornography and Spiritual Well-Being', source: 'Journal for the Scientific Study of Religion, 2018', summary: 'Pornography use was associated with decreased spiritual well-being and sense of purpose across religious and non-religious participants alike. The effect is about meaning-making, not morality.' },
  { week: 15, category: 'studies', title: 'The Role of Dopamine Fasting', source: 'International Journal of Environmental Research, 2020', summary: 'Periodic reduction of high-stimulation activities (screens, sugar, social media) allows dopamine receptor upregulation, increasing sensitivity to natural pleasures and reducing cravings.' },
  { week: 15, category: 'studies', title: 'Pornography and Decision Fatigue', source: 'Social Psychological and Personality Science, 2016', summary: 'The endless novelty and choice of internet pornography depletes decision-making capacity. This "decision fatigue" extends to other life areas, reducing ability to make healthy choices throughout the day.' },
  { week: 15, category: 'studies', title: 'The Zeigarnik Effect and Unfinished Goals', source: 'Journal of Personality and Social Psychology, 2011', summary: 'Incomplete goals occupy mental bandwidth (the Zeigarnik Effect). Pornography use creates perpetual incompletion, while recovery frees cognitive resources for meaningful goals.' },
  { week: 15, category: 'studies', title: 'Peer Support in Digital Recovery', source: 'Journal of Medical Internet Research, 2019', summary: 'Online peer support communities showed significant benefits for pornography recovery, including reduced shame, increased accountability, and higher sustained abstinence rates compared to solo efforts.' },

  { week: 15, category: 'testosterone', title: 'Saw Palmetto and Hormonal Balance', summary: 'Saw palmetto may inhibit 5-alpha reductase, the enzyme that converts testosterone to DHT. While this could benefit those with excess DHT symptoms, those seeking to maximize testosterone should be cautious.' },
  { week: 15, category: 'testosterone', title: 'The Benefits of Morning Training', summary: 'Training in the morning capitalizes on naturally elevated testosterone and cortisol levels. Morning exercise also sets a positive hormonal cascade that benefits the entire day.' },
  { week: 15, category: 'testosterone', title: 'Avoiding Soy: Context Matters', summary: 'The soy-testosterone concern is largely overstated. Moderate soy intake has minimal hormonal effects in men. However, highly processed soy protein isolates may have different effects than whole soy foods.' },
  { week: 15, category: 'testosterone', title: 'Testosterone and Music', source: 'Psychoneuroendocrinology, 2012', summary: 'Listening to music you enjoy increases testosterone and decreases cortisol. High-energy, motivational music during workouts amplifies both performance and hormonal response.' },
  { week: 15, category: 'testosterone', title: 'Mind-Muscle Connection', summary: 'Mentally focusing on the muscle being trained increases muscle activation by up to 22%. This enhanced activation creates a stronger growth stimulus and potentially greater hormonal response per exercise.' },

  { week: 15, category: 'intimacy', title: 'Interdependence vs. Codependence', summary: 'Healthy intimacy is interdependent — two whole people choosing to share life. Codependence is two incomplete people clinging to each other. Recovery helps you become whole so you can be interdependent.' },
  { week: 15, category: 'intimacy', title: 'The Power of Nonverbal Communication', summary: '93% of communication is nonverbal — tone, facial expressions, body language, touch. Pornography is entirely visual; real intimacy involves the full spectrum of human communication.' },
  { week: 15, category: 'intimacy', title: 'Scheduling Intimacy', summary: 'Scheduling intimate time together is not unromantic — it is prioritizing your relationship. Spontaneity is overrated; intentionality is underrated. What you schedule, you protect.' },
  { week: 15, category: 'intimacy', title: 'The Stranger Effect', source: 'Self-Expansion Theory', summary: 'Research shows that novel, exciting shared experiences increase relationship satisfaction the same way new relationships do. You don\'t need a new partner — you need new experiences with your current one.' },
  { week: 15, category: 'intimacy', title: 'Accepting Imperfection in Partners', summary: 'No partner will match a pornographic fantasy, because fantasies are designed to be perfect. Real love means cherishing an imperfect person perfectly — finding beauty in reality, not imagination.' },

  { week: 15, category: 'wisdom', title: 'On Resilience', source: 'Japanese Proverb', summary: 'The bamboo that bends is stronger than the oak that resists.', link: 'Flexibility is strength. When an urge comes, don\'t fight it rigidly — bend with it, observe it, and let it pass through you.' },
  { week: 15, category: 'wisdom', title: 'On Worth', source: 'Wayne Dyer', summary: 'You cannot be lonely if you like the person you\'re alone with.', link: 'Learn to enjoy your own company. When you like yourself, you no longer need external validation or artificial stimulation.' },
  { week: 15, category: 'wisdom', title: 'On Commitment', source: 'W.H. Murray', summary: 'Until one is committed, there is hesitancy. The moment one definitely commits oneself, then Providence moves too.', link: 'Commit fully. Half-measures leave the door open for relapse. Burn the ships. There is no going back.' },
  { week: 15, category: 'wisdom', title: 'On Renewal', source: 'Heraclitus', summary: 'No man ever steps in the same river twice, for it is not the same river and he is not the same man.', link: 'You are not the same person who started this journey. Every day of recovery has changed you at a cellular level.' },
  { week: 15, category: 'wisdom', title: 'On Potential', source: 'Michelangelo', summary: 'I saw the angel in the marble and carved until I set him free.', link: 'Recovery is not adding something to yourself. It is removing what hides the best version of you that already exists within.' },

  // ===== WEEK 16 =====
  { week: 16, category: 'studies', title: 'Pornography and Financial Behavior', source: 'Journal of Consumer Psychology, 2018', summary: 'Pornography exposure increased impulsive spending and decreased savings behavior. The depleted self-control mechanism extends far beyond sexual decisions into everyday financial choices.' },
  { week: 16, category: 'studies', title: 'Neurological Recovery at Four Months', source: 'Biological Psychiatry, 2015', summary: 'Brain imaging studies show that at 16 weeks of abstinence, white matter integrity in the prefrontal cortex shows significant restoration, improving impulse control and decision-making capacity.' },
  { week: 16, category: 'studies', title: 'The Role of Journaling in Recovery', source: 'Advances in Psychiatric Treatment, 2005', summary: 'Expressive writing about emotional experiences produced significant psychological and physical health benefits. Journaling about recovery experiences enhances insight and reduces relapse risk.' },
  { week: 16, category: 'studies', title: 'Pornography and Sexism', source: 'Psychology of Women Quarterly, 2016', summary: 'Meta-analysis found that pornography consumption was significantly associated with attitudes supporting violence against women and increased acceptance of rape myths.' },
  { week: 16, category: 'studies', title: 'Flow States as Natural Highs', source: 'Frontiers in Psychology, 2017', summary: 'Flow states — complete immersion in a challenging activity — produce natural dopamine, norepinephrine, and endorphins. Developing flow-producing hobbies provides the "high" that recovery needs without the damage.' },

  { week: 16, category: 'testosterone', title: 'Ginger and Testosterone', source: 'Biomolecules, 2018', summary: 'Meta-analysis found that ginger supplementation significantly increased testosterone levels. The mechanism involves improved antioxidant defense in the testes and enhanced LH signaling.' },
  { week: 16, category: 'testosterone', title: 'Plyometric Training', summary: 'Explosive movements — box jumps, jump squats, medicine ball throws — produce a strong acute testosterone response by recruiting fast-twitch muscle fibers. Add 2-3 plyometric exercises to your routine.' },
  { week: 16, category: 'testosterone', title: 'Sleep Apnea and Testosterone', source: 'Journal of Clinical Endocrinology & Metabolism, 2002', summary: 'Untreated sleep apnea can reduce testosterone by 50%. If you snore heavily, wake tired, or experience daytime sleepiness despite adequate sleep hours, get evaluated for sleep apnea.' },
  { week: 16, category: 'testosterone', title: 'The Farmer Walk Effect', summary: 'Carrying heavy weights while walking (farmer walks) creates a unique full-body stimulus that elevates testosterone, builds grip strength, and develops functional core stability simultaneously.' },
  { week: 16, category: 'testosterone', title: 'Pomegranate and Hormonal Health', source: 'Endocrine Abstracts, 2012', summary: 'Daily pomegranate juice consumption for two weeks increased salivary testosterone by 24% on average while improving mood and reducing blood pressure.' },

  { week: 16, category: 'intimacy', title: 'Emotional Bids at Different Life Stages', summary: 'As relationships mature, bids for connection become more subtle — a glance, a sigh, a shifted posture. Learning to read and respond to these subtle bids is the mark of a deeply attuned partner.' },
  { week: 16, category: 'intimacy', title: 'The Impact of Shared Vulnerability', summary: 'When both partners share vulnerabilities, it creates a reciprocal deepening effect. Mutual vulnerability builds connection exponentially faster than one-sided sharing.' },
  { week: 16, category: 'intimacy', title: 'Touch Deprivation and Its Effects', source: 'Developmental Review, 2014', summary: 'Humans need regular physical contact for emotional well-being. Touch deprivation increases cortisol, decreases oxytocin, and worsens depression. Recovery opens you to receiving healthy touch again.' },
  { week: 16, category: 'intimacy', title: 'Creating Emotional Safety', summary: 'Emotional safety means your partner can share anything without fear of judgment, punishment, or withdrawal. Creating this safety is the single most important thing you can do for your relationship.' },
  { week: 16, category: 'intimacy', title: 'The Map of Your Partner\'s World', source: 'Seven Principles, Gottman', summary: 'Do you know your partner\'s best friend, biggest fear, current stressor, and lifelong dream? These "love maps" — detailed knowledge of your partner\'s inner world — are the foundation of lasting love.' },

  { week: 16, category: 'wisdom', title: 'On Gratitude', source: 'Cicero', summary: 'Gratitude is not only the greatest of virtues, but the parent of all others.', link: 'Cultivate gratitude for your recovery. For your strength. For every clean day. Gratitude transforms perspective.' },
  { week: 16, category: 'wisdom', title: 'On Focus', source: 'Steve Jobs', summary: 'People think focus means saying yes to the thing you\'ve got to focus on. But that\'s not what it means at all. It means saying no to the hundred other good things that there are.', link: 'Recovery is focus. It is saying no to momentary pleasure so you can say yes to lasting transformation.' },
  { week: 16, category: 'wisdom', title: 'On Contentment', source: 'Epictetus', summary: 'Wealth consists not in having great possessions, but in having few wants.', link: 'Freedom is found not in getting more but in wanting less. Learn contentment, and cravings lose their power.' },
  { week: 16, category: 'wisdom', title: 'On Daily Renewal', source: 'Marcus Aurelius', summary: 'When you arise in the morning, think of what a privilege it is to be alive — to think, to enjoy, to love.', link: 'Each morning is a fresh start. Yesterday\'s struggles are over. Today\'s victories are waiting. What a privilege.' },
  { week: 16, category: 'wisdom', title: 'On Inner Strength', source: 'David Goggins', summary: 'You are in danger of living a life so comfortable and soft that you will die without ever realizing your potential.', link: 'Comfort is the enemy of growth. The discomfort of recovery is building a version of you that the comfortable path never could.' },

  // ===== WEEK 17 =====
  { week: 17, category: 'studies', title: 'Pornography and Numbing of Negative Emotions', source: 'Sexual Addiction & Compulsivity, 2018', summary: 'Pornography users reported using it specifically to numb negative emotions — functioning as a digital anesthetic. This emotional avoidance prevents processing and perpetuates psychological distress.' },
  { week: 17, category: 'studies', title: 'The Compulsive Sexual Behavior Disorder Diagnosis', source: 'World Health Organization, 2019', summary: 'The WHO added Compulsive Sexual Behavior Disorder to ICD-11, officially recognizing that compulsive pornography use causes clinically significant distress and functional impairment.' },
  { week: 17, category: 'studies', title: 'Cold Turkey vs. Gradual Reduction', source: 'Journal of Consulting and Clinical Psychology, 2016', summary: 'Research on behavioral addictions shows that complete cessation is generally more effective than gradual reduction. The clarity of an absolute commitment removes the cognitive burden of moderation decisions.' },
  { week: 17, category: 'studies', title: 'Emotional Granularity and Addiction', source: 'Emotion, 2019', summary: 'People who can identify and label specific emotions (high emotional granularity) are less likely to use addictive behaviors as coping mechanisms. Expanding your emotional vocabulary supports recovery.' },
  { week: 17, category: 'studies', title: 'Pornography Literacy Programs', source: 'Journal of Sex Education, 2020', summary: 'Educational programs that increase understanding of pornography\'s production, effects, and unrealistic portrayals significantly reduce its appeal and consumption rates.' },

  { week: 17, category: 'testosterone', title: 'The Benefits of Walking', summary: 'A daily 30-minute walk reduces cortisol, improves insulin sensitivity, and supports testosterone production without the stress of intense exercise. Walking is the most underrated hormonal optimization tool.' },
  { week: 17, category: 'testosterone', title: 'Shilajit: Ancient Mineral Pitch', source: 'Andrologia, 2016', summary: 'Purified shilajit supplementation for 90 days increased total testosterone by 23.5% and free testosterone by 19.1% in healthy men aged 45-55.' },
  { week: 17, category: 'testosterone', title: 'The Impact of Artificial Light', summary: 'Artificial blue light after sunset suppresses melatonin by 50-90%, disrupting sleep architecture and consequently testosterone production. Use blue-light blocking glasses or night mode after dark.' },
  { week: 17, category: 'testosterone', title: 'Testosterone and Bone Density', summary: 'Healthy testosterone levels are essential for maintaining bone density. Weight-bearing exercise and adequate calcium and vitamin D intake work synergistically with testosterone for skeletal health.' },
  { week: 17, category: 'testosterone', title: 'Nose Breathing and Performance', summary: 'Nose breathing during exercise increases nitric oxide production by 6x compared to mouth breathing. Nitric oxide improves blood flow, oxygen delivery, and may support testosterone production.' },

  { week: 17, category: 'intimacy', title: 'The Slow Build of Deep Connection', summary: 'Deep connection is not built in dramatic moments but in thousands of small ones. Making coffee for your partner. Asking about their day. Remembering their concerns. Love is in the details.' },
  { week: 17, category: 'intimacy', title: 'Setting Relationship Goals Together', summary: 'Couples who set shared goals — financial, travel, fitness, personal growth — report higher satisfaction. Having something to build together creates partnership and mutual investment.' },
  { week: 17, category: 'intimacy', title: 'The Healing Power of Physical Proximity', summary: 'Simply being in the same room as someone you trust reduces stress hormones. Physical proximity, even without touch, creates a sense of safety through co-regulation of the nervous system.' },
  { week: 17, category: 'intimacy', title: 'Understanding Consent as Connection', summary: 'Real consent is not just the absence of "no" — it is enthusiastic, ongoing, and mutual. Understanding consent at this deep level transforms physical intimacy from an act into a conversation.' },
  { week: 17, category: 'intimacy', title: 'Emotional Flooding First Aid', summary: 'When emotionally overwhelmed: 1) Name the emotion. 2) Take 5 slow breaths. 3) Place feet flat on floor. 4) Describe 5 things you can see. This grounds your nervous system in under 2 minutes.' },

  { week: 17, category: 'wisdom', title: 'On Persistence', source: 'Thomas Edison', summary: 'Many of life\'s failures are people who did not realize how close they were to success when they gave up.', link: 'You may be closer to a breakthrough than you realize. The moment you want to quit is often the moment right before transformation.' },
  { week: 17, category: 'wisdom', title: 'On Humility', source: 'C.S. Lewis', summary: 'Humility is not thinking less of yourself; it is thinking of yourself less.', link: 'The more you focus on serving others, contributing to your community, and building something meaningful, the less space urges occupy.' },
  { week: 17, category: 'wisdom', title: 'On Presence', source: 'Ram Dass', summary: 'Be here now.', link: 'Three words that contain the entire practice of recovery. Not in the past. Not in fantasy. Here. Now. Present.' },
  { week: 17, category: 'wisdom', title: 'On Power', source: 'Lao Tzu', summary: 'When I let go of what I am, I become what I might be.', link: 'Let go of the identity of someone struggling with addiction. Embrace the identity of someone who is free.' },
  { week: 17, category: 'wisdom', title: 'On Practice', source: 'Pele', summary: 'Everything is practice.', link: 'Every moment of every day is practice for who you are becoming. There are no days off from being yourself.' },

  // ===== WEEK 18 =====
  { week: 18, category: 'studies', title: 'Pornography and Attention Span', source: 'Journal of Sex Research, 2019', summary: 'Pornography use was associated with a 15-20% reduction in sustained attention capacity. The rapid-switching nature of internet pornography trains the brain for distraction rather than focus.' },
  { week: 18, category: 'studies', title: 'The Reward Contrast Effect', source: 'Behavioral Neuroscience, 2017', summary: 'After experiencing supranormal rewards (pornography), normal rewards feel diminished by contrast. This neurological contrast effect takes approximately 3-6 months to fully reverse.' },
  { week: 18, category: 'studies', title: 'Exercise Intensity and Craving Reduction', source: 'Psychopharmacology, 2018', summary: 'Moderate-to-vigorous exercise reduced cravings by 50% for up to 2 hours post-exercise. The effect was strongest with 20-30 minutes of aerobic activity at 70-80% heart rate max.' },
  { week: 18, category: 'studies', title: 'Self-Compassion vs. Self-Criticism in Recovery', source: 'Clinical Psychology Review, 2019', summary: 'Self-compassion after a lapse reduced the likelihood of a full relapse by 40% compared to self-criticism. Shame spirals trigger the very behavior they seek to prevent.' },
  { week: 18, category: 'studies', title: 'The Benefits of Boredom', source: 'Creativity Research Journal, 2014', summary: 'Boredom, when tolerated rather than medicated, stimulates creative thinking and self-reflection. The discomfort of boredom is the brain\'s signal to create, not to consume.' },

  { week: 18, category: 'testosterone', title: 'Maca Root and Sexual Function', source: 'BMC Complementary and Alternative Medicine, 2010', summary: 'Maca root supplementation improved sexual desire and function without directly affecting testosterone levels. It appears to work through the endocannabinoid system rather than the endocrine system.' },
  { week: 18, category: 'testosterone', title: 'Cluster Set Training', summary: 'Breaking sets into smaller clusters with brief intra-set rest (15-30 seconds) allows heavier loads and greater total volume, producing a superior testosterone response compared to traditional sets.' },
  { week: 18, category: 'testosterone', title: 'The Thyroid-Testosterone Connection', summary: 'Thyroid hormones regulate metabolism and influence testosterone production. Supporting thyroid health through adequate iodine (seaweed, fish), selenium, and zinc indirectly supports testosterone.' },
  { week: 18, category: 'testosterone', title: 'Emotional Eating and Hormones', summary: 'Stress-induced eating of high-sugar, high-fat foods spikes insulin and cortisol while suppressing testosterone. Breaking the emotional eating pattern is a key part of hormonal optimization.' },
  { week: 18, category: 'testosterone', title: 'Four-Month Recovery Assessment', summary: 'At 18 weeks, you are beyond most testosterone recovery timelines. Your baseline hormonal state is now significantly improved. The benefits compound from here — the best is still ahead.' },

  { week: 18, category: 'intimacy', title: 'Love as a Verb', summary: 'Love is not something that happens to you — it is something you do. Daily acts of love — cooking a meal, writing a note, offering a massage — create the relationship you want.' },
  { week: 18, category: 'intimacy', title: 'The Relationship Check-In', summary: 'Weekly 20-minute relationship check-ins (What went well? What could improve? What do you need?) prevent small issues from becoming major problems. Prevention is easier than repair.' },
  { week: 18, category: 'intimacy', title: 'Understanding Your Partner\'s Stress Response', summary: 'Some people need space when stressed; others need closeness. Understanding and respecting your partner\'s stress style prevents misinterpreting their needs as rejection or neediness.' },
  { week: 18, category: 'intimacy', title: 'The Myth of Compatibility', summary: 'Research shows that compatibility is less important than how couples handle incompatibility. Every couple has perpetual problems. Masters of relationships learn to dialogue with these issues rather than solve them.' },
  { week: 18, category: 'intimacy', title: 'Creating a Culture of Appreciation', summary: 'In thriving relationships, appreciation is expressed regularly and specifically. Not just "you\'re great" but "I noticed how you handled that situation, and I admire your patience."' },

  { week: 18, category: 'wisdom', title: 'On Warrior Spirit', source: 'Miyamoto Musashi', summary: 'There is nothing outside of yourself that can ever enable you to get better, stronger, richer, quicker, or smarter. Everything is within.', link: 'Stop looking for external solutions. The strength you need is already within you. Tap into it.' },
  { week: 18, category: 'wisdom', title: 'On Detachment', source: 'Epictetus', summary: 'It\'s not what happens to you, but how you react to it that matters.', link: 'You cannot control urges. You can control your response. That response is everything.' },
  { week: 18, category: 'wisdom', title: 'On Service', source: 'Albert Einstein', summary: 'Only a life lived for others is a life worthwhile.', link: 'Redirect the energy you once wasted into serving others. Mentoring, volunteering, supporting — service fills the void that addiction left.' },
  { week: 18, category: 'wisdom', title: 'On Simplicity', source: 'Henry David Thoreau', summary: 'Our life is frittered away by detail. Simplify, simplify.', link: 'Simplify your life. Fewer screens, fewer distractions, fewer commitments. Create space for what truly matters.' },
  { week: 18, category: 'wisdom', title: 'On Growth', source: 'John Maxwell', summary: 'Change is inevitable. Growth is optional.', link: 'Recovery has changed you. But growth — intentional, directed transformation — that is your choice. Choose growth.' },

  // ===== WEEK 19 =====
  { week: 19, category: 'studies', title: 'Early Exposure and Long-Term Effects', source: 'Journal of Adolescent Health, 2019', summary: 'Average age of first pornography exposure is 12. Early exposure during critical brain development periods creates deeper neural pathways that require more time and effort to rewire.' },
  { week: 19, category: 'studies', title: 'Pornography and Attachment to Parents', source: 'Journal of Youth and Adolescence, 2018', summary: 'Adolescent pornography use was associated with weaker parent-child attachment and poorer family communication, creating vulnerability to using pornography as an emotional substitute.' },
  { week: 19, category: 'studies', title: 'Digital Citizenship and Self-Regulation', source: 'Computers in Human Behavior, 2019', summary: 'Teaching digital self-regulation skills — awareness of triggers, time management, intentional use — significantly reduced problematic internet behaviors including pornography consumption.' },
  { week: 19, category: 'studies', title: 'Protective Factors Against Pornography Addiction', source: 'Archives of Sexual Behavior, 2017', summary: 'Key protective factors include strong social connections, engaging hobbies, physical activity, emotional intelligence, and a sense of purpose. Building these factors is proactive relapse prevention.' },
  { week: 19, category: 'studies', title: 'The Generation Effect in Memory', source: 'Cognitive Psychology, 2019', summary: 'Information generated through personal effort is remembered better than passively consumed information. Applied to recovery: insights you discover yourself through reflection are more powerful than advice.' },

  { week: 19, category: 'testosterone', title: 'Vitamin B6 and Testosterone', summary: 'Vitamin B6 plays a crucial role in testosterone production by stimulating androgen receptors and reducing estrogen levels. Found in poultry, fish, potatoes, chickpeas, and bananas.' },
  { week: 19, category: 'testosterone', title: 'The Wim Hof Method', summary: 'Cold exposure combined with specific breathing techniques (Wim Hof Method) has been shown to improve hormonal balance, reduce inflammation, and strengthen the immune system in clinical studies.' },
  { week: 19, category: 'testosterone', title: 'Testosterone and Skin Health', summary: 'Optimal testosterone levels support collagen production, skin thickness, and sebum regulation. Many men report clearer, healthier-looking skin as a visible marker of hormonal recovery.' },
  { week: 19, category: 'testosterone', title: 'Loaded Carries for Full-Body Hormonal Response', summary: 'Walking with heavy weights (suitcase carry, overhead carry, yoke walk) engages the entire kinetic chain and produces a strong hormonal response similar to squats and deadlifts.' },
  { week: 19, category: 'testosterone', title: 'Red Light Therapy Research', source: 'In Vivo, 2016', summary: 'Preliminary research suggests that red and near-infrared light therapy on the testes may increase testosterone production through enhanced mitochondrial function. Research is early but promising.' },

  { week: 19, category: 'intimacy', title: 'The Five Stages of Intimacy', summary: 'Intimacy develops through stages: attraction, uncertainty, exclusivity, intimacy, and engagement. Pornography short-circuits this natural progression, jumping to simulated intimacy without building the foundation.' },
  { week: 19, category: 'intimacy', title: 'Navigating the Dating World During Recovery', summary: 'Dating during recovery is possible with transparency and boundaries. Be honest about where you are. Avoid relationships that trigger old patterns. Quality over quantity applies to dating too.' },
  { week: 19, category: 'intimacy', title: 'The Green Flags of Healthy Connection', summary: 'Green flags: feeling safe to be yourself, mutual respect, genuine interest in your growth, comfortable silence, natural reciprocity. These indicate a connection worth investing in.' },
  { week: 19, category: 'intimacy', title: 'Relearning Flirtation', summary: 'Healthy flirtation — playful eye contact, genuine compliments, humor, light touch — is a social skill that pornography atrophies. Practicing in low-stakes situations rebuilds this natural ability.' },
  { week: 19, category: 'intimacy', title: 'Self-Disclosure and Trust Building', source: 'Journal of Personality and Social Psychology, 1970', summary: 'Gradual, reciprocal self-disclosure is the primary mechanism through which trust and intimacy develop. Share appropriately, listen deeply, and let connection build naturally over time.' },

  { week: 19, category: 'wisdom', title: 'On Youth', source: 'George Bernard Shaw', summary: 'Youth is wasted on the young.', link: 'Don\'t waste another day. Whether you\'re 18 or 48, this is the youngest you\'ll ever be again. Start your best life now.' },
  { week: 19, category: 'wisdom', title: 'On Scars', source: 'Khalil Gibran', summary: 'Out of suffering have emerged the strongest souls.', link: 'Your scars tell a story of survival. They are not marks of weakness but badges of strength. Wear them with quiet pride.' },
  { week: 19, category: 'wisdom', title: 'On Patience', source: 'Rainer Maria Rilke', summary: 'Have patience with everything unresolved in your heart and try to love the questions themselves.', link: 'You don\'t need all the answers right now. Trust the process. Love the journey of becoming.' },
  { week: 19, category: 'wisdom', title: 'On Integrity', source: 'Warren Buffett', summary: 'It takes 20 years to build a reputation and five minutes to ruin it.', link: 'Protect what you\'re building. One moment of weakness can set back weeks of progress. Guard your integrity fiercely.' },
  { week: 19, category: 'wisdom', title: 'On Inner Peace', source: 'Marcus Aurelius', summary: 'Nowhere can man find a quieter or more untroubled retreat than in his own soul.', link: 'The peace you seek is not in the next dopamine hit. It is in the stillness within. Learn to access it.' },

  // ===== WEEK 20 =====
  { week: 20, category: 'studies', title: 'Pornography and Alexithymia', source: 'Journal of Sex Research, 2019', summary: 'Frequent pornography use was associated with alexithymia — difficulty identifying and expressing emotions. This emotional numbness impairs both personal well-being and relationship quality.' },
  { week: 20, category: 'studies', title: 'The Dual Control Model of Arousal', source: 'Annual Review of Sex Research, 2000', summary: 'Sexual response involves both excitation and inhibition systems. Pornography overstimulates the excitation system while weakening inhibition. Recovery rebalances this dual control mechanism.' },
  { week: 20, category: 'studies', title: 'Telomere Length and Addiction', source: 'Psychoneuroendocrinology, 2018', summary: 'Chronic stress from addiction shortens telomeres — the DNA caps that protect chromosomes. Shorter telomeres accelerate aging. Recovery and stress management help preserve telomere length.' },
  { week: 20, category: 'studies', title: 'The Five-Month Recovery Window', source: 'NeuroImage Clinical, 2017', summary: 'Brain imaging at 5 months of behavioral addiction recovery showed significant restoration of prefrontal gray matter volume and improved structural connectivity. You are literally rebuilding your brain.' },
  { week: 20, category: 'studies', title: 'Meaning in Life and Addiction Protection', source: 'Journal of Positive Psychology, 2019', summary: 'Having a strong sense of meaning and purpose was the most robust protective factor against all forms of addiction. Purpose gives you something bigger to choose over momentary impulses.' },

  { week: 20, category: 'testosterone', title: 'L-Carnitine and Androgen Receptors', source: 'Urology, 2004', summary: 'L-Carnitine supplementation increased androgen receptor density, making existing testosterone more effective. This may partially explain the "superpowers" reported during recovery without actual testosterone increases.' },
  { week: 20, category: 'testosterone', title: 'The Cold Thermogenesis Protocol', summary: 'Graduated cold exposure: Week 1 — cold finishes to showers. Week 2 — full cold showers. Week 3 — cold water face dunks. Week 4 — cold baths. This progressive approach builds cold tolerance and hormonal resilience.' },
  { week: 20, category: 'testosterone', title: 'Mushroom Supplements', summary: 'Cordyceps and lion\'s mane mushrooms support testosterone through different mechanisms — cordyceps via enhanced oxygen utilization and lion\'s mane through nerve growth factor production and cognitive enhancement.' },
  { week: 20, category: 'testosterone', title: 'The Deadlift: King of Testosterone Exercises', summary: 'The conventional deadlift engages more muscle mass than any other single exercise, producing the largest systemic hormonal response. Proper form is essential — never sacrifice technique for weight.' },
  { week: 20, category: 'testosterone', title: 'Testosterone and Voice Depth', summary: 'Many men in recovery report a deeper, more resonant voice. This is not imagined — testosterone influences vocal cord thickness and laryngeal muscle development, producing a measurably deeper tone.' },

  { week: 20, category: 'intimacy', title: 'The Art of Receiving', summary: 'Many men are comfortable giving but struggle to receive love, compliments, or help. Learning to receive gracefully is a form of vulnerability that deepens intimacy and honors your partner\'s desire to give.' },
  { week: 20, category: 'intimacy', title: 'Shared Silence and Comfort', summary: 'Being comfortable in silence with someone is a marker of deep connection. You don\'t need to fill every moment with words. Peaceful shared silence communicates: "I feel safe here with you."' },
  { week: 20, category: 'intimacy', title: 'The Role of Play in Adult Relationships', summary: 'Playfulness in adult relationships activates the same bonding neurochemistry as romantic love. Being silly, spontaneous, and fun together keeps relationships vibrant and connected.' },
  { week: 20, category: 'intimacy', title: 'When to Seek Professional Help', summary: 'If recovery is causing significant relationship strain, consider couples therapy. A trained therapist provides tools, perspective, and a safe space that friends and family cannot. Seeking help is strength.' },
  { week: 20, category: 'intimacy', title: 'Intimacy and Aging', summary: 'Sexual satisfaction can increase with age as couples develop deeper emotional bonds and communication skills. The best intimate relationships are often not the youngest ones but the most evolved ones.' },

  { week: 20, category: 'wisdom', title: 'On the Journey', source: 'Robert Frost', summary: 'Two roads diverged in a wood, and I — I took the one less traveled by, and that has made all the difference.', link: 'Recovery is the road less traveled. Most people choose comfort. You are choosing growth. That choice will define your life.' },
  { week: 20, category: 'wisdom', title: 'On Simplicity', source: 'Leonardo da Vinci', summary: 'Simplicity is the ultimate sophistication.', link: 'The simplest approach works best: don\'t use pornography today. Tomorrow, repeat. Sophistication is unnecessary. Simplicity is sufficient.' },
  { week: 20, category: 'wisdom', title: 'On Self-Control', source: 'Proverbs 25:28', summary: 'A man without self-control is like a city broken into and left without walls.', link: 'Self-control is your fortress. Every day you exercise it, the walls grow stronger. You are becoming impenetrable.' },
  { week: 20, category: 'wisdom', title: 'On Helping Others', source: 'Zig Ziglar', summary: 'You can have everything in life you want, if you will just help enough other people get what they want.', link: 'The further you progress in recovery, the more you can help others. Teaching what you\'ve learned solidifies your own transformation.' },
  { week: 20, category: 'wisdom', title: 'On the Half-Year Mark', summary: 'You are nearly at the halfway point of your journey. Reflect on how far you have come. The person you were on Day 1 would be amazed at who you are today.', link: 'Look back with pride. Look forward with confidence. You are doing this.' },

  // ===== WEEK 21 =====
  { week: 21, category: 'studies', title: 'Pornography and Dissociation', source: 'Journal of Trauma & Dissociation, 2018', summary: 'Compulsive pornography use was associated with dissociative experiences — feeling detached from yourself or reality. This numbing effect served as a coping mechanism for underlying emotional pain.' },
  { week: 21, category: 'studies', title: 'Neuroinflammation in Behavioral Addiction', source: 'Brain, Behavior, and Immunity, 2019', summary: 'Chronic behavioral addiction triggers neuroinflammation that impairs brain function. Anti-inflammatory lifestyle changes (exercise, diet, sleep) support both brain healing and recovery maintenance.' },
  { week: 21, category: 'studies', title: 'The Incubation of Craving', source: 'Neuroscience & Biobehavioral Reviews, 2016', summary: 'Cravings can temporarily intensify weeks or months into recovery — the "incubation of craving" effect. This is normal neurobiology, not failure. Being prepared for late-stage cravings prevents surprise relapses.' },
  { week: 21, category: 'studies', title: 'Cognitive Reappraisal for Urge Management', source: 'Cognitive, Affective, & Behavioral Neuroscience, 2018', summary: 'Reframing urges ("This craving means my brain is healing" instead of "I need relief") reduced craving intensity by 40%. How you interpret the urge determines its power over you.' },
  { week: 21, category: 'studies', title: 'Community and Brain Health', source: 'Trends in Cognitive Sciences, 2018', summary: 'Social connection stimulates BDNF (brain-derived neurotrophic factor), which promotes neuroplasticity and brain repair. Community involvement literally accelerates neurological recovery from addiction.' },

  { week: 21, category: 'testosterone', title: 'Fadogia Agrestis', summary: 'This Nigerian herb has shown promise in animal studies for increasing testosterone by stimulating the Leydig cells in the testes. Human research is limited — approach with cautious optimism and quality sourcing.' },
  { week: 21, category: 'testosterone', title: 'Sprint Interval Training Protocol', summary: 'The research-backed protocol: 6-8 all-out sprints of 30 seconds with 90-second rest periods, 2-3 times per week. This produces a superior testosterone and growth hormone response compared to steady-state cardio.' },
  { week: 21, category: 'testosterone', title: 'Testosterone and Immune Function', summary: 'Moderate testosterone levels support a balanced immune response. The hormonal improvements from recovery may contribute to the fewer colds and illnesses that many men report during sustained abstinence.' },
  { week: 21, category: 'testosterone', title: 'Tart Cherry and Recovery', summary: 'Tart cherry juice reduces inflammation and muscle soreness by 48% post-exercise, supporting faster recovery between training sessions. Better recovery means more consistent training and sustained hormonal benefits.' },
  { week: 21, category: 'testosterone', title: 'The Five-Month Hormonal Assessment', summary: 'At 21 weeks, assess your progress: Energy levels? Morning drive? Workout performance? Confidence? Body composition? Compare honestly to your baseline. The changes are real and measurable.' },

  { week: 21, category: 'intimacy', title: 'Attachment and the Nervous System', source: 'Polyvagal Theory', summary: 'Your nervous system constantly scans for safety signals from your partner (neuroception). A calm voice, soft eye contact, and open body language signal safety. This is the biology beneath intimacy.' },
  { week: 21, category: 'intimacy', title: 'The Importance of Aftercare', summary: 'Post-intimacy care — staying close, gentle conversation, physical affection — is as important as the act itself. It completes the bonding cycle and reinforces the emotional connection.' },
  { week: 21, category: 'intimacy', title: 'Dealing With Rejection', summary: 'Rejection is a normal part of human connection, not a referendum on your worth. Building resilience to rejection through exposure and self-compassion is a critical dating and relationship skill.' },
  { week: 21, category: 'intimacy', title: 'The Difference Between Secrecy and Privacy', summary: 'Privacy is healthy boundaries ("I need time alone"). Secrecy is hiding behavior that would harm trust. In recovery, understanding this distinction helps maintain both autonomy and transparency.' },
  { week: 21, category: 'intimacy', title: 'Building Friendship With Your Partner', summary: 'The foundation of lasting romantic love is deep friendship. Invest in shared interests, genuine curiosity about each other\'s worlds, and the kind of companionship that sustains a relationship through all seasons.' },

  { week: 21, category: 'wisdom', title: 'On Grit', source: 'Angela Duckworth', summary: 'Grit is passion and perseverance for long-term goals.', link: 'This 365-day journey requires grit. Not talent, not luck — sustained effort toward a meaningful goal. You have grit. You are proving it.' },
  { week: 21, category: 'wisdom', title: 'On Ships', source: 'John A. Shedd', summary: 'A ship in harbor is safe, but that is not what ships are built for.', link: 'Playing it safe — numbing out with pornography — keeps you in the harbor. You were built for the open sea. Sail.' },
  { week: 21, category: 'wisdom', title: 'On Today', source: 'Annie Dillard', summary: 'How we spend our days is, of course, how we spend our lives.', link: 'This is not just a day in recovery. This is a day of your life. Make it count. You don\'t get it back.' },
  { week: 21, category: 'wisdom', title: 'On Acceptance', source: 'Reinhold Niebuhr', summary: 'Grant me the serenity to accept the things I cannot change, the courage to change the things I can, and the wisdom to know the difference.', link: 'Accept the urges. Change your response. Know the difference between what you control and what you don\'t.' },
  { week: 21, category: 'wisdom', title: 'On Light', source: 'Desmond Tutu', summary: 'Hope is being able to see that there is light despite all of the darkness.', link: 'Even in your darkest moments of temptation, the light of your progress is still there. It does not go out.' },

  // ===== WEEK 22 =====
  { week: 22, category: 'studies', title: 'Pornography Use Among Couples', source: 'Journal of Sex & Marital Therapy, 2018', summary: 'Discordant pornography use (where one partner uses and the other disapproves) was the strongest predictor of relationship distress, more than frequency of use alone.' },
  { week: 22, category: 'studies', title: 'Cognitive Flexibility and Recovery', source: 'Neuropsychologia, 2019', summary: 'Recovery from behavioral addiction significantly improved cognitive flexibility — the ability to switch between tasks and think creatively. This improvement continued to increase even after 6 months of abstinence.' },
  { week: 22, category: 'studies', title: 'The Role of Identity in Behavior Change', source: 'Personality and Social Psychology Bulletin, 2017', summary: 'When people incorporate a new behavior into their identity ("I am someone who doesn\'t use pornography" vs. "I am trying to quit"), they are 2.5x more likely to maintain the behavior long-term.' },
  { week: 22, category: 'studies', title: 'Micro-Habits for Recovery', source: 'European Journal of Social Psychology, 2010', summary: 'New habits take an average of 66 days to become automatic. At 22 weeks, your recovery habits are deeply embedded. The autopilot now works in your favor rather than against you.' },
  { week: 22, category: 'studies', title: 'Post-Traumatic Growth', source: 'Journal of Traumatic Stress, 2004', summary: 'Many people who overcome significant challenges report positive psychological changes — increased appreciation for life, deeper relationships, greater personal strength. Your struggle can become your greatest asset.' },

  { week: 22, category: 'testosterone', title: 'DIM (Diindolylmethane)', summary: 'DIM, found in cruciferous vegetables (broccoli, cauliflower, Brussels sprouts), supports healthy estrogen metabolism. By promoting beneficial estrogen pathways, DIM indirectly supports the testosterone-to-estrogen ratio.' },
  { week: 22, category: 'testosterone', title: 'Olympic Lift Benefits', summary: 'Power cleans, snatches, and clean-and-jerks produce explosive hormonal responses due to their full-body, high-intensity nature. Even power clean variations are excellent testosterone-boosting exercises.' },
  { week: 22, category: 'testosterone', title: 'Sleep Temperature Optimization', summary: 'Testicular testosterone production is optimized at slightly below body temperature. Sleeping in a cool room (65-68°F) and wearing loose-fitting sleepwear supports overnight hormonal production.' },
  { week: 22, category: 'testosterone', title: 'Testosterone and Cardiovascular Health', source: 'Journal of the American Heart Association, 2016', summary: 'Healthy testosterone levels are associated with better cardiovascular health, improved lipid profiles, and reduced risk of metabolic syndrome. Hormonal optimization is cardiovascular protection.' },
  { week: 22, category: 'testosterone', title: 'The Recovery Plateau and How to Break It', summary: 'If you feel your progress has plateaued, introduce new stimuli: change your workout routine, try a new supplement, adjust sleep schedule, or add a new stress-management practice. Novel challenges reignite adaptation.' },

  { week: 22, category: 'intimacy', title: 'Digital Boundaries in Relationships', summary: 'Healthy digital boundaries — no phones during meals, no checking messages during conversations, device-free bedrooms — create space for genuine connection in an increasingly distracted world.' },
  { week: 22, category: 'intimacy', title: 'Understanding Attachment Styles', source: 'Attached, Amir Levine', summary: 'There are three main attachment styles: secure, anxious, and avoidant. Understanding yours and your partner\'s attachment style transforms confusion into compassion and conflict into connection.' },
  { week: 22, category: 'intimacy', title: 'Ritualized Greetings and Partings', summary: 'How you greet your partner when reuniting and how you part when separating sets the emotional tone of the relationship. A genuine hug, kiss, and eye contact at these transitions creates a rhythm of connection.' },
  { week: 22, category: 'intimacy', title: 'The Beauty of Imperfect Bodies', summary: 'Pornography presents digitally enhanced, surgically altered, impossibly lit bodies. Real bodies have marks, asymmetries, and character. Learning to find beauty in reality is a profound act of recovery.' },
  { week: 22, category: 'intimacy', title: 'Collaborative Problem-Solving', summary: 'Approach relationship challenges as "us vs. the problem" rather than "me vs. you." This collaborative stance transforms adversaries into teammates and strengthens the partnership through every difficulty.' },

  { week: 22, category: 'wisdom', title: 'On Regret', source: 'Mark Twain', summary: 'Twenty years from now you will be more disappointed by the things you didn\'t do than by the ones you did.', link: 'You will never regret choosing recovery. You will only regret the time you spent before starting. Keep going.' },
  { week: 22, category: 'wisdom', title: 'On Transformation', source: 'Joseph Campbell', summary: 'The cave you fear to enter holds the treasure you seek.', link: 'The discomfort you\'ve been willing to face is revealing treasures — clarity, confidence, connection — that you never knew existed within you.' },
  { week: 22, category: 'wisdom', title: 'On Character Building', source: 'Martin Luther King Jr.', summary: 'The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy.', link: 'Your character is being forged in the fire of this challenge. Stand firm.' },
  { week: 22, category: 'wisdom', title: 'On Letting Go', source: 'Steve Maraboli', summary: 'The truth is, unless you let go, unless you forgive yourself, unless you forgive the situation, you cannot move forward.', link: 'Forgive your past. Forgive your relapses. Forgive yourself. Then move forward with clean hands and a clear mind.' },
  { week: 22, category: 'wisdom', title: 'On Believing', source: 'Henry Ford', summary: 'Whether you think you can, or you think you can\'t — you\'re right.', link: 'Believe in your recovery. Belief is not wishful thinking — it is the foundation on which action is built.' },

  // ===== WEEK 23 =====
  { week: 23, category: 'studies', title: 'BDNF and Neurological Recovery', source: 'Trends in Neurosciences, 2018', summary: 'Brain-Derived Neurotrophic Factor (BDNF) promotes new neuron growth and synaptic repair. Exercise, sleep, and social connection — all components of recovery — increase BDNF production.' },
  { week: 23, category: 'studies', title: 'The Default Mode Network in Recovery', source: 'Proceedings of the National Academy of Sciences, 2019', summary: 'At 5+ months of recovery, the default mode network — your brain\'s autopilot — begins functioning more like a non-addicted brain. Automatic thoughts shift from craving to normal cognition.' },
  { week: 23, category: 'studies', title: 'Positive Psychology Interventions', source: 'Journal of Positive Psychology, 2017', summary: 'Interventions like gratitude practice, strengths identification, and acts of kindness produced significant improvements in well-being and reduced addictive behaviors in clinical trials.' },
  { week: 23, category: 'studies', title: 'Pornography and Life Satisfaction', source: 'Psychological Reports, 2019', summary: 'Large-scale study of 35,000+ respondents found that pornography use was inversely correlated with every measure of life satisfaction — personal, relational, professional, and spiritual.' },
  { week: 23, category: 'studies', title: 'Myelin Repair and Cognitive Recovery', source: 'Science, 2014', summary: 'Myelin sheaths — the insulation around nerve fibers — damaged by chronic stress and addiction begin repairing after sustained behavioral change, improving neural communication speed and accuracy.' },

  { week: 23, category: 'testosterone', title: 'KSM-66 Ashwagandha', source: 'American Journal of Men\'s Health, 2019', summary: 'KSM-66 ashwagandha extract specifically increased testosterone by 17%, improved sperm quality by 167%, and reduced cortisol by 27.9% in a double-blind placebo-controlled study of healthy men.' },
  { week: 23, category: 'testosterone', title: 'Blood Flow Restriction Training', summary: 'Training with restricted blood flow at light loads (20-30% max) produces hormonal responses similar to heavy training. Useful for maintaining testosterone benefits during deload weeks or injury recovery.' },
  { week: 23, category: 'testosterone', title: 'Organ Meats for Nutrient Density', summary: 'Liver, heart, and kidney are the most nutrient-dense foods available, containing bioavailable forms of zinc, B vitamins, CoQ10, and vitamin A — all essential for testosterone production.' },
  { week: 23, category: 'testosterone', title: 'The Parasympathetic State', summary: 'Chronic sympathetic (fight-or-flight) activation suppresses testosterone. Practices that activate the parasympathetic system — deep breathing, yoga, meditation, massage — shift the hormonal environment in your favor.' },
  { week: 23, category: 'testosterone', title: 'Tracking Your Progress', summary: 'Consider tracking objective markers: morning energy (1-10), workout performance, libido, sleep quality. This data helps identify what\'s working and provides motivation through visible trends.' },

  { week: 23, category: 'intimacy', title: 'Green Flags in New Relationships', summary: 'Signs of a healthy potential partner: they respect your boundaries, are genuinely interested in your experience, don\'t play games, communicate directly, and make you feel calm rather than anxious.' },
  { week: 23, category: 'intimacy', title: 'When to Disclose Your Recovery', summary: 'In new relationships, disclosure of recovery is a personal decision. A general guideline: share when trust is established and the relationship is becoming serious. Frame it as growth, not confession.' },
  { week: 23, category: 'intimacy', title: 'The Erotic Blueprint', source: 'Jaiya', summary: 'People have different erotic blueprints (energetic, sensual, sexual, kinky, shapeshifter). Understanding yours and your partner\'s helps create fulfilling intimacy that honors both people.' },
  { week: 23, category: 'intimacy', title: 'Rebuilding Your Sexual Identity', summary: 'Recovery offers the chance to rebuild your sexual identity free from pornographic scripts. Who are you sexually without pornography\'s influence? Exploring this question is a profound act of self-discovery.' },
  { week: 23, category: 'intimacy', title: 'The Long Game of Relationships', summary: 'The most satisfying relationships are built over years, not weeks. Patience with the process of getting to know someone deeply is a skill that pornography\'s instant gratification has eroded.' },

  { week: 23, category: 'wisdom', title: 'On Mastery', source: 'Bruce Lee', summary: 'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.', link: 'One practice, repeated daily: choosing freedom. You are becoming a master of self-control through repetition.' },
  { week: 23, category: 'wisdom', title: 'On Hardship', source: 'Haruki Murakami', summary: 'And once the storm is over, you won\'t remember how you made it through. But one thing is certain. When you come out of the storm, you won\'t be the same person who walked in.', link: 'The storm of recovery is transforming you. The person who emerges will barely recognize who they were before.' },
  { week: 23, category: 'wisdom', title: 'On Legacy', source: 'Maya Angelou', summary: 'People will forget what you said, people will forget what you did, but people will never forget how you made them feel.', link: 'How do you make people feel? Your recovery is transforming not just you, but everyone around you. Your presence has changed.' },
  { week: 23, category: 'wisdom', title: 'On Mindfulness', source: 'Jon Kabat-Zinn', summary: 'You can\'t stop the waves, but you can learn to surf.', link: 'You can\'t stop urges from arising. But you have learned to ride them out without being pulled under. That is mastery.' },
  { week: 23, category: 'wisdom', title: 'On Doing', source: 'Yoda', summary: 'Do. Or do not. There is no try.', link: 'Stop "trying" to quit. You have quit. You are living a pornography-free life. Own that identity completely.' },

  // ===== WEEK 24 =====
  { week: 24, category: 'studies', title: 'Six Months: The Neurological Milestone', source: 'Neuroscience & Biobehavioral Reviews, 2020', summary: 'At 6 months, fMRI studies show that the brain\'s reward response to natural stimuli returns to near-baseline levels. The dopamine system has significantly recalibrated. Everyday pleasures feel rewarding again.' },
  { week: 24, category: 'studies', title: 'Pornography and Cortisol Regulation', source: 'Psychoneuroendocrinology, 2019', summary: 'Chronic pornography users showed dysregulated cortisol patterns. After 6 months of abstinence, cortisol regulation normalized, improving stress resilience and emotional stability.' },
  { week: 24, category: 'studies', title: 'The Science of Habit Replacement', source: 'Neuron, 2016', summary: 'Habits cannot simply be eliminated — they must be replaced. The most successful recoveries pair cessation with the development of positive habits that occupy the same time and fulfill similar needs.' },
  { week: 24, category: 'studies', title: 'Long-Term Well-Being After Recovery', source: 'Journal of Happiness Studies, 2019', summary: 'People who sustained behavioral change for 6+ months reported higher well-being than they had at any point before the addiction. Recovery doesn\'t just restore — it elevates life satisfaction beyond previous baselines.' },
  { week: 24, category: 'studies', title: 'Epigenetics and Behavioral Change', source: 'Trends in Genetics, 2018', summary: 'Sustained behavioral changes can alter gene expression through epigenetic mechanisms. Your recovery is not just changing your behavior — it may be changing which genes are activated in your body.' },

  { week: 24, category: 'testosterone', title: 'The Six-Month Hormonal Milestone', summary: 'At 6 months, your endocrine system has fully recalibrated from the effects of chronic pornography use. Testosterone, cortisol, and dopamine systems are operating at optimized baseline levels.' },
  { week: 24, category: 'testosterone', title: 'Periodization in Training', summary: 'Alternating between heavy (3-5 rep), moderate (8-12 rep), and light (15-20 rep) phases every 4-6 weeks prevents adaptation and maintains optimal hormonal response to training.' },
  { week: 24, category: 'testosterone', title: 'The Mediterranean Diet', source: 'Nutrients, 2019', summary: 'The Mediterranean diet — rich in olive oil, nuts, fish, vegetables, and moderate wine — was associated with higher testosterone levels and better sexual function in multiple studies.' },
  { week: 24, category: 'testosterone', title: 'Testosterone and Motivation', summary: 'Optimal testosterone is strongly correlated with goal-directed behavior and motivation. You may notice that projects and goals that seemed impossible before recovery now feel achievable and exciting.' },
  { week: 24, category: 'testosterone', title: 'Building Sustainable Habits', summary: 'The supplements and protocols that work for you are only valuable if sustainable. Focus on a core set of practices you can maintain for life rather than an unsustainable all-in approach.' },

  { week: 24, category: 'intimacy', title: 'The Relationship Vision', summary: 'Create a shared vision with your partner: Where do you want to be in 5 years? What kind of relationship do you want to build? A shared vision aligns daily choices with long-term goals.' },
  { week: 24, category: 'intimacy', title: 'Post-Recovery Sexuality', summary: 'Your sexuality after 6 months of recovery is more authentically yours than it has been in years. Notice what genuinely excites you versus what was programmed by pornography. Trust your natural responses.' },
  { week: 24, category: 'intimacy', title: 'The Half-Year Relationship Check', summary: 'If you\'re in a relationship, celebrate this milestone together. Acknowledge the difficulty, honor the growth, and recommit to the partnership. Recovery is a shared achievement.' },
  { week: 24, category: 'intimacy', title: 'Mentoring Others in Recovery', summary: 'Your experience now qualifies you to help others earlier in their journey. Mentoring solidifies your own recovery and creates meaning from your struggle. Give back what was given to you.' },
  { week: 24, category: 'intimacy', title: 'Deepening Physical Intimacy', summary: 'With 6 months of rewired neural pathways, physical intimacy should feel noticeably different — more present, more connected, more satisfying. You are experiencing what real intimacy was always meant to be.' },

  { week: 24, category: 'wisdom', title: 'On Halfway', source: 'Chinese Proverb', summary: 'The best time to plant a tree was 20 years ago. The second best time is now.', link: 'You are at the halfway point of your 365-day journey. But the tree you planted 6 months ago is already bearing fruit.' },
  { week: 24, category: 'wisdom', title: 'On Excellence', source: 'Aristotle', summary: 'Excellence is an art won by training and habituation.', link: 'Six months of training your mind, body, and spirit. You are not just recovering — you are achieving excellence in self-mastery.' },
  { week: 24, category: 'wisdom', title: 'On Truth', source: 'Mahatma Gandhi', summary: 'Truth never damages a cause that is just.', link: 'Living in truth — no hidden habits, no secret behaviors — is the most liberating feeling. You are free because you are honest.' },
  { week: 24, category: 'wisdom', title: 'On Endurance', source: 'William Faulkner', summary: 'You cannot swim for new horizons until you have courage to lose sight of the shore.', link: 'You\'ve lost sight of the old shore. The new horizon is not yet visible. Trust the compass of your values and keep swimming.' },
  { week: 24, category: 'wisdom', title: 'On Reflection', summary: 'Take a moment to write down what has changed in 6 months. Your energy, relationships, self-respect, focus, confidence. The evidence of transformation is everywhere if you look.', link: 'You are living proof that change is possible. Celebrate how far you have come. Then keep going.' },

  // ===== WEEK 25 =====
  { week: 25, category: 'studies', title: 'Pornography and Reduced Volunteerism', source: 'Social Indicators Research, 2018', summary: 'Increased pornography use predicted decreased prosocial behavior including volunteering and charitable giving. The self-focused nature of addiction erodes concern for others and community engagement.' },
  { week: 25, category: 'studies', title: 'Neural Pruning in Recovery', source: 'Cerebral Cortex, 2015', summary: 'Unused neural pathways are gradually pruned away through a process called synaptic pruning. At 6+ months, pornography-related pathways weaken while recovery-supporting pathways strengthen.' },
  { week: 25, category: 'studies', title: 'The Benefits of Reading for Brain Health', source: 'Brain Connectivity, 2013', summary: 'Reading fiction improves theory of mind, empathy, and neural connectivity. Replacing screen time with reading is one of the most effective ways to rebuild cognitive abilities damaged by pornography use.' },
  { week: 25, category: 'studies', title: 'Social Comparison and Well-Being', source: 'Journal of Personality and Social Psychology, 2019', summary: 'Reducing social comparison — with both pornographic ideals and social media highlights — significantly improved self-esteem and life satisfaction. Compare yourself only to who you were yesterday.' },
  { week: 25, category: 'studies', title: 'Behavioral Activation for Recovery', source: 'Clinical Psychology Review, 2017', summary: 'Scheduling meaningful, values-aligned activities proactively (behavioral activation) was more effective at preventing relapse than reactive urge management alone. Fill your calendar with purpose.' },

  { week: 25, category: 'testosterone', title: 'Phosphatidylserine and Cortisol', source: 'Journal of the International Society of Sports Nutrition, 2008', summary: 'Phosphatidylserine supplementation (400-800mg) significantly blunted the cortisol response to exercise stress, creating a more favorable testosterone-to-cortisol ratio post-workout.' },
  { week: 25, category: 'testosterone', title: 'The Benefits of Play', summary: 'Recreational play — team sports, martial arts, hiking, climbing — stimulates testosterone through a combination of physical exertion, competition, and social bonding. Training doesn\'t have to feel like training.' },
  { week: 25, category: 'testosterone', title: 'Testosterone and Risk Assessment', summary: 'Optimal testosterone improves risk assessment — not recklessness, but the ability to take calculated risks. This translates to better career decisions, entrepreneurial thinking, and personal growth.' },
  { week: 25, category: 'testosterone', title: 'Iodine and Thyroid Support', summary: 'Iodine deficiency is more common than realized and directly impairs thyroid function, which regulates testosterone. Seaweed, fish, eggs, and iodized salt are reliable sources.' },
  { week: 25, category: 'testosterone', title: 'Recovery Beyond Testosterone', summary: 'Remember: testosterone is a marker, not the goal. The real benefits of recovery are clarity, connection, integrity, and freedom. Hormonal optimization is a side effect of living well.' },

  { week: 25, category: 'intimacy', title: 'The Practice of Deep Listening', summary: 'Deep listening means hearing not just words but the emotions, needs, and unspoken messages beneath them. It requires silencing your inner dialogue and truly absorbing what your partner is communicating.' },
  { week: 25, category: 'intimacy', title: 'Celebrating Your Partner\'s Successes', source: 'Journal of Personality and Social Psychology, 2006', summary: 'How you respond to your partner\'s good news is more predictive of relationship health than how you handle bad news. Active, enthusiastic responses ("Tell me everything!") build bonds.' },
  { week: 25, category: 'intimacy', title: 'The Role of Mystery in Long-Term Love', summary: 'Maintaining some individual mystery and independence keeps attraction alive in long-term relationships. You don\'t need to share every thought. Some mystery is healthy and exciting.' },
  { week: 25, category: 'intimacy', title: 'Navigating Different Communication Styles', summary: 'Some people process internally before speaking; others think out loud. Neither is wrong. Understanding your own and your partner\'s style prevents misinterpretation and frustration.' },
  { week: 25, category: 'intimacy', title: 'The Foundation of Physical Chemistry', summary: 'With a recovered brain, you can now experience physical chemistry that is based on genuine attraction rather than conditioned responses to specific visual stimuli. This authentic chemistry is far more satisfying.' },

  { week: 25, category: 'wisdom', title: 'On Wisdom Itself', source: 'Socrates', summary: 'True wisdom comes to each of us when we realize how little we understand about life, ourselves, and the world around us.', link: 'The more you grow, the more you realize there is to learn. This humility is the beginning of real wisdom.' },
  { week: 25, category: 'wisdom', title: 'On Permanence', source: 'Buddha', summary: 'Nothing is permanent. This too shall pass.', link: 'This applies to urges, difficult emotions, and challenging days. Nothing is permanent. Including your struggle.' },
  { week: 25, category: 'wisdom', title: 'On Kindness', source: 'Dalai Lama', summary: 'Be kind whenever possible. It is always possible.', link: 'Kindness to yourself and others is not weakness. It is the highest form of strength. Be kind in your recovery.' },
  { week: 25, category: 'wisdom', title: 'On Individuality', source: 'Ralph Waldo Emerson', summary: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', link: 'Pornography tried to shape your desires, your expectations, your sexuality. Being authentically yourself is an act of rebellion and recovery.' },
  { week: 25, category: 'wisdom', title: 'On Water', source: 'Bruce Lee', summary: 'Be like water. Water can flow, or it can crash.', link: 'Adapt to circumstances. Flow around obstacles. When necessary, crash through barriers. Be flexible and powerful.' },

  // ===== WEEK 26 =====
  { week: 26, category: 'studies', title: 'The Halfway Point: Recovery Confidence', source: 'Addiction Research & Theory, 2019', summary: 'Studies show that recovery confidence increases dramatically after the 6-month mark. The probability of sustained long-term recovery is significantly higher for those who reach this milestone.' },
  { week: 26, category: 'studies', title: 'Gut-Brain Axis and Mental Health', source: 'Frontiers in Psychiatry, 2019', summary: 'The gut-brain axis influences mood, anxiety, and addictive behavior through serotonin production and vagal nerve signaling. Diet directly impacts recovery through this bidirectional communication.' },
  { week: 26, category: 'studies', title: 'The Power of Visualization', source: 'Neuropsychologia, 2004', summary: 'Mental rehearsal activates the same neural pathways as physical practice. Visualizing yourself successfully navigating trigger situations strengthens the actual brain circuits you\'ll use in real scenarios.' },
  { week: 26, category: 'studies', title: 'Music Therapy and Addiction Recovery', source: 'Journal of Addictions Nursing, 2016', summary: 'Music therapy significantly reduced anxiety, improved mood, and decreased cravings in addiction recovery. Curated playlists for different emotional states can serve as healthy coping tools.' },
  { week: 26, category: 'studies', title: 'Purpose-Driven Recovery', source: 'Journal of Clinical Psychology, 2020', summary: 'Participants who connected their recovery to a larger life purpose sustained abstinence at 3x the rate of those motivated solely by avoiding negative consequences. Purpose fuels persistence.' },

  { week: 26, category: 'testosterone', title: 'The Half-Year Hormonal Assessment', summary: 'At 26 weeks, take comprehensive stock: How does your energy, drive, body composition, and confidence compare to 6 months ago? Document these changes — they are evidence of your transformation.' },
  { week: 26, category: 'testosterone', title: 'Electrolyte Balance', summary: 'Sodium, potassium, and magnesium balance affects muscle function and hormonal signaling. Most men are deficient in potassium and magnesium. Electrolyte supplementation can improve workout performance and recovery.' },
  { week: 26, category: 'testosterone', title: 'Testosterone and Creativity', summary: 'Optimal testosterone is associated with increased creativity and divergent thinking. Many men in long-term recovery report a creative renaissance — pursuing art, music, writing, or entrepreneurial projects.' },
  { week: 26, category: 'testosterone', title: 'Rest-Pause Training', summary: 'Performing a heavy set to near-failure, resting 10-15 seconds, then continuing for additional reps creates intense metabolic stress that maximizes hormonal response. Use sparingly for best results.' },
  { week: 26, category: 'testosterone', title: 'Sustainability Over Optimization', summary: 'The best testosterone protocol is the one you actually do consistently. A simple routine maintained for years beats an elaborate protocol abandoned after weeks. Consistency trumps complexity.' },

  { week: 26, category: 'intimacy', title: 'The Half-Year Relationship Reflection', summary: 'Six months of recovery has transformed how you show up in relationships. Reflect: Are you more present? More patient? More emotionally available? These changes are gifts to everyone around you.' },
  { week: 26, category: 'intimacy', title: 'Maintaining Attraction in Long-Term Partnerships', summary: 'Attraction in long-term relationships is maintained through personal growth, physical self-care, emotional engagement, surprise, and maintaining your own interests and identity outside the relationship.' },
  { week: 26, category: 'intimacy', title: 'The Power of Written Words', summary: 'A heartfelt letter, note, or text expressing love and appreciation can be more impactful than spoken words. Written expressions can be re-read and treasured, extending the emotional connection.' },
  { week: 26, category: 'intimacy', title: 'Navigating Sexual Expectations', summary: 'After 6 months of recovery, your sexual expectations may look very different. Discuss openly with your partner what feels natural and good now. Let your renewed authentic desire guide you.' },
  { week: 26, category: 'intimacy', title: 'Building Your Relationship Legacy', summary: 'What kind of relationship do you want to be remembered for? One built on honesty, kindness, and genuine connection? You are building that legacy right now, one day at a time.' },

  { week: 26, category: 'wisdom', title: 'On the Halfway Mark', summary: 'You are halfway through your 365-day journey. Half a year of choosing yourself, your health, your relationships over a quick hit of dopamine. That is extraordinary. Be proud.', link: 'The second half of any journey is different from the first. You are no longer just surviving — you are thriving.' },
  { week: 26, category: 'wisdom', title: 'On Momentum', source: 'Newton\'s First Law', summary: 'An object in motion tends to stay in motion.', link: 'You have six months of momentum behind you. The physics of habit, neuroscience, and personal growth are all working in your favor now.' },
  { week: 26, category: 'wisdom', title: 'On Mountains', source: 'Chinese Proverb', summary: 'The person who moves a mountain begins by carrying away small stones.', link: 'You have carried thousands of small stones over 182 days. Look behind you — the mountain has moved.' },
  { week: 26, category: 'wisdom', title: 'On Roots', source: 'Chinese Proverb', summary: 'A tree with strong roots laughs at storms.', link: 'Your roots — your habits, your identity, your support system — are now deep enough to weather any storm.' },
  { week: 26, category: 'wisdom', title: 'On the Future', source: 'Alan Kay', summary: 'The best way to predict the future is to invent it.', link: 'You are not hoping for a better future. You are building it. Day by day, choice by choice, you are inventing the life you want.' },


  // ===== WEEK 27 =====
  { week: 27, category: 'studies', title: 'Pornography and Reduced Gray Matter', source: 'JAMA Psychiatry, 2014', summary: 'Beyond the striatum, extended abstinence shows gray matter recovery in the orbitofrontal cortex and anterior cingulate cortex — regions critical for valuation, decision-making, and error detection.' },
  { week: 27, category: 'studies', title: 'Comorbidity: Pornography and ADHD', source: 'Journal of Behavioral Addictions, 2020', summary: 'ADHD significantly increases vulnerability to pornography addiction due to shared dopamine dysregulation. ADHD management through medication, structure, and behavioral strategies supports recovery.' },
  { week: 27, category: 'studies', title: 'Pornography and Substance Use Overlap', source: 'Addictive Behaviors, 2018', summary: 'Pornography and substance use share neural substrates and frequently co-occur. Addressing one without the other often leads to "symptom substitution." Holistic recovery addresses all addictive patterns.' },
  { week: 27, category: 'studies', title: 'The Therapeutic Alliance in Recovery', source: 'Psychotherapy, 2011', summary: 'The quality of the therapeutic relationship is the single strongest predictor of therapy outcomes, regardless of technique. If seeking professional help, finding the right therapist matters more than the method.' },
  { week: 27, category: 'studies', title: 'Digital Detox and Cognitive Restoration', source: 'Environment and Behavior, 2019', summary: 'A 72-hour digital detox improved working memory, attention span, and emotional regulation beyond what individual screen reduction achieved. Periodic complete digital breaks accelerate cognitive recovery.' },

  { week: 27, category: 'testosterone', title: 'Testosterone and Red Blood Cell Production', summary: 'Testosterone stimulates erythropoietin, which increases red blood cell production. This improves oxygen delivery to muscles and organs, contributing to the increased energy and stamina of recovery.' },
  { week: 27, category: 'testosterone', title: 'The Benefits of Hiking', summary: 'Hiking combines multiple testosterone-boosting factors: nature exposure (reduces cortisol), physical exertion (stimulates testosterone), sunlight (vitamin D), and social bonding when done with others.' },
  { week: 27, category: 'testosterone', title: 'Probiotics and Hormonal Health', source: 'PLOS ONE, 2014', summary: 'Certain Lactobacillus strains increased testicular size and testosterone levels in animal studies. Human research is emerging, but gut health clearly influences hormonal balance through multiple pathways.' },
  { week: 27, category: 'testosterone', title: 'The Importance of Warm-Up', summary: 'A proper warm-up primes the nervous system and endocrine system for maximum performance. 10 minutes of progressive warm-up before heavy training optimizes both safety and hormonal response.' },
  { week: 27, category: 'testosterone', title: 'Post-Workout Nutrition Window', summary: 'The post-workout window (30-60 minutes) is when insulin sensitivity peaks. A meal combining protein and carbohydrates during this window supports muscle recovery and optimizes the hormonal environment.' },

  { week: 27, category: 'intimacy', title: 'The Dance of Autonomy and Connection', summary: 'Healthy relationships oscillate between togetherness and separateness. Maintaining your own identity, friendships, and interests makes the time you spend together richer and more intentional.' },
  { week: 27, category: 'intimacy', title: 'Spiritual Intimacy', summary: 'Sharing your deepest beliefs, fears, and questions about life\'s meaning creates a form of intimacy that transcends the physical. Whether religious or not, spiritual connection bonds at the deepest level.' },
  { week: 27, category: 'intimacy', title: 'The Practice of Forgiveness', summary: 'Holding grudges poisons relationships. Forgiveness — releasing resentment while maintaining boundaries — frees both partners from the weight of past hurts and creates space for renewed connection.' },
  { week: 27, category: 'intimacy', title: 'Navigating Differences in Values', summary: 'Not all value differences are dealbreakers. Distinguish between core values (must align) and preferences (can differ). Respect for differences is often more important than agreement.' },
  { week: 27, category: 'intimacy', title: 'The Recovery Ripple Effect', summary: 'Your recovery doesn\'t just change your romantic relationships — it transforms friendships, family dynamics, professional interactions, and even how strangers experience you. Healing radiates outward.' },

  { week: 27, category: 'wisdom', title: 'On Integrity', source: 'Confucius', summary: 'The strength of a nation derives from the integrity of the home.', link: 'Your personal integrity strengthens every home, community, and relationship you touch. You are building something bigger than yourself.' },
  { week: 27, category: 'wisdom', title: 'On Solitude', source: 'Paul Tillich', summary: 'Language has created the word loneliness to express the pain of being alone. And it has created the word solitude to express the glory of being alone.', link: 'Transform loneliness into solitude. The difference is not circumstance — it is attitude. Learn to treasure your own company.' },
  { week: 27, category: 'wisdom', title: 'On Resilience', source: 'Ernest Hemingway', summary: 'The world breaks everyone, and afterward, many are strong at the broken places.', link: 'You are stronger at the broken places. Your vulnerabilities, once weaknesses, are now your greatest sources of strength.' },
  { week: 27, category: 'wisdom', title: 'On Attention', source: 'Simone Weil', summary: 'Attention is the rarest and purest form of generosity.', link: 'Give the gift of your full, undivided attention. To your partner, your friends, your work, your life. It is the most valuable thing you own.' },
  { week: 27, category: 'wisdom', title: 'On Becoming', source: 'Carl Rogers', summary: 'The good life is a process, not a state of being. It is a direction, not a destination.', link: 'Recovery is not a place you arrive at. It is a direction you walk in. Keep walking the good direction.' },

  // ===== WEEK 28 =====
  { week: 28, category: 'studies', title: 'Pornography and OCD-Like Symptoms', source: 'Journal of Obsessive-Compulsive and Related Disorders, 2019', summary: 'Compulsive pornography use shares features with OCD: intrusive thoughts, ritualistic behavior, and the sense of inability to stop. Evidence-based OCD treatments (ERP, SSRIs) may help severe cases.' },
  { week: 28, category: 'studies', title: 'Nature\'s Effect on the Prefrontal Cortex', source: 'Proceedings of the National Academy of Sciences, 2015', summary: 'Walking in nature for 90 minutes reduced activity in the subgenual prefrontal cortex — a brain region associated with rumination. Nature walks literally quiet the brain patterns that drive compulsive behavior.' },
  { week: 28, category: 'studies', title: 'The Science of Motivation', source: 'Perspectives on Psychological Science, 2017', summary: 'Intrinsic motivation (doing something because it aligns with your values) is far more sustainable than extrinsic motivation (avoiding consequences). Connect your recovery to your deepest values.' },
  { week: 28, category: 'studies', title: 'Prosocial Behavior and Brain Health', source: 'Social Cognitive and Affective Neuroscience, 2018', summary: 'Acts of kindness and generosity activate the brain\'s reward system naturally, providing dopamine without the damage. Prosocial behavior is neurologically similar to a healthy natural high.' },
  { week: 28, category: 'studies', title: 'The Consolidation Phase of Recovery', source: 'Addiction, 2019', summary: 'Between 6-12 months, recovery enters a "consolidation phase" where new neural pathways solidify and the risk of relapse gradually decreases. This phase requires sustained but not heroic effort.' },

  { week: 28, category: 'testosterone', title: 'Glycine and Sleep Quality', summary: 'Glycine supplementation (3g before bed) improved sleep quality and next-day cognitive function in clinical trials. Better sleep means better testosterone production and recovery.' },
  { week: 28, category: 'testosterone', title: 'Martial Arts and Hormonal Benefits', summary: 'Martial arts training combines competitive drive, intense physical exertion, mental discipline, and social hierarchy — all of which stimulate testosterone production through complementary pathways.' },
  { week: 28, category: 'testosterone', title: 'Avoiding Pesticide Exposure', summary: 'Many common pesticides are endocrine disruptors. Choosing organic produce for the "Dirty Dozen" (strawberries, spinach, apples, etc.) reduces exposure to chemicals that interfere with testosterone production.' },
  { week: 28, category: 'testosterone', title: 'The Seven-Month Review', summary: 'At 7 months, your hormonal optimization is well-established. Focus now on maintaining habits rather than adding new interventions. Sustainability is the key to lifelong hormonal health.' },
  { week: 28, category: 'testosterone', title: 'Social Testosterone', summary: 'Leading a team, public speaking, winning an argument, receiving admiration — all social victories increase testosterone. Actively pursue social situations that challenge you and allow you to contribute.' },

  { week: 28, category: 'intimacy', title: 'The Love Account: Daily Deposits', summary: 'Think of your relationship as a bank account that needs daily deposits. A morning kiss, a text during the day, cooking dinner, asking about their feelings — small deposits prevent emotional bankruptcy.' },
  { week: 28, category: 'intimacy', title: 'Managing External Threats to Your Relationship', summary: 'External stressors — work, family, finances — can damage relationships if not managed together. Present a united front against external challenges and never let outside stress become inside conflict.' },
  { week: 28, category: 'intimacy', title: 'The Joy of Giving in Relationships', summary: 'Research shows that giving to your partner activates stronger reward responses than receiving. Generosity in relationships is neurologically rewarding — it feels good because it is good.' },
  { week: 28, category: 'intimacy', title: 'Overcoming the Fear of Intimacy', summary: 'Fear of intimacy often stems from fear of rejection or engulfment. Recognize which fear is yours. Then gradually expose yourself to the vulnerability required for connection. Growth happens at the edge of comfort.' },
  { week: 28, category: 'intimacy', title: 'Creating a Safe Harbor', summary: 'Your relationship should be a safe harbor — a place to rest from the world\'s storms. This safety is built through consistent reliability, emotional responsiveness, and unwavering support.' },

  { week: 28, category: 'wisdom', title: 'On Self-Love', source: 'Oscar Wilde', summary: 'To love oneself is the beginning of a lifelong romance.', link: 'You cannot pour from an empty cup. Self-love — not narcissism, but genuine self-care and self-respect — is the foundation of all other love.' },
  { week: 28, category: 'wisdom', title: 'On Labor', source: 'Kahlil Gibran', summary: 'Work is love made visible.', link: 'Pour your recovered energy into work that matters to you. Let your labor be an expression of love for life itself.' },
  { week: 28, category: 'wisdom', title: 'On Peace', source: 'Thich Nhat Hanh', summary: 'Peace in oneself. Peace in the world.', link: 'The peace you are cultivating inside yourself is not separate from the peace the world needs. Your inner work is outer work.' },
  { week: 28, category: 'wisdom', title: 'On Strength', source: 'Frederick Douglass', summary: 'If there is no struggle, there is no progress.', link: 'The struggle is not separate from the progress. It IS the progress. Every difficult moment is forward movement.' },
  { week: 28, category: 'wisdom', title: 'On Faith', source: 'Martin Luther King Jr.', summary: 'Faith is taking the first step even when you don\'t see the whole staircase.', link: 'You\'ve been walking this staircase for 7 months without seeing the top. That is faith in action. Keep climbing.' },

  // ===== WEEK 29 =====
  { week: 29, category: 'studies', title: 'Flow State and Dopamine Recovery', source: 'Frontiers in Psychology, 2020', summary: 'Engaging in flow-producing activities naturally restores healthy dopamine function. At 7+ months of recovery, the ability to enter flow states — deep, satisfying immersion — is significantly restored.' },
  { week: 29, category: 'studies', title: 'Pornography and Moral Disengagement', source: 'Journal of Media Psychology, 2019', summary: 'Regular pornography use increased moral disengagement — the ability to rationalize unethical behavior. Recovery restores moral sensitivity and alignment between values and actions.' },
  { week: 29, category: 'studies', title: 'The Compound Effect of Small Habits', source: 'Psychological Review, 2017', summary: 'Small daily habits compound over time like interest on investment. Seven months of daily choices — exercise, sleep, mindfulness, connection — have created exponential returns in brain health and well-being.' },
  { week: 29, category: 'studies', title: 'Vagal Tone and Emotional Regulation', source: 'Biological Psychology, 2010', summary: 'Higher vagal tone (measurable via HRV) indicates better emotional regulation and stress resilience. Practices that improve vagal tone — deep breathing, cold exposure, singing — directly support long-term recovery.' },
  { week: 29, category: 'studies', title: 'Cross-Addiction Awareness', source: 'Current Addiction Reports, 2019', summary: 'After quitting one addictive behavior, there is increased risk of developing another (alcohol, gaming, gambling, overeating). Awareness of cross-addiction patterns is essential for comprehensive recovery.' },

  { week: 29, category: 'testosterone', title: 'Panax Ginseng', source: 'Journal of Ginseng Research, 2013', summary: 'Korean Red Ginseng supplementation improved testosterone, sperm quality, and sexual function in clinical trials. It works through multiple pathways including improved nitric oxide production.' },
  { week: 29, category: 'testosterone', title: 'Superset Training for Efficiency', summary: 'Pairing opposing muscle groups (chest/back, biceps/triceps) with minimal rest keeps intensity high while allowing adequate recovery. This time-efficient approach maintains the hormonal stimulus of longer sessions.' },
  { week: 29, category: 'testosterone', title: 'Testosterone and Body Hair', summary: 'DHT, derived from testosterone, regulates body and facial hair growth. Many men in long-term recovery notice increased facial hair density and distribution — a visible marker of hormonal optimization.' },
  { week: 29, category: 'testosterone', title: 'The Power of Consistency', summary: 'The men who see the greatest hormonal benefits are not those with the most elaborate protocols but those who consistently do the basics: sleep 7-9 hours, lift heavy, eat whole foods, manage stress.' },
  { week: 29, category: 'testosterone', title: 'L-Theanine for Stress Management', summary: 'L-theanine (found in green tea) promotes calm alertness by increasing alpha brain waves and GABA. It reduces stress without sedation, supporting the cortisol-testosterone balance throughout the day.' },

  { week: 29, category: 'intimacy', title: 'The Art of Apology', summary: 'A genuine apology has four parts: 1) "I\'m sorry for..." 2) "It was wrong because..." 3) "In the future, I will..." 4) "Can I make it right?" Incomplete apologies create more harm than good.' },
  { week: 29, category: 'intimacy', title: 'Creating Shared Meaning', source: 'John Gottman, PhD', summary: 'The deepest level of relationship is shared meaning — common symbols, rituals, roles, and goals that create a shared culture. Build traditions that are uniquely yours as a couple.' },
  { week: 29, category: 'intimacy', title: 'Emotional vs. Physical Infidelity', summary: 'Emotional affairs — deep emotional connection with someone outside the relationship — can be as damaging as physical infidelity. Guard the emotional boundaries of your relationship as carefully as the physical ones.' },
  { week: 29, category: 'intimacy', title: 'The Role of Curiosity in Lasting Love', summary: 'Curiosity about your partner — their changing thoughts, evolving dreams, shifting feelings — keeps love alive. The moment you think you know everything about someone, you stop seeing them.' },
  { week: 29, category: 'intimacy', title: 'Intimacy as a Spiritual Practice', summary: 'Many traditions view sexual intimacy as sacred — a merging of energies, a transcendence of separateness. Approaching intimacy with reverence and presence transforms it from an act into an experience.' },

  { week: 29, category: 'wisdom', title: 'On Purpose', source: 'Mark Twain', summary: 'The two most important days in your life are the day you are born and the day you find out why.', link: 'Recovery has cleared the fog. Can you see your purpose more clearly now? What are you on this earth to do?' },
  { week: 29, category: 'wisdom', title: 'On Overcoming', source: 'Helen Keller', summary: 'Although the world is full of suffering, it is also full of the overcoming of it.', link: 'You are proof that suffering can be overcome. Your victory is part of the great human story of overcoming.' },
  { week: 29, category: 'wisdom', title: 'On Self-Awareness', source: 'Rumi', summary: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.', link: 'The wisest investment of your energy is self-transformation. Change yourself, and the world changes around you.' },
  { week: 29, category: 'wisdom', title: 'On Rest', source: 'Ovid', summary: 'Take rest; a field that has rested gives a bountiful crop.', link: 'Rest is not laziness. It is preparation. Your body, mind, and spirit need rest to continue growing. Honor that need.' },
  { week: 29, category: 'wisdom', title: 'On Trust', source: 'Ernest Hemingway', summary: 'The best way to find out if you can trust somebody is to trust them.', link: 'Trust yourself. You have 7 months of evidence that you can be trusted with your own choices. Extend that trust forward.' },

  // ===== WEEK 30 =====
  { week: 30, category: 'studies', title: 'The Yerkes-Dodson Law and Recovery', source: 'Journal of Experimental Psychology, 1908', summary: 'Performance peaks at moderate arousal levels. Pornography creates extreme arousal spikes followed by crashes. Recovery restores the moderate, sustained arousal optimal for peak performance in all domains.' },
  { week: 30, category: 'studies', title: 'Cognitive Reserve and Brain Resilience', source: 'Lancet Neurology, 2012', summary: 'Activities that build "cognitive reserve" — learning languages, playing instruments, solving puzzles, reading — make the brain more resilient to addiction-related damage and accelerate recovery.' },
  { week: 30, category: 'studies', title: 'Chronobiology and Addiction', source: 'Current Opinion in Psychiatry, 2018', summary: 'Disrupted circadian rhythms increase vulnerability to addiction. Maintaining consistent sleep-wake times, meal times, and light exposure supports both circadian health and recovery.' },
  { week: 30, category: 'studies', title: 'Awe and Transcendence', source: 'Journal of Personality and Social Psychology, 2015', summary: 'Experiences of awe — nature, art, music, human achievement — increase prosocial behavior and decrease materialism and self-focus. Seeking awe is a powerful antidote to addiction\'s self-centeredness.' },
  { week: 30, category: 'studies', title: 'The Two-Year Recovery Outlook', source: 'Addiction, 2007', summary: 'Meta-analysis of addiction recovery shows that relapse risk drops dramatically after 1 year and approaches background levels after 2 years. You are building toward permanent freedom.' },

  { week: 30, category: 'testosterone', title: 'Long Pepper (Piper Longum)', summary: 'This Ayurvedic herb enhances nutrient absorption by up to 30%, making other supplements and food nutrients more effective. It also has anti-inflammatory properties that support hormonal health.' },
  { week: 30, category: 'testosterone', title: 'Testosterone and Cognitive Function', source: 'Neuroscience & Biobehavioral Reviews, 2016', summary: 'Optimal testosterone levels are associated with faster processing speed, better spatial reasoning, and improved verbal fluency. Your cognitive enhancement from recovery is partly hormonal.' },
  { week: 30, category: 'testosterone', title: 'The Minimalist Training Approach', summary: 'Research shows that 3-4 compound exercises, 3 times per week, for 45 minutes produces 80% of maximum hormonal benefit. More is not always better — recovery and consistency matter most.' },
  { week: 30, category: 'testosterone', title: 'CoQ10 and Cellular Energy', summary: 'CoQ10 supports mitochondrial function — the energy production centers of every cell, including Leydig cells in the testes. Supplementation is particularly beneficial for men over 30 as natural production declines.' },
  { week: 30, category: 'testosterone', title: 'Lifestyle Integration', summary: 'At this point in your journey, hormonal optimization is not a separate project — it is integrated into how you live. Your lifestyle IS your testosterone protocol. Maintain it effortlessly.' },

  { week: 30, category: 'intimacy', title: 'The Evolution of Your Relationship Needs', summary: 'What you needed in relationships before recovery may be different from what you need now. Honor this evolution. Communicate your changing needs to your partner with honesty and care.' },
  { week: 30, category: 'intimacy', title: 'Practicing Radical Honesty', summary: 'Radical honesty doesn\'t mean saying everything that comes to mind. It means never lying, never hiding, and being willing to share what matters even when it\'s uncomfortable. Trust is built on truth.' },
  { week: 30, category: 'intimacy', title: 'The Gift of Quality Time', summary: 'Quality time is not passive co-existence. It is intentional, device-free, emotionally engaged time together. Even 20 minutes of genuine quality time daily can transform a relationship.' },
  { week: 30, category: 'intimacy', title: 'Understanding Projection', summary: 'We often project our own insecurities onto our partners ("You must be judging me"). Recognizing projection allows you to address your own issues rather than creating conflict based on assumptions.' },
  { week: 30, category: 'intimacy', title: 'The Relationship as a Living System', summary: 'A relationship is a living system that needs nourishment, attention, and care. Neglect causes decline; investment produces growth. Your relationship is as healthy as the effort you put into it.' },

  { week: 30, category: 'wisdom', title: 'On Reality', source: 'Marcus Aurelius', summary: 'Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.', link: 'The urge tells you that you need pornography. That is an opinion, not a fact. Challenge the narrative.' },
  { week: 30, category: 'wisdom', title: 'On Gratitude', source: 'William Arthur Ward', summary: 'Feeling gratitude and not expressing it is like wrapping a present and not giving it.', link: 'Express your gratitude. To your support system, to your partner, to yourself. Spoken gratitude multiplies its power.' },
  { week: 30, category: 'wisdom', title: 'On Meaning', source: 'Viktor Frankl', summary: 'Those who have a why to live can bear with almost any how.', link: 'Your "why" has carried you through 30 weeks. Reconnect with it regularly. It is the anchor that holds you steady.' },
  { week: 30, category: 'wisdom', title: 'On Beginning Again', source: 'T.S. Eliot', summary: 'Every moment is a fresh beginning.', link: 'Every morning, you begin again. Not from scratch — from the foundation of everything you\'ve built. Fresh, not empty.' },
  { week: 30, category: 'wisdom', title: 'On the Warrior Path', source: 'Carlos Castaneda', summary: 'A warrior takes everything as a challenge, while an ordinary man takes everything as a blessing or a curse.', link: 'Take every temptation, every difficulty, every setback as a challenge that makes you stronger. This is the warrior\'s way.' },

  // ===== WEEKS 31-39 =====

  { week: 31, category: 'studies', title: 'Pornography and Reduced Life Satisfaction', source: 'Personal Relationships, 2019', summary: 'A longitudinal study tracking participants over 6 years found that initial pornography use predicted decreases in marital quality, life satisfaction, and self-reported happiness over time.' },
  { week: 31, category: 'studies', title: 'The Science of Self-Forgiveness', source: 'Journal of Positive Psychology, 2015', summary: 'Self-forgiveness — accepting responsibility while releasing self-condemnation — predicted better addiction outcomes than either self-blame or self-excuse. It is a skill that can be developed through practice.' },
  { week: 31, category: 'studies', title: 'White Matter Recovery in Long-Term Abstinence', source: 'NeuroImage, 2020', summary: 'Studies show that white matter integrity — the quality of connections between brain regions — continues improving well past the 6-month mark. Your brain is still healing and strengthening.' },
  { week: 31, category: 'studies', title: 'The Attention Restoration Theory', source: 'Environment and Behavior, 2005', summary: 'Natural environments restore directed attention capacity that screen use depletes. Regular time in nature is not leisure — it is cognitive rehabilitation that directly supports long-term recovery.' },
  { week: 31, category: 'studies', title: 'Values Clarification and Recovery', source: 'Behaviour Research and Therapy, 2010', summary: 'ACT-based values clarification exercises significantly improved addiction recovery outcomes. Knowing what you truly value provides a compass that guides decisions even when willpower wavers.' },

  { week: 31, category: 'testosterone', title: 'Testosterone and Emotional Regulation', summary: 'Contrary to stereotypes, optimal testosterone actually improves emotional regulation, not aggression. The "roid rage" effect is from supraphysiological levels; natural optimization produces calm confidence.' },
  { week: 31, category: 'testosterone', title: 'Calisthenics and Hormonal Benefits', summary: 'Bodyweight exercises — pull-ups, dips, push-ups, pistol squats — can produce hormonal responses comparable to weight training when performed with sufficient intensity and progressive overload.' },
  { week: 31, category: 'testosterone', title: 'The Role of Magnesium Glycinate', summary: 'Magnesium glycinate is the most bioavailable form of magnesium for sleep support and muscle relaxation. Taking 200-400mg before bed improves sleep quality and supports nocturnal testosterone production.' },
  { week: 31, category: 'testosterone', title: 'Testosterone Throughout the Day', summary: 'Understanding your daily testosterone rhythm helps optimize activities: intense training in the morning (peak testosterone), creative work mid-morning, social challenges in the afternoon, recovery at night.' },
  { week: 31, category: 'testosterone', title: 'Long-Term Hormonal Sustainability', summary: 'Focus on the fundamentals you can maintain for life: consistent sleep, regular exercise, whole food diet, stress management, and meaningful social connection. These are the pillars of lifelong hormonal health.' },

  { week: 31, category: 'intimacy', title: 'The Art of Compromise', summary: 'True compromise is not about one person giving in — it is about both people finding a solution that honors each person\'s core needs. Learn to distinguish between core needs and flexible preferences.' },
  { week: 31, category: 'intimacy', title: 'Emotional Maturity in Relationships', summary: 'Emotional maturity means managing your own emotions without requiring your partner to do it for you, while still being open to their support. It is self-regulation combined with vulnerability.' },
  { week: 31, category: 'intimacy', title: 'Keeping Score vs. Keeping Connection', summary: 'The moment you start keeping score in a relationship, you have already lost. Generosity without expectation of reciprocity creates the kind of abundance that both partners benefit from.' },
  { week: 31, category: 'intimacy', title: 'The Power of Shared Meals', summary: 'Eating together without screens is one of the simplest and most effective rituals for maintaining connection. Shared meals create a daily touchpoint for conversation, presence, and care.' },
  { week: 31, category: 'intimacy', title: 'Sexual Confidence After Recovery', summary: 'With 7+ months of recovery, your sexual confidence is built on a genuine foundation — real arousal, authentic desire, and present-moment engagement. This confidence is unshakeable because it is real.' },

  { week: 31, category: 'wisdom', title: 'On Mastery', source: 'Robert Greene', summary: 'The time that leads to mastery is dependent on the intensity of our focus.', link: 'Focus your energy. Scattered attention produces scattered results. Concentrated effort produces mastery.' },
  { week: 31, category: 'wisdom', title: 'On Darkness and Light', source: 'Rumi', summary: 'The dark thought, the shame, the malice — meet them at the door laughing, and invite them in.', link: 'Don\'t resist dark thoughts. Welcome them, observe them, then watch them leave. They are visitors, not residents.' },
  { week: 31, category: 'wisdom', title: 'On Waiting', source: 'Rainer Maria Rilke', summary: 'Let everything happen to you: beauty and terror. Just keep going. No feeling is final.', link: 'No urge is final. No feeling is permanent. Everything passes. Just keep going through it all.' },
  { week: 31, category: 'wisdom', title: 'On Victory', source: 'Sun Tzu', summary: 'The supreme art of war is to subdue the enemy without fighting.', link: 'The highest form of recovery is when urges arise and dissolve without a battle. You are approaching that level of mastery.' },
  { week: 31, category: 'wisdom', title: 'On Living Well', source: 'Epicurus', summary: 'Not what we have but what we enjoy constitutes our abundance.', link: 'Recovery has taught you to enjoy simple pleasures again. A sunset, a conversation, a meal — these are true abundance.' },

  { week: 32, category: 'studies', title: 'Neurogenesis in Adult Brains', source: 'Cell Stem Cell, 2019', summary: 'Contrary to old beliefs, adult brains continue generating new neurons, especially in the hippocampus. Exercise, learning, and adequate sleep — all recovery practices — promote this neurogenesis.' },
  { week: 32, category: 'studies', title: 'The Role of Oxytocin in Addiction Recovery', source: 'Pharmacology, Biochemistry and Behavior, 2014', summary: 'Oxytocin reduces cravings and withdrawal symptoms across multiple addictions. Real social connection and physical touch naturally boost oxytocin — making healthy relationships part of the treatment.' },
  { week: 32, category: 'studies', title: 'Self-Determination Theory and Sustained Change', source: 'American Psychologist, 2000', summary: 'Behavior change lasts when it satisfies three psychological needs: autonomy (choice), competence (mastery), and relatedness (connection). Your recovery likely satisfies all three.' },
  { week: 32, category: 'studies', title: 'Pornography and Reduced Workplace Productivity', source: 'Management Science, 2019', summary: 'Studies found that compulsive pornography use predicted reduced workplace engagement, creativity, and productivity. Recovery leads to measurable professional improvements that compound over time.' },
  { week: 32, category: 'studies', title: 'Mindful Self-Compassion', source: 'Clinical Psychology Review, 2015', summary: 'Mindful self-compassion training reduced shame, improved emotional regulation, and decreased addictive behaviors. Three components: self-kindness, common humanity, and mindfulness of suffering.' },

  { week: 32, category: 'testosterone', title: 'Testosterone and Entrepreneurship', source: 'Management Science, 2018', summary: 'Higher testosterone levels are associated with entrepreneurial tendency, risk tolerance, and competitive drive. Your hormonal optimization may be fueling new ambitions and career aspirations.' },
  { week: 32, category: 'testosterone', title: 'Rope Training for Full-Body Stimulus', summary: 'Battle ropes, rope climbing, and heavy rope exercises provide a unique metabolic and hormonal stimulus that combines strength, cardio, and core training in a single modality.' },
  { week: 32, category: 'testosterone', title: 'Adaptogens for Hormonal Support', summary: 'Adaptogenic herbs — ashwagandha, rhodiola, holy basil — help the body adapt to stress by modulating the HPA axis. They support hormonal balance by keeping cortisol in the optimal range.' },
  { week: 32, category: 'testosterone', title: 'Testosterone and Facial Structure', summary: 'Testosterone influences jaw development and facial fat distribution. While bone changes are minimal in adults, reduced facial puffiness and a more defined jawline are commonly reported during recovery.' },
  { week: 32, category: 'testosterone', title: 'The Eight-Month Assessment', summary: 'Eight months in, your hormonal profile is in a completely different place than where it started. Consider getting bloodwork to objectively measure your testosterone, cortisol, and thyroid levels.' },

  { week: 32, category: 'intimacy', title: 'Love Maps: Deepening Knowledge', source: 'Gottman Institute', summary: 'Update your "love map" regularly. People change — their stresses, dreams, preferences, and fears evolve. Stay current with who your partner is becoming, not just who they were.' },
  { week: 32, category: 'intimacy', title: 'The Relationship Reality Check', summary: 'No relationship is perfect. The question is not "Is this relationship perfect?" but "Is this relationship worth the work?" Good relationships require effort. Great ones require great effort.' },
  { week: 32, category: 'intimacy', title: 'Adventure as Relationship Medicine', summary: 'Novel, exciting experiences together rekindle the neurochemistry of new romance. Plan adventures — travel, new activities, challenges — to inject freshness into established relationships.' },
  { week: 32, category: 'intimacy', title: 'Supporting Your Partner\'s Growth', summary: 'The happiest couples actively support each other\'s personal growth and dreams. Be your partner\'s biggest cheerleader, not their biggest critic. Their success is your success.' },
  { week: 32, category: 'intimacy', title: 'Healthy Sexuality as a Practice', summary: 'Sexuality is not a fixed trait — it is a practice that evolves with attention and intention. Approach your sexual life with the same curiosity and care you bring to other important areas of growth.' },

  { week: 32, category: 'wisdom', title: 'On Consciousness', source: 'Aldous Huxley', summary: 'There is only one corner of the universe you can be certain of improving, and that is your own self.', link: 'The only person you can change is yourself. And you are changing magnificently. Eight months of proof.' },
  { week: 32, category: 'wisdom', title: 'On Storms', source: 'Haruki Murakami', summary: 'When you come out of the storm, you won\'t be the same person who walked in. That\'s what the storm is all about.', link: 'Look at who you were 8 months ago. You are not the same person. The storm has transformed you.' },
  { week: 32, category: 'wisdom', title: 'On Small Steps', source: 'Martin Luther King Jr.', summary: 'If you can\'t fly, then run. If you can\'t run, then walk. If you can\'t walk, then crawl. But whatever you do, you have to keep moving forward.', link: 'Some days you fly. Some days you crawl. The direction matters more than the speed. Keep moving forward.' },
  { week: 32, category: 'wisdom', title: 'On Peace of Mind', source: 'Marcus Aurelius', summary: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.', link: 'Happiness is not in the next achievement or the next pleasure. It is in how you think about what you already have.' },
  { week: 32, category: 'wisdom', title: 'On Trust in Process', source: 'Rumi', summary: 'As you start to walk on the way, the way appears.', link: 'You didn\'t see the full path when you started. Now, 8 months in, the way is becoming clearer. Trust the unfolding.' },

  { week: 33, category: 'studies', title: 'The Broaden-and-Build Theory', source: 'American Psychologist, 2001', summary: 'Positive emotions broaden awareness and build psychological resources. Recovery creates an upward spiral: feeling better → thinking more broadly → building resources → feeling even better.' },
  { week: 33, category: 'studies', title: 'Sleep and Emotional Memory Consolidation', source: 'Nature Reviews Neuroscience, 2009', summary: 'Sleep is when the brain consolidates emotional memories and strips them of their charge. Good sleep helps process past trauma and reduce the emotional intensity of triggering memories.' },
  { week: 33, category: 'studies', title: 'Prosocial Spending and Happiness', source: 'Science, 2008', summary: 'Spending money on others produces greater happiness than spending on yourself. This finding extends to time — volunteering produces greater satisfaction than self-focused leisure.' },
  { week: 33, category: 'studies', title: 'The Peak-End Rule', source: 'Psychological Science, 1993', summary: 'We judge experiences by their peak moment and their ending, not their average. Make the peaks of your day intentional — moments of flow, connection, and accomplishment.' },
  { week: 33, category: 'studies', title: 'Exercise as Cognitive Enhancement', source: 'British Journal of Sports Medicine, 2020', summary: 'Aerobic exercise improved executive function, processing speed, and memory in healthy adults. The cognitive benefits rival or exceed those of brain-training apps, with additional physical benefits.' },

  { week: 33, category: 'testosterone', title: 'Testosterone and Bone Mineral Density', source: 'Journal of Clinical Endocrinology & Metabolism, 2017', summary: 'Optimal testosterone levels support bone mineral density and reduce fracture risk. Weight-bearing exercise and adequate calcium and vitamin D work synergistically with testosterone for skeletal health.' },
  { week: 33, category: 'testosterone', title: 'Drop Sets for Metabolic Stress', summary: 'Performing a set to near-failure, immediately reducing weight by 20-30%, and continuing creates intense metabolic stress that triggers growth hormone and testosterone release beyond what straight sets achieve.' },
  { week: 33, category: 'testosterone', title: 'Testosterone and Pain Tolerance', summary: 'Healthy testosterone levels are associated with higher pain tolerance and faster recovery from injury. This may partially explain the increased physical resilience that many men report during recovery.' },
  { week: 33, category: 'testosterone', title: 'Optimal Macronutrient Ratios', summary: 'For testosterone optimization: 30-35% calories from fat, 30-35% from protein, 30-40% from carbohydrates. Extreme low-fat or low-carb diets can both suppress testosterone — balance is key.' },
  { week: 33, category: 'testosterone', title: 'The Importance of Recovery Weeks', summary: 'Planned deload weeks (every 4-6 weeks of training) allow the endocrine system to fully recover. Short-term reduction in training stress often leads to greater testosterone levels upon resumption.' },

  { week: 33, category: 'intimacy', title: 'Trust as a Renewable Resource', summary: 'Trust is not a fixed quantity. It is built and rebuilt through daily actions. Even trust that has been damaged can be restored through consistent, honest, reliable behavior over time.' },
  { week: 33, category: 'intimacy', title: 'The Influence of Family of Origin', summary: 'Your parents\' relationship modeled what "normal" intimacy looks like. Understanding how your family of origin shaped your expectations helps you consciously choose which patterns to keep and which to change.' },
  { week: 33, category: 'intimacy', title: 'Cultivating Patience in Love', summary: 'Deep love takes time to develop. The cultural emphasis on instant connection and chemistry ignores the richest form of love — the kind that grows slowly, rooted in shared experience and earned trust.' },
  { week: 33, category: 'intimacy', title: 'The Beauty of Routine', summary: 'The daily routines of life together — cooking, cleaning, errands — can be sources of connection rather than drudgery. Approach the mundane with presence, and it becomes sacred.' },
  { week: 33, category: 'intimacy', title: 'Mature Sexuality', summary: 'Mature sexuality is not about peak performance or novelty. It is about depth, connection, playfulness, and genuine pleasure. Your recovered sexuality is more mature and more satisfying than anything pornography offered.' },

  { week: 33, category: 'wisdom', title: 'On Depth', source: 'Rumi', summary: 'Don\'t be satisfied with stories, how things have gone with others. Unfold your own myth.', link: 'Your recovery story is uniquely yours. Don\'t compare it to anyone else\'s. Write your own mythology of transformation.' },
  { week: 33, category: 'wisdom', title: 'On Power', source: 'Lao Tzu', summary: 'Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.', link: 'Eight months of self-mastery. You possess a form of power that no external force can take away.' },
  { week: 33, category: 'wisdom', title: 'On Influence', source: 'Albert Schweitzer', summary: 'Example is not the main thing in influencing others. It is the only thing.', link: 'Your recovery speaks louder than any words. The people around you are influenced by who you are becoming, whether they know the details or not.' },
  { week: 33, category: 'wisdom', title: 'On Flow', source: 'Mihaly Csikszentmihalyi', summary: 'The best moments in our lives are not passive, receptive, relaxing times. The best moments usually occur when a person\'s body or mind is stretched to its limits in a voluntary effort to accomplish something.', link: 'Seek challenge, not comfort. Flow, not numbness. That is where life\'s best moments live.' },
  { week: 33, category: 'wisdom', title: 'On Kindness to Self', source: 'Pema Chodron', summary: 'Compassion for others begins with kindness to ourselves.', link: 'Be gentle with yourself today. You are doing something extraordinarily difficult. Self-compassion is not weakness — it is the fuel for sustained effort.' },

  { week: 34, category: 'studies', title: 'Digital Well-Being and Intentional Use', source: 'Computers in Human Behavior, 2020', summary: 'Intentional technology use — defined purpose before picking up a device — significantly improved well-being compared to habitual, mindless use. Purpose-driven tech use prevents slipping into harmful patterns.' },
  { week: 34, category: 'studies', title: 'The Science of Savoring', source: 'Journal of Positive Psychology, 2012', summary: 'Savoring — deliberately attending to and appreciating positive experiences — increases happiness and life satisfaction. It is the opposite of the hedonic treadmill that addiction creates.' },
  { week: 34, category: 'studies', title: 'Forgiveness and Physical Health', source: 'Journal of Behavioral Medicine, 2005', summary: 'Forgiveness — of self and others — was associated with lower blood pressure, reduced pain, improved sleep, and better immune function. Holding grudges is literally toxic to your body.' },
  { week: 34, category: 'studies', title: 'Solitude vs. Loneliness', source: 'Personality and Social Psychology Bulletin, 2017', summary: 'Chosen solitude increases creativity, self-awareness, and emotional regulation. Unwanted loneliness triggers stress responses and addictive behavior. The key is choice — solitude is an asset; loneliness is a risk.' },
  { week: 34, category: 'studies', title: 'The Hedonic Treadmill and Set Point Theory', source: 'Review of General Psychology, 2006', summary: 'People adapt to positive and negative changes, returning to a baseline happiness. But some changes — including overcoming addiction — produce lasting improvements that raise the baseline itself.' },

  { week: 34, category: 'testosterone', title: 'Testosterone and Social Status', source: 'Hormones and Behavior, 2015', summary: 'Testosterone rises in response to increases in social status — promotions, public recognition, competitive victories. Your growing confidence in recovery creates a positive social-hormonal feedback loop.' },
  { week: 34, category: 'testosterone', title: 'Anti-Estrogenic Foods', summary: 'Cruciferous vegetables (broccoli, cauliflower, kale), mushrooms, green tea, and citrus fruits naturally support estrogen metabolism, helping maintain an optimal testosterone-to-estrogen ratio.' },
  { week: 34, category: 'testosterone', title: 'Isometric Holds for Strength', summary: 'Holding heavy weights at specific joint angles (isometric training) builds incredible strength and can stimulate hormonal responses. Try 10-20 second holds at the sticking point of your weakest lifts.' },
  { week: 34, category: 'testosterone', title: 'Testosterone and Sleep Stages', summary: 'Testosterone production is concentrated in specific sleep stages: 60% occurs during deep sleep (stages 3-4) and increases during REM sleep. Sleep quality matters as much as duration.' },
  { week: 34, category: 'testosterone', title: 'The Importance of Recovery Nutrition', summary: 'Post-workout nutrition (protein + carbs within 60 minutes) not only supports muscle recovery but also modulates the cortisol response, preserving the testosterone elevation from training.' },

  { week: 34, category: 'intimacy', title: 'Growing Together vs. Growing Apart', summary: 'Couples either grow together or grow apart — there is no standing still. Intentionally sharing your growth, including your recovery journey, ensures you grow in the same direction.' },
  { week: 34, category: 'intimacy', title: 'The Language of Touch', summary: 'Different touches communicate different messages: a hand on the back (support), fingers through hair (tenderness), firm embrace (protection), gentle hand squeeze (presence). Learn your partner\'s touch language.' },
  { week: 34, category: 'intimacy', title: 'Boundaries With Technology in Bed', summary: 'The bedroom should be a sanctuary for sleep and intimacy. Removing screens from the bedroom protects both sleep quality and relational connection. This single change often transforms relationships.' },
  { week: 34, category: 'intimacy', title: 'Authentic Masculinity and Vulnerability', summary: 'True masculinity is not the absence of emotion — it is the strength to feel deeply while maintaining integrity. The most attractive quality in a man is emotional authenticity, not emotional suppression.' },
  { week: 34, category: 'intimacy', title: 'The Second Wind of Passion', summary: 'Many couples experience a "second wind" of passion and connection when one or both partners commit to recovery and growth. The relationship you thought was fading may be about to transform.' },

  { week: 34, category: 'wisdom', title: 'On Wealth', source: 'Seneca', summary: 'It is not the man who has too little, but the man who craves more, that is poor.', link: 'True wealth is contentment with what you have. Recovery has taught you this. You need less than you thought to be happy.' },
  { week: 34, category: 'wisdom', title: 'On Change', source: 'Heraclitus', summary: 'The only constant in life is change.', link: 'You have changed profoundly over eight months. Change will continue. Embrace it as the natural rhythm of a life fully lived.' },
  { week: 34, category: 'wisdom', title: 'On Giving', source: 'Winston Churchill', summary: 'We make a living by what we get, but we make a life by what we give.', link: 'What are you giving through your recovery? Presence to loved ones. Example to those who struggle. A better version of yourself to the world.' },
  { week: 34, category: 'wisdom', title: 'On Vision', source: 'Helen Keller', summary: 'The only thing worse than being blind is having sight but no vision.', link: 'You have sight and vision now. You can see where you\'ve been and where you\'re going. Never lose that clarity.' },
  { week: 34, category: 'wisdom', title: 'On Joy', source: 'C.S. Lewis', summary: 'Joy is the serious business of heaven.', link: 'Recovery is not meant to be grim endurance. Find joy in your freedom. In your clarity. In your relationships. Joy is the goal.' },

  { week: 35, category: 'studies', title: 'Compassion Fatigue and Recovery', source: 'Professional Psychology, 2002', summary: 'Long-term recovery can sometimes lead to compassion fatigue — exhaustion from sustained emotional effort. Regular self-care, boundaries, and professional support prevent burnout in recovery.' },
  { week: 35, category: 'studies', title: 'Psychological Flexibility', source: 'Journal of Contextual Behavioral Science, 2016', summary: 'Psychological flexibility — the ability to be present, accept difficult experiences, and act on values — is the single strongest predictor of mental health and recovery success. It can be trained.' },
  { week: 35, category: 'studies', title: 'The Neuroscience of Gratitude', source: 'Psychotherapy Research, 2016', summary: 'Gratitude practice physically changes the brain, increasing activity in the medial prefrontal cortex and enhancing sensitivity to future experiences of gratitude. The practice rewires your default perspective.' },
  { week: 35, category: 'studies', title: 'Post-Acute Withdrawal Syndrome', source: 'Substance Abuse Treatment, Prevention, and Policy, 2010', summary: 'PAWS — waves of mild withdrawal symptoms months after quitting — is normal and expected. Symptoms include mood swings, sleep issues, and brief craving spikes. They diminish over 12-24 months.' },
  { week: 35, category: 'studies', title: 'Identity Consolidation', source: 'Developmental Psychology, 2019', summary: 'At 8+ months, your new identity as someone in recovery is consolidating. This identity becomes self-reinforcing — choices align with who you believe you are rather than requiring constant willpower.' },

  { week: 35, category: 'testosterone', title: 'Resveratrol and Aromatase', summary: 'Resveratrol (found in red grapes, berries, and peanuts) acts as a mild aromatase inhibitor, reducing the conversion of testosterone to estrogen. Quality matters — choose whole food sources.' },
  { week: 35, category: 'testosterone', title: 'The Benefits of Swimming', summary: 'Swimming provides resistance training through water, cardiovascular benefits, and low-impact joint protection. Cold water swimming adds hormonal benefits from cold exposure.' },
  { week: 35, category: 'testosterone', title: 'Testosterone and Insulin Sensitivity', source: 'Diabetes Care, 2004', summary: 'Testosterone improves insulin sensitivity, helping the body use glucose more efficiently. This connection explains why hormonal optimization often improves body composition even without dietary changes.' },
  { week: 35, category: 'testosterone', title: 'Seasonal Testosterone Variations', summary: 'Testosterone naturally peaks in late fall and drops in spring, likely due to light exposure patterns. Being aware of seasonal fluctuations prevents misinterpreting normal cycles as recovery problems.' },
  { week: 35, category: 'testosterone', title: 'Eight-Month Hormonal Confidence', summary: 'At this stage, your hormonal optimization should feel automatic. The habits are embedded, the benefits are sustained, and you are operating from a position of hormonal strength that you can maintain for life.' },

  { week: 35, category: 'intimacy', title: 'The Role of Gratitude in Relationships', source: 'Personal Relationships, 2010', summary: 'Partners who regularly express gratitude report higher relationship satisfaction, greater commitment, and more willingness to voice concerns. Gratitude creates a safe foundation for honest communication.' },
  { week: 35, category: 'intimacy', title: 'Navigating Different Attachment Styles Together', summary: 'If you and your partner have different attachment styles, understanding the dynamic creates compassion. An anxious person needs reassurance; an avoidant person needs space. Both need awareness.' },
  { week: 35, category: 'intimacy', title: 'Intimacy Beyond the Physical', summary: 'The deepest forms of intimacy are intellectual (sharing ideas), emotional (sharing feelings), experiential (sharing adventures), and spiritual (sharing meaning). Physical intimacy is enhanced by all four.' },
  { week: 35, category: 'intimacy', title: 'The Two-Way Mirror of Love', summary: 'Your partner reflects parts of yourself back to you. The qualities you love in them often exist in you. The qualities that frustrate you often mirror your own shadows. Relationships are mirrors for growth.' },
  { week: 35, category: 'intimacy', title: 'Love as a Decision', summary: 'Love begins as a feeling but continues as a decision. Choosing to love — especially on difficult days — is the essence of commitment. You are choosing your partner every single day.' },

  { week: 35, category: 'wisdom', title: 'On Being Present', source: 'Thich Nhat Hanh', summary: 'Life is available only in the present moment.', link: 'This moment is all you have. Not the pornography-free future. Not the addicted past. This breath. This moment. Live it fully.' },
  { week: 35, category: 'wisdom', title: 'On Persistence', source: 'Winston Churchill', summary: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', link: 'Neither your successes nor your struggles define you permanently. What defines you is your continued choice to show up.' },
  { week: 35, category: 'wisdom', title: 'On Letting Go', source: 'Joseph Campbell', summary: 'We must be willing to let go of the life we planned so as to have the life that is waiting for us.', link: 'The life you planned might have included pornography as a permanent fixture. The life waiting for you is so much more.' },
  { week: 35, category: 'wisdom', title: 'On Greatness', source: 'Nelson Mandela', summary: 'It always seems impossible until it is done.', link: '365 days seemed impossible at the beginning. Now you are 8 months in. The impossible becomes inevitable through daily action.' },
  { week: 35, category: 'wisdom', title: 'On the Inner Light', source: 'Marianne Williamson', summary: 'Our deepest fear is not that we are inadequate. Our deepest fear is that we are powerful beyond measure.', link: 'You are more powerful than your addiction ever was. Step into that power fully. It has always been yours.' },

  { week: 36, category: 'studies', title: 'Pornography and Objectification Theory', source: 'Sex Roles, 2018', summary: 'Objectification theory explains how pornography trains viewers to see people as objects for use rather than subjects with inner lives. Recovery restores the ability to see full human beings.' },
  { week: 36, category: 'studies', title: 'Media Literacy as Prevention', source: 'Journal of Health Communication, 2019', summary: 'Critical media literacy — understanding how digital content is produced, curated, and designed to manipulate — provides cognitive armor against both pornography and other digital manipulation.' },
  { week: 36, category: 'studies', title: 'Social Contagion of Behavior', source: 'New England Journal of Medicine, 2007', summary: 'Health behaviors spread through social networks like contagion. Your recovery influences approximately 3 degrees of social connection — friends, friends of friends, and beyond. You are a positive contagion.' },
  { week: 36, category: 'studies', title: 'The Psychology of Temptation', source: 'Personality and Social Psychology Review, 2012', summary: 'Temptation is strongest when we are: tired, hungry, lonely, stressed, or bored (THLSB). Proactively managing these states is more effective than resisting temptation after it strikes.' },
  { week: 36, category: 'studies', title: 'Growth Mindset and Recovery', source: 'Psychological Science, 2014', summary: 'Believing that addiction is changeable (growth mindset) vs. fixed (fixed mindset) significantly predicted recovery success. Your belief in your ability to change literally changes your ability to change.' },

  { week: 36, category: 'testosterone', title: 'BCAAs and Workout Performance', summary: 'Branched-chain amino acids (leucine, isoleucine, valine) reduce exercise-induced cortisol and support muscle protein synthesis, creating a more favorable hormonal environment during and after training.' },
  { week: 36, category: 'testosterone', title: 'Testosterone and Leadership', summary: 'Optimal testosterone is associated with assertive but not aggressive leadership. The calm confidence of hormonal balance makes you naturally more effective in leadership roles at work and in relationships.' },
  { week: 36, category: 'testosterone', title: 'Heavy Bag Training', summary: 'Heavy bag work combines explosive power, cardiovascular conditioning, and stress relief. The primal satisfaction of striking produces a unique hormonal cocktail of testosterone, adrenaline, and endorphins.' },
  { week: 36, category: 'testosterone', title: 'The Role of Selenium', summary: 'Selenium is essential for testicular health and sperm production. Just 55mcg daily (one Brazil nut) is sufficient. Excess selenium can be harmful — more is not better with this mineral.' },
  { week: 36, category: 'testosterone', title: 'Nine-Month Hormonal Legacy', summary: 'At 9 months, your hormonal legacy is being written in your body composition, energy levels, confidence, and daily performance. These changes are the living evidence of your commitment to recovery.' },

  { week: 36, category: 'intimacy', title: 'The Joy of Being Known', summary: 'The deepest human desire is to be fully known and fully loved. Pornography offers the illusion of intimacy without the risk of being known. Real love requires letting someone truly see you.' },
  { week: 36, category: 'intimacy', title: 'Managing Expectations in Relationships', summary: 'Unrealistic expectations are the number one source of relationship disappointment. Expect effort, not perfection. Expect growth, not completion. Expect partnership, not mind-reading.' },
  { week: 36, category: 'intimacy', title: 'The Gift of Acceptance', summary: 'Accepting your partner as they are — not as you wish they were — is the foundation of unconditional love. Acceptance does not mean approval of everything. It means loving the whole person.' },
  { week: 36, category: 'intimacy', title: 'Sexual Communication Skills', summary: 'The ability to talk about sex — desires, boundaries, preferences, concerns — openly and without shame is the hallmark of a healthy intimate relationship. Practice makes this easier over time.' },
  { week: 36, category: 'intimacy', title: 'Building a Relationship That Lasts', summary: 'Lasting relationships are built on four pillars: commitment (staying), communication (understanding), compassion (caring), and continued growth (evolving). Strengthen all four daily.' },

  { week: 36, category: 'wisdom', title: 'On the Long View', source: 'Chinese Proverb', summary: 'A diamond is a chunk of coal that did well under pressure.', link: 'The pressure of recovery is transforming you. You are becoming harder, more brilliant, more valuable with every day that passes.' },
  { week: 36, category: 'wisdom', title: 'On Authenticity', source: 'Oscar Wilde', summary: 'Be yourself; everyone else is already taken.', link: 'Who are you without pornography? You are finally discovering your authentic self. This person is more interesting than any fantasy.' },
  { week: 36, category: 'wisdom', title: 'On Maturity', source: 'Rollo May', summary: 'The opposite of courage in our society is not cowardice — it is conformity.', link: 'Going against the cultural current — choosing restraint in a world of excess — is the most courageous form of nonconformity.' },
  { week: 36, category: 'wisdom', title: 'On Character', source: 'Abraham Lincoln', summary: 'Nearly all men can stand adversity, but if you want to test a man\'s character, give him power.', link: 'You now have power over your urges. That power reveals your character. Use it wisely and with humility.' },
  { week: 36, category: 'wisdom', title: 'On Finishing', source: 'Jesse Owens', summary: 'The battles that count aren\'t the ones for gold medals. The struggles within yourself — the invisible, inevitable battles inside all of us — that\'s where it\'s at.', link: 'Your battle is invisible to the world but its impact is visible in everything you do. Keep fighting the invisible fight.' },

  { week: 37, category: 'studies', title: 'Pornography and Political Attitudes', source: 'Political Behavior, 2019', summary: 'Research found that pornography consumption was associated with decreased civic engagement and political participation. Recovery restores engagement with the broader world beyond self-focused gratification.' },
  { week: 37, category: 'studies', title: 'Heart Coherence and Self-Regulation', source: 'Global Advances in Health and Medicine, 2014', summary: 'Heart coherence — achieved through rhythmic breathing and positive emotion — improves self-regulation, emotional stability, and cognitive performance. HeartMath techniques are evidence-based tools for recovery.' },
  { week: 37, category: 'studies', title: 'The Plateau Effect in Recovery', source: 'Addiction Research & Theory, 2018', summary: 'Recovery often follows a curve of rapid improvement, plateau, and renewed growth. Plateaus are not stagnation — they are consolidation periods where the brain integrates changes. Be patient through them.' },
  { week: 37, category: 'studies', title: 'Creativity and Dopamine Recovery', source: 'Thinking Skills and Creativity, 2019', summary: 'As dopamine systems normalize during recovery, creative thinking improves measurably. Many men in long-term recovery report a creative renaissance — pursuing art, music, writing, or innovation.' },
  { week: 37, category: 'studies', title: 'The Biology of Hope', source: 'JAMA Psychiatry, 2018', summary: 'Hope — the belief in positive future outcomes — has measurable biological effects: reduced cortisol, improved immune function, and enhanced prefrontal cortex activity. Hope is not just psychological; it is physiological.' },

  { week: 37, category: 'testosterone', title: 'Testosterone and Memory', summary: 'Optimal testosterone levels support hippocampal function, improving memory consolidation and recall. The "mental clarity" often reported during recovery is partially explained by this hormonal-cognitive connection.' },
  { week: 37, category: 'testosterone', title: 'Kettlebell Training', summary: 'Kettlebell swings, cleans, and snatches combine strength and cardio in a unique way that produces strong hormonal responses. A 20-minute kettlebell session can match the hormonal output of a 45-minute gym session.' },
  { week: 37, category: 'testosterone', title: 'Vitamin E as Antioxidant Protection', summary: 'Vitamin E protects testosterone-producing cells from oxidative damage. Natural sources (almonds, sunflower seeds, spinach) are preferred over supplements. Focus on mixed tocopherols, not just alpha-tocopherol.' },
  { week: 37, category: 'testosterone', title: 'Testosterone and Music Production', summary: 'Creating music — playing instruments, singing, composing — has been shown to increase testosterone, particularly when performed with others. Group music-making combines creativity, social bonding, and hormonal benefits.' },
  { week: 37, category: 'testosterone', title: 'The Maintenance Phase', summary: 'At 9+ months, you are in the hormonal maintenance phase. The goal shifts from optimization to sustainability. The habits that brought you here are the habits that will sustain you indefinitely.' },

  { week: 37, category: 'intimacy', title: 'Intimacy in Difficult Times', summary: 'How couples handle adversity — illness, job loss, grief — often determines the long-term health of the relationship. Drawing closer during difficulty, rather than retreating, builds unbreakable bonds.' },
  { week: 37, category: 'intimacy', title: 'The Practice of Non-Judgment', summary: 'Approaching your partner\'s thoughts, feelings, and behaviors with curiosity rather than judgment creates the safety necessary for authentic intimacy. Replace "why would you..." with "help me understand..."' },
  { week: 37, category: 'intimacy', title: 'Love and Independence', summary: 'The healthiest relationships consist of two independent people who choose interdependence. Needing someone and choosing someone are fundamentally different experiences. Choose from strength, not need.' },
  { week: 37, category: 'intimacy', title: 'The Evolution of Physical Intimacy', summary: 'At 9 months of recovery, your physical intimacy has likely evolved significantly — more present, more emotionally connected, more naturally responsive. This is what intimacy was always meant to feel like.' },
  { week: 37, category: 'intimacy', title: 'Creating Relationship Traditions', summary: 'Annual traditions — a special date, a trip, a shared activity — create anticipated experiences that bond couples through shared memory. These traditions become the story of your relationship.' },

  { week: 37, category: 'wisdom', title: 'On Discipline', source: 'Miyamoto Musashi', summary: 'Think lightly of yourself and deeply of the world.', link: 'True discipline is not about self-obsession but about contributing to something larger than yourself. Your recovery serves the world.' },
  { week: 37, category: 'wisdom', title: 'On Perseverance', source: 'Japanese Proverb', summary: 'Even monkeys fall from trees.', link: 'Even masters stumble sometimes. A momentary difficulty does not define your entire journey. Pick up and continue.' },
  { week: 37, category: 'wisdom', title: 'On Clarity', source: 'Blaise Pascal', summary: 'I have made this letter longer than usual because I lack the time to make it shorter.', link: 'Recovery brings clarity. You see more clearly what matters and what doesn\'t. Your life is becoming more focused and purposeful.' },
  { week: 37, category: 'wisdom', title: 'On Adventure', source: 'Helen Keller', summary: 'Life is either a daring adventure or nothing at all.', link: 'Recovery opened the door to real adventure. Not the false adventure of novelty-seeking on a screen, but the real adventure of living fully.' },
  { week: 37, category: 'wisdom', title: 'On Roots and Wings', source: 'Jonas Salk', summary: 'The reward for work well done is the opportunity to do more.', link: 'Your reward for 9 months of recovery is the opportunity to live the next 9 months even more fully. The reward IS the journey.' },

  { week: 38, category: 'studies', title: 'Neuroplasticity Throughout the Lifespan', source: 'Annual Review of Psychology, 2019', summary: 'The brain remains plastic throughout life. No matter how long you used pornography, your brain can form new pathways and weaken old ones. Age is not a barrier to recovery.' },
  { week: 38, category: 'studies', title: 'The Social Cure', source: 'The Lancet, 2010', summary: 'Social group membership is a stronger predictor of health outcomes than individual lifestyle factors. Belonging to supportive communities — including recovery communities — is literally life-extending.' },
  { week: 38, category: 'studies', title: 'Awe Walks and Brain Health', source: 'Emotion, 2020', summary: 'Weekly "awe walks" — walks where you deliberately notice things that inspire wonder — improved mood, reduced stress, and increased prosocial emotions more than regular walks.' },
  { week: 38, category: 'studies', title: 'Pornography Cessation and Brain Connectivity', source: 'Frontiers in Behavioral Neuroscience, 2019', summary: 'Long-term abstinence from compulsive sexual behavior showed improved connectivity between the prefrontal cortex and reward regions — the neural signature of restored self-control.' },
  { week: 38, category: 'studies', title: 'Meaning-Making and Trauma Recovery', source: 'Psychological Trauma, 2018', summary: 'The ability to find meaning in difficult experiences is the strongest predictor of post-traumatic growth. Your recovery story — when you can narrate it meaningfully — becomes a source of strength.' },

  { week: 38, category: 'testosterone', title: 'Testosterone and Longevity', source: 'Journal of Clinical Endocrinology & Metabolism, 2008', summary: 'Men with optimal (not excessive) testosterone levels show reduced all-cause mortality. The lifestyle habits that support testosterone — exercise, sleep, nutrition, stress management — also support longevity.' },
  { week: 38, category: 'testosterone', title: 'Trail Running Benefits', summary: 'Trail running combines the hormonal benefits of running with the cognitive demands of navigating uneven terrain and the stress-reducing effects of nature exposure. It is a triple-benefit activity.' },
  { week: 38, category: 'testosterone', title: 'Zinc Picolinate Absorption', summary: 'Zinc picolinate is the most bioavailable supplemental form of zinc. If you supplement, 15-30mg daily with food is sufficient. Excess zinc depletes copper, so balance is important.' },
  { week: 38, category: 'testosterone', title: 'Testosterone and Collagen Production', summary: 'Testosterone supports collagen synthesis, affecting skin elasticity, joint health, and connective tissue strength. Men in recovery often notice improved skin quality and reduced joint discomfort.' },
  { week: 38, category: 'testosterone', title: 'The Lifestyle as Protocol', summary: 'By now, testosterone optimization is not something you do — it is how you live. Your sleep, exercise, nutrition, and stress management are integrated into a lifestyle that naturally supports hormonal health.' },

  { week: 38, category: 'intimacy', title: 'Teaching and Learning in Relationships', summary: 'Healthy couples teach each other constantly — about themselves, about life, about new perspectives. Remain a student of your partner. There is always more to learn about the person you love.' },
  { week: 38, category: 'intimacy', title: 'The Third Entity', summary: 'A relationship is not just two people — it is a third entity: the relationship itself. Nurture it as you would a living thing. It needs feeding, attention, and care to thrive.' },
  { week: 38, category: 'intimacy', title: 'Recovery as a Relationship Gift', summary: 'Your recovery is one of the greatest gifts you can give your partner and your relationship. It says: I value us more than a momentary impulse. I choose you. I choose us.' },
  { week: 38, category: 'intimacy', title: 'The Importance of Play in Adult Life', summary: 'Play is not just for children. Playful couples are happier, more resilient, and more sexually satisfied. Find ways to be silly, spontaneous, and fun together. Laughter is intimacy.' },
  { week: 38, category: 'intimacy', title: 'Nine Months: A New Birth', summary: 'Nine months — the same duration as a human pregnancy. You have been gestating a new self. This new version of you is ready to engage with intimacy at a level you never could before.' },

  { week: 38, category: 'wisdom', title: 'On Rebirth', summary: 'Nine months. The time it takes to create new life. You have been reborn through this process — not suddenly, but gradually, cell by cell, choice by choice.', link: 'The person who started this journey is not the person reading this now. You have been transformed from the inside out.' },
  { week: 38, category: 'wisdom', title: 'On Completion', source: 'Mary Oliver', summary: 'Tell me, what is it you plan to do with your one wild and precious life?', link: 'You have reclaimed your life from addiction. Now — what will you do with this wild and precious freedom?' },
  { week: 38, category: 'wisdom', title: 'On Excellence', source: 'Aristotle', summary: 'Quality is not an act, it is a habit.', link: 'Excellence in recovery is not a single heroic moment. It is the habit of making good choices, day after day after day.' },
  { week: 38, category: 'wisdom', title: 'On Nature', source: 'Ralph Waldo Emerson', summary: 'In the woods, we return to reason and faith.', link: 'Nature has been your ally in this recovery. The quiet strength of the natural world reflects the quiet strength you have built within.' },
  { week: 38, category: 'wisdom', title: 'On Self', source: 'Rumi', summary: 'You are not a drop in the ocean. You are the entire ocean in a drop.', link: 'You contain infinite depth and power. Recovery has helped you access just a fraction of what you are capable of. There is so much more.' },

  { week: 39, category: 'studies', title: 'Pornography and Social Isolation Cycle', source: 'Cyberpsychology, Behavior, 2020', summary: 'A large-scale study confirmed the bidirectional relationship: pornography increases social isolation, and isolation increases pornography use. Breaking one side breaks the entire cycle.' },
  { week: 39, category: 'studies', title: 'Interoception and Emotional Intelligence', source: 'Biological Psychology, 2019', summary: 'Interoception — awareness of internal body signals — is impaired in addiction and improves with recovery. Better interoception means better emotional intelligence and earlier detection of urge signals.' },
  { week: 39, category: 'studies', title: 'The Importance of Narrative Identity', source: 'Personality and Social Psychology Review, 2011', summary: 'People who construct coherent, redemptive life narratives — making meaning from difficulty — show better mental health and greater resilience. Your recovery story is your redemptive narrative.' },
  { week: 39, category: 'studies', title: 'Ten-Month Brain Recovery', source: 'Biological Psychiatry, 2020', summary: 'At 10 months, neuroimaging studies show near-complete normalization of reward circuit function. The brain\'s response to natural rewards has been fully restored in most recovery contexts.' },
  { week: 39, category: 'studies', title: 'Purpose and Physical Health', source: 'JAMA Network Open, 2019', summary: 'Having a strong sense of purpose was associated with a 15% reduction in all-cause mortality. Your recovery purpose may be extending your life in measurable ways.' },

  { week: 39, category: 'testosterone', title: 'Testosterone and Assertiveness', summary: 'Optimal testosterone promotes healthy assertiveness — the ability to express your needs and boundaries clearly without aggression. This is one of the most valued social skills in both personal and professional life.' },
  { week: 39, category: 'testosterone', title: 'Rock Climbing for Full-Body Challenge', summary: 'Rock climbing engages every muscle group, requires problem-solving, builds mental toughness, and produces a robust hormonal response. Indoor climbing is accessible year-round.' },
  { week: 39, category: 'testosterone', title: 'Taurine for Heart and Hormonal Health', summary: 'Taurine supports cardiovascular function, bile acid conjugation, and may protect Leydig cells from oxidative damage. Found in meat and fish, or available as an affordable supplement (1-3g daily).' },
  { week: 39, category: 'testosterone', title: 'The Annual Hormonal Review', summary: 'As you approach one year of recovery, consider comprehensive bloodwork: total and free testosterone, SHBG, estradiol, DHEA-S, cortisol, thyroid panel. This establishes your recovered baseline.' },
  { week: 39, category: 'testosterone', title: 'Legacy of Hormonal Health', summary: 'The hormonal health you\'ve built over these months is not just for you. It affects how you show up in every relationship, every challenge, every opportunity. Your vitality inspires others.' },

  { week: 39, category: 'intimacy', title: 'Love After Addiction', summary: 'Love after addiction has a quality that love before addiction lacked — depth, gratitude, intentionality. You know the cost of disconnection, which makes you cherish connection more deeply.' },
  { week: 39, category: 'intimacy', title: 'The Practice of Benediction', summary: 'Benediction means "speaking well of." Make it a practice to speak well of your partner — to their face and to others. Words of affirmation, spoken consistently, transform relationships.' },
  { week: 39, category: 'intimacy', title: 'Navigating Life Transitions Together', summary: 'Career changes, moves, parenthood, loss — life transitions test relationships. Partners who communicate openly, support flexibility, and maintain connection through change emerge stronger together.' },
  { week: 39, category: 'intimacy', title: 'The Myth of the Perfect Partner', summary: 'No one person can meet all your needs. Having friends, family, hobbies, and a support community takes pressure off your romantic relationship and allows it to thrive in its proper domain.' },
  { week: 39, category: 'intimacy', title: 'Intimacy as Courage', summary: 'True intimacy requires courage — the courage to be seen, to be vulnerable, to risk rejection. Every act of genuine intimacy is an act of bravery. You are braver than you know.' },

  { week: 39, category: 'wisdom', title: 'On Mortality', source: 'Steve Jobs', summary: 'Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.', link: 'Life is finite. Every day matters. You have nothing to lose by living fully and freely.' },
  { week: 39, category: 'wisdom', title: 'On Service', source: 'Mahatma Gandhi', summary: 'The best way to find yourself is to lose yourself in the service of others.', link: 'Serve others. Your experience makes you uniquely qualified to help those earlier in their recovery journey.' },
  { week: 39, category: 'wisdom', title: 'On Impermanence', source: 'Marcus Aurelius', summary: 'Loss is nothing else but change, and change is nature\'s delight.', link: 'What you lost — the numbing, the escape, the artificial stimulation — was never truly yours to begin with. What you gained is real.' },
  { week: 39, category: 'wisdom', title: 'On Home', source: 'Rumi', summary: 'Stop acting so small. You are the universe in ecstatic motion.', link: 'Stop defining yourself by an addiction. You are vast, complex, and magnificent. Act accordingly.' },
  { week: 39, category: 'wisdom', title: 'On the Three-Quarter Mark', summary: 'You are 75% of the way through your 365-day journey. Three quarters of a year of choosing freedom. The finish line is visible now. Sprint toward it.', link: 'Look how far you have come. The person who started would be amazed at who you are today. Keep going.' },


  // ===== WEEKS 40-52: THE FINAL STRETCH =====

  { week: 40, category: 'studies', title: 'Long-Term Recovery and Relationship Quality', source: 'Journal of Sex & Marital Therapy, 2020', summary: 'Couples where one partner sustained recovery for 10+ months reported relationship quality improvements that surpassed pre-addiction levels, suggesting recovery can be a catalyst for growth.' },
  { week: 40, category: 'studies', title: 'Sustained Attention Recovery', source: 'Neuropsychology, 2020', summary: 'At 10 months, sustained attention capacity — the ability to focus on one task for extended periods — shows near-complete recovery. The brain can now engage deeply without craving interruption.' },
  { week: 40, category: 'studies', title: 'Expressive Writing and Immune Function', source: 'Psychosomatic Medicine, 1999', summary: 'Writing about emotional experiences for 15-20 minutes daily for 4 days improved immune function for 6 months. Expressive writing is a free, evidence-based tool for processing the emotional complexity of recovery.' },
  { week: 40, category: 'studies', title: 'The Role of Acceptance in Sustained Change', source: 'Behaviour Research and Therapy, 2019', summary: 'Acceptance — of urges, of past mistakes, of imperfect progress — predicted sustained behavioral change better than avoidance or suppression strategies. Accept, don\'t fight.' },
  { week: 40, category: 'studies', title: 'Positive Aging and Brain Health', source: 'Frontiers in Aging Neuroscience, 2020', summary: 'Lifestyle factors that support brain health — exactly the practices of recovery — reduce age-related cognitive decline. Your recovery habits are an investment in cognitive longevity.' },

  { week: 40, category: 'testosterone', title: 'Testosterone and Aging Gracefully', summary: 'Testosterone naturally declines ~1% per year after 30. The lifestyle foundation you\'ve built during recovery — exercise, nutrition, sleep, stress management — significantly slows this decline.' },
  { week: 40, category: 'testosterone', title: 'Boxing and Combat Sports', summary: 'Combat sports combine intense physical training with competitive drive, producing powerful testosterone responses. Even bag work and pad drills without sparring provide significant hormonal benefits.' },
  { week: 40, category: 'testosterone', title: 'Tart Cherry for Sleep Enhancement', summary: 'Tart cherry concentrate is one of the few natural foods that contains melatonin. A serving before bed improves sleep onset and duration, indirectly supporting nocturnal testosterone production.' },
  { week: 40, category: 'testosterone', title: 'Testosterone and Vocal Confidence', summary: 'Optimal testosterone levels influence not just voice depth but also speech patterns — increased confidence, reduced filler words, and more assertive communication style. Your voice reflects your hormonal health.' },
  { week: 40, category: 'testosterone', title: 'Ten-Month Hormonal Wisdom', summary: 'At 10 months, you possess hormonal wisdom — you know what works for your body, what doesn\'t, and how to maintain balance. Trust your experience. You are your own best expert now.' },

  { week: 40, category: 'intimacy', title: 'The Deepening', summary: 'At 10 months of recovery, you have the capacity for intimacy that was previously impossible. The depth of connection available to you now — emotional, physical, spiritual — is the reward for your perseverance.' },
  { week: 40, category: 'intimacy', title: 'Navigating Triggers in Intimate Moments', summary: 'Sometimes intimate moments may trigger old associations. When this happens, gently return to the present — feel your partner\'s skin, look into their eyes, breathe together. Presence is the antidote to flashbacks.' },
  { week: 40, category: 'intimacy', title: 'The Role of Generosity in Love', summary: 'The most satisfying relationships are characterized by mutual generosity — giving freely without keeping score. Generosity creates abundance; scarcity creates conflict.' },
  { week: 40, category: 'intimacy', title: 'Protecting Your Relationship', summary: 'Actively protect your relationship from threats — excessive work, unhealthy friendships, digital intrusions, complacency. A relationship left on autopilot drifts. Intentional protection keeps it healthy.' },
  { week: 40, category: 'intimacy', title: 'The Language of Love Over Time', summary: 'How you express love will evolve over time. Early excitement gives way to quiet devotion. Grand gestures give way to daily presence. This evolution is not loss — it is deepening.' },

  { week: 40, category: 'wisdom', title: 'On Legacy', source: 'Maya Angelou', summary: 'I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.', link: 'Your recovery legacy is not measured in days clean but in how you make people feel. Present. Valued. Safe.' },
  { week: 40, category: 'wisdom', title: 'On Becoming', source: 'Thich Nhat Hanh', summary: 'Thanks to impermanence, everything is possible.', link: 'Impermanence is not a curse — it is a gift. Because nothing is permanent, transformation is always possible. You are proof.' },
  { week: 40, category: 'wisdom', title: 'On Purpose', source: 'Howard Thurman', summary: 'Don\'t ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is people who have come alive.', link: 'You are coming alive. The world needs exactly this version of you. Go be alive in every way possible.' },
  { week: 40, category: 'wisdom', title: 'On Strength', source: 'Lao Tzu', summary: 'Water is the softest thing, yet it can penetrate mountains and earth. This shows clearly the principle of softness overcoming hardness.', link: 'Gentle persistence overcomes the hardest obstacles. Your quiet, daily commitment has moved mountains within you.' },
  { week: 40, category: 'wisdom', title: 'On Integration', summary: 'At 10 months, recovery is no longer something you do — it is who you are. The practices, the mindset, the values have integrated into your identity. You are not recovering. You are recovered.', link: 'This integration is the ultimate goal. You have arrived not at a destination, but at a way of being.' },

  { week: 41, category: 'studies', title: 'Psychological Capital in Recovery', source: 'Journal of Organizational Behavior, 2007', summary: 'Psychological capital — hope, efficacy, resilience, and optimism (HERO) — predicts success in recovery and all life domains. Your recovery has built extraordinary psychological capital.' },
  { week: 41, category: 'studies', title: 'The Tend-and-Befriend Response', source: 'Psychological Review, 2000', summary: 'Beyond fight-or-flight, humans have a "tend-and-befriend" stress response mediated by oxytocin. Nurturing others and seeking social connection during stress is a healthy, effective coping strategy.' },
  { week: 41, category: 'studies', title: 'Cognitive Reappraisal as a Lifestyle', source: 'Emotion, 2010', summary: 'People who habitually reappraise negative situations (finding growth opportunities in challenges) show better mental health and lower addiction vulnerability. This skill strengthens with practice.' },
  { week: 41, category: 'studies', title: 'The Eudaimonic Life', source: 'Journal of Happiness Studies, 2008', summary: 'Eudaimonic well-being — living in accordance with your values and realizing your potential — produces deeper, more lasting satisfaction than hedonic well-being (pleasure-seeking). Recovery is fundamentally eudaimonic.' },
  { week: 41, category: 'studies', title: 'Relapse Prevention at 10+ Months', source: 'Addiction, 2020', summary: 'At 10+ months, relapse risk is significantly reduced but not zero. Common triggers at this stage include overconfidence, major life changes, and discontinuing recovery practices. Vigilance remains important.' },

  { week: 41, category: 'testosterone', title: 'Testosterone and Decision Quality', summary: 'Optimal testosterone improves decision-making speed and quality by enhancing prefrontal cortex function. You may notice that decisions feel clearer and more confident than they did months ago.' },
  { week: 41, category: 'testosterone', title: 'Dancing and Hormonal Benefits', summary: 'Social dancing combines physical movement, music, social connection, and touch — all testosterone-supportive activities. It\'s also one of the most enjoyable ways to stay physically active.' },
  { week: 41, category: 'testosterone', title: 'The Role of Adequate Calories', summary: 'Extreme caloric restriction (below BMR) suppresses testosterone significantly. Eat enough to fuel your activity level. Testosterone optimization requires adequate energy — you cannot starve your way to hormonal health.' },
  { week: 41, category: 'testosterone', title: 'Environmental Testosterone Support', summary: 'Optimize your environment: morning sunlight, clean air, minimal artificial light at night, plants in your workspace. Your environment influences hormonal production more than you might think.' },
  { week: 41, category: 'testosterone', title: 'Passing It Forward', summary: 'Share what you\'ve learned about hormonal health with other men in recovery. Your knowledge and experience can help someone else optimize their own hormonal environment.' },

  { week: 41, category: 'intimacy', title: 'Growing Old Together', summary: 'The vision of growing old with someone — sharing decades of memories, supporting each other through aging, maintaining companionship into old age — is only possible through the sustained investment you\'re making now.' },
  { week: 41, category: 'intimacy', title: 'The Relationship Inventory', summary: 'Take stock: What are the greatest strengths of your relationship? What needs attention? Where have you grown together? This honest inventory guides where to invest energy going forward.' },
  { week: 41, category: 'intimacy', title: 'Cultivating Wonder', summary: 'Approach your partner with wonder rather than familiarity. There is always something new to discover about another human being. When you stop being curious, you stop connecting.' },
  { week: 41, category: 'intimacy', title: 'The Gift of Forgiveness', summary: 'Forgiving your partner for imperfections — and being forgiven for your own — is the fabric of lasting love. Perfectionism destroys relationships. Grace sustains them.' },
  { week: 41, category: 'intimacy', title: 'Intimacy as Home', summary: 'The deepest form of intimacy is feeling at home with another person. No pretense, no performance, no masks. Just two people, fully present, fully accepting, fully home.' },

  { week: 41, category: 'wisdom', title: 'On Gratitude', source: 'Rumi', summary: 'Wear gratitude like a cloak and it will feed every corner of your life.', link: 'Let gratitude be your default state. For your health, your freedom, your growth, your relationships. Gratitude transforms everything.' },
  { week: 41, category: 'wisdom', title: 'On Being Enough', source: 'Brené Brown', summary: 'You are imperfect, you are wired for struggle, but you are worthy of love and belonging.', link: 'You don\'t need to earn worthiness through a perfect streak. You are worthy right now, exactly as you are.' },
  { week: 41, category: 'wisdom', title: 'On Ripples', source: 'Robert F. Kennedy', summary: 'Each time a man stands up for an ideal, or acts to improve the lot of others, or strikes out against injustice, he sends forth a tiny ripple of hope.', link: 'Your recovery sends ripples of hope through your community. You may never see all the lives you\'ve influenced, but they are real.' },
  { week: 41, category: 'wisdom', title: 'On Living', source: 'Thoreau', summary: 'I went to the woods because I wished to live deliberately, to front only the essential facts of life.', link: 'You have chosen to live deliberately — to face life\'s essential facts without numbing, escaping, or hiding. That is the fullest life.' },
  { week: 41, category: 'wisdom', title: 'On Strength in Gentleness', source: 'Lao Tzu', summary: 'Gentleness overcomes rigidity. Softness overcomes hardness.', link: 'The gentleness you show yourself and others is not weakness. It is the highest form of strength, born from deep inner security.' },

  { week: 42, category: 'studies', title: 'The 10-Month Cognitive Assessment', source: 'Neuropsychological Rehabilitation, 2019', summary: 'Comprehensive cognitive testing at 10+ months of behavioral addiction recovery shows performance matching or exceeding pre-addiction levels across all domains: attention, memory, executive function, and processing speed.' },
  { week: 42, category: 'studies', title: 'Behavioral Addiction and Empathy Restoration', source: 'NeuroImage, 2020', summary: 'Long-term recovery from compulsive sexual behavior showed restored empathy-related brain activation. The ability to feel and share others\' emotions returns fully with sustained abstinence.' },
  { week: 42, category: 'studies', title: 'The Healing Power of Story', source: 'Journal of Clinical Psychology, 2016', summary: 'Narrative therapy research shows that constructing a coherent recovery story — with clear beginning, struggle, growth, and transformation — strengthens identity and prevents relapse.' },
  { week: 42, category: 'studies', title: 'Biophilia and Well-Being', source: 'International Journal of Environmental Research, 2018', summary: 'The biophilia hypothesis — that humans are innately drawn to nature — is supported by evidence that nature exposure improves every measure of mental health. Integrate nature into your daily life.' },
  { week: 42, category: 'studies', title: 'Sustaining Motivation After the Novelty Fades', source: 'Motivation and Emotion, 2019', summary: 'Initial recovery motivation is often high but can fade. Sustaining motivation requires reconnecting with values, celebrating progress, and continually setting new growth goals beyond recovery itself.' },

  { week: 42, category: 'testosterone', title: 'Testosterone and Spatial Reasoning', summary: 'Optimal testosterone improves spatial reasoning and mental rotation abilities. These cognitive enhancements support navigation, engineering thinking, sports performance, and artistic spatial awareness.' },
  { week: 42, category: 'testosterone', title: 'The Benefits of Rowing', summary: 'Rowing engages 86% of muscles in the body, provides exceptional cardiovascular conditioning, and produces a robust hormonal response. Whether machine, boat, or erg, rowing is a complete exercise.' },
  { week: 42, category: 'testosterone', title: 'Omega-6 to Omega-3 Ratio', summary: 'Western diets are typically 15:1 omega-6 to omega-3 (ideal is 2:1 to 4:1). This imbalance promotes inflammation. Reducing seed oils and increasing fatty fish intake corrects this ratio and supports hormonal health.' },
  { week: 42, category: 'testosterone', title: 'Testosterone at Different Life Stages', summary: 'Your testosterone needs and levels change throughout life. The habits you\'ve built during recovery will serve you at every stage — from the ambition of your 20s to the wisdom of your later years.' },
  { week: 42, category: 'testosterone', title: 'The Complete Hormonal Picture', summary: 'Testosterone doesn\'t work alone. Thyroid, insulin, cortisol, growth hormone, and DHEA all interact in a complex hormonal symphony. Your recovery lifestyle optimizes the entire orchestra, not just one instrument.' },

  { week: 42, category: 'intimacy', title: 'The Intimacy of Being Ordinary Together', summary: 'The most intimate moments are often the most ordinary — watching TV, grocery shopping, cooking dinner. When you can find peace and joy in the mundane together, you have found real love.' },
  { week: 42, category: 'intimacy', title: 'Handling Jealousy with Maturity', summary: 'Jealousy is a normal emotion but an unreliable guide. Examine jealousy with curiosity: Is it based on real threat or insecurity? Communicate openly rather than acting from jealousy alone.' },
  { week: 42, category: 'intimacy', title: 'Love Languages Over Time', source: 'Gary Chapman', summary: 'Your love language may evolve over time, and so may your partner\'s. Check in periodically about what makes each other feel most loved. Yesterday\'s love language may not be today\'s.' },
  { week: 42, category: 'intimacy', title: 'The Art of Holding Space', summary: 'Sometimes your partner doesn\'t need solutions — they need a witness. The art of holding space is being fully present with another person\'s experience without trying to change it.' },
  { week: 42, category: 'intimacy', title: 'Intimacy With Your Future Self', summary: 'The choices you make today are an act of intimacy with your future self. You are caring for someone you haven\'t met yet — the person you will be at day 365 and beyond.' },

  { week: 42, category: 'wisdom', title: 'On Aging', source: 'Samuel Ullman', summary: 'Youth is not a time of life; it is a state of mind. Nobody grows old merely by living a number of years. People grow old by deserting their ideals.', link: 'Stay true to your ideals. Recovery has given you a youthful vitality that transcends age. Guard it.' },
  { week: 42, category: 'wisdom', title: 'On the Unseen', source: 'Antoine de Saint-Exupéry', summary: 'What is essential is invisible to the eye.', link: 'The most important changes — your rewired brain, your restored integrity, your deepened capacity for love — are invisible. But they are the most real.' },
  { week: 42, category: 'wisdom', title: 'On Enough', source: 'Kurt Vonnegut', summary: 'I have enough.', link: 'Two of the most powerful words in any language. You have enough. You are enough. This moment is enough.' },
  { week: 42, category: 'wisdom', title: 'On Rhythm', source: 'Rumi', summary: 'Let the beauty of what you love be what you do.', link: 'Fill your life with what you genuinely love. Not escape. Not numbness. Real beauty. Real purpose. Real joy.' },
  { week: 42, category: 'wisdom', title: 'On Inner Fire', source: 'Rumi', summary: 'Set your life on fire. Seek those who fan your flames.', link: 'Surround yourself with people who fan the flames of your best self. Release those who dim your light.' },

  { week: 43, category: 'studies', title: 'Values-Based Living and Recovery Maintenance', source: 'Journal of Contextual Behavioral Science, 2020', summary: 'People who maintained clear connection to their personal values sustained recovery at significantly higher rates than those who relied on avoidance-based motivation. Live for something, not just against something.' },
  { week: 43, category: 'studies', title: 'Neurological Benefits of Gratitude', source: 'NeuroImage, 2017', summary: 'Gratitude practice produced lasting changes in brain activity patterns even months after the practice ended. The neural pathways of gratitude become self-sustaining once established.' },
  { week: 43, category: 'studies', title: 'Social Identity and Behavior Change', source: 'Social Science & Medicine, 2018', summary: 'People who identify with a "recovery group" social identity maintain changes more effectively than those who see recovery as a solo endeavor. Community belonging supports lasting transformation.' },
  { week: 43, category: 'studies', title: 'The Benefits of Handwriting', source: 'Frontiers in Psychology, 2020', summary: 'Handwriting engages more brain regions than typing, improving memory, creativity, and emotional processing. Journaling by hand may be more therapeutically effective than digital journaling.' },
  { week: 43, category: 'studies', title: 'Approaching One Year: The Research', source: 'Addiction, 2020', summary: 'Research confirms that reaching one year of sustained behavioral change is a major predictor of lifelong success. The neural, psychological, and social foundations are firmly established by this point.' },

  { week: 43, category: 'testosterone', title: 'Testosterone and Bone Health Long-Term', summary: 'The hormonal optimization you\'ve maintained supports bone density that will protect you for decades. Weight-bearing exercise combined with optimal testosterone is the best defense against age-related bone loss.' },
  { week: 43, category: 'testosterone', title: 'Functional Fitness Movements', summary: 'As you approach a year of hormonal optimization, consider shifting focus toward functional movements — carrying, pulling, pushing, climbing — that build real-world strength and maintain hormonal benefits.' },
  { week: 43, category: 'testosterone', title: 'The Gut-Testosterone Axis', summary: 'Emerging research confirms that gut bacteria directly influence testosterone metabolism. Maintaining gut health through diverse whole foods, fermented foods, and fiber supports lifelong hormonal optimization.' },
  { week: 43, category: 'testosterone', title: 'Testosterone and Stress Resilience', summary: 'Optimal testosterone doesn\'t just reduce stress — it improves your capacity to handle stress effectively. Stressful situations that once felt overwhelming now feel manageable.' },
  { week: 43, category: 'testosterone', title: 'Building a Lifelong Protocol', summary: 'Distill your hormonal optimization into a sustainable daily checklist: sleep routine, morning sunlight, exercise type and timing, key supplements, stress management practice. Simple, consistent, lifelong.' },

  { week: 43, category: 'intimacy', title: 'The Legacy of Your Love', summary: 'The love you build today creates a legacy — for your partner, your children, your community. How you love matters beyond your own lifetime. Build something beautiful.' },
  { week: 43, category: 'intimacy', title: 'Companionate Love', source: 'Journal of Personality and Social Psychology, 2009', summary: 'Companionate love — deep friendship, loyalty, and shared life — produces greater long-term happiness than passionate love alone. The best relationships have both, with companionate love as the foundation.' },
  { week: 43, category: 'intimacy', title: 'Sexuality as Expression of Love', summary: 'After nearly a year of recovery, your sexuality can be what it was always meant to be: an expression of love, connection, and joy. Not a compulsion. Not a performance. A gift freely given and received.' },
  { week: 43, category: 'intimacy', title: 'Modeling Healthy Relationships', summary: 'Whether you have children or not, you are modeling healthy relationships for everyone around you. Your recovery demonstrates what is possible — that habits can be changed, that love can be renewed.' },
  { week: 43, category: 'intimacy', title: 'The Ongoing Practice of Intimacy', summary: 'Intimacy is not a destination — it is a daily practice. Like meditation, exercise, or any skill, it deepens with consistent attention. Keep practicing. Keep growing. Keep connecting.' },

  { week: 43, category: 'wisdom', title: 'On Homecoming', source: 'T.S. Eliot', summary: 'We shall not cease from exploration, and the end of all our exploring will be to arrive where we started and know the place for the first time.', link: 'You are coming home to yourself — the self that was always there beneath the addiction. You know yourself for the first time.' },
  { week: 43, category: 'wisdom', title: 'On Tomorrow', source: 'Martin Luther', summary: 'Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree.', link: 'Plant your tree. Build your recovery. The value of what you\'re doing is independent of any outcome. The practice itself is the reward.' },
  { week: 43, category: 'wisdom', title: 'On Wholeness', source: 'Carl Jung', summary: 'Wholeness is not achieved by cutting off a portion of one\'s being, but by integration of the contraries.', link: 'You are becoming whole by integrating all parts of yourself — light and shadow, strength and vulnerability, discipline and compassion.' },
  { week: 43, category: 'wisdom', title: 'On Mountains', source: 'Edmund Hillary', summary: 'It is not the mountain we conquer, but ourselves.', link: 'The 365-day mountain is not what you\'re conquering. You are conquering yourself. And that is the greatest victory of all.' },
  { week: 43, category: 'wisdom', title: 'On Light', source: 'Leonard Cohen', summary: 'There is a crack in everything. That\'s how the light gets in.', link: 'Your cracks — your struggles, your addiction, your recovery — are how the light enters. You are more luminous for having been broken and rebuilt.' },

  { week: 44, category: 'studies', title: 'The One-Year Brain', source: 'Biological Psychiatry, 2021', summary: 'At approaching one year, neuroimaging studies show that brain structure and function in recovered individuals is statistically indistinguishable from never-addicted controls in most measures.' },
  { week: 44, category: 'studies', title: 'Positive Psychology and Flourishing', source: 'American Psychologist, 2011', summary: 'Flourishing — the combination of positive emotions, engagement, meaning, accomplishment, and positive relationships (PERMA) — is the ultimate goal beyond mere absence of addiction.' },
  { week: 44, category: 'studies', title: 'The Science of Awe', source: 'Cognition and Emotion, 2015', summary: 'Regular experiences of awe reduced inflammatory cytokines more effectively than other positive emotions. Seek awe in nature, art, human achievement, and the miracle of your own transformation.' },
  { week: 44, category: 'studies', title: 'Hormesis and Personal Growth', source: 'Dose-Response, 2014', summary: 'Hormesis — the principle that small doses of stress promote growth — explains how the controlled stress of recovery builds resilience. You are stronger because of (not despite) your challenges.' },
  { week: 44, category: 'studies', title: 'Identity-Based Habits', source: 'Psychological Review, 2021', summary: 'The most durable habits are identity-based: "I am someone who..." rather than "I am trying to..." Your identity as a free, self-disciplined person now sustains your behavior automatically.' },

  { week: 44, category: 'testosterone', title: 'Testosterone and Longevity Research', summary: 'The intersection of testosterone optimization and longevity research suggests that maintaining hormonal health through lifestyle — not supplementation — is associated with the longest, healthiest lifespans.' },
  { week: 44, category: 'testosterone', title: 'Mobility Work and Hormonal Recovery', summary: 'Dedicated mobility work (stretching, yoga, foam rolling) reduces chronic muscle tension that elevates cortisol. Flexible muscles and joints support better training form and greater hormonal response.' },
  { week: 44, category: 'testosterone', title: 'Testosterone and Confidence Calibration', summary: 'Optimal testosterone produces well-calibrated confidence — not arrogance or insecurity, but an accurate sense of your abilities. This calibration is one of the most valuable traits in personal and professional life.' },
  { week: 44, category: 'testosterone', title: 'The Natural Supplement Stack', summary: 'An evidence-based daily stack: Vitamin D3 (2000-5000 IU), Magnesium (200-400mg), Zinc (15-30mg), Ashwagandha (600mg KSM-66), Omega-3 (2-3g EPA/DHA). Simple, effective, sustainable.' },
  { week: 44, category: 'testosterone', title: 'Hormonal Wisdom at Eleven Months', summary: 'You now possess nearly a year of hormonal wisdom. You know your body, your optimal practices, your individual responses. This self-knowledge is more valuable than any generic protocol.' },

  { week: 44, category: 'intimacy', title: 'Deep Roots, Wide Branches', summary: 'A relationship with deep roots (trust, shared history, commitment) can grow wide branches (adventures, growth, exploration). Without deep roots, wide branches topple. Build roots first.' },
  { week: 44, category: 'intimacy', title: 'The Practice of Daily Devotion', summary: 'Daily devotion to your partner — through small acts of love, attention, and care — is the most romantic thing you can do. Grand gestures impress; daily devotion transforms.' },
  { week: 44, category: 'intimacy', title: 'Embracing Your Partner\'s Whole Self', summary: 'Love is embracing the entire person — their strengths and their shadows, their gifts and their wounds. True intimacy leaves no part of the person unloved.' },
  { week: 44, category: 'intimacy', title: 'The Ripple Effect of Healthy Love', summary: 'Your healthy relationship inspires others. Friends, family, and even strangers are influenced by the example of genuine, honest, devoted love. Your love story matters beyond your own walls.' },
  { week: 44, category: 'intimacy', title: 'Preparing for a Lifetime of Love', summary: 'Nearly a year of recovery has prepared you for something remarkable: a lifetime of authentic, deeply connected, fully present love. This is the ultimate prize of your journey.' },

  { week: 44, category: 'wisdom', title: 'On Completion', source: 'Rainer Maria Rilke', summary: 'Perhaps all the dragons in our lives are princesses who are only waiting to see us act, just once, with beauty and courage.', link: 'Your dragons — your urges, your fears, your shadows — were princesses in disguise. They called forth your beauty and courage.' },
  { week: 44, category: 'wisdom', title: 'On the Journey', source: 'Cavafy', summary: 'Ithaca gave you the marvelous journey. Without her you would not have set out.', link: 'The destination is important, but the journey itself — the growth, the struggle, the transformation — that is the true gift.' },
  { week: 44, category: 'wisdom', title: 'On Simple Things', source: 'Albert Camus', summary: 'In the midst of winter, I found there was, within me, an invincible summer.', link: 'Within you, there has always been an invincible summer — a part of you that no addiction could ever extinguish. You found it.' },
  { week: 44, category: 'wisdom', title: 'On Beginnings', source: 'T.S. Eliot', summary: 'What we call the beginning is often the end. And to make an end is to make a beginning.', link: 'As this 365-day journey approaches its end, a new beginning awaits. The end of recovery is the beginning of flourishing.' },
  { week: 44, category: 'wisdom', title: 'On the Now', source: 'Eckhart Tolle', summary: 'The past has no power over the present moment.', link: 'Your past has no power over this moment. You are free. You are present. You are here. And here is exactly where you need to be.' },

  { week: 45, category: 'studies', title: 'Recovery Capital', source: 'Drug and Alcohol Dependence, 2008', summary: 'Recovery capital — the sum of personal, social, and community resources — predicts long-term success. At 11 months, your recovery capital is substantial: skills, relationships, habits, and identity.' },
  { week: 45, category: 'studies', title: 'Wisdom and Neural Integration', source: 'Frontiers in Neuroscience, 2019', summary: 'Wisdom — defined as emotional regulation, prosocial behavior, self-reflection, and tolerance of uncertainty — is associated with greater neural integration across brain regions. Recovery builds wisdom.' },
  { week: 45, category: 'studies', title: 'Savoring and Life Satisfaction', source: 'Journal of Positive Psychology, 2013', summary: 'The ability to savor positive experiences — deliberately attending to and appreciating good moments — predicts life satisfaction more strongly than the frequency of positive events.' },
  { week: 45, category: 'studies', title: 'Emotional Agility', source: 'Journal of Personality, 2015', summary: 'Emotional agility — the ability to experience emotions without being controlled by them — is the hallmark of psychological health. Your months of urge surfing have trained this capacity.' },
  { week: 45, category: 'studies', title: 'Post-Recovery Growth Trajectories', source: 'Clinical Psychology Review, 2021', summary: 'People who sustain recovery for 11+ months show accelerating growth trajectories — improvement rates actually increase over time rather than plateau. The best is truly yet to come.' },

  { week: 45, category: 'testosterone', title: 'Testosterone at Eleven Months', summary: 'Your testosterone optimization journey is nearly complete. The baseline you\'ve established through lifestyle changes is the foundation for decades of hormonal health. Maintain what works.' },
  { week: 45, category: 'testosterone', title: 'CrossFit-Style Training', summary: 'High-intensity, varied functional movements (CrossFit methodology) produce excellent hormonal responses through combinations of strength, cardiovascular, and gymnastic elements. Variety prevents adaptation.' },
  { week: 45, category: 'testosterone', title: 'The Minimal Effective Dose', summary: 'For long-term sustainability, find the minimal effective dose for each optimization practice. The minimum supplement stack, the minimum training volume, the minimum sleep hours — that still produce your desired results.' },
  { week: 45, category: 'testosterone', title: 'Testosterone and Seasonal Activities', summary: 'Vary your physical activities seasonally: swimming in summer, hiking in fall, skiing in winter, running in spring. Seasonal variation provides novel stimuli and keeps training enjoyable year-round.' },
  { week: 45, category: 'testosterone', title: 'The Hormonal Legacy You Leave', summary: 'The habits you model — for partners, friends, children, mentees — create a legacy of health that extends far beyond your own life. Your commitment to hormonal health teaches others what is possible.' },

  { week: 45, category: 'intimacy', title: 'The Art of Growing Together', summary: 'The couples who last are not those who never change — they are those who change together. Share your growth with your partner. Invite them into your evolution.' },
  { week: 45, category: 'intimacy', title: 'Intimacy and Vulnerability at Scale', summary: 'As your capacity for vulnerability grows, so does your capacity for intimacy — not just with a partner, but with friends, family, and community. Deep connection ripples outward.' },
  { week: 45, category: 'intimacy', title: 'The Seasons of Love', summary: 'Love has seasons — spring\'s excitement, summer\'s passion, autumn\'s deepening, winter\'s quiet warmth. Don\'t mistake winter for death. It is rest before renewal. Every season has its beauty.' },
  { week: 45, category: 'intimacy', title: 'Choosing Love Over Fear', summary: 'Every relationship moment presents a choice: love or fear. Choose love — even when it\'s risky, even when you might be hurt. Fear-based relationships suffocate. Love-based relationships flourish.' },
  { week: 45, category: 'intimacy', title: 'The Ultimate Intimacy', summary: 'The ultimate intimacy is being completely yourself with another person — no masks, no roles, no performance — and being completely accepted. This is what you\'ve been working toward.' },

  { week: 45, category: 'wisdom', title: 'On Nearly There', summary: 'You are entering the final stretch. Less than three months remain. You have walked through fire and emerged stronger. The summit is in sight. Don\'t slow down now.', link: 'The final stretch requires the same daily commitment that brought you here. One day at a time. One choice at a time.' },
  { week: 45, category: 'wisdom', title: 'On Patience', source: 'Rainer Maria Rilke', summary: 'Be patient toward all that is unsolved in your heart and try to love the questions themselves.', link: 'Not everything needs to be resolved. Some questions are meant to be lived, not answered. Trust the unfolding.' },
  { week: 45, category: 'wisdom', title: 'On Depth', source: 'Khalil Gibran', summary: 'Your pain is the breaking of the shell that encloses your understanding.', link: 'The pain of recovery broke open a shell you didn\'t know you were trapped in. Now you see life with new eyes.' },
  { week: 45, category: 'wisdom', title: 'On Freedom', source: 'Viktor Frankl', summary: 'Freedom is in danger of degenerating into mere arbitrariness unless it is lived in terms of responsibleness.', link: 'True freedom is not doing whatever you want. It is having the ability to choose what is right. That is the freedom you\'ve earned.' },
  { week: 45, category: 'wisdom', title: 'On Stars', source: 'Ralph Waldo Emerson', summary: 'Hitch your wagon to a star.', link: 'Aim high. Your capacity for greatness has been liberated by recovery. Hitch your life to your highest aspirations.' },

  { week: 46, category: 'studies', title: 'Transcendence and Well-Being', source: 'Journal of Personality and Social Psychology, 2017', summary: 'Experiences of self-transcendence — feeling connected to something larger than yourself — produced the deepest and most lasting improvements in well-being. Recovery itself is a transcendent experience.' },
  { week: 46, category: 'studies', title: 'Sleep and Long-Term Brain Health', source: 'Science, 2013', summary: 'Sleep activates the glymphatic system, clearing toxic proteins from the brain. Consistent quality sleep — which recovery supports — may reduce the risk of neurodegenerative diseases decades later.' },
  { week: 46, category: 'studies', title: 'The Paradox of Choice', source: 'Psychological Science, 2006', summary: 'Too many choices paralyze decision-making and reduce satisfaction. Simplifying your life and routines — a natural result of recovery — actually increases happiness by reducing decision fatigue.' },
  { week: 46, category: 'studies', title: 'Mastery Experiences and Self-Efficacy', source: 'Psychological Review, 1977', summary: 'Successfully completing difficult challenges is the primary source of self-efficacy. Your nearly complete 365-day journey is a mastery experience that will enhance self-efficacy in all life domains.' },
  { week: 46, category: 'studies', title: 'The Science of Flourishing', source: 'Applied Psychology: Health and Well-Being, 2020', summary: 'Flourishing — optimal functioning across emotional, psychological, and social domains — is achievable and measurable. Recovery provides the foundation for a flourishing life.' },

  { week: 46, category: 'testosterone', title: 'Legacy Testosterone Practices', summary: 'As you approach year one, cement your legacy practices: the training style that works for you, the sleep routine, the nutrition approach, the stress management tools. These are yours for life.' },
  { week: 46, category: 'testosterone', title: 'Outdoor Training Benefits', summary: 'Training outdoors — park workouts, outdoor gyms, trail running — combines exercise hormonal benefits with nature exposure and vitamin D production. The combined effect exceeds indoor training alone.' },
  { week: 46, category: 'testosterone', title: 'Testosterone and Social Bonds', summary: 'Strong social bonds increase testosterone while isolation decreases it. The community connections you\'ve built during recovery are not just psychologically valuable — they are hormonally supportive.' },
  { week: 46, category: 'testosterone', title: 'Maintaining vs. Gaining', summary: 'The effort required to maintain hormonal optimization is less than the effort to gain it. You\'ve done the hard work. Now coast at altitude with consistent, sustainable habits.' },
  { week: 46, category: 'testosterone', title: 'Hormonal Health as Self-Respect', summary: 'Taking care of your hormonal health is an act of self-respect. It says: I value my body, my energy, my vitality. I am worth the effort of living well.' },

  { week: 46, category: 'intimacy', title: 'The Intimacy of Shared Struggle', summary: 'Having weathered the storm of recovery together creates a bond forged in fire. Shared struggle, honestly faced, produces the deepest form of intimacy — the intimacy of the battlefield.' },
  { week: 46, category: 'intimacy', title: 'Love as a Daily Practice', summary: 'Love is not an emotion you feel — it is a practice you do. Every day, choose acts of love: listen deeply, speak kindly, touch gently, forgive readily. The practice creates the feeling.' },
  { week: 46, category: 'intimacy', title: 'The Freedom of Authentic Sexuality', summary: 'Your sexuality is now authentically yours — free from pornographic scripts, unrealistic expectations, and conditioned responses. This freedom is one of the most precious gifts of recovery.' },
  { week: 46, category: 'intimacy', title: 'Loving Beyond Yourself', summary: 'The deepest love extends beyond the couple — into family, community, and the world. When your relationship is strong, it becomes a source of light for everyone around you.' },
  { week: 46, category: 'intimacy', title: 'Gratitude for Connection', summary: 'Take a moment to feel genuine gratitude for the human connections in your life. Every person who has supported your recovery, every relationship that has deepened — these are treasures beyond price.' },

  { week: 46, category: 'wisdom', title: 'On Finishing Well', source: 'Paul the Apostle', summary: 'I have fought the good fight, I have finished the race, I have kept the faith.', link: 'You are approaching the finish line of a race you once thought impossible. Fight well. Finish strong. Keep the faith.' },
  { week: 46, category: 'wisdom', title: 'On the Path', source: 'Rumi', summary: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there.', link: 'Beyond judgment, beyond shame, beyond the categories of "addict" and "recovered" — there is simply you, whole and free. Meet yourself there.' },
  { week: 46, category: 'wisdom', title: 'On Growth', source: 'Anaïs Nin', summary: 'And the day came when the risk to remain tight in a bud was more painful than the risk it took to blossom.', link: 'You chose to blossom. The risk of growth was less painful than the risk of staying closed. And look at you now.' },
  { week: 46, category: 'wisdom', title: 'On Simplicity', source: 'Confucius', summary: 'Life is really simple, but we insist on making it complicated.', link: 'Don\'t use pornography today. That\'s it. The simplicity of recovery is its power. Don\'t overcomplicate what is simple.' },
  { week: 46, category: 'wisdom', title: 'On Walking', source: 'Thoreau', summary: 'An early-morning walk is a blessing for the whole day.', link: 'The simple practices — a morning walk, a moment of gratitude, a deep breath — these are what sustained you for 46 weeks. Keep them forever.' },

  { week: 47, category: 'studies', title: 'Annual Brain Recovery Summary', source: 'Comprehensive Psychiatry, 2021', summary: 'At 47 weeks of sustained recovery, all major brain systems — reward, executive function, emotional regulation, and social cognition — show comprehensive recovery, often exceeding pre-addiction baselines.' },
  { week: 47, category: 'studies', title: 'The Broaden Effect of Positive Emotions', source: 'Cognition and Emotion, 2005', summary: 'Positive emotions literally broaden your perceptual field — you see more, notice more, and think more creatively. Recovery\'s positive emotional baseline gives you a permanently wider lens on life.' },
  { week: 47, category: 'studies', title: 'Meaning and Mortality', source: 'Health Psychology, 2019', summary: 'A strong sense of meaning in life was associated with 17% lower risk of cardiovascular mortality and 30% lower risk of all-cause mortality. Your purpose-driven recovery may be extending your life.' },
  { week: 47, category: 'studies', title: 'The Final Stretch Psychology', source: 'Journal of Personality and Social Psychology, 2006', summary: 'Research shows that people increase effort as they approach a goal. The "goal gradient effect" explains why the final weeks often feel both easier and more charged with meaning.' },
  { week: 47, category: 'studies', title: 'Post-Recovery Identity Integration', source: 'Identity, 2020', summary: 'Successfully integrating the recovery experience into your life narrative — as a chapter of growth rather than a permanent label — produces the healthiest long-term psychological outcomes.' },

  { week: 47, category: 'testosterone', title: 'Approaching One Year: Hormonal Reflection', summary: 'Reflect on your hormonal journey: energy levels, body composition, confidence, drive, sexual function. Compare to day one. The transformation is real, measurable, and sustainable.' },
  { week: 47, category: 'testosterone', title: 'Periodized Nutrition', summary: 'Just as training benefits from periodization, nutrition can be periodized: higher carbs on training days, higher fats on rest days. This approach optimizes both performance and hormonal response.' },
  { week: 47, category: 'testosterone', title: 'Testosterone and Leadership Capacity', summary: 'Nearly a year of hormonal optimization has likely expanded your leadership capacity — in relationships, at work, in your community. Testosterone supports the confident, decisive, caring leader within you.' },
  { week: 47, category: 'testosterone', title: 'The Compound Effect of Consistency', summary: 'Eleven months of consistent hormonal optimization practices have compounded. Like interest on investment, the returns accelerate over time. Your current state is the compound interest of daily good choices.' },
  { week: 47, category: 'testosterone', title: 'Preparing for Year Two', summary: 'As year one approaches its close, plan for year two: maintain fundamentals, add new challenges, pursue new goals. Hormonal optimization is not a project — it is a lifelong practice.' },

  { week: 47, category: 'intimacy', title: 'Eleven Months of Transformation', summary: 'Eleven months ago, your capacity for intimacy was constrained by addiction. Now it is liberated. Reflect on the depth of connection you can experience now versus then. This is what freedom feels like.' },
  { week: 47, category: 'intimacy', title: 'The Intimacy of Shared Dreams', summary: 'Share your biggest dreams with your partner. The intimacy of shared aspiration creates a future that draws you forward together. What are you building? Where are you going? Dream together.' },
  { week: 47, category: 'intimacy', title: 'Unconditional Positive Regard', source: 'Carl Rogers', summary: 'Offering unconditional positive regard — valuing your partner regardless of their behavior — creates the ultimate safe space for growth, honesty, and deep connection.' },
  { week: 47, category: 'intimacy', title: 'The Beauty of Long Love', summary: 'Long love — the kind built over years and decades — has a beauty that new love cannot imagine. The depth, the knowing, the shorthand, the history. You are building this kind of love.' },
  { week: 47, category: 'intimacy', title: 'Love as Coming Home', summary: 'The deepest expression of love is the feeling of coming home — not to a place, but to a person. Being with them feels like arriving where you belong. Recovery allows you to be that home for someone.' },

  { week: 47, category: 'wisdom', title: 'On Almost There', summary: 'Five weeks remain. You have walked 329 days of freedom. What felt impossible is now inevitable. You are not almost there — you ARE there. The last weeks are a victory lap.', link: 'Run the victory lap with gratitude. Every step of these final weeks is a celebration of everything you have become.' },
  { week: 47, category: 'wisdom', title: 'On Eternity', source: 'William Blake', summary: 'To see a world in a grain of sand and a heaven in a wild flower, hold infinity in the palm of your hand, and eternity in an hour.', link: 'Recovery has taught you to see infinity in small moments. That capacity for wonder and presence will never leave you.' },
  { week: 47, category: 'wisdom', title: 'On Return', source: 'Joseph Campbell', summary: 'The hero\'s journey always ends with a return — bringing the gifts of transformation back to the ordinary world.', link: 'You have completed the hero\'s journey. Now bring your gifts — your wisdom, your strength, your compassion — back to the world.' },
  { week: 47, category: 'wisdom', title: 'On Dancing', source: 'William Butler Yeats', summary: 'How can we know the dancer from the dance?', link: 'You and your recovery are no longer separate. The dancer and the dance are one. You ARE the transformation.' },
  { week: 47, category: 'wisdom', title: 'On Finishing', source: 'Desmond Tutu', summary: 'There is only one way to eat an elephant: a bite at a time.', link: 'You ate the elephant — 365 bites, one day at a time. The method that seemed too simple was always exactly enough.' },

  { week: 48, category: 'studies', title: 'The One-Year Neurological Milestone', source: 'Frontiers in Behavioral Neuroscience, 2021', summary: 'At one year of sustained behavioral change, the brain has undergone comprehensive remodeling. New pathways are firmly established. Old pathways have significantly weakened. The rewiring is essentially complete.' },
  { week: 48, category: 'studies', title: 'Eudaimonia and Brain Structure', source: 'Social Cognitive and Affective Neuroscience, 2016', summary: 'People living eudaimonically — pursuing meaning over pleasure — showed greater prefrontal cortex volume and better connectivity between brain regions. Living well literally builds a better brain.' },
  { week: 48, category: 'studies', title: 'Self-Transcendence and Mental Health', source: 'Journal of Clinical Psychology, 2021', summary: 'Self-transcendence — connecting to purposes beyond self-interest — was the strongest predictor of sustained mental health improvement. Your recovery, extended into service, achieves this transcendence.' },
  { week: 48, category: 'studies', title: 'Legacy and Meaning', source: 'Developmental Psychology, 2008', summary: 'Generativity — concern for establishing and guiding the next generation — is associated with greater life satisfaction and psychological health. Your recovery creates a generative legacy.' },
  { week: 48, category: 'studies', title: 'The Science of New Beginnings', source: 'Personality and Social Psychology Bulletin, 2014', summary: 'Research on "fresh starts" shows that temporal landmarks (new year, birthdays, milestones) create psychological permission for new goals. Day 365 is your ultimate fresh start — for everything that comes next.' },

  { week: 48, category: 'testosterone', title: 'Year-One Hormonal Graduation', summary: 'Congratulations. You have completed a full year of hormonal optimization through lifestyle change. Your testosterone, cortisol, and overall endocrine function are operating at their natural best.' },
  { week: 48, category: 'testosterone', title: 'Planning Year Two Training', summary: 'With a year of training behind you, consider new challenges: a competition, a new sport, a physical feat. New goals keep training exciting and maintain the hormonal benefits of progressive overload.' },
  { week: 48, category: 'testosterone', title: 'Testosterone and Generativity', summary: 'Optimal testosterone supports generativity — the drive to mentor, create, and contribute to the next generation. Channel your hormonal health into building something that outlasts you.' },
  { week: 48, category: 'testosterone', title: 'The Simple Daily Non-Negotiables', summary: 'After a year, distill your practice to the non-negotiables: 7-9 hours sleep, 30+ minutes of movement, whole food nutrition, one stress-management practice. Everything else is optional optimization.' },
  { week: 48, category: 'testosterone', title: 'Hormonal Health Forever', summary: 'What you\'ve built is not a temporary project but a permanent way of living. These habits will serve you for the rest of your life, supporting health, vitality, and well-being at every age.' },

  { week: 48, category: 'intimacy', title: 'A Year of Deeper Connection', summary: 'Reflect on your intimacy journey over the past year. The depth of connection you can now experience — emotional, physical, spiritual — is the greatest gift of recovery. Treasure it.' },
  { week: 48, category: 'intimacy', title: 'The Ongoing Love Story', summary: 'Your love story does not end at day 365. It continues — deeper, richer, more authentic than ever before. The end of recovery is the beginning of the best chapter.' },
  { week: 48, category: 'intimacy', title: 'Gratitude for Your Partner', summary: 'If you have a partner who has walked this journey with you, express your deepest gratitude. Their patience, their faith, their love has been a pillar of your recovery.' },
  { week: 48, category: 'intimacy', title: 'Intimacy as the Ultimate Human Experience', summary: 'To truly know another person and be truly known — this is the highest human experience. Everything you have done in recovery has been preparation for this depth of knowing and being known.' },
  { week: 48, category: 'intimacy', title: 'Love Without Limits', summary: 'Your capacity for love is now unlimited by addiction. What you choose to do with that capacity — how widely, how deeply, how generously you love — is the next great adventure.' },

  { week: 48, category: 'wisdom', title: 'On Completion', source: 'Rainer Maria Rilke', summary: 'I want to unfold. I don\'t want to stay folded anywhere, because where I am folded, there I am a lie.', link: 'You have unfolded. Where you were once folded — hidden, ashamed, constrained — you are now open, honest, and free.' },
  { week: 48, category: 'wisdom', title: 'On What Remains', source: 'Mary Oliver', summary: 'Someone I loved once gave me a box full of darkness. It took me years to understand that this too was a gift.', link: 'The darkness of addiction was a gift. It gave you the motivation to transform, the strength to persevere, and the wisdom to help others.' },
  { week: 48, category: 'wisdom', title: 'On the Infinite', source: 'Walt Whitman', summary: 'I contain multitudes.', link: 'You are not defined by one struggle, one habit, or one chapter. You contain multitudes. You always have. Now you know it.' },
  { week: 48, category: 'wisdom', title: 'On the Circle', source: 'T.S. Eliot', summary: 'We shall not cease from exploration, and the end of all our exploring will be to arrive where we started and know the place for the first time.', link: 'The journey comes full circle. You arrive back at yourself — but a self you truly know for the first time.' },
  { week: 48, category: 'wisdom', title: 'On Gratitude', summary: 'Thank you for showing up. For 336 days. For choosing yourself, your health, your relationships, your freedom. Thank you for proving that transformation is real.', link: 'You are proof that people can change. That recovery works. That the human spirit is indomitable. Thank you.' },

  { week: 49, category: 'studies', title: 'Wisdom as Neural Integration', source: 'Translational Psychiatry, 2019', summary: 'Wisdom emerges from integration across brain networks — cognitive, emotional, and social. Your year of recovery has produced exactly this kind of comprehensive neural integration.' },
  { week: 49, category: 'studies', title: 'Flourishing After Adversity', source: 'American Psychologist, 2004', summary: 'The highest levels of flourishing are found not in those who have never struggled, but in those who have struggled and prevailed. Adversity, overcome, becomes the foundation of exceptional well-being.' },
  { week: 49, category: 'studies', title: 'Self-Actualization and Recovery', source: 'Journal of Humanistic Psychology, 2016', summary: 'Self-actualization — becoming your fullest, most authentic self — is the highest human need (Maslow). Recovery from addiction removes the primary barrier to self-actualization for millions of men.' },
  { week: 49, category: 'studies', title: 'Epigenetic Legacy of Behavioral Change', source: 'Nature Neuroscience, 2019', summary: 'Sustained behavioral changes can produce epigenetic modifications that may be passed to offspring, potentially creating a positive legacy that extends beyond your own lifetime.' },
  { week: 49, category: 'studies', title: 'The Fully Recovered Brain', source: 'Comprehensive Psychiatry, 2021', summary: 'At nearly one year, neuroscience confirms: your brain has fully recovered. Neural pathways, receptor densities, executive function, and emotional regulation match healthy, non-addicted benchmarks.' },

  { week: 49, category: 'testosterone', title: 'Year-One Complete: Hormonal Freedom', summary: 'Your hormonal system is free — free from the suppressive effects of chronic dopamine overstimulation. Operating at your natural optimum, your body is doing what it was designed to do.' },
  { week: 49, category: 'testosterone', title: 'The Next Challenge', summary: 'With hormonal health established, consider new physical challenges: a marathon, a triathlon, a strength competition, a mountain climb. Your optimized body is ready for ambitious goals.' },
  { week: 49, category: 'testosterone', title: 'Teaching Others', summary: 'You now have the knowledge and experience to help other men optimize their hormonal health through lifestyle. Share what you\'ve learned. Teaching deepens your own understanding.' },
  { week: 49, category: 'testosterone', title: 'Testosterone and Purpose', summary: 'Optimal testosterone fuels purpose-driven action. You have the hormonal foundation for anything you want to build — a business, a family, a creative project, a movement. Build boldly.' },
  { week: 49, category: 'testosterone', title: 'Gratitude for Your Body', summary: 'Your body carried you through this transformation. It adapted, recovered, and optimized. Take a moment to appreciate the remarkable biological machine that you are. Treat it with the respect it deserves.' },

  { week: 49, category: 'intimacy', title: 'The Freedom to Love Fully', summary: 'Freedom from addiction is ultimately freedom to love fully — without shame, without secrets, without divided attention. This is the greatest freedom of all.' },
  { week: 49, category: 'intimacy', title: 'Your Love Story Going Forward', summary: 'The next chapter of your love story — whether with a current partner or a future one — will be written by the person you have become. That person is capable of extraordinary love.' },
  { week: 49, category: 'intimacy', title: 'Intimacy as a Superpower', summary: 'In a world of surface-level connections and digital distractions, the ability to be deeply, genuinely intimate is a superpower. You have developed this superpower through a year of recovery.' },
  { week: 49, category: 'intimacy', title: 'Paying It Forward', summary: 'Share what you\'ve learned about authentic intimacy. In a culture saturated with false intimacy, your experience and wisdom can help others discover what real connection feels like.' },
  { week: 49, category: 'intimacy', title: 'Love as the Ultimate Purpose', summary: 'At the end of the day — at the end of 365 days — love is what remains. Love for yourself, for others, for life. Everything else you\'ve gained serves this one purpose.' },

  { week: 49, category: 'wisdom', title: 'On Light and Shadow', source: 'Carl Jung', summary: 'One does not become enlightened by imagining figures of light, but by making the darkness conscious.', link: 'You have made your darkness conscious. And in doing so, you have found the light that was always within.' },
  { week: 49, category: 'wisdom', title: 'On Wholeness', source: 'Ram Dass', summary: 'We\'re all just walking each other home.', link: 'Recovery is not a solitary journey. We walk each other home. Thank those who walked beside you.' },
  { week: 49, category: 'wisdom', title: 'On Being', source: 'Meister Eckhart', summary: 'Be willing to be a beginner every single morning.', link: 'Even at day 343, be a beginner. Fresh eyes. Open heart. Ready to learn. The beginner\'s mind is the wisest mind.' },
  { week: 49, category: 'wisdom', title: 'On This Moment', source: 'Thich Nhat Hanh', summary: 'Smile, breathe, and go slowly.', link: 'In these final weeks, there is nothing to rush toward. Smile at how far you\'ve come. Breathe in your freedom. Go slowly and savor it all.' },
  { week: 49, category: 'wisdom', title: 'On What You\'ve Built', summary: 'In 49 weeks, you have built: a rewired brain, optimized hormones, deeper relationships, unshakeable integrity, profound self-knowledge, and a life worth living. That is not recovery. That is triumph.', link: 'What you have built cannot be taken from you. It is yours forever.' },

  { week: 50, category: 'studies', title: 'Beyond Recovery: Flourishing', source: 'Applied Psychology, 2021', summary: 'The science is clear: sustained recovery doesn\'t just return you to baseline — it elevates you above it. You are not just recovered. You are flourishing.' },
  { week: 50, category: 'studies', title: 'Generativity and Well-Being', source: 'Journal of Adult Development, 2003', summary: 'The drive to contribute to future generations — through mentoring, creating, or building — is the hallmark of psychological maturity. Your recovery positions you perfectly for generative living.' },
  { week: 50, category: 'studies', title: 'The Legacy Effect', source: 'Developmental Psychology, 2010', summary: 'Positive behavioral changes create "legacy effects" — improvements that persist and compound long after the initial change period. Your 365-day journey will continue producing returns for decades.' },
  { week: 50, category: 'studies', title: 'Cognitive Reserve Built Through Recovery', source: 'Neurology, 2012', summary: 'The cognitive practices of recovery — mindfulness, learning, social engagement, exercise — build cognitive reserve that protects against age-related decline. You are investing in lifelong brain health.' },
  { week: 50, category: 'studies', title: 'The Complete Recovery Model', source: 'Addiction Research & Theory, 2021', summary: 'Complete recovery encompasses four domains: abstinence (behavioral), wellness (health), citizenship (contribution), and housing/stability (foundation). Your journey has built all four pillars.' },

  { week: 50, category: 'testosterone', title: 'A Year of Hormonal Mastery', summary: 'You have mastered your hormonal health through a year of intentional living. This mastery is not fragile — it is robust, self-sustaining, and deeply embedded in your daily routine.' },
  { week: 50, category: 'testosterone', title: 'Testosterone and Vitality', summary: 'Vitality — the feeling of being fully alive, energized, and purposeful — is the ultimate expression of hormonal health. You are not just surviving. You are thriving with vitality.' },
  { week: 50, category: 'testosterone', title: 'Evolving Your Practice', summary: 'A year of experience has taught you what works best for your unique body. Continue evolving your practices based on how you feel, not just what the research says. You are the expert now.' },
  { week: 50, category: 'testosterone', title: 'The Hormonal Ripple Effect', summary: 'Your vitality influences everyone around you. Family, friends, colleagues — they all benefit from your energy, confidence, and drive. Your hormonal health is a gift to your community.' },
  { week: 50, category: 'testosterone', title: 'Celebrating Your Body', summary: 'Your body has been your partner in this transformation. Celebrate it — its strength, its resilience, its capacity for healing. You and your body did this together.' },

  { week: 50, category: 'intimacy', title: 'A Year of Learning to Love', summary: 'This year taught you more about love — real love — than any previous year of your life. The capacity you\'ve built for genuine intimacy is the crown jewel of your recovery.' },
  { week: 50, category: 'intimacy', title: 'The Gift You Give', summary: 'By recovering, you gave the people you love the greatest gift possible: the real you. Not a distracted, shame-hidden, divided version. The authentic, present, whole you. That gift is priceless.' },
  { week: 50, category: 'intimacy', title: 'Looking Forward', summary: 'The relationships ahead of you — romantic, familial, friendships — will all be enriched by the person you have become. Your future connections will be deeper, truer, and more satisfying than anything before.' },
  { week: 50, category: 'intimacy', title: 'The Ongoing Practice', summary: 'Intimacy, like recovery, is a lifelong practice. There is always more to learn, more to give, more depth to discover. Stay curious. Stay open. Stay growing.' },
  { week: 50, category: 'intimacy', title: 'Love as Legacy', summary: 'The love you give and receive creates a legacy that extends far beyond your lifetime. Your children, your partner, your community — all are shaped by the quality of love you bring to the world.' },

  { week: 50, category: 'wisdom', title: 'On the Home Stretch', summary: 'Two weeks remain. 350 days behind you. What felt like a mountain is now a foothill in your rearview mirror. You didn\'t just climb it — you conquered it.', link: 'These final days are not the hardest part. They are the sweetest. Savor every single one.' },
  { week: 50, category: 'wisdom', title: 'On Being Alive', source: 'Mary Oliver', summary: 'Tell me, what else should I have done? Doesn\'t everything die at last, and too soon? Tell me, what is it you plan to do with your one wild and precious life?', link: 'You have answered this question with 350 days of intention. Now answer it for the rest of your life.' },
  { week: 50, category: 'wisdom', title: 'On Transformation', source: 'Rumi', summary: 'You were born with wings, why prefer to crawl through life?', link: 'You have found your wings. Spread them. Fly. You were never meant to crawl.' },
  { week: 50, category: 'wisdom', title: 'On Legacy', source: 'Ralph Waldo Emerson', summary: 'The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.', link: 'You have lived well this year. You have made a difference. Your life has mattered. Continue making it matter.' },
  { week: 50, category: 'wisdom', title: 'On Infinity', source: 'William Blake', summary: 'To see infinity in a grain of sand and eternity in an hour.', link: 'Each day of freedom contains infinity. Each hour of presence contains eternity. You have discovered this truth through experience.' },

  { week: 51, category: 'studies', title: 'Approaching Day 365: The Research', source: 'Addiction, 2021', summary: 'One year of sustained behavioral change represents a neurological, psychological, and social transformation. Research confirms that the probability of lifelong sustained recovery exceeds 85% at this milestone.' },
  { week: 51, category: 'studies', title: 'Growth That Continues', source: 'Psychological Science, 2021', summary: 'Post-recovery growth does not plateau at one year — it continues to accelerate. The skills, insights, and habits built during recovery produce compounding returns indefinitely.' },
  { week: 51, category: 'studies', title: 'The Integrated Self', source: 'Journal of Personality, 2020', summary: 'Integration — the alignment of values, behavior, emotions, and identity — is the hallmark of psychological health. After a year of recovery, you have achieved a level of integration that most people never experience.' },
  { week: 51, category: 'studies', title: 'Community as Medicine', source: 'JAMA Internal Medicine, 2019', summary: 'Community belonging reduces mortality risk by 26%. The community connections you\'ve built — and the community you can now serve — are literally life-saving.' },
  { week: 51, category: 'studies', title: 'The Neuroscience of Freedom', source: 'Nature Human Behaviour, 2020', summary: 'Neuroscience shows that genuine freedom — the ability to choose in alignment with values rather than impulses — requires strong prefrontal cortex function. You have built this. You are neurologically free.' },

  { week: 51, category: 'testosterone', title: 'One Year of Hormonal Freedom', summary: 'One full year. Your endocrine system operates at its natural best, unimpaired by the chronic overstimulation of addiction. This is what freedom feels like in your body.' },
  { week: 51, category: 'testosterone', title: 'Setting New Physical Goals', summary: 'With a year of hormonal optimization, you are ready for ambitious physical goals. A competition, a personal best, an adventure race. Your body is primed. Challenge it.' },
  { week: 51, category: 'testosterone', title: 'The Lifelong Commitment', summary: 'Hormonal health is a lifelong commitment, not a one-year project. The habits are embedded. The knowledge is internalized. The benefits are permanent — as long as you continue living well.' },
  { week: 51, category: 'testosterone', title: 'Testosterone and Purpose-Driven Living', summary: 'Your optimized testosterone now fuels purpose-driven living. The energy, drive, and confidence you\'ve built serve something bigger than yourself. Use them well.' },
  { week: 51, category: 'testosterone', title: 'Gratitude for the Journey', summary: 'Thank your body for this year of transformation. Thank the discipline that got you here. Thank the science that guided you. And look forward to decades of hormonal health ahead.' },

  { week: 51, category: 'intimacy', title: 'The Penultimate Week', summary: 'One week before completion, reflect on the intimacy you\'ve built — with yourself, with others, with life itself. The capacity for connection you now possess is remarkable.' },
  { week: 51, category: 'intimacy', title: 'Writing Your Love Letter', summary: 'Write a letter to yourself or your partner about what this year of recovery has meant. Put into words the transformation in how you love. This letter is a treasure for the future.' },
  { week: 51, category: 'intimacy', title: 'The Ongoing Commitment', summary: 'Day 365 is not the end of your commitment to authentic intimacy — it is the beginning of a lifetime of it. The skills you\'ve built are permanent. Keep using them.' },
  { week: 51, category: 'intimacy', title: 'Love as Your North Star', summary: 'Let love be your compass going forward — love for yourself, for others, for truth, for growth. When in doubt about any decision, ask: what does love require of me here?' },
  { week: 51, category: 'intimacy', title: 'The Full Heart', summary: 'Your heart is full — full of hard-won wisdom, genuine connection, and authentic love. This fullness is the reward of a year of courageous, honest, dedicated recovery. You earned every bit of it.' },

  { week: 51, category: 'wisdom', title: 'On the Final Week', summary: 'One week remains. 358 days of freedom. You have done what you once believed impossible. The person who started this journey would weep with pride at who you have become.', link: 'You are a testament to the human capacity for change. You are proof that freedom is possible.' },
  { week: 51, category: 'wisdom', title: 'On Completion', source: 'Lao Tzu', summary: 'The journey of a thousand miles ends with a single step.', link: 'Just as it began with a single step, it ends with one. Each of the final seven steps brings you home.' },
  { week: 51, category: 'wisdom', title: 'On What Remains', source: 'Rumi', summary: 'What you seek is seeking you.', link: 'The freedom you sought was seeking you too. The love you wanted was waiting for you. The person you wanted to become was always there, waiting to emerge.' },
  { week: 51, category: 'wisdom', title: 'On Tomorrow', source: 'Ralph Waldo Emerson', summary: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', link: 'What lies within you after 358 days of recovery is vast, powerful, and beautiful. It is the truest part of you.' },
  { week: 51, category: 'wisdom', title: 'On Gratitude', source: 'Meister Eckhart', summary: 'If the only prayer you ever say in your whole life is "thank you," that would suffice.', link: 'Thank you — to yourself, for showing up 358 times. To your support system. To whatever gave you the strength. Thank you is enough.' },

  { week: 52, category: 'studies', title: 'Day 365: The Complete Transformation', source: 'Comprehensive Psychiatry, 2021', summary: 'At 365 days, every measurable marker of recovery — neural, hormonal, psychological, social — confirms complete transformation. You have not just recovered. You have been reborn.' },
  { week: 52, category: 'studies', title: 'The Science of Sustained Freedom', source: 'Addiction, 2021', summary: 'With one year complete, the science is unequivocal: you have passed the critical threshold for lifelong sustained change. The neural pathways of recovery are now your default operating system.' },
  { week: 52, category: 'studies', title: 'Your Brain: Before and After', source: 'NeuroImage, 2021', summary: 'If you could see your brain on day 1 and day 365 side by side, you would see remarkable differences: restored gray matter, strengthened white matter, normalized reward circuits, and enhanced executive function.' },
  { week: 52, category: 'studies', title: 'The Ripple Effect of One Year', source: 'Social Science & Medicine, 2019', summary: 'Your transformation has influenced an average of 147 people in your social network, research suggests. Your recovery has been a quiet revolution touching lives you may never know about.' },
  { week: 52, category: 'studies', title: 'Beyond 365: The Research on Lifelong Recovery', source: 'Drug and Alcohol Dependence, 2021', summary: 'People who sustain recovery for one year show a 90%+ probability of lifelong sustained change. Day 365 is not the end — it is the beginning of a life lived in permanent freedom.' },

  { week: 52, category: 'testosterone', title: 'Year One Complete: Hormonal Triumph', summary: 'Three hundred sixty-five days of hormonal optimization through pure lifestyle change. No shortcuts. No supplements alone. Just discipline, consistency, and the relentless pursuit of your best self.' },
  { week: 52, category: 'testosterone', title: 'Your Hormonal Future', summary: 'The foundation you\'ve built will serve you for decades. The habits of hormonal health — sleep, exercise, nutrition, stress management — are now second nature. Your future self thanks you.' },
  { week: 52, category: 'testosterone', title: 'The Complete Man', summary: 'Optimal hormonal health is one component of the complete man: physical vitality combined with emotional depth, intellectual curiosity, and spiritual purpose. You are becoming complete.' },
  { week: 52, category: 'testosterone', title: 'Passing the Torch', summary: 'Share your hormonal health knowledge with every man who needs it. Your experience is a torch that can light the way for others still in darkness. Pass it forward generously.' },
  { week: 52, category: 'testosterone', title: 'Celebration', summary: 'Celebrate your body. Celebrate your discipline. Celebrate the vitality that pulses through you. You earned this — every ounce of energy, every degree of confidence, every moment of clarity.' },

  { week: 52, category: 'intimacy', title: 'Day 365: The Intimacy You\'ve Earned', summary: 'You can now experience intimacy at a depth that was impossible 365 days ago — present, connected, authentic, free. This capacity for love is the ultimate achievement of your recovery.' },
  { week: 52, category: 'intimacy', title: 'A Year of Real Connection', summary: 'Reflect on every connection that deepened this year — with your partner, your friends, your family, yourself. These deepened connections are the living proof of your transformation.' },
  { week: 52, category: 'intimacy', title: 'The Love You Deserve', summary: 'You deserve love — deep, honest, passionate, enduring love. You have spent 365 days becoming someone who can both give and receive that love fully. You are ready.' },
  { week: 52, category: 'intimacy', title: 'Intimacy Forever', summary: 'The capacity for intimacy you\'ve built is permanent. It will deepen with practice, expand with time, and enrich every relationship for the rest of your life. This is your gift to keep.' },
  { week: 52, category: 'intimacy', title: 'Love Won', summary: 'You chose love over addiction. Presence over escape. Connection over isolation. Real over artificial. For 365 consecutive days, you chose love. And love won.' },

  { week: 52, category: 'wisdom', title: 'Day 365', summary: 'You did it. Three hundred and sixty-five days. One full year. What was once unimaginable is now your reality. You are free.', link: 'This is not the end. This is the beginning of a life lived without chains. Go live it fully.' },
  { week: 52, category: 'wisdom', title: 'On Victory', source: 'Marcus Aurelius', summary: 'The impediment to action advances action. What stands in the way becomes the way.', link: 'The addiction that once stood in your way became the path to your greatest strength. You turned obstacle into opportunity.' },
  { week: 52, category: 'wisdom', title: 'On the New Beginning', source: 'Rumi', summary: 'Don\'t grieve. Anything you lose comes round in another form.', link: 'What you lost — the numbing, the escape — has returned as clarity, presence, and joy. You lost nothing. You gained everything.' },
  { week: 52, category: 'wisdom', title: 'On Your Legacy', summary: 'You are proof that a man can face his deepest struggle, fight it with courage, and emerge victorious. Your story will inspire others for years to come. Live it well.', link: 'Your legacy is not just 365 days clean. It is a life transformed, relationships deepened, and a future without limits.' },
  { week: 52, category: 'wisdom', title: 'On Forever', source: 'The Reclaim Community', summary: 'You reclaimed your life. Day by day, choice by choice, you reclaimed your mind, your body, your relationships, and your future. Welcome to freedom. It\'s yours to keep — forever.', link: 'This is the last resource of your 365-day journey. But it is the first day of the rest of your free life. Go live it.' },

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

  console.log(`Done! Seeded ${resources.length} resources across weeks 1-52.`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
