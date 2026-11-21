// "Learn" page: the ideas behind each part of the assessment.
// Each topic: id, icon, title, lead, body (HTML), app (how it shows up in the app), step (assessment step to jump to), reflect (questions).
import { ARCHETYPES, FLIPS, GENERAL_FLIPS } from './data.js';

const table = (head, rows) => `<div class="table-wrap"><table class="learn-table"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

export const LEARN = [
  {
    id: 'overview', icon: '🗺️', title: 'How the assessment fits together',
    lead: 'The assessment moves from the inside out: who is inside you, what hurts, what you need, how you bond, and finally how the relationship actually feels.',
    body: `
      <ol class="flow">
        <li><strong>Parts</strong> <span>Main ego, protectors and reactors: the characters that run the show day to day and step in under stress.</span></li>
        <li><strong>Wounds</strong> <span>Exiled parts and the core wound: the old pain those protectors are guarding.</span></li>
        <li><strong>Needs</strong> <span>What the wound is hungry for: safety, being seen, freedom, belonging…</span></li>
        <li><strong>Bonding</strong> <span>Attachment pattern and dominant centre: the strategy you learned for getting those needs met in close relationships.</span></li>
        <li><strong>Experience</strong> <span>13 ratings across Unity, Mind, Heart and Sacral (body/desire): how the relationship is actually going.</span></li>
        <li><strong>Comparison</strong> <span>Put two people side by side to see shared strengths, perception gaps and the patterns your parts create together.</span></li>
      </ol>
      <p>A useful way to hold the whole thing: <em>your protectors are strategies for meeting your needs without re-opening your wounds.</em> In a relationship, two sets of strategies meet. Often each person's protection is exactly what triggers the other's wound. Seeing that loop clearly is usually the first step out of it.</p>
      <p>The four rating groups echo an old idea that we have several "centres": thinking (Mind), feeling (Heart), and an instinctive, embodied life (Sacral/Body). Unity sits above them: the capacity to step back and see the relationship as a shared project rather than a contest.</p>`,
    app: 'Each step of the assessment maps to one of these layers. Read a topic below, then jump into the step it explains.',
    reflect: ['Which layer do you find easiest to talk about? Which do you avoid?', 'What protector of yours does your partner see most often?'],
  },
  {
    id: 'ifs', icon: '🧩', title: 'No Bad Parts: Internal Family Systems', step: 1,
    lead: 'Internal Family Systems (IFS), developed by therapist Richard Schwartz and popularised in his book "No Bad Parts" (2021), sees the mind as a family of sub-personalities called parts, plus a core Self.',
    body: `
      <p>The central claim is in the title: <strong>there are no bad parts.</strong> Even the parts that rage, numb out, or criticise you are trying to help. They took on extreme roles, usually early in life, to protect you from pain. They can't relax until they trust that the pain is being cared for.</p>
      <h4>The three kinds of parts</h4>
      ${table(['Role', 'What it does', 'In this app'], [
        ['<strong>Managers</strong> (proactive protectors)', 'Try to keep you safe before anything goes wrong: planning, pleasing, controlling, perfecting, staying busy, being "the strong one".', 'Main Ego &amp; Protectors'],
        ['<strong>Firefighters</strong> (reactive protectors)', 'Rush in once pain breaks through, to put the fire out fast: rage, shutting down, drinking, scrolling, bingeing, affairs, dissociation.', 'Reactors'],
        ['<strong>Exiles</strong>', 'Young, hurt parts carrying shame, fear or grief. The system locks them away because their feelings once felt overwhelming.', 'Exiled Parts &amp; Core Wound'],
      ])}
      <h4>The Self</h4>
      <p>Underneath the parts, IFS says everyone has an undamaged core, the <strong>Self</strong>. You can recognise it by the "8 Cs": <em>calm, curiosity, compassion, confidence, courage, clarity, creativity and connectedness</em>. When you are "in Self", you can be with a part instead of being taken over by it. This is the closest idea to the app's <strong>Higher Self (Unity)</strong> rating.</p>
      <h4>Parts in relationships</h4>
      <p>Schwartz describes couples as two parts systems colliding. One partner's firefighter (for example, withdrawing) triggers the other's exile (fear of abandonment), which calls up their manager (pursuing, criticising), which triggers the first partner's exile (fear of being controlled)… and round it goes. The way out is for each person to notice "a part of me is activated" and speak <em>for</em> the part rather than <em>from</em> it: "A part of me is scared you're leaving" instead of "You always walk away."</p>
      <p>Schwartz also warns against making your partner responsible for your exiles. They can be kind to them, but the deeper healing is your Self caring for your own parts. He calls this being your own "primary caretaker".</p>`,
    app: 'Main Ego = your managers. Reactors = your firefighters. Exiled Parts and Core Wound = your exiles. Higher Self = how much Self-energy you can bring.',
    reflect: ['Which part of you shows up first when you feel unloved?', 'What is that part afraid would happen if it stopped doing its job?', 'Can you say "a part of me…" next time you are triggered?'],
  },
  {
    id: 'saboteurs', icon: '🎭', title: 'Saboteurs', step: 1,
    lead: 'In "Positive Intelligence" (2012), Shirzad Chamine describes ten "Saboteurs": mental habits that once protected us but now cause stress, conflict and self-sabotage.',
    body: `
      <p>Saboteurs overlap with IFS managers and firefighters. They are protective strategies that formed in childhood and then outlived their usefulness. Chamine's model has one universal Saboteur, <strong>the Judge</strong>, which finds fault with yourself, others and circumstances, plus nine "accomplices". Most people lead with one or two.</p>
      ${table(['Saboteur', 'Sounds like', 'In a relationship'], [
        ['<strong>Judge</strong>', '"What\'s wrong with me / you / this?"', 'Constant fault-finding; the partner never measures up'],
        ['Stickler', '"There\'s a right way to do this."', 'Corrects and critiques; the partner feels never good enough'],
        ['Pleaser', '"If I help them, they\'ll love me."', 'Abandons own needs, then feels resentful'],
        ['Hyper-Achiever', '"I\'m only worth what I accomplish."', 'Work comes first; intimacy feels unproductive'],
        ['Victim', '"Why does this always happen to me?"', 'Draws care through suffering; resists solutions'],
        ['Hyper-Rational', '"Feelings are irrelevant."', 'Logic replaces empathy; the partner feels unseen'],
        ['Hyper-Vigilant', '"What could go wrong?"', 'Anxious monitoring; hard to relax together'],
        ['Restless', '"Something better is around the corner."', 'Can\'t settle; boredom with ordinary closeness'],
        ['Controller', '"I need to be in charge."', 'Takes over plans and decisions; the partner feels managed'],
        ['Avoider', '"Let\'s not make a big deal of it."', 'Sidesteps conflict until problems pile up'],
      ])}
      <p>Chamine's antidote is to <strong>notice and label</strong> the saboteur ("that's my Controller") and shift into what he calls the <strong>Sage</strong> perspective: empathy, curiosity, creativity, finding a way forward, and calm action. He also suggests short, frequent attention-to-the-body exercises to interrupt the habit. That idea is close to IFS's Self and the app's Unity rating.</p>`,
    app: 'Saboteurs show up in Reactors and in your Main Ego. The "Under stress" insight on the comparison report looks for saboteur-style patterns, like pleasing meeting avoiding.',
    reflect: ['Which two saboteurs are loudest in you?', 'What did they protect you from when you were young?', 'Which of your partner\'s saboteurs triggers yours?'],
  },
  {
    id: 'conflict', icon: '⚔️', title: 'Conflict: the Four Horsemen', step: 6,
    lead: 'Psychologist John Gottman observed thousands of couples and identified four conflict habits that strongly predict breakups. He called them the Four Horsemen.',
    body: `
      ${table(['Horseman', 'Looks like', 'Antidote'], [
        ['<strong>Criticism</strong>', 'Attacking character: "You never think of anyone but yourself."', '<strong>Gentle start-up:</strong> "I feel… about… I need…"'],
        ['<strong>Contempt</strong>', 'Mockery, eye-rolling, sarcasm, superiority. The single strongest predictor of divorce in his research.', '<strong>Build a culture of appreciation:</strong> regularly notice and say what you value'],
        ['<strong>Defensiveness</strong>', 'Counter-attacking or playing the innocent victim', '<strong>Take responsibility</strong>, even for a small part'],
        ['<strong>Stonewalling</strong>', 'Shutting down, going silent, leaving mentally', '<strong>Physiological self-soothing:</strong> take a 20+ minute break, then come back'],
      ])}
      <p>Some other findings are useful here. Gottman reports that about <strong>69% of couples\' conflicts are "perpetual"</strong>: rooted in personality and never fully solved. So the skill is not winning but having a <em>dialogue</em> about them with humour and affection. Happy couples also make frequent <strong>repair attempts</strong> during fights (a joke, a touch, "let me try again"). And they mostly "turn towards" each other's small <strong>bids for connection</strong> in daily life.</p>
      <p>Psychologist Sue Johnson (Emotionally Focused Therapy, "Hold Me Tight") adds that most fights are really <em>protest</em> at feeling disconnected. She describes a "protest polka": one partner pursues, the other withdraws. Her advice: name the cycle together and make <strong>the cycle the enemy, not each other</strong>.</p>`,
    app: 'Four of the Reactor chips are the Horsemen (Criticism, Contempt, Defensiveness, Withdrawal/Stonewalling). Discussion and Disagreement ratings measure these skills. The report flags contempt and criticism–defensiveness loops.',
    reflect: ['Which horseman do you ride most often?', 'What repair attempt works best on you?', 'What is a perpetual problem you two could talk about with more curiosity?'],
  },
  {
    id: 'archetypes', icon: '👑', title: 'The 12 Archetypes', step: 1,
    lead: 'Carl Jung described archetypes as universal patterns that recur across myths, dreams and stories. The 12-archetype set used here comes from Carol S. Pearson\'s work ("The Hero Within") and her book with Margaret Mark, "The Hero and the Outlaw" (2001).',
    body: `
      <p>An archetype is a <em>role you tend to play</em>: a story you live inside. Each has a gift (its light) and a <strong>shadow</strong> (Jung's term for the parts of ourselves we disown). The shadow usually appears when the archetype is overused or under threat.</p>
      <p>Pearson groups the twelve by the journey they belong to:</p>
      <div class="arch-groups">
        <div><strong>Preparing (ego)</strong><span>Innocent · Orphan · Hero · Caregiver</span><em>Learning to be safe, belong, achieve and give.</em></div>
        <div><strong>The journey (soul)</strong><span>Explorer · Rebel · Lover · Creator</span><em>Finding out who you really are.</em></div>
        <div><strong>The return (self)</strong><span>Ruler · Magician · Sage · Jester</span><em>Living it out and giving it back.</em></div>
      </div>
      <h4>Light, shadow and the flip</h4>
      ${table(['Archetype', 'Core drive', 'Gift that attracts', 'How it can feel on a hard day'],
        ARCHETYPES.map(a => [`<strong>${a.name}</strong>`, a.drive, FLIPS[a.name][0], FLIPS[a.name][1]]))}
      <p>Archetypes are a reflective lens, not a scientific personality test. They work best as a shared language: "I think my Hero took over just now" is easier to say than "I was being controlling."</p>`,
    app: 'Choose one in Main Ego. The comparison report has notes on how specific pairings interact, and shows how each person\'s gift can flip into its shadow.',
    reflect: ['Which archetype did you need to be as a child?', 'Which archetype do you envy in your partner?', 'What does your archetype\'s shadow look like at home?'],
  },
  {
    id: 'attachment', icon: '🔗', title: 'Attachment theory', step: 4,
    lead: 'Attachment theory began with John Bowlby and Mary Ainsworth\'s research on infants and caregivers. In 1987 Cindy Hazan and Phillip Shaver showed that adult romantic love follows similar patterns.',
    body: `
      <p>The core idea: as children we learn, deep in the body, whether closeness is safe and whether people come back. That "working model" becomes the template for adult intimacy. Researchers today usually measure two dimensions: <strong>anxiety</strong> (fear of rejection or abandonment) and <strong>avoidance</strong> (discomfort with closeness and depending on others).</p>
      ${table(['Pattern', 'Anxiety / Avoidance', 'Inner belief', 'Under stress'], [
        ['<strong>Secure</strong>', 'Low / Low', '"I\'m worthy of love and others are generally trustworthy."', 'Reaches out, says what they need, repairs'],
        ['<strong>Anxious</strong> (preoccupied)', 'High / Low', '"I need you, but I\'m afraid you\'ll leave."', 'Protests: texts, pursues, seeks reassurance'],
        ['<strong>Avoidant</strong> (dismissive)', 'Low / High', '"I\'m fine on my own; needing people is risky."', 'Withdraws, minimises, gets busy'],
        ['<strong>Fearful-Avoidant</strong> (disorganised)', 'High / High', '"I want closeness, but closeness hurts."', 'Approaches then retreats; mixed signals'],
        ['<strong>Hyper-Independent</strong>', '(popular term)', '"I can only rely on myself."', 'Refuses help; carries everything alone'],
      ])}
      <p class="small muted">"Fearful-avoidant" comes from Kim Bartholomew\'s four-category model (1991). "Hyper-independence" is not a formal research category; it is a widely used description that is closest to dismissive-avoidance, often with a trauma history.</p>
      <h4>Things worth knowing</h4>
      <ul>
        <li><strong>The anxious–avoidant trap.</strong> Amir Levine and Rachel Heller ("Attached") describe how anxious and avoidant people often attract each other. The closer one gets, the further the other moves, which confirms both of their fears.</li>
        <li><strong>Patterns can change.</strong> "Earned security" is real. A steady relationship, therapy, and understanding your own story can all move someone toward security.</li>
        <li><strong>It's relational.</strong> You can be more anxious with one partner and more secure with another. Your pattern is a tendency, not a life sentence.</li>
      </ul>`,
    app: 'Set in the Orientation step. The comparison report has specific notes for all 15 pairings of the five patterns.',
    reflect: ['When your partner goes quiet, what story does your body tell you?', 'What did you learn as a child about what happens when you need someone?', 'What would make it feel safer to reach for each other?'],
  },
  {
    id: 'wounds', icon: '🩹', title: 'Core wounds and schemas', step: 2,
    lead: 'A core wound is the deepest painful belief you formed about yourself or love, such as "I\'m not enough" or "people leave". It quietly shapes who you choose and how you react.',
    body: `
      <p><strong>Schema Therapy</strong>, developed by psychologist Jeffrey Young, gives this a rigorous framework. It describes <em>early maladaptive schemas</em>: life themes that form when core childhood needs go unmet. These are the ones most often activated in love:</p>
      ${table(['Schema', 'The wound says', 'Often felt as'], [
        ['Abandonment / Instability', '"People I love will leave."', 'Panic at distance, clinging, testing'],
        ['Mistrust / Abuse', '"People will hurt or use me."', 'Suspicion, guardedness'],
        ['Emotional Deprivation', '"No one will really meet my needs."', 'Loneliness even when partnered'],
        ['Defectiveness / Shame', '"If you really knew me, you\'d leave."', 'Hiding, perfectionism, defensiveness'],
        ['Subjugation / Self-Sacrifice', '"My needs don\'t count."', 'Pleasing, then resentment'],
        ['Unrelenting Standards', '"It\'s never good enough."', 'Criticism of self and partner'],
      ])}
      <p>Young describes three ways people cope with a schema: <strong>surrendering</strong> (living as if it's true, e.g. choosing partners who do leave), <strong>avoiding</strong> it (never getting close enough to be left), or <strong>overcompensating</strong> (doing the opposite, e.g. controlling everything so you're never abandoned). These are the protectors and saboteurs from earlier, seen from another angle.</p>
      <p>Therapist Harville Hendrix (Imago Relationship Therapy) adds a hopeful twist. We are often drawn to partners who resemble our early caregivers' hurtful traits. That isn't just a mistake; it's an unconscious attempt to finally heal the old wound. A relationship can become the place where that healing happens, if both people understand what's going on.</p>`,
    app: 'Exiled Parts and Core Unhealed Wound in the Needs step. The examples in the help panels are common wound statements.',
    reflect: ['Finish the sentence: "Deep down I\'m afraid that I am…"', 'How does your partner unknowingly press on that wound?', 'What would it look like for them to soothe it instead?'],
  },
  {
    id: 'needs', icon: '💝', title: 'Core needs', step: 2,
    lead: 'Underneath every protector and every argument is a need. Naming the need, rather than the complaint, is one of the most useful skills in love.',
    body: `
      <p><strong>Self-Determination Theory</strong> (Edward Deci and Richard Ryan) finds three needs across cultures: <em>autonomy</em> (choosing for yourself), <em>competence</em> (feeling capable) and <em>relatedness</em> (connection). Relationships go best when both partners support all three, not just closeness.</p>
      <p><strong>Nonviolent Communication</strong> (Marshall Rosenberg) separates <em>needs</em>, which are universal, from <em>strategies</em>, which are specific ways of meeting them. Two people rarely clash on needs; they clash on strategies. "I need you to text me every hour" is a strategy. The need underneath might be reassurance or security, and there may be other ways to meet it.</p>
      <h4>The great tension: closeness vs. freedom</h4>
      <p>Many couples split along this line: one partner's core need is connection or belonging, the other's is freedom or autonomy. Neither need is wrong. The goal is a relationship designed for <em>both</em>: reliable connection rituals <em>and</em> protected time apart.</p>
      <p>A simple formula from NVC: <em>"When I see/hear ___, I feel ___, because I need ___. Would you be willing to ___?"</em></p>`,
    app: 'Core Need in the Needs step. The report flags closeness-versus-freedom and control-versus-autonomy tensions.',
    reflect: ['What is the need underneath your most common complaint?', 'What strategy do you insist on that could be swapped for another?', 'What need of your partner\'s do you find hardest to honour?'],
  },
  {
    id: 'centres', icon: '🧠', title: 'Centres: Mind, Heart, Body, Sacral', step: 4,
    lead: 'Many traditions say we process life through different "centres" of intelligence. Knowing which one you lead with explains a lot of miscommunication.',
    body: `
      <p>The idea goes back to G.I. Gurdjieff's teaching of the intellectual, emotional and moving/instinctive centres. It was later popularised by the Enneagram's <strong>head, heart and gut</strong> triads. The fourth, <strong>Sacral</strong>, is borrowed from Human Design, where it stands for life-force, desire and gut-level yes/no responses.</p>
      ${table(['Centre', 'Leads with', 'Partner may experience', 'Helps when you…'], [
        ['<strong>Mind</strong>', 'Analysis, understanding, planning', 'Detached; "stop analysing me"', 'Feel first, explain later'],
        ['<strong>Heart</strong>', 'Feelings, empathy, relationships', 'Overwhelmed; "it\'s always about feelings"', 'Name the feeling, then the request'],
        ['<strong>Body</strong>', 'Action, instinct, doing', 'Rushed; "you fix instead of listen"', 'Ask: "Help, or just presence?"'],
        ['<strong>Sacral</strong>', 'Desire, energy, what feels alive', 'Impulsive; unpredictable', 'Pause before committing'],
      ])}
      <p>These are reflective models, not research findings. Treat them as a vocabulary: "I'm in my head right now; give me a minute to get to my heart."</p>`,
    app: 'Dominant Centre in the Orientation step. The four rating groups loosely mirror the centres.',
    reflect: ['Which centre takes over when you are stressed?', 'Which centre do you most wish your partner would use with you?'],
  },
  {
    id: 'eros', icon: '🔥', title: 'Eros and safety', step: 8,
    lead: 'Why rate Eros and Comfort separately? Because, as psychotherapist Esther Perel argues in "Mating in Captivity" (2006), they pull in opposite directions.',
    body: `
      <p>Perel's central idea is that love wants <strong>closeness, security and predictability</strong>, while desire feeds on <strong>distance, mystery and novelty</strong>. As couples build safety, which is good, they can lose the "otherness" that fuels erotic charge. As she puts it, desire needs space: "fire needs air."</p>
      <p>So a relationship can score high on Comfort (safety) and low on Eros (aliveness), or the reverse, and both are informative. High-Eros, low-Comfort relationships often feel thrilling but anxious. High-Comfort, low-Eros relationships can feel like loving roommates.</p>
      <h4>What helps</h4>
      <ul>
        <li>Let each other be separate people: see your partner absorbed in something they love.</li>
        <li>Make room for novelty and play, not just routine.</li>
        <li>Treat desire as something you <em>create</em> together, not something that should just happen.</li>
        <li>Protect safety too. Without it, aliveness turns into anxiety.</li>
      </ul>`,
    app: 'Sexual Chemistry, Eros and Comfort in the Sacral step.',
    reflect: ['When do you find your partner most attractive?', 'What would add a little "air" to your relationship?', 'Does safety or aliveness feel more lacking right now?'],
  },
  {
    id: 'debotton', icon: '🔄', title: 'Strengths become weaknesses (Alain de Botton)', step: 9,
    lead: 'Philosopher Alain de Botton (The School of Life, "The Course of Love", 2016) argues that the traits that attract us and the traits that later drive us mad are often the same trait, seen on different days.',
    body: `
      <p>The partner who was so wonderfully <em>spontaneous</em> on the first holiday is "unreliable" when the bills are due. The one whose <em>calm</em> felt like a harbour feels "distant" when you're upset. De Botton's School of Life puts it this way: weaknesses are frequently the <strong>shadow side of strengths</strong>. You rarely get one without the other.</p>
      <div class="flip-grid">${GENERAL_FLIPS.map(([s, w]) => `<div class="flip"><span class="s">${s}</span><span class="arrow" aria-hidden="true">→</span><span class="w">${w}</span></div>`).join('')}</div>
      <p>The practical move: when something irritates you, ask <em>"what strength is this the cost of?"</em> It doesn't excuse bad behaviour. But it changes "you are failing me" into "this is the price of something I love", which is a much better place to negotiate from.</p>
      <h4>More of de Botton's ideas about love</h4>
      <ul>
        <li><strong>"Why You Will Marry the Wrong Person"</strong> (New York Times, 2016): everyone is harder to live with than they realise. We don't know our own difficulties well, and we often look for the <em>familiar</em> feelings of childhood rather than for happiness.</li>
        <li><strong>Compatibility is made, not found.</strong> In that essay he writes: <em>"Compatibility is an achievement of love; it must not be its precondition."</em> The right partner isn't the one who shares every taste, but the one who can negotiate differences in taste intelligently.</li>
        <li><strong>Love as teaching and learning.</strong> Partners will inevitably try to "teach" each other better ways to be. That's not cruelty if done kindly, and being willing to be taught is itself an act of love.</li>
        <li><strong>Sulking</strong> is the wish to be understood without having to explain. Saying what hurt, even clumsily, gives your partner a chance.</li>
        <li><strong>Romantic realism.</strong> Expecting a soulmate who understands us without words sets us up for disappointment. Expecting a good-enough, flawed person to grow with is kinder and more durable.</li>
      </ul>`,
    app: 'The comparison report now includes a "Strengths that become weaknesses" note, based on each person\'s archetype.',
    reflect: ['What first attracted you to your partner? How does that same trait sometimes annoy you?', 'What strength of yours is hard to live with?', 'What are you willing to be taught?'],
  },
  {
    id: 'sources', icon: '📚', title: 'Sources and a note of caution',
    lead: 'This app mixes well-researched ideas with reflective frameworks. Use it to start conversations, not to label anyone.',
    body: `
      <ul class="sources">
        <li><strong>Research-based:</strong> attachment theory (Bowlby, Ainsworth, Hazan &amp; Shaver, Bartholomew); Gottman's research on conflict; Self-Determination Theory (Deci &amp; Ryan); Schema Therapy (Young) and Emotionally Focused Therapy (Johnson), both evidence-based therapies.</li>
        <li><strong>Clinical models with growing evidence:</strong> Internal Family Systems (Schwartz).</li>
        <li><strong>Reflective / popular frameworks:</strong> the 12 archetypes (Jung, Pearson, Mark), Positive Intelligence saboteurs (Chamine), the centres (Gurdjieff, Enneagram, Human Design), Imago (Hendrix), Esther Perel's and Alain de Botton's writing. These are insightful but not validated measurement tools.</li>
      </ul>
      <h4>Further reading</h4>
      <ul class="sources">
        <li>Richard Schwartz: <em>No Bad Parts</em> (2021)</li>
        <li>Shirzad Chamine: <em>Positive Intelligence</em> (2012)</li>
        <li>John Gottman &amp; Nan Silver: <em>The Seven Principles for Making Marriage Work</em></li>
        <li>Sue Johnson: <em>Hold Me Tight</em></li>
        <li>Amir Levine &amp; Rachel Heller: <em>Attached</em></li>
        <li>Jeffrey Young &amp; Janet Klosko: <em>Reinventing Your Life</em></li>
        <li>Carol S. Pearson: <em>Awakening the Heroes Within</em></li>
        <li>Esther Perel: <em>Mating in Captivity</em></li>
        <li>Alain de Botton: <em>The Course of Love</em>; "Why You Will Marry the Wrong Person" (NYT, 2016)</li>
        <li>Marshall Rosenberg: <em>Nonviolent Communication</em></li>
      </ul>
      <p class="muted small">If a relationship involves fear, control, threats or violence, that is not a compatibility issue. Please reach out to a local domestic abuse helpline or a qualified professional.</p>`,
  },
];
