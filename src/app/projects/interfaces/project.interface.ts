interface TechStack {
  id: string;
}

interface TypeTechStack {
  id: string;
  techStacks: TechStack[];
}

interface ProjectData {
  Name: string;
  ServiceModalityId: string;
  qtyTotalSofkianosInProject: number;
  startDate: Date; // Se recomienda usar Date para fechas
  endDateEstimated: Date; // Se recomienda usar Date para fechas
  qtyEnterpriseArchitects: number;
  qtySolutionArchitects: number;
  qtyTechnicalLeads: number;
  qtyDevelopmentConsultants: number;
  bussinesContext: string;
  qtyCopilotLicenses: number;
  useCopilotLicense: boolean;
  useSonar: boolean;
  qtySonarLicenses: number;
  TypeTechStacks: TypeTechStack[];
  StatusId: string;
  accountId: string;
  userId: string;
}

