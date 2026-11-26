/**
 * Mock data for the UI. Replace with API calls when the backend is ready.
 * Every number here (payouts, stats, leads) is a placeholder.
 *
 * PrimeScore's main product is Credit Rectification (fixing errors on a
 * customer's credit report). Loans, cards, accounts and insurance are side products.
 */

export type ProductCategory = "rectification" | "loans" | "cards" | "credit" | "accounts" | "insurance";

/** One colour per category, used the same way on every screen. */
export const categoryColor: Record<ProductCategory, { tile: string; solid: string; soft: string; label: string }> = {
  rectification: { tile: "bg-lime-100 text-score-green-dark", solid: "bg-score-green-dark", soft: "bg-lime-50", label: "Credit Rectification" },
  loans: { tile: "bg-emerald-50 text-emerald-600", solid: "bg-emerald-600", soft: "bg-emerald-50", label: "Loans" },
  cards: { tile: "bg-indigo-50 text-indigo-600", solid: "bg-indigo-600", soft: "bg-indigo-50", label: "Cards" },
  credit: { tile: "bg-amber-50 text-amber-600", solid: "bg-amber-500", soft: "bg-amber-50", label: "Credit report" },
  accounts: { tile: "bg-sky-50 text-sky-600", solid: "bg-sky-600", soft: "bg-sky-50", label: "Accounts" },
  insurance: { tile: "bg-rose-50 text-rose-600", solid: "bg-rose-600", soft: "bg-rose-50", label: "Insurance" },
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  category: ProductCategory;
  payout: string; // what the partner earns
  payoutLabel?: string;
  coins?: number;
  icon: string; // lucide icon name, see components/icons.tsx
  tag?: string;
};

export const partner = {
  name: "Aarav Mehta",
  firstName: "Aarav",
  phone: "+91 98XXX XX210",
  code: "PS-DSA-10482",
  tier: "Silver",
  coins: 150,
  wallet: 0,
  leaderboardPoints: 5858,
  rank: 214,
  earnings: { thisMonth: 16950, pending: 4200, nextPayout: "20 Nov", target: 25000, bonus: 500, lastMonth: 12400 },
  kycDone: false,
};

/** Rectification is sold as a case: these are its stages. */
export const rectificationStages = ["Report pulled", "Disputes raised", "Bureau review", "Score updated"] as const;

export const rectification = {
  slug: "credit-rectification",
  payout: "₹2,500",
  payoutLabel: "per case",
  avgGain: 85, // average score points gained (placeholder)
  avgDays: 45, // average days to close a case (placeholder)
  fixes: ["Wrong late payments", "Settled / written-off accounts", "Duplicate loans", "Wrong enquiries", "Name or PAN mismatch"],
};

/** Things the partner should act on today (drives the Home "Needs attention" list). */
export const actions: { id: string; title: string; sub: string; tone: "amber" | "red" | "navy" | "green"; href: string }[] = [
  { id: "bureau", title: "Bureau replied on Imran's dispute", sub: "Score may update this week", tone: "green", href: "/leads/R-1042" },
  { id: "consent", title: "2 customers need to sign consent", sub: "Meena Joshi · Rahul Jain", tone: "amber", href: "/leads" },
  { id: "kyc", title: "Complete KYC to receive payouts", sub: "PAN and bank account pending", tone: "red", href: "/kyc" },
];

export const products: Product[] = [
  { slug: "credit-rectification", name: "Credit Rectification", short: "Rectification", category: "rectification", payout: "₹2,500", payoutLabel: "per case", coins: 500, icon: "TrendingUp", tag: "Main" },
  { slug: "credit-report", name: "Credit Report Analysis", short: "Credit Report", category: "credit", payout: "₹150", coins: 50, icon: "Gauge", tag: "Easy" },
  { slug: "personal-loan", name: "Personal Loan", short: "Personal Loan", category: "loans", payout: "4.2%", payoutLabel: "of disbursal", coins: 500, icon: "HandCoins" },
  { slug: "business-loan", name: "Business Loan", short: "Business Loan", category: "loans", payout: "3.5%", payoutLabel: "of disbursal", icon: "Briefcase" },
  { slug: "home-loan", name: "Home Loan", short: "Home Loan", category: "loans", payout: "0.8%", payoutLabel: "of disbursal", icon: "House" },
  { slug: "lap", name: "Loan Against Property", short: "LAP", category: "loans", payout: "1.1%", payoutLabel: "of disbursal", icon: "Building2" },
  { slug: "gold-loan", name: "Gold Loan", short: "Gold Loan", category: "loans", payout: "0.6%", payoutLabel: "of disbursal", icon: "Gem" },
  { slug: "credit-card", name: "Credit Card", short: "Credit Card", category: "cards", payout: "₹4,080", coins: 300, icon: "CreditCard" },
  { slug: "secured-card", name: "Secured Credit Card", short: "Secured Card", category: "cards", payout: "₹2,700", icon: "ShieldCheck" },
  { slug: "credit-line", name: "Credit Line", short: "Credit Line", category: "cards", payout: "3.6%", payoutLabel: "of limit", icon: "Zap" },
  { slug: "savings", name: "Savings Account", short: "Saving A/c", category: "accounts", payout: "₹1,000", coins: 450, icon: "Landmark" },
  { slug: "demat", name: "Demat Account", short: "Demat A/c", category: "accounts", payout: "₹500", icon: "ChartNoAxesCombined" },
  { slug: "health-insurance", name: "Health Insurance", short: "Health Ins.", category: "insurance", payout: "18%", payoutLabel: "of premium", icon: "HeartPulse" },
  { slug: "motor-insurance", name: "Motor Insurance", short: "Motor Ins.", category: "insurance", payout: "12%", payoutLabel: "of premium", icon: "Car" },
];

