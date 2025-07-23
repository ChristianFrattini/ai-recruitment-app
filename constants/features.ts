import {
  Search,
  Users,
  Database,
  Filter,
  UserPlus,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

export const FEATURES = [
  {
    id: "ai-cv-search",
    label: "AI CV search",
    icon: Search,
  },
  {
    id: "candidate-matching",
    label: "Candidate matching",
    icon: Users,
  },
  {
    id: "cv-storage",
    label: "CV storage",
    icon: Database,
  },
  {
    id: "keyword-filtering",
    label: "Keyword-based filtering",
    icon: Filter,
  },
  {
    id: "multi-user-access",
    label: "Multi-user access",
    icon: UserPlus,
  },
  {
    id: "secure-storage",
    label: "Secure data storage",
    icon: ShieldCheck,
  },
  {
    id: "user-friendly",
    label: "User-friendly interface",
    icon: LayoutDashboard,
  },
];
