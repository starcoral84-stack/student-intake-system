// Content definitions for the Romantic Partner Matrix.
// Everything the UI renders (archetypes, chips, rating scales) lives here so it is defined once.

export const ARCHETYPES = [
  { name: 'The Innocent', short: 'Innocent',
    drive: 'Safety, trust, faith in goodness',
    rel: 'Optimistic, sees the best in partner, offers unconditional trust and forgiveness. Brings simplicity and hope. Believes love conquers all.',
    shadow: 'Naive and in denial about red flags. Avoids difficult truths. Childlike dependency on partner for protection. Can be taken advantage of easily.',
    growth: 'Develop healthy skepticism while maintaining faith. Learn to see reality clearly without losing hope.' },
  { name: 'The Orphan/Everyman', short: 'Orphan',
    drive: 'Belonging, connection, authentic community',
    rel: 'Down-to-earth, realistic, relatable. Values equality and authenticity. Great at building genuine connection without pretense. Accepts partner as they are.',
    shadow: '"Life is unfair, I always get abandoned." Cynical and victimized. Can feel powerless and lost. May seek belonging through unhealthy conformity or people-pleasing.',
    growth: 'Reclaim personal power. Move from victim to empowered participant. Belong to yourself first.' },
  { name: 'The Hero/Warrior', short: 'Hero',
    drive: 'Mastery, achievement, proving worth through courage',
    rel: 'Protective, loyal, determined. Faces relationship challenges head-on. Fights for the partnership. Takes responsibility and solves problems. Shows love through action.',
    shadow: 'Arrogant, needs conflict to feel alive. Creates enemies or problems to solve. Can\'t relax or be vulnerable. Proves worth through conquering rather than connecting. Controlling.',
    growth: 'Learn that vulnerability is true courage. Rest without needing to achieve. Accept love without earning it.' },
  { name: 'The Caregiver', short: 'Caregiver',
    drive: 'Helping others, protecting, nurturing, service',
    rel: 'Compassionate, attentive, selfless. Anticipates partner\'s needs. Creates safety and comfort. Deeply empathetic. Shows love through care and support.',
    shadow: 'Martyrdom and codependency. Ignores own needs completely. Enables partner\'s dysfunction. Can become resentful when care isn\'t reciprocated. Smothering.',
    growth: 'Care for self as much as others. Set boundaries. Let others struggle and grow. Receive care without guilt.' },
  { name: 'The Explorer', short: 'Explorer',
    drive: 'Freedom, authenticity, discovery, individuality',
    rel: 'Independent, adventurous, authentic. Brings excitement and new experiences. Values partner\'s individuality. Non-conforming. Resists societal relationship scripts.',
    shadow: 'Commitment-phobic. Runs when things get too close. Aimlessly wanders, never satisfied. Uses "finding myself" to avoid intimacy. Selfish in name of freedom.',
    growth: 'Learn that commitment can coexist with freedom. Discover yourself through deep intimacy, not escape.' },
  { name: 'The Rebel', short: 'Rebel',
    drive: 'Liberation, revolution, disrupting oppressive systems',
    rel: 'Questions norms, breaks toxic patterns, fights for justice and equality. Catalyzes change. Won\'t tolerate abuse or control. Empowering.',
    shadow: 'Destructive for its own sake. Rebels against healthy structure too. Creates chaos. Identifies with victimhood and oppression. Sabotages good relationships.',
    growth: 'Discern what truly needs disruption. Build, don\'t just destroy. Find freedom within healthy commitment.' },
  { name: 'The Lover', short: 'Lover',
    drive: 'Intimacy, beauty, passion, deep connection',
    rel: 'Deeply romantic, sensual, committed. Creates beauty and magic. Fully present and devoted. Values emotional and physical intimacy above all. All-in.',
    shadow: 'Obsessive, jealous, possessive. Loses self completely in partner. Addictive love patterns. Can\'t function without romance. Devastated by rejection.',
    growth: 'Maintain identity within intimacy. Love without attachment. Find wholeness in self, not just in union.' },
  { name: 'The Creator', short: 'Creator',
    drive: 'Self-expression, innovation, bringing visions to life',
    rel: 'Imaginative, expressive, builds beautiful partnership. Creates new relationship models. Manifests shared dreams. Adds artistry to everyday life.',
    shadow: 'Perfectionist who\'s never satisfied. Blocks creativity with criticism. Abandons projects (including relationship) when not perfect. Self-absorbed in creative process.',
    growth: 'Embrace messy creation. Complete what you start. Balance artistry with presence. Create with, not just for, partner.' },
  { name: 'The Jester', short: 'Jester',
    drive: 'Joy, play, living fully in the present moment',
    rel: 'Playful, spontaneous, lightens heavy moments. Uses humor to heal. Brings laughter and joy. Doesn\'t take life too seriously. Fun partner.',
    shadow: 'Irresponsible, can\'t be serious when needed. Hides pain behind jokes. Avoids depth. Distracts from real issues with humor. Peter Pan syndrome.',
    growth: 'Balance play with responsibility. Use humor wisely. Feel pain without deflecting. Grow up without losing joy.' },
  { name: 'The Sage', short: 'Sage',
    drive: 'Truth, wisdom, understanding, knowledge',
    rel: 'Wise, reflective, seeks understanding. Offers insight and perspective. Values deep conversations. Learns from every experience. Patient teacher.',
    shadow: 'Detached intellectual, lives in head. Paralyzed by analysis. Judges rather than connects. Dogmatic about their truth. Emotionally unavailable. Cold.',
    growth: 'Descend from head to heart. Wisdom includes feeling. Be present, not just observing. Share knowledge with warmth.' },
  { name: 'The Magician', short: 'Magician',
    drive: 'Transformation, making dreams real, profound change',
    rel: 'Visionary, catalyzes partner\'s growth. Helps manifest shared dreams. Sees potential in partner. Creates alchemical transformation. Healing presence.',
    shadow: 'Manipulative, uses power selfishly. Gaslights or controls under guise of "helping grow." Delusional about abilities. Plays god. Ungrounded spirituality.',
    growth: 'Use power ethically. Stay grounded. Transform with consent. Balance vision with reality. Empower, don\'t control.' },
  { name: 'The Ruler', short: 'Ruler',
    drive: 'Control, order, stability, creating structure from chaos',
    rel: 'Organized, reliable, provides stability. Takes charge when needed. Creates systems that work. Protects and provides. Strong leadership.',
    shadow: 'Tyrannical, controlling, dominating. Power-hungry. Micromanages partner. "My way or the highway." Rigid and inflexible. Can\'t surrender control.',
    growth: 'Lead through service, not dominance. Allow chaos and spontaneity. Share power. Trust others to lead sometimes.' },
];

