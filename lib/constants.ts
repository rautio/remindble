export enum CollectionColors {
  sunset = "bg-gradient-to-r from-red-500 to-orange-500",
  poppy = "bg-gradient-to-r from-rose-500 to-red-500",
  rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
  snowflake = "bg-gradient-to-r from-indigo-400 to-cyan-400",
  candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500",
  firtree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
  metal = "bg-gradient-to-r from-slate-500 to-slate-800",
  powder = "bg-gradient-to-r from-violet-200 to-pink-200",
}

export type CollectionColor = keyof typeof CollectionColors;

export enum Brand {
  gradient = "from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
  primary = "indigo-500",
  middle = "sky-500",
  secondary = "emerald-500",
  secondaryDark = "emerald-600",
}

export const publicRoutes = ["/", "/home", "/about"];
