export interface Signature {
  name: string;
  email: string;
  time: string;
}

export interface CommitFile {
  filepath: string;
  isBinary: boolean;
  additions: number;
  deletions: number;
  rawAdditions: number;
  rawDeletions: number;
  renameOf?: string;
  renameTo?: string;
  similarity?: number;
}

export interface Commit {
  hash: string;
  author: Signature;
  committer: Signature;
  message: string;
  files: CommitFile[];
  isMerge: boolean;
}

export interface Project {
  name: string;
  commits: Commit[];
}

export interface GitStatData {
  version: string;
  projects: Project[];
}
