"use client";

import { Logo } from "@/features/logo/logo";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRef } from "react";

import { CasesSlider } from "./cases-slider";
import { ReviewsSlider } from "./reviews-slider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
}

const fadeInUp = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const navItems = [
  { href: "#how-works", label: "Как это работает" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#cases", label: "Кейсы" },
  { href: "#reviews", label: "Отзывы" },
];

export const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  return (
    <div className="bg-background" ref={heroRef}>
      {/* Header */}
      <header className=" top-0 z-50 backdrop-blur-md">
        <div className="app-container flex items-center justify-between h-20">
          <div className="w-1/3">
            <Logo />
          </div>
          <nav className="w-full hidden md:flex items-center justify-center gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-max text-secondary px-4 py-1 rounded-[8px] transition-all hover:bg-light hover:text-dark hover:font-semibold hover:shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="w-1/3 flex items-center justify-end gap-[0.625rem]">
            <Button variant={"outline"} asChild>
              <Link href={PublicRoutes.SIGN_IN}>Войти</Link>
            </Button>
            <Button asChild>
              <Link href={PublicRoutes.SIGN_UP}>Зарегистрироваться</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <div className="app-container flex flex-col gap-10 py-12.5">
          <div className="w-full flex flex-col items-center gap-4.5 max-w-[71.25rem] mx-auto relative">
            <div className="flex items-center gap-2.5">
              <Badge>Любая недвижимость</Badge>
              <Badge variant={"outline"}>Подробная статистика</Badge>
            </div>
            <div className="w-full flex flex-col items-center gap-6">
              <h1 className="text-5xl leading-17 font-semibold text-black text-center">
                Хватит теряться в таблицах и чатах — управляйте всем в одном
                месте
              </h1>
              <p className="text-secondary text-[1.25rem] text-center max-w-[45.75rem] w-full mx-auto">
                Наш сервис помогает риелторам создавать подборки недвижимости,
                отправлять их клиентам и видеть, какие объекты им действительно
                понравились.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 relative">
            <Button asChild>
              <Link href={PublicRoutes.SIGN_UP}>Начать бесплатно</Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href={"#how-works"}>Посмотреть, как работает</Link>
            </Button>
          </div>
        </div>
        <Image
          src={"/hero.png"}
          alt="hero"
          width={1440}
          height={520}
          className="block mx-auto w-full max-w-[90rem] -mt-40"
        />
      </section>

      {/* How Works Section */}
      <section id="how-works" className="pt-16 pb-25">
        <div className="app-container flex flex-col items-center gap-15">
          <div className="flex flex-col items-center gap-4 max-w-[39.75rem]">
            <h2 className="text-4xl font-semibold text-black">
              Как это работает?
            </h2>
            <p className="text-secondary text-lg text-center">
              Три шага — и у вас под контролем весь процесс продажи: от
              добавления объекта до реакции клиента.
            </p>
          </div>
          <div className="inner-container relative">
            <Image
              src={"/steps/steps-line.svg"}
              alt="line"
              width={751}
              height={119}
              className="w-[84%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
            <div className="relative w-full grid grid-cols-3 gap-10">
              <div className="rounded-2xl bg-light overflow-hidden shadow-[0_9px_20px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col items-center gap-2.5 w-full h-full px-5 pt-2.5 pb-10 bg-[linear-gradient(141deg,#fff_0%,rgba(235,232,255,0.6)_100%)]">
                  <Image
                    src={"/steps/step1.svg"}
                    alt="step1"
                    width={160}
                    height={160}
                    className="max-w-40 w-full"
                  />
                  <div className="flex flex-col gap-2.5">
                    <span className="font-semibold">
                      Шаг 1. Добавьте объекты
                    </span>
                    <p className="text-xs text-secondary">
                      Квартиры, дома, коммерция — всё структурировано и готово к
                      показу клиентам.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-light overflow-hidden shadow-[0_9px_20px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col items-center gap-2.5 w-full h-full px-5 pt-2.5 pb-10 bg-[linear-gradient(141deg,#fff_0%,rgba(235,232,255,0.6)_100%)]">
                  <Image
                    src={"/steps/step2.svg"}
                    alt="step1"
                    width={160}
                    height={160}
                    className="max-w-40 w-full"
                  />
                  <div className="flex flex-col gap-2.5">
                    <span className="font-semibold">
                      Шаг 2. Создайте подборку и отправьте клиенту
                    </span>
                    <p className="text-xs text-secondary">
                      Отправляйте клиентам красивые и удобные подборки за 2
                      минуты.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl bg-light overflow-hidden shadow-[0_9px_20px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col items-center gap-2.5 w-full h-full px-5 pt-2.5 pb-10 bg-[linear-gradient(141deg,#fff_0%,rgba(235,232,255,0.6)_100%)]">
                  <Image
                    src={"/steps/step3.svg"}
                    alt="step1"
                    width={160}
                    height={160}
                    className="max-w-40 w-full"
                  />
                  <div className="flex flex-col gap-2.5">
                    <span className="font-semibold">
                      Шаг 3. Узнайте, что ему понравилось
                    </span>
                    <p className="text-xs text-secondary">
                      Аналитика, которая работает за вас — знайте, что
                      привлекает внимание клиентов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section
        id="advantages"
        className="pt-20 pb-25 bg-[linear-gradient(180deg,#EEF6FF_0%,#DED9FF_100%)]"
      >
        <div className="app-container flex flex-col items-center gap-15">
          <div className="flex flex-col items-center gap-4 max-w-[39.75rem]">
            <h2 className="text-4xl font-semibold text-black">Преимущества</h2>
            <p className="text-secondary text-lg text-center">
              Мы не просто упрощаем работу — мы помогаем закрывать сделки
              быстрее, повышать доверие клиентов и понимать их интересы с
              точностью до клика.
            </p>
          </div>
          <div className="inner-container">
            <div className="w-full flex flex-col gap-10">
              <div className="rounded-2xl bg-light p-7.5 overflow-hidden border-b-4 border-light-secondary flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <Image
                    src={"/advantages/advantage1.svg"}
                    alt="advantage1"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                  <span className="text-lg font-semibold">
                    Единая экосистема для риелтора
                  </span>
                </div>
                <p className="text-sm text-secondary">
                  Авито, Циан, база агентства, личные заметки — всё можно
                  добавить в пару кликов. Фото, ссылки, описание, координаты —
                  всё сохраняется и структурируется автоматически.
                </p>
              </div>
              <div className="rounded-2xl bg-light p-7.5 overflow-hidden border-b-4 border-light-secondary flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <Image
                    src={"/advantages/advantage2.svg"}
                    alt="advantage2"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                  <span className="text-lg font-semibold">
                    Экономия до 6 часов в день
                  </span>
                </div>
                <p className="text-sm text-secondary">
                  Забудьте о ручном копировании ссылок, таблицах и скриншотах.
                  Всё под рукой — добавление, рассылка, аналитика, управление
                  клиентами.
                </p>
              </div>
              <div className="rounded-2xl bg-light p-7.5 overflow-hidden border-b-4 border-light-secondary flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <Image
                    src={"/advantages/advantage3.svg"}
                    alt="advantage3"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                  <span className="text-lg font-semibold">
                    +30% больше закрытых сделок
                  </span>
                </div>
                <p className="text-sm text-secondary">
                  Видите, какие объекты действительно интересны клиенту, и
                  предлагаете то, что “заходит”. Клиенты получают релевантные
                  варианты — решения принимаются быстрее.
                </p>
              </div>
              <div className="rounded-2xl bg-light p-7.5 overflow-hidden border-b-4 border-light-secondary flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <Image
                    src={"/advantages/advantage4.svg"}
                    alt="advantage4"
                    width={32}
                    height={32}
                    className="size-8"
                  />
                  <span className="text-lg font-semibold">
                    100% прозрачность взаимодействия с клиентом
                  </span>
                </div>
                <p className="text-sm text-secondary">
                  Вы знаете, что он смотрел, что лайкнул, а что пропустил. Это
                  убирает догадки и делает коммуникацию точной и
                  профессиональной.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section
        id="cases"
        className="pt-20 pb-25 bg-[linear-gradient(0deg,#EEF6FF_0%,#DED9FF_100%)]"
      >
        <div className="app-container flex flex-col items-center gap-15">
          <div className="flex flex-col items-center gap-4 max-w-[39.75rem]">
            <h2 className="text-4xl font-semibold text-black text-center leading-[49px]">
              Как риелторы используют{" "}
              <span className="text-primary">Reelook</span> в реальной работе
            </h2>
            <p className="text-secondary text-lg text-center">
              Мы не просто упрощаем работу — мы помогаем закрывать сделки
              быстрее, повышать доверие клиентов и понимать их интересы с
              точностью до клика.
            </p>
          </div>
          <CasesSlider />
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-25 relative">
        <Button
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          asChild
        >
          <Link href={PublicRoutes.SIGN_UP}>Начать бесплатно</Link>
        </Button>
        <div className="app-container flex flex-col items-center gap-15">
          <div className="flex flex-col items-center gap-4 max-w-[39.75rem]">
            <h2 className="text-4xl font-semibold text-black text-center leading-[49px]">
              Что говорят риелторы, которые уже работают с{" "}
              <span className="text-primary">Reelook</span>
            </h2>
            <p className="text-secondary text-lg text-center">
              Реальные истории людей, которые перешли с хаоса таблиц и чатов —
              на прозрачную, управляемую систему работы с клиентами.
            </p>
          </div>
          <ReviewsSlider />
        </div>
      </section>

      {/* Cta Section */}
      <section id="cta" className="pt-25 pb-62.5">
        <div className="app-container relative">
          <Image
            src={"/cta.png"}
            alt="cta"
            width={1440}
            height={520}
            className="absolute w-full top-0 left-0 -translate-y-[17%]"
          />
          <div className="inner-container relative">
            <div className="rounded-2xl bg-light overflow-hidden">
              <div className="flex flex-col items-center gap-7.5 p-5 w-full h-full bg-[linear-gradient(180deg,#fff_0%,#DFDAFF_100%)]">
                <h2 className="text-4xl font-semibold text-black text-center leading-[49px]">
                  Попробуйте <span className="text-primary">Reelook</span> —
                  начните продавать быстрее уже сегодня
                </h2>
                <Button size={"lg"} asChild>
                  <Link href={PublicRoutes.SIGN_UP}>Начать бесплатно</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[linear-gradient(180deg,#EEF6FF_0%,#DED9FF_100%)]">
        <div className="app-container flex flex-col gap-10 py-7.5">
          <div className="flex items-center gap-4 justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <Link
                href={PublicRoutes.EMAIL}
                className="text-primary-foreground"
              >
                <Mail className="size-6" />
              </Link>
              <Link
                href={PublicRoutes.TELEGRAM}
                className="text-primary-foreground"
              >
                <Image
                  src={"/links/telegram.svg"}
                  alt="telegram"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </Link>
              <Link href={PublicRoutes.VK} className="text-primary-foreground">
                <Image
                  src={"/links/vk.svg"}
                  alt="vk"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between">
            <span className="text-sm">
              © {new Date().getFullYear()}{" "}
              <Link href={PublicRoutes.HOME} className="text-primary">
                Reelook
              </Link>{" "}
              | Все права защищены
            </span>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href={PublicRoutes.OFFER}
                className="text-dark hover:underline"
              >
                Оферта
              </Link>
              <Link
                href={PublicRoutes.USER_AGREEMENT}
                className="text-dark hover:underline"
              >
                Пользовательское соглашение
              </Link>
              <Link
                href={PublicRoutes.PRIVACY_POLICY}
                className="text-dark hover:underline"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
