/*
 * Вложенные пути одного и того же таба начинаются одинаково
 * Пример: docs - docs/briefing
 */

export enum MainTabRoutes {
  home = "mainHome",
  docs = "mainDocs",
  briefing = "mainBriefing",
  orders = "mainOrders",
  service = "mainService",
}

export enum OrderRoutes {
  newOrder = "new-order",
  order = "order",
  orders = "orders",
  successOrder = "success-order",
}

export enum CommonRoutes {
  login = "login",
  registration = "registration",
  learning = "learning",
  profile = "profile",
  notifications = "notifications",
  fileView = "file-view",
  search = "search",
  kpi = "kpi",
  events = "events",
}
