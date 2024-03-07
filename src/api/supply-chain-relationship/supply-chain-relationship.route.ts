import { Route } from 'nest-router';
import { SupplyChainRelationshipModule } from './supply-chain-relationship.module';
import { DetailRoute } from './detail/detail.route';

export const SupplyChainRelationshipRoute: Route = {
  path: '/supply-chain-relationship',
  children: [
    DetailRoute,
    {
      path: '/',
      module: SupplyChainRelationshipModule,
    }
  ],
};
