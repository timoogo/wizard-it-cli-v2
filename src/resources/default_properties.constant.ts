export interface ColumnDetails {
  name: string;
  type: string;
  length?: string | number | null;
  isPrimary: boolean;
  isGenerated: boolean;
  default: any; // Vous pouvez affiner ce type si nécessaire.
  isUnique: boolean;
  nullable: boolean;
}
export const DEFAULT_PROPERTIES: Record<string, Partial<ColumnDetails>> = {
  id: {
    name: "id",
    type: "number",
    length: "",
    isPrimary: true,
    isGenerated: true,
    default: null,
    isUnique: true,
    nullable: false,
  },
  createdAt: {
    name: "createdAt",
    type: "timestamp",
    length: "",
    isPrimary: false,
    isGenerated: false,
    default: "now()",
    isUnique: false,
    nullable: false,
  },
  updatedAt: {
    name: "updatedAt",
    type: "timestamp",
    length: "",
    isPrimary: false,
    isGenerated: false,
    default: "now()",
    isUnique: false,
    nullable: false,
  },
  deletedAt: {
    name: "deletedAt",
    type: "timestamp",
    length: "",
    isPrimary: false,
    isGenerated: false,
    default: null,
    isUnique: false,
    nullable: true,
  },
  name: {
    name: "name",
    type: "varchar",
    length: "255",
    isPrimary: false,
    isGenerated: false,
    default: null,
    isUnique: false,
    nullable: false,
  },
    email: {
        name: "email",
        type: "varchar",
        length: "255",
        isPrimary: false,
        isGenerated: false,
        default: null,
        isUnique: true,
        nullable: false,
    },
    password: {
        name: "password",
        type: "varchar",
        length: "255",
        isPrimary: false,
        isGenerated: false,
        default: null,
        isUnique: false,
        nullable: false,
    },
    
};