export const REACTORS = [
  ['Withdrawal/Stonewalling', 'Shutting down, going silent, emotionally checking out'],
  ['Criticism/Blame', 'Finding fault, attacking character, shifting responsibility'],
  ['Defensiveness', 'Making excuses, counter-attacking, playing victim'],
  ['Contempt/Sarcasm', 'Eye-rolling, mockery, treating with disdain'],
  ['Anger/Rage', 'Explosive reactions, yelling, threatening'],
  ['People-Pleasing', 'Abandoning own needs, excessive accommodation'],
  ['Numbing (Substances/TV/Food)', 'Using substances, TV, food to avoid feelings'],
  ['Workaholism', 'Escaping into work to avoid intimacy'],
  ['Intellectualizing', 'Over-analyzing to avoid feeling'],
  ['Caretaking Others', 'Focusing on others\' problems to avoid your own'],
];

export const CORE_NEEDS = [
  ['Safety & Security', 'Feeling physically and emotionally safe, protected from harm'],
  ['Being Seen & Understood', 'Having your authentic self recognized and valued'],
  ['Love & Belonging', 'Being accepted as part of a group or relationship'],
  ['Validation & Worth', 'Having your feelings and existence affirmed'],
  ['Freedom & Autonomy', 'Making your own choices without undue influence'],
  ['Control & Certainty', 'Having predictability and influence over your life'],
  ['Connection & Intimacy', 'Deep emotional and physical closeness with others'],
  ['Purpose & Meaning', 'Feeling your life has significance and direction'],
];

