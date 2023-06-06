enum keys {
  orders = 'orders',
  invoiceDocument = 'invoiceDocument',
  deliveryDocument = 'deliveryDocument',
  productionOrder = 'productionOrder',
  product = 'product',
  businessPartner = 'businessPartner',
  equipment = 'equipment',
  priceMaster = 'priceMaster',
  billOfMaterial = 'billOfMaterial',
  operations = 'operations',
}

const uiKeys = {
  orders: {
    list: {
      key: `${keys.orders}/list`,
      function: 'OrdersList',
    },
    detailList: {
      key: `${keys.orders}/detail/list`,
      function: 'OrdersDetailList',
    },
    detail: {
      key: `${keys.orders}/detail`,
      function: 'OrdersDetail',
      pagination: {
        key: `${keys.orders}/detail/pagination`,
        function: 'OrdersDetailPagination',
      },
    },
  },
  invoiceDocument: {
    list: {
      key: `${keys.invoiceDocument}/list`,
      function: 'InvoiceDocumentList',
    },
    detailList: {
      key: `${keys.invoiceDocument}/detail/list`,
      function: 'InvoiceDocumentDetailList',
    },
    detail: {
      key: `${keys.invoiceDocument}/detail`,
      function: 'InvoiceDocumentDetail',
    }
  },
  deliveryDocument: {
    list: {
      key: `${keys.deliveryDocument}/list`,
      function: 'DeliveryDocumentList',
    },
    detailList: {
      key: `${keys.deliveryDocument}/detail/list`,
      function: 'DeliveryDocumentDetailList',
    },
    detail: {
      key: `${keys.deliveryDocument}/detail`,
      function: 'DeliveryDocumentDetail',
      pagination: {
        key: `${keys.deliveryDocument}/detail/pagination`,
        function: 'DeliveryDocumentDetailPagination',
      },
    },
  },
  productionOrder: {
    list: {
      key: `${keys.productionOrder}/list`,
      function: 'ProductionOrderList',
    },
    detailList: {
      key: `${keys.productionOrder}/detail/list`,
      function: 'ProductionOrderDetailList',
    },
    detail: {
      key: `${keys.productionOrder}/detail`,
      function: 'ProductionOrderDetail',
      pagination: {
        key: `${keys.productionOrder}/detail/pagination`,
        function: 'ProductionOrderDetailPagination',
      },
    }
  },
  product: {
    list: {
      key: `${keys.product}/list`,
      function: 'ProductList',
    },
    detailExconfList: {
      key: `${keys.product}/detail/exconf/list`,
      function: 'ProductDetailExconfList',
    }
  },
  businessPartner: {
    list: {
      key: `${keys.businessPartner}/list`,
      function: 'BusinessPartnerList',
    },
  },
  equipment: {
    list: {
      key: `${keys.equipment}/list`,
      function: 'EquipmentList',
    },
  },
  priceMaster: {
    list: {
      key: `${keys.priceMaster}/list`,
      function: 'PriceMasterList',
    },
  },
  billOfMaterial: {
    list: {
      key: `${keys.billOfMaterial}/list`,
      function: 'BillOfMaterialList',
    },
  },
  operations: {
    list: {
      key: `${keys.operations}/list`,
      function: 'OperationsList',
    },
  },
};

export {
  uiKeys,
};
