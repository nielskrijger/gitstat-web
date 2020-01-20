// See https://github.com/ReactTraining/react-router/issues/6430

import { useContext } from 'react';
import { StaticContext, __RouterContext as RouterContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';

export default function useRouter<
  P extends { [K in keyof P]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState
>(): RouteComponentProps<P, C, S> {
  return useContext(RouterContext) as RouteComponentProps<P, C, S>;
}