export const EMOTIONS = {
  resourceful: [
    ['Joy', 'Natural sense of delight and aliveness in daily life'],
    ['Contentment', 'Peaceful satisfaction with what is'],
    ['Gratitude', 'Consistent appreciation for life and people'],
    ['Peace', 'Inner calm and equanimity, even amid challenges'],
    ['Playful', 'Light-hearted, spontaneous, finds fun in ordinary moments'],
    ['Curiosity', 'Eager to learn and explore, open to new experiences'],
  ],
  survival: [
    ['Anxiety/Fear', 'Constantly worried about what might go wrong'],
    ['Sadness/Grief', 'Underlying sense of loss or melancholy'],
    ['Anger/Resentment', 'Chronically frustrated or irritated'],
    ['Shame', 'Feeling fundamentally flawed or unworthy'],
    ['Guilt', 'Feeling responsible for others\' pain'],
    ['Loneliness', 'Persistent sense of disconnection'],
    ['Restlessness', 'Can\'t settle, always seeking the next thing'],
    ['Numbness', 'Emotional flatness or disconnection from feelings'],
  ],
};

export const CENTRES = [
  ['Mind', 'Thinking', 'You process through thinking, analyzing, planning. You need to understand before acting. Can overthink and disconnect from feelings.'],
  ['Heart', 'Feeling', 'You lead with feelings and emotions. You\'re empathetic and relationship-focused. Can lose yourself in others\' emotions.'],
  ['Body', 'Doing', 'You\'re action-oriented and instinctual. You trust your gut and physical sensations. Can act before fully processing.'],
  ['Sacral', 'Desiring', 'You\'re driven by desire, passion, and life force energy. You follow what feels alive and magnetic. Can be impulsive or pleasure-seeking.'],
];

export const ATTACHMENTS = [
  ['Secure', 'Comfortable with intimacy and independence. Trusts others and self. Can communicate needs clearly.'],
  ['Anxious', 'Craves closeness and reassurance. Fears abandonment. Can be clingy or need constant validation.'],
  ['Avoidant', 'Values independence highly. Uncomfortable with too much closeness. Can seem emotionally distant or dismissive.'],
  ['Fearful-Avoidant', 'Wants intimacy but fears it. Sends mixed signals. Approach-avoid pattern in relationships.'],
  ['Hyper-Independent', 'Self-reliant to a fault. Struggles to accept help or show vulnerability. Believes they can only count on themselves.'],
];

export const EXILE_EXAMPLES = [
  'The part that felt abandoned when parents divorced',
  'The part that was shamed for being "too sensitive"',
  'The part that felt invisible or neglected as a child',
  'The part that was rejected for expressing needs',
  'The part that experienced betrayal and now struggles to trust',
  'The part that was told your feelings didn\'t matter',
];

export const WOUND_EXAMPLES = [
  'I am not enough / I am fundamentally flawed',
  'Love is not safe / People will hurt me',
  'I will be abandoned if I show my true self',
  'My needs don\'t matter / I must earn love',
  'I am unlovable / Nobody stays',
  'Vulnerability leads to pain and rejection',
];