export const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "rectification", label: "Rectification" },
  { id: "credit", label: "Credit report" },
  { id: "loans", label: "Loans" },
  { id: "cards", label: "Cards" },
  { id: "accounts", label: "Accounts" },
  { id: "insurance", label: "Insurance" },
];

/** Side products suggested on Sell (rectification has its own featured card). */
export const recommended = [
  { slug: "credit-report", art: "score" as const, panel: "bg-amber-50", kind: "Credit report", title: "Credit Report Analysis", lenders: "Upsell to rectification", payout: "₹150", coins: 50 },
  { slug: "personal-loan", art: "cash" as const, panel: "bg-emerald-50", kind: "Loans", title: "Instant Personal Loan", lenders: "12 lenders", payout: "up to 4.2%", coins: 500 },
  { slug: "credit-card", art: "card" as const, panel: "bg-indigo-50", kind: "Cards", title: "Lifetime-free Cards", lenders: "9 banks", payout: "up to ₹4,080", coins: 300 },
  { slug: "business-loan", art: "business" as const, panel: "bg-sky-50", kind: "Loans", title: "Business Loan", lenders: "8 lenders", payout: "up to 3.5%", coins: 500 },
];

export type LeadStatus = "new" | "in-progress" | "approved" | "disbursed" | "rejected";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  product: string;
  kind: "rectification" | "product";
  status: LeadStatus;
  date: string;
  payout?: string;
  step?: string;
  amount?: string;
  /** Rectification only */
  scoreFrom?: number;
  scoreTo?: number;
  stage?: number; // index into rectificationStages; 4 = closed
  issues?: string[];
};

export const leads: Lead[] = [
  { id: "R-1042", name: "Imran Khan", phone: "90XXX X7720", product: "Credit Rectification", kind: "rectification", status: "in-progress", date: "12 Nov", scoreFrom: 612, stage: 2, issues: ["Wrong late payment", "Settled account"], step: "Bureau replied" },
  { id: "R-1039", name: "Priya Nair", phone: "98XXX X4410", product: "Credit Rectification", kind: "rectification", status: "disbursed", date: "02 Nov", scoreFrom: 584, scoreTo: 702, stage: 4, issues: ["Duplicate loan", "Wrong enquiries"], payout: "₹2,500" },
  { id: "R-1045", name: "Rahul Jain", phone: "97XXX X2214", product: "Credit Rectification", kind: "rectification", status: "in-progress", date: "14 Nov", scoreFrom: 641, stage: 1, issues: ["Duplicate loan"], step: "Consent pending" },
  { id: "R-1047", name: "Meena Joshi", phone: "88XXX X9031", product: "Credit Rectification", kind: "rectification", status: "new", date: "16 Nov", scoreFrom: 559, stage: 0, issues: ["Name mismatch", "Wrong enquiries"], step: "Consent pending" },
  { id: "R-1031", name: "Sunil Rao", phone: "93XXX X5528", product: "Credit Rectification", kind: "rectification", status: "rejected", date: "28 Oct", scoreFrom: 538, stage: 1, issues: ["Genuine default"], step: "Not eligible: genuine default" },
  { id: "R-1036", name: "Vikram Singh", phone: "95XXX X6630", product: "Credit Rectification", kind: "rectification", status: "approved", date: "30 Oct", scoreFrom: 603, scoreTo: 668, stage: 3, issues: ["Wrong late payment"], payout: "₹2,500" },
  { id: "L-20931", name: "Priya Sharma", phone: "98XXX X1203", product: "Personal Loan", kind: "product", amount: "₹3,50,000", status: "disbursed", date: "15 Nov", payout: "₹14,700" },
  { id: "L-20928", name: "Rohit Verma", phone: "97XXX X8841", product: "Credit Card", kind: "product", status: "approved", date: "14 Nov", payout: "₹2,100", step: "Card dispatched" },
  { id: "L-20917", name: "Sneha Iyer", phone: "99XXX X5512", product: "Business Loan", kind: "product", amount: "₹8,00,000", status: "in-progress", date: "14 Nov", step: "Docs verification" },
];

