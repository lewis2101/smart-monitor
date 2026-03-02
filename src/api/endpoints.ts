export enum AuthEndpoints {
  challenge = "/auth/public/challenge",
  login = "/auth/login",
  logout = "/auth/logout",
  refreshToken = "/auth/refreshToken",
  publicKeyList = "/auth/public-key-list",
}

export enum OrdersEndpoints {
  ordersMineHeader = "/resource/header",
  resourceView = "/resource/view",
  orderAction = "/lenkrad/v1/order/action",
  orderActionComplete = "/lenkrad/v1/order/action/complete",
  orderMain = "/order/main",
  orderNext = "/order/next",
  orderSave = "/order/save",
  orderInitial = "/order/initial",
  validateInitial = "/order/validateInitial",
  calcRestriction = "/order/field-restrictions/:processKey/init/:field",
  clientVehicles = "/order/client-vehicles",
  order = "/order",
  supplierList = "/order/supplier-list",
  actionNewOrder = "/lenkrad/v1/order/action/new",
  startProcess = "/lenkrad/v1/order/action/start-process",
  orderHistory = "/order/history",
  orderFile = "/lenkrad/v1/file",
  selectedPartsHistoryByOrder = "/order/selected-part-history-by-order",
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

export enum FileEndpoints {
  getFile = "/lenkrad/v1/file/download/base64",
}

export enum NotificationEndpoints {
  getNotifications = "/lenkrad/v1/user/notification",
  readNotification = "/lenkrad/v1/user/notification/read/:orderId",
}

export enum NaviChatEndpoints {
  naviChat = "/navi/ai/chat2",
}
