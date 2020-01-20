import { useGitData } from '../context/GitDataProvider';
import { GitStatData } from '../types/gitStatData';

export function useLoadJSON(): (data: string) => void {
  const { dispatch } = useGitData();

  return (data: string): void =>
    dispatch({
      type: 'LOAD_DATA',
      data: JSON.parse(data) as GitStatData,
    });
}

export function useLoadData(): (data: GitStatData) => void {
  const { dispatch } = useGitData();

  return (data: GitStatData): void =>
    dispatch({
      type: 'LOAD_DATA',
      data,
    });
}
