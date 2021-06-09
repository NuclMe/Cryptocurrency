import React from 'react';
import { OrderGrid } from '../ui/OrderGrid';

import { useAppSelector } from '../../../app/hooks';
import { selectOrders } from '../domain/ordersSlice';
import { Order as DomainOrder } from '../domain/domain.model';
import { Order as UIOrder } from '../ui/ui.model';

function mapDomainOrdersToUIOrders(orders: DomainOrder[]): UIOrder[] {
  return orders.map((order: DomainOrder) => ({
    id: order.id,
    type: order.type,
    side: order.side,
    status: order.statusText,
    price: order.price,
    amount: order.amount,
    createdAt: order.createdAt,
  }));
}

export default function OrderGridContainer(): React.ReactElement {
  const orders = mapDomainOrdersToUIOrders(useAppSelector(selectOrders));

  return (
    <OrderGrid orders={orders} loading={false} />
  );
}