// Rating sections. Each metric: [field, label, short label, [1-2, 3-4, 5-6, 7-8, 9-10 descriptions]]
export const SECTIONS = [
  { id: 'unity', icon: '⭐', title: 'Higher Self & Unity', category: 'Unity & Higher Self', metrics: [
    ['total_compatibility', 'Total Compatibility', 'Overall', [
      'Fundamentally incompatible. Daily fights over core issues. Can\'t agree on lifestyle, values, money, intimacy, or future. Feel like enemies living together. One or both feel trapped and miserable.',
      'Significant challenges. Frequent arguments, different needs for space/closeness. Major compromises feel like sacrifices. Questioning if it\'s worth staying. Some good moments but overshadowed by tension.',
      'Moderate compatibility. Get along most days but have recurring conflicts. Some needs met, others neglected. Not sure if differences are dealbreakers. Good friendship but romantic connection inconsistent.',
      'Strong compatibility. Resolve conflicts constructively, align on life direction, money, kids. Feel seen and supported. Manageable differences that don\'t threaten the foundation. Choose each other daily.',
      'Exceptional compatibility. Rare deep alignment across all dimensions. Similar values, communication flows naturally, conflicts lead to growth. Feel like true partners in life. Brings out your best self.']],
    ['higher_self', 'Higher Self (Unity)', 'Higher Self', [
      'Entirely ego-driven. Always reactive, defensive, blames others. Can\'t see beyond "me vs you." Takes everything personally. Zero capacity to zoom out or see the bigger picture during conflict.',
      'Mostly ego-based. Caught in personal drama 90% of the time. Rare moments of perspective but quickly returns to defensiveness. Intellectual understanding of higher consciousness but can\'t access it when triggered.',
      'Balanced. Can access higher perspective when calm but loses it under stress. Recognizes ego patterns after the fact. Practices meditation or self-reflection. Sometimes sees both sides of conflict.',
      'Regularly operates from higher self. Maintains perspective even when triggered. Sees conflicts as growth opportunities. Holds space for partner\'s pain without taking it personally. Practices loving detachment.',
      'Consistently embodies unity consciousness. Transcends personal drama naturally. Sees oneness even in conflict. No attachment to being right. Responds to pain with compassion. Spiritual maturity guides all interactions.']],
    ['understanding', 'Understanding', 'Understanding', [
      'Constantly misunderstands each other. "You never get me!" Feel invisible, unheard. Explanations fall flat. No effort to understand your world, triggers, or background. Talks past each other.',
      'Surface-level understanding only. Knows basic facts but not emotional landscape. Misreads your intentions regularly. Doesn\'t grasp your core fears or needs. You have to over-explain everything.',
      'Decent understanding with blind spots. Gets you when you\'re clear but misses subtleties. Understands your words but not always the feelings beneath. Has to ask for clarification often.',
      'Deep understanding of core needs, fears, patterns, and triggers. Knows your wounds and respects them. Gets your humor, references, emotional logic. Can explain you to others accurately.',
      'Profound mutual understanding. Finishes sentences, anticipates needs, reads microexpressions. Knows your inner child, shadows, dreams. Understands why you are the way you are. Feels deeply known.']],
    ['compassion', 'Compassion', 'Compassion', [
      'Critical and judgmental. "Get over it" or "You\'re too sensitive." Mocks your struggles. No empathy when you\'re hurting. Makes your pain about them. Minimizes or dismisses your emotions.',
      'Occasional compassion but inconsistent. Supportive when convenient but withdraws when it gets hard. Dismissive when triggered. "I have problems too." Surface sympathy without real care.',
      'Compassionate when calm but harsh under stress. Tries to be supportive but loses patience. Sometimes caring, sometimes cold. Compassion depends on their mood. Wants to help but gets frustrated.',
      'Consistently compassionate. Holds space for your pain without fixing. Validates emotions even when doesn\'t agree. Stays present when you\'re struggling. Remembers to check in on you.',
      'Deep compassion even during conflict. Sees the wounded child beneath reactive behavior. Responds to attacks with gentleness. Never uses vulnerabilities against you. Boundless capacity to hold suffering.']],
    ['life_alignment', 'Life Alignment', 'Life Alignment', [
      'Completely misaligned. One wants kids, other doesn\'t. Opposite life speeds. Conflicting money values (saver vs spender). Different spiritual/political views. Want to live in different places. Incompatible lifestyles.',
      'Significant misalignment. Agree on some things but major dealbreakers loom (marriage timeline, career ambitions, family involvement). Requires constant negotiation that feels exhausting. Core values differ.',
      'Some alignment but major differences. Agree on big picture but disagree on details. Similar values but different priorities. Want same general lifestyle but different execution.',
      'Strong alignment. Agree on kids, money, lifestyle pace, where to live. Similar spiritual/philosophical views. Shared vision of the future. Minor differences feel navigable.',
      'Exceptional alignment. Naturally want the same things. Shared life vision, timeline, values, and priorities. Dreams complement each other. No fundamental conflicts about direction.']],
  ]},
  { id: 'mind', icon: '🧠', title: 'Mind', category: 'Mind / Communication', metrics: [
    ['mind_discernment', 'Discernment', 'Discernment', [
      'Poor judgment, constantly makes impulsive decisions. No pause between trigger and reaction. Falls for manipulation easily. Can\'t evaluate consequences. Black-and-white thinking dominates.',
      'Limited discernment. Easily swayed by emotions or others\' opinions. Reactive rather than responsive. Makes decisions they regret later. Struggles to assess situations clearly.',
      'Decent judgment but inconsistent. Wise in some areas, impulsive in others. Can think critically when calm but loses it under pressure. Learning but still making avoidable mistakes.',
      'Strong discernment. Takes time before big decisions. Considers multiple perspectives. Learns from past mistakes. Balances logic and intuition. Rarely makes choices they regret.',
      'Exceptional wisdom. Sees through illusions and manipulation. Makes conscious, values-aligned choices. Trusts intuition backed by experience. Others seek their counsel. Clarity in complexity.']],
    ['discussion', 'Discussion', 'Discussion', [
      'Cannot have productive conversations. Either shuts down silent or attacks with criticism. Monologues rather than dialogues. Doesn\'t listen, just waits to respond. Zero curiosity about your perspective.',
      'Struggles with dialogue. Gets defensive quickly. Interrupts constantly. Turns everything into debate to win. Avoids difficult topics. Conversations feel like walking on eggshells.',
      'Can discuss most things but becomes reactive with touchy subjects. Listens when not triggered. Sometimes curious, sometimes defensive. Conversations work when both are calm.',
      'Engages in healthy dialogue. Asks questions to understand. Stays curious even when disagreeing. Can discuss difficult topics without shutting down. Makes you feel heard.',
      'Masterful communicator. Creates safety for vulnerable conversations. Asks profound questions. Truly listens without agenda. Conversations leave you feeling understood and inspired.']],
    ['disagreement', 'Disagreement (Conflict Resolution)', 'Conflict', [
      'Conflict is destructive warfare. Name-calling, contempt, bringing up past wounds. Silent treatment for days. Threatens breakup. No resolution, just explosions or shutdown.',
      'Poor conflict skills. Escalates quickly to yelling. Holds grudges for weeks. Defensive and blaming. Avoids conflict until it explodes. Unresolved issues pile up.',
      'Can eventually resolve conflicts but takes hours or days. Gets heated but not abusive. Someone usually apologizes. Progress happens but it\'s exhausting.',
      'Handles disagreements constructively. Takes breaks when needed. Uses "I feel" statements. Repairs quickly with genuine apologies. Focuses on understanding, not winning.',
      'Conflict deepens intimacy. Both stay curious and respectful even when hurt. Quick repairs with humor and tenderness. Learn from every disagreement. Feel closer after resolving.']],
  ]},
  { id: 'heart', icon: '💝', title: 'Heart', category: 'Heart / Emotional', metrics: [
    ['heart_patience', 'Patience', 'Patience', [
      'Zero patience. "Why aren\'t you over this yet?" Demands instant change and perfection. Intolerant of learning curves, mistakes, or healing processes. Makes you feel broken for needing time.',
      'Limited patience. Supportive initially but quickly frustrated. "We\'ve talked about this already." Impatient with your growth pace. Sighs and shows irritation when you\'re struggling.',
      'Moderate patience most days but loses it under stress. Patient with small things, impatient with big changes. Understands healing takes time intellectually but emotionally wants faster progress.',
      'Patient with your growth process. Doesn\'t rush your healing. Celebrates small progress. Trusts your timing. Allows you to be messy and imperfect.',
      'Infinitely patient. Zero pressure or urgency. Meets you exactly where you are with acceptance. Patient even when you\'re not patient with yourself. Grace personified.']],
    ['empathy', 'Empathy', 'Empathy', [
      'Cannot feel or acknowledge others\' emotions. "That\'s illogical" or "You\'re overreacting." Cold, analytical, detached. Actively uncomfortable with emotions.',
      'Limited empathy. Intellectualizes feelings rather than feeling with you. "I understand but..." Shows sympathy from a distance but doesn\'t really feel your pain.',
      'Empathetic but selective. Can feel with you when it doesn\'t threaten them. Sometimes present, sometimes dismissive. Empathy depends on whether they\'re triggered.',
      'Deeply empathetic. Feels your emotions without taking them on. Genuinely affected by your pain. Shows up emotionally. Can sit in difficult feelings with you.',
      'Profound empathy that doesn\'t lose itself. Holds your pain without drowning in it. Feels your joy as their own. Senses emotions you haven\'t voiced. Pure emotional attunement.']],
  ]},
  { id: 'sacral', icon: '🔥', title: 'Animal (Sacral)', category: 'Sacral / Physical', metrics: [
    ['s_chemistry', 'Sexual Chemistry', 'Chemistry', [
      'Zero attraction. Feels like siblings or roommates. No physical spark whatsoever. Touch feels obligatory or uncomfortable.',
      'Minimal chemistry. Intimacy happens occasionally out of obligation. Rarely initiate. Physical intimacy feels lackluster.',
      'Moderate attraction. Pleasant but not passionate. Sometimes hot, often just okay. Attraction waxes and wanes. Functional but not magnetic.',
      'Strong chemistry. Mutual desire and consistent attraction. Intimacy is fun, connecting, satisfying. Both initiate regularly.',
      'Electric chemistry. Magnetic pull. Deeply connecting intimacy. Even after years, desire stays strong. Bodies speak the same language.']],
    ['eros', 'Eros (Aliveness / Fire)', 'Eros', [
      'Dead, flat energy. Feel depleted and drained together. No play, passion, or spark. Suffocating heaviness.',
      'Low energy. Feels monotonous and draining. Lots of routine, little spontaneity. Rarely laugh or play together. Coexisting, not thriving.',
      'Some aliveness but inconsistent. Good moments but also flat periods. Depends on external circumstances. Life feels lukewarm together.',
      'Vibrant energy. Feel energized, inspired, alive together. Lots of laughter, play, adventure. Life feels richer and fuller.',
      'Electrifying life force. Feel most alive and lit up by life together. Everything is an adventure. Passion for life and each other.']],
    ['comfort', 'Comfort (Safety)', 'Safety', [
      'Feel unsafe and anxious constantly. Walking on eggshells. Hypervigilant about their moods. Can\'t relax or let guard down. Nervous system always activated.',
      'Limited safety. Some moments of peace but mostly tense. Afraid to share fully. Monitor what you say. Relationship triggers anxiety more than soothes it.',
      'Generally safe but with exceptions. Comfortable most of the time but certain topics feel dangerous. Safety is conditional on good behavior.',
      'Deep safety and comfort. Can share vulnerably without fear of judgment. Nervous system relaxes around them. Can be messy and show all parts.',
      'Complete safety. Most relaxed and authentic self. Feel held, protected, seen. Like coming home. Safest place in the world.']],
  ]},
];

