/**
 * Interface para las cuentas asociadas a un usuario
 */

export interface OperationsManager {
  Name: string;
  Email: string;
}

export interface ServiceManager {
  Name: string;
  Email: string;
}

export interface CrossAccountRole {
  RoleName: string;
  PersonName: string;
  Email: string;
}

export interface Financials {
  ProfitMarginPercentage: number;
  AvgMonthlyBillingInThousandsUSD: number;
}

export interface LanguageRequirement {
  IsBilingual: boolean;
  Languages: string[];
}

export interface AccountOperation {
  IsNational: boolean;
  Region: string;
  LanguageRequirement: LanguageRequirement;
}

export interface AccountData {
  id: string;
  Name: string;
  OperationsManager: OperationsManager;
  ServiceManager: ServiceManager;
  QtyTotalSofkianosCoEDev: number;
  CrossAccountRoles: CrossAccountRole[];
  Financials: Financials;
  AccountOperation: AccountOperation;
}

export interface AccountDto {
  id: string;
  name: string;
  operationId: string;
  operationManagerId: string;
  operationManagerName: string;
  serviceManagerId: string;
  serviceManagerName: string;
  qtyTotalSofkianosCoEDev: number;
  qtyTotalProject: number;
  CrossAccountRoles: CrossAccountRole[];
  Financials: Financials;
  AccountOperation: AccountOperation;
}

// // Actual definición de servicios de Accounts  ⬇⬇⬇

// // Solicitud
// interface ListAccountsRequest {
//   User: string; // Correo electrónico del usuario
//   role: 'usuario' | 'administrador'; // Perfil del usuario
// }

// // Respuesta
// interface ListAccountsResponse {
//   status: 'success' | 'error'; // Estado de la solicitud
//   message: string; // Mensaje de respuesta
//   data: AccountData; // Datos de la cuenta
// }

// // Datos de la cuenta
// export interface AccountData {
//   accountId: string; // ID de la cuenta
//   accountName: string; // Nombre de la cuenta
//   operationsManager: string; // Gerente de operaciones
//   serviceManager: string; // Gerente de servicios
//   transversalArchitect: string; // Arquitecto transversal (reemplazar por 'No Aplica' si no tiene)
//   transversalTechnicalLeader: string; // Líder técnico transversal (reemplazar por 'No Aplica' si no tiene)
//   qtyTotalSofkianosCoEDev: number; // Cantidad total de Sofkianos en CoE Dev
//   profitMarginPercentage: number; // Porcentaje de margen de ganancia
//   avgMonthlyBillingInThousandsUSD: number; // Facturación mensual promedio en miles de USD
//   country: string; // País
//   proyects: Project[]; // Lista de proyectos
// }

// // Proyecto
// interface Project {
//   name: string; // Nombre del proyecto
//   serviceModality: string; // Modalidad de servicio
//   qtyTotalSofkianosInProject: number; // Cantidad total de Sofkianos en el proyecto
// }
