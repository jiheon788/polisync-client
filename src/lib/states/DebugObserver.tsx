import { useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

const DebugObserver = () => {
  const snapshot = useRecoilSnapshot();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        console.debug('[🛸Recoil]', node.key, snapshot.getLoadable(node).contents);
      }
    }
  }, [snapshot]);

  return null;
};

export default DebugObserver;