export const trainings = [
  { title: "How to sell Credit Rectification", tag: "Rectification", live: true, coins: 1000, host: "Credit Experts", time: "Live now" },
  { title: "Reading a CIBIL report in 5 minutes", tag: "Rectification", live: false, coins: 500, host: "Credit Experts", time: "Today, 6:00 PM" },
  { title: "Personal loan: eligibility & documents", tag: "Loans", live: false, coins: 300, host: "Lending Desk", time: "Tomorrow, 11:00 AM" },
  { title: "Earn more as a PrimeScore partner", tag: "Growth", live: false, coins: 300, host: "Partner Success Team", time: "Sat, 5:00 PM" },
];

export const courses = [
  { title: "Credit Rectification Masterclass", tag: "Rectification", lessons: 8, mins: 42, color: "bg-score-green-dark", badge: "Start here" },
  { title: "Spotting errors on a CIBIL report", tag: "Rectification", lessons: 6, mins: 35, color: "bg-brand-700", badge: "Popular" },
  { title: "Loan Selling ka Aasaan Formula", tag: "Loans", lessons: 5, mins: 28, color: "bg-emerald-700", badge: "Loans" },
  { title: "Build your DSA team", tag: "Growth", lessons: 7, mins: 50, color: "bg-amber-600", badge: "Advanced" },
];

/** Eligibility and documents shown on a product page, by category. */
export const productInfo: Record<ProductCategory, { eligibility: string[]; docs: string[]; how: string }> = {
  rectification: {
    eligibility: ["Customer has a credit report with errors or old disputes", "Customer gives consent to pull their report", "Not for genuine, unpaid defaults"],
    docs: ["PAN card", "Aadhaar card", "Any bank or loan statement for the wrong entry"],
    how: "You earn when the bureau updates the customer's report.",
  },
  credit: {
    eligibility: ["Any customer with a PAN card", "No impact on their credit score"],
    docs: ["PAN card", "Mobile number linked to PAN"],
    how: "You earn when the customer unlocks the full report. Many become rectification cases.",
  },
  loans: {
    eligibility: ["Age 21–58", "Salaried or self-employed with steady income", "Credit score 700+ preferred"],
    docs: ["PAN and Aadhaar", "Last 3 months' bank statement", "Salary slips or ITR"],
    how: "You earn a share of the amount once the loan is disbursed.",
  },
  cards: {
    eligibility: ["Age 21–60", "Monthly income ₹20,000+", "Credit score 720+ preferred"],
    docs: ["PAN and Aadhaar", "Income proof"],
    how: "You earn once the card is approved and activated.",
  },
  accounts: {
    eligibility: ["Any Indian resident above 18", "Aadhaar-linked mobile number"],
    docs: ["PAN and Aadhaar"],
    how: "You earn when the account is opened and funded.",
  },
  insurance: {
    eligibility: ["Age 18–65", "Basic health declaration"],
    docs: ["PAN and Aadhaar", "Vehicle RC for motor insurance"],
    how: "You earn a share of the first-year premium.",
  },
};

export const payouts = [
  { id: "P-3301", date: "15 Nov", title: "Priya Sharma · Personal Loan", amount: 14700, status: "paid" as const },
  { id: "P-3298", date: "14 Nov", title: "Rohit Verma · Credit Card", amount: 2100, status: "processing" as const },
  { id: "P-3290", date: "08 Nov", title: "Priya Nair · Rectification", amount: 2500, status: "paid" as const },
  { id: "P-3276", date: "02 Nov", title: "Vikram Singh · Rectification", amount: 2500, status: "processing" as const },
  { id: "P-3201", date: "28 Oct", title: "October bonus", amount: 500, status: "paid" as const },
  { id: "P-3188", date: "21 Oct", title: "Kavya Reddy · Savings Account", amount: 1000, status: "paid" as const },
];

export const notifications = [
  { id: "n1", title: "Bureau replied on Imran Khan's dispute", body: "CIBIL accepted 1 of 2 disputes. Score update expected this week.", time: "2h ago", unread: true, href: "/leads/R-1042" },
  { id: "n2", title: "₹2,100 payout is processing", body: "Rohit Verma · Credit Card. Lands in your bank by 20 Nov.", time: "Yesterday", unread: true, href: "/earnings" },
  { id: "n3", title: "Live now: How to sell Credit Rectification", body: "Join and earn 1,000 coins.", time: "Yesterday", unread: false, href: "/learn" },
  { id: "n4", title: "Complete your KYC", body: "Add PAN and bank details to receive payouts.", time: "2 days ago", unread: false, href: "/kyc" },
];
