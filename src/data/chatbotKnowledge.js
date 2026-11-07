// Knowledge base for the portfolio chatbot — PROFESSIONAL info only.
// No personal data: no home address, phone number, family, finances, or health info.
// Visitors who want to reach Umair are pointed at the contact section / LinkedIn.
//
// How it works: every intent has keyword phrases. The visitor's message is
// normalized (lowercased, punctuation stripped) and scored — a keyword phrase
// is worth as many points as it has words, so specific multi-word phrases beat
// generic single words. The highest-scoring intent wins; greetings only win when
// nothing else matched. No server, no API calls, no data leaves the browser.
//
// Answers are arrays of segments: { t: 'text' } or { t: 'label', href: 'url' }.
// Links starting with '#' jump to a section on this page; the rest open in a new tab.

export const BOT_NAME = 'Umair’s Assistant';

export const SUGGESTIONS = [
  'What are your skills?',
  'Tell me about your projects',
  "What's your experience?",
  'What certifications do you hold?',
  'How can I contact you?',
];

const INTENTS = [
  {
    id: 'greeting',
    keywords: [
      'hello', 'hi', 'hey', 'hiya', 'good morning', 'good afternoon',
      'good evening', 'howdy', 'greetings',
    ],
    answer: [
      {
        t: 'Hi there! 👋 I’m the assistant on Umair’s portfolio. Ask me about his experience, skills, projects, or certifications — or tap one of the suggestions below.',
      },
    ],
  },
  {
    id: 'who',
    keywords: [
      'who are you', 'who is umair', 'about umair', 'about yourself',
      'tell me about yourself', 'your name', 'who is he', 'introduce yourself',
      'tell me about umair', 'who is this',
    ],
    answer: [
      {
        t: 'Umair Waqar is a Senior DevOps Engineer with 7+ years of experience. He owns production, QA, and shared-services AWS accounts end to end at Hightower Advisors — architecture, cost, performance, and resilience — and builds AI agents on AWS Bedrock that investigate and fix incidents on their own.',
      },
    ],
  },
  {
    id: 'role',
    keywords: [
      'current role', 'what do you do', 'job title', 'position', 'what is your job',
      'where do you work', 'current job', 'employer', 'what does he do',
      'his job', 'day to day', 'day-to-day', 'responsibilities',
    ],
    answer: [
      {
        t: 'He’s a Senior DevOps Engineer at Hightower Advisors (promoted in February 2026 from Cloud Systems Engineer). He owns the production, QA, and shared-services AWS accounts end to end, runs high-availability EKS clusters and GitHub Actions CI/CD pipelines, and automates away the manual work: deployments, patching, certificates, and incident response.',
      },
    ],
  },
  {
    id: 'experience',
    keywords: [
      'experience', 'work history', 'career', 'background', 'years of experience',
      'how many years', 'resume', 'cv', 'worked at', 'work experience',
      'employment', 'job history', 'how long',
    ],
    answer: [
      {
        t: '7+ years in DevOps and cloud infrastructure: Senior DevOps Engineer at Hightower Advisors (Feb 2026 – present), Cloud Systems Engineer at Hightower Advisors (Mar 2022 – Feb 2026), and Junior DevOps Engineer at GE on contract (Mar 2020 – Oct 2021).',
      },
    ],
  },
  {
    id: 'skills',
    keywords: [
      'skills', 'tech stack', 'technologies', 'tools', 'what can you do',
      'expertise', 'stack', 'proficient', 'what do you know', 'skillset',
      'skill set', 'what technologies',
    ],
    answer: [
      {
        t: 'Cloud: AWS (EKS, EC2, RDS, DynamoDB, Lambda, S3, CloudFront) • IaC: Terraform, OpenTofu, AWS CDK, CloudFormation, Helm • Containers: Docker, ECS, EKS, Kubernetes • CI/CD: GitHub Actions, CodePipeline • AI: AWS Bedrock, AgentCore • Messaging: SQS, SNS, ElastiCache • Observability: Dynatrace, Datadog, Opsgenie • Scripting: Python, Bash, TypeScript • Config: AWS SSM, Syxsense. Full list in the ',
      },
      { t: 'Skills section', href: '#skills' },
      { t: '.' },
    ],
  },
  {
    id: 'aws',
    keywords: [
      'aws', 'amazon web services', 'amazon', 'cloud platform', 'cloud computing',
    ],
    answer: [
      {
        t: 'AWS is his home turf: he manages multiple AWS accounts (production, QA, shared services) with Terraform, runs high-availability EKS clusters, and works across EC2, RDS, DynamoDB, Lambda, S3, CloudFront, and VPC networking — plus AWS budgeting and cost optimization.',
      },
    ],
  },
  {
    id: 'terraform',
    keywords: [
      'terraform', 'infrastructure as code', 'iac', 'cloudformation', 'cdk',
      'opentofu', 'helm', 'infrastructure code',
    ],
    answer: [
      {
        t: 'His IaC journey went YAML/CloudFormation → Terraform with CDK (about a year of TypeScript with CDK) → HCL on Terraform. Today every AWS account he owns is managed via Terraform + GitHub Actions, with Monitoring as Code (Dynatrace) and detailed infrastructure diagrams in Lucidchart.',
      },
    ],
  },
  {
    id: 'kubernetes',
    keywords: [
      'kubernetes', 'eks', 'docker', 'container', 'containers', 'fargate',
      'ecs', 'ecr', 'containerization', 'orchestration',
    ],
    answer: [
      {
        t: 'Containers and orchestration: Docker, high-availability EKS clusters, ECS/Fargate, Helm, and ECR. One example: he containerized 300+ legacy WordPress sites onto Fargate with automated GitHub Actions pipelines for updates and deployments.',
      },
    ],
  },
  {
    id: 'cicd',
    keywords: [
      'ci/cd', 'cicd', 'pipeline', 'pipelines', 'github actions', 'deployment',
      'deploy', 'blue-green', 'canary', 'continuous integration',
      'continuous deployment', 'devops pipeline',
    ],
    answer: [
      {
        t: 'He owns GitHub Actions CI/CD end to end — pipelines he built and maintains, not just uses. Blue-green and canary deploys, approval gates, and consistent, reproducible deployments across environments. He also led zero-downtime migrations with planned cutover and rollback.',
      },
    ],
  },
  {
    id: 'ai',
    keywords: [
      'bedrock', 'ai', 'artificial intelligence', 'agent', 'agents', 'agentcore',
      'opshub', 'machine learning', 'llm', 'self-healing', 'autonomous',
      'chatbot', 'genai', 'generative ai',
    ],
    answer: [
      {
        t: 'His two AWS Bedrock projects, built solely by him: (1) alert-driven log analysis — on any alert, Bedrock digs through the logs and returns the root cause, remediation steps, and prevention advice; (2) OpsHub — an AgentCore investigator that diagnoses and resolves infrastructure incidents with approval-gated deploys, used by IAM, network, security, Snowflake, and DevOps teams.',
      },
    ],
  },
  {
    id: 'projects',
    keywords: [
      'projects', 'portfolio', 'built', 'work examples', 'case studies',
      'what have you built', 'show me your work', 'your work',
    ],
    answer: [
      {
        t: 'Highlights: Bedrock alert-driven log analysis, OpsHub (agentic self-healing platform), SSL certificate automation at scale, containerizing 300+ WordPress sites onto Fargate, an enterprise cloud migration that cut operational costs ~40%, and automated patch management across AWS and Azure. See the full list in the ',
      },
      { t: 'Projects section', href: '#projects' },
      { t: '.' },
    ],
  },
  {
    id: 'ssl',
    keywords: [
      'ssl', 'certificate', 'certificates', 'cert', 'tls', 'https', 'expiry',
      'expired certificate', 'certificate rotation', 'certificate automation',
    ],
    answer: [
      {
        t: 'He automated all manual SSL handling into rotation across ~200 static sites, 10 server applications, and ~20 Okta TLS certificates — with success/failure alerting on every renewal. It started after an expired certificate took down a client-facing portal and Okta auth; he renewed it manually, then built the automation so it can’t happen again.',
      },
    ],
  },
  {
    id: 'incidents',
    keywords: [
      'incident', 'incidents', 'outage', 'outages', 'troubleshooting',
      'on-call', 'on call', 'incident response', 'problem solving', 'debugging',
      'war room', 'root cause',
    ],
    answer: [
      {
        t: 'Three incidents he tells well: (1) a WordPress fleet outage traced to an EFS throughput ceiling hit by a dev scanning tool — fixed by raising throughput, then rate limiting and a separate cloned EFS volume for dev scanning; (2) an expired SSL certificate that took down a client portal and Okta auth, fixed by automation; (3) a CrowdStrike update that blue-screened every EC2 server — his own alerting caught it, and he spent ~6–7 hours removing the bad file server by server because the crash blocked any remote fix.',
      },
    ],
  },
  {
    id: 'migration',
    keywords: [
      'migration', 'migrate', 'migrated', 'moving to aws', 'on-prem',
      'on-premises', 'zero-downtime', 'zero downtime', 'lift and shift',
    ],
    answer: [
      {
        t: 'He has led zero-downtime migrations of acquired teams’ applications and multi-terabyte data stores into AWS, with planning, cutover, and rollback — including 300+ legacy WordPress sites containerized onto Fargate and on-premises SQL databases moved to RDS with backups and disaster recovery.',
      },
    ],
  },
  {
    id: 'monitoring',
    keywords: [
      'monitoring', 'observability', 'dynatrace', 'datadog', 'alerting',
      'alerts', 'opsgenie', 'logs', 'log analysis', 'dashboards', 'telemetry',
    ],
    answer: [
      {
        t: 'Observability is a core strength: Dynatrace Monitoring as Code on every step of each data pipeline (he diagrammed them all in Lucidchart first so outages are easy to pinpoint), Datadog, CloudWatch, and Opsgenie/Jira alerting — plus a Bedrock agent that investigates alerts and hands engineers the root cause and a fix.',
      },
    ],
  },
  {
    id: 'databases',
    keywords: [
      'database', 'databases', 'rds', 'dynamodb', 'sql', 'mysql', 'snowflake',
      'data store', 'data stores',
    ],
    answer: [
      {
        t: 'Databases: RDS (MariaDB/MySQL), DynamoDB, and SQL Server clusters on EC2 and on-premises. He has migrated on-premises SQL databases to RDS with performance optimization, automated backups, and disaster recovery — and his OpsHub agent serves Snowflake teams with script execution and report exports.',
      },
    ],
  },
  {
    id: 'security',
    keywords: [
      'security', 'iam', 'okta', 'sso', 'patching', 'vulnerability',
      'vulnerabilities', 'compliance', 'threat', 'threat scanning',
    ],
    answer: [
      {
        t: 'Security and identity: Okta SSO and TLS certificate management, IAM, security groups, and automated patching plus security/threat scanning across AWS and Azure servers through the same AWS SSM workflows (with Syxsense Cortex for config management).',
      },
    ],
  },
  {
    id: 'sftp',
    keywords: [
      'sftp', 'transfer family', 'file transfer', 'data pipeline',
      'data pipelines', 'etl', 'file delivery', 'sftp pipeline',
    ],
    answer: [
      {
        t: 'He set up AWS Transfer Family so clients send files daily via SFTP into an S3 bucket. His role is managing the connections, keeping SFTP working, and troubleshooting delivery failures when files don’t arrive — the downstream ETL into Snowflake is handled by other teams.',
      },
    ],
  },
  {
    id: 'cost',
    keywords: [
      'cost', 'costs', 'optimization', 'optimize', 'saving', 'savings',
      'budget', 'bill', 'spending', 'cost optimization', 'finops',
    ],
    answer: [
      {
        t: 'Cost optimization is part of how he runs AWS: AWS budgeting, right-sizing, and an enterprise cloud migration that cut operational costs by ~40%. The same instinct shows here — this site runs free on GitHub Pages because a static site doesn’t need servers. See ',
      },
      { t: 'How This Site Is Hosted', href: '#hosting' },
      { t: '.' },
    ],
  },
  {
    id: 'certifications',
    keywords: [
      'certification', 'certifications', 'certified', 'credly', 'aws certified',
      'certificate', 'certs',
    ],
    answer: [
      { t: 'He holds two AWS certifications: ' },
      {
        t: 'AWS Certified DevOps Engineer – Professional',
        href: 'https://www.credly.com/badges/6d9793f6-2143-49b7-9329-1187fdb3f8ca/public_url',
      },
      { t: ' and ' },
      {
        t: 'AWS Certified Solutions Architect – Associate',
        href: 'https://www.credly.com/badges/41a13039-9607-429f-948f-378784793836/public_url',
      },
      { t: ' — both verifiable on Credly.' },
    ],
  },
  {
    id: 'education',
    keywords: [
      'education', 'degree', 'college', 'school', 'university', 'studied',
      'graduate', 'graduated',
    ],
    answer: [
      {
        t: 'Associate of Arts and Science, Elgin Community College, 2021.',
      },
    ],
  },
  {
    id: 'contact',
    keywords: [
      'contact', 'hire', 'hiring', 'reach', 'email', 'message', 'talk',
      'speak', 'work with you', 'available', 'availability', 'freelance',
      'get in touch', 'connect',
    ],
    answer: [
      {
        t: 'The fastest way is ',
      },
      {
        t: 'LinkedIn',
        href: 'https://www.linkedin.com/in/umair-waqar-807b99233',
      },
      {
        t: ' — he typically responds within 24 hours on business days. Or use the ',
      },
      { t: 'contact section', href: '#contact' },
      { t: ' below.' },
    ],
  },
  {
    id: 'location',
    keywords: [
      'location', 'where are you', 'based', 'live', 'remote', 'hybrid',
      'chicago', 'where is he', 'where do you live',
    ],
    answer: [
      {
        t: 'He’s based in the Chicago area, Illinois, and works remotely and hybrid. For anything location-specific about a role, reach out via LinkedIn.',
      },
    ],
  },
  {
    id: 'hosting',
    keywords: [
      'hosting', 'hosted', 'how is this site hosted', 'github pages',
      'how was this site built', 'this website', 'this site', 'how does this site work',
    ],
    answer: [
      {
        t: 'This site runs free on GitHub Pages — a static site doesn’t need servers. The same site also deploys to AWS two ways (ECS/Fargate and S3 + CloudFront with Terraform), and the code for all three is in the ',
      },
      { t: 'Hosting section', href: '#hosting' },
      { t: ' — and the repo is on ',
      },
      { t: 'GitHub', href: 'https://github.com/umairk8devops/my-portfolio' },
      { t: '.' },
    ],
  },
  {
    id: 'salary',
    keywords: [
      'salary', 'pay', 'rate', 'compensation', 'how much', 'expected salary',
      'hourly',
    ],
    answer: [
      {
        t: 'I don’t share compensation details here — if you’re hiring, reach out via LinkedIn and he’ll be happy to discuss it.',
      },
    ],
  },
  {
    id: 'thanks',
    keywords: [
      'thank', 'thanks', 'great', 'awesome', 'cool', 'nice', 'perfect',
      'helpful', 'good job',
    ],
    answer: [
      {
        t: 'You’re welcome! Anything else you’d like to know about Umair’s work?',
      },
    ],
  },
  {
    id: 'bot',
    keywords: [
      'are you a bot', 'are you ai', 'robot', 'who made you', 'how do you work',
      'what are you', 'are you human', 'are you real',
    ],
    answer: [
      {
        t: 'I’m a small built-in assistant on this site — I match your question against a knowledge base about Umair’s professional background. No servers, no API calls, nothing leaves your browser. For anything I can’t answer, the contact section below is the way to reach him.',
      },
    ],
  },
];

