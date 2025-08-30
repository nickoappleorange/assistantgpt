export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Basic GPT-3.5, limited daily messages, community support.',
    price: {
      monthly: '$0',
      yearly: '$0',
    },
    priceId: {
      monthly: 'price_1S1bEOFTONXgzBpNrRAYJKMA',
      yearly: 'price_1S1bEOFTONXgzBpNrRAYJKMA',
    },
    productId: 'prod_SxWG4H8dxAkp77',
    tokens: 25000,
    features: [
      '25,000 tokens/month',
      'Basic GPT-3.5 model',
      'Limited daily messages',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'All GPT models, faster responses, email support.',
    price: {
      monthly: '$10',
      yearly: '$100', // Assuming a discount
    },
    priceId: {
      monthly: 'price_1S1bErFTONXgzBpNl7ZXkWsK',
      yearly: 'price_pro_yearly_placeholder', // Replace with actual yearly price ID if available
    },
    productId: 'prod_SxWHZeyxoSz6Uj',
    tokens: 150000,
    features: [
      '150,000 tokens/month',
      'All GPT models (including GPT-4)',
      'Faster responses',
      'Email support',
    ],
    recommended: true,
  },
  {
    id: 'creator',
    name: 'Creator',
    description: 'Conversation history, custom personas, file uploads, priority support.',
    price: {
      monthly: '$25',
      yearly: '$250', // Assuming a discount
    },
    priceId: {
      monthly: 'price_1S1bFiFTONXgzBpNVhvbqsj3',
      yearly: 'price_creator_yearly_placeholder', // Replace with actual yearly price ID if available
    },
    productId: 'prod_SxWIRCOtQsl3t6',
    tokens: 500000,
    features: [
      '500,000 tokens/month',
      'Full conversation history',
      'Custom personas',
      'File uploads',
      'Priority support',
    ],
  },
  {
    id: 'power',
    name: 'Power',
    description: 'Extended context, web browsing, code generation, premium support.',
    price: {
      monthly: '$50',
      yearly: '$500', // Assuming a discount
    },
    priceId: {
      monthly: 'price_1S1bG5FTONXgzBpNDdoEhET5',
      yearly: 'price_power_yearly_placeholder', // Replace with actual yearly price ID if available
    },
    productId: 'prod_SxWICkXqOPAZ11',
    tokens: 1500000,
    features: [
      '1,500,000 tokens/month',
      'Extended context window',
      'Web browsing capabilities',
      'Advanced code generation',
      'Premium support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Team collaboration, API access, analytics, dedicated support.',
    price: {
      monthly: 'Contact Us',
      yearly: 'Contact Us',
    },
    priceId: {
      monthly: 'price_1S1bH7FTONXgzBpNIMB8bEpe', // This will be handled as a "Contact Us" flow
      yearly: 'price_1S1bH7FTONXgzBpNIMB8bEpe',
    },
    productId: 'prod_SxWJ5qcF0wFSS4',
    tokens: 999999999,
    features: [
      'Unlimited tokens',
      'Team collaboration features',
      'Full API access',
      'Advanced analytics dashboard',
      'Dedicated support & onboarding',
    ],
  },
];