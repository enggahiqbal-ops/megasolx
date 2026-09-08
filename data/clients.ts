export type ClientLogo = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
};

export const clients: ClientLogo[] = [
  {
    id: "northwind",
    name: "Northwind Labs",
    logo: "/images/clients/client-01.svg",
    width: 140,
    height: 36,
  },
  {
    id: "atlas",
    name: "Atlas Collective",
    logo: "/images/clients/client-02.svg",
    width: 120,
    height: 32,
  },
  {
    id: "verde",
    name: "Verde Health",
    logo: "/images/clients/client-03.svg",
    width: 110,
    height: 40,
  },
  {
    id: "summit",
    name: "Summit Education",
    logo: "/images/clients/client-04.svg",
    width: 160,
    height: 28,
  },
  {
    id: "orbit",
    name: "Orbit Finance",
    logo: "/images/clients/client-05.svg",
    width: 130,
    height: 34,
  },
  {
    id: "lumen",
    name: "Lumen Studio",
    logo: "/images/clients/client-06.svg",
    width: 100,
    height: 44,
  },
];
