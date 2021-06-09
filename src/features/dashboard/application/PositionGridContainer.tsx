import React from 'react';
import { PositionGrid } from '../ui/PositionGrid';

import { useAppSelector } from '../../../app/hooks';
import { selectPositions } from '../domain/positionSlice';
import { PositionInfo } from '../domain/domain.model';
import { PositionRow as UIPosition } from '../ui/ui.model';

function mapDomainPositionsToUIPositions(positions: PositionInfo[]): UIPosition[] {
  return positions.map((position: PositionInfo) => ({
    id: position.id,
    status: position.status,
    openTime: position.openTime,
    closeTime: position.closeTime,
    balanceDelta: position.balanceDelta,
    balanceDeltaPercent: position.balanceDeltaPercent,
  }));
}

export default function PositionsGridContainer(): React.ReactElement {
  const positions = mapDomainPositionsToUIPositions(useAppSelector(selectPositions));

  return <PositionGrid positions={positions} loading={false} />;
}
