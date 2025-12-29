export enum AuthEndpoints {
  challenge = "/auth/public/challenge",
  login = "/auth/login",
  refreshToken = "/auth/refreshToken",
}

export enum OrdersEndpoints {
  ordersMineHeader = "/resource/header",
  ordersMineView = "/resource/view",
  orderAction = "/lenkrad/v1/order/action",
  orderMain = "/order/main",
  orderNext = "/order/next",
  orderSave = "/order/save",
  orderInitial = "/order/initial",
}

export enum DependencyEndpoints {
  resourceDependency = "/resource/dependency",
}
