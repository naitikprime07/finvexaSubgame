export const categories = [
  {
    slug: "car-finance",
    label: "Car insurance",
    icon: "🚙",
    description: "Understand the cover that keeps your journey moving.",
  },
  {
    slug: "health-insurance",
    label: "Health insurance",
    icon: "✚",
    description: "Make sense of care, costs and coverage.",
  },
  {
    slug: "life-insurance",
    label: "Life insurance",
    icon: "◒",
    description: "Plan for the people and goals you value.",
  },
  {
    slug: "travel-insurance",
    label: "Travel insurance",
    icon: "✈",
    description: "Go further with fewer surprises.",
  },
];
export const articles = [
  {
    slug: "third-party-liability",
    title: "Third-Party Liability Cover Explained",
    description:
      "A plain-language guide to liability protection when your vehicle causes harm to another person or their property.",
    sections: [
      {
        heading: "What this cover does",
        paragraphs: [
          "Third-party liability cover is designed to help with eligible claims from people outside your policy when an accident involving your vehicle causes bodily injury or property damage. Rules and limits vary by location, so always read the policy wording.",
        ],
        bullets: [
          "Damage or injury caused to another party",
          "Legal defence costs where the policy includes them",
          "Limits, excesses and local minimum requirements",
        ],
      },
      {
        heading: "Who should consider it?",
        paragraphs: [
          "Anyone driving a vehicle should understand their local liability requirements. Liability protection is a foundation, but it does not usually repair your own vehicle.",
        ],
      },
      {
        heading: "Questions to ask",
        paragraphs: [
          "Check exclusions, claim limits, permitted drivers and whether business or delivery use is covered before choosing a policy.",
        ],
      },
    ],
    related: ["own-damage-cover", "comprehensive-cover"],
  },
  {
    slug: "own-damage-cover",
    title: "Own Damage Cover: What It Can Include",
    description:
      "Learn how protection for your own vehicle can respond to collisions, theft, weather events and more.",
    sections: [
      {
        heading: "Common covered events",
        paragraphs: [
          "Own damage cover may help repair or replace your vehicle after an insured event, subject to the policy excess, valuation and exclusions.",
        ],
        bullets: [
          "Accidental collision damage",
          "Fire and theft",
          "Flood, storm or other listed natural events",
          "Damage while the vehicle is being transported",
        ],
      },
      {
        heading: "Typical exclusions",
        paragraphs: [
          "Wear and tear, unlicensed driving, intentional loss and some forms of mechanical failure are commonly excluded. The exact wording controls.",
        ],
      },
      {
        heading: "Optional extras",
        paragraphs: [
          "Some policies offer roadside assistance, replacement vehicle cover or glass protection. Compare the added premium with the practical value to you.",
        ],
      },
    ],
    related: ["personal-accident-cover", "comprehensive-cover"],
  },
  {
    slug: "personal-accident-cover",
    title: "Personal Accident Protection for Drivers",
    description:
      "Explore the benefits, limits and exclusions commonly associated with personal accident cover.",
    sections: [
      {
        heading: "What it may cover",
        paragraphs: [
          "Personal accident protection focuses on people rather than the vehicle. Depending on the policy, it may provide a fixed benefit after a qualifying accident.",
        ],
        bullets: [
          "Accidental death",
          "Permanent total or partial disability",
          "Temporary disability benefits",
          "Eligible accident-related medical costs",
          "Passenger protection",
          "Transport or funeral expenses where specified",
        ],
      },
      {
        heading: "Common exclusions",
        paragraphs: [
          "Policies may exclude intoxication, unlawful activity, self-inflicted injury, pre-existing conditions or activities outside the agreed use. Read the schedule and definitions carefully.",
        ],
      },
      {
        heading: "Before you buy",
        paragraphs: [
          "Confirm who is insured, the benefit amount, waiting periods, evidence requirements and whether cover follows the driver or a specific vehicle.",
        ],
      },
    ],
    related: ["third-party-liability", "comprehensive-cover"],
  },
  {
    slug: "uninsured-motorist-protection",
    title: "Uninsured and Underinsured Motorist Protection",
    description:
      "Understand how this optional protection can help after an incident with a driver who lacks enough cover.",
    sections: [
      {
        heading: "The gap it addresses",
        paragraphs: [
          "Uninsured motorist protection may respond when the responsible driver has no valid liability insurance. Underinsured protection can apply when their limit is not enough for an eligible loss.",
        ],
        bullets: [
          "Bodily injury after a collision",
          "Property damage where included",
          "Hit-and-run incidents subject to reporting rules",
          "Coverage limits and deductibles",
        ],
      },
      {
        heading: "Coverage limitations",
        paragraphs: [
          "The protection may not apply in every jurisdiction or situation. Reporting deadlines, proof of contact and coordination with other insurance can matter.",
        ],
      },
    ],
    related: ["third-party-liability", "personal-accident-cover"],
  },
  {
    slug: "comprehensive-cover",
    title: "Comprehensive Car Insurance Guide",
    description:
      "See how broad vehicle protection combines liability, own damage and optional benefits.",
    sections: [
      {
        heading: "A wider protection package",
        paragraphs: [
          "Comprehensive cover commonly combines liability protection with cover for listed damage to your vehicle. It is not unlimited cover and may still include exclusions, excesses and conditions.",
        ],
        bullets: [
          "Collision and accidental damage",
          "Theft, fire and weather events",
          "Third-party injury or property claims",
          "Optional assistance and replacement benefits",
        ],
      },
      {
        heading: "Compare the details",
        paragraphs: [
          "Look beyond the headline price. Compare the vehicle value method, excess, exclusions, claim process, driver restrictions and repair network.",
        ],
      },
    ],
    related: ["own-damage-cover", "third-party-liability"],
  },
];
export const findArticle = (slug) =>
  articles.find((article) => article.slug === slug);