export const ALL_METRICS = SECTIONS.flatMap(s => s.metrics.map(([field, label, short, scale]) => ({ field, label, short, scale, section: s.id, category: s.category })));
// Metrics used for the comparison charts (everything except the overall self-rating).
export const CHART_METRICS = ALL_METRICS.filter(m => m.field !== 'total_compatibility');

export const TEXT_FIELDS = ['partner_name', 'person_type', 'main_ego', 'reactors', 'core_need', 'exiled_parts', 'core_unhealed',
  'predominant_emotion', 'breakup_reason', 'trauma_regret', 'dominant_centre', 'attachment_pattern', 'notes'];

export const SAMPLE_PAIR = [
  { partner_name: 'Alexandra', person_type: 'Self', main_ego: 'The Caregiver',
    reactors: 'People-Pleasing, Caretaking Others, Workaholism', core_need: 'Validation & Worth',
    exiled_parts: 'The part that felt invisible as a child, always giving but never receiving',
    core_unhealed: 'I must earn love through service / My needs don\'t matter', predominant_emotion: 'Anxiety/Fear',
    breakup_reason: 'Partner felt smothered by constant care-taking, needed more space',
    trauma_regret: 'Wish I had set boundaries earlier and not lost myself in the relationship',
    dominant_centre: 'Heart', attachment_pattern: 'Anxious',
    total_compatibility: 7, higher_self: 6, understanding: 8, compassion: 9, life_alignment: 7, mind_discernment: 6,
    discussion: 7, disagreement: 5, heart_patience: 8, empathy: 9, s_chemistry: 7, eros: 6, comfort: 8 },
  { partner_name: 'Marcus', person_type: 'Partner', main_ego: 'The Explorer',
    reactors: 'Withdrawal/Stonewalling, Intellectualizing, Numbing (Substances/TV/Food)', core_need: 'Freedom & Autonomy',
    exiled_parts: 'The part that felt trapped by family expectations, forced to conform',
    core_unhealed: 'Love is a cage / I will lose myself if I stay too close', predominant_emotion: 'Restlessness',
    breakup_reason: 'Felt suffocated by partner\'s need for constant connection',
    trauma_regret: 'Regret not communicating my need for independence more clearly',
    dominant_centre: 'Mind', attachment_pattern: 'Avoidant',
    total_compatibility: 7, higher_self: 5, understanding: 6, compassion: 5, life_alignment: 7, mind_discernment: 8,
    discussion: 6, disagreement: 4, heart_patience: 4, empathy: 5, s_chemistry: 8, eros: 7, comfort: 6 },
];

