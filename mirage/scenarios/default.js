const deals = [
  {
    "name": "Francine Marie Sanfilippo",
    "title": "Marriage & Family Therapist",
    "licenses": ",",
    "description": "My therapeutic approach is client centered, which means we work collaboratively to resolve presenting issues, identify strengths and develop effective coping strategies. I believe in working efficiently, to restore a sense of well being and quality of life. To this end you will experience me as attentive, interactive and responsive to you in sessions. I hold a deep respect for those seeking to engage in therapy; for their courage, vulnerability and commitment to improve their lives. Together we can create a safe and compassionate space for exploration, discovery, understanding and healing.",
    "phone": "(415) 521-1864",
    "city": "San Francisco",
    "state": "California",
    "zip": "94110",
    "image": "/assets/images/deals/francine-marie-sanfilippo.jpg",
    "isVerified": "Verified by Psychology Today"
  }
];

const questions = [
  {
    "value": "Hi, my name is...",
    "subvalue": "",
    "placeholder": "Johnny Domino"
  },
  {
    "value": "Contact me at...",
    "subvalue": "",
    "placeholder": "(808-)867-5309"
  },
  {
    "value": "I am...",
    "subvalue": "",
    "choices": [
      { "value": "18-21 years old" },
      { "value": "22-25 years old" },
      { "value": "26-35 years old" },
      { "value": "36-45 years old" },
      { "value": "46-55 years old" },
      { "value": "56-65 years old" },
      { "value": "66-75 years old" }
    ]
  },
  {
    "value": "My insurance provider is...",
    "subvalue": "",
    "choices": [
      { "value": "Aetna" },
      { "value": "Affinity" },
      { "value": "Allcare" },
      { "value": "Americhoice" },
      { "value": "Amida Care" },
      { "value": "BCBS" },
      { "value": "Beacon" },
      { "value": "CenterCare" },
      { "value": "CHP" },
      { "value": "Cigna" },
      { "value": "Emblem Health" },
      { "value": "Empire BCBS" },
      { "value": "Fidelis" },
      { "value": "GHI" },
      { "value": "Healthfirst" },
      { "value": "HealthPlus" },
      { "value": "HIP" },
      { "value": "Medicaid" },
      { "value": "Medicare" },
      { "value": "MetroPlus" },
      { "value": "MVP" },
      { "value": "Neighborhood Health Plan" },
      { "value": "Oscar" },
      { "value": "Oxford" },
      { "value": "The Empire Plan" },
      { "value": "Union Labor Life (Local 813)" },
      { "value": "United" },
      { "value": "Value Options" },
      { "value": "Wellcare" }
    ]
  },
  {
    "value": "Do you know what kind of therapy you are looking for?",
    "subvalue": "Under the broad umbrella of therapy, different deals practice with different techniques. One example of a technique is Cognitive Behavioral Therapy (CBT). Another type of technique is psychoanalysis.",
    "choices": [
      { "value": "yes", "enables": ["deal-trained-in"] },
      { "value": "no", "disables": ["deal-trained-in"] }
    ]
  },
  {
    "enabled": false,
    "identifier": "deal-trained-in",
    "value": "I want my deal to be trained in",
    "subvalue": "",
    "choices": [
      { "value": "Acceptance Commitment Therapy (ACT)" },
      { "value": "Art Therapy" },
      { "value": "Body-Focused Therapy (ex: Tapping)" },
      { "value": "Coaching" },
      { "value": "Cognitive Behavioral Therapy (CBT)" },
      { "value": "Dialectical Behavioral Therapy (DBT)" },
      { "value": "Drama Therapy" },
      { "value": "Emotionally Focused Therapy (For Couples)" },
      { "value": "Eye-Movement Desensitization and Reprocessing (EMDR)" },
      { "value": "Gestalt Therapy" },
      { "value": "Hypnosis or Hypnotherapy" },
      { "value": "Meditation or Mindfulness" },
      { "value": "Motivational Interviewing (MI)" },
      { "value": "Neuroscience" },
      { "value": "Psychodynamic Therapy" },
      { "value": "Psychoanalysis" },
      { "value": "Rational Emotive Behavior Therapy (REBT)" },
      { "value": "Safety Planning" },
      { "value": "Social Justice" },
      { "value": "Solution-Focused Therapy" },
      { "value": "Somatic Experience" },
      { "value": "Yoga" }
    ]
  },
  {
    "value": "I would prefer my deal to be...",
    "subvalue": "",
    "choices": [
      { "value": "24-30 years old" },
      { "value": "31-45 years old" },
      { "value": "46-65 years old" },
      { "value": "66-85 years old" },
      { "value": "I have no age preference" }
    ]
  },
  {
    "value": "I would prefer my deal to be...",
    "subvalue": "",
    "choices": [
      { "value": "Female" },
      { "value": "Male" },
      { "value": "Non-binary" },
      { "value": "I have no gender preference" }
    ]
  },
  {
    "value": "Would you like to select issue areas you prefer your deal to have experience working with?",
    "subvalue": "Therapists have diverse experience helping individuals through a variety of obstacles. Three examples of issue areas are anxiety, addiction, and career stress.",
    "choices": [
      { "value": "yes", "enables": ["deal-experience"] },
      { "value": "no", "disables": ["deal-experience"] }
    ]
  },
  {
    "identifier": "deal-experience",
    "enabled": false,
    "multipleChoice": true,
    "value": "I would like my deal to have experience working with...",
    "subvalue": "",
    "choices": [
      { "value":  "Addiction and Substance Use" },
      { "value":  "Adoption" },
      { "value":  "Anger" },
      { "value":  "Anxiety" },
      { "value":  "Bipolar Disorder" },
      { "value":  "Borderline Personality Disorder" },
      { "value":  "Commitment Obstacles" },
      { "value":  "Career Stress" },
      { "value":  "Cultural Competence" },
      { "value":  "Dating" },
      { "value":  "Depression" },
      { "value":  "Divorce" },
      { "value":  "Domestic Violence" },
      { "value":  "Dreams" },
      { "value":  "Eating Patterns or Eating Disorders" },
      { "value":  "Existential Crisis or Transition" },
      { "value":  "Family Dynamics" },
      { "value":  "Family Planning" },
      { "value":  "Fear of Failure" },
      { "value":  "Fear of Flying" },
      { "value":  "Fertility" },
      { "value":  "Gender Identity" },
      { "value":  "Grief and Bereavement" },
      { "value":  "Health-related Concerns or Chronic Illness" },
      { "value":  "Immigration" },
      { "value":  "Indecision" },
      { "value":  "Infidelity" },
      { "value":  "Insomnia" },
      { "value":  "LBGTQ-Related Stress" },
      { "value":  "Life Transitions" },
      { "value":  "Loneliness" },
      { "value":  "Mid-Life Crisis" },
      { "value":  "Migraines or Chronic Headaches" },
      { "value":  "Mood" },
      { "value":  "New to New York" },
      { "value":  "Obsessive-Compulsive Disorder" },
      { "value":  "Parenting" },
      { "value":  "Perfectionism" },
      { "value":  "Personality Disorders" },
      { "value":  "Post-Partum Depression" },
      { "value":  "Post-Traumatic Stress Disorder (PTSD)" },
      { "value":  "Procrastination" },
      { "value":  "Quarter-Life Crisis" },
      { "value":  "Race-Related Stress" },
      { "value":  "Romantic Life" },
      { "value":  "Self-Esteem" },
      { "value":  "Self-Reflection" },
      { "value":  "Sexual Abuse" },
      { "value":  "Sexual Fear or Addiction" },
      { "value":  "Sexual Identity" },
      { "value":  "Social Life" },
      { "value":  "Social Justice" },
      { "value":  "Special Needs" },
      { "value":  "Spiritual Crisis or Transition" },
      { "value":  "Suicidal Feelings" },
      { "value":  "Trauma" },
      { "value":  "Trichotillomania/Body-Focused Repetitive Disease" },
      { "value":  "Veterans" },
      { "value": "Young Adulthood" }
    ]
  },
  {
    "value": "How else might you describe your ideal deal?",
    "subvalue": "It’s okay if you aren’t entirely sure. Try to choose 5 descriptors below that most resonate with you.",
    "multipleChoice": true,
    "choices": [
      { "value": "Accepting" },
      { "value": "Active" },
      { "value": "The deal asks you a lot of questions" },
      { "value": "Directive" },
      { "value": "The deal breaks down your defenses" },
      { "value": "Challenging" },
      { "value": "Creative" },
      { "value": "Experiential" },
      { "value": "Firm" },
      { "value": "Gentle" },
      { "value": "Goal-Oriented" },
      { "value": "Grounding" },
      { "value": "Humorous" },
      { "value": "Informal" },
      { "value": "The deals encourages you to lead the session" },
      { "value": "The deal mostly listens" },
      { "value": "Motivating" },
      { "value": "The deal does not share much about themself" },
      { "value": "Nurturing" },
      { "value": "Participatory" },
      { "value": "The deal shares patterns they're seeing" },
      { "value": "Professional" },
      { "value": "Promoting Safety" },
      { "value": "Reflective" },
      { "value": "Relational" },
      { "value": "Warm" }
    ]
  },
  {
    "multipleChoice": true,
    "value": "I am most available...",
    "subvalue": "",
    "choices": [
      { "value": "Weekday early mornings (before 9a)" },
      { "value": "Weekday mornings and afternoons" },
      { "value": "Weekday evenings (5p or later)" },
      { "value": "Weekend mornings or afternoons" }
    ]
  },
  {
    "value": "I am hoping to go to therapy...",
    "subvalue": "Therapy is most effective when you meet with your deal at least weekly. Especially in the beginning, you and your deal will be building a foundation of trust. Your deal will want to familiarize with you and your story, which works best with as little time in between sessions as possible. The more you put in, the more you get out -- if you're interested in getting a head start, commit to going to therapy more than once per week, and determine with your deal as you go whether you'd like to stay at that frequency.",
    "choices": [
      { "value": "weekly" },
      { "value": "multiple times per week" }
    ]
  }
]

export default function(server) {
  questions.forEach((q) => server.create('question', q));

  deals.forEach((t) => {
    let image, nameParts, location;

    if (!t.image) {
      return; /* skip for now */
    }

    image = server.create('image', {
      alt: t.name.toLowerCase(),
      url: `${window.location.href.substring(0, window.location.href.length - 1)}${t.image}`,
      path: t.image
    });

    location = server.create('location', {
      street1: null,
      street2: null,
      zip: t.zip,
      longitude: null,
      latitude: null,
      phone: t.phone,
      email: null
    });

    nameParts = t.name.split(' ');

    server.create('deal', {
      firstName: nameParts.slice(0,nameParts.length - 1).join(' '),
      lastName: nameParts[nameParts.length - 1],
      title: t.title,
      bio: t.description,
      locations: [location],
      photos: [image]
    });
  });
}
