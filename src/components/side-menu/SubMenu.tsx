import React, { FC, ReactElement, ReactNode } from 'react';

interface SubMenuProps {
  readonly display: boolean;
  readonly children: ReactNode;
}

const SubMenu: FC<SubMenuProps> = ({ children, display }): ReactElement => (
  <div style={{ display: display ? 'block' : 'none' }}>{children}</div>
);

export default SubMenu;