const FALLBACK_ANSWER = [
  {
    t: 'I don’t have an answer for that yet — I’m a simple keyword-based assistant, not a full AI, so I only know about Umair’s professional background. Try asking about his skills, projects, experience, or certifications — or reach out via the ',
  },
  { t: 'contact section', href: '#contact' },
  { t: '.' },
];

function normalize(text) {
  return ` ${text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

function scoreIntent(normalized, intent) {
  let score = 0;
  for (const phrase of intent.keywords) {
    const needle = ` ${phrase} `;
    if (normalized.includes(needle)) {
      // Multi-word phrases are more specific, so they're worth more.
      score += phrase.split(' ').length;
    }
  }
  return score;
}

// Returns the answer segments for a visitor message.
export function findAnswer(message) {
  const normalized = normalize(message);
  if (!normalized.trim()) {
    return FALLBACK_ANSWER;
  }

  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    if (intent.id === 'greeting') {
      continue;
    }
    const score = scoreIntent(normalized, intent);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  if (best) {
    return best.answer;
  }

  // Greetings only win when nothing else matched.
  const greeting = INTENTS.find((intent) => intent.id === 'greeting');
  if (scoreIntent(normalized, greeting) > 0) {
    return greeting.answer;
  }
  return FALLBACK_ANSWER;
}
