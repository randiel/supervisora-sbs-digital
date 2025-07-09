
export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isEntity?: boolean;
  license?: string;
  tooltip?: string;
}

export interface FileItem {
  id: string;
  name: string;
  size?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  files: FileItem[];
}

export interface FinancialEntity {
  id: string;
  name: string;
  license: string;
}

export interface FinancialSystemTreeProps {
  onEntitySelect: (entity: FinancialEntity) => void;
}