// Alain de Botton / School of Life idea: the qualities that attract us carry their own downside.
// [what tends to attract, how it can feel on a hard day]
export const FLIPS = {
  'The Innocent': ['hopefulness and trust', 'naivety, or not wanting to hear bad news'],
  'The Orphan/Everyman': ['down-to-earth realism', 'cynicism and expecting to be let down'],
  'The Hero/Warrior': ['protectiveness and drive', 'combativeness, or never switching off'],
  'The Caregiver': ['warmth and attentiveness', 'smothering, or quiet resentment'],
  'The Explorer': ['independence and adventure', 'unavailability, or one foot out the door'],
  'The Rebel': ['courage to challenge what is wrong', 'opposing things just to oppose them'],
  'The Lover': ['devotion and passion', 'intensity, jealousy, or losing themselves'],
  'The Creator': ['vision and originality', 'perfectionism, or disappearing into projects'],
  'The Jester': ['playfulness and lightness', 'deflecting serious moments with jokes'],
  'The Sage': ['wisdom and calm reasoning', 'coolness, or analysing instead of feeling'],
  'The Magician': ['seeing your potential', 'trying to change you'],
  'The Ruler': ['reliability and leadership', 'control and rigidity'],
};

export const GENERAL_FLIPS = [
  ['Spontaneous', 'Unreliable'], ['Dependable', 'Rigid'], ['Passionate', 'Volatile'], ['Calm', 'Detached'],
  ['Ambitious', 'Absent'], ['Generous', 'Self-neglecting'], ['Precise', 'Critical'], ['Free-spirited', 'Uncommitted'],
  ['Protective', 'Controlling'], ['Playful', 'Unserious'], ['Sensitive', 'Easily hurt'], ['Confident', 'Domineering'],
  ['Easy-going', 'Passive'], ['Principled', 'Judgemental'],
];
