export interface Signature {
  name: string;
  email: string;
  time: string;
}

export interface Mutations {
  additions: number;
  deletions: number;
}

export interface CommitFile extends Mutations {
  filepath: string;
  isBinary: boolean;
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
