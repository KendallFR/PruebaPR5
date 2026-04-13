import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Film,
  ChartArea,
  Filter,
  Wrench,
  LogIn,
  UserPlus,
  LogOut,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  User,
  ShoppingBasket,
  CreditCard
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const userEmail = "Invitado";

  const navItems = [
    { title: "Subastas", href: "/subasta/SubastasActivas", icon: <Film className="h-4 w-4" /> },
    { title: "Filtrar por carta", href: "/movie/filter", icon: <Filter className="h-4 w-4" /> },
  ];

 const mantItems = [
  { title: "Subastas Activas",    href: "/subasta/SubastasActivas",    icon: <Wrench className="h-4 w-4" /> },
  { title: "Subastas Finalizadas", href: "/subasta/SubastasFinalizadas", icon: <Wrench className="h-4 w-4" /> },
  { title: "Cartas",              href: "/carta",                      icon: <ShoppingBasket className="h-4 w-4" /> },
  { title: "Usuarios",            href: "/usuario/table",              icon: <ChartArea className="h-4 w-4" /> },
  { title: "Pujas",               href: "/puja/table/1",               icon: <ChartArea className="h-4 w-4" /> },
  { title: "Pagos",               href: "/facturacion",                icon: <CreditCard className="h-4 w-4" /> },
];

  const userItems = [
    { title: "Login", href: "/user/login", icon: <LogIn className="h-4 w-4" /> },
    { title: "Registrarse", href: "/usuario/create", icon: <UserPlus className="h-4 w-4" /> },
    { title: "Logout", href: "#login", icon: <LogOut className="h-4 w-4" /> },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-gradient-to-b from-black to-slate-950 border-b border-white/10 shadow-lg">
      <div className="flex items-center justify-between px-9 py-6 max-w-[1280px] mx-auto text-white">

        {/* -------- LOGO MASTER BALL -------- */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-wide hover:opacity-90 transition"
        >
            <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-md">

        {/* Parte superior morado oscuro elegante */}
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800"></div>

        {/* Parte inferior gris claro premium */}
        <div className="absolute bottom-0 w-full h-1/2 bg-gray-100"></div>

        {/* Línea central */}
        <div className="absolute top-1/2 w-full h-[3px] bg-black -translate-y-1/2"></div>

        {/* Botón central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white border-2 border-black rounded-full"></div>
        </div>

        {/* Detalles rosas Master Ball suaves */}
        <div className="absolute top-[6px] left-[6px] w-2 h-2 bg-pink-400/80 rounded-full"></div>
        <div className="absolute top-[6px] right-[6px] w-2 h-2 bg-pink-400/80 rounded-full"></div>

      </div>

          <span className="hidden sm:inline bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent">
            RedCard Market Trading
          </span>
        </Link>

        {/* -------- MENÚ ESCRITORIO -------- */}
        <div className="hidden md:flex flex-1 justify-center">
          <Menubar className="w-auto bg-transparent border-none shadow-none space-x-6">

            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <Film className="h-4 w-4" /> Subastas
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary/0 backdrop-blur-md border-white/10">
                {navItems.map((item) => (
                  <MenubarItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-accent/10 transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <Layers className="h-4 w-4" /> Mantenimientos
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary/0 backdrop-blur-md border-white/10">
                {mantItems.map((item) => (
                  <MenubarItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-accent/10 transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition">
                <User className="h-4 w-4" /> {userEmail}
                <ChevronDown className="h-3 w-3" />
              </MenubarTrigger>
              <MenubarContent className="bg-primary/0 backdrop-blur-md border-white/10">
                {userItems.map((item) => (
                  <MenubarItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 py-2 px-3 rounded-md text-sm hover:bg-accent/10 transition"
                    >
                      {item.icon} {item.title}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

          </Menubar>
        </div>

        {/* -------- CARRITO + MÓVIL -------- */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative hover:opacity-80">
            <ShoppingCart className="h-6 w-6" />
            <Badge
              className="absolute -top-2 -right-3 rounded-full px-2 py-0 text-xs font-semibold"
              variant="secondary"
            >
              3
            </Badge>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-accent/10 text-white backdrop-blur-lg w-72">
              <nav className="mt-8 px-4 space-y-6">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                  RedCard Market Trading
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}