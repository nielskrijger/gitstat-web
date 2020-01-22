import { useMemo } from 'react';
import { useConfig } from '../stores/config/ConfigProvider';
import { Config } from '../stores/config/configTypes';
import { useGitData } from '../stores/data/GitDataProvider';
import { Commit, Project, Signature } from '../types/gitStatData';

/**
 * Memoized function returning a list of all author names in the data set.
 * Any aliases are resolved.
 */
export function useAuthorNames(): string[] {
  const { config } = useConfig();
  const allAuthors = useAuthorSignatures();

  return useMemo((): string[] => {
    const realNames = allAuthors.reduce(
      (names: Set<string>, sig: Signature): Set<string> =>
        names.add(findRealName(sig, config).name),
      new Set<string>(),
    );
    const result = Array.from(realNames);
    result.sort(caseInsensitiveSort);
    return result;
  }, [allAuthors, config]);
}

function caseInsensitiveSort(a: string, b: string): number {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

/**
 * Resolves any author aliases.
 */
export function findRealName(sig: Signature, config: Config): Signature {
  const aliases = config.authorAliases.find(({ aliases }) => aliases.includes(sig.name));
  const name = aliases ? aliases.realName : sig.name;
  return { ...sig, name };
}

/**
 * Memoized function that returns all author signatures in the dataset.
 */
function useAuthorSignatures(): Signature[] {
  const { data } = useGitData();

  return useMemo(() => {
    const originals = new Set<Signature>();
    if (data) {
      data.projects.forEach((project: Project): void => {
        project.commits.forEach((commit: Commit): void => {
          originals.add(commit.author);
        });
      });
    }
    return Array.from(originals);
  }, [data]);
}
