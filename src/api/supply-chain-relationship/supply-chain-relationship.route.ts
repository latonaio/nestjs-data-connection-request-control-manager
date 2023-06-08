import { Route } from 'nest-router';
import { SupplyChainRelationshipModule } from './supply-chain-relationship.module';

export const SupplyChainRelationshipRoute: Route = {
  path: '/supply-chain-relationship',
  children: [
    {
      path: '/',
      module: SupplyChainRelationshipModule,
    }
  ],
};
