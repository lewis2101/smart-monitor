export enum AuthEndpoints {
  challenge = "/auth/public/challenge",
  login = "/auth/login",
  refreshToken = "/auth/refreshToken",
}

export enum OrdersEndpoints {
  ordersMineHeader = "/resource/header",
  ordersMineView = "/resource/view",
  orderAction = "/lenkrad/v1/order/action",
  orderActionComplete = "/lenkrad/v1/order/action/complete",
  orderMain = "/order/main",
  orderNext = "/order/next",
  orderSave = "/order/save",
  orderInitial = "/order/initial",
  validateInitial = "/order/validateInitial",
  calcRestriction = "/order/field-restrictions/:processKey/init/:field",
  clientVehicles = "/order/client-vehicles",
  newOrderParts = "/order/new-order-parts",
  supplierList = "/order/supplier-list",
  actionNewOrder = "/lenkrad/v1/order/action/new",
  startProcess = "/lenkrad/v1/order/action/start-process",
  orderHistory = "/order/history",
}

export enum MapEndpoints {
  osmAddress = "/osm/address/by-coords",
  wialonAddress = "/wialon/address/by-coords",
  wialonRoutePoint = "/wialon/route-point-set",
  osmRoutePoint = "/osm/route-point-set",
  wialonRoute = "/wialon/route",
  osmRoute = "/osm/route",
}

export enum DependencyEndpoints {
  resourceDependency = "/resource/dependency",
}

export enum StatEndpoints {
  currentLimit = "/stat/current-limit",
}
