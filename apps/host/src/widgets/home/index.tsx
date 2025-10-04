"use client";

import { Logo } from "@/features/logo/logo";
import { AuthRoutes } from "@/shared/config/routes/routes.auth";
import { PublicRoutes } from "@/shared/config/routes/routes.public";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  Clock,
  Globe,
  Heart,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRef } from "react";

import { AnimatedSection } from "./animated-section";
import { TestimonialsSlider } from "./testimonials-slider";

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
  { href: "#features", label: "Возможности" },
  { href: "#benefits", label: "Преимущества" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contact", label: "Контакты" },
];

export const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 80, rotationX: -15 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power4.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
          "-=0.6",
        );

      gsap.fromTo(
        ".stat-number",
        { textContent: 0, scale: 0.5, opacity: 0 },
        {
          textContent: (i: any, target: any) =>
            target.getAttribute("data-value"),
          scale: 1,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: heroRef },
  );

  return (
    <div className="bg-background" ref={heroRef}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={PublicRoutes.HOME}
              className="flex items-center space-x-2"
            >
              <Logo className="aspect-square w-auto h-8" />
              <span className="text-2xl font-bold text-foreground">
                РиэлтПро
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href={AuthRoutes.DASHBOARD}>Начать работу</Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <section className="relative py-20 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hero-badge">
                <Zap className="w-4 h-4 mr-2" />
                Бесплатная CRM для риэлторов
              </Badge>

              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
                Управляйте недвижимостью{" "}
                <span className="text-primary">бесплатно</span>
              </h1>

              <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
                Бесплатная платформа для риэлторов: управление клиентами,
                объектами недвижимости, коллекциями и аналитикой в одном месте
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
                    asChild
                  >
                    <Link href={AuthRoutes.DASHBOARD}>
                      Начать бесплатно
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Stats Section */}
      <AnimatedSection>
        <section ref={statsRef} className="py-16 bg-muted overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: "5000", label: "Активных риэлторов", suffix: "+" },
                {
                  number: "50000",
                  label: "Объектов недвижимости",
                  suffix: "+",
                },
                { number: "98", label: "Удовлетворенность", suffix: "%" },
                { number: "24", label: "Поддержка", suffix: "/7" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <span className="stat-number" data-value={stat.number}>
                      0
                    </span>
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <AnimatedSection>
        <section className="py-20 reveal-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-4 h-4 mr-2 fill-current" />
                  Почему выбирают нас
                </Badge>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-balance mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ваш успех — наша миссия
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Мы создали платформу, которая решает реальные проблемы риэлторов
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Экономия времени",
                  description:
                    "Автоматизация рутинных задач освобождает до 15 часов в неделю для работы с клиентами",
                  highlight: "15 часов в неделю",
                },
                {
                  icon: Target,
                  title: "Точная аналитика",
                  description:
                    "Отслеживайте интересы клиентов в реальном времени и предлагайте именно то, что им нужно",
                  highlight: "100% точность",
                },
                {
                  icon: TrendingUp,
                  title: "Рост продаж",
                  description:
                    "Наши пользователи увеличивают количество сделок в среднем на 40% за первые 3 месяца",
                  highlight: "+40% продаж",
                },
                {
                  icon: Shield,
                  title: "Безопасность данных",
                  description:
                    "Банковский уровень защиты данных. Ваша информация и данные клиентов в полной безопасности",
                  highlight: "256-bit шифрование",
                },
                {
                  icon: Zap,
                  title: "Мгновенный старт",
                  description:
                    "Начните работать через 5 минут после регистрации. Никаких сложных настроек и обучения",
                  highlight: "5 минут до старта",
                },
                {
                  icon: Heart,
                  title: "Навсегда бесплатно",
                  description:
                    "Все функции доступны бесплатно без ограничений. Никаких скрытых платежей или подписок",
                  highlight: "0₽ навсегда",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/30 group">
                    <CardContent className="p-6">
                      <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {item.highlight}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section id="features" className="py-20 reveal-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Все инструменты бесплатно
              </h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Получите полный доступ ко всем профессиональным инструментам
                риэлтора без платы и ограничений
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Управление клиентами",
                  description:
                    "Добавляйте потенциальных клиентов с полной информацией: имя, фото, контакты",
                },
                {
                  icon: Building2,
                  title: "База объектов",
                  description:
                    "Создавайте карточки недвижимости с фото, описанием и автозаполнением через ИИ",
                },
                {
                  icon: Heart,
                  title: "Коллекции объектов",
                  description:
                    "Формируйте подборки недвижимости и отправляйте клиентам персональные ссылки",
                },
                {
                  icon: Calculator,
                  title: "Ипотечный калькулятор",
                  description:
                    "Встроенный калькулятор для расчета ипотеки прямо в коллекциях",
                },
                {
                  icon: BarChart3,
                  title: "Аналитика и статистика",
                  description:
                    "Отслеживайте лайки, просмотры объектов и активность клиентов",
                },
                {
                  icon: Smartphone,
                  title: "Мобильная версия",
                  description:
                    "Работайте с любого устройства благодаря адаптивному дизайну",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-border/50 hover:border-primary/20">
                    <CardContent className="p-6">
                      <feature.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <section className="py-20 bg-muted/30 reveal-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Как это работает
              </h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Три простых шага до вашей первой сделки
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connection lines for desktop */}
                <div
                  className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                  style={{ top: "4rem" }}
                />

                {[
                  {
                    step: "01",
                    title: "Регистрация за 2 минуты",
                    description:
                      "Создайте аккаунт, добавьте первых клиентов и объекты недвижимости",
                    icon: Users,
                  },
                  {
                    step: "02",
                    title: "Создайте коллекции",
                    description:
                      "Сформируйте персональные подборки объектов для каждого клиента",
                    icon: Building2,
                  },
                  {
                    step: "03",
                    title: "Отслеживайте результаты",
                    description:
                      "Смотрите аналитику, лайки и закрывайте больше сделок",
                    icon: BarChart3,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                    className="relative flex flex-col"
                  >
                    <motion.div
                      className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto relative z-10 shadow-lg"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {item.step}
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1"
                    >
                      <Card className="text-center h-full">
                        <CardContent className="p-6">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                          </motion.div>
                          <h3 className="text-xl font-semibold mb-3">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection>
        <section id="benefits" className="py-20 bg-muted/30 reveal-section">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-balance mb-10"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Почему РиэлтПро?
                </motion.h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: TrendingUp,
                      title: "Увеличение продаж на 40%",
                      description:
                        "Систематизация работы с клиентами приводит к росту конверсии",
                    },
                    {
                      icon: Shield,
                      title: "Безопасность данных",
                      description:
                        "Все данные защищены современными методами шифрования",
                    },
                    {
                      icon: Globe,
                      title: "Работа из любой точки",
                      description:
                        "Облачная платформа доступна 24/7 с любого устройства",
                    },
                    {
                      icon: Heart,
                      title: "Навсегда бесплатно",
                      description:
                        "Никаких скрытых платежей, подписок или ограничений функций",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-start space-x-4"
                    >
                      <motion.div
                        className="bg-primary/10 p-3 rounded-lg"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 relative overflow-hidden flex-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <Image
                    src="/dashboard-demo.png"
                    alt="Интерфейс платформы РиэлтПро"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-2xl relative z-10"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Comparison Section */}
      <AnimatedSection>
        <section className="py-20 reveal-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                РиэлтПро vs Традиционные методы
              </h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Посмотрите, насколько эффективнее работать с современной
                платформой
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -100, rotateY: -20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: -5 }}
                >
                  <Card className="border-2 border-muted">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6 text-muted-foreground">
                        Без РиэлтПро
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Excel таблицы и бумажные записи",
                          "Потеря контактов клиентов",
                          "Ручная отправка фото объектов",
                          "Нет аналитики и статистики",
                          "Сложно отследить интересы клиентов",
                          "Много времени на рутину",
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <span className="text-red-500 mt-1">✕</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 100, rotateY: 20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <Card className="border-2 border-primary shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6 text-primary">
                        С РиэлтПро
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Все данные в одной системе",
                          "Безопасное хранение контактов",
                          "Красивые коллекции объектов",
                          "Детальная аналитика в реальном времени",
                          "Видите все лайки и просмотры",
                          "Автоматизация рутинных задач",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Reviews Section */}
      <AnimatedSection>
        <section id="reviews" className="py-20 bg-muted/30 reveal-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Отзывы
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
                Что говорят наши пользователи
              </h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Более 5000 риэлторов уже используют РиэлтПро для увеличения
                продаж
              </p>
            </div>

            <TestimonialsSlider />
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section
          id="contact"
          className="py-20 bg-primary text-primary-foreground reveal-section"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-balance mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Начните работать бесплатно
            </motion.h2>
            <motion.p
              className="text-xl text-primary-foreground/80 text-balance mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Присоединяйтесь к тысячам риэлторов, которые уже используют
              РиэлтПро бесплатно для увеличения продаж и улучшения сервиса
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4"
                  asChild
                >
                  <Link href={PublicRoutes.SIGN_UP}>
                    Зарегистрироваться бесплатно
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-primary-foreground/20 text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Связаться с нами
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div>
              <Link
                href={PublicRoutes.HOME}
                className="flex items-center space-x-2 mb-4"
              >
                <Logo className="aspect-square w-auto h-8" />
                <span className="text-xl font-bold">РиэлтПро</span>
              </Link>
              <p className="text-muted-foreground">
                Современная платформа для профессиональных риэлторов
              </p>
            </div>

            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="font-semibold text-center transition-all hover:opacity-70"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} РиэлтПро. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
