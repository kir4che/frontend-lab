import { type ComponentType } from 'react';

import BuildingParallax from './BuildingParallax';
import buildingParallaxCode from './BuildingParallax.tsx?raw';
import CodeBlock from '@/components/code/CodeBlock';
import ScenePageLayout, { type SceneTabDefinition } from '@/layouts/ScenePageLayout';

type GSAPSceneTab = SceneTabDefinition<{
  component: ComponentType;
  source: {
    code: string;
    fileName: string;
  };
}>;

const tabs: GSAPSceneTab[] = [
  {
    id: 'building',
    label: 'Building',
    component: BuildingParallax,
    source: {
      code: buildingParallaxCode,
      fileName: 'BuildingParallax.tsx',
    },
  },
];

const GSAPParallax: React.FC = () => (
  <ScenePageLayout tabs={tabs}>
    {({ component: Component, source }) => (
      <>
        <Component />
        <CodeBlock code={source.code} fileName={source.fileName} />
      </>
    )}
  </ScenePageLayout>
);

export default GSAPParallax;
