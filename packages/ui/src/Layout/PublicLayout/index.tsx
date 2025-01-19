import React, { memo } from 'react'
import ContentView from '../components/ContentView';

type PublicLayoutProps = {
  Router: React.ReactElement;
};

const PublicLayout: React.FC<PublicLayoutProps> = memo(({ Router }) => {
  return <ContentView>{Router}</ContentView>

});

export default PublicLayout;
